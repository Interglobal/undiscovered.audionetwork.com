function l(data) {
  console.log(data);
}

var activeScrollBlock;
var scrollBlocksLength = $('.content-block').length;

var windowHeight = $(window).height();

function layout() {
  $('.content-block').css('min-height', windowHeight+'px');
}

$(document).ready(function () {

  layout();
  $(window).resize(function() {
    windowHeight = $(window).height();
    layout();
  });

  $('.content-block').waypoint(function(direction) {
    if (direction === 'up') {
      if ($(this).index() === 1) {
        $('#nav-main').removeClass('show');
      }
    }
    if (direction === 'down') {
      activeScrollBlock = $(this).index();
    }
    $('.js-scroll').eq($(this).index()).toggleClass('active', direction === 'down');
  }, { offset: '66%' }).waypoint(function(direction) {
    if (direction === 'down') {
      if (this.id === 'header') {
        $('#nav-main').addClass('show');
      }
    }
    if (direction === 'up') {
      activeScrollBlock = $(this).index();
    }
    $('.js-scroll').eq($(this).index()).toggleClass('active', direction === 'up');
  }, { offset: function() {
    return -$(this).height();
  }});

});

$('.js-input').keypress(function(e) {
  if (10 === e.which || 13 === e.which) {
    $(this).parents('form').submit();
  }
})

$('.js-submit').click(function() {
  $(this).parents('form').submit();
});

$('.js-scroll').click(function() {
// refactor this with eqs now
  var target = $(this).data('scroll');
  if (target === 'header') {
    $('#header').ScrollTo();
  } else if (target === 'footer') {
    $('#footer').ScrollTo();
  } else {
    $('.artist').eq(target).ScrollTo();
  }
});

$('.js-scroll-up').click(function() {
  if (activeScrollBlock !== 0) {
    $('.content-block').eq(activeScrollBlock-1).ScrollTo();
  }
});

$('.js-scroll-down').click(function() {
  if (activeScrollBlock !== (scrollBlocksLength-1)) {
    $('.content-block').eq(activeScrollBlock+1).ScrollTo();
  }
});


$('#header-bottom').click(function() {
  if (activeScrollBlock !== (scrollBlocksLength-1)) {
    $('.content-block').eq(activeScrollBlock+1).ScrollTo();
  }
});

$('.artist-song .player-control').click( function() {
  if( $(this).siblings('audio')[0].paused )
    $(this).siblings('audio')[0].play();
  else
    $(this).siblings('audio')[0].pause();

  $(this).parent().toggleClass('playing');
});

$("audio").on("play", function() {
    $("audio").not(this).each(function(index, audio) {
        audio.pause();
        $(this).parent().removeClass('playing')
    });
});
