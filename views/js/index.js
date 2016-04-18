
document.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
  injectEmail();
  if("ontouchstart" in window) {
    var sliderController = new SliderTouchController(
      document.getElementById('slider'),
      document.getElementsByClassName('slider-stack'),
      document.getElementsByClassName('slider-foregrounds'),
      document.getElementsByClassName('slider-backgrounds'),
      document.getElementsByClassName('button'),
      document.getElementsByClassName('active')
    ).attach();
  }
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