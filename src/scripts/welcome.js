document.addEventListener('DOMContentLoaded', function() {
    console.log('Welcome page loaded');
    
    const openChatBtn = document.getElementById('openChatGPT');
    if (openChatBtn) {
        openChatBtn.addEventListener('click', () => {
            console.log('Open ChatGPT button clicked');
            chrome.runtime.sendMessage({ action: 'openChatGPT' }, (response) => {
                if (chrome.runtime.lastError) {
                    console.error('Error sending message:', chrome.runtime.lastError);
                }
            });
        });
    } else {
        console.error('Could not find element with id "openChatGPT"');
    }

    const signInBtn = document.getElementById('signInGoogle');
    if (signInBtn) {
        signInBtn.addEventListener('click', () => {
            console.log('Sign in button clicked');
            chrome.runtime.sendMessage({ action: 'openPopup' }, (response) => {
                if (chrome.runtime.lastError) {
                    console.error('Error sending message:', chrome.runtime.lastError);
                }
            });
        });
    }
});
