if (document.readyState === "complete" || document.readyState === "interactive") {
  init();
} else {
  document.addEventListener("DOMContentLoaded", init);
}

function init(event) {
  var slider = document.getElementById('slider');
  var items = document.getElementsByClassName('slider-items');

  slider.addEventListener('touchmove', function (event) {
      // If there's exactly one finger inside this element
      if (event.targetTouches.length === 1) {
        var touch = event.targetTouches[0];
        // Place element where the finger is
        items[0].style.transform = 'translateX(' + touch.pageX + 'px)';
        // obj.style.top = touch.pageY + 'px';
      }
    }, false);
}