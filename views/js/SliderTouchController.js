function SliderTouchController(slider, sliderStack, sliderForegrounds, sliderBackgrounds, sliderButtons, sliderActive) {
  var _threshold = 0.1;
  var _foreground,
      _background,
      _buttons,
      _active,
      _stack,
      _isDragging,
      _isTapping,
      _startX,
      _startY,
      _endX,
      _endY,
      _translateX,
      _translateY,
      _lockY,
      _targetTouches,
      _stopPreview;
  var _index = 0;
  var _offsetX = 0;
  var _activeOffsetX = 0;

  // All calculations based on foreground elements.
  var getNumSlides = function() {
    return _foreground.childNodes.length;
  };

  var getSlidePos = function() {
    return _foreground.getBoundingClientRect().left - slider.getBoundingClientRect().left;
  };

  var getSlideWidth = function() {
    return _foreground.childNodes[0].getBoundingClientRect().width;
  };

  var getActivePos = function() {
    return _active.getBoundingClientRect().marginLeft;
  };

  getOffsetFor = function(i) {
    return -i * getSlideWidth();
  };

  getActiveOffsetFor = function(i) {
    return -i * window.getComputedStyle(_buttons[Math.trunc(_buttons.length / 2) - 1]).marginLeft.replace('px', '');
  };
  
  _stopPreview = function() {
    var i;
    for(i = 0; i < _stack.length; ++i) {
      _stack[i].style.setProperty('animation-play-state', 'paused');
    }
    _active.style.setProperty('animation-play-state', 'paused');

    var stackOffset = getSlideOffset();
    for(i = 0; i < _stack.length; ++i) {
      _stack[i].style.setProperty('transform', 'translateX(' + stackOffset + 'px)');
    }
    _active.style.setProperty('transform', 'translateX(' + getActiveOffset() + 'px)');

    for(i = 0; i < _stack.length; ++i) {
      _stack[i].style.setProperty('animation', 'none');
    }
    _active.style.setProperty('animation', 'none');
  };

  var onButtonTouchStart = function(event) {
    // stopPreview();
    if(!_isTapping) {
      _isTapping = true;
    }
  };

  var onButtonTouchCancel = function(event) {
    if(_isTapping) {
      event.preventDefault();
      _isTapping = false;
    }
  };

  var onButtonTouchEnd = function(event) {
    if(_isTapping) {
      event.preventDefault();

      _active.removeAttribute('style');
      _foreground.removeAttribute('style');
      _background.removeAttribute('style');
      var button = event.target;
      for(var i = 0; i < _buttons.length; ++i) {
        if(button === _buttons[i]) {
          _offsetX = getOffsetFor(i);
          _activeOffsetX = getActiveOffsetFor(i);
          _index = i;
          break;
        }
      }
      button.click();

      _isTapping = false;
    }
  };

  var onSliderTouchStart = function(event) {
    // stopPreview();
    _targetTouches = event.targetTouches;
    if (_targetTouches.length === 1) {
      _startX = _targetTouches[0].clientX;
      _startY = _targetTouches[0].clientY;
    }
  };

  var onSliderTouchMove = function(event) {
    _targetTouches = event.targetTouches;
    if (_targetTouches.length === 1) {
      if(!_isDragging) {
        _isDragging = true;
        _foreground.style.setProperty('transition', 'transform 0ms');
        _background.style.setProperty('transition', 'transform 0ms');
      }

      _translateX = (_targetTouches[0].clientX - _startX);
      _translateY = (_targetTouches[0].clientY - _startY);

      if(!_lockY) {
        if(Math.abs(_translateY) > Math.abs(_translateX)) {
          _lockY = true;
        } else {
          event.preventDefault();
          var pos = (_offsetX + _translateX);
          _foreground.style.setProperty('transform', 'translateX(' + pos + 'px)');
          _background.style.setProperty('transform', 'translateX(' + pos + 'px)');
        }
      }
    }
  };

  var onSliderTouchCancel = function(event) {
    if(_isDragging) {
      _isDragging = _lockY = false;
    }
  };

  var onSliderTouchEnd = function(event) {
    if(_isDragging) {
      _endX = _targetTouches[0].clientX;
      _endY = _targetTouches[0].clientY;
      var translationalThreshold = _threshold * getSlideWidth();
      if(Math.abs(_translateX) > translationalThreshold) {
        var nextIndex;
        if(_translateX < 0) {
            nextIndex = _index + 1;
        } else {
          if(_translateX > 0) {
            nextIndex = _index - 1;
          }
        }
        if(nextIndex !== _index && nextIndex > -1 && nextIndex < getNumSlides()) {
          _offsetX = getOffsetFor(nextIndex);
          _activeOffsetX = getActiveOffsetFor(nextIndex);
          _index = nextIndex;
        }
      }

      _active.style.setProperty('transition', '');
      _foreground.style.setProperty('transition', '');
      _background.style.setProperty('transition', '');

      _active.style.setProperty('transform', 'translateX(' + _activeOffsetX + 'px)');
      _foreground.style.setProperty('transform', 'translateX(' + _offsetX + 'px)');
      _background.style.setProperty('transform', 'translateX(' + _offsetX + 'px)');

      _isDragging = _lockY = false;
    }
  };

  this.attach = function() {
    _foreground = sliderForegrounds[0];
    _background = sliderBackgrounds[0];
    _buttons = sliderButtons;
    _active = sliderActive[0];
    _stack = sliderStack;

    for (var i = 0; i < _buttons.length; ++i) {
      _buttons[i].addEventListener('touchstart', onButtonTouchStart, false);
      _buttons[i].addEventListener('touchcancel', onButtonTouchCancel, false);
      _buttons[i].addEventListener('touchend', onButtonTouchEnd, false);
      _buttons[i].addEventListener('click', onButtonTouchStart, false);
    }

    slider.addEventListener('touchstart', onSliderTouchStart, false);
    slider.addEventListener('touchmove', onSliderTouchMove, false);
    slider.addEventListener('touchcancel', onSliderTouchCancel, false);
    slider.addEventListener('touchend', onSliderTouchEnd, false);
  };

  this.detach = function() {
    for (var i = 0; i < _buttons.length; ++i) {
      _buttons[i].removeEventListener(onButtonTouchStart);
      _buttons[i].removeEventListener(onButtonTouchCancel);
      _buttons[i].removeEventListener(onButtonTouchEnd);
    }

    slider.removeEventListener(onSliderTouchStart);
    slider.removeEventListener(onSliderTouchMove);
    slider.removeEventListener(onSliderTouchCancel);
    slider.removeEventListener(onSliderTouchEnd);
  };
}