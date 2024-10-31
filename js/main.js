// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function(e) {
        if (!inThrottle) {
            func(e);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const main = document.querySelector('main');
    let bounceTimeout;

    // Throttled scroll handler
    const handleScroll = throttle((e) => {
        const currentScroll = main.scrollTop;
        const maxScroll = main.scrollHeight - main.clientHeight;
        
        if ((currentScroll <= 0 && e.deltaY < 0) || 
            (currentScroll >= maxScroll && e.deltaY > 0)) {
            
            clearTimeout(bounceTimeout);
            main.classList.add('bounce');
            
            bounceTimeout = setTimeout(() => {
                main.classList.remove('bounce');
            }, 400);
        }
    }, 50);

    // Add scroll listeners with passive flag for better performance
    main.addEventListener('wheel', handleScroll, { passive: true });

    // Touch handling
    let touchStartY = 0;
    
    main.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    main.addEventListener('touchmove', throttle((e) => {
        const currentScroll = main.scrollTop;
        const maxScroll = main.scrollHeight - main.clientHeight;
        const touchCurrentY = e.touches[0].clientY;
        const touchDelta = touchStartY - touchCurrentY;
        
        if ((currentScroll <= 0 && touchDelta < 0) || 
            (currentScroll >= maxScroll && touchDelta > 0)) {
            
            clearTimeout(bounceTimeout);
            main.classList.add('bounce');
            
            bounceTimeout = setTimeout(() => {
                main.classList.remove('bounce');
            }, 400);
        }
    }, 50), { passive: true });

    // Client data
    const clients = [
        // Large enterprises
        { name: "AT&T", size: "lg", logoPath: "assets/logos/att.svg" },
        { name: "Accenture", size: "lg", logoPath: "assets/logos/accenture.svg" },
        { name: "Uber", size: "lg", logoPath: "assets/logos/uber.svg" },
        { name: "American Family Mutual Insurance", size: "lg", logoPath: "assets/logos/amfam.png" },
        { name: "VSP Global", size: "lg", logoPath: "assets/logos/vsp.svg" },
        { name: "Elasticsearch", size: "lg", logoPath: "assets/logos/elasticsearch.svg" },
        
        // Medium companies
        { name: "Coupa", size: "md", logoPath: "assets/logos/coupa.svg" },
        { name: "Rogers", size: "md", logoPath: "assets/logos/rogers.svg" },
        { name: "Rubrik", size: "md", logoPath: "assets/logos/rubrik.png" },
        { name: "Hartford Fire Insurance", size: "md", logoPath: "assets/logos/hartford.png" },
        { name: "Scotts", size: "md", logoPath: "assets/logos/scotts.png" },
        { name: "Becton Dickinson & Co", size: "md", logoPath: "assets/logos/bd.svg" },
        { name: "Co-operators Financial", size: "md", logoPath: "assets/logos/cooperators.svg" },
        { name: "Farm Credit Financial Partners", size: "md", logoPath: "assets/logos/farmcredit.png" },
        { name: "TDS Telecommunications", size: "md", logoPath: "assets/logos/tds.png" },
        { name: "Lutron Electronics", size: "md", logoPath: "assets/logos/lutron.png" },
        
        // Smaller organizations
        { name: "Candela Medical", size: "sm", logoPath: "assets/logos/candela.png" },
        { name: "Arkos Health", size: "sm", logoPath: "assets/logos/arkos.svg" },
        { name: "Hunt Military", size: "sm", logoPath: "assets/logos/hunt.png" },
        { name: "Eminence Organic Skin Care", size: "sm", logoPath: "assets/logos/eminence.png" },
        { name: "Liberator Medical", size: "sm", logoPath: "assets/logos/liberator.svg" },
        { name: "Maxval", size: "sm", logoPath: "assets/logos/maxval.png" },
        { name: "Merz", size: "sm", logoPath: "assets/logos/merz.svg" },
        { name: "Precision eControl", size: "sm", logoPath: "assets/logos/precisionecontrol.svg" },
        { name: "Quinn Emanuel", size: "sm", logoPath: "assets/logos/quinnemanuel.png" },
        { name: "Region of Peel", size: "sm", logoPath: "assets/logos/rop.png" },
        { name: "Rite-Hite", size: "sm", logoPath: "assets/logos/ritehite.png" },
        { name: "Sparklight", size: "sm", logoPath: "assets/logos/sparklight.svg" },
        { name: "Triwest Healthcare", size: "sm", logoPath: "assets/logos/triwest.png" },
        { name: "Wasabi", size: "sm", logoPath: "assets/logos/wasabi.png" },
        { name: "Weave", size: "sm", logoPath: "assets/logos/weave.svg" }
    ];

    function createBubbles() {
        const container = document.getElementById('bubbleContainer');
        const containerRect = container.getBoundingClientRect();
        
        const fragment = document.createDocumentFragment();
        
        // Increase margins
        const marginX = containerRect.width * 0.08;
        const marginY = containerRect.height * 0.08;
        
        // Adjust available space
        const maxX = containerRect.width - marginX * 2;
        const maxY = containerRect.height - marginY * 2;
        
        const shuffledClients = [...clients].sort(() => Math.random() - 0.5);
        const placedBubbles = []; // Keep track of placed bubbles
    
        // Get bubble size in pixels
        function getBubbleSize(size) {
            switch(size) {
                case 'lg': return 180;
                case 'md': return 140;
                case 'sm': return 110;
                default: return 110;
            }
        }
    
        // Check if position would cause too much overlap
        function hasValidPosition(x, y, size, placedBubbles) {
            const bubbleSize = getBubbleSize(size);
            const minDistance = bubbleSize * 0.7; // Allow 30% overlap maximum
    
            for (const placed of placedBubbles) {
                const dx = x - placed.x;
                const dy = y - placed.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const minAllowedDistance = (bubbleSize + getBubbleSize(placed.size)) * 0.4;
                
                if (distance < minAllowedDistance) {
                    return false;
                }
            }
            return true;
        }
    
        // Find valid position for bubble
        function findValidPosition(size) {
            const bubbleSize = getBubbleSize(size);
            let attempts = 0;
            const maxAttempts = 100;
    
            while (attempts < maxAttempts) {
                const x = marginX + Math.random() * (maxX - bubbleSize);
                const y = marginY + Math.random() * (maxY - bubbleSize);
    
                if (hasValidPosition(x, y, size, placedBubbles)) {
                    return { x, y };
                }
                attempts++;
            }
    
            // If no position found, find best possible position
            let bestPosition = { x: 0, y: 0 };
            let maxDistance = 0;
    
            for (let i = 0; i < 20; i++) {
                const x = marginX + Math.random() * (maxX - bubbleSize);
                const y = marginY + Math.random() * (maxY - bubbleSize);
                let minDistance = Number.MAX_VALUE;
    
                for (const placed of placedBubbles) {
                    const dx = x - placed.x;
                    const dy = y - placed.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    minDistance = Math.min(minDistance, distance);
                }
    
                if (minDistance > maxDistance) {
                    maxDistance = minDistance;
                    bestPosition = { x, y };
                }
            }
    
            return bestPosition;
        }
    
        shuffledClients.forEach((client, index) => {
            const bubble = document.createElement('div');
            bubble.className = `bubble bubble-${client.size}`;
            
            const logo = document.createElement('img');
            logo.className = 'bubble-logo';
            logo.src = client.logoPath;
            logo.alt = `${client.name} logo`;
            logo.loading = 'lazy';
            
            logo.onerror = function() {
                const text = document.createElement('span');
                text.className = 'bubble-text';
                text.textContent = client.name;
                bubble.innerHTML = '';
                bubble.appendChild(text);
            };
    
            // Find position with minimal overlap
            const position = findValidPosition(client.size);
            
            bubble.style.left = `${position.x}px`;
            bubble.style.top = `${position.y}px`;
    
            // Track placed bubble
            placedBubbles.push({
                x: position.x,
                y: position.y,
                size: client.size
            });
            
            // Reduced float animation range
            bubble.style.setProperty('--float-x', `${Math.random() * 8 - 4}px`);
            bubble.style.setProperty('--float-y', `${Math.random() * 8 - 4}px`);
            bubble.style.animationDelay = `${Math.random() * 2}s`;
            
            bubble.appendChild(logo);
            fragment.appendChild(bubble);
        });
        
        container.innerHTML = '';
        container.appendChild(fragment);
    }

    // Optimized resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(createBubbles, 150);
    }, { passive: true });

    // Clipboard functionality
    window.copyEmail = function() {
        const email = 'ntrujillo@copado.com';
        navigator.clipboard.writeText(email).then(() => {
            const toast = document.getElementById('toast');
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy email:', err);
        });
    }

    // Initial creation of bubbles
    createBubbles();
});