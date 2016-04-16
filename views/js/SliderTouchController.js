function SliderTouchController(slider, sliderForegrounds, sliderBackgrounds, sliderButtons, sliderActive) {
  var foreground = sliderForegrounds[0];
  var background = sliderBackgrounds[0];
  var buttons = sliderButtons;
  var active = sliderActive[0];
  var speed = background - foreground;

  var threshold = 0.33;
  var isDragging,
      startX,
      endX,
      translateX,
      targetTouches;
  var index = 0;
  var offsetX = 0;
  var activeOffsetX = 0;

  // All calculations based on foreground elements.
  var getNumElements = function() {
    return foreground.childNodes.length;
  };

  var getSliderWidth = function() {
    return slider.getBoundingClientRect().width;
  };

  var getSliderLeft = function() {
    return slider.getBoundingClientRect().left;
  };

  var getNumberSlides = function() {
    return getSlidesWidth() / getSliderWidth();
  };

  var getSlideWidth = function() {
    return getSliderWidth();
  };

  var getSlidesWidth = function() {
    return foreground.getBoundingClientRect().width;
  };

  var getForegroundLeft = function() {
    return foreground.getBoundingClientRect().left;
  };

  var getSlideOffset = function() {
    return getForegroundLeft() - getSliderLeft();
  };

  var getMaxIndex = function() {
    return getNumberSlides() - 1;
  };

  var getActiveOffset = function() {
    return window.getComputedStyle(buttons[Math.trunc(buttons.length / 2) - 1]).marginLeft.replace('px', '');
  };

  var onSliderTouchStart = function(event) {
    targetTouches = event.targetTouches;
    if (targetTouches.length === 1) {
      startX = targetTouches[0].clientX;
    }
  };

  var onSliderTouchMove = function(event) {
    event.preventDefault();
    targetTouches = event.targetTouches;
    if (targetTouches.length === 1) {
      if(!isDragging) {
        isDragging = true;
        foreground.style.transition = background.style.transition ='transform 0ms';
      }
      translateX = (targetTouches[0].clientX - startX);
      foreground.style.transform = background.style.transform = 'translateX(' + (offsetX + translateX) + 'px)';
    }
  };

  var onSliderTouchEnd = function(event) {
    if(isDragging) {
      isDragging = false;
      endX = targetTouches[0].clientX;
      var translationalThreshold = threshold * getSlideWidth();
      if(Math.abs(translateX) > translationalThreshold) {
        if(translateX < 0) {
            if(index + 1 <= getMaxIndex()) {
              offsetX = -(++index) * getSlideWidth();
              activeOffsetX = -(index) * getActiveOffset();
            }
        } else {
          if(translateX > 0) {
            if(index - 1 > -1) {
              offsetX = -(--index) * getSlideWidth();
              activeOffsetX = -(index) * getActiveOffset();
            }
          }
        }
      }
      active.style.transition = foreground.style.transition = background.style.transition = '';
      active.style.transform = 'translateX(' + activeOffsetX + 'px)';
      foreground.style.transform = background.style.transform = 'translateX(' + offsetX + 'px)';
    }
  };

  this.attach = function() {
    slider.addEventListener('touchstart', onSliderTouchStart, false);
    slider.addEventListener('touchmove', onSliderTouchMove, false);
    slider.addEventListener('touchend', onSliderTouchEnd, false);
  };
}