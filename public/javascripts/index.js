var slider = document.getElementById("slider");

var items = document.getElementsByClassName("slider-items");

slider.addEventListener("touchmove", function(event) {
    if (event.targetTouches.length === 1) {
        var touch = event.targetTouches[0];
        items.style.left = touch.pageX + "px";
    }
}, false);