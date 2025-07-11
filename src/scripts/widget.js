// Create and inject styles
const style = document.createElement('style');
style.textContent = `
  #chatgpt-widget {
    position: fixed;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    width: 60px;
    height: 60px;
    cursor: pointer;
    z-index: 99999;
    transition: all 0.3s ease;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 70%, rgba(255, 107, 107, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 70% 30%, rgba(78, 205, 196, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(69, 183, 209, 0.15) 0%, transparent 50%),
                rgba(15, 15, 15, 0.9);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  /* Widget positioned next to mindmap title */
  #chatgpt-widget.sidebar-position {
    position: fixed !important;
    z-index: 99999 !important;
    transform: none !important;
  }
  
  /* Generating/processing state with darker background */
  #chatgpt-widget.generating {
    background: radial-gradient(circle at 30% 70%, rgba(255, 107, 107, 0.25) 0%, transparent 50%),
                radial-gradient(circle at 70% 30%, rgba(78, 205, 196, 0.25) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(69, 183, 209, 0.25) 0%, transparent 50%),
                rgba(5, 5, 5, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 20px rgba(255, 107, 107, 0.3),
                0 0 30px rgba(78, 205, 196, 0.2),
                0 0 40px rgba(69, 183, 209, 0.1);
    animation: pulse-widget-background 3s ease-in-out infinite;
  }
  
  @keyframes pulse-widget-background {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.15); }
  }
  
  .widget-logo-animation {
    width: 60px;
    height: 60px;
    position: relative;
    /* Animation paused by default, will be activated via JavaScript */
    /* Ensure it's perfectly centered */
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  /* Active animation state */
  .widget-logo-animation.active {
    animation: rotate-widget-logo 20s linear infinite;
  }
  
  @keyframes rotate-widget-logo {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .widget-logo-ring {
    position: absolute;
    border: 2px solid;
    border-radius: 50%;
    /* Animation paused by default, will be activated via JavaScript */
  }
  
  /* Active ring animation state */
  .widget-logo-ring.active {
    animation: pulse-widget-ring 3s ease-in-out infinite;
  }
  
  .widget-ring-1 {
    width: 60px;
    height: 60px;
    border-color: rgba(255, 107, 107, 0.6);
    animation-delay: 0s;
  }
  
  .widget-ring-2 {
    width: 45px;
    height: 45px;
    top: 7.5px;
    left: 7.5px;
    border-color: rgba(78, 205, 196, 0.6);
    animation-delay: 1s;
  }
  
  .widget-ring-3 {
    width: 30px;
    height: 30px;
    top: 15px;
    left: 15px;
    border-color: rgba(69, 183, 209, 0.6);
    animation-delay: 2s;
  }
  
  .widget-logo-core {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 18px;
    font-weight: 700;
    background: linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.3));
    /* Animation paused by default, will be activated via JavaScript */
  }
  
  /* Active core animation state */
  .widget-logo-core.active {
    animation: pulse-widget-core 2s ease-in-out infinite;
  }
  
  @keyframes pulse-widget-ring {
    0%, 100% { transform: scale(1); opacity: 0.6; }
    50% { transform: scale(1.15); opacity: 1; }
  }
  
  @keyframes pulse-widget-core {
    0%, 100% { transform: translate(-50%, -50%) scale(1); }
    50% { transform: translate(-50%, -50%) scale(1.1); }
  }
  
  /* Hover effects */
  #chatgpt-widget:hover:not(.generating) {
    background: radial-gradient(circle at 30% 70%, rgba(255, 107, 107, 0.25) 0%, transparent 50%),
                radial-gradient(circle at 70% 30%, rgba(78, 205, 196, 0.25) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(69, 183, 209, 0.25) 0%, transparent 50%),
                rgba(25, 25, 25, 0.9);
    transform: scale(1.05);
  }
  
  #chatgpt-widget:hover .widget-logo-animation {
    transform: scale(1.1);
  }
  
  #chatgpt-widget:hover .widget-logo-ring {
    border-width: 3px;
  }
  
  #chatgpt-widget:hover .widget-ring-1 {
    border-color: rgba(255, 107, 107, 0.8);
    box-shadow: 0 0 15px rgba(255, 107, 107, 0.4);
  }
  
  #chatgpt-widget:hover .widget-ring-2 {
    border-color: rgba(78, 205, 196, 0.8);
    box-shadow: 0 0 15px rgba(78, 205, 196, 0.4);
  }
  
  #chatgpt-widget:hover .widget-ring-3 {
    border-color: rgba(69, 183, 209, 0.8);
    box-shadow: 0 0 15px rgba(69, 183, 209, 0.4);
  }
  
  #chatgpt-widget:active {
    transform: scale(0.95);
  }
  
  #chatgpt-widget:active .widget-logo-animation {
    transform: scale(0.95);
  }
  
  @keyframes enhanced-pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(255, 107, 107, 0.7),
                  0 0 0 0 rgba(78, 205, 196, 0.5),
                  0 0 0 0 rgba(69, 183, 209, 0.3);
    }
    30% {
      box-shadow: 0 0 0 10px rgba(255, 107, 107, 0.3),
                  0 0 0 15px rgba(78, 205, 196, 0.2),
                  0 0 0 20px rgba(69, 183, 209, 0.1);
    }
    70% {
      box-shadow: 0 0 0 15px rgba(255, 107, 107, 0),
                  0 0 0 20px rgba(78, 205, 196, 0),
                  0 0 0 25px rgba(69, 183, 209, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(255, 107, 107, 0),
                  0 0 0 0 rgba(78, 205, 196, 0),
                  0 0 0 0 rgba(69, 183, 209, 0);
    }
  }
  
  .enhanced-pulse {
    animation: enhanced-pulse 2.5s infinite;
  }
  
  .pulse { 
    animation: enhanced-pulse 2.5s infinite; 
  }
  
  /* Additional animations for loading popup */
  @keyframes fade-in-up {
    from { 
      opacity: 0; 
      transform: translateY(20px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }
`;
document.head.appendChild(style);

// Create widget container
const widget = document.createElement('div');
widget.id = 'chatgpt-widget';
widget.draggable = true;

// Create the animated logo structure matching the welcome page
widget.innerHTML = `
  <div class="widget-logo-animation">
    <div class="widget-logo-ring widget-ring-1"></div>
    <div class="widget-logo-ring widget-ring-2"></div>
    <div class="widget-logo-ring widget-ring-3"></div>
    <div class="widget-logo-core">🧠</div>
  </div>
`;

// Simple position management - right side of page
let isCustomPosition = false;

// Make widget draggable
let isDragging = false;
let offsetX, offsetY;

widget.addEventListener('mousedown', (e) => {
    // Check if this is a right-click to reset position
    if (e.button === 2) { // Right mouse button
        e.preventDefault();
        resetWidgetPosition();
        return;
    }
    
    isDragging = true;
    offsetX = e.clientX - widget.getBoundingClientRect().left;
    offsetY = e.clientY - widget.getBoundingClientRect().top;
    widget.style.cursor = 'grabbing';
    
    e.preventDefault();
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;
    
    widget.style.left = x + 'px';
    widget.style.top = y + 'px';
    widget.style.right = 'auto';
    widget.style.bottom = 'auto';
});

document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        widget.style.cursor = 'pointer';
        
        // After dragging, mark as custom position
        isCustomPosition = true;
        localStorage.setItem('chatgpt-widget-custom-position', JSON.stringify({
            left: widget.style.left,
            top: widget.style.top
        }));
        showPositionTooltip('Custom position set. Right-click to reset to default.');
    }
});

// Function to smoothly scroll to a position
async function smoothScrollTo(position, duration = 1000) {
    return new Promise((resolve) => {
        const start = window.pageYOffset;
        const distance = position - start;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutQuad(timeElapsed, start, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) {
                window.requestAnimationFrame(animation);
            } else {
                resolve();
            }
        }
        // Easing function for smooth scrolling
        function easeInOutQuad(t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2*t*t + b;
            t--;
            return -c/2 * (t*(t-2) - 1) + b;
        }

        window.requestAnimationFrame(animation);
    });
}

// Function to auto-scroll the page and scrape conversation
async function autoScrollAndScrape() {
    return new Promise(async (resolve) => {
        try {
            console.log('Starting auto-scroll...');
            
            // First, scroll to top with smooth animation
            console.log('Scrolling to top...');
            await smoothScrollTo(0, 800);
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            let lastHeight = document.body.scrollHeight;
            let scrollAttempts = 0;
            const maxAttempts = 20; // Increased to 20 attempts
            
            // Auto-scroll to bottom in a loop
            while (scrollAttempts < maxAttempts) {
                console.log(`Scroll attempt ${scrollAttempts + 1}/${maxAttempts}`);
                
                // Scroll down with smooth animation
                await smoothScrollTo(document.body.scrollHeight, 1000);
                
                // Wait for potential lazy loading
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Check if we've reached the bottom
                const newHeight = document.body.scrollHeight;
                if (newHeight === lastHeight) {
                    console.log('No more content to load');
                    break;
                }
                
                lastHeight = newHeight;
                scrollAttempts++;
            }
            
            // Final scroll to ensure we're at the bottom
            await smoothScrollTo(document.body.scrollHeight, 800);
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            console.log('Auto-scroll complete, scraping conversation...');
            const conversation = scrapeConversation();
            resolve(conversation);
            
        } catch (error) {
            console.error('Error during auto-scroll:', error);
            resolve(null);
        }
    });
}

// Function to scrape ChatGPT conversation in correct order and with accurate roles
function scrapeConversation() {
    try {
        // 1. Select all message containers: <article class="text-token-text-primary w-full"> (ensures top-to-bottom order)
        //    This captures both user and assistant messages as rendered in the DOM
        const messageArticles = Array.from(document.querySelectorAll('article.text-token-text-primary.w-full'));

        // 2. Initialize an array to hold the structured messages
        const messages = [];

        // 3. Loop through each article to extract role and content
        messageArticles.forEach(article => {
            // a. Find the .sr-only element for role detection (screen reader only, but always present)
            const srOnly = article.querySelector('.sr-only');
            // b. Default role to 'unknown' if not found
            let role = 'unknown';
            if (srOnly) {
                // If the sr-only text contains 'You said:' it's a user message
                if (srOnly.textContent.includes('You said:')) {
                    role = 'user';
                }
                // If the sr-only text contains 'ChatGPT said:' it's an assistant message
                else if (srOnly.textContent.includes('ChatGPT said:')) {
                    role = 'assistant';
                }
            }

            // c. Find the main text content inside the article
            //    This could be in .markdown, .whitespace-pre-wrap, or another tag
            let content = '';
            // Try to get assistant message content
            const assistantNode = article.querySelector('.markdown');
            // Try to get user message content
            const userNode = article.querySelector('.whitespace-pre-wrap');

            // If assistantNode exists, use its text
            if (assistantNode) {
                content = assistantNode.innerText.trim();
            }
            // Else if userNode exists, use its text
            else if (userNode) {
                content = userNode.innerText.trim();
            }
            // Else, try to find the first visible text block (fallback)
            else {
                // Look for the first child div/span/p with text
                const fallbackNode = Array.from(article.querySelectorAll('div,span,p')).find(el => el.innerText && el.innerText.trim().length > 0);
                if (fallbackNode) {
                    content = fallbackNode.innerText.trim();
                }
            }

            // d. Only push messages that have content (ignore empty system or error turns)
            if (content) {
                messages.push({ role, content });
            }
        });

        // 4. Add incremental id to each message
        const messagesWithId = messages.map((msg, idx) => ({ ...msg, id: idx + 1 }));

        // 5. Log the result for verification
        console.log('✅ Scraped ChatGPT messages (ordered):', messagesWithId);
        // 6. Optionally expose globally for debugging
        window.chatGPTScrapedMessages = messagesWithId;

        // 7. Return the structured messages
        return messagesWithId.length > 0 ? messagesWithId : null;
    } catch (error) {
        // Log any scraping errors
        console.error('Error scraping conversation:', error);
        return null;
    }
}
// Updated logic to extract both user and assistant messages by iterating over <article.text-token-text-primary.w-full> elements, using .sr-only for role, and extracting the main message text from .markdown, .whitespace-pre-wrap, or fallback tags.

// Animation control functions
function startWidgetAnimations() {
    const animation = widget.querySelector('.widget-logo-animation');
    const rings = widget.querySelectorAll('.widget-logo-ring');
    const core = widget.querySelector('.widget-logo-core');
    
    if (animation) animation.classList.add('active');
    rings.forEach(ring => ring.classList.add('active'));
    if (core) core.classList.add('active');
}

function stopWidgetAnimations() {
    const animation = widget.querySelector('.widget-logo-animation');
    const rings = widget.querySelectorAll('.widget-logo-ring');
    const core = widget.querySelector('.widget-logo-core');
    
    if (animation) animation.classList.remove('active');
    rings.forEach(ring => ring.classList.remove('active'));
    if (core) core.classList.remove('active');
}

function setWidgetGeneratingState(isGenerating) {
    if (isGenerating) {
        widget.classList.add('generating');
        startWidgetAnimations();
    } else {
        widget.classList.remove('generating');
        stopWidgetAnimations();
    }
}

// Function to extract chat title from the current page
function extractChatTitle() {
    try {
        // Try multiple selectors to find the chat title
        const titleSelectors = [
            'title', // Page title
            'h1',
            '[data-testid="conversation-title"]',
            '.conversation-title',
            'main h1',
            'main h2',
            'header h1',
            'header h2'
        ];
        
        for (const selector of titleSelectors) {
            const element = document.querySelector(selector);
            if (element && element.textContent) {
                let title = element.textContent.trim();
                
                // Clean up common patterns
                title = title.replace(/^ChatGPT\s*[-–—]\s*/i, '');
                title = title.replace(/\s*[-–—]\s*ChatGPT$/i, '');
                title = title.replace(/^New chat$/i, 'Untitled Conversation');
                
                if (title && title.length > 3 && title.length < 100) {
                    return title;
                }
            }
        }
        
        // Fallback to URL-based title
        const urlPath = window.location.pathname;
        if (urlPath.includes('/c/')) {
            const chatId = urlPath.split('/c/')[1]?.split('/')[0];
            if (chatId) {
                return `Conversation ${chatId.substring(0, 8)}`;
            }
        }
        
        return 'Current Conversation';
    } catch (error) {
        console.error('Error extracting chat title:', error);
        return 'Mindmap Generation';
    }
}

// Function to show mindmap generation loading popup
function showMindmapGenerationPopup(chatTitle = 'Mindmap Generation') {
    // Remove any existing popup
    hideMindmapGenerationPopup();
    
    console.log('🎯 Showing mindmap generation popup for:', chatTitle);
    
    // Create popup overlay with chat selection popup styling
    const overlay = document.createElement('div');
    overlay.id = 'mindmap-generation-popup';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(12px);
        z-index: 99999;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        opacity: 0;
        transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    `;

    // Create popup container with welcome page styling
    const popup = document.createElement('div');
    popup.style.cssText = `
        background: rgba(15, 15, 15, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 24px;
        padding: 32px;
        max-width: 480px;
        width: 90%;
        max-height: 400px;
        overflow: hidden;
        box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4);
        position: relative;
        text-align: center;
        animation: fade-in-up 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    `;

    // Create top controls container
    const topControls = document.createElement('div');
    topControls.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        display: flex;
        gap: 8px;
        z-index: 10;
    `;

    // Minimize button (icon)
    const topMinimizeBtn = document.createElement('button');
    topMinimizeBtn.innerHTML = '−';
    topMinimizeBtn.title = 'Minimize to compact view';
    topMinimizeBtn.style.cssText = `
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: rgba(255, 255, 255, 0.8);
        padding: 8px 10px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 16px;
        transition: all 0.2s ease;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    topMinimizeBtn.onclick = () => minimizeMindmapGenerationPopup();

    topMinimizeBtn.addEventListener('mouseenter', () => {
        topMinimizeBtn.style.background = 'rgba(255, 255, 255, 0.2)';
        topMinimizeBtn.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        topMinimizeBtn.style.transform = 'scale(1.05)';
    });

    topMinimizeBtn.addEventListener('mouseleave', () => {
        topMinimizeBtn.style.background = 'rgba(255, 255, 255, 0.1)';
        topMinimizeBtn.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        topMinimizeBtn.style.transform = 'scale(1)';
    });

    // Close button (icon)
    const topCloseBtn = document.createElement('button');
    topCloseBtn.innerHTML = '✕';
    topCloseBtn.title = 'Close popup (generation continues)';
    topCloseBtn.style.cssText = `
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: rgba(255, 255, 255, 0.8);
        padding: 8px 10px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.2s ease;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    topCloseBtn.onclick = () => hideMindmapGenerationPopup();

    topCloseBtn.addEventListener('mouseenter', () => {
        topCloseBtn.style.background = 'rgba(255, 107, 107, 0.3)';
        topCloseBtn.style.borderColor = 'rgba(255, 107, 107, 0.5)';
        topCloseBtn.style.transform = 'scale(1.05)';
    });

    topCloseBtn.addEventListener('mouseleave', () => {
        topCloseBtn.style.background = 'rgba(255, 255, 255, 0.1)';
        topCloseBtn.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        topCloseBtn.style.transform = 'scale(1)';
    });

    topControls.appendChild(topMinimizeBtn);
    topControls.appendChild(topCloseBtn);

    // Create animated brain icon container with exact widget styling
    const brainContainer = document.createElement('div');
    brainContainer.style.cssText = `
        position: relative;
        display: inline-block;
        margin-bottom: 24px;
        width: 80px;
        height: 80px;
    `;

    // Create widget logo structure with exact same classes and styling as the widget
    const widgetLogo = document.createElement('div');
    widgetLogo.className = 'widget-logo-animation active';
    widgetLogo.style.cssText = `
        width: 80px;
        height: 80px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: rotate-widget-logo 20s linear infinite;
    `;

    // Create rings with exact widget styling
    const ring1 = document.createElement('div');
    ring1.className = 'widget-logo-ring widget-ring-1 active';
    ring1.style.cssText = `
        position: absolute;
        border: 2px solid;
        border-radius: 50%;
        width: 80px;
        height: 80px;
        border-color: rgba(255, 107, 107, 0.6);
        animation: pulse-widget-ring 3s ease-in-out infinite;
        animation-delay: 0s;
    `;

    const ring2 = document.createElement('div');
    ring2.className = 'widget-logo-ring widget-ring-2 active';
    ring2.style.cssText = `
        position: absolute;
        border: 2px solid;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        top: 10px;
        left: 10px;
        border-color: rgba(78, 205, 196, 0.6);
        animation: pulse-widget-ring 3s ease-in-out infinite;
        animation-delay: 1s;
    `;

    const ring3 = document.createElement('div');
    ring3.className = 'widget-logo-ring widget-ring-3 active';
    ring3.style.cssText = `
        position: absolute;
        border: 2px solid;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        top: 20px;
        left: 20px;
        border-color: rgba(69, 183, 209, 0.6);
        animation: pulse-widget-ring 3s ease-in-out infinite;
        animation-delay: 2s;
    `;

    const core = document.createElement('div');
    core.className = 'widget-logo-core active';
    core.textContent = '🧠';
    core.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 24px;
        font-weight: 700;
        background: linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.3));
        animation: pulse-widget-core 2s ease-in-out infinite;
    `;

    widgetLogo.appendChild(ring1);
    widgetLogo.appendChild(ring2);
    widgetLogo.appendChild(ring3);
    widgetLogo.appendChild(core);
    brainContainer.appendChild(widgetLogo);

    // Title with gradient text
    const title = document.createElement('h2');
    title.textContent = chatTitle;
    title.style.cssText = `
        margin: 0 0 8px 0;
        font-size: 1.8rem;
        font-weight: 700;
        background: linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 50%, #45b7d1 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        line-height: 1.2;
        word-wrap: break-word;
        max-width: 100%;
    `;

    // Subtitle
    const subtitle = document.createElement('p');
    subtitle.textContent = 'Generating Neural Pathways';
    subtitle.style.cssText = `
        margin: 0 0 24px 0;
        color: rgba(255, 255, 255, 0.8);
        font-size: 1rem;
        line-height: 1.4;
    `;

    // Progress container
    const progressContainer = document.createElement('div');
    progressContainer.style.cssText = `
        margin-bottom: 24px;
    `;

    // Progress bar
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        width: 100%;
        height: 6px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 3px;
        overflow: hidden;
        margin-bottom: 8px;
    `;

    const progressFill = document.createElement('div');
    progressFill.id = 'mindmap-progress-fill';
    progressFill.style.cssText = `
        width: 0%;
        height: 100%;
        background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1);
        border-radius: 3px;
        transition: width 0.3s ease;
    `;

    progressBar.appendChild(progressFill);

    // Progress text
    const progressText = document.createElement('div');
    progressText.id = 'mindmap-progress-text';
    progressText.textContent = 'Initializing...';
    progressText.style.cssText = `
        color: rgba(78, 205, 196, 0.9);
        font-size: 13px;
        text-align: center;
        min-height: 18px;
    `;

    progressContainer.appendChild(progressBar);
    progressContainer.appendChild(progressText);

    // Assemble popup
    popup.appendChild(topControls);
    popup.appendChild(brainContainer);
    popup.appendChild(title);
    popup.appendChild(subtitle);
    popup.appendChild(progressContainer);
    overlay.appendChild(popup);

    // Add to page
    document.body.appendChild(overlay);

    // Animate in
    setTimeout(() => {
        overlay.style.opacity = '1';
    }, 10);

    // Close on Escape key
    const handleKeydown = (e) => {
        if (e.key === 'Escape') {
            hideMindmapGenerationPopup();
            document.removeEventListener('keydown', handleKeydown);
        }
    };
    document.addEventListener('keydown', handleKeydown);

    console.log('✅ Mindmap generation popup created');
}

