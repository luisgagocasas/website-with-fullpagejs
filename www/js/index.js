$("#fullpage").fullpage({
    sectionsColor: [ "#87bfe4", "orange", "#C0C0C0", "#242331" ],
    scrollOverflow: !0,
    css3: !1,
    easingcss3: "cubic-bezier(1.000, -0.440, 0.265, 1.385)",
    scrollingSpeed: 1200,
    anchors: [ "firstPage", "secondPage", "3rdPage", "4rdPage" ],
    menu: "#menu",
    navigation: !0,
    navigationPosition: "right",
    onLeave: function(index, nextIndex, direction) {
        $(this).addClass("remove-circle"), $(".fp-section").eq(nextIndex - 1).removeClass("remove-circle"), 
        4 == nextIndex && ($("#arrow").hide(), $("#fp-nav").fadeOut(), $("#menu").fadeOut(), 
        $("#section4").find(".content").animate({
            top: "0%"
        }, 700, "easeInQuart")), 4 == index && ($("#arrow").show(), $("#fp-nav").fadeIn(), 
        $("#menu").fadeIn(), $("#section4 .content").animate({
            top: "100%"
        }, 700, "easeInQuart"));
    }
}), $("#arrow").click(function() {
    $.fn.fullpage.moveSectionDown();
});