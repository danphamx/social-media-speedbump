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

        // --- 2. Build the Speedbump UI ---
        document.documentElement.innerHTML = `
            <div style="
                height: 100vh; 
                display: flex; 
                flex-direction: column; 
                align-items: center; 
                justify-content: center; 
                background: #000; 
                color: #fff; 
                font-family: Arial, sans-serif;
                text-align: center;
            ">
                <img src="${settings.customImage || chrome.runtime.getURL('img/dontcare.jpg')}" style="max-width: 80%; max-height: 50vh; margin-bottom: 20px;">
                <h1>${settings.customText}</h1>
                <button id="proceed-btn" style="margin-top: 20px; padding: 15px 30px; font-size: 18px; cursor: pointer; background: #444; color: #fff; border: none; border-radius: 5px;">
                    ${settings.buttonLabel}
                </button>
            </div>
        `;

        document.getElementById('proceed-btn').onclick = () => {
            const url = new URL(window.location.href);
            url.searchParams.set('passed', 'true');
            window.location.href = url.toString();
        };
    }
})();