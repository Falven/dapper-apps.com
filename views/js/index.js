
document.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
  injectEmail();
  // new sliderTouchController(
  //   document.getElementById('slider'),
  //   document.getElementsByClassName('slider-items')
  //   );
}

function injectEmail() {
  var email = {
    part1: "mail",
    part2: "to",
    part3: ":",
    part4: "dapperapps",
    part5: "@",
    part6: "hot",
    part7: "mail",
    part8: ".",
    part9: "co",
    part10: "m",
    part11: "?Sub",
    part12: "ject",
    part13: "=Business",
    part14: "%20",
    part15: "Inquiry"
  };
  var mailto = document.getElementById('mailto');
  mailto.href = email.part1 + email.part2 + email.part3 + email.part4 + email.part5 + email.part6 + email.part7 + email.part8 + email.part9 + email.part10 + email.part11 + email.part12 + email.part13 + email.part14 + email.part15;
}

function sliderTouchController(slider, sliderItems) {
  var sliderItem = sliderItems[0];
  var startX = 0;
  var endX = 0;
  var translateX = 0;
  var sliderWidth = slider.offsetWidth;
  var translateSuccess = sliderWidth / 5;

  this.onSliderTouchStart = function(event) {
    console.log('onSliderItemsTouchStart');
    if (event.targetTouches.length === 1) {
      var touch = event.targetTouches[0];
      startX = touch.clientX;
      console.log('startX = ' + startX);
    }
  };

  this.onSliderTouchMove = function(event) {
    if (event.targetTouches.length === 1) {
      var touch = event.targetTouches[0];
      translateX = (touch.clientX - startX);
      if(Math.abs(translateX) < translateSuccess) {
        sliderItem.style.transform = 'translateX(' + translateX + 'px)';
      } else {
        console.log('translate success.');
        sliderItem.style.transform = '';
      }
    }
  };

  this.onSliderTouchEnd = function(event) {
    console.log('onSliderItemsTouchEnd');
    if (event.targetTouches.length === 1) {
      this.endTouch = event.targetTouches[0];
      endX = touch.clientX;
      console.log('endX = ' + endX);
    }
  };

  slider.addEventListener('touchstart', this.onSliderTouchStart, false);
  slider.addEventListener('touchmove', this.onSliderTouchMove, false);
  slider.addEventListener('touchend', this.onSliderTouchEnd, false);
}