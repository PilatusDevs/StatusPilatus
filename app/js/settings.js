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
/* global components currentComponentName */
"use strict";

const defaultSettings = {
    general: {
        updateInterval: 500,
        backgroundUpdates: true
    },
    graphs: {
        animations: false,
        width: 60
    }
};

// Set the settings to the default settings,
// and try to load the user settings
let settings = loadSettings();

function validSettings(s) {
    try {
        s = JSON.parse(s);
        if (typeof s.general.updateInterval !== "number") {
            return false;
        } else if (typeof s.general.backgroundUpdates !== "boolean") {
            return false;
        } else if (typeof s.graphs.animations !== "boolean") {
            return false;
        } else if (typeof s.graphs.width !== "number") {
            return false;
        }
    } catch (e) {
        return false;
    }
    return true;
}

function loadSettings() {
    const storedSettings = localStorage.getItem("settings");
    if (validSettings(storedSettings)) {
        try {
            return JSON.parse(storedSettings);
        } catch (e) {
            return JSON.parse(JSON.stringify(defaultSettings));
        }
    } else {
        return JSON.parse(JSON.stringify(defaultSettings));
    }
}

function saveSettings() {
    localStorage.setItem("settings", JSON.stringify(settings));
}

function resetSettings(subsection) {
    if (subsection) {
        if (confirm(`Are you sure you want to reset your ${subsection} settings back to the defaults?`)) {
            settings[subsection] = JSON.parse(JSON.stringify(defaultSettings[subsection]));
        }
    } else if (confirm("Are you sure you want to reset ALL your settings back to the defaults?")) {
        settings = JSON.parse(JSON.stringify(defaultSettings));
    }
    components[currentComponentName].activate();
    saveSettings();
}
