const defaults = {
    blockedDomains: ['reddit.com', 'facebook.com', 'instagram.com'],
    customText: "Stop giving a f*ck and get back to work.",
    buttonLabel: "I have no self control, let me in",
    customImage: null,
    customIcon: null
};

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
});

chrome.storage.sync.get(defaults, (settings) => {
    document.getElementById('domains').value = settings.blockedDomains.join(', ');
    document.getElementById('message').value = settings.customText;
    document.getElementById('btnLabel').value = settings.buttonLabel;
});

document.getElementById('save').onclick = async () => {
    const imgFile = document.getElementById('imgFile').files[0];
    const iconFile = document.getElementById('iconFile').files[0];
    
    const update = {
        blockedDomains: document.getElementById('domains').value.split(',').map(s => s.trim()),
        customText: document.getElementById('message').value,
        buttonLabel: document.getElementById('btnLabel').value,
    };

    if (imgFile) update.customImage = await toBase64(imgFile);
    if (iconFile) update.customIcon = await toBase64(iconFile);

    chrome.storage.sync.set(update, () => alert('Settings Saved!'));
};