// Function to hide mindmap generation popup
function hideMindmapGenerationPopup() {
    const popup = document.getElementById('mindmap-generation-popup');
    const minimizedPopup = document.getElementById('mindmap-generation-minimized');
    
    if (popup) {
        popup.style.opacity = '0';
        setTimeout(() => {
            popup.remove();
        }, 400);
        console.log('🗑️ Mindmap generation popup hidden');
    }
    
    if (minimizedPopup) {
        minimizedPopup.style.opacity = '0';
        minimizedPopup.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            minimizedPopup.remove();
        }, 300);
        console.log('🗑️ Minimized mindmap generation popup hidden');
    }
}

// Function to minimize popup to a sleek compact version
function minimizeMindmapGenerationPopup() {
    const popup = document.getElementById('mindmap-generation-popup');
    if (popup) {
        // Hide full popup
        popup.remove();
        
        // Create minimized compact popup
        showMinimizedMindmapPopup();
        
        console.log('📉 Mindmap generation popup minimized to compact view');
    }
}

// Function to show sleek minimized popup
function showMinimizedMindmapPopup() {
    // Remove any existing minimized popup
    const existingMinimized = document.getElementById('mindmap-generation-minimized');
    if (existingMinimized) {
        existingMinimized.remove();
    }

    // Get current chat title and progress
    const chatTitle = document.getElementById('mindmap-progress-text') ? 
                      document.querySelector('#mindmap-generation-popup h2')?.textContent || 'Mindmap Generation' : 
                      extractChatTitle();
    
    // Create compact popup (no background overlay - ChatGPT page remains visible)
    const minimizedPopup = document.createElement('div');
    minimizedPopup.id = 'mindmap-generation-minimized';
    minimizedPopup.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        width: 320px;
        background: rgba(15, 15, 15, 0.98);
        backdrop-filter: blur(8px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 16px;
        padding: 16px;
        z-index: 50000;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        opacity: 0;
        transform: translateY(-10px);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    `;

    // Header with controls
    const header = document.createElement('div');
    header.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 12px;
    `;

    // Compact brain icon
    const compactIcon = document.createElement('div');
    compactIcon.style.cssText = `
        width: 24px;
        height: 24px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    `;

    const compactBrain = document.createElement('div');
    compactBrain.textContent = '🧠';
    compactBrain.style.cssText = `
        font-size: 16px;
        animation: rotate-widget-logo 20s linear infinite;
        filter: drop-shadow(0 0 4px rgba(78, 205, 196, 0.6));
    `;

    compactIcon.appendChild(compactBrain);

    // Title
    const compactTitle = document.createElement('div');
    compactTitle.textContent = chatTitle.length > 25 ? chatTitle.substring(0, 22) + '...' : chatTitle;
    compactTitle.style.cssText = `
        color: white;
        font-size: 14px;
        font-weight: 600;
        flex: 1;
        margin: 0 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    `;

    // Compact controls
    const compactControls = document.createElement('div');
    compactControls.style.cssText = `
        display: flex;
        gap: 6px;
        flex-shrink: 0;
    `;

    // Expand button
    const expandBtn = document.createElement('button');
    expandBtn.innerHTML = '⌃';
    expandBtn.title = 'Expand to full view';
    expandBtn.style.cssText = `
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: rgba(255, 255, 255, 0.8);
        padding: 4px 6px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 12px;
        transition: all 0.2s ease;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    expandBtn.onclick = () => {
        minimizedPopup.remove();
        showMindmapGenerationPopup(chatTitle);
    };

    expandBtn.addEventListener('mouseenter', () => {
        expandBtn.style.background = 'rgba(255, 255, 255, 0.2)';
    });

    expandBtn.addEventListener('mouseleave', () => {
        expandBtn.style.background = 'rgba(255, 255, 255, 0.1)';
    });

    // Close button
    const compactCloseBtn = document.createElement('button');
    compactCloseBtn.innerHTML = '✕';
    compactCloseBtn.title = 'Close (generation continues)';
    compactCloseBtn.style.cssText = `
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: rgba(255, 255, 255, 0.8);
        padding: 4px 6px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 10px;
        transition: all 0.2s ease;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    compactCloseBtn.onclick = () => minimizedPopup.remove();

    compactCloseBtn.addEventListener('mouseenter', () => {
        compactCloseBtn.style.background = 'rgba(255, 107, 107, 0.3)';
    });

    compactCloseBtn.addEventListener('mouseleave', () => {
        compactCloseBtn.style.background = 'rgba(255, 255, 255, 0.1)';
    });

    compactControls.appendChild(expandBtn);
    compactControls.appendChild(compactCloseBtn);

    header.appendChild(compactIcon);
    header.appendChild(compactTitle);
    header.appendChild(compactControls);

    // Compact progress bar
    const compactProgressContainer = document.createElement('div');
    compactProgressContainer.style.cssText = `
        margin-bottom: 8px;
    `;

    const compactProgressBar = document.createElement('div');
    compactProgressBar.style.cssText = `
        width: 100%;
        height: 4px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 2px;
        overflow: hidden;
        margin-bottom: 6px;
    `;

    const compactProgressFill = document.createElement('div');
    compactProgressFill.id = 'mindmap-progress-fill-minimized';
    compactProgressFill.style.cssText = `
        width: 0%;
        height: 100%;
        background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1);
        border-radius: 2px;
        transition: width 0.3s ease;
    `;

    compactProgressBar.appendChild(compactProgressFill);

    // Compact status text
    const compactProgressText = document.createElement('div');
    compactProgressText.id = 'mindmap-progress-text-minimized';
    compactProgressText.textContent = 'Generating...';
    compactProgressText.style.cssText = `
        color: rgba(78, 205, 196, 0.9);
        font-size: 11px;
        text-align: center;
        min-height: 14px;
    `;

    compactProgressContainer.appendChild(compactProgressBar);
    compactProgressContainer.appendChild(compactProgressText);

    // Assemble minimized popup
    minimizedPopup.appendChild(header);
    minimizedPopup.appendChild(compactProgressContainer);

    // Add to page
    document.body.appendChild(minimizedPopup);

    // Animate in
    setTimeout(() => {
        minimizedPopup.style.opacity = '1';
        minimizedPopup.style.transform = 'translateY(0)';
    }, 10);

    // Sync progress from main popup if it exists
    const mainProgressFill = document.getElementById('mindmap-progress-fill');
    const mainProgressText = document.getElementById('mindmap-progress-text');
    
    if (mainProgressFill) {
        compactProgressFill.style.width = mainProgressFill.style.width;
    }
    
    if (mainProgressText) {
        compactProgressText.textContent = mainProgressText.textContent;
    }

    console.log('✅ Minimized mindmap popup created');
}

// Function to update mindmap generation progress
function updateMindmapProgress(statusText, percentage) {
    const progressFill = document.getElementById('mindmap-progress-fill');
    const progressText = document.getElementById('mindmap-progress-text');
    
    // Update main popup
    if (progressFill) {
        progressFill.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
    }
    
    if (progressText) {
        progressText.textContent = statusText;
    }
    
    // Update minimized popup if it exists
    const minimizedProgressFill = document.getElementById('mindmap-progress-fill-minimized');
    const minimizedProgressText = document.getElementById('mindmap-progress-text-minimized');
    
    if (minimizedProgressFill) {
        minimizedProgressFill.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
    }
    
    if (minimizedProgressText) {
        minimizedProgressText.textContent = statusText;
    }
    
    console.log(`📊 Mindmap progress: ${percentage}% - ${statusText}`);
}

// Add double-click handler to show chat selection popup
widget.addEventListener('dblclick', (e) => {
    e.stopPropagation();
    console.log('Widget double-clicked! Showing chat selection popup...');
    showChatSelectionPopup();
});

// Add click handler
widget.addEventListener('click', async (e) => {
    e.stopPropagation();
    console.log('Widget clicked! Starting conversation scrape...');
    
    // Start generating state with animations
    setWidgetGeneratingState(true);
    
    // Show mindmap generation loading popup (only if not already shown)
    if (!document.getElementById('mindmap-generation-popup')) {
        const chatTitle = extractChatTitle();
        showMindmapGenerationPopup(chatTitle);
    }
    
    try {
        // Auto-scroll and scrape
        updateMindmapProgress('Scrolling through conversation...', 10);
        const conversation = await autoScrollAndScrape();
        console.log('Scraped conversation:', conversation);
        if (conversation) {
            // ============================================================
            // SUPABASE EDGE FUNCTION INTEGRATION
            // ============================================================
            
            // Supabase configuration
            const SUPABASE_URL = 'https://phjciahvcsqvtybfkfbe.supabase.co';
            const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBoamNpYWh2Y3NxdnR5YmZrZmJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5NzQyODEsImV4cCI6MjA2NTU1MDI4MX0.3TUlNWNrkbGPfn7tlusnw_A3FKCZDl7sFrOjZ7KPSVQ';
            const ENDPOINT = `${SUPABASE_URL}/functions/v1/makemindmap`;
            
            // Debug: Log request details
            console.log('=== REQUEST DEBUG INFO ===');
            console.log('Endpoint:', ENDPOINT);
            console.log('Online status:', navigator.onLine);
            console.log('Conversation length:', conversation.length);
            console.log('Sample message:', conversation[0] ? {
                role: conversation[0].role,
                content: conversation[0].content.substring(0, 50) + '...'
            } : 'No messages');
            
            // Update progress
            updateMindmapProgress('Analyzing conversation structure...', 30);
            
            try {
                // Create AbortController for timeout
                const controller = new AbortController();
                const TIMEOUT_MS = 150000; // 150 seconds timeout
                const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);
                
                console.log('🔄 Sending request to Supabase...');
                updateMindmapProgress('Generating mindmap with AI...', 50);
                
                try {
                    // Make API request to Supabase Edge Function
                    const response = await fetch(ENDPOINT, {
                        method: 'POST',
                        mode: 'cors',
                        cache: 'no-cache',
                        credentials: 'same-origin',
                        headers: { 
                            'Content-Type': 'application/json',
                            'apikey': SUPABASE_ANON_KEY,
                            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({ 
                            conversation: { messages: conversation }
                        }),
                        signal: controller.signal
                    });
                    
                    clearTimeout(timeoutId);
                    
                    console.log('📡 Response received. Status:', response.status);
                    
                    // Handle non-OK responses
                    if (!response.ok) {
                        let errorText;
                        try {
                            errorText = await response.text();
                            console.error('❌ Supabase API Error:', {
                                status: response.status,
                                statusText: response.statusText,
                                headers: Object.fromEntries(response.headers.entries()),
                                error: errorText
                            });
                        } catch (e) {
                            errorText = 'Failed to parse error response';
                            console.error('❌ Failed to parse error response:', e);
                        }
                        throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`);
                    }
                    
                    // Parse the response from Supabase Edge Function
                    updateMindmapProgress('Processing AI response...', 75);
                    const responseData = await response.json();
                    console.log('✅ Successfully received mindmap from Supabase:', responseData);
                    
                    // Extract the mindMap from Supabase response
                    const hierarchicalMindmap = responseData.mindMap;
                    if (!hierarchicalMindmap) {
                        throw new Error('No mindMap found in Supabase response');
                    }
                    
                    // Basic client-side validation (Edge Function is authoritative for structure)
                    updateMindmapProgress('Validating mindmap structure...', 85);
                    if (!validateMindmapStructure(hierarchicalMindmap)) {
                        console.error('❌ Mindmap validation failed. Data received:', hierarchicalMindmap);
                        throw new Error('Invalid mindmap structure received from Supabase. Please try again or check console for details.');
                    }
                    
                    // Convert hierarchical structure to ReactFlow format
                    updateMindmapProgress('Building visual mindmap...', 95);
                    const reactFlowData = convertToReactFlowFormat(hierarchicalMindmap);
                    console.log('🔄 Converted to ReactFlow format:', reactFlowData);
                    
                    // Create sidebar with mindmap
                    console.log('🎨 Creating sidebar with mindmap...');
                    updateMindmapProgress('Finalizing mindmap display...', 100);
                    createSidebar(reactFlowData);
                    
                    // Hide loading popup after successful creation
                    setTimeout(() => {
                        hideMindmapGenerationPopup();
                    }, 1000);
                    
                } catch (error) {
                    clearTimeout(timeoutId);
                    if (error.name === 'AbortError') {
                        console.error('❌ Request timed out after 150 seconds');
                        throw new Error('Request took too long. Please try again with a shorter conversation or try again later.');
                    }
                    throw error;
                }
                
            } catch (error) {
                console.error('❌ Network/Request Error:', {
                    name: error.name,
                    message: error.message,
                    stack: error.stack
                });
                throw error;
            }
        } else {
            console.warn('No conversation found or error occurred while scraping');
            // Show user-friendly message
            alert('No conversation found. Please make sure you are on a ChatGPT conversation page with messages.');
            hideMindmapGenerationPopup();
        }
    } catch (error) {
        console.error('Error during scraping or mindmap generation:', error);
        // Show user-friendly error message
        const errorMessage = error.message || 'An error occurred while generating the mindmap';
        alert(`Mindmap generation failed: ${errorMessage}`);
        hideMindmapGenerationPopup();
    } finally {
        // Stop generating state and animations
        setWidgetGeneratingState(false);
    }
});

// Function to set widget to default position (right side of page)
function setDefaultWidgetPosition() {
    console.log('📍 Setting widget to default position (right side)');
    
    widget.style.position = 'fixed';
    widget.style.right = '20px';
    widget.style.top = '50%';
    widget.style.left = 'auto';
    widget.style.bottom = 'auto';
    widget.style.transform = 'translateY(-50%)';
    widget.style.zIndex = '10000';
    
    // Remove all positioning classes
    widget.classList.remove('share-position', 'sidebar-position', 'input-box-position');
    
    console.log('✅ Widget positioned at right side of page');
}

// Function to position widget next to mindmap title in sidebar
function positionWidgetNearMindmapTitle(sidebar) {
    try {
        console.log('🎯 Positioning widget next to mindmap title...');
        
        // Find the mindmap title in the sidebar
        const title = sidebar.querySelector('h3');
        if (title) {
            const titleRect = title.getBoundingClientRect();
            
            // Position widget to the right of the title with some spacing
            const widgetX = titleRect.right + 10; // 10px gap from title
            const widgetY = titleRect.top + (titleRect.height / 2) - 30; // Center vertically with title (30px = half widget height)
            
            widget.style.position = 'fixed';
            widget.style.left = `${widgetX}px`;
            widget.style.top = `${widgetY}px`;
            widget.style.right = 'auto';
            widget.style.bottom = 'auto';
            widget.style.transform = 'none';
            widget.classList.add('sidebar-position');
            widget.classList.remove('share-position', 'input-box-position');
            
            console.log(`📍 Widget positioned at (${widgetX}, ${widgetY}) next to mindmap title`);
            return true;
        } else {
            console.log('❌ Mindmap title not found in sidebar');
            return false;
        }
    } catch (error) {
        console.error('❌ Error positioning widget near mindmap title:', error);
        return false;
    }
}

// Function to reset widget to default position
function resetWidgetPosition() {
    console.log('🔄 Resetting widget to default position');
    
    isCustomPosition = false;
    localStorage.removeItem('chatgpt-widget-custom-position');
    
    setDefaultWidgetPosition();
    showPositionTooltip('Widget reset to default position');
}

// Function to apply saved position or set default
function applyWidgetPosition() {
    const savedPosition = localStorage.getItem('chatgpt-widget-custom-position');
    
    if (savedPosition && isCustomPosition) {
        try {
            const position = JSON.parse(savedPosition);
            widget.style.position = 'fixed';
            widget.style.left = position.left;
            widget.style.top = position.top;
            widget.style.right = 'auto';
            widget.style.bottom = 'auto';
            widget.style.transform = 'none';
            console.log('📍 Applied saved custom position');
        } catch (e) {
            console.error('❌ Error applying saved position:', e);
            setDefaultWidgetPosition();
        }
    } else {
        setDefaultWidgetPosition();
    }
}

// Function to initialize widget position
function initializeWidgetPosition() {
    // Check if user has a custom position saved
    const savedPosition = localStorage.getItem('chatgpt-widget-custom-position');
    isCustomPosition = !!savedPosition;
    
    const sidebar = document.getElementById('chatgpt-mindmap-sidebar');
    
    // If sidebar exists, position next to mindmap title
    if (sidebar) {
        positionWidgetNearMindmapTitle(sidebar);
        return;
    }
    
    // Otherwise apply saved position or default
    applyWidgetPosition();
}

// Function to show position tooltip
function showPositionTooltip(message) {
    // Remove existing tooltip
    const existingTooltip = document.getElementById('widget-position-tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }
    
    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.id = 'widget-position-tooltip';
    tooltip.textContent = message;
    tooltip.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(16, 163, 127, 0.95);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 14px;
        font-weight: 500;
        z-index: 999999;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
    `;
    
    document.body.appendChild(tooltip);
    
    // Animate in
    setTimeout(() => {
        tooltip.style.opacity = '1';
    }, 10);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        tooltip.style.opacity = '0';
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.remove();
            }
        }, 300);
    }, 3000);
}

// Prevent default context menu on widget
widget.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
});

// Add widget to the page
function addWidget() {
    if (!document.getElementById('chatgpt-widget')) {
        document.body.appendChild(widget);
        
        // Apply initial position
        setTimeout(() => {
            initializeWidgetPosition();
        }, 100);
        
        // Add enhanced pulse effect for 3 seconds when first added
        widget.classList.add('enhanced-pulse');
        setTimeout(() => widget.classList.remove('enhanced-pulse'), 3000);
        
        // Show position instruction tooltip
        setTimeout(() => {
            showPositionTooltip('Drag to reposition • Right-click to reset • Double-click for chat selection');
        }, 2000);
    }
}

