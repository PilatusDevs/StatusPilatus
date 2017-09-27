/*
*    StatusPilatus: Monitor your PC like never before!
*    Copyright (C) 2017 PilatusDevs
*
*    This program is free software: you can redistribute it and/or modify
*    it under the terms of the GNU General Public License as published by
*    the Free Software Foundation, either version 3 of the License, or
*    (at your option) any later version.
*
*    This program is distributed in the hope that it will be useful,
*    but WITHOUT ANY WARRANTY; without even the implied warranty of
*    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*    GNU General Public License for more details.
*
*    You should have received a copy of the GNU General Public License
*    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
"use strict";

var functionName = "dummy";

/*
* Boot all the core things of the app
*/
function init() {
    // set interval for loop()
    //setTimeout(loop, 500, '');

    // Load the changePage for the listener
    changePage();
}

/*
* On click on a href in the sidebar this switch statement
* will decide which page should be loaded or what other
* action should be executed
*/
function changePage(){
    $('a[href="#tab"]').click(function() {
        $(".page-header h1").text($(this).text());

        var name = $(this).text().toLowerCase();
        $(".frame").load("./components/"+name+"/"+name+".html");

        // Call the init function once so the function can set up the page (graphs etc..)
        var initFunction = "init" + name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        window[initFunction];

        // Now set the functionName to loop
        functionName = "refresh" + name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    });
}

function loop(args) {
    window[functionName]();
    setTimeout(loop, 500, '');
}

/*
* So you dont get 1800 errors messages. This function can later
* be replaced by something to run the dashboard.
*/
function dummy() {

}

$( document ).ready( init );
