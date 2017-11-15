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

// Stuff for settings

const defaultSettings = {
    a : true,
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
//
// function setData() {
//     let textfield = document.querySelector("#textData");
//     localStorage.setItem("data", textfield.value);
// }
//
// function getData() {
//     let dingetje = localStorage.getItem("data");
//     alert(dingetje);
// }
//
// function kData() {
//     console.log(currentSettings);
// }

function renderSettings() {
    let body = document.querySelector("#settings");
    body.innerHTML =
    `<div class="row">
        <label class="control-label col-sm-3" for="a">Animations:</label>
        <div class="col-sm-2">
            <input type="checkbox" id="a" class="slider" ${(currentSettings.a) ? "checked" : ""}>
        </div>
    </div>
    <hr>
    <div class="row">
        <label class="control-label col-sm-3" for="b">b:</label>
        <div class="col-sm-2">
            <input type="number" step="10" id="b" class="form-control" value="${currentSettings.b}">
        </div>
    </div>
    <hr>
    <div class="row">
        <label class="control-label col-sm-3" for="c">c:</label>
        <div class="col-sm-2">
            <input type="number" step="10" id="c" class="form-control" value="${currentSettings.c}">
        </div>
    </div>`
}