// Function to ensure widget is properly positioned with retry logic
function ensureWidgetPositioned(attempt = 1, maxAttempts = 3) {
    console.log(`🔄 Ensuring widget is positioned (attempt ${attempt}/${maxAttempts})`);
    
    // Check if widget is visible and properly positioned
    const widget = document.getElementById('chatgpt-widget');
    if (!widget) {
        console.log('❌ Widget not found, stopping positioning attempts');
        return;
    }
    
    const rect = widget.getBoundingClientRect();
    const isVisible = rect.width > 0 && rect.height > 0 && 
                     rect.left >= 0 && rect.left < window.innerWidth &&
                     rect.top >= 0 && rect.top < window.innerHeight;
    
    if (isVisible) {
        console.log('✅ Widget is properly positioned and visible');
        return;
    }
    
    console.log('⚠️ Widget positioning issue detected, attempting to fix...');
    
    // Try to reposition
    initializeWidgetPosition();
    
    if (attempt < maxAttempts) {
        setTimeout(() => {
            ensureWidgetPositioned(attempt + 1, maxAttempts);
        }, 500);
    } else {
        console.log('❌ Max positioning attempts reached, forcing default position');
        setDefaultWidgetPosition();
    }
}

// Function to get opened conversation IDs from localStorage
function getOpenedConversations() {
    try {
        const opened = localStorage.getItem('chatgpt-mindmap-opened-conversations');
        return opened ? JSON.parse(opened) : [];
    } catch (error) {
        console.error('Error getting opened conversations:', error);
        return [];
    }
}

// Function to mark a conversation as opened
function markConversationAsOpened(chatUrl) {
    try {
        const openedConversations = getOpenedConversations();
        
        // Extract conversation ID from URL for consistent tracking
        let conversationId = '';
        if (chatUrl.includes('/c/')) {
            conversationId = chatUrl.split('/c/')[1]?.split('/')[0] || chatUrl;
        } else {
            conversationId = chatUrl;
        }
        
        // Add to opened list if not already present
        if (!openedConversations.includes(conversationId)) {
            openedConversations.push(conversationId);
            localStorage.setItem('chatgpt-mindmap-opened-conversations', JSON.stringify(openedConversations));
            console.log(`📝 Marked conversation as opened: ${conversationId}`);
        }
    } catch (error) {
        console.error('Error marking conversation as opened:', error);
    }
}

// Function to check if a conversation has been opened before
function isConversationOpened(chatUrl) {
    try {
        const openedConversations = getOpenedConversations();
        
        // Extract conversation ID from URL for consistent checking
        let conversationId = '';
        if (chatUrl.includes('/c/')) {
            conversationId = chatUrl.split('/c/')[1]?.split('/')[0] || chatUrl;
        } else {
            conversationId = chatUrl;
        }
        
        return openedConversations.includes(conversationId);
    } catch (error) {
        console.error('Error checking if conversation is opened:', error);
        return false;
    }
}

// Function to clear opened conversations history (for debugging/reset)
function clearOpenedConversationsHistory() {
    localStorage.removeItem('chatgpt-mindmap-opened-conversations');
    console.log('🗑️ Cleared opened conversations history');
}

// Function to get recent ChatGPT chats from the sidebar
function getRecentChats() {
    try {
        console.log('🔍 Searching for recent chats in ChatGPT sidebar...');
        
        // Enhanced selectors for ChatGPT chat history items
        const chatSelectors = [
            // Modern ChatGPT chat list items
            'nav a[href*="/c/"]',
            'aside a[href*="/c/"]',
            '[data-testid="conversation-item"]',
            '[data-testid="chat-item"]',
            'nav li a',
            'aside li a',
            
            // Links that look like chat conversations
            'a[href^="/c/"]',
            'a[href*="chatgpt.com/c/"]',
            
            // Fallback selectors
            'nav [role="button"]',
            'aside [role="button"]',
            '.conversation-item',
            '.chat-item'
        ];
        
        const chats = [];
        const foundUrls = new Set(); // Prevent duplicates
        
        // Try each selector to find chat links
        for (const selector of chatSelectors) {
            const elements = document.querySelectorAll(selector);
            console.log(`📋 Found ${elements.length} elements with selector: ${selector}`);
            
            elements.forEach(element => {
                let chatUrl = '';
                let chatTitle = '';
                
                // Extract URL
                if (element.tagName === 'A' && element.href) {
                    chatUrl = element.href;
                } else if (element.closest('a')) {
                    chatUrl = element.closest('a').href;
                }
                
                // Only process ChatGPT conversation URLs
                if (chatUrl && (chatUrl.includes('/c/') || chatUrl.includes('/chat/')) && !foundUrls.has(chatUrl)) {
                    // Extract title
                    chatTitle = element.textContent?.trim() || element.getAttribute('aria-label') || element.title || '';
                    
                    // Clean up title (remove extra whitespace, truncate if too long)
                    chatTitle = chatTitle.replace(/\s+/g, ' ').trim();
                    if (chatTitle.length > 100) {
                        chatTitle = chatTitle.substring(0, 97) + '...';
                    }
                    
                    // Use a default title if none found
                    if (!chatTitle || chatTitle.length < 3) {
                        const urlParts = chatUrl.split('/');
                        const chatId = urlParts[urlParts.length - 1] || 'Unknown';
                        chatTitle = `Chat ${chatId.substring(0, 8)}...`;
                    }
                    
                    // Try to extract preview message specific to this chat
                    let previewMessage = '';
                    
                    // Look for preview text in the immediate chat item container
                    const chatContainer = element.closest('li, [role="menuitem"]');
                    if (chatContainer) {
                        // Get all text nodes within this specific chat container
                        const walker = document.createTreeWalker(
                            chatContainer,
                            NodeFilter.SHOW_TEXT,
                            null,
                            false
                        );
                        
                        let textNodes = [];
                        let node;
                        while (node = walker.nextNode()) {
                            const text = node.textContent.trim();
                            if (text && text !== chatTitle && text.length > 5) {
                                textNodes.push(text);
                            }
                        }
                        
                        // Find preview text that doesn't match the title
                        for (const text of textNodes) {
                            if (!text.includes(chatTitle) && text.length > 10 && text.length < 200) {
                                previewMessage = text.substring(0, 80).trim();
                                if (text.length > 80) previewMessage += '...';
                                break;
                            }
                        }
                    }
                    
                    // Alternative: Look for specific preview elements
                    if (!previewMessage) {
                        const previewSelectors = [
                            '[class*="preview"]',
                            '[class*="summary"]',
                            'small',
                            '.text-xs',
                            '.opacity-50',
                            '[class*="secondary"]'
                        ];
                        
                        for (const selector of previewSelectors) {
                            const previewEl = chatContainer?.querySelector(selector);
                            if (previewEl && previewEl.textContent.trim()) {
                                const text = previewEl.textContent.trim();
                                if (text !== chatTitle && text.length > 10) {
                                    previewMessage = text.substring(0, 80).trim();
                                    if (text.length > 80) previewMessage += '...';
                                    break;
                                }
                            }
                        }
                    }
                    
                    // Fallback preview message
                    if (!previewMessage) {
                        previewMessage = 'Transform this conversation into a visual mindmap';
                    }
                    
                    chats.push({
                        url: chatUrl,
                        title: chatTitle,
                        preview: previewMessage,
                        element: element
                    });
                    
                    foundUrls.add(chatUrl);
                }
            });
        }
        
        console.log(`✅ Found ${chats.length} recent chats:`, chats.map(c => ({ title: c.title, url: c.url.substring(0, 50) + '...' })));
        
        // Return all available chats (pagination will be handled in the UI)
        return chats;
        
    } catch (error) {
        console.error('❌ Error getting recent chats:', error);
        return [];
    }
}

// Function to show chat selection popup with loading state
function showChatSelectionPopup() {
    // Remove any existing popup
    const existingPopup = document.getElementById('chat-selection-popup');
    if (existingPopup) {
        existingPopup.remove();
    }
    
    console.log('🎯 Creating chat selection popup with loading state...');
    
    // Show loading popup immediately
    showChatLoadingPopup();
}

// Function to show loading popup while searching for chats
function showChatLoadingPopup() {
    // Create popup overlay
    const overlay = document.createElement('div');
    overlay.id = 'chat-selection-popup';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(12px);
        z-index: 99999;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        opacity: 0;
        transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    `;

    // Create popup container
    const popup = document.createElement('div');
    popup.style.cssText = `
        background: rgba(15, 15, 15, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 24px;
        padding: 40px;
        max-width: 480px;
        width: 90%;
        overflow: hidden;
        box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4);
        position: relative;
        text-align: center;
        animation: fade-in-up 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    `;

    // Create animated loading brain
    const loadingContainer = document.createElement('div');
    loadingContainer.style.cssText = `
        position: relative;
        display: inline-block;
        margin-bottom: 24px;
    `;

    const brainIcon = document.createElement('div');
    brainIcon.textContent = '🧠';
    brainIcon.style.cssText = `
        font-size: 64px;
        animation: cosmic-pulse 2s ease-in-out infinite;
        filter: drop-shadow(0 0 20px rgba(78, 205, 196, 0.6));
    `;

    const spinningRing = document.createElement('div');
    spinningRing.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100px;
        height: 100px;
        border: 3px solid transparent;
        border-top: 3px solid rgba(78, 205, 196, 0.8);
        border-radius: 50%;
        animation: cosmic-spin 1.5s linear infinite;
    `;

    loadingContainer.appendChild(spinningRing);
    loadingContainer.appendChild(brainIcon);

    // Title
    const title = document.createElement('h2');
    title.textContent = 'Finding Your Neural Pathways';
    title.style.cssText = `
        margin: 0 0 16px 0;
        font-size: 1.8rem;
        font-weight: 700;
        background: linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 50%, #45b7d1 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        line-height: 1.2;
    `;

    // Status message
    const statusMessage = document.createElement('p');
    statusMessage.id = 'chat-search-status';
    statusMessage.textContent = 'Scanning your conversation history...';
    statusMessage.style.cssText = `
        margin: 0 0 24px 0;
        color: rgba(255, 255, 255, 0.8);
        font-size: 1.1rem;
        line-height: 1.4;
    `;

    // Progress indicator
    const progressContainer = document.createElement('div');
    progressContainer.style.cssText = `
        margin-bottom: 20px;
    `;

    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        width: 100%;
        height: 4px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 2px;
        overflow: hidden;
    `;

    const progressFill = document.createElement('div');
    progressFill.id = 'chat-search-progress';
    progressFill.style.cssText = `
        width: 0%;
        height: 100%;
        background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1);
        border-radius: 2px;
        transition: width 0.3s ease;
    `;

    progressBar.appendChild(progressFill);
    progressContainer.appendChild(progressBar);

    // Cancel button
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.style.cssText = `
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: rgba(255, 255, 255, 0.8);
        padding: 10px 20px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.2s ease;
    `;

    cancelBtn.onclick = () => overlay.remove();

    // Assemble popup
    popup.appendChild(loadingContainer);
    popup.appendChild(title);
    popup.appendChild(statusMessage);
    popup.appendChild(progressContainer);
    popup.appendChild(cancelBtn);
    overlay.appendChild(popup);

    // Add to page
    document.body.appendChild(overlay);

    // Animate in
    setTimeout(() => {
        overlay.style.opacity = '1';
    }, 10);

    // Start the chat search process
    startChatSearchProcess(overlay, statusMessage, progressFill);
}

// Function to search for chats with retry mechanism
async function startChatSearchProcess(overlay, statusMessage, progressFill) {
    const maxAttempts = 8; // Try up to 8 times
    const attemptDelay = 1000; // 1 second between attempts
    let attempt = 0;
    let chats = [];

    console.log('🔍 Starting chat search process...');

    while (attempt < maxAttempts && chats.length === 0) {
        attempt++;
        const progressPercent = (attempt / maxAttempts) * 100;
        
        console.log(`🔄 Chat search attempt ${attempt}/${maxAttempts}`);
        
        // Update UI
        statusMessage.textContent = `Attempt ${attempt}/${maxAttempts}: Searching for conversations...`;
        progressFill.style.width = `${progressPercent}%`;

        // Try to get chats
        const allChats = getRecentChats();
        
        // Filter out already-opened conversations
        chats = allChats.filter(chat => !isConversationOpened(chat.url));
        
        if (allChats.length > 0) {
            const filteredCount = chats.length;
            const openedCount = allChats.length - filteredCount;
            
            console.log(`✅ Found ${allChats.length} total chats, ${filteredCount} new chats (${openedCount} already opened) on attempt ${attempt}`);
            
            if (filteredCount > 0) {
                // Update to success state with filtered count
                statusMessage.textContent = `Found ${filteredCount} new conversations! Loading interface...`;
                progressFill.style.width = '100%';
                
                // Short delay to show success, then transition
                setTimeout(() => {
                    showActualChatSelection(overlay, chats);
                }, 800);
                
                return;
            } else {
                // All conversations have been opened before
                console.log('ℹ️ All conversations have been opened before, showing "all opened" message');
                showAllConversationsOpenedMessage(overlay);
                return;
            }
        }

        // If not the last attempt, wait before trying again
        if (attempt < maxAttempts) {
            statusMessage.textContent = `No conversations found yet. Retrying in 1 second... (${attempt}/${maxAttempts})`;
            await new Promise(resolve => setTimeout(resolve, attemptDelay));
        }
    }

    // If we get here, all attempts failed
    console.log('❌ All chat search attempts failed');
    showChatSearchFailure(overlay);
}

// Function to show failure state
function showChatSearchFailure(overlay) {
    const popup = overlay.querySelector('div');
    
    popup.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 64px; margin-bottom: 24px; filter: drop-shadow(0 0 20px rgba(255, 107, 107, 0.6));">💭</div>
            <h2 style="margin: 0 0 16px 0; font-size: 1.8rem; font-weight: 700; background: linear-gradient(135deg, #ff6b6b, #4ecdc4); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                No Neural Pathways Found
            </h2>
            <p style="margin: 0 0 24px 0; color: rgba(255, 255, 255, 0.8); font-size: 1.1rem; line-height: 1.4;">
                We couldn't detect any conversations in your ChatGPT history.<br>
                <span style="color: rgba(78, 205, 196, 0.9);">Try refreshing the page</span> or ensure your sidebar is visible.
            </p>
            <div style="display: flex; gap: 12px; justify-content: center;">
                <button onclick="window.location.reload()" style="background: linear-gradient(135deg, #ff6b6b, #4ecdc4); border: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 600; color: white; cursor: pointer; transition: all 0.3s ease;">
                    🔄 Refresh Page
                </button>
                <button onclick="this.closest('#chat-selection-popup').remove()" style="background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); color: rgba(255, 255, 255, 0.8); padding: 12px 24px; border-radius: 8px; cursor: pointer; font-size: 14px; transition: all 0.2s ease;">
                    Close
                </button>
            </div>
        </div>
    `;
}

