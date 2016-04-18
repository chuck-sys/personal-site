var heightProportion = 0.7;
var slideTime = 1200;

function updateTimeline(id) {
    $('.timeline-content').hide()
                        .html($(id).html())
                        .slideDown(slideTime);
    $('.day').removeClass('selected');
}

$(document).ready(function() {
    var isMobile = window.matchMedia("only screen and (max-width: 760px)");
    var wh = $(window).height();

    // Sets the text on click
    // The selected one is the one I want to show
    var selected = '#d1';
    $('.day').on('click', function() {
        var id = $(this).attr('name');

        // Don't reload it
        if (selected == id) return;
        else                selected = id;

        updateTimeline(id);
        $(this).addClass('selected');

        // if user using mobile
        if (isMobile.matches) {
            $('html, body').animate({
                scrollTop: $('.timeline-content').offset().top
            }, 500);
        }
    });

    $('.timeline-content + button').on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });

    // Set text on default
    updateTimeline(selected);
    $('.day').filter('[name="'+selected+'"]').addClass('selected');

    // Set the maximum height of content, if it isn't mobile
    if (!isMobile.matches) {
        $('.timeline-content').css('max-height', (wh*heightProportion) + 'px');
    } else {
        $('.timeline-content + .hidden').removeClass('hidden');
    }

});
