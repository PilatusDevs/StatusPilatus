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

/* The following lines are for the global Charts settings. */
Chart.defaults.global.animation = false;
Chart.defaults.global.animationSteps = 0;
Chart.defaults.global.elements.responsive = true;

/* This variable is used in the loop */
var functionName = "refreshDashboard";

/* include all the libraries */
const si = require("systeminformation");

/*
* Boot all the core things of the app
*/
function init() {
    /* this is the start page */
    window.initDashboard();
    $("#dashboard").addClass("active-tab")
    // set interval for loop()
    setTimeout(loop, 500, "");

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
        $('a[href="#tab"]').removeClass("active-tab");
        $(this).addClass("active-tab");
        $("#titles").removeClass();
        $("#titles").addClass($(this).text().toLowerCase());
        $("#dash-title").text($(this).text());
        //clear subtitle so it can be set in components init function
        $("#subtitle").text("");

        var layer = $(this).attr("data-layer");
        var folder = $(this).attr("data-folder");
        var name = $(this).attr("data-name");
        var path = `./components/${layer}/${folder}/${name}.html`;
        console.log(path);
        $(".frame").load(path, function(){
            // Call the init function once so the function can set up the page (graphs etc..)
            var initFunction = "init" + name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
            console.log(initFunction);
            window[initFunction]();

            // Now set the functionName to loop
            functionName = "refresh" + name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        });
    });
}

/*
* Called every 500ms
*/
function loop(args) {
    window[functionName]();
    setTimeout(loop, 500, "");
}

/*
* Used to go from kb to GB
*/
var sizes = ["bytes", "KB", "MB", "GB", "TB"];
function formatSize(bytes) {
    var l = Math.min(sizes.length - 1, Math.log(bytes) / Math.LN2 / 10 | 0);
    return [bytes / Math.pow(1024, l), sizes[l]];
}

/**
* Set the width of ALL the graphs
*/
function graph_width() {
    return 60;
}

$(() => {
    init();
});
