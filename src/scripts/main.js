function l(data) {
  console.log(data);
}

var activeScrollBlock;
var scrollBlocksLength = $('.content-block').length;

$(document).ready(function () {

  $('.content-block').waypoint(function(direction) {
/*
    var data = {
      "direction": direction,
      "this": $(this),
      "id": this.id,
      "index": $(this).index()
    };
    l(data);
*/

    if (direction === 'down') {
      activeScrollBlock = $(this).index();
    }
    $('.js-scroll').eq($(this).index()).toggleClass('active', direction === 'down');

  }, { offset: '66%' }).waypoint(function(direction) {

    if (direction === 'up') {
      activeScrollBlock = $(this).index();
    }
    $('.js-scroll').eq($(this).index()).toggleClass('active', direction === 'up');

  }, { offset: function() {
    return -$(this).height();
  }});

});

$('.js-scroll').click(function() {
  var target = $(this).data('scroll');
  if (target === 'header') {
    $('#header').ScrollTo();
  } else if (target === 'footer') {
    $('#footer').ScrollTo();
  } else {
    $('.artist').eq(target).ScrollTo();
  }

//   refactor this with eqs now
});

$('.js-scroll-up').click(function() {
  if (activeScrollBlock !== 0) {
    $('.content-block').eq(activeScrollBlock-1).ScrollTo()
  }
});

$('.js-scroll-down').click(function() {
  if (activeScrollBlock !== (scrollBlocksLength-1)) {
    $('.content-block').eq(activeScrollBlock+1).ScrollTo()
  }
});


$('#header::after').click(function() {
  $('.artist').eq(0).ScrollTo();
});