// Function to show message when all conversations have been opened before
function showAllConversationsOpenedMessage(overlay) {
    const popup = overlay.querySelector('div');
    
    popup.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 64px; margin-bottom: 24px; filter: drop-shadow(0 0 20px rgba(78, 205, 196, 0.6));">✅</div>
            <h2 style="margin: 0 0 16px 0; font-size: 1.8rem; font-weight: 700; background: linear-gradient(135deg, #4ecdc4, #45b7d1); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                All Conversations Explored
            </h2>
            <p style="margin: 0 0 24px 0; color: rgba(255, 255, 255, 0.8); font-size: 1.1rem; line-height: 1.4;">
                You've already opened all conversations for mindmap generation.<br>
                <span style="color: rgba(78, 205, 196, 0.9);">Start a new conversation</span> or wait for more chat history.
            </p>
            <div style="display: flex; gap: 12px; justify-content: center;">
                <button onclick="clearOpenedConversationsHistory(); window.location.reload();" style="background: linear-gradient(135deg, #ff6b6b, #4ecdc4); border: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 600; color: white; cursor: pointer; transition: all 0.3s ease;">
                    🔄 Reset & Show All
                </button>
                <button onclick="this.closest('#chat-selection-popup').remove()" style="background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); color: rgba(255, 255, 255, 0.8); padding: 12px 24px; border-radius: 8px; cursor: pointer; font-size: 14px; transition: all 0.2s ease;">
                    Close
                </button>
            </div>
        </div>
    `;
}

// Function to transition to actual chat selection
function showActualChatSelection(overlay, chats) {
    // Remove the loading popup
    overlay.remove();
    
    // Show the actual chat selection with the found chats
    showChatSelectionWithChats(chats);
}

// Function to show chat selection popup with found chats (extracted from original function)
function showChatSelectionWithChats(recentChats) {
    console.log(`🎯 Creating chat selection interface with ${recentChats.length} chats...`);
    
    // Create popup overlay that blurs ChatGPT page background
    const overlay = document.createElement('div');
    overlay.id = 'chat-selection-popup';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(12px);
        z-index: 99999;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        opacity: 0;
        transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        overflow: hidden;
    `;
    
    // Add essential animation styles
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes cosmic-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(animationStyle);
    
    // Create popup container with welcome page styling
    const popup = document.createElement('div');
    popup.style.cssText = `
        background: rgba(15, 15, 15, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 24px;
        padding: 0;
        max-width: 720px;
        width: 90%;
        max-height: 80vh;
        overflow: hidden;
        box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4);
        position: relative;
        animation: fade-in-up 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    
    // Create header with welcome page styling
    const header = document.createElement('div');
    header.style.cssText = `
        text-align: center;
        padding: 24px 24px 20px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    `;
    
    const title = document.createElement('h2');
    title.textContent = 'Select Your Neural Canvas';
    title.style.cssText = `
        margin: 0 0 8px 0;
        font-size: 1.8rem;
        font-weight: 700;
        background: linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 50%, #45b7d1 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        line-height: 1.2;
    `;
    
    const subtitle = document.createElement('p');
    subtitle.textContent = `Found ${recentChats.length} conversations ready for mindmap transformation`;
    subtitle.style.cssText = `
        margin: 0;
        color: rgba(255, 255, 255, 0.8);
        font-size: 0.95rem;
        line-height: 1.4;
    `;
    
    header.appendChild(title);
    header.appendChild(subtitle);
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        border: none;
        background: rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.8);
        padding: 10px;
        border-radius: 12px;
        cursor: pointer;
        font-size: 16px;
        transition: all 0.3s ease;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    closeBtn.onclick = () => {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 300);
    };
    
    // Create content area
    const content = document.createElement('div');
    content.style.cssText = `
        padding: 24px;
        max-height: 400px;
        overflow-y: auto;
    `;
    
    // Create chat grid
    const chatsGrid = document.createElement('div');
    chatsGrid.style.cssText = `
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 16px;
    `;
    
    // Create chat tiles
    recentChats.forEach((chat, index) => {
        const tile = document.createElement('div');
        tile.style.cssText = `
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
            animation: fade-in-up 0.6s ease-out ${index * 0.1}s both;
        `;
        
        tile.addEventListener('mouseenter', () => {
            tile.style.background = 'rgba(255, 255, 255, 0.1)';
            tile.style.borderColor = 'rgba(78, 205, 196, 0.5)';
            tile.style.transform = 'translateY(-2px)';
        });
        
        tile.addEventListener('mouseleave', () => {
            tile.style.background = 'rgba(255, 255, 255, 0.05)';
            tile.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            tile.style.transform = 'translateY(0)';
        });
        
        const chatTitle = document.createElement('div');
        chatTitle.textContent = chat.title;
        chatTitle.style.cssText = `
            font-size: 14px;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.95);
            margin-bottom: 8px;
            line-height: 1.3;
        `;
        
        const chatPreview = document.createElement('div');
        chatPreview.textContent = chat.preview;
        chatPreview.style.cssText = `
            font-size: 12px;
            color: rgba(255, 255, 255, 0.7);
            line-height: 1.4;
            margin-bottom: 12px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        `;
        
        const generateBtn = document.createElement('div');
        generateBtn.textContent = 'Generate Mindmap';
        generateBtn.style.cssText = `
            background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
            color: white;
            padding: 8px 16px;
            border-radius: 8px;
            text-align: center;
            font-size: 12px;
            font-weight: 600;
            transition: all 0.3s ease;
        `;
        
        tile.appendChild(chatTitle);
        tile.appendChild(chatPreview);
        tile.appendChild(generateBtn);
        
        // Click handler
        tile.onclick = () => {
            console.log(`🎯 Chat tile clicked: ${chat.title}`);
            
            // Mark conversation as opened before navigation
            markConversationAsOpened(chat.url);
            
            navigateToChateAndGenerateMindmap(chat.url, chat.title);
            
            // Visual feedback - show selection but keep popup open
            tile.style.background = 'rgba(78, 205, 196, 0.2)';
            tile.style.borderColor = 'rgba(78, 205, 196, 0.8)';
            
            // Add a checkmark or indicator to show it was selected
            const existingCheckmark = tile.querySelector('.selection-checkmark');
            if (!existingCheckmark) {
                const checkmark = document.createElement('div');
                checkmark.className = 'selection-checkmark';
                checkmark.innerHTML = '✓ Opening...';
                checkmark.style.cssText = `
                    position: absolute;
                    top: 8px;
                    right: 8px;
                    background: rgba(78, 205, 196, 0.9);
                    color: white;
                    padding: 4px 8px;
                    border-radius: 12px;
                    font-size: 10px;
                    font-weight: 600;
                    z-index: 10;
                `;
                tile.style.position = 'relative';
                tile.appendChild(checkmark);
                
                // Update checkmark text after a moment
                setTimeout(() => {
                    checkmark.innerHTML = '✓ Opened in new tab';
                }, 1000);
            }
        };
        
        chatsGrid.appendChild(tile);
    });
    
    content.appendChild(chatsGrid);
    
    // Assemble popup
    popup.appendChild(closeBtn);
    popup.appendChild(header);
    popup.appendChild(content);
    overlay.appendChild(popup);
    
    // Add to page
    document.body.appendChild(overlay);
    
    // Animate in
    setTimeout(() => {
        overlay.style.opacity = '1';
    }, 10);
    
    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.remove();
        }
    });
    
    // Close on Escape key
    const handleKeydown = (e) => {
        if (e.key === 'Escape') {
            overlay.remove();
            document.removeEventListener('keydown', handleKeydown);
        }
    };
    document.addEventListener('keydown', handleKeydown);
    
    console.log('✅ Chat selection popup created');
}

// Function to navigate to a chat and generate mindmap in new tab
function navigateToChateAndGenerateMindmap(chatUrl, chatTitle) {
    console.log(`🚀 Opening chat in new tab: ${chatTitle}`);
    console.log(`🔗 URL: ${chatUrl}`);
    
    // Construct the full URL
    let fullUrl;
    if (chatUrl.startsWith('http')) {
        fullUrl = chatUrl;
    } else if (chatUrl.startsWith('/')) {
        fullUrl = 'https://chatgpt.com' + chatUrl;
    } else {
        console.error('❌ Invalid chat URL:', chatUrl);
        alert('Invalid chat URL. Please try again.');
        return;
    }
    
    // Store flag for auto-generation in the new tab
    chrome.storage.local.set({
        autoGenerateMindmap: true,
        autoGenerateTimestamp: Date.now(),
        autoGenerateChatTitle: chatTitle
    }, () => {
        console.log('📝 Auto-generate mindmap flag stored for new tab');
        
        // Show loading popup for navigation (will be shown on new tab too)
        showMindmapGenerationPopup(chatTitle);
        
        // Open chat in new tab
        const newTab = window.open(fullUrl, '_blank');
        if (newTab) {
            console.log('✅ Chat opened in new tab successfully');
            // Hide popup after opening (since generation will happen on new tab)
            setTimeout(() => {
                hideMindmapGenerationPopup();
            }, 2000);
        } else {
            console.error('❌ Failed to open new tab (popup blocker?)');
            alert('Please allow popups for this site to open chats in new tabs.');
            hideMindmapGenerationPopup();
        }
    });
}

// Function to show cosmic navigation loading indicator
function showNavigationLoadingIndicator(chatTitle) {
    const indicator = document.createElement('div');
    indicator.id = 'navigation-loading-indicator';
    indicator.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(15, 15, 15, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: white;
        padding: 32px 40px;
        border-radius: 20px;
        z-index: 999999;
        font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        text-align: center;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        animation: fade-in-up 0.4s ease-out;
    `;
    
    // Add loading animation styles if not already present
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        @keyframes cosmic-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes cosmic-pulse {
            0%, 100% { opacity: 0.6; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.1); }
        }
    `;
    document.head.appendChild(loadingStyle);
    
    // Create animated brain icon
    const brainContainer = document.createElement('div');
    brainContainer.style.cssText = `
        position: relative;
        display: inline-block;
        margin-bottom: 20px;
    `;
    
    const brainIcon = document.createElement('div');
    brainIcon.textContent = '🧠';
    brainIcon.style.cssText = `
        font-size: 48px;
        animation: cosmic-pulse 2s ease-in-out infinite;
        filter: drop-shadow(0 0 20px rgba(78, 205, 196, 0.6));
    `;
    
    const spinningRing = document.createElement('div');
    spinningRing.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80px;
        height: 80px;
        border: 2px solid transparent;
        border-top: 2px solid rgba(78, 205, 196, 0.8);
        border-radius: 50%;
        animation: cosmic-spin 1.5s linear infinite;
    `;
    
    brainContainer.appendChild(spinningRing);
    brainContainer.appendChild(brainIcon);
    
    const titleElement = document.createElement('div');
    titleElement.textContent = 'Navigating Neural Pathways';
    titleElement.style.cssText = `
        font-weight: 700;
        font-size: 18px;
        margin-bottom: 12px;
        background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    `;
    
    const chatTitleElement = document.createElement('div');
    chatTitleElement.textContent = chatTitle;
    chatTitleElement.style.cssText = `
        font-size: 14px;
        opacity: 0.9;
        margin-bottom: 16px;
        color: rgba(255, 255, 255, 0.8);
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    const statusElement = document.createElement('div');
    statusElement.textContent = 'Preparing mindmap synthesis...';
    statusElement.style.cssText = `
        font-size: 12px;
        opacity: 0.7;
        color: rgba(78, 205, 196, 0.9);
    `;
    
    indicator.appendChild(brainContainer);
    indicator.appendChild(titleElement);
    indicator.appendChild(chatTitleElement);
    indicator.appendChild(statusElement);
    
    document.body.appendChild(indicator);
}

// Check for auto-generate mindmap flag
function checkForAutoGenerateFlag() {
    chrome.storage.local.get(['autoGenerateMindmap', 'autoGenerateTimestamp', 'autoGenerateChatTitle'], (result) => {
        if (result.autoGenerateMindmap) {
            console.log('🎯 Auto-generate mindmap flag detected');
            
            // Check if flag is recent (within 60 seconds)
            const now = Date.now();
            const timestamp = result.autoGenerateTimestamp || 0;
            const isRecent = (now - timestamp) < 60000; // 60 seconds
            
            if (isRecent) {
                console.log(`🚀 Auto-generating mindmap for: ${result.autoGenerateChatTitle}`);
                
                // Clear the flag
                chrome.storage.local.remove(['autoGenerateMindmap', 'autoGenerateTimestamp', 'autoGenerateChatTitle'], () => {
                    console.log('Auto-generate flag cleared');
                });
                
                // Remove loading indicator if it exists
                const loadingIndicator = document.getElementById('navigation-loading-indicator');
                if (loadingIndicator) {
                    loadingIndicator.remove();
                }
                
                // Auto-click the widget after a delay to ensure page is fully loaded
                setTimeout(() => {
                    console.log('🤖 Auto-clicking widget to generate mindmap...');
                    const widget = document.getElementById('chatgpt-widget');
                    if (widget) {
                        widget.click();
                    } else {
                        console.error('❌ Widget not found for auto-click');
                    }
                }, 2000); // 2 second delay
            } else {
                console.log('⏰ Auto-generate flag is stale, ignoring');
                chrome.storage.local.remove(['autoGenerateMindmap', 'autoGenerateTimestamp', 'autoGenerateChatTitle']);
            }
        }
    });
}

// Check for chat selection flag on page load
function checkForChatSelectionFlag() {
    chrome.storage.local.get(['showChatSelectionOnLoad', 'chatSelectionTimestamp'], (result) => {
        if (result.showChatSelectionOnLoad) {
            console.log('🎯 Chat selection flag detected, showing chat selection popup...');
            
            // Check if flag is recent (within 30 seconds to avoid stale flags)
            const now = Date.now();
            const timestamp = result.chatSelectionTimestamp || 0;
            const isRecent = (now - timestamp) < 30000; // 30 seconds
            
            if (isRecent) {
                // Clear the flag
                chrome.storage.local.remove(['showChatSelectionOnLoad', 'chatSelectionTimestamp'], () => {
                    console.log('Chat selection flag cleared');
                });
                
                // Show chat selection popup after a brief delay to ensure page is loaded
                setTimeout(() => {
                    showChatSelectionPopup();
                }, 1500);
            } else {
                console.log('⏰ Chat selection flag is stale, ignoring');
                chrome.storage.local.remove(['showChatSelectionOnLoad', 'chatSelectionTimestamp']);
            }
        }
    });
}

// Initial widget addition
addWidget();

// Check for chat selection flag
checkForChatSelectionFlag();

// Check for auto-generate mindmap flag
checkForAutoGenerateFlag();

// Ensure widget is positioned when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('📄 DOM Content Loaded - ensuring widget positioning');
        setTimeout(() => {
            ensureWidgetPositioned();
        }, 200);
    });
} else {
    // DOM is already ready
    console.log('📄 DOM already ready - ensuring widget positioning');
    setTimeout(() => {
        ensureWidgetPositioned();
    }, 200);
}

// Additional check when page is fully loaded
window.addEventListener('load', () => {
    console.log('🌐 Window fully loaded - final positioning check');
    setTimeout(() => {
        ensureWidgetPositioned();
    }, 1000);
});

// Handle page transitions in SPAs
const observer = new MutationObserver((mutations) => {
    if (!document.body.contains(widget)) {
        addWidget();
    } else {
        // Check if page structure changed and widget needs repositioning
        if (document.querySelector('main')) {
            // Debounce repositioning to avoid excessive updates
            clearTimeout(window.widgetRepositionTimeout);
            window.widgetRepositionTimeout = setTimeout(() => {
                // Only reposition if not in custom mode or sidebar mode
                if (!isCustomPosition && !widget.classList.contains('sidebar-position')) {
                    initializeWidgetPosition();
                }
            }, 500);
        }
    }
});

observer.observe(document.body, { childList: true, subtree: true });

// Handle window resize to reposition widget
window.addEventListener('resize', () => {
    // Debounce resize handling
    clearTimeout(window.widgetResizeTimeout);
    window.widgetResizeTimeout = setTimeout(() => {
        // Reapply position (except for custom positions)
        if (!isCustomPosition) {
            initializeWidgetPosition();
        }
    }, 300);
});

// Function to show fullscreen mindmap popup
function showFullscreenMindmap(mindmapData, viewMode = 'tree', zoomLevel = 1.0) {
    // Remove any existing fullscreen popup
    const existingPopup = document.getElementById('fullscreen-mindmap-popup');
    if (existingPopup) {
        existingPopup.remove();
    }
    
    // Create fullscreen overlay
    const overlay = document.createElement('div');
    overlay.id = 'fullscreen-mindmap-popup';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.95);
        z-index: 99999;
        display: flex;
        flex-direction: column;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;
    
    // Create header with welcome page styling
    const header = document.createElement('div');
    header.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 24px 32px;
        background: rgba(15, 15, 15, 0.95);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        position: relative;
    `;
    
    // Add animated background gradient overlay
    const gradientOverlay = document.createElement('div');
    gradientOverlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at 30% 70%, rgba(255, 107, 107, 0.15) 0%, transparent 50%),
                    radial-gradient(circle at 70% 30%, rgba(78, 205, 196, 0.15) 0%, transparent 50%),
                    radial-gradient(circle at 50% 50%, rgba(69, 183, 209, 0.15) 0%, transparent 50%);
        pointer-events: none;
        z-index: 1;
    `;
    header.appendChild(gradientOverlay);
    
    // Title with gradient styling
    const title = document.createElement('h2');
    const chatTitle = extractChatTitle();
    title.textContent = `${chatTitle} - Fullscreen`;
    title.style.cssText = `
        margin: 0;
        font-size: 24px;
        font-weight: 700;
        background: linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 50%, #45b7d1 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        filter: drop-shadow(0 0 10px rgba(78, 205, 196, 0.3));
        position: relative;
        z-index: 2;
        max-width: 400px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    `;
    
    // Controls container with glassmorphism styling
    const controls = document.createElement('div');
    controls.style.cssText = `
        display: flex;
        align-items: center;
        gap: 16px;
        position: relative;
        z-index: 2;
    `;
    
    // View mode buttons with glassmorphism design
    const viewButtons = document.createElement('div');
    viewButtons.style.cssText = `
        display: flex;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 12px;
        padding: 4px;
        gap: 2px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    // Current view mode for fullscreen (separate from sidebar)
    let fullscreenViewMode = viewMode;
    let fullscreenZoom = zoomLevel;
    
    const createViewButton = (icon, mode, tooltip) => {
        const btn = document.createElement('button');
        btn.innerHTML = icon;
        btn.title = tooltip;
        btn.style.cssText = `
            border: none;
            background: ${fullscreenViewMode === mode ? 'rgba(16, 163, 127, 0.8)' : 'transparent'};
            color: rgba(255, 255, 255, 0.9);
            padding: 10px 14px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            border: 1px solid ${fullscreenViewMode === mode ? 'rgba(16, 163, 127, 0.6)' : 'transparent'};
            box-shadow: ${fullscreenViewMode === mode ? '0 4px 12px rgba(16, 163, 127, 0.3)' : 'none'};
            width: 44px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        // Add hover effects
        btn.addEventListener('mouseenter', () => {
            if (fullscreenViewMode !== mode) {
                btn.style.background = 'rgba(255, 255, 255, 0.2)';
                btn.style.transform = 'scale(1.05)';
            }
        });
        
        btn.addEventListener('mouseleave', () => {
            if (fullscreenViewMode !== mode) {
                btn.style.background = 'transparent';
                btn.style.transform = 'scale(1)';
            }
        });
        
        btn.onclick = () => {
            fullscreenViewMode = mode;
            updateFullscreenView();
            // Update all button appearances
            viewButtons.querySelectorAll('button').forEach(b => {
                b.style.background = 'transparent';
                b.style.border = '1px solid transparent';
                b.style.boxShadow = 'none';
            });
            btn.style.background = 'rgba(16, 163, 127, 0.8)';
            btn.style.border = '1px solid rgba(16, 163, 127, 0.6)';
            btn.style.boxShadow = '0 4px 12px rgba(16, 163, 127, 0.3)';
        };
        
        return btn;
    };
    
    const treeBtn = createViewButton('⌬', 'tree', 'Tree View');
    const compactBtn = createViewButton('≡', 'compact', 'Compact View');
    const listBtn = createViewButton('☰', 'list', 'List View');
    
    viewButtons.appendChild(treeBtn);
    viewButtons.appendChild(compactBtn);
    viewButtons.appendChild(listBtn);
    
    // Zoom controls with glassmorphism design
    const zoomControls = document.createElement('div');
    zoomControls.style.cssText = `
        display: flex;
        align-items: center;
        gap: 8px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 12px;
        padding: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    const createZoomButton = (text, action, tooltip) => {
        const btn = document.createElement('button');
        btn.innerHTML = text;
        btn.title = tooltip;
        
        // Determine font size based on button type
        const isHomeButton = text === '⌂';
        const fontSize = isHomeButton ? '18px' : '16px';
        
        btn.style.cssText = `
            border: none;
            background: rgba(255, 255, 255, 0.1);
            color: rgba(255, 255, 255, 0.9);
            padding: 10px 12px;
            border-radius: 8px;
            cursor: pointer;
            font-size: ${fontSize};
            font-weight: 600;
            transition: all 0.3s ease;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(10px);
            border: 1px solid transparent;
        `;
        
        btn.onclick = action;
        
        btn.addEventListener('mouseenter', () => {
            btn.style.background = 'rgba(69, 183, 209, 0.3)';
            btn.style.borderColor = 'rgba(69, 183, 209, 0.5)';
            btn.style.transform = 'scale(1.05)';
            btn.style.boxShadow = '0 4px 12px rgba(69, 183, 209, 0.4)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.background = 'rgba(255, 255, 255, 0.1)';
            btn.style.borderColor = 'transparent';
            btn.style.transform = 'scale(1)';
            btn.style.boxShadow = 'none';
        });
        
        return btn;
    };
    
    const zoomDisplay = document.createElement('span');
    zoomDisplay.style.cssText = `
        color: rgba(255, 255, 255, 0.9);
        font-size: 12px;
        min-width: 45px;
        text-align: center;
        font-weight: 600;
        text-shadow: 0 0 10px rgba(78, 205, 196, 0.5);
    `;
    
    const updateZoomDisplay = () => {
        zoomDisplay.textContent = `${Math.round(fullscreenZoom * 100)}%`;
    };
    
    const updateFullscreenZoom = (newZoom, smooth = true) => {
        fullscreenZoom = Math.max(0.1, Math.min(5.0, newZoom));
        updateZoomDisplay();
        
        // Apply zoom directly to the zoom container without re-rendering (includes SVG edges)
        const zoomContainer = content.querySelector('.mindmap-zoom-container');
        if (zoomContainer) {
            zoomContainer.style.transform = `scale(${fullscreenZoom})`;
            zoomContainer.style.transition = smooth ? 'transform 0.15s ease-out' : 'none';
            console.log(`🔍 Fullscreen zoom updated to ${Math.round(fullscreenZoom * 100)}% - edges scale with content`);
        }
    };
    
    const zoomOutBtn = createZoomButton('−', () => updateFullscreenZoom(fullscreenZoom - 0.1), 'Zoom Out');
    const zoomInBtn = createZoomButton('+', () => updateFullscreenZoom(fullscreenZoom + 0.1), 'Zoom In');
    const resetZoomBtn = createZoomButton('⌂', () => updateFullscreenZoom(1.0), 'Reset Zoom');
    
    updateZoomDisplay();
    
    zoomControls.appendChild(zoomOutBtn);
    zoomControls.appendChild(zoomDisplay);
    zoomControls.appendChild(zoomInBtn);
    zoomControls.appendChild(resetZoomBtn);
    
    // Close button with beautiful styling
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.title = 'Close Fullscreen';
    closeBtn.style.cssText = `
        border: none;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: rgba(255, 255, 255, 0.9);
        padding: 12px 16px;
        border-radius: 12px;
        cursor: pointer;
        font-size: 16px;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    closeBtn.onclick = () => overlay.remove();
    
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.background = 'rgba(255, 107, 107, 0.3)';
        closeBtn.style.borderColor = 'rgba(255, 107, 107, 0.5)';
        closeBtn.style.transform = 'scale(1.05)';
        closeBtn.style.boxShadow = '0 6px 20px rgba(255, 107, 107, 0.4)';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.background = 'rgba(255, 255, 255, 0.1)';
        closeBtn.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        closeBtn.style.transform = 'scale(1)';
        closeBtn.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    });
    
    controls.appendChild(viewButtons);
    controls.appendChild(zoomControls);
    controls.appendChild(closeBtn);
    
    header.appendChild(title);
    header.appendChild(controls);
    
    // Create main content area
    const content = document.createElement('div');
    content.style.cssText = `
        flex: 1;
        overflow: hidden;
        position: relative;
        background: #fafafa;
    `;
    
    // Function to update the fullscreen mindmap view
    const updateFullscreenView = () => {
        content.innerHTML = '';
        
        // Render mindmap with current view mode (zoom will be applied separately)
        if (fullscreenViewMode === 'list') {
            renderListView(content, mindmapData);
        } else if (fullscreenViewMode === 'compact') {
            renderCompactView(content, mindmapData);
        } else {
            renderTreeView(content, mindmapData);
        }
        
        // Apply zoom to the zoom container after rendering
        setTimeout(() => {
            const zoomContainer = content.querySelector('.mindmap-zoom-container');
            if (zoomContainer) {
                zoomContainer.style.transform = `scale(${fullscreenZoom})`;
                zoomContainer.style.transition = 'transform 0.2s ease';
            }
        }, 0);
    };
    
    // Assemble and show popup
    overlay.appendChild(header);
    overlay.appendChild(content);
    document.body.appendChild(overlay);
    
    // Initial render
    updateFullscreenView();
    
    // Handle keyboard shortcuts
    const handleKeydown = (e) => {
        if (e.key === 'Escape') {
            overlay.remove();
            document.removeEventListener('keydown', handleKeydown);
        } else if ((e.ctrlKey || e.metaKey) && e.key === '+') {
            e.preventDefault();
            updateFullscreenZoom(fullscreenZoom + 0.1);
        } else if ((e.ctrlKey || e.metaKey) && e.key === '-') {
            e.preventDefault();
            updateFullscreenZoom(fullscreenZoom - 0.1);
        } else if ((e.ctrlKey || e.metaKey) && e.key === '0') {
            e.preventDefault();
            updateFullscreenZoom(1.0);
        }
    };
    
    document.addEventListener('keydown', handleKeydown);
    
    // Handle smooth mouse wheel zoom with variable sensitivity
    let zoomTimeoutId = null;
    content.addEventListener('wheel', (e) => {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            
            // Calculate granular zoom delta based on wheel velocity
            const baseZoomStep = 0.02; // Much smaller base step for granular control
            const velocityMultiplier = Math.min(Math.abs(e.deltaY) / 100, 3); // Scale with scroll speed, max 3x
            const zoomStep = baseZoomStep * velocityMultiplier;
            
            const delta = e.deltaY > 0 ? -zoomStep : zoomStep;
            
            // Apply zoom without smooth transition for immediate response
            updateFullscreenZoom(fullscreenZoom + delta, false);
            
            // Clear any pending timeout and set a new one for smooth transition back
            if (zoomTimeoutId) {
                clearTimeout(zoomTimeoutId);
            }
            
            zoomTimeoutId = setTimeout(() => {
                // Re-apply current zoom with smooth transition for polish
                const zoomContainer = content.querySelector('.mindmap-zoom-container');
                if (zoomContainer) {
                    zoomContainer.style.transition = 'transform 0.2s ease-out';
                }
                zoomTimeoutId = null;
            }, 50);
        }
    });
    
    console.log('🎯 Fullscreen mindmap popup created');
}

// Basic client-side validation for mindmap structure (Edge Function handles comprehensive validation)
function validateMindmapStructure(node) {
    try {
        // Ensure minimum required fields exist for client-side processing
        if (!node || typeof node !== 'object') {
            console.error('Invalid node: not an object');
            return false;
        }
        
        if (!node.id || typeof node.id !== 'string') {
            console.error('Invalid node: missing or invalid id');
            return false;
        }
        
        if (!node.text || typeof node.text !== 'string') {
            console.error('Invalid node: missing or invalid text');
            return false;
        }
        
        if (!node.detail || typeof node.detail !== 'string') {
            console.error('Invalid node: missing or invalid detail');
            return false;
        }
        
        if (!Array.isArray(node.messageIds)) {
            console.error('Invalid node: messageIds must be an array');
            return false;
        }
        
        if (!Array.isArray(node.children)) {
            console.error('Invalid node: children must be an array');
            return false;
        }
        
        // Recursively validate children
        for (const child of node.children) {
            if (!validateMindmapStructure(child)) {
                return false;
            }
        }
        
        return true;
    } catch (error) {
        console.error('Error validating mindmap structure:', error);
        return false;
    }
}

// Function to convert Supabase hierarchical format to ReactFlow format
/**
 * MINDMAP NODE COLOR CODING SYSTEM
 * 
 * Hierarchical color logic for visual organization:
 * 1. Root node: Unique deep purple color (always stands out)
 * 2. Level 1 nodes (direct children of root): All share the same blue color
 * 3. Level 2+ nodes: Children with the same parent share the same color
 * 4. Different parent groups get different colors to distinguish sibling branches
 * 5. Colors cycle through palette to avoid repetition unless following above rules
 * 
 * Visual Benefits:
 * - Instant visual hierarchy recognition
 * - Easy to trace parent-child relationships
 * - Distinct color groups for different conversation branches
 * - Glassy, modern aesthetic with transparency and blur effects
 */

// Color palette for mindmap nodes with glassy effects
function createGlassyColorPalette() {
    return {
        // Root node - unique color
        root: {
            background: 'rgba(147, 51, 234, 0.15)', // Deep purple
            border: '1px solid rgba(147, 51, 234, 0.3)',
            shadow: '0 4px 12px rgba(147, 51, 234, 0.2)',
            textColor: '#4c1d95'
        },
        // Color sets for different levels and groups
        levelColors: [
            // Level 1 (direct children of root) - all same color
            {
                background: 'rgba(59, 130, 246, 0.15)', // Blue
                border: '1px solid rgba(59, 130, 246, 0.3)',
                shadow: '0 4px 12px rgba(59, 130, 246, 0.2)',
                textColor: '#1e3a8a'
            },
            // Level 2+ colors - rotate through these for different parent groups
            {
                background: 'rgba(16, 185, 129, 0.15)', // Emerald
                border: '1px solid rgba(16, 185, 129, 0.3)',
                shadow: '0 4px 12px rgba(16, 185, 129, 0.2)',
                textColor: '#064e3b'
            },
            {
                background: 'rgba(245, 158, 11, 0.15)', // Amber
                border: '1px solid rgba(245, 158, 11, 0.3)',
                shadow: '0 4px 12px rgba(245, 158, 11, 0.2)',
                textColor: '#92400e'
            },
            {
                background: 'rgba(239, 68, 68, 0.15)', // Red
                border: '1px solid rgba(239, 68, 68, 0.3)',
                shadow: '0 4px 12px rgba(239, 68, 68, 0.2)',
                textColor: '#991b1b'
            },
            {
                background: 'rgba(168, 85, 247, 0.15)', // Purple
                border: '1px solid rgba(168, 85, 247, 0.3)',
                shadow: '0 4px 12px rgba(168, 85, 247, 0.2)',
                textColor: '#581c87'
            },
            {
                background: 'rgba(236, 72, 153, 0.15)', // Pink
                border: '1px solid rgba(236, 72, 153, 0.3)',
                shadow: '0 4px 12px rgba(236, 72, 153, 0.2)',
                textColor: '#9d174d'
            },
            {
                background: 'rgba(6, 182, 212, 0.15)', // Cyan
                border: '1px solid rgba(6, 182, 212, 0.3)',
                shadow: '0 4px 12px rgba(6, 182, 212, 0.2)',
                textColor: '#164e63'
            },
            {
                background: 'rgba(34, 197, 94, 0.15)', // Green
                border: '1px solid rgba(34, 197, 94, 0.3)',
                shadow: '0 4px 12px rgba(34, 197, 94, 0.2)',
                textColor: '#14532d'
            },
            {
                background: 'rgba(251, 146, 60, 0.15)', // Orange
                border: '1px solid rgba(251, 146, 60, 0.3)',
                shadow: '0 4px 12px rgba(251, 146, 60, 0.2)',
                textColor: '#9a3412'
            },
            {
                background: 'rgba(99, 102, 241, 0.15)', // Indigo
                border: '1px solid rgba(99, 102, 241, 0.3)',
                shadow: '0 4px 12px rgba(99, 102, 241, 0.2)',
                textColor: '#312e81'
            }
        ]
    };
}

// Function to assign colors to nodes based on hierarchical logic
function assignNodeColors(hierarchicalNode) {
    const colorPalette = createGlassyColorPalette();
    const nodeColorMap = new Map();
    const parentColorIndex = new Map(); // Track color index for each parent
    
    // Recursive function to assign colors
    function assignColor(node, parentId = null, level = 0, parentColorIdx = 0) {
        if (level === 0) {
            // Root node gets unique color
            nodeColorMap.set(node.id, {
                ...colorPalette.root,
                level: 0,
                parentId: null
            });
        } else if (level === 1) {
            // All direct children of root get the same color (level 1 color)
            nodeColorMap.set(node.id, {
                ...colorPalette.levelColors[0], // First color in array for level 1
                level: 1,
                parentId: parentId
            });
        } else {
            // For level 2+, children with same parent get same color
            // Different parent groups get different colors
            let colorIndex;
            
            if (parentColorIndex.has(parentId)) {
                // Parent already has a color assigned, use the same for all children
                colorIndex = parentColorIndex.get(parentId);
            } else {
                // Assign next available color to this parent group
                // Use modulo to cycle through available colors
                const usedIndices = new Set(parentColorIndex.values());
                colorIndex = 1; // Start from index 1 (index 0 is for level 1)
                
                // Find next unused color index
                while (usedIndices.has(colorIndex)) {
                    colorIndex = (colorIndex + 1) % colorPalette.levelColors.length;
                    if (colorIndex === 0) colorIndex = 1; // Skip index 0 (reserved for level 1)
                }
                
                parentColorIndex.set(parentId, colorIndex);
            }
            
            nodeColorMap.set(node.id, {
                ...colorPalette.levelColors[colorIndex],
                level: level,
                parentId: parentId
            });
        }
        
        // Process children
        if (node.children && node.children.length > 0) {
            node.children.forEach(child => {
                assignColor(child, node.id, level + 1, parentColorIndex.get(node.id));
            });
        }
    }
    
    // Start color assignment from root
    assignColor(hierarchicalNode);
    
    // Debug: Log color assignments
    console.log('🎨 Node color assignments:', Array.from(nodeColorMap.entries()).map(([id, color]) => ({
        nodeId: id,
        level: color.level,
        parentId: color.parentId,
        background: color.background
    })));
    
    return nodeColorMap;
}

function convertToReactFlowFormat(hierarchicalNode) {
    const nodes = [];
    const edges = [];
    
    // Assign colors to all nodes first
    const nodeColors = assignNodeColors(hierarchicalNode);

    // Helper to count all descendants for width calculation
    function countDescendants(node) {
        if (!node.children || node.children.length === 0) return 1;
        return node.children.reduce((sum, child) => sum + countDescendants(child), 0);
    }

    // Recursive function to process nodes for vertical layout
    function processNode(node, parentId = null, level = 0, xOffset = 0) {
        const baseX = 50;
        const baseY = 50;
        const levelSpacing = 120; // Vertical spacing between levels
        const nodeSpacing = 180;  // Horizontal spacing between sibling subtrees

        // Calculate width of this subtree (in "leaf nodes")
        const subtreeWidth = countDescendants(node);
        // Calculate this node's x position (center of its subtree)
        let x = xOffset + (subtreeWidth * nodeSpacing) / 2 - nodeSpacing / 2;
        let y = baseY + (level * levelSpacing);

        // Get assigned color for this node
        const nodeColor = nodeColors.get(node.id);
        
        // Create ReactFlow node (data comes from Supabase Edge Function with validated structure)
        const reactFlowNode = {
            id: node.id,
            data: {
                label: node.text,           // 2-4 words as validated by Edge Function
                detail: node.detail,        // 1-2 sentences as validated by Edge Function
                messageIds: node.messageIds || [],
                color: nodeColor            // Add color info to node data
            },
            position: { x, y },
            type: 'default',
            style: {
                background: nodeColor ? nodeColor.background : '#f5f5f5',
                border: nodeColor ? nodeColor.border : '1px solid #ccc',
                borderRadius: '12px',
                padding: '12px',
                minWidth: '120px',
                boxShadow: nodeColor ? nodeColor.shadow : '0 2px 4px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)',
                // Add glassy effect styling
                borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
                color: nodeColor ? nodeColor.textColor : '#374151'
            }
        };
        nodes.push(reactFlowNode);

        // Create edge from parent to this node
        if (parentId) {
            edges.push({
                id: `e-${parentId}-${node.id}`,
                source: parentId,
                target: node.id,
                type: 'smoothstep',
                style: {
                    stroke: '#666',
                    strokeWidth: 2
                }
            });
        }

        // Process children, spreading them horizontally
        if (node.children && node.children.length > 0) {
            let childXOffset = xOffset;
            node.children.forEach((child) => {
                const childWidth = countDescendants(child);
                processNode(child, node.id, level + 1, childXOffset);
                childXOffset += childWidth * nodeSpacing;
            });
        }
    }

    // Start processing from root
    processNode(hierarchicalNode);

    return { nodes, edges };
}

// Function to automatically close ChatGPT's native sidebar
function closeChatGPTSidebar() {
    try {
        console.log('🔍 Attempting to close ChatGPT sidebar...');
        
        // Multiple selectors to try for different ChatGPT UI versions
        const sidebarSelectors = [
            // Modern ChatGPT sidebar close button selectors
            'button[aria-label="Close sidebar"]',
            'button[aria-label="Hide sidebar"]',
            'button[data-testid="sidebar-close"]',
            'button[data-testid="close-sidebar"]',
            
            // Legacy selectors
            'nav button[aria-label="Close sidebar"]',
            'aside button[aria-label="Close sidebar"]',
            '[data-testid="close-sidebar-button"]',
            
            // Generic close button in sidebar area
            'nav button:has(svg)',
            'aside button:has(svg)',
            
            // Sidebar toggle buttons
            'button[aria-label="Open sidebar"]', // This might be the toggle
            'button[aria-label="Toggle sidebar"]',
            
            // Look for hamburger/menu buttons that might control sidebar
            'button:has([data-testid="sidebar-icon"])',
            'button:has(svg[data-testid="hamburger"])'
        ];
        
        // Try each selector
        for (const selector of sidebarSelectors) {
            const button = document.querySelector(selector);
            if (button) {
                console.log(`✅ Found sidebar button with selector: ${selector}`);
                
                // Check if the sidebar is currently visible before clicking
                const sidebar = document.querySelector('nav, aside, [data-testid="sidebar"]');
                if (sidebar && sidebar.offsetWidth > 0 && sidebar.offsetHeight > 0) {
                    console.log('📱 ChatGPT sidebar is visible, closing it...');
                    button.click();
                    console.log('✅ ChatGPT sidebar close button clicked');
                    return;
                } else {
                    console.log('ℹ️  ChatGPT sidebar appears to already be closed');
                    return;
                }
            }
        }
        
        // Alternative approach: Try to find and hide the sidebar directly
        const sidebarElements = [
            'nav[role="navigation"]',
            'aside',
            '[data-testid="sidebar"]',
            'div[class*="sidebar"]',
            'nav',
            // Look for elements that might be the sidebar container
            'div:has(> div:contains("New chat"))',
            'div:has(button:contains("New chat"))'
        ];
        
        for (const selector of sidebarElements) {
            const sidebar = document.querySelector(selector);
            if (sidebar && sidebar.offsetWidth > 200) { // Assume sidebar is wider than 200px
                console.log(`🎯 Found potential sidebar element: ${selector}`);
                
                // Look for close/toggle button within this sidebar
                const closeBtn = sidebar.querySelector('button[aria-label*="close"], button[aria-label*="hide"], button[aria-label*="toggle"]');
                if (closeBtn) {
                    console.log('✅ Found close button in sidebar, clicking...');
                    closeBtn.click();
                    return;
                }
                
                // As a last resort, try to hide it with CSS (less ideal)
                console.log('⚠️  No close button found, hiding sidebar with CSS...');
                sidebar.style.display = 'none';
                sidebar.style.transform = 'translateX(-100%)';
                return;
            }
        }
        
        console.log('❌ Could not find ChatGPT sidebar to close');
        
    } catch (error) {
        console.error('❌ Error while trying to close ChatGPT sidebar:', error);
    }
}

// Function to restore ChatGPT's native sidebar
function openChatGPTSidebar() {
    try {
        console.log('🔍 Attempting to restore ChatGPT sidebar...');
        
        // Selectors for opening/showing the sidebar
        const openSelectors = [
            'button[aria-label="Open sidebar"]',
            'button[aria-label="Show sidebar"]',
            'button[aria-label="Toggle sidebar"]',
            'button[data-testid="sidebar-open"]',
            'button[data-testid="open-sidebar"]',
            'button[data-testid="sidebar-toggle"]',
            
            // Look for hamburger/menu buttons
            'button:has([data-testid="menu-icon"])',
            'button:has(svg[data-testid="hamburger"])',
            'button:has(svg[data-testid="menu"])',
            
            // Generic menu/hamburger buttons that might open sidebar
            'button[aria-label*="menu"]',
            'button[aria-label*="Menu"]'
        ];
        
        // Try each selector to find the open button
        for (const selector of openSelectors) {
            const button = document.querySelector(selector);
            if (button) {
                console.log(`✅ Found sidebar open button with selector: ${selector}`);
                
                // Check if sidebar is currently hidden before clicking
                const sidebar = document.querySelector('nav, aside, [data-testid="sidebar"]');
                if (!sidebar || sidebar.offsetWidth === 0 || sidebar.style.display === 'none') {
                    console.log('📱 ChatGPT sidebar is hidden, opening it...');
                    button.click();
                    console.log('✅ ChatGPT sidebar open button clicked');
                    return;
                } else {
                    console.log('ℹ️  ChatGPT sidebar appears to already be open');
                    return;
                }
            }
        }
        
        // Alternative: Try to restore previously hidden sidebars
        const hiddenSidebars = [
            'nav[style*="display: none"]',
            'aside[style*="display: none"]',
            'nav[style*="transform: translateX(-100%)"]',
            'aside[style*="transform: translateX(-100%)"]'
        ];
        
        for (const selector of hiddenSidebars) {
            const sidebar = document.querySelector(selector);
            if (sidebar) {
                console.log(`🎯 Found hidden sidebar, restoring: ${selector}`);
                sidebar.style.display = '';
                sidebar.style.transform = '';
                console.log('✅ ChatGPT sidebar restored');
                return;
            }
        }
        
        console.log('ℹ️  ChatGPT sidebar may already be open or no open button found');
        
    } catch (error) {
        console.error('❌ Error while trying to open ChatGPT sidebar:', error);
    }
}

// Function to adjust ChatGPT conversation content alignment for our sidebar
function adjustChatGPTContentAlignment(sidebarWidth) {
    try {
        console.log('🎯 Adjusting ChatGPT content alignment for sidebar width:', sidebarWidth);
        
        // Calculate available width (full window width minus our sidebar)
        const availableWidth = window.innerWidth - sidebarWidth;
        
        // Calculate content positioning to center in available space (not full page)
        let maxContentWidth;
        let leftOffset;
        let rightPadding;
        
        if (availableWidth > 800) {
            // Large screen: use 85% of available width for content
            maxContentWidth = Math.max(availableWidth * 0.85, 400);
            leftOffset = (availableWidth - maxContentWidth) / 2; // Center in available space
            rightPadding = Math.max(10, leftOffset);
        } else if (availableWidth > 400) {
            // Medium screen: use 90% of available width
            maxContentWidth = Math.max(availableWidth * 0.9, 350);
            leftOffset = (availableWidth - maxContentWidth) / 2;
            rightPadding = Math.max(5, leftOffset);
        } else {
            // Small screen: use 95% of available width
            maxContentWidth = Math.max(availableWidth * 0.95, 250);
            leftOffset = (availableWidth - maxContentWidth) / 2;
            rightPadding = Math.max(2, leftOffset);
        }
        
        console.log(`💡 Available: ${availableWidth}px, Content: ${maxContentWidth}px, LeftOffset: ${leftOffset}px`);
        console.log(`🔍 Window: ${window.innerWidth}px, Sidebar: ${sidebarWidth}px, Content%: ${(maxContentWidth/availableWidth*100).toFixed(1)}%`);
        console.log(`📍 Content positioning: [${leftOffset}px from left] [${maxContentWidth}px width] [${rightPadding}px to sidebar]`);
        
        // Find ChatGPT conversation content containers with comprehensive selectors
        const contentSelectors = [
            // Main conversation container selectors
            'main .flex.flex-col.text-sm',
            'main [class*="conversation"]',
            'main .flex-1',
            
            // More specific selectors for ChatGPT's layout
            '.flex.flex-col.text-sm.pb-9',
            '.flex.flex-col.text-sm',
            
            // Container that holds individual messages
            '.flex.flex-col.items-center.text-sm',
            '.gizmo\\:max-w-\\[48rem\\]',
            '.xl\\:max-w-3xl',
            '.md\\:max-w-3xl',
            '.max-w-3xl',
            
            // Additional common containers
            'div[class*="max-w"]',
            'main > div > div',
            'main .flex-1 > div',
            
            // Message containers specifically
            '[data-testid*="conversation"]',
            '.text-base',
            '.prose'
        ];
        
        // Apply adjustments to found elements
        for (const selector of contentSelectors) {
            const elements = document.querySelectorAll(selector);
            
            if (elements.length > 0) {
                console.log(`✅ Found ${elements.length} content element(s) with selector: ${selector}`);
                
                elements.forEach((element, index) => {
                    // Store original styles for restoration (only once)
                    if (!element.dataset.originalMaxWidth) {
                        const computedStyle = getComputedStyle(element);
                        element.dataset.originalMaxWidth = element.style.maxWidth || computedStyle.maxWidth;
                        element.dataset.originalMarginLeft = element.style.marginLeft || computedStyle.marginLeft;
                        element.dataset.originalMarginRight = element.style.marginRight || computedStyle.marginRight;
                        element.dataset.originalPaddingLeft = element.style.paddingLeft || computedStyle.paddingLeft;
                        element.dataset.originalPaddingRight = element.style.paddingRight || computedStyle.paddingRight;
                        element.dataset.originalWidth = element.style.width || computedStyle.width;
                    }
                    
                    // Apply positioning to center in available space (not full page)
                    element.style.maxWidth = `${maxContentWidth}px`;
                    element.style.width = `${maxContentWidth}px`;
                    element.style.marginLeft = `${leftOffset}px`; // Position from left edge of available space
                    element.style.marginRight = `${rightPadding}px`;
                    element.style.paddingLeft = '15px'; // Internal content padding
                    element.style.paddingRight = '15px';
                    element.style.boxSizing = 'border-box';
                    element.style.minWidth = `${Math.max(250, maxContentWidth * 0.8)}px`;
                    
                    console.log(`📐 Adjusted element ${index + 1}: width=${maxContentWidth}px, leftOffset=${leftOffset}px`);
                });
            }
        }
        
        // Adjust the main content area
        const mainContainer = document.querySelector('main');
        if (mainContainer) {
            // Store original styles for restoration
            if (!mainContainer.dataset.originalPaddingRight) {
                const computedStyle = getComputedStyle(mainContainer);
                mainContainer.dataset.originalPaddingRight = mainContainer.style.paddingRight || computedStyle.paddingRight;
                mainContainer.dataset.originalPaddingLeft = mainContainer.style.paddingLeft || computedStyle.paddingLeft;
                mainContainer.dataset.originalMarginRight = mainContainer.style.marginRight || computedStyle.marginRight;
            }
            
            // Apply container adjustments to account for sidebar
            mainContainer.style.paddingRight = `${sidebarWidth}px`; // Exact sidebar width
            mainContainer.style.paddingLeft = '0px'; // No left padding
            mainContainer.style.marginRight = '0px';
            mainContainer.style.marginLeft = '0px';
            mainContainer.style.boxSizing = 'border-box';
            mainContainer.style.width = '100%';
            
            console.log(`📝 Main container: rightPadding=${sidebarWidth}px, leftPadding=0px`);
        }
        
        // Apply comprehensive global style injection
        const globalStyleId = 'chatgpt-mindmap-content-adjustment';
        let globalStyle = document.getElementById(globalStyleId);
        
        if (!globalStyle) {
            globalStyle = document.createElement('style');
            globalStyle.id = globalStyleId;
            document.head.appendChild(globalStyle);
        }
        
        globalStyle.textContent = `
            /* CENTER content in available space (excluding sidebar) */
            
            /* Override ALL content containers to position correctly */
            main .flex.flex-col.text-sm,
            main .gizmo\\:xl\\:max-w-\\[48rem\\],
            main .xl\\:max-w-3xl,
            main .md\\:max-w-3xl,
            main .max-w-3xl,
            main .text-base,
            main .prose,
            main [class*="max-w"],
            main .relative.flex.h-full.max-w-full,
            main .flex.flex-col.text-sm.pb-9 {
                max-width: ${maxContentWidth}px !important;
                width: ${maxContentWidth}px !important;
                min-width: ${Math.max(250, maxContentWidth * 0.8)}px !important;
                margin-left: ${leftOffset}px !important;
                margin-right: ${rightPadding}px !important;
                padding-left: 15px !important;
                padding-right: 15px !important;
                box-sizing: border-box !important;
            }
            
            /* Main container - remove all default centering */
            main {
                padding-right: ${sidebarWidth}px !important;
                padding-left: 0px !important;
                margin-right: 0px !important;
                margin-left: 0px !important;
                box-sizing: border-box !important;
                width: 100% !important;
                max-width: 100% !important;
            }
            
            /* Override parent containers to not interfere with positioning */
            main > div,
            main > div > div,
            main .flex-1,
            main .flex-1 > div,
            main .relative {
                max-width: 100% !important;
                width: 100% !important;
                margin-left: 0 !important;
                margin-right: 0 !important;
                padding-left: 0 !important;
                padding-right: 0 !important;
            }
            
            /* Target specific conversation containers */
            [data-testid*="conversation"],
            .group,
            .w-full.text-token-text-primary {
                max-width: ${maxContentWidth}px !important;
                width: ${maxContentWidth}px !important;
                margin-left: ${leftOffset}px !important;
                margin-right: ${rightPadding}px !important;
                padding-left: 15px !important;
                padding-right: 15px !important;
                box-sizing: border-box !important;
            }
            
            /* Remove ChatGPT default centering behavior */
            main .flex.flex-col.items-center {
                align-items: flex-start !important;
                margin: 0 !important;
                padding-left: 0 !important;
                padding-right: 0 !important;
            }
            
            main .relative.flex.h-full,
            main .h-full {
                margin: 0 !important;
                padding-left: 0 !important;
                padding-right: 0 !important;
            }
            
            /* Ensure all content uses available space properly */
            main * {
                max-width: 100% !important;
                word-wrap: break-word !important;
                overflow-wrap: break-word !important;
                box-sizing: border-box !important;
            }
            
            /* Position any remaining wide elements */
            main div[class*="flex"],
            main div[class*="w-full"] {
                max-width: ${availableWidth}px !important;
                margin-left: 0 !important;
            }
        `;
        
        console.log('✅ Applied comprehensive global content alignment styles');
        
    } catch (error) {
        console.error('❌ Error adjusting ChatGPT content alignment:', error);
    }
}

// Function to restore ChatGPT content alignment when sidebar is closed
function restoreChatGPTContentAlignment() {
    try {
        console.log('🔄 Restoring original ChatGPT content alignment...');
        
        // Remove global style adjustments
        const globalStyle = document.getElementById('chatgpt-mindmap-content-adjustment');
        if (globalStyle) {
            globalStyle.remove();
            console.log('🗑️  Removed global style adjustments');
        }
        
        // Restore original styles for elements we modified
        const allElements = document.querySelectorAll('*');
        Array.from(allElements).forEach(element => {
            if (!element.dataset.originalMaxWidth) return;
            
            // Restore original styles
            element.style.maxWidth = element.dataset.originalMaxWidth;
            element.style.width = element.dataset.originalWidth || '';
            element.style.minWidth = '';
            element.style.marginLeft = element.dataset.originalMarginLeft || '';
            element.style.marginRight = element.dataset.originalMarginRight || '';
            element.style.paddingLeft = element.dataset.originalPaddingLeft || '';
            element.style.paddingRight = element.dataset.originalPaddingRight || '';
            element.style.boxSizing = '';
            
            // Clean up data attributes
            delete element.dataset.originalMaxWidth;
            delete element.dataset.originalWidth;
            delete element.dataset.originalMarginLeft;
            delete element.dataset.originalMarginRight;
            delete element.dataset.originalPaddingLeft;
            delete element.dataset.originalPaddingRight;
        });
        
        // Restore main container styles
        const mainContainer = document.querySelector('main');
        if (mainContainer && mainContainer.dataset.originalPaddingRight) {
            mainContainer.style.paddingRight = mainContainer.dataset.originalPaddingRight;
            mainContainer.style.paddingLeft = mainContainer.dataset.originalPaddingLeft || '';
            mainContainer.style.marginRight = mainContainer.dataset.originalMarginRight || '';
            mainContainer.style.marginLeft = '';
            mainContainer.style.boxSizing = '';
            mainContainer.style.width = '';
            mainContainer.style.display = '';
            mainContainer.style.justifyContent = '';
            
            delete mainContainer.dataset.originalPaddingRight;
            delete mainContainer.dataset.originalPaddingLeft;
            delete mainContainer.dataset.originalMarginRight;
        }
        
        console.log('✅ ChatGPT content alignment restored');
        
    } catch (error) {
        console.error('❌ Error restoring ChatGPT content alignment:', error);
    }
}

/**
 * MINDMAP SIDEBAR IMPLEMENTATION
 * 
 * Current State: Custom visual mindmap with DOM elements and SVG connections
 * Data Format: ReactFlow-compatible (nodes & edges) from Supabase hierarchical conversion
 * 
 * UPGRADE PATH TO REACTFLOW:
 * 1. Replace renderMindmapTree() with ReactFlow component
 * 2. Data is already in correct format - no changes needed
 * 3. Add package: npm install reactflow
 * 4. Import ReactFlow, Background, Controls, etc.
 * 5. Replace mindmapContainer with <ReactFlow nodes={nodes} edges={edges} />
 * 
 * CURRENT FEATURES:
 * ✅ Visual mindmap layout with positioned nodes
 * ✅ SVG connections between nodes  
 * ✅ Hover effects and click handlers
 * ✅ Scrollable container
 * ✅ Proper hierarchical positioning
 * 
 * FUTURE REACTFLOW FEATURES (easy to add):
 * 🔲 Drag and drop nodes
 * 🔲 Zoom and pan controls
 * 🔲 Node selection and multi-select
 * 🔲 Custom node types and styling
 * 🔲 Edge editing and custom edge types
 * 🔲 Minimap and background patterns
 * 🔲 Layout algorithms (auto-arrange)
 * 🔲 Export/import functionality
 */
function createSidebar(mindmapData) {
    // Remove existing sidebar if present
    const existingSidebar = document.getElementById('chatgpt-mindmap-sidebar');
    if (existingSidebar) {
        existingSidebar.remove();
    }
    
    // Close ChatGPT's native sidebar automatically
    closeChatGPTSidebar();
    
    // Get saved width from localStorage or default to 400px
    const savedWidth = localStorage.getItem('chatgpt-mindmap-sidebar-width') || '400';
    let currentWidth = parseInt(savedWidth);
    
    // Ensure width is within reasonable bounds
    const minWidth = 250;
    const maxWidth = window.innerWidth - 50; // Allow sidebar to expand across almost entire page (leave 50px margin)
    currentWidth = Math.max(minWidth, Math.min(maxWidth, currentWidth));
    
    // Create sidebar container
    const sidebar = document.createElement('div');
    sidebar.id = 'chatgpt-mindmap-sidebar';
    sidebar.style.cssText = `
        position: fixed;
        top: 0;
        right: 0;
        width: ${currentWidth}px;
        height: 100vh;
        background: white;
        border-left: 1px solid #e5e7eb;
        box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        overflow: hidden;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;
    
    // Create resize handle
    const resizeHandle = document.createElement('div');
    resizeHandle.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
        background: transparent;
        cursor: col-resize;
        z-index: 10001;
        transition: background-color 0.2s ease;
    `;
    
    // Add visual feedback on hover
    resizeHandle.addEventListener('mouseenter', () => {
        resizeHandle.style.background = '#10a37f';
    });
    
    resizeHandle.addEventListener('mouseleave', () => {
        if (!resizeHandle.isResizing) {
            resizeHandle.style.background = 'transparent';
        }
    });
    
    // Resize functionality
    let isResizing = false;
    let startX = 0;
    let startWidth = currentWidth;
    
    resizeHandle.addEventListener('mousedown', (e) => {
        isResizing = true;
        resizeHandle.isResizing = true;
        startX = e.clientX;
        startWidth = currentWidth;
        resizeHandle.style.background = '#10a37f';
        
        // Prevent text selection during resize
        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'col-resize';
        
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isResizing) return;
        
        const deltaX = startX - e.clientX; // Reversed because we're resizing from the left
        const dynamicMaxWidth = window.innerWidth - 50; // Recalculate max width during resize
        const newWidth = Math.max(minWidth, Math.min(dynamicMaxWidth, startWidth + deltaX));
        
        // Update sidebar width
        sidebar.style.width = `${newWidth}px`;
        currentWidth = newWidth;
        
        // Update main content margin
        const main = document.querySelector('main') || document.body;
        if (main) {
            main.style.marginRight = `${newWidth}px`;
        }
        
        // Adjust ChatGPT content alignment in real-time during resize
        adjustChatGPTContentAlignment(newWidth);
    });
    
    document.addEventListener('mouseup', () => {
        if (isResizing) {
            isResizing = false;
            resizeHandle.isResizing = false;
            resizeHandle.style.background = 'transparent';
            
            // Restore cursor and text selection
            document.body.style.userSelect = '';
            document.body.style.cursor = '';
            
            // Save the new width to localStorage
            localStorage.setItem('chatgpt-mindmap-sidebar-width', currentWidth.toString());
        }
    });
    
    // Create header with welcome page styling
    const header = document.createElement('div');
    header.style.cssText = `
        display: flex;
        flex-direction: column;
        padding: 20px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(15, 15, 15, 0.95);
        backdrop-filter: blur(20px);
        gap: 16px;
        position: relative;
    `;
    
    // Add animated background gradient overlay
    const gradientOverlay = document.createElement('div');
    gradientOverlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at 30% 70%, rgba(255, 107, 107, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 70% 30%, rgba(78, 205, 196, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 50% 50%, rgba(69, 183, 209, 0.1) 0%, transparent 50%);
        pointer-events: none;
        z-index: 1;
    `;
    header.appendChild(gradientOverlay);
    
    // Top row with title and close button
    const topRow = document.createElement('div');
    topRow.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        z-index: 2;
    `;
    
    const title = document.createElement('h3');
    const chatTitle = extractChatTitle();
    title.textContent = chatTitle;
    title.style.cssText = `
        margin: 0;
        font-size: 18px;
        font-weight: 700;
        background: linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 50%, #45b7d1 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        filter: drop-shadow(0 0 10px rgba(78, 205, 196, 0.3));
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    `;
    
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '✕';
    closeButton.style.cssText = `
        border: none;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: rgba(255, 255, 255, 0.9);
        font-size: 16px;
        cursor: pointer;
        padding: 10px 12px;
        border-radius: 12px;
        transition: all 0.3s ease;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    // Add hover effects for close button
    closeButton.addEventListener('mouseenter', () => {
        closeButton.style.background = 'rgba(255, 107, 107, 0.3)';
        closeButton.style.borderColor = 'rgba(255, 107, 107, 0.5)';
        closeButton.style.transform = 'scale(1.05)';
        closeButton.style.boxShadow = '0 6px 20px rgba(255, 107, 107, 0.4)';
    });
    
    closeButton.addEventListener('mouseleave', () => {
        closeButton.style.background = 'rgba(255, 255, 255, 0.1)';
        closeButton.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        closeButton.style.transform = 'scale(1)';
        closeButton.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    });
    
    closeButton.onclick = () => {
        sidebar.remove();
        
        // Restore widget position 
        setTimeout(() => {
            initializeWidgetPosition();
        }, 100);
        
        // Restore main content width and alignment
        const main = document.querySelector('main');
        if (main) {
            main.style.marginRight = '';
            main.style.marginLeft = '';
            main.style.width = '';
            main.style.maxWidth = '';
            main.style.minWidth = '';
            main.style.display = '';
            main.style.justifyContent = '';
            main.style.paddingRight = '';
            main.style.paddingLeft = '';
        }
        // Also reset body margin if changed
        document.body.style.marginRight = '';
        document.body.style.marginLeft = '';
        document.body.style.width = '';
        // Remove any global style tag injected for alignment
        const globalStyle = document.getElementById('chatgpt-mindmap-content-adjustment');
        if (globalStyle) globalStyle.remove();
        // Restore ChatGPT content alignment
        restoreChatGPTContentAlignment();
        // Restore ChatGPT's native sidebar
        openChatGPTSidebar();
        // Force reflow in case of sticky layout
        setTimeout(() => { window.dispatchEvent(new Event('resize')); }, 100);
    };
    
    topRow.appendChild(title);
    topRow.appendChild(closeButton);
    
    // Controls row with view toggle and zoom controls
    const controlsRow = document.createElement('div');
    controlsRow.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        position: relative;
        z-index: 2;
    `;
    
    // View toggle buttons with glassmorphism design
    const viewToggleGroup = document.createElement('div');
    viewToggleGroup.style.cssText = `
        display: flex;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 12px;
        padding: 4px;
        gap: 2px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    // Store current view mode
    let currentViewMode = localStorage.getItem('chatgpt-mindmap-view-mode') || 'tree';
    
    // Tree view button
    const treeViewBtn = document.createElement('button');
    treeViewBtn.innerHTML = '⌬';
    treeViewBtn.title = 'Tree View';
    treeViewBtn.style.cssText = `
        border: none;
        background: ${currentViewMode === 'tree' ? 'rgba(16, 163, 127, 0.8)' : 'transparent'};
        color: ${currentViewMode === 'tree' ? 'white' : 'rgba(255, 255, 255, 0.8)'};
        padding: 8px 12px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 16px;
        font-weight: 600;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
        border: 1px solid ${currentViewMode === 'tree' ? 'rgba(16, 163, 127, 0.6)' : 'transparent'};
        box-shadow: ${currentViewMode === 'tree' ? '0 4px 12px rgba(16, 163, 127, 0.3)' : 'none'};
        width: 40px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Compact view button
    const compactViewBtn = document.createElement('button');
    compactViewBtn.innerHTML = '≡';
    compactViewBtn.title = 'Compact View';
    compactViewBtn.style.cssText = `
        border: none;
        background: ${currentViewMode === 'compact' ? 'rgba(16, 163, 127, 0.8)' : 'transparent'};
        color: ${currentViewMode === 'compact' ? 'white' : 'rgba(255, 255, 255, 0.8)'};
        padding: 8px 12px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 16px;
        font-weight: 600;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
        border: 1px solid ${currentViewMode === 'compact' ? 'rgba(16, 163, 127, 0.6)' : 'transparent'};
        box-shadow: ${currentViewMode === 'compact' ? '0 4px 12px rgba(16, 163, 127, 0.3)' : 'none'};
        width: 40px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // List view button
    const listViewBtn = document.createElement('button');
    listViewBtn.innerHTML = '☰';
    listViewBtn.title = 'List View';
    listViewBtn.style.cssText = `
        border: none;
        background: ${currentViewMode === 'list' ? 'rgba(16, 163, 127, 0.8)' : 'transparent'};
        color: ${currentViewMode === 'list' ? 'white' : 'rgba(255, 255, 255, 0.8)'};
        padding: 8px 12px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 16px;
        font-weight: 600;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
        border: 1px solid ${currentViewMode === 'list' ? 'rgba(16, 163, 127, 0.6)' : 'transparent'};
        box-shadow: ${currentViewMode === 'list' ? '0 4px 12px rgba(16, 163, 127, 0.3)' : 'none'};
        width: 40px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Add hover effects for view toggle buttons
    [treeViewBtn, compactViewBtn, listViewBtn].forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            if (btn.style.background === 'transparent' || !btn.style.background.includes('rgba(16, 163, 127')) {
                btn.style.background = 'rgba(255, 255, 255, 0.2)';
                btn.style.transform = 'scale(1.05)';
            }
        });
        
        btn.addEventListener('mouseleave', () => {
            if (!btn.style.background.includes('rgba(16, 163, 127')) {
                btn.style.background = 'transparent';
                btn.style.transform = 'scale(1)';
            }
        });
    });
    
    viewToggleGroup.appendChild(treeViewBtn);
    viewToggleGroup.appendChild(compactViewBtn);
    viewToggleGroup.appendChild(listViewBtn);
    
    // Expand button with beautiful styling
    const expandBtn = document.createElement('button');
    expandBtn.innerHTML = '⤢';
    expandBtn.title = 'Expand Fullscreen';
    expandBtn.style.cssText = `
        border: none;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: rgba(255, 255, 255, 0.9);
        padding: 10px 12px;
        border-radius: 10px;
        cursor: pointer;
        font-size: 16px;
        font-weight: 600;
        transition: all 0.3s ease;
        margin-right: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        width: 40px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    expandBtn.addEventListener('mouseenter', () => {
        expandBtn.style.background = 'rgba(78, 205, 196, 0.3)';
        expandBtn.style.borderColor = 'rgba(78, 205, 196, 0.5)';
        expandBtn.style.transform = 'scale(1.05)';
        expandBtn.style.boxShadow = '0 6px 20px rgba(78, 205, 196, 0.4)';
    });
    
    expandBtn.addEventListener('mouseleave', () => {
        expandBtn.style.background = 'rgba(255, 255, 255, 0.1)';
        expandBtn.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        expandBtn.style.transform = 'scale(1)';
        expandBtn.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    });
    
    // Zoom controls with glassmorphism design
    const zoomControls = document.createElement('div');
    zoomControls.style.cssText = `
        display: flex;
        align-items: center;
        gap: 6px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 12px;
        padding: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    // Store current zoom level - always start new mindmaps at 100% zoom
    let currentZoom = 1.0;
    
    // Zoom out button
    const zoomOutBtn = document.createElement('button');
    zoomOutBtn.innerHTML = '−';
    zoomOutBtn.title = 'Zoom Out';
    zoomOutBtn.style.cssText = `
        border: none;
        background: rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.9);
        padding: 8px 12px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 16px;
        font-weight: 600;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
        border: 1px solid transparent;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Zoom level display
    const zoomDisplay = document.createElement('span');
    zoomDisplay.textContent = `${Math.round(currentZoom * 100)}%`;
    zoomDisplay.style.cssText = `
        font-size: 13px;
        color: rgba(255, 255, 255, 0.9);
        min-width: 42px;
        text-align: center;
        font-weight: 600;
        text-shadow: 0 0 10px rgba(78, 205, 196, 0.5);
    `;
    
    // Zoom in button
    const zoomInBtn = document.createElement('button');
    zoomInBtn.innerHTML = '+';
    zoomInBtn.title = 'Zoom In';
    zoomInBtn.style.cssText = `
        border: none;
        background: rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.9);
        padding: 8px 12px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 16px;
        font-weight: 600;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
        border: 1px solid transparent;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Reset zoom button
    const resetZoomBtn = document.createElement('button');
    resetZoomBtn.innerHTML = '⌂';
    resetZoomBtn.title = 'Reset Zoom';
    resetZoomBtn.style.cssText = `
        border: none;
        background: rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.9);
        padding: 8px 12px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 18px;
        font-weight: 600;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
        border: 1px solid transparent;
        margin-left: 2px;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Add hover effects for zoom buttons
    [zoomOutBtn, zoomInBtn, resetZoomBtn].forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.background = 'rgba(69, 183, 209, 0.3)';
            btn.style.borderColor = 'rgba(69, 183, 209, 0.5)';
            btn.style.transform = 'scale(1.05)';
            btn.style.boxShadow = '0 4px 12px rgba(69, 183, 209, 0.4)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.background = 'rgba(255, 255, 255, 0.1)';
            btn.style.borderColor = 'transparent';
            btn.style.transform = 'scale(1)';
            btn.style.boxShadow = 'none';
        });
    });
    
    zoomControls.appendChild(zoomOutBtn);
    zoomControls.appendChild(zoomDisplay);
    zoomControls.appendChild(zoomInBtn);
    zoomControls.appendChild(resetZoomBtn);
    
    controlsRow.appendChild(viewToggleGroup);
    controlsRow.appendChild(expandBtn);
    controlsRow.appendChild(zoomControls);
    
    header.appendChild(topRow);
    header.appendChild(controlsRow);
    
    // Create mindmap container
    const mindmapContainer = document.createElement('div');
    mindmapContainer.style.cssText = `
        width: 100%;
        height: calc(100vh - 120px);
        padding: 16px;
        overflow: auto;
    `;
    
    // Function to update zoom
    function updateZoom(newZoom, smooth = true) {
        currentZoom = Math.max(0.25, Math.min(3.0, newZoom)); // Limit zoom between 25% and 300%
        zoomDisplay.textContent = `${Math.round(currentZoom * 100)}%`;
        // Note: Not saving zoom to localStorage - each new mindmap starts fresh at 100%
        
        // Apply zoom to mindmap zoom container (this scales both nodes and SVG edges together)
        const zoomContainer = mindmapContainer.querySelector('.mindmap-zoom-container');
        if (zoomContainer) {
            zoomContainer.style.transform = `scale(${currentZoom})`;
            zoomContainer.style.transition = smooth ? 'transform 0.15s ease-out' : 'none';
            console.log(`🔍 Updated zoom to ${Math.round(currentZoom * 100)}% - edges should scale properly with nodes`);
        }
    }
    
    // Function to update view mode
    function updateViewMode(newMode) {
        currentViewMode = newMode;
        localStorage.setItem('chatgpt-mindmap-view-mode', currentViewMode);
        
        // Update button appearances with beautiful styling
        [treeViewBtn, compactViewBtn, listViewBtn].forEach(btn => {
            btn.style.background = 'transparent';
            btn.style.color = 'rgba(255, 255, 255, 0.8)';
            btn.style.border = '1px solid transparent';
            btn.style.boxShadow = 'none';
        });
        
        if (newMode === 'tree') {
            treeViewBtn.style.background = 'rgba(16, 163, 127, 0.8)';
            treeViewBtn.style.color = 'white';
            treeViewBtn.style.border = '1px solid rgba(16, 163, 127, 0.6)';
            treeViewBtn.style.boxShadow = '0 4px 12px rgba(16, 163, 127, 0.3)';
        } else if (newMode === 'compact') {
            compactViewBtn.style.background = 'rgba(16, 163, 127, 0.8)';
            compactViewBtn.style.color = 'white';
            compactViewBtn.style.border = '1px solid rgba(16, 163, 127, 0.6)';
            compactViewBtn.style.boxShadow = '0 4px 12px rgba(16, 163, 127, 0.3)';
        } else if (newMode === 'list') {
            listViewBtn.style.background = 'rgba(16, 163, 127, 0.8)';
            listViewBtn.style.color = 'white';
            listViewBtn.style.border = '1px solid rgba(16, 163, 127, 0.6)';
            listViewBtn.style.boxShadow = '0 4px 12px rgba(16, 163, 127, 0.3)';
        }
        
        // Re-render mindmap with new view mode
        renderMindmapTree(mindmapContainer, mindmapData, currentViewMode, currentZoom);
    }
    
    // View toggle event handlers
    treeViewBtn.onclick = () => updateViewMode('tree');
    compactViewBtn.onclick = () => updateViewMode('compact');
    listViewBtn.onclick = () => updateViewMode('list');
    
    // Zoom control event handlers
    zoomInBtn.onclick = () => updateZoom(currentZoom + 0.1);
    zoomOutBtn.onclick = () => updateZoom(currentZoom - 0.1);
    resetZoomBtn.onclick = () => updateZoom(1.0);
    
    // Expand button event handler
    expandBtn.onclick = () => showFullscreenMindmap(mindmapData, currentViewMode, currentZoom);
    
    // Handle smooth mouse wheel zoom with variable sensitivity for sidebar
    let sidebarZoomTimeoutId = null;
    mindmapContainer.addEventListener('wheel', (e) => {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            
            // Calculate granular zoom delta based on wheel velocity
            const baseZoomStep = 0.02; // Much smaller base step for granular control
            const velocityMultiplier = Math.min(Math.abs(e.deltaY) / 100, 3); // Scale with scroll speed, max 3x
            const zoomStep = baseZoomStep * velocityMultiplier;
            
            const delta = e.deltaY > 0 ? -zoomStep : zoomStep;
            
            // Apply zoom without smooth transition for immediate response
            updateZoom(currentZoom + delta, false);
            
            // Clear any pending timeout and set a new one for smooth transition back
            if (sidebarZoomTimeoutId) {
                clearTimeout(sidebarZoomTimeoutId);
            }
            
            sidebarZoomTimeoutId = setTimeout(() => {
                // Re-apply current zoom with smooth transition for polish
                const zoomContainer = mindmapContainer.querySelector('.mindmap-zoom-container');
                if (zoomContainer) {
                    zoomContainer.style.transition = 'transform 0.2s ease-out';
                }
                sidebarZoomTimeoutId = null;
            }, 50);
        }
    });
    
    // Render mindmap with current settings
    renderMindmapTree(mindmapContainer, mindmapData, currentViewMode, currentZoom);
    
    // Assemble sidebar
    sidebar.appendChild(resizeHandle);
    sidebar.appendChild(header);
    sidebar.appendChild(mindmapContainer);
    
    // Add to page
    document.body.appendChild(sidebar);
    
    // Position widget next to mindmap title in sidebar
    setTimeout(() => {
        positionWidgetNearMindmapTitle(sidebar);
    }, 100); // Small delay to ensure sidebar is fully rendered
    
    // Adjust main content width to accommodate sidebar
    const main = document.querySelector('main') || document.body;
    if (main) {
        main.style.marginRight = `${currentWidth}px`;
    }
    
    // Adjust ChatGPT conversation content to be centered in remaining space
    adjustChatGPTContentAlignment(currentWidth);
}

