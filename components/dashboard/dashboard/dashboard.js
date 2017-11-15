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

// Variables for settings

const defaultSettings = {
    animations : false,
    b : 300,
    c : 600
};

let currentSettings;

function initDashboard() {
    if (localStorage.getItem("settings") == null) {
        currentSettings = Object.assign({},defaultSettings);
        localStorage.setItem("settings", JSON.stringify(currentSettings));
        renderSettings();
    } else {
        let data = localStorage.getItem("settings");
        currentSettings = JSON.parse(data);
        renderSettings();
    }
}

function refreshDashboard() {

}

// Functions for settings

function renderSettings() {
    let body = document.querySelector("#settings");
    body.innerHTML =
    `<div class="row">
        <label class="control-label col-sm-3" for="a">Animations:</label>
        <div class="col-sm-2">
            <label class="switch">
                <input type="checkbox" id="animations" class="setting-control slider" ${(currentSettings.animations) ? "checked" : ""}>
                <span class="slider"></span>
            </label>
        </div>
    </div>
    <hr>
    <div class="row">
        <label class="control-label col-sm-3" for="b">b:</label>
        <div class="col-sm-2">
            <input type="number" min="1" id="b" class="setting-control form-control" value="${currentSettings.b}">
        </div>
    </div>
    <hr>
    <div class="row">
        <label class="control-label col-sm-3" for="c">c:</label>
        <div class="col-sm-2">
            <input type="number" min="1" id="c" class="setting-control form-control" value="${currentSettings.c}">
        </div>
    </div>`;
    activateControls();
}

function activateControls() {
    let toggleControls = document.querySelectorAll("[type='checkbox'].setting-control");
    let numberControls = document.querySelectorAll("[type='number'].setting-control");
    toggleControls.forEach((control) => {
        control.addEventListener("change", (e) => {
            let settingKey = e.target.id;
            let settingValue = e.target.checked;
            changeSetting(settingKey, settingValue);
        });
    });
    numberControls.forEach((control) => {
        control.addEventListener("input", (e) => {
            if (validateNumber(e.target)) {
                let settingKey = e.target.id;
                let settingValue = parseInt(e.target.value);
                changeSetting(settingKey, settingValue);
            } else {
                console.warn("invalid setting will not be saved");
            }
        });
    });
}

function validateNumber(el) {
    if (el.value == "") {
        el.value = 0;
    }
    if (el.matches(":valid")) {
        return true;
    } else {
        return false;
    }
}

function changeSetting(key, value) {
    currentSettings[key] = value;
    localStorage.setItem("settings", JSON.stringify(currentSettings));
}

function resetSettings() {
    currentSettings = Object.assign({},defaultSettings);
    localStorage.setItem("settings", JSON.stringify(currentSettings));
    renderSettings();
}
