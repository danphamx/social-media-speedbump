// Open the side panel when the extension icon is clicked
chrome.action.onClicked.addListener((tab) => {
  chrome.sidePanel.open({ tabId: tab.id });
});

// Listen for messages from content.js (the floating cupcake)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'OPEN_PANEL') {
    // Open the side panel in the current window
    chrome.sidePanel.open({ tabId: sender.tab.id });
  }
});