// Function to render mindmap in a visual format (foundation for ReactFlow)
function renderMindmapTree(container, mindmapData, viewMode = 'tree', zoomLevel = 1.0) {
    container.innerHTML = '';
    
    if (!mindmapData || !mindmapData.nodes || mindmapData.nodes.length === 0) {
        container.innerHTML = '<p style="color: #6b7280; text-align: center; margin-top: 20px;">No mindmap data available</p>';
        return;
    }
    
    // Render based on view mode (each view creates its own full-size environment)
    if (viewMode === 'list') {
        renderListView(container, mindmapData);
    } else if (viewMode === 'compact') {
        renderCompactView(container, mindmapData);
    } else {
        renderTreeView(container, mindmapData);
    }
    
    // Apply zoom to the zoomable container after rendering
    setTimeout(() => {
        const zoomContainer = container.querySelector('.mindmap-zoom-container');
        if (zoomContainer) {
            zoomContainer.style.transform = `scale(${zoomLevel})`;
            zoomContainer.style.transition = 'transform 0.2s ease';
            console.log(`🔍 Applied zoom level ${zoomLevel} to mindmap container`);
        }
    }, 0);
}

// Function to render tree view (original visual mindmap)
// 
// EDGE VISIBILITY FIX:
// Previously, SVG edges would disappear when scrolling because the SVG container
// was sized to 100% of its immediate container, not the full content dimensions.
// This meant edges connecting nodes in scrolled-out areas weren't rendered.
// 
// SOLUTION:
// 1. Size SVG to match full content dimensions (contentWidth x contentHeight)
// 2. Set proper viewBox to ensure coordinate system alignment
// 3. Use absolute node positions for edge coordinates (not viewport-relative)
// 4. Zoom scaling applies to entire container (nodes + SVG together)
//
// This ensures edges are always visible regardless of scroll position or zoom level.
function renderTreeView(container, mindmapData) {
    // Calculate content dimensions
    const nodeBounds = mindmapData.nodes.reduce((bounds, node) => {
        const nodeWidth = 200; // max-width from CSS
        const nodeHeight = 60;  // estimated height
        return {
            minX: Math.min(bounds.minX, node.position.x),
            maxX: Math.max(bounds.maxX, node.position.x + nodeWidth),
            minY: Math.min(bounds.minY, node.position.y),
            maxY: Math.max(bounds.maxY, node.position.y + nodeHeight)
        };
    }, { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity });
    
    const contentWidth = Math.max(800, nodeBounds.maxX - nodeBounds.minX + 200);
    const contentHeight = Math.max(600, nodeBounds.maxY - nodeBounds.minY + 200);
    
    // Create full-size mindmap environment (always fills container)
    const mindmapEnvironment = document.createElement('div');
    mindmapEnvironment.style.cssText = `
        position: relative;
        width: 100%;
        height: 100%;
        overflow: auto;
        background: radial-gradient(circle at 30% 70%, rgba(255, 107, 107, 0.03) 0%, transparent 50%),
                    radial-gradient(circle at 70% 30%, rgba(78, 205, 196, 0.03) 0%, transparent 50%),
                    radial-gradient(circle at 50% 50%, rgba(69, 183, 209, 0.03) 0%, transparent 50%),
                    rgba(250, 250, 250, 0.95);
        backdrop-filter: blur(5px);
        border-radius: 12px;
        border-top: 1px solid rgba(255, 255, 255, 0.6);
        border-left: 1px solid rgba(255, 255, 255, 0.4);
        border-right: 1px solid rgba(200, 200, 200, 0.2);
        border-bottom: 1px solid rgba(200, 200, 200, 0.2);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8),
                    inset 1px 0 0 rgba(255, 255, 255, 0.6),
                    0 2px 8px rgba(0, 0, 0, 0.04);
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Create scrollable content area within the environment
    const scrollableContent = document.createElement('div');
    scrollableContent.style.cssText = `
        position: relative;
        width: ${contentWidth}px;
        height: ${contentHeight}px;
        min-width: 100%;
        min-height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Create zoomable mindmap container
    const mindmapContainer = document.createElement('div');
    mindmapContainer.className = 'mindmap-zoom-container';
    mindmapContainer.style.cssText = `
        position: relative;
        width: ${contentWidth}px;
        height: ${contentHeight}px;
        transform-origin: center center;
    `;
    
    // Create SVG for connections (edges) - sized to match actual content dimensions
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: ${contentWidth}px;
        height: ${contentHeight}px;
        pointer-events: none;
        z-index: 1;
        overflow: visible;
    `;
    
    // Set SVG viewBox to match content dimensions for proper coordinate mapping
    svg.setAttribute('viewBox', `0 0 ${contentWidth} ${contentHeight}`);
    
    // Create container for nodes
    const nodesContainer = document.createElement('div');
    nodesContainer.style.cssText = `
        position: relative;
        z-index: 2;
        width: 100%;
        height: 100%;
        padding: 20px;
        box-sizing: border-box;
    `;
    
    // Render nodes first so we can measure them
    const renderedNodes = new Map();
    mindmapData.nodes.forEach(node => {
        const nodeElement = createMindmapNode(node, 'tree');
        nodesContainer.appendChild(nodeElement);
        renderedNodes.set(node.id, { node, element: nodeElement });
    });
    
    // Assemble the hierarchy: environment -> scrollable content -> zoomable container -> content
    mindmapContainer.appendChild(svg);
    mindmapContainer.appendChild(nodesContainer);
    scrollableContent.appendChild(mindmapContainer);
    mindmapEnvironment.appendChild(scrollableContent);
    container.appendChild(mindmapEnvironment);
    
    // Render edges after nodes are in DOM (so we can get actual dimensions)
    setTimeout(() => {
        console.log(`🔗 Rendering ${mindmapData.edges.length} edges for mindmap with content dimensions: ${contentWidth}x${contentHeight}`);
        mindmapData.edges.forEach(edge => {
            const sourceNodeData = renderedNodes.get(edge.source);
            const targetNodeData = renderedNodes.get(edge.target);
            if (sourceNodeData && targetNodeData) {
                createConnection(svg, sourceNodeData, targetNodeData);
            } else {
                console.warn(`⚠️ Could not find nodes for edge: ${edge.source} -> ${edge.target}`);
            }
        });
        console.log(`✅ SVG edges rendered with viewBox: 0 0 ${contentWidth} ${contentHeight}`);
    }, 0);
}

// Function to render compact view (smaller nodes, tighter layout)
function renderCompactView(container, mindmapData) {
    // Create full-size mindmap environment
    const mindmapEnvironment = document.createElement('div');
    mindmapEnvironment.style.cssText = `
        position: relative;
        width: 100%;
        height: 100%;
        overflow: auto;
        background: #fafafa;
        border-radius: 8px;
        display: flex;
        align-items: flex-start;
        justify-content: center;
    `;
    
    // Create scrollable content area
    const scrollableContent = document.createElement('div');
    scrollableContent.style.cssText = `
        position: relative;
        width: 100%;
        min-height: 100%;
        padding: 16px;
        box-sizing: border-box;
    `;
    
    // Create zoomable container for compact view
    const compactContainer = document.createElement('div');
    compactContainer.className = 'mindmap-zoom-container';
    compactContainer.style.cssText = `
        position: relative;
        width: 100%;
        min-height: 100%;
        transform-origin: top center;
    `;
    
    // Build hierarchy for compact rendering
    const hierarchy = buildHierarchy(mindmapData.nodes, mindmapData.edges);
    renderCompactNode(compactContainer, hierarchy, 0);
    
    // Assemble the hierarchy
    scrollableContent.appendChild(compactContainer);
    mindmapEnvironment.appendChild(scrollableContent);
    container.appendChild(mindmapEnvironment);
}

// Function to render list view (hierarchical list)
function renderListView(container, mindmapData) {
    // Create full-size mindmap environment
    const mindmapEnvironment = document.createElement('div');
    mindmapEnvironment.style.cssText = `
        position: relative;
        width: 100%;
        height: 100%;
        overflow: auto;
        background: #fafafa;
        border-radius: 8px;
        display: flex;
        align-items: flex-start;
        justify-content: center;
    `;
    
    // Create scrollable content area
    const scrollableContent = document.createElement('div');
    scrollableContent.style.cssText = `
        position: relative;
        width: 100%;
        min-height: 100%;
        padding: 16px;
        box-sizing: border-box;
    `;
    
    // Create zoomable container for list view
    const listContainer = document.createElement('div');
    listContainer.className = 'mindmap-zoom-container';
    listContainer.style.cssText = `
        position: relative;
        width: 100%;
        min-height: 100%;
        transform-origin: top center;
    `;
    
    // Build hierarchy for list rendering
    const hierarchy = buildHierarchy(mindmapData.nodes, mindmapData.edges);
    renderListNode(listContainer, hierarchy, 0);
    
    // Assemble the hierarchy
    scrollableContent.appendChild(listContainer);
    mindmapEnvironment.appendChild(scrollableContent);
    container.appendChild(mindmapEnvironment);
}

// Helper function to build node hierarchy from flat structure
function buildHierarchy(nodes, edges) {
    const nodeMap = new Map(nodes.map(node => [node.id, { ...node, children: [] }]));
    const roots = [];
    
    // Build parent-child relationships
    edges.forEach(edge => {
        const parent = nodeMap.get(edge.source);
        const child = nodeMap.get(edge.target);
        if (parent && child) {
            parent.children.push(child);
        }
    });
    
    // Find root nodes (nodes with no incoming edges)
    const childIds = new Set(edges.map(edge => edge.target));
    nodes.forEach(node => {
        if (!childIds.has(node.id)) {
            roots.push(nodeMap.get(node.id));
        }
    });
    
    return roots.length === 1 ? roots[0] : { id: 'virtual-root', data: { label: 'Mindmap', detail: '' }, children: roots };
}

// Recursive function to render compact nodes
function renderCompactNode(container, node, level) {
    const nodeDiv = document.createElement('div');
    nodeDiv.setAttribute('data-node-id', node.id);
    nodeDiv.style.cssText = `
        margin: 4px 0;
        margin-left: ${level * 20}px;
        padding: 6px 10px;
        background: ${level === 0 ? '#e3f2fd' : '#f8f9fa'};
        border: 1px solid #e9ecef;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 12px;
        line-height: 1.3;
    `;
    
    nodeDiv.innerHTML = `
        <div style="font-weight: 600; color: #1a1a1a; margin-bottom: 2px;">${node.data.label}</div>
        <div style="color: #666; font-size: 11px; display: ${node.data.detail ? 'block' : 'none'};">${node.data.detail || ''}</div>
    `;
    
    // Add hover effect with tooltip
    let hoverTimeout;
    nodeDiv.addEventListener('mouseenter', (e) => {
        nodeDiv.style.background = '#e8f4fd';
        nodeDiv.style.transform = 'translateX(2px)';
        
        // Show hover tooltip after brief delay
        hoverTimeout = setTimeout(() => {
            showNodeTooltip(e, node, 'hover');
        }, 500);
    });
    
    nodeDiv.addEventListener('mouseleave', () => {
        nodeDiv.style.background = level === 0 ? '#e3f2fd' : '#f8f9fa';
        nodeDiv.style.transform = 'translateX(0)';
        
        // Clear hover timeout and hide hover tooltip
        clearTimeout(hoverTimeout);
        hideTooltip('hover');
    });
    
    // Add click handler for detailed tooltip
    nodeDiv.addEventListener('click', (e) => {
        e.stopPropagation();
        showNodeTooltip(e, node, 'click');
    });
    
    container.appendChild(nodeDiv);
    
    // Render children
    if (node.children && node.children.length > 0) {
        node.children.forEach(child => {
            renderCompactNode(container, child, level + 1);
        });
    }
}

// Recursive function to render list nodes
function renderListNode(container, node, level) {
    const listItem = document.createElement('div');
    listItem.style.cssText = `
        margin: 8px 0;
        margin-left: ${level * 24}px;
        position: relative;
    `;
    
    // Add bullet point for non-root nodes
    if (level > 0) {
        const bullet = document.createElement('div');
        bullet.style.cssText = `
            position: absolute;
            left: -16px;
            top: 8px;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #6b7280;
        `;
        listItem.appendChild(bullet);
    }
    
    const content = document.createElement('div');
    content.setAttribute('data-node-id', node.id);
    content.style.cssText = `
        padding: 8px 12px;
        background: #ffffff;
        border: 1px solid #e5e7eb;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s ease;
    `;
    
    content.innerHTML = `
        <div style="font-weight: 600; color: #111827; margin-bottom: 4px; font-size: ${level === 0 ? '16px' : '14px'};">${node.data.label}</div>
        <div style="color: #6b7280; font-size: 13px; line-height: 1.4; display: ${node.data.detail ? 'block' : 'none'};">${node.data.detail || ''}</div>
    `;
    
    // Add hover effect with tooltip
    let hoverTimeout;
    content.addEventListener('mouseenter', (e) => {
        content.style.background = '#f9fafb';
        content.style.borderColor = '#d1d5db';
        content.style.transform = 'translateY(-1px)';
        content.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        
        // Show hover tooltip after brief delay
        hoverTimeout = setTimeout(() => {
            showNodeTooltip(e, node, 'hover');
        }, 500);
    });
    
    content.addEventListener('mouseleave', () => {
        content.style.background = '#ffffff';
        content.style.borderColor = '#e5e7eb';
        content.style.transform = 'translateY(0)';
        content.style.boxShadow = 'none';
        
        // Clear hover timeout and hide hover tooltip
        clearTimeout(hoverTimeout);
        hideTooltip('hover');
    });
    
    // Add click handler for detailed tooltip
    content.addEventListener('click', (e) => {
        e.stopPropagation();
        showNodeTooltip(e, node, 'click');
    });
    
    listItem.appendChild(content);
    container.appendChild(listItem);
    
    // Render children
    if (node.children && node.children.length > 0) {
        node.children.forEach(child => {
            renderListNode(container, child, level + 1);
        });
    }
}

// Function to create individual mindmap node element
function createMindmapNode(node, viewMode = 'tree') {
    const nodeElement = document.createElement('div');
    nodeElement.id = `mindmap-node-${node.id}`;
    nodeElement.setAttribute('data-node-id', node.id);
    
    // Position the node based on ReactFlow position
    const x = node.position.x;
    const y = node.position.y;
    
    // Get color information from node data
    const nodeColor = node.data?.color;
    
    nodeElement.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        min-width: 120px;
        max-width: 200px;
        padding: 12px;
        background: ${nodeColor?.background || node.style?.background || 'rgba(255, 255, 255, 0.15)'};
        border: ${nodeColor?.border || node.style?.border || '1px solid rgba(255, 255, 255, 0.2)'};
        border-radius: ${node.style?.borderRadius || '12px'};
        box-shadow: ${nodeColor?.shadow || '0 4px 8px rgba(0, 0, 0, 0.1)'};
        backdrop-filter: blur(10px);
        border-top: 1px solid rgba(255, 255, 255, 0.3);
        border-left: 1px solid rgba(255, 255, 255, 0.2);
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 13px;
        line-height: 1.4;
        color: ${nodeColor?.textColor || '#374151'};
    `;
    
    // Add enhanced hover effect with glassy styling
    let hoverTimeout;
    const originalShadow = nodeColor?.shadow || '0 4px 8px rgba(0, 0, 0, 0.1)';
    const enhancedShadow = nodeColor ? 
        nodeColor.shadow.replace('0.2)', '0.4)').replace('12px', '16px') : 
        '0 6px 12px rgba(0, 0, 0, 0.2)';
    
    nodeElement.addEventListener('mouseenter', (e) => {
        nodeElement.style.boxShadow = enhancedShadow;
        nodeElement.style.transform = 'translateY(-2px) scale(1.02)';
        nodeElement.style.borderTop = '1px solid rgba(255, 255, 255, 0.5)';
        nodeElement.style.borderLeft = '1px solid rgba(255, 255, 255, 0.4)';
        
        // Show hover tooltip after brief delay
        hoverTimeout = setTimeout(() => {
            showNodeTooltip(e, node, 'hover');
        }, 500); // 500ms delay for hover
    });
    
    nodeElement.addEventListener('mouseleave', () => {
        nodeElement.style.boxShadow = originalShadow;
        nodeElement.style.transform = 'translateY(0) scale(1)';
        nodeElement.style.borderTop = '1px solid rgba(255, 255, 255, 0.3)';
        nodeElement.style.borderLeft = '1px solid rgba(255, 255, 255, 0.2)';
        
        // Clear hover timeout and hide hover tooltip
        clearTimeout(hoverTimeout);
        hideTooltip('hover');
    });
    
    // Node content: Only show the 2-4 word gist (label)
    const nodeTitle = document.createElement('div');
    nodeTitle.textContent = node.data.label;
    nodeTitle.style.cssText = `
        font-weight: 600;
        color: ${nodeColor?.textColor || '#111827'};
        margin-bottom: 0;
        font-size: 14px;
        text-align: center;
        white-space: pre-line;
        text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5);
    `;
    
    nodeElement.appendChild(nodeTitle);
    
    // Add click handler with persistent tooltip
    nodeElement.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling
        console.log('Node clicked:', node);
        
        // Show persistent tooltip on click
        showNodeTooltip(e, node, 'click');
    });
    
    return nodeElement;
}

