function SliderTouchController(slider, sliderForegrounds, sliderBackgrounds, sliderButtons, sliderActive) {
  var threshold = 0.1;
  var foreground,
      background,
      buttons,
      active,
      isDragging,
      isTapping,
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

  var onButtonTouchStart = function(event) {
    if(!isTapping) {
      event.preventDefault();
      event.stopPropagation();
      isTapping = true;
    }
  };

  var onButtonTouchCancel = function(event) {
    if(isTapping) {
      isTapping = false;
    }
  };

  var onButtonTouchEnd = function(event) {
    if(isTapping) {
      event.preventDefault();
      event.stopPropagation();

      active.removeAttribute('style');
      foreground.removeAttribute('style');
      background.removeAttribute('style');

      event.target.click();
      // event.target.
      index = offsetX = activeOffsetX = 0;
      isTapping = false;
    }
  };

  var onSliderTouchStart = function(event) {
    isDragging = false;
    targetTouches = event.targetTouches;
    if (targetTouches.length === 1) {
      startX = targetTouches[0].clientX;
    }
  };

  var onSliderTouchMove = function(event) {
    // event.preventDefault();
    targetTouches = event.targetTouches;
    if (targetTouches.length === 1) {
      if(!isDragging) {
        isDragging = true;
        foreground.style.setProperty('transition', 'transform 0ms');
        background.style.setProperty('transition', 'transform 0ms');
      }
      translateX = (targetTouches[0].clientX - startX);
      var pos = (offsetX + translateX);
      foreground.style.setProperty('transform', 'translateX(' + pos + 'px)');
      background.style.setProperty('transform', 'translateX(' + pos + 'px)');
    }
  };

  var onSliderTouchCancel = function(event) {
    if(isDragging) {
      isDragging = false;
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
      active.style.setProperty('transition', '');
      foreground.style.setProperty('transition', '');
      background.style.setProperty('transition', '');

      active.style.setProperty('transform', 'translateX(' + activeOffsetX + 'px)');
      foreground.style.setProperty('transform', 'translateX(' + offsetX + 'px)');
      background.style.setProperty('transform', 'translateX(' + offsetX + 'px)');
    }
  };

  this.attach = function() {
    foreground = sliderForegrounds[0];
    background = sliderBackgrounds[0];
    buttons = sliderButtons;
    active = sliderActive[0];

    for (var i = 0; i < buttons.length; ++i) {
      buttons[i].addEventListener('touchstart', onButtonTouchStart, false);
      buttons[i].addEventListener('touchcancel', onButtonTouchCancel, false);
      buttons[i].addEventListener('touchend', onButtonTouchEnd, false);
    }
    slider.addEventListener('touchstart', onSliderTouchStart, false);
    slider.addEventListener('touchmove', onSliderTouchMove, false);
    slider.addEventListener('touchcancel', onSliderTouchCancel, false);
    slider.addEventListener('touchend', onSliderTouchEnd, false);
  };

  this.detach = function() {
    for (var i = 0; i < buttons.length; ++i) {
      buttons[i].removeEventListener(onButtonTouchStart);
      buttons[i].removeEventListener(onButtonTouchCancel);
      buttons[i].removeEventListener(onButtonTouchEnd);
    }
    slider.removeEventListener(onSliderTouchStart);
    slider.removeEventListener(onSliderTouchMove);
    slider.removeEventListener(onSliderTouchCancel);
    slider.removeEventListener(onSliderTouchEnd);
  };
}