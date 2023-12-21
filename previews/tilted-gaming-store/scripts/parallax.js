// parallax scroll
$(document).ready(() => {
    $(window).scroll(() => {
        var scrollPosition = $(this).scrollTop();
        $('.parallax').css({
            'transform': 'translateY(' + (scrollPosition * 0.6) + 'px)' // Change 0.5 to adjust the speed
        });
    });
});