// Function to hide tooltips by type
function hideTooltip(type) {
    const tooltipId = type === 'hover' ? 'node-tooltip-hover' : 'node-tooltip-click';
    const existingTooltip = document.getElementById(tooltipId);
    if (existingTooltip) {
        existingTooltip.style.opacity = '0';
        setTimeout(() => {
            if (existingTooltip.parentNode) {
                existingTooltip.remove();
            }
        }, 200); // Fade out duration
    }
}

// Function to calculate optimal tooltip position to avoid covering the node
function calculateTooltipPosition(nodeElement, tooltipWidth = 300, tooltipHeight = 120) {
    const nodeRect = nodeElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const spacing = 10; // Space between node and tooltip
    
    let x, y;
    let position = 'right'; // Default position
    
    // Try positioning to the right of the node
    if (nodeRect.right + spacing + tooltipWidth <= viewportWidth) {
        x = nodeRect.right + spacing;
        y = nodeRect.top + (nodeRect.height / 2) - (tooltipHeight / 2);
        position = 'right';
    }
    // Try positioning to the left of the node
    else if (nodeRect.left - spacing - tooltipWidth >= 0) {
        x = nodeRect.left - spacing - tooltipWidth;
        y = nodeRect.top + (nodeRect.height / 2) - (tooltipHeight / 2);
        position = 'left';
    }
    // Try positioning below the node
    else if (nodeRect.bottom + spacing + tooltipHeight <= viewportHeight) {
        x = nodeRect.left + (nodeRect.width / 2) - (tooltipWidth / 2);
        y = nodeRect.bottom + spacing;
        position = 'bottom';
    }
    // Try positioning above the node
    else if (nodeRect.top - spacing - tooltipHeight >= 0) {
        x = nodeRect.left + (nodeRect.width / 2) - (tooltipWidth / 2);
        y = nodeRect.top - spacing - tooltipHeight;
        position = 'top';
    }
    // Fallback: position to the right with adjustments to stay in viewport
    else {
        x = Math.min(nodeRect.right + spacing, viewportWidth - tooltipWidth - 10);
        y = Math.max(10, Math.min(nodeRect.top, viewportHeight - tooltipHeight - 10));
        position = 'right';
    }
    
    // Ensure tooltip stays within viewport bounds
    x = Math.max(10, Math.min(x, viewportWidth - tooltipWidth - 10));
    y = Math.max(10, Math.min(y, viewportHeight - tooltipHeight - 10));
    
    return { x, y, position };
}

