// index.js
$(document).ready(function (){
    console.log( "ready!" );

    var MyBlah = function($blah) {
        alert($blah);
    };

    MyBlah("Hello this works");
});