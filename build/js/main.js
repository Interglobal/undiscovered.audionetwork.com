function l(data) {
  console.log(data);
}

function getQueryVariable(variable) {
  var query = window.location.hash.split('?');
  var raw = query[1];
  var vars = raw.split('&');
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split('=');
    if(pair[0] == variable){return pair[1];}
  }
  return(false);
}

var activeScrollBlock;
var scrollBlocksLength = $('.content-block').length;

var windowHeight = $(window).height();

function layout() {
  $('.content-block').css('min-height', windowHeight+'px');
}

$(document).ready(function () {

  // FORM COMPLETE STATES

  if (window.location.hash) {
    formResult = $('#form-result');

    var raw = window.location.hash.split('?');
		var result = raw[0].substr(1);
		if (result === 'failure') {
  		errorCode = getQueryVariable('errorcode');
  		if (errorCode === '4') {
    		$('#form-failure-4').show();
  		} else {
    		$('#form-failure-generic').show();
  		}
  		formResult.slideDown(400);
			setTimeout(function() {
  			formResult.slideUp(400);
			}, 3000);
      window.location.hash = '';
		} else {
  		$('#form-'+result).show();
			formResult.slideDown(400);
			setTimeout(function() {
  			formResult.slideUp(400);
			}, 2000);
      window.location.hash = '';
		}
	}

  layout();
  $(window).resize(function() {
    windowHeight = $(window).height();
    layout();
  });

  $('.content-block').waypoint(function(direction) {
    if (direction === 'up') {

      if ($(this).index() === 1) {
        $('#nav-main').removeClass('show');
        $('#nav-scroll').removeClass('color-black');
      } else if ($(this).index() === 5) {
        $('#nav-scroll').addClass('color-black');
      }
    }
    if (direction === 'down') {

      if (this.id === 'footer') {
        $('#nav-scroll').removeClass('color-black');
      }
      activeScrollBlock = $(this).index();
    }
    $('.js-scroll').eq($(this).index()).toggleClass('active', direction === 'down');
  }, { offset: '66%' }).waypoint(function(direction) {
    if (direction === 'down') {

      if (this.id === 'header') {
        $('#nav-main').addClass('show');
        $('#nav-scroll').addClass('color-black');
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

// FORM

$('.js-input').keypress(function(e) {
  if (10 === e.which || 13 === e.which) {
    $(this).parents('form').submit();
  }
});

$('.js-submit').click(function() {
  $(this).parents('form').submit();
});

// MOBILE FORM SWAP

$('.mail-signup-mobile-trigger').click(function() {
  $('.nav-main-block').hide();
  $('.mail-signup-mobile').show();
});

// SCROLLS

$('.js-scroll').click(function() {
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

// AUDIO

$('.js-player-trigger').click( function() {
  if( $(this).siblings('audio')[0].paused ) {
    $(this).siblings('audio')[0].play();
  } else {
    $(this).siblings('audio')[0].pause();
  }
  $(this).parent().toggleClass('playing');
});

$('audio').on('play', function() {
  $('audio').not(this).each(function(index, audio) {
    audio.pause();
    $(this).parent().removeClass('playing');
  });
});

// SOCIAL SHARES

var share = {
  onFB: function(url) {
    FB.ui({
      method: 'share',
      href: url,
    }, function(response){});
  },
  onTW: function(url){
    console.log(url);
    window.open("https://twitter.com/intent/tweet?url="+encodeURIComponent(url)+"&text="+encodeURIComponent('Check out the latest release in Audio Network’s #Undiscovered Series')+ "&count=none/", "", "height=300, width=550, resizable=1");
    return true;
  }
};
