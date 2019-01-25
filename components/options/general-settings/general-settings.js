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
    init: initGeneralSettings,
    refresh: refreshGeneralSettings,
    activate: activateGeneralSettings
};

function initGeneralSettings() {
    enableGeneralControls();
    //TODO
}

function refreshGeneralSettings() {
    //TODO
}

function activateGeneralSettings() {
    const backgroundUpdates = document.getElementById("background-updates");
    backgroundUpdates.checked = settings.general.backgroundUpdates ? "checked" : "";
    const updateInterval = document.getElementById("update-interval");
    updateInterval.value = settings.general.updateInterval;
    document.getElementById("update-interval-feedback").innerHTML = updateInterval.value;
}

function enableGeneralControls() {
    //TODO
    const backgroundUpdates = document.getElementById("background-updates");
    backgroundUpdates.addEventListener("click", e => {
        settings.general.backgroundUpdates = e.target.checked;
        saveSettings();
    });
    const updateInterval = document.getElementById("update-interval");
    updateInterval.addEventListener("input", e => {
        document.getElementById("update-interval-feedback").innerHTML = e.target.value;
        settings.general.updateInterval = Number(e.target.value);
        saveSettings();
    });
}
