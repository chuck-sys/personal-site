var heightRatio = 0.7;

$(document).ready(function() {
    var wh = $(window).height();

    // Make the image bigger
    $('.full-image').css({height: wh});
    // Center the section in the image
    $('.full-image').find('.portfolio-head').css({
        position: 'relative',
        top: wh * heightRatio * 0.5
    });
    // Each section in the portfolio should be a full-screen
    $('.project').css({'min-height': wh + "px"});
    $('.project').children().css({'min-height': wh + "px"});

    // fancyBox
    $('.fancybox').fancybox();
});
