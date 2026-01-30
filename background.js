// Listen for messages from content.js (the floating cupcake)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'OPEN_PANEL') {
    // Open the side panel in the current window
    chrome.sidePanel.open({ windowId: sender.tab.windowId });
  }
});