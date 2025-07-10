document.addEventListener('DOMContentLoaded', function() {
    console.log('Welcome page loaded');
    
    // Optimize animations for better scroll performance
    optimizeAnimationsForScroll();
    
    const openChatBtn = document.getElementById('openChatGPT');
    if (openChatBtn) {
        openChatBtn.addEventListener('click', () => {
            console.log('Open ChatGPT button clicked');
            chrome.runtime.sendMessage({ action: 'openChatGPT', showChatSelection: true }, (response) => {
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

// Function to optimize animations for better scroll performance
function optimizeAnimationsForScroll() {
    // Use Intersection Observer to pause animations when not visible
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Resume animations when element is visible
                    entry.target.style.animationPlayState = 'running';
                } else {
                    // Pause animations when element is not visible
                    entry.target.style.animationPlayState = 'paused';
                }
            });
        }, {
            rootMargin: '50px' // Start/stop animations 50px before element enters/exits viewport
        });

        // Observe animated elements
        const animatedElements = document.querySelectorAll('.particle, .neuron, .connection, .logo-animation');
        animatedElements.forEach(el => observer.observe(el));
    }

    // Throttle scroll events for better performance
    let ticking = false;
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Any scroll-based optimizations can go here
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduce-motion');
        
        // Add CSS to reduce animations
        const style = document.createElement('style');
        style.textContent = `
            .reduce-motion * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
}
