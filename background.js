// Enable side panel to open on action toolbar click
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error('Failed to set panel behavior:', error));

// Listen for messages from content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'OPEN_PANEL') {
    // Open the side panel for this tab
    chrome.sidePanel.open({ tabId: sender.tab.id });
  }
});