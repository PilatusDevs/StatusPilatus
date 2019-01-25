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

const opn = require('opn');

module.exports = {
    init: initAbout,
    refresh: refreshAbout,
    activate: activateAbout
};

function initAbout() {
    $("#version").append("Version " + process.env.npm_package_version);

    const pilatusdevsButton = document.querySelector("#pilatusdevs-button");
    pilatusdevsButton.onclick = () => {
        opn("https://github.com/PilatusDevs");
    };

    const licenseButton = document.querySelector("#license-button");
    licenseButton.onclick = () => {
        opn("https://github.com/PilatusDevs/StatusPilatus/blob/master/LICENSE");
    };
}

function refreshAbout() {

}

function activateAbout() {

}
