document.addEventListener('DOMContentLoaded', function() {
  const body = document.body;
  let lastScrollTop = 0;
  let bounceTimeout;

  body.addEventListener('scroll', function(e) {
      clearTimeout(bounceTimeout);
      
      const currentScroll = body.scrollTop;
      const maxScroll = body.scrollHeight - body.clientHeight;
      
      if ((currentScroll <= 0 && currentScroll < lastScrollTop) || 
          (currentScroll >= maxScroll && currentScroll > lastScrollTop)) {
          
          body.classList.add('bounce');
          
          bounceTimeout = setTimeout(() => {
              body.classList.remove('bounce');
          }, 400);
      }
      
      lastScrollTop = currentScroll;
  });
});