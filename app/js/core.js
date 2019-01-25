/*
*    StatusPilatus: Monitor your PC like never before!
*    Copyright (C) 2019 PilatusDevs
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
/* global Chart $ settings */
"use strict";

/* Chart.js configurion options */
if (settings.graphs.animations) {
    Chart.defaults.global.animation = {
        easing: "easeInOutCubic",
        duration: 200
    };
} else {
    Chart.defaults.global.animation = false;
}
Chart.defaults.global.elements.responsive = true;

/* Include all the libraries */
const si = require("systeminformation");
const plistr = require("proglistr");
const util = require("./js/util.js");

// Store the component name of the visible page
// The refresh function will be called when background updates are disabled
// Otherwise all refresh methods will be called along with this one
let currentComponentName = "dashboard";

// All the components are stored here.
// This will be filled by the init function below.
// Each component has an init refresh and activate function
const components = {};

/*
* Boot all the core things of the app
*/
function init() {
    // Promises for components load status
    const loadingComponents = [];
    // Fill the components
    $('a[href="#tab"]').each((index, element) => {
        const layer = $(element).attr("data-layer");
        const folder = $(element).attr("data-folder");
        const name = $(element).attr("data-name");
        const htmlPath = `../components/${layer}/${folder}/${name}.html`;
        const jsPath = `../components/${layer}/${folder}/${name}.js`;
        components[name] = require(jsPath);
        $("#frame").append(`<div style="display: none" id="frame-${name}"></div>`);
        loadingComponents.push(
            loadComponent(htmlPath, name)
        );
    });
    // Wait for all components to load beforing continuing
    Promise.all(loadingComponents)
        .then(() => {
            // Activate the listeners to switch between the pages
            changePageListeners();
            // Activate and show the startup dashboard page
            $("#dashboard").click();
            // Call the loop for the first time
            setTimeout(loop, 500);
        });
}

/*
* Load the html for all components and call the init function
*/
function loadComponent(htmlPath, name) {
    return new Promise((resolve, reject) => {
        $(`#frame-${name}`).load(htmlPath, (res, status) => {
            if (status === "error") {
                reject(`${name}.html failed to load.`);
            } else {
                components[name].init();
                resolve();
            }
        });
    });
}

/*
* When a menu item is clicked from the sidebar,
* This function is called to switch between the pages.
*/
function changePageListeners(){
    $('a[href="#tab"]').click(function() {
        $('a[href="#tab"]').removeClass("active-tab");
        $(this).addClass("active-tab");
        $("#titles").removeClass();
        $("#titles").addClass($(this).text().toLowerCase());
        $("#dash-title").text($(this).text());
        // Clear subtitle so it can be set in components activate function
        $("#subtitle").text("");
        // Hide all other frames
        $("[id^=frame-]").css("display", "none");
        // Show the html page of the requested page
        // Also call the activate function of the now active component
        const name = $(this).attr("data-name");
        $(`#frame-${name}`).css("display", "");
        components[name].activate();
        currentComponentName = name;
    });
}

/*
* Main application loop
*
* This function calls itself with the updateInterval delay.
* It calls the refresh function for each component,
* or just the visible component if background updates are disabled.
*/
function loop() {
    if (settings.general.backgroundUpdates) {
        Object.keys(components).forEach(name => {
            components[name].refresh();
        });
    } else {
        components[currentComponentName].refresh();
    }
    setTimeout(loop, settings.general.updateInterval);
}

$(() => {
    init();
});
