"use strict";

/*
* On click on a href in the sidebar this switch statement
* will decide which page should be loaded or what other
* action should be executed
*/
function changePage(){
    $('a[href="#tab"]').click(function() {
        $(".page-header h1").text($(this).text());
        $(".frame").load("./components/"+name+"/"+name+".html");
    });
}

// set interval
// var tid = setInterval(loop(name), 2000);
// function loop(name) {
//     // do some stuff...
//     // no need to recall the function (it's an interval, it'll loop forever)
// }
//
// function abortTimer() { // to be called when you want to stop the timer
//     clearInterval(tid);
// }

$( document ).ready( changePage );
