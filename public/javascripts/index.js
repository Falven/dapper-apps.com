var obj = document.getElementsByClassName("slider-items");

obj.addEventListener("touchmove", function(event) {
    if (event.targetTouches.length === 1) {
        var touch = event.targetTouches[0];
        obj.style.left = touch.pageX + "px";
    }
}, false);