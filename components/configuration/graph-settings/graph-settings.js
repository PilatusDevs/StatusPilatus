/*
*    StatusPilatus: Monitor your PC like never before!
*    Copyright (C) 2018 PilatusDevs
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
/* global settings saveSettings */
"use strict";

module.exports = {
    init: initGraphSettings,
    refresh: refreshGraphSettings,
    activate: activateGraphSettings
};

function initGraphSettings() {
    enableGraphControls();
    //TODO
}

function refreshGraphSettings() {
    //TODO
}

function activateGraphSettings() {
    const animations = document.getElementById("animations");
    animations.checked = settings.graphs.animations ? "checked" : "";
    const graphWidth = document.getElementById("graph-width");
    graphWidth.value = settings.graphs.width;
    document.getElementById("graph-width-feedback").innerHTML = graphWidth.value;
}

function enableGraphControls() {
    const animations = document.getElementById("animations");
    animations.addEventListener("click", e => {
        settings.graphs.animations = e.target.checked;
        // This setting requires a restart because all the charts need to reload
        saveSettings();
    });
    const graphWidth = document.getElementById("graph-width");
    graphWidth.addEventListener("input", e => {
        document.getElementById("graph-width-feedback").innerHTML = e.target.value;
        settings.graphs.width = Number(e.target.value);
        saveSettings();
    });
}

// Currently unused
function validateNumber(el) {
    if (el.value === "") {
        el.value = 0;
    }
    if (el.matches(":valid")) {
        return true;
    } else {
        return false;
    }
}
