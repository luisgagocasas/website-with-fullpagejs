$('#fullpage').fullpage({
  sectionsColor: ['#87bfe4', 'orange', '#C0C0C0', '#242331'],
  scrollOverflow: true,
  css3: false,
  easingcss3: 'cubic-bezier(1.000, -0.440, 0.265, 1.385)',
  scrollingSpeed: 1200,
  anchors: ['firstPage', 'secondPage', '3rdPage', '4rdPage'],
  menu: '#menu',
  navigation: true,
  navigationPosition: 'right',

  //events
  onLeave: function(index, nextIndex, direction) {
    $(this).addClass('remove-circle');
    $('.fp-section').eq(nextIndex - 1).removeClass('remove-circle');

    if (nextIndex == 4) {
      $('#arrow').hide();

      //fading out navigation bulle|ts
      $('#fp-nav').fadeOut();
      $('#menu').fadeOut();

      $('#section4').find('.content').animate({
        top: '0%'
      }, 700, 'easeInQuart');
    }

    //leaving our last section? The one with our normal site?
    if (index == 4) {
      $('#arrow').show();

      //fadding in navigation bullets
      $('#fp-nav').fadeIn();
      $('#menu').fadeIn();

      $('#section4 .content').animate({
          top: '100%'
      }, 700, 'easeInQuart');
    }
  }
});

$('#arrow').click(function () {
  $.fn.fullpage.moveSectionDown();
});