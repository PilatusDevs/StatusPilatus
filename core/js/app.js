/*
    StatusPilatus: Monitor your PC like never before!
    Copyright (C) 2017 PilatusDevs

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
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
