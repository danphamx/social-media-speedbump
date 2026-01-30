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

    if (isBlocked && !window.location.href.includes('?passed=true')) {
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
            pointer-events: none;
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
        btn.style.cssText = `
            margin-top: 20px;
            padding: 15px 30px;
            font-size: 18px;
            cursor: pointer;
            background: #444;
            color: #fff;
            border: none;
            border-radius: 5px;
            transition: background 0.3s ease;
        `;

        btn.onmouseover = () => btn.style.background = '#555';
        btn.onmouseout = () => btn.style.background = '#444';

        btn.onclick = () => {
            const url = new URL(window.location.href);
            url.searchParams.set('passed', 'true');
            window.location.href = url.toString();
        };

        // Append elements
        speedbumpContainer.appendChild(img);
        speedbumpContainer.appendChild(title);
        speedbumpContainer.appendChild(btn);
        document.body.appendChild(speedbumpContainer);
    }
})();