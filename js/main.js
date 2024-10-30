document.addEventListener('DOMContentLoaded', function() {
  const body = document.body;
  let lastScrollTop = 0;
  let bounceTimeout;
  let lastScrollPosition = 0;
  let ticking = false;

  body.addEventListener('wheel', function(e) {
      lastScrollPosition = body.scrollTop;
      
      if (!ticking) {
          window.requestAnimationFrame(function() {
              const currentScroll = body.scrollTop;
              const maxScroll = body.scrollHeight - body.clientHeight;
              
              // Only trigger bounce if trying to scroll beyond limits
              if ((currentScroll <= 0 && e.deltaY < 0) || // Trying to scroll up at the top
                  (currentScroll >= maxScroll && e.deltaY > 0)) { // Trying to scroll down at the bottom
                  
                  clearTimeout(bounceTimeout);
                  body.classList.add('bounce');
                  
                  bounceTimeout = setTimeout(() => {
                      body.classList.remove('bounce');
                  }, 400);
              }
              
              ticking = false;
          });
          
          ticking = true;
      }
  });

  // Handle touch devices
  let touchStartY = 0;
  
  body.addEventListener('touchstart', function(e) {
      touchStartY = e.touches[0].clientY;
  });
  
  body.addEventListener('touchmove', function(e) {
      const currentScroll = body.scrollTop;
      const maxScroll = body.scrollHeight - body.clientHeight;
      const touchCurrentY = e.touches[0].clientY;
      const touchDelta = touchStartY - touchCurrentY;
      
      // Only trigger bounce if trying to scroll beyond limits
      if ((currentScroll <= 0 && touchDelta < 0) || // Trying to scroll up at the top
          (currentScroll >= maxScroll && touchDelta > 0)) { // Trying to scroll down at the bottom
          
          clearTimeout(bounceTimeout);
          body.classList.add('bounce');
          
          bounceTimeout = setTimeout(() => {
              body.classList.remove('bounce');
          }, 400);
      }
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