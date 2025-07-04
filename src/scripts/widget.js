// Create and inject styles
const style = document.createElement('style');
style.textContent = `
  #chatgpt-widget {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    cursor: pointer;
    z-index: 10000;
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
  
  /* Widget positioned next to share button */
  #chatgpt-widget.share-position {
    position: absolute !important;
    bottom: auto !important;
    right: auto !important;
    z-index: 1000;
  }
  
  /* Widget positioned next to mindmap title */
  #chatgpt-widget.sidebar-position {
    position: fixed !important;
    top: auto !important;
    left: auto !important;
    right: auto !important;
    bottom: auto !important;
    z-index: 10001;
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

// Make widget draggable
let isDragging = false;
let offsetX, offsetY;

widget.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - widget.getBoundingClientRect().left;
    offsetY = e.clientY - widget.getBoundingClientRect().top;
    widget.style.cursor = 'grabbing';
    
    // Temporarily remove positioning classes during drag to allow free movement
    widget.classList.remove('share-position', 'sidebar-position');
    widget.style.position = 'fixed';
    
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
        
        // After dragging, determine which position to restore based on current state
        setTimeout(() => {
            const sidebar = document.getElementById('chatgpt-mindmap-sidebar');
            if (sidebar) {
                // If sidebar exists, position next to mindmap title
                positionWidgetNearMindmapTitle(sidebar);
            } else {
                // If no sidebar, position near share button or default
                if (!positionWidgetNearShareButton()) {
                    // Widget was manually dragged, keep current position but clean up classes
                    widget.classList.remove('share-position', 'sidebar-position');
                }
            }
        }, 100);
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

// Add click handler
widget.addEventListener('click', async (e) => {
    e.stopPropagation();
    console.log('Widget clicked! Starting conversation scrape...');
    
    // Start generating state with animations
    setWidgetGeneratingState(true);
    
    try {
        // Auto-scroll and scrape
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
            
            try {
                // Create AbortController for timeout
                const controller = new AbortController();
                const TIMEOUT_MS = 150000; // 150 seconds timeout
                const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);
                
                console.log('🔄 Sending request to Supabase...');
                
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
                    const responseData = await response.json();
                    console.log('✅ Successfully received mindmap from Supabase:', responseData);
                    
                    // Extract the mindMap from Supabase response
                    const hierarchicalMindmap = responseData.mindMap;
                    if (!hierarchicalMindmap) {
                        throw new Error('No mindMap found in Supabase response');
                    }
                    
                    // Basic client-side validation (Edge Function is authoritative for structure)
                    if (!validateMindmapStructure(hierarchicalMindmap)) {
                        console.error('❌ Mindmap validation failed. Data received:', hierarchicalMindmap);
                        throw new Error('Invalid mindmap structure received from Supabase. Please try again or check console for details.');
                    }
                    
                    // Convert hierarchical structure to ReactFlow format
                    const reactFlowData = convertToReactFlowFormat(hierarchicalMindmap);
                    console.log('🔄 Converted to ReactFlow format:', reactFlowData);
                    
                    // Create sidebar with mindmap
                    console.log('🎨 Creating sidebar with mindmap...');
                    createSidebar(reactFlowData);
                    
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
        }
    } catch (error) {
        console.error('Error during scraping or mindmap generation:', error);
        // Show user-friendly error message
        const errorMessage = error.message || 'An error occurred while generating the mindmap';
        alert(`Mindmap generation failed: ${errorMessage}`);
    } finally {
        // Stop generating state and animations
        setWidgetGeneratingState(false);
    }
});

// Function to find the share button and position widget relative to it
function positionWidgetNearShareButton() {
    try {
        console.log('🔍 Looking for ChatGPT share button...');
        
        // Wait for main content to be loaded
        if (!document.querySelector('main') || !document.querySelector('[role="main"]')) {
            console.log('⏳ Main content not loaded yet, skipping positioning');
            return false;
        }
        
        // Enhanced selectors for ChatGPT share button across different UI versions
        const shareButtonSelectors = [
            // Direct share button selectors
            'button[aria-label*="Share"]',
            'button[aria-label*="share"]', 
            'button[title*="Share"]',
            'button[title*="share"]',
            'button[data-testid*="share"]',
            '[data-testid*="share"] button',
            'button[class*="share"]',
            
            // More specific context-based selectors
            'main button[aria-label*="Share"]',
            'main button[title*="Share"]',
            '[role="main"] button[aria-label*="Share"]',
            
            // Look for buttons in conversation header/toolbar areas
            'main header button:has(svg)',
            'main [role="toolbar"] button:has(svg)',
            'main .flex button:has(svg)',
            
            // Fallback: look for buttons with share-like icons in main content
            'main button:has(svg[viewBox*="24"])',
            'main button:has(svg)',
            
            // Look in specific layout patterns
            'main > div button:has(svg)',
            'main .relative button:has(svg)',
            '[class*="conversation"] button:has(svg)'
        ];
        
        let shareButton = null;
        let fallbackButton = null; // Store a potential fallback button
        
        // Try each selector
        for (const selector of shareButtonSelectors) {
            try {
                const buttons = document.querySelectorAll(selector);
                
                // Look for buttons that likely contain share functionality
                for (const button of buttons) {
                    // Skip if button is not visible
                    if (button.offsetWidth === 0 || button.offsetHeight === 0) continue;
                    
                    const text = button.textContent?.toLowerCase() || '';
                    const ariaLabel = button.getAttribute('aria-label')?.toLowerCase() || '';
                    const title = button.getAttribute('title')?.toLowerCase() || '';
                    const innerHTML = button.innerHTML.toLowerCase();
                    
                    // Primary check: explicit share references
                    if (text.includes('share') || 
                        ariaLabel.includes('share') || 
                        title.includes('share') ||
                        innerHTML.includes('share')) {
                        shareButton = button;
                        console.log(`✅ Found share button with selector: ${selector}`);
                        break;
                    }
                    
                    // Store first viable button in main area as fallback
                    if (!fallbackButton && selector.includes('main') && button.closest('main')) {
                        const rect = button.getBoundingClientRect();
                        // Only consider buttons in the upper area of the viewport
                        if (rect.top < window.innerHeight / 2) {
                            fallbackButton = button;
                        }
                    }
                }
                
                if (shareButton) break;
            } catch (e) {
                // Skip selector if it causes errors
                console.log(`⚠️ Selector "${selector}" caused error:`, e.message);
                continue;
            }
        }
        
        // Use fallback if no explicit share button found
        const buttonToUse = shareButton || fallbackButton;
        
        if (buttonToUse) {
            // Position widget to the left of the button
            const buttonRect = buttonToUse.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            
            // Position widget to the left of button with some spacing
            const widgetX = buttonRect.left + scrollLeft - 80; // 80px to the left (60px widget + 20px gap)
            const widgetY = buttonRect.top + scrollTop;
            
            // Ensure widget doesn't go off-screen
            const finalX = Math.max(10, widgetX);
            const finalY = Math.max(10, widgetY);
            
            widget.style.position = 'absolute';
            widget.style.left = `${finalX}px`;
            widget.style.top = `${finalY}px`;
            widget.style.right = 'auto';
            widget.style.bottom = 'auto';
            widget.style.transform = '';
            widget.classList.add('share-position');
            widget.classList.remove('sidebar-position');
            
            const buttonType = shareButton ? 'share button' : 'fallback button';
            console.log(`📍 Widget positioned at (${finalX}, ${finalY}) left of ${buttonType}`);
            return true;
        } else {
            console.log('❌ No suitable button found for positioning');
            return false;
        }
        
    } catch (error) {
        console.error('❌ Error positioning widget near share button:', error);
        return false;
    }
}

// Function to position widget next to mindmap title in sidebar
function positionWidgetNearMindmapTitle(sidebar) {
    try {
        console.log('🎯 Positioning widget next to mindmap title...');
        
        // Find the mindmap title in the sidebar
        const title = sidebar.querySelector('h3');
        if (title) {
            const titleRect = title.getBoundingClientRect();
            const sidebarRect = sidebar.getBoundingClientRect();
            
            // Position widget to the right of the title with some spacing
            const widgetX = titleRect.right + 10; // 10px gap from title
            const widgetY = titleRect.top + (titleRect.height / 2) - 30; // Center vertically with title (30px = half widget height)
            
            widget.style.position = 'fixed';
            widget.style.left = `${widgetX}px`;
            widget.style.top = `${widgetY}px`;
            widget.style.right = 'auto';
            widget.style.bottom = 'auto';
            widget.classList.add('sidebar-position');
            widget.classList.remove('share-position');
            
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

// Function to restore widget to default position
function restoreWidgetDefaultPosition() {
    widget.style.position = 'fixed';
    widget.style.bottom = '20px';
    widget.style.right = '20px';
    widget.style.left = 'auto';
    widget.style.top = 'auto';
    widget.style.transform = '';
    widget.classList.remove('share-position', 'sidebar-position');
    console.log('📍 Widget restored to default position');
}

// Add widget to the page
function addWidget() {
    if (!document.getElementById('chatgpt-widget')) {
        document.body.appendChild(widget);
        
        // Try to position near share button immediately and with retries
        positionWidgetWithRetry();
        
        // Add enhanced pulse effect for 3 seconds when first added
        widget.classList.add('enhanced-pulse');
        setTimeout(() => widget.classList.remove('enhanced-pulse'), 3000);
    }
}

// Function to try positioning near share button with retry logic
function positionWidgetWithRetry(attempt = 1, maxAttempts = 10) {
    console.log(`🔄 Attempting to position widget near share button (attempt ${attempt}/${maxAttempts})`);
    
    if (positionWidgetNearShareButton()) {
        console.log('✅ Widget successfully positioned near share button');
        return;
    }
    
    if (attempt < maxAttempts) {
        // Retry with increasing delays: 100ms, 500ms, 1s, 2s, 3s...
        const delay = attempt <= 2 ? attempt * 100 : Math.min(1000 * (attempt - 1), 5000);
        setTimeout(() => {
            positionWidgetWithRetry(attempt + 1, maxAttempts);
        }, delay);
    } else {
        console.log('❌ Could not find share button after all attempts, using default position');
        restoreWidgetDefaultPosition();
    }
}

// Initial widget addition
addWidget();

// Also try positioning immediately when script loads (in case DOM is already ready)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('📄 DOM Content Loaded - attempting widget positioning');
        setTimeout(() => {
            if (!widget.classList.contains('share-position') && !widget.classList.contains('sidebar-position')) {
                console.log('🎯 Widget not positioned yet, starting retry sequence');
                positionWidgetWithRetry();
            }
        }, 200);
    });
} else {
    // DOM is already ready
    console.log('📄 DOM already ready - attempting widget positioning');
    setTimeout(() => {
        if (!widget.classList.contains('share-position') && !widget.classList.contains('sidebar-position')) {
            console.log('🎯 Widget not positioned yet, starting retry sequence');
            positionWidgetWithRetry();
        }
    }, 200);
}

// Additional check when page is fully loaded
window.addEventListener('load', () => {
    console.log('🌐 Window fully loaded - final positioning check');
    setTimeout(() => {
        if (!widget.classList.contains('share-position') && !widget.classList.contains('sidebar-position')) {
            console.log('🔄 Widget still not positioned after page load, final attempt');
            positionWidgetWithRetry(1, 5); // Fewer attempts since page is fully loaded
        }
    }, 1000);
});

// Handle page transitions in SPAs
const observer = new MutationObserver((mutations) => {
    if (!document.body.contains(widget)) {
        addWidget();
    } else {
        // Check if share button appeared and widget needs initial positioning
        const isWidgetInDefaultPosition = !widget.classList.contains('share-position') && 
                                        !widget.classList.contains('sidebar-position');
        
        if (isWidgetInDefaultPosition && document.querySelector('main')) {
            // Widget is in default position but main content exists, try to position near share button
            clearTimeout(window.widgetInitialPositionTimeout);
            window.widgetInitialPositionTimeout = setTimeout(() => {
                positionWidgetNearShareButton();
            }, 200);
        }
        
        // Check if widget should be repositioned when page structure changes
        // Only if widget is in share-position mode (not in sidebar mode)
        if (widget.classList.contains('share-position')) {
            // Debounce repositioning to avoid excessive updates
            clearTimeout(window.widgetRepositionTimeout);
            window.widgetRepositionTimeout = setTimeout(() => {
                if (!positionWidgetNearShareButton()) {
                    restoreWidgetDefaultPosition();
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
        if (widget.classList.contains('share-position')) {
            // Reposition near share button
            if (!positionWidgetNearShareButton()) {
                restoreWidgetDefaultPosition();
            }
        } else if (widget.classList.contains('sidebar-position')) {
            // Reposition near mindmap title if sidebar exists
            const sidebar = document.getElementById('chatgpt-mindmap-sidebar');
            if (sidebar) {
                positionWidgetNearMindmapTitle(sidebar);
            }
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
    
    // Create header with controls
    const header = document.createElement('div');
    header.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 30px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    // Title
    const title = document.createElement('h2');
    title.textContent = 'Mindmap - Fullscreen View';
    title.style.cssText = `
        margin: 0;
        color: white;
        font-size: 24px;
        font-weight: 600;
    `;
    
    // Controls container
    const controls = document.createElement('div');
    controls.style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
    `;
    
    // View mode buttons
    const viewButtons = document.createElement('div');
    viewButtons.style.cssText = `
        display: flex;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        padding: 4px;
        gap: 2px;
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
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.2s ease;
        `;
        
        btn.onclick = () => {
            fullscreenViewMode = mode;
            updateFullscreenView();
            // Update all button appearances
            viewButtons.querySelectorAll('button').forEach(b => {
                b.style.background = 'transparent';
            });
            btn.style.background = 'rgba(16, 163, 127, 0.8)';
        };
        
        return btn;
    };
    
    const treeBtn = createViewButton('🌳', 'tree', 'Tree View');
    const compactBtn = createViewButton('📋', 'compact', 'Compact View');
    const listBtn = createViewButton('📝', 'list', 'List View');
    
    viewButtons.appendChild(treeBtn);
    viewButtons.appendChild(compactBtn);
    viewButtons.appendChild(listBtn);
    
    // Zoom controls
    const zoomControls = document.createElement('div');
    zoomControls.style.cssText = `
        display: flex;
        align-items: center;
        gap: 8px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        padding: 4px;
    `;
    
    const createZoomButton = (text, action, tooltip) => {
        const btn = document.createElement('button');
        btn.innerHTML = text;
        btn.title = tooltip;
        btn.style.cssText = `
            border: none;
            background: rgba(255, 255, 255, 0.1);
            color: white;
            padding: 8px 10px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 12px;
            transition: all 0.2s ease;
            min-width: 30px;
        `;
        
        btn.onclick = action;
        
        btn.addEventListener('mouseenter', () => {
            btn.style.background = 'rgba(255, 255, 255, 0.3)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.background = 'rgba(255, 255, 255, 0.1)';
        });
        
        return btn;
    };
    
    const zoomDisplay = document.createElement('span');
    zoomDisplay.style.cssText = `
        color: white;
        font-size: 12px;
        min-width: 40px;
        text-align: center;
        font-weight: 500;
    `;
    
    const updateZoomDisplay = () => {
        zoomDisplay.textContent = `${Math.round(fullscreenZoom * 100)}%`;
    };
    
    const updateFullscreenZoom = (newZoom) => {
        fullscreenZoom = Math.max(0.1, Math.min(5.0, newZoom));
        updateZoomDisplay();
        updateFullscreenView();
    };
    
    const zoomOutBtn = createZoomButton('−', () => updateFullscreenZoom(fullscreenZoom - 0.25), 'Zoom Out');
    const zoomInBtn = createZoomButton('+', () => updateFullscreenZoom(fullscreenZoom + 0.25), 'Zoom In');
    const resetZoomBtn = createZoomButton('⌂', () => updateFullscreenZoom(1.0), 'Reset Zoom');
    
    updateZoomDisplay();
    
    zoomControls.appendChild(zoomOutBtn);
    zoomControls.appendChild(zoomDisplay);
    zoomControls.appendChild(zoomInBtn);
    zoomControls.appendChild(resetZoomBtn);
    
    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.title = 'Close Fullscreen';
    closeBtn.style.cssText = `
        border: none;
        background: rgba(255, 255, 255, 0.2);
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 16px;
        transition: all 0.2s ease;
    `;
    
    closeBtn.onclick = () => overlay.remove();
    
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.background = 'rgba(255, 0, 0, 0.6)';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.background = 'rgba(255, 255, 255, 0.2)';
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
        renderMindmapTree(content, mindmapData, fullscreenViewMode, fullscreenZoom);
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
            updateFullscreenZoom(fullscreenZoom + 0.25);
        } else if ((e.ctrlKey || e.metaKey) && e.key === '-') {
            e.preventDefault();
            updateFullscreenZoom(fullscreenZoom - 0.25);
        } else if ((e.ctrlKey || e.metaKey) && e.key === '0') {
            e.preventDefault();
            updateFullscreenZoom(1.0);
        }
    };
    
    document.addEventListener('keydown', handleKeydown);
    
    // Handle mouse wheel zoom
    content.addEventListener('wheel', (e) => {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            const delta = e.deltaY > 0 ? -0.1 : 0.1;
            updateFullscreenZoom(fullscreenZoom + delta);
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
function convertToReactFlowFormat(hierarchicalNode) {
    const nodes = [];
    const edges = [];

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

        // Create ReactFlow node (data comes from Supabase Edge Function with validated structure)
        const reactFlowNode = {
            id: node.id,
            data: {
                label: node.text,           // 2-4 words as validated by Edge Function
                detail: node.detail,        // 1-2 sentences as validated by Edge Function
                messageIds: node.messageIds || []
            },
            position: { x, y },
            type: 'default',
            style: {
                background: level === 0 ? '#e3f2fd' : '#f5f5f5',
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '10px',
                minWidth: '120px'
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
    
    // Create header
    const header = document.createElement('div');
    header.style.cssText = `
        display: flex;
        flex-direction: column;
        padding: 16px;
        border-bottom: 1px solid #e5e7eb;
        background: #f9fafb;
        gap: 12px;
    `;
    
    // Top row with title and close button
    const topRow = document.createElement('div');
    topRow.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
    `;
    
    const title = document.createElement('h3');
    title.textContent = 'Mindmap';
    title.style.cssText = `
        margin: 0;
        font-size: 16px;
        font-weight: 600;
        color: #111827;
    `;
    
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '✕';
    closeButton.style.cssText = `
        border: none;
        background: none;
        font-size: 18px;
        cursor: pointer;
        color: #6b7280;
        padding: 4px;
        border-radius: 4px;
    `;
    closeButton.onclick = () => {
        sidebar.remove();
        
        // Restore widget position to near share button or default
        setTimeout(() => {
            if (!positionWidgetNearShareButton()) {
                restoreWidgetDefaultPosition();
            }
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
        gap: 8px;
    `;
    
    // View toggle buttons
    const viewToggleGroup = document.createElement('div');
    viewToggleGroup.style.cssText = `
        display: flex;
        background: #e5e7eb;
        border-radius: 6px;
        padding: 2px;
        gap: 1px;
    `;
    
    // Store current view mode
    let currentViewMode = localStorage.getItem('chatgpt-mindmap-view-mode') || 'tree';
    
    // Tree view button
    const treeViewBtn = document.createElement('button');
    treeViewBtn.innerHTML = '🌳';
    treeViewBtn.title = 'Tree View';
    treeViewBtn.style.cssText = `
        border: none;
        background: ${currentViewMode === 'tree' ? '#10a37f' : 'transparent'};
        color: ${currentViewMode === 'tree' ? 'white' : '#6b7280'};
        padding: 6px 10px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.2s ease;
    `;
    
    // Compact view button
    const compactViewBtn = document.createElement('button');
    compactViewBtn.innerHTML = '📋';
    compactViewBtn.title = 'Compact View';
    compactViewBtn.style.cssText = `
        border: none;
        background: ${currentViewMode === 'compact' ? '#10a37f' : 'transparent'};
        color: ${currentViewMode === 'compact' ? 'white' : '#6b7280'};
        padding: 6px 10px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.2s ease;
    `;
    
    // List view button
    const listViewBtn = document.createElement('button');
    listViewBtn.innerHTML = '📝';
    listViewBtn.title = 'List View';
    listViewBtn.style.cssText = `
        border: none;
        background: ${currentViewMode === 'list' ? '#10a37f' : 'transparent'};
        color: ${currentViewMode === 'list' ? 'white' : '#6b7280'};
        padding: 6px 10px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.2s ease;
    `;
    
    viewToggleGroup.appendChild(treeViewBtn);
    viewToggleGroup.appendChild(compactViewBtn);
    viewToggleGroup.appendChild(listViewBtn);
    
    // Expand button (before zoom controls)
    const expandBtn = document.createElement('button');
    expandBtn.innerHTML = '⛶';
    expandBtn.title = 'Expand Fullscreen';
    expandBtn.style.cssText = `
        border: none;
        background: #f3f4f6;
        color: #374151;
        padding: 8px 10px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.2s ease;
        margin-right: 8px;
    `;
    
    expandBtn.addEventListener('mouseenter', () => {
        expandBtn.style.background = '#e5e7eb';
    });
    
    expandBtn.addEventListener('mouseleave', () => {
        expandBtn.style.background = '#f3f4f6';
    });
    
    // Zoom controls
    const zoomControls = document.createElement('div');
    zoomControls.style.cssText = `
        display: flex;
        align-items: center;
        gap: 4px;
    `;
    
    // Store current zoom level - always start new mindmaps at 100% zoom
    let currentZoom = 1.0;
    
    // Zoom out button
    const zoomOutBtn = document.createElement('button');
    zoomOutBtn.innerHTML = '🔍−';
    zoomOutBtn.title = 'Zoom Out';
    zoomOutBtn.style.cssText = `
        border: none;
        background: #f3f4f6;
        color: #374151;
        padding: 6px 8px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
        transition: all 0.2s ease;
    `;
    
    // Zoom level display
    const zoomDisplay = document.createElement('span');
    zoomDisplay.textContent = `${Math.round(currentZoom * 100)}%`;
    zoomDisplay.style.cssText = `
        font-size: 11px;
        color: #6b7280;
        min-width: 35px;
        text-align: center;
        font-weight: 500;
    `;
    
    // Zoom in button
    const zoomInBtn = document.createElement('button');
    zoomInBtn.innerHTML = '🔍+';
    zoomInBtn.title = 'Zoom In';
    zoomInBtn.style.cssText = `
        border: none;
        background: #f3f4f6;
        color: #374151;
        padding: 6px 8px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
        transition: all 0.2s ease;
    `;
    
    // Reset zoom button
    const resetZoomBtn = document.createElement('button');
    resetZoomBtn.innerHTML = '⌂';
    resetZoomBtn.title = 'Reset Zoom';
    resetZoomBtn.style.cssText = `
        border: none;
        background: #f3f4f6;
        color: #374151;
        padding: 6px 8px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
        transition: all 0.2s ease;
        margin-left: 2px;
    `;
    
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
    function updateZoom(newZoom) {
        currentZoom = Math.max(0.25, Math.min(3.0, newZoom)); // Limit zoom between 25% and 300%
        zoomDisplay.textContent = `${Math.round(currentZoom * 100)}%`;
        // Note: Not saving zoom to localStorage - each new mindmap starts fresh at 100%
        
        // Apply zoom to mindmap content
        const mindmapContent = mindmapContainer.querySelector('.mindmap-content');
        if (mindmapContent) {
            mindmapContent.style.transform = `scale(${currentZoom})`;
            mindmapContent.style.transformOrigin = 'top left';
        }
    }
    
    // Function to update view mode
    function updateViewMode(newMode) {
        currentViewMode = newMode;
        localStorage.setItem('chatgpt-mindmap-view-mode', currentViewMode);
        
        // Update button appearances
        [treeViewBtn, compactViewBtn, listViewBtn].forEach(btn => {
            btn.style.background = 'transparent';
            btn.style.color = '#6b7280';
        });
        
        if (newMode === 'tree') {
            treeViewBtn.style.background = '#10a37f';
            treeViewBtn.style.color = 'white';
        } else if (newMode === 'compact') {
            compactViewBtn.style.background = '#10a37f';
            compactViewBtn.style.color = 'white';
        } else if (newMode === 'list') {
            listViewBtn.style.background = '#10a37f';
            listViewBtn.style.color = 'white';
        }
        
        // Re-render mindmap with new view mode
        renderMindmapTree(mindmapContainer, mindmapData, currentViewMode, currentZoom);
    }
    
    // View toggle event handlers
    treeViewBtn.onclick = () => updateViewMode('tree');
    compactViewBtn.onclick = () => updateViewMode('compact');
    listViewBtn.onclick = () => updateViewMode('list');
    
    // Zoom control event handlers
    zoomInBtn.onclick = () => updateZoom(currentZoom + 0.25);
    zoomOutBtn.onclick = () => updateZoom(currentZoom - 0.25);
    resetZoomBtn.onclick = () => updateZoom(1.0);
    
    // Expand button event handler
    expandBtn.onclick = () => showFullscreenMindmap(mindmapData, currentViewMode, currentZoom);
    
    // Keyboard shortcuts for zoom
    mindmapContainer.addEventListener('wheel', (e) => {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            const delta = e.deltaY > 0 ? -0.1 : 0.1;
            updateZoom(currentZoom + delta);
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
    
    // Create main content wrapper with zoom capability
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'mindmap-content';
    contentWrapper.style.cssText = `
        transform: scale(${zoomLevel});
        transform-origin: top left;
        transition: transform 0.2s ease;
    `;
    
    // Render based on view mode
    if (viewMode === 'list') {
        renderListView(contentWrapper, mindmapData);
    } else if (viewMode === 'compact') {
        renderCompactView(contentWrapper, mindmapData);
    } else {
        renderTreeView(contentWrapper, mindmapData);
    }
    
    container.appendChild(contentWrapper);
}

// Function to render tree view (original visual mindmap)
function renderTreeView(container, mindmapData) {
    // Calculate total mindmap dimensions
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
    
    const totalWidth = Math.max(800, nodeBounds.maxX - nodeBounds.minX + 100);
    const totalHeight = Math.max(600, nodeBounds.maxY - nodeBounds.minY + 100);
    
    // Create scrollable mindmap container
    const mindmapContainer = document.createElement('div');
    mindmapContainer.style.cssText = `
        position: relative;
        width: 100%;
        height: 100%;
        overflow: auto;
        background: #fafafa;
        border-radius: 8px;
    `;
    
    // Create SVG for connections (edges) with proper dimensions
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: ${totalWidth}px;
        height: ${totalHeight}px;
        pointer-events: none;
        z-index: 1;
    `;
    
    // Create container for nodes
    const nodesContainer = document.createElement('div');
    nodesContainer.style.cssText = `
        position: relative;
        z-index: 2;
        width: ${totalWidth}px;
        height: ${totalHeight}px;
        padding: 20px;
    `;
    
    // Render nodes first so we can measure them
    const renderedNodes = new Map();
    mindmapData.nodes.forEach(node => {
        const nodeElement = createMindmapNode(node, 'tree');
        nodesContainer.appendChild(nodeElement);
        renderedNodes.set(node.id, { node, element: nodeElement });
    });
    
    // Add nodes container to DOM so we can measure actual dimensions
    mindmapContainer.appendChild(svg);
    mindmapContainer.appendChild(nodesContainer);
    container.appendChild(mindmapContainer);
    
    // Render edges after nodes are in DOM (so we can get actual dimensions)
    setTimeout(() => {
        mindmapData.edges.forEach(edge => {
            const sourceNodeData = renderedNodes.get(edge.source);
            const targetNodeData = renderedNodes.get(edge.target);
            if (sourceNodeData && targetNodeData) {
                createConnection(svg, sourceNodeData, targetNodeData);
            }
        });
    }, 0);
}

// Function to render compact view (smaller nodes, tighter layout)
function renderCompactView(container, mindmapData) {
    const compactContainer = document.createElement('div');
    compactContainer.style.cssText = `
        width: 100%;
        height: 100%;
        overflow: auto;
        background: #fafafa;
        border-radius: 8px;
        padding: 16px;
    `;
    
    // Build hierarchy for compact rendering
    const hierarchy = buildHierarchy(mindmapData.nodes, mindmapData.edges);
    renderCompactNode(compactContainer, hierarchy, 0);
    
    container.appendChild(compactContainer);
}

// Function to render list view (hierarchical list)
function renderListView(container, mindmapData) {
    const listContainer = document.createElement('div');
    listContainer.style.cssText = `
        width: 100%;
        height: 100%;
        overflow: auto;
        background: #fafafa;
        border-radius: 8px;
        padding: 16px;
    `;
    
    // Build hierarchy for list rendering
    const hierarchy = buildHierarchy(mindmapData.nodes, mindmapData.edges);
    renderListNode(listContainer, hierarchy, 0);
    
    container.appendChild(listContainer);
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
    
    nodeDiv.addEventListener('mouseenter', () => {
        nodeDiv.style.background = '#e8f4fd';
        nodeDiv.style.transform = 'translateX(2px)';
    });
    
    nodeDiv.addEventListener('mouseleave', () => {
        nodeDiv.style.background = level === 0 ? '#e3f2fd' : '#f8f9fa';
        nodeDiv.style.transform = 'translateX(0)';
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
    
    content.addEventListener('mouseenter', () => {
        content.style.background = '#f9fafb';
        content.style.borderColor = '#d1d5db';
        content.style.transform = 'translateY(-1px)';
        content.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    });
    
    content.addEventListener('mouseleave', () => {
        content.style.background = '#ffffff';
        content.style.borderColor = '#e5e7eb';
        content.style.transform = 'translateY(0)';
        content.style.boxShadow = 'none';
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
    
    nodeElement.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        min-width: 120px;
        max-width: 200px;
        padding: 12px;
        background: ${node.style?.background || '#ffffff'};
        border: ${node.style?.border || '1px solid #d1d5db'};
        border-radius: ${node.style?.borderRadius || '8px'};
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 13px;
        line-height: 1.4;
    `;
    
    // Add hover effect
    nodeElement.addEventListener('mouseenter', () => {
        nodeElement.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
        nodeElement.style.transform = 'translateY(-1px)';
    });
    
    nodeElement.addEventListener('mouseleave', () => {
        nodeElement.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        nodeElement.style.transform = 'translateY(0)';
    });
    
    // Node content: Only show the 2-4 word gist (label)
    const nodeTitle = document.createElement('div');
    nodeTitle.textContent = node.data.label;
    nodeTitle.style.cssText = `
        font-weight: 600;
        color: #111827;
        margin-bottom: 0;
        font-size: 14px;
        text-align: center;
        white-space: pre-line;
    `;
    
    nodeElement.appendChild(nodeTitle);
    
    // Add click handler with node details tooltip
    nodeElement.addEventListener('click', (e) => {
        console.log('Node clicked:', node);
        
        // Show tooltip with detailed information
        showNodeTooltip(e, node);
    });
    
    return nodeElement;
}

// Function to show detailed node information in a tooltip
function showNodeTooltip(event, node) {
    // Remove existing tooltip
    const existingTooltip = document.getElementById('node-tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }
    
    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.id = 'node-tooltip';
    tooltip.style.cssText = `
        position: fixed;
        z-index: 10002;
        background: #1f2937;
        color: #f9fafb;
        padding: 12px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        max-width: 300px;
        font-size: 14px;
        line-height: 1.4;
        pointer-events: none;
    `;
    
    // Position tooltip
    const x = event.clientX + 10;
    const y = event.clientY - 10;
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
    
    // Tooltip content
    tooltip.innerHTML = `
        <div style="font-weight: 600; margin-bottom: 8px; color: #10a37f;">${node.data.label}</div>
        <div style="margin-bottom: 8px;">${node.data.detail || 'No additional details available'}</div>
        <div style="font-size: 12px; color: #9ca3af;">
            Messages: ${node.data.messageIds?.length || 0} | Node ID: ${node.id}
        </div>
    `;
    
    document.body.appendChild(tooltip);
    
    // Auto-remove tooltip after 3 seconds
    setTimeout(() => {
        if (tooltip.parentNode) {
            tooltip.remove();
        }
    }, 3000);
    
    // Remove tooltip on next click anywhere
    const removeTooltip = () => {
        if (tooltip.parentNode) {
            tooltip.remove();
        }
        document.removeEventListener('click', removeTooltip);
    };
    
    setTimeout(() => {
        document.addEventListener('click', removeTooltip);
    }, 100);
}

// Function to create SVG connection between nodes
function createConnection(svg, sourceNodeData, targetNodeData) {
    const { node: sourceNode, element: sourceElement } = sourceNodeData;
    const { node: targetNode, element: targetElement } = targetNodeData;
    
    // Get actual element dimensions
    const sourceRect = sourceElement.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();
    const containerRect = svg.getBoundingClientRect();
    
    // Calculate actual connection points relative to the SVG container
    const sourceX = sourceNode.position.x + (sourceRect.width || 120) / 2; // Center horizontally
    const sourceY = sourceNode.position.y + (sourceRect.height || 50);     // Bottom of source
    const targetX = targetNode.position.x + (targetRect.width || 120) / 2; // Center horizontally  
    const targetY = targetNode.position.y;                                  // Top of target
    
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
