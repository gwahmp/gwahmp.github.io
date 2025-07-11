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

  $(document).ready(function () {
    $('.add-token').on('click', function (e) {
      e.preventDefault(); // Prevent default action if inside a <a> or form

      const tokenAddress = '0x8274fc049f6d7c57df841ef3eacdf779f2ecd2b7';
      const tokenSymbol = 'WMT';
      const tokenDecimals = 18;
      const tokenImage = 'https://cdn.jsdelivr.net/gh/wikimint/wmt@main/logo/wikimint-wmt-256.png';

      if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
        window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: tokenAddress,
              symbol: tokenSymbol,
              decimals: tokenDecimals,
              image: tokenImage,
            },
          },
        })
        .then((success) => {
          if (success) {
            console.log('WMT token added!');
          } else {
            console.log('Token addition was rejected by the user.');
          }
        })
        .catch((error) => {
          console.error('Error adding token:', error);
        });
      } else {
        // Fallback: open BscScan in new tab
        window.open('https://bscscan.com/token/' + tokenAddress, '_blank');
      }
    });
  });