// Function to show detailed node information in a tooltip
function showNodeTooltip(event, node, type = 'click') {
    const tooltipId = type === 'hover' ? 'node-tooltip-hover' : 'node-tooltip-click';
    
    // Remove existing tooltip of the same type
    hideTooltip(type);
    
    // Get the node element for positioning
    const nodeElement = event.target.closest('[data-node-id]');
    if (!nodeElement) return;
    
    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.id = tooltipId;
    tooltip.className = `node-tooltip ${type}`;
    
    // Calculate dimensions (approximate)
    const tooltipWidth = 300;
    const tooltipHeight = type === 'hover' ? 80 : 120;
    
    // Calculate optimal position
    const position = calculateTooltipPosition(nodeElement, tooltipWidth, tooltipHeight);
    
    // Check if we're in fullscreen mode to adjust z-index
    const isFullscreen = !!document.getElementById('fullscreen-mindmap-popup');
    const baseZIndex = isFullscreen ? 100000 : 10000; // Higher z-index for fullscreen mode
    
    // Base styles
    const baseStyles = `
        position: fixed;
        z-index: ${baseZIndex + (type === 'hover' ? 1 : 2)};
        background: ${type === 'hover' ? '#374151' : '#1f2937'};
        color: #f9fafb;
        padding: ${type === 'hover' ? '8px 12px' : '12px'};
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        max-width: ${tooltipWidth}px;
        font-size: ${type === 'hover' ? '13px' : '14px'};
        line-height: 1.4;
        pointer-events: ${type === 'hover' ? 'none' : 'auto'};
        opacity: 0;
        transition: opacity 0.2s ease-in-out;
        border: 1px solid rgba(255, 255, 255, 0.1);
    `;
    
    tooltip.style.cssText = baseStyles;
    tooltip.style.left = `${position.x}px`;
    tooltip.style.top = `${position.y}px`;
    
    // Create content based on type
    let content;
    if (type === 'hover') {
        content = `
            <div style="font-weight: 600; color: #10a37f; margin-bottom: 4px;">${node.data.label}</div>
            <div style="font-size: 12px; color: #d1d5db;">${node.data.detail ? node.data.detail.substring(0, 100) + (node.data.detail.length > 100 ? '...' : '') : 'No details available'}</div>
        `;
    } else {
        content = `
            <div style="font-weight: 600; margin-bottom: 8px; color: #10a37f; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 6px;">
                ${node.data.label}
            </div>
            <div style="margin-bottom: 8px; color: #e5e7eb;">
                ${node.data.detail || 'No additional details available'}
            </div>
            <div style="font-size: 12px; color: #9ca3af; display: flex; justify-content: space-between;">
                <span>Messages: ${node.data.messageIds?.length || 0}</span>
                <span>Node ID: ${node.id.substring(0, 8)}...</span>
            </div>
            <div style="margin-top: 8px; padding-top: 6px; border-top: 1px solid rgba(255, 255, 255, 0.1); font-size: 11px; color: #9ca3af; text-align: center;">
                Click elsewhere to close
            </div>
        `;
    }
    
    tooltip.innerHTML = content;
    document.body.appendChild(tooltip);
    
    // Animate in
    setTimeout(() => {
        tooltip.style.opacity = '1';
    }, 10);
    
    // Handle different behaviors based on type
    if (type === 'hover') {
        // Hover tooltips are handled by mouseleave
    } else {
        // Click tooltips - remove on click elsewhere or after longer delay
        const removeTooltip = (e) => {
            if (!tooltip.contains(e.target)) {
                hideTooltip('click');
                document.removeEventListener('click', removeTooltip);
            }
        };
        
        // Add click outside listener after a brief delay
        setTimeout(() => {
            document.addEventListener('click', removeTooltip);
        }, 100);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            hideTooltip('click');
            document.removeEventListener('click', removeTooltip);
        }, 10000);
    }
}

