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

function getPrograms() {
    let html = "standard getPrograms() return value";
    /* Determine the os */
    if (/^win/.test(process.platform)) {
        console.log("Windows");
        html = getWindowsPrograms();
        console.log(html);
    } else if (/^darwin/.test(process.platform)) {
        console.log("MacOS");
    } else {
        console.log("Linux");
        return getLinuxPrograms();
    }
    return html;
}

function getWindowsPrograms() {
    let html = "standard getWindowsPrograms() return value";

    plistr.getProgs()
    .then((data) => {
        data.forEach((program) => {
            html += `<tr><td>${program.name}</td><td>${program.version}</td></tr>`;
        });
        $("#loading").remove();
        document.querySelector("#table-head").style.display = "";
        $("#programs-container").html(html);
    });
    return html;
}

function getLinuxPrograms() {
    const exec = require('child_process').exec;
    var path = require('path');
    var parentDir = path.resolve(process.cwd(), '..');
    let html = "standard getLinuxPrograms() return value";

    exec( parentDir + '/StatusPilatus/scripts/programs.sh',
    function (error, stdout, stderr) {
        let tableElements = stdout.split("\n");
        tableElements.forEach((element) => {
            html += `<tr><td>${element}</td></tr>`;
        });
        $("#loading").remove();
        document.querySelector("#table-head").style.display = "";
        $("#programs-container").html(html);
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
}
