$(function () {
    // Add click-event listener
    $(".nav li a").on("click", function () {
        // Remove the current class from all a tags
        $(".nav li a").removeClass("current");
        // Add the current class to the clicked a
        $(this).addClass("current");
    });

});
$(document).ready(function () {
    $('pre.code').highlight({ source: 1, zebra: 1, indent: 'space', list: 'ol', attribute: 'data-language' });
});