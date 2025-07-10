// Check if URL matches our patterns and is not in excluded paths
function isMatchingUrl(url) {
  if (!url) return false;
  
  // Check if it's a chatgpt.com URL and not in excluded paths
  return (
    url.startsWith('https://chatgpt.com/') &&
    !url.match(/chatgpt.com\/(auth|pricing|chatgpt-enterprise)/)
  );
}

// Open welcome page when extension is installed
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // Open welcome page in a new tab
    const welcomeUrl = chrome.runtime.getURL('welcome.html');
    chrome.tabs.create({ url: welcomeUrl });
  }
  
  // Inject into all matching existing tabs when extension is installed or updated
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach(tab => {
      if (tab.id && isMatchingUrl(tab.url)) {
        console.log('Injecting into existing tab:', tab.url);
        // The content script will be automatically injected
      }
    });
  });
});

// Handle messages from other parts of the extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received:', request);
  
  switch (request.action) {
    case 'openChatGPT':
      console.log('Opening ChatGPT in new tab...');
      
      // Store the chat selection flag if requested
      if (request.showChatSelection) {
        chrome.storage.local.set({ 
          showChatSelectionOnLoad: true,
          chatSelectionTimestamp: Date.now()
        }, () => {
          console.log('Chat selection flag stored');
        });
      }
      
      chrome.tabs.create({ 
        url: 'https://chatgpt.com/',
        active: true 
      });
      break;
      
    case 'openPopup':
      console.log('Opening popup...');
      chrome.action.openPopup();
      break;
      
    case 'signOut':
      // Clear authentication data
      chrome.storage.local.remove(['authToken', 'userProfile'], () => {
        console.log('User signed out');
        sendResponse({ success: true });
      });
      return true; // Required for async sendResponse
  }
});

// Listen for tab updates to handle SPA navigations and initial loads
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    if (isMatchingUrl(tab.url)) {
      console.log('ChatGPT tab detected, widget will be injected by content script:', tab.url);
    }
  }
});

// Handle new tab creation
chrome.tabs.onCreated.addListener((tab) => {
  if (tab.id && isMatchingUrl(tab.url)) {
    console.log('New tab created, widget will be injected by content script:', tab.url);
  }
});

// Function to inject widget scripts
function injectWidget(tabId) {
  try {
    // Inject CSS first
    chrome.scripting.insertCSS({
      target: { tabId },
      files: ['src/styles/widget.css']
    }).catch(err => console.error('Failed to inject CSS:', err));

    // Then inject the widget script
    chrome.scripting.executeScript({
      target: { tabId },
      files: ['src/scripts/widget.js']
    }).catch(err => console.error('Failed to inject widget script:', err));
  } catch (error) {
    console.error('Error in injectWidget:', error);
  }
}

// Listen for tab updates to handle SPA navigations and initial loads
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    // Check if URL matches our patterns and is not in excluded paths
    const isMatchingUrl = (
      tab.url.match(/^https:\/\/chatgpt\.com\/(chat|c\/|share\/)/) &&
      !tab.url.match(/chatgpt.com\/(auth|pricing|chatgpt-enterprise)/)
    );
    
    if (isMatchingUrl) {
      console.log('ChatGPT tab detected, injecting widget:', tab.url);
      injectWidget(tabId);
    }
  }
});