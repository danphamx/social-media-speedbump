(async function() {
    const defaults = {
        blockedDomains: ['reddit.com', 'facebook.com', 'instagram.com'],
        customText: "Stop giving a f*ck and get back to work.",
        buttonLabel: "I have no self control, let me in",
        customImage: null,
        customIcon: null
    };

    const settings = await new Promise(resolve => chrome.storage.sync.get(defaults, resolve));
    const isBlocked = settings.blockedDomains.some(domain => window.location.hostname.includes(domain));

    // Get bypass counter from storage
    const bypassData = await new Promise(resolve => 
        chrome.storage.local.get(['bypassCount'], resolve)
    );
    const bypassCount = bypassData.bypassCount || 0;
    
    // Show interstitial if blocked AND (no passed param OR bypass count >= 3)
    const shouldShowInterstitial = isBlocked && (!window.location.href.includes('?passed=true') || bypassCount >= 3);

    if (shouldShowInterstitial) {
        // --- 1. Swap the Favicon ---
        const newIcon = settings.customIcon || chrome.runtime.getURL('img/skully.png');
        
        // Remove existing icons
        document.querySelectorAll("link[rel*='icon']").forEach(link => link.remove());
        
        // Add new icon
        const link = document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = newIcon;
        document.getElementsByTagName('head')[0].appendChild(link);

        // --- 2. Create floating speedbump overlay ---
        // Create a dark overlay behind the content
        const overlay = document.createElement('div');
        overlay.id = 'speedbump-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.9);
            z-index: 999998;
            pointer-events: auto;
        `;
        document.body.appendChild(overlay);

        // Create the main speedbump container
        const speedbumpContainer = document.createElement('div');
        speedbumpContainer.id = 'speedbump-container';
        speedbumpContainer.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            right: 20px;
            bottom: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-family: Arial, sans-serif;
            text-align: center;
            z-index: 999999;
            pointer-events: auto;
        `;

        // Create image element
        const img = document.createElement('img');
        img.src = settings.customImage || chrome.runtime.getURL('img/dontcare.jpg');
        img.style.cssText = `
            max-width: 80%;
            max-height: 50vh;
            margin-bottom: 20px;
            object-fit: contain;
        `;

        // Create title
        const title = document.createElement('h1');
        title.textContent = settings.customText;
        title.style.cssText = `
            margin: 0 0 20px 0;
            font-size: 32px;
            font-weight: bold;
        `;

        // Create button
        const btn = document.createElement('button');
        btn.id = 'proceed-btn';
        btn.textContent = settings.buttonLabel;
        btn.type = 'button';
        btn.style.cssText = `
            margin-top: 20px;
            padding: 16px 36px;
            font-size: 18px;
            cursor: pointer;
            background: linear-gradient(180deg,#555,#333);
            color: #fff;
            border: none;
            border-radius: 8px;
            box-shadow: 0 6px 18px rgba(0,0,0,0.5);
            transition: transform 0.08s ease, filter 0.12s ease;
            -webkit-tap-highlight-color: transparent;
        `;

        btn.onmouseover = () => { btn.style.filter = 'brightness(1.05)'; };
        btn.onmouseout = () => { btn.style.filter = ''; };
        btn.onmousedown = () => { btn.style.transform = 'translateY(1px)'; };
        btn.onmouseup = () => { btn.style.transform = ''; };

        // SPA-safe dismissal: update URL without full reload and remove overlay
        btn.onclick = async () => {
            const url = new URL(window.location.href);
            url.searchParams.set('passed', 'true');
            
            // Increment bypass counter
            const currentBypassData = await new Promise(resolve => 
                chrome.storage.local.get(['bypassCount'], resolve)
            );
            const currentCount = currentBypassData.bypassCount || 0;
            
            // Reset counter if it was at 3 or more, otherwise increment
            const newCount = currentCount >= 3 ? 1 : currentCount + 1;
            await chrome.storage.local.set({ bypassCount: newCount });
            
            try {
                history.replaceState(null, '', url.toString());
            } catch (e) {
                // fallback to full navigation if replaceState is not allowed
                window.location.href = url.toString();
                return;
            }
            // remove the UI so the user can continue without a reload
            if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
            if (speedbumpContainer && speedbumpContainer.parentNode) speedbumpContainer.parentNode.removeChild(speedbumpContainer);
        };

        // Append elements
        speedbumpContainer.appendChild(img);
        speedbumpContainer.appendChild(title);
        speedbumpContainer.appendChild(btn);
        document.body.appendChild(speedbumpContainer);
    }
})();