document.addEventListener("DOMContentLoaded", init);

function init() {}

function sliderTouchController(slider, sliderItems) {
    var sliderItem = sliderItems[0];
    var startX = 0;
    var endX = 0;
    var translateX = 0;
    var sliderWidth = slider.offsetWidth;
    var translateSuccess = sliderWidth / 5;
    this.onSliderTouchStart = function(event) {
        console.log("onSliderItemsTouchStart");
        if (event.targetTouches.length === 1) {
            var touch = event.targetTouches[0];
            startX = touch.clientX;
            console.log("startX = " + startX);
        }
    };
    this.onSliderTouchMove = function(event) {
        if (event.targetTouches.length === 1) {
            var touch = event.targetTouches[0];
            translateX = touch.clientX - startX;
            if (Math.abs(translateX) < translateSuccess) {
                sliderItem.style.transform = "translateX(" + translateX + "px)";
            } else {
                console.log("translate success.");
                sliderItem.style.transform = "";
            }
        }
    };
    this.onSliderTouchEnd = function(event) {
        console.log("onSliderItemsTouchEnd");
        if (event.targetTouches.length === 1) {
            this.endTouch = event.targetTouches[0];
            endX = touch.clientX;
            console.log("endX = " + endX);
        }
    };
    slider.addEventListener("touchstart", this.onSliderTouchStart, false);
    slider.addEventListener("touchmove", this.onSliderTouchMove, false);
    slider.addEventListener("touchend", this.onSliderTouchEnd, false);
}