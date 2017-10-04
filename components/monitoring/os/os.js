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

/**
* Called once to initiate the page
*/
function initOs() {
    si.osInfo()
    .then(data => {
        $("#subtitle").text(data.distro);
        $("#os-container").append(osHtml(data));
    });
}

/**
* Called from app.js
*/
function refreshOs() {
    console.log("OS refresh call");
}

function osHtml(os) {
    let body = `<div>
    <h3>${os.platform}</h3><br />
    <b>Distro</b>: ${os.distro}<br />
    <b>Codename</b>: ${os.codename}<br />
    <b>Release</b>: ${os.release}<br />
    <b>Kernel</b>: ${os.kernel}<br />
    <b>Hostname</b>: ${os.hostname}<br />
    <b>Architecture</b>: ${os.arch}<br />
    </div>`;
    return body;
}
