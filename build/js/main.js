function l(data) {
  console.log(data);
}

$(document).ready(function () {

});

$('.js-scroll').click(function() {
  var target = $(this).data('scroll');
/*   l(target); */
  if (target === 'header') {
    $('#header').ScrollTo()
  } else if (target === 'footer') {
    $('#footer').ScrollTo()
  } else {
    $('.artist').eq(target).ScrollTo();
  }
})

$('.content-block').waypoint(function(direction) {
  l(direction);
}, { offset: '100%' }).waypoint(function(direction) {
  l(direction);
}, { offset: function() {
  return -$(this).height();
}});