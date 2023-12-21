$(document).ready(() => {
    const elementsArray = $('.totransition');

    $(window).on('scroll', fadeIn);

    function fadeIn() {
        const windowHeight = $(window).height();
        const windowTop = $(window).scrollTop();
        const windowBottom = windowTop + windowHeight;

        elementsArray.each(function() {
            const elem = $(this);
            const elemTop = elem.offset().top + (0.1 * windowHeight);
            const elemBottom = elemTop + elem.outerHeight();

            if (elemBottom >= windowTop && elemTop <= windowBottom) {
                elem.addClass('inView');
                // change transition duration to 0.2s after waiting 0.4s
                setTimeout(() => {
                    elem.css('transition', '0.2s');
                    elem.css('transition-delay', '0s');
                    elem.css('transition-timing-function', 'cubic-bezier(0.175, 0.885, 0.32, 1.275)');
                }, 400);
                
            }
        });
    }

    fadeIn(); // Call fadeIn initially to check elements on page load


    $('.nav-link').on('click', function(event) {
        event.preventDefault();
        const hash = this.hash;
        const $target = $(hash);
    
        if ($target.length) {
            const targetOffset = $target.offset().top - (0.17 * $(window).height());
            $('html, body').animate({
                scrollTop: targetOffset
            }, 800, "easeOutExpo");
        }
    });
    
});

