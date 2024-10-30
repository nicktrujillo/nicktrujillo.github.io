document.addEventListener('DOMContentLoaded', function() {
    const main = document.querySelector('main');
    let lastScrollTop = 0;
    let bounceTimeout;
    let lastScrollPosition = 0;
    let ticking = false;
  
    // Scroll handling
    main.addEventListener('wheel', function(e) {
        lastScrollPosition = main.scrollTop;
        
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const currentScroll = main.scrollTop;
                const maxScroll = main.scrollHeight - main.clientHeight;
                
                // Only trigger bounce if trying to scroll beyond limits
                if ((currentScroll <= 0 && e.deltaY < 0) || // Trying to scroll up at the top
                    (currentScroll >= maxScroll && e.deltaY > 0)) { // Trying to scroll down at the bottom
                    
                    clearTimeout(bounceTimeout);
                    main.classList.add('bounce');
                    
                    bounceTimeout = setTimeout(() => {
                        main.classList.remove('bounce');
                    }, 400);
                }
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
  
    // Handle touch devices
    let touchStartY = 0;
    
    main.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    });
    
    main.addEventListener('touchmove', function(e) {
        const currentScroll = main.scrollTop;
        const maxScroll = main.scrollHeight - main.clientHeight;
        const touchCurrentY = e.touches[0].clientY;
        const touchDelta = touchStartY - touchCurrentY;
        
        // Only trigger bounce if trying to scroll beyond limits
        if ((currentScroll <= 0 && touchDelta < 0) || // Trying to scroll up at the top
            (currentScroll >= maxScroll && touchDelta > 0)) { // Trying to scroll down at the bottom
            
            clearTimeout(bounceTimeout);
            main.classList.add('bounce');
            
            bounceTimeout = setTimeout(() => {
                main.classList.remove('bounce');
            }, 400);
        }
    });
  
    // Client bubble data
    const clients = [
      // Large enterprises
      { 
        name: "AT&T", 
        size: "lg",
        logoPath: "assets/logos/att.svg" // You'll need to provide actual paths
      },
      { 
        name: "Accenture", 
        size: "lg",
        logoPath: "assets/logos/accenture.svg"
      },
      { name: "Uber", 
        size: "lg",
        logoPath: "assets/logos/uber.svg"
      },
      { 
        name: "American Family Mutual Insurance", 
        size: "lg",
        logoPath: "assets/logos/american-family.svg"
      },
      { name: "VSP Global", 
        size: "lg", 
        logoPath: "assets/logos/vsp.svg" },
      { name: "Elasticsearch", 
        size: "lg", 
        logoPath: "assets/logos/elasticsearch.svg" },
      
      // Medium companies
      { name: "Coupa", 
        size: "md", 
        logoPath: "assets/logos/coupa.svg" 
      },
      { name: "Rogers", 
        size: "md", 
        logoPath: "assets/logos/rogers.svg" 
      },
      { name: "Rubrik", 
        size: "md", 
        logoPath: "assets/logos/rubrik.svg" 
      },
      { name: "Hartford Fire Insurance", 
        size: "md", 
        logoPath: "assets/logos/hartford.svg" 
      },
      { name: "Scotts", 
        size: "md", 
        logoPath: "assets/logos/scotts.svg" 
      },
      { name: "Becton Dickinson & Co", 
        size: "md", 
        logoPath: "assets/logos/bectondickinson.svg" 
      },
      { name: "Co-operators Financial", 
        size: "md", 
        logoPath: "assets/logos/cooperators.svg" 
      },
      { name: "Farm Credit Financial Partners", 
        size: "md", 
        logoPath: "assets/logos/farmcredit.svg" 
      },
      { name: "TDS Telecommunications", 
        size: "md", 
        logoPath: "assets/logos/tds.svg" 
      },
      { name: "Lutron Electronics", 
        size: "md", 
        logoPath: "assets/logos/lutron.svg" 
      },
      
      // Smaller organizations
      { name: "Candela Medical", 
        size: "sm", 
        logoPath: "assets/logos/candela.svg" 
      },
      { name: "Hunt Military", 
        size: "sm", 
        logoPath: "assets/logos/hunt.svg" 
      },
      { name: "Eminence Organic Skin Care", 
        size: "sm", 
        logoPath: "assets/logos/eminence.svg" 
      },
      { name: "Liberator Medical", 
        size: "sm", 
        logoPath: "assets/logos/liberator.svg" 
      },
      { name: "Maxval", 
        size: "sm", 
        logoPath: "assets/logos/maxval.svg" 
      },
      { name: "Merz", 
        size: "sm", 
        logoPath: "assets/logos/merz.svg" 
      },
      { name: "Precision eControl", 
        size: "sm", 
        logoPath: "assets/logos/precision.svg" 
      },
      { name: "Quinn Emanuel", 
        size: "sm", 
        logoPath: "assets/logos/quinnemanuel.svg" 
      },
      { name: "Region of Peel", 
        size: "sm", 
        logoPath: "assets/logos/regionofpeel.svg" 
      },
      { name: "Rite-Hite", 
        size: "sm", 
        logoPath: "assets/logos/ritehite.svg" 
      },
      { name: "Sparklight", 
        size: "sm", 
        logoPath: "assets/logos/sparklight.svg" 
      },
      { name: "Triwest Healthcare", 
        size: "sm", 
        logoPath: "assets/logos/triwest.svg" 
      },
      { name: "Wasabi", 
        size: "sm", 
        logoPath: "assets/logos/wasabi.svg" 
      },
      { name: "Weave", 
        size: "sm", 
        logoPath: "assets/logos/weave.svg" 
      }
    ];
  
    function createBubbles() {
      const container = document.getElementById('bubbleContainer');
      const containerRect = container.getBoundingClientRect();
      
      // Shuffle the clients array for random distribution
      const shuffledClients = [...clients].sort(() => Math.random() - 0.5);
      
      shuffledClients.forEach((client, index) => {
        const bubble = document.createElement('div');
        bubble.className = `bubble bubble-${client.size}`;
        
        // Random position within container
        const bubbleSize = client.size === 'lg' ? 120 : client.size === 'md' ? 90 : 70;
        const maxX = containerRect.width - bubbleSize;
        const maxY = containerRect.height - bubbleSize;
        
        const x = Math.random() * maxX;
        const y = Math.random() * maxY;
        
        bubble.style.left = `${x}px`;
        bubble.style.top = `${y}px`;
        
        // Random float animation
        const floatX = (Math.random() * 20 - 10) + 'px';
        const floatY = (Math.random() * 20 - 10) + 'px';
        bubble.style.setProperty('--float-x', floatX);
        bubble.style.setProperty('--float-y', floatY);
        
        // Random animation delay
        bubble.style.animationDelay = `${Math.random() * 2}s`;
        
        const text = document.createElement('span');
        text.className = 'bubble-text';
        text.textContent = client.name;
        
        bubble.appendChild(text);
        container.appendChild(bubble);
      });
    }
  
    // Create bubbles when the page loads
    createBubbles();
  
    // Recreate bubbles when window is resized
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const container = document.getElementById('bubbleContainer');
        container.innerHTML = '';
        createBubbles();
      }, 250);
    });
  
    // Add clipboard functionality
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
  });