/* Data counter starts */
$(document).ready(function () {
    let observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let $el = $(entry.target);
  
          // Restart only if it's not already counting
          if (!$el.hasClass('counting')) {
            $el.addClass('counting');
            startCounter($el);
          }
        } else {
          // Reset when element leaves the viewport
          $(entry.target).removeClass('counting').text('0');
        }
      });
    }, { threshold: 0.5 });
  
    $('.counter').each(function () {
      observer.observe(this);
    });
  
    function startCounter($el) {
      let target = parseInt($el.data('target'));
      let duration = 2000;
      let current = 0;
      let increment = target / (duration / 10);
  
      let interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        $el.text(Math.floor(current));
      }, 10);
    }
  });
  /* Data counter ends */