if (document.readyState === "complete" || document.readyState === "interactive") {
    init();
} else {
    document.addEventListener("DOMContentLoaded", init);
}

function init(event) {
    var slider = document.getElementById("slider");
    var items = document.getElementsByClassName("slider-items");
    slider.addEventListener("touchmove", function(event) {
        if (event.targetTouches.length === 1) {
            var touch = event.targetTouches[0];
            items[0].style.transform = "translateX(" + touch.pageX + "px)";
        }
    }, false);
}