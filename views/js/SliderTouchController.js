var SliderTouchController = {

};

function SliderTouchController(slider, sliderStack, sliderForegrounds, sliderBackgrounds, sliderButtons, sliderActive) {

  var threshold = 0.1;
  var foreground,
      background,
      buttons,
      active,
      stack,
      isDragging,
      isTapping,
      startX,
      startY,
      endX,
      endY,
      translateX,
      translateY,
      lockY,
      targetTouches,
      stopPreview;
  var index = 0;
  var offsetX = 0;
  var activeOffsetX = 0;

  // All calculations based on foreground elements.
  var getNumSlides = function() {
    return foreground.childNodes.length;
  };

  var getSlidePos = function() {
    return foreground.getBoundingClientRect().left - slider.getBoundingClientRect().left;
  };

  var getSlideWidth = function() {
    return foreground.childNodes[0].getBoundingClientRect().width;
  };

  var getActivePos = function() {
    return active.getBoundingClientRect().marginLeft;
  };

  getOffsetFor = function(i) {
    return -i * getSlideWidth();
  };

  getActiveOffsetFor = function(i) {
    return -i * window.getComputedStyle(buttons[Math.trunc(buttons.length / 2) - 1]).marginLeft.replace('px', '');
  };
  
  stopPreview = function() {
    var i;
    for(i = 0; i < stack.length; ++i) {
      stack[i].style.setProperty('animation-play-state', 'paused');
    }
    active.style.setProperty('animation-play-state', 'paused');

    var stackOffset = getSlideOffset();
    for(i = 0; i < stack.length; ++i) {
      stack[i].style.setProperty('transform', 'translateX(' + stackOffset + 'px)');
    }
    active.style.setProperty('transform', 'translateX(' + getActiveOffset() + 'px)');

    for(i = 0; i < stack.length; ++i) {
      stack[i].style.setProperty('animation', 'none');
    }
    active.style.setProperty('animation', 'none');
  };

  var onButtonTouchStart = function(event) {
    // stopPreview();
    if(!isTapping) {
      isTapping = true;
    }
  };

  var onButtonTouchCancel = function(event) {
    if(isTapping) {
      event.preventDefault();
      isTapping = false;
    }
  };

  var onButtonTouchEnd = function(event) {
    if(isTapping) {
      event.preventDefault();

      active.removeAttribute('style');
      foreground.removeAttribute('style');
      background.removeAttribute('style');
      var button = event.target;
      for(var i = 0; i < buttons.length; ++i) {
        if(button === buttons[i]) {
          offsetX = getOffsetFor(i);
          activeOffsetX = getActiveOffsetFor(i);
          index = i;
          break;
        }
      }
      button.click();

      isTapping = false;
    }
  };

  var onSliderTouchStart = function(event) {
    // stopPreview();
    targetTouches = event.targetTouches;
    if (targetTouches.length === 1) {
      startX = targetTouches[0].clientX;
      startY = targetTouches[0].clientY;
    }
  };

  var onSliderTouchMove = function(event) {
    targetTouches = event.targetTouches;
    if (targetTouches.length === 1) {
      if(!isDragging) {
        isDragging = true;
        foreground.style.setProperty('transition', 'transform 0ms');
        background.style.setProperty('transition', 'transform 0ms');
      }

      translateX = (targetTouches[0].clientX - startX);
      translateY = (targetTouches[0].clientY - startY);

      if(!lockY) {
        if(Math.abs(translateY) > Math.abs(translateX)) {
          lockY = true;
        } else {
          event.preventDefault();
          var pos = (offsetX + translateX);
          foreground.style.setProperty('transform', 'translateX(' + pos + 'px)');
          background.style.setProperty('transform', 'translateX(' + pos + 'px)');
        }
      }
    }
  };

  var onSliderTouchCancel = function(event) {
    if(isDragging) {
      isDragging = lockY = false;
    }
  };

  var onSliderTouchEnd = function(event) {
    if(isDragging) {
      endX = targetTouches[0].clientX;
      endY = targetTouches[0].clientY;
      var translationalThreshold = threshold * getSlideWidth();
      if(Math.abs(translateX) > translationalThreshold) {
        var nextIndex;
        if(translateX < 0) {
            nextIndex = index + 1;
        } else {
          if(translateX > 0) {
            nextIndex = index - 1;
          }
        }
        if(nextIndex !== index && nextIndex > -1 && nextIndex < getNumSlides()) {
          offsetX = getOffsetFor(nextIndex);
          activeOffsetX = getActiveOffsetFor(nextIndex);
          index = nextIndex;
        }
      }

      active.style.setProperty('transition', '');
      foreground.style.setProperty('transition', '');
      background.style.setProperty('transition', '');

      active.style.setProperty('transform', 'translateX(' + activeOffsetX + 'px)');
      foreground.style.setProperty('transform', 'translateX(' + offsetX + 'px)');
      background.style.setProperty('transform', 'translateX(' + offsetX + 'px)');

      isDragging = lockY = false;
    }
  };

  this.attach = function() {
    foreground = sliderForegrounds[0];
    background = sliderBackgrounds[0];
    buttons = sliderButtons;
    active = sliderActive[0];
    stack = sliderStack;

    for (var i = 0; i < buttons.length; ++i) {
      buttons[i].addEventListener('touchstart', onButtonTouchStart, false);
      buttons[i].addEventListener('touchcancel', onButtonTouchCancel, false);
      buttons[i].addEventListener('touchend', onButtonTouchEnd, false);
      buttons[i].addEventListener('click', onButtonTouchStart, false);
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