// Function to create SVG connection between nodes
function createConnection(svg, sourceNodeData, targetNodeData) {
    const { node: sourceNode, element: sourceElement } = sourceNodeData;
    const { node: targetNode, element: targetElement } = targetNodeData;
    
    // Use actual node dimensions from the rendered elements (after they're in DOM)
    const sourceRect = sourceElement.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();
    
    // Calculate connection points using node positions (which are absolute within content area)
    // This ensures edges are always correctly positioned regardless of scroll position
    const nodeWidth = sourceRect.width || 120;
    const nodeHeight = sourceRect.height || 50;
    const targetNodeWidth = targetRect.width || 120;
    const targetNodeHeight = targetRect.height || 50;
    
    // Connection points relative to SVG coordinate system (which now matches content dimensions)
    const sourceX = sourceNode.position.x + nodeWidth / 2;           // Center horizontally
    const sourceY = sourceNode.position.y + nodeHeight;             // Bottom of source node
    const targetX = targetNode.position.x + targetNodeWidth / 2;    // Center horizontally  
    const targetY = targetNode.position.y;                          // Top of target node
    
    // Create smooth curved path for vertical layout
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    
    // Calculate control points for a smooth S-curve in vertical layout
    const deltaY = targetY - sourceY;
    const controlOffset = Math.abs(deltaY) * 0.4; // 40% of vertical distance
    
    let pathData;
    if (Math.abs(targetX - sourceX) < 5) {
        // Straight vertical line for aligned nodes
        pathData = `M ${sourceX} ${sourceY} L ${targetX} ${targetY}`;
    } else {
        // Curved path for offset nodes
        const controlY1 = sourceY + controlOffset;
        const controlY2 = targetY - controlOffset;
        pathData = `M ${sourceX} ${sourceY} C ${sourceX} ${controlY1}, ${targetX} ${controlY2}, ${targetX} ${targetY}`;
    }
    
    line.setAttribute('d', pathData);
    line.setAttribute('stroke', '#94a3b8');
    line.setAttribute('stroke-width', '2');
    line.setAttribute('fill', 'none');
    line.setAttribute('marker-end', 'url(#arrowhead)');
    
    // Add arrowhead marker if not exists
    if (!svg.querySelector('#arrowhead')) {
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
        marker.setAttribute('id', 'arrowhead');
        marker.setAttribute('markerWidth', '10');
        marker.setAttribute('markerHeight', '7');
        marker.setAttribute('refX', '9');
        marker.setAttribute('refY', '3.5');
        marker.setAttribute('orient', 'auto');
        
        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.setAttribute('points', '0 0, 10 3.5, 0 7');
        polygon.setAttribute('fill', '#94a3b8');
        
        marker.appendChild(polygon);
        defs.appendChild(marker);
        svg.appendChild(defs);
    }
    
    svg.appendChild(line);
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'ping') {
        sendResponse({ pong: true });
    }
});

async function generateMindMap(conversation) {
  // Note: This function is not used - mindmap generation happens via Supabase Edge Function
  // Kept for reference - should match the Supabase Edge Function prompt format
  const prompt = `Analyze this ChatGPT conversation and create a strict hierarchical mind map following these rules: STRUCTURE RULES: 1. CREATE PURE TREE STRUCTURE: Each child node must have EXACTLY ONE parent (no shared children) 2. ROOT NODE: Single main topic that encompasses the entire conversation 3. NO DUPLICATES: If a concept could fit in multiple places, choose the MOST LOGICAL parent only 4. SEMANTIC GROUPING: Group related concepts under common parents CONTENT GUIDELINES: 1. Node text: 2-4 words maximum (keep it concise, this is the only text shown in the node UI) 2. Detail: 1-2 sentences explaining the concept (not shown in the node, only for reference) 3. Message references: Include relevant message IDs that relate to this concept 4. Logical flow: Parent-child relationships should make intuitive sense HIERARCHICAL THINKING: - Level 0 (Root): Overall conversation theme - Level 1: Major topics/categories discussed - Level 2: Specific points within each topic - Level 3: Supporting details/examples - Continue deeper as needed for complex conversations CONVERSATION TO ANALYZE: ${JSON.stringify(conversation.messages)} REQUIRED OUTPUT FORMAT - Return ONLY valid JSON: {"id": "uuid-v4-here", "text": "Main Topic", "detail": "Brief summary of what this conversation covers.", "messageIds": [1, 2, 3], "children": [{"id": "uuid-v4-child-1", "text": "Subtopic A", "detail": "Explanation of this subtopic discussed.", "messageIds": [4, 5, 6], "children": [{"id": "uuid-v4-grandchild-1", "text": "Detail Point", "detail": "Specific aspect or detail.", "messageIds": [7, 8], "children": []}]}, {"id": "uuid-v4-child-2", "text": "Subtopic B", "detail": "Another major topic discussed.", "messageIds": [10, 11], "children": []}]} VALIDATION CHECKLIST: Each node has a unique UUID v4 format, No child appears under multiple parents, Text is concise (2-4 words exactly), Details are informative (1-2 sentences, 10-200 chars), Message IDs are relevant and valid, Structure forms a valid tree (no cycles, no orphans), Maximum depth of 6 levels CRITICAL: Verify the structure is a valid tree with no shared children before responding. Generate proper UUID v4 format for all IDs. The node UI will only show the 2-4 word text, not the detail.`;
}
