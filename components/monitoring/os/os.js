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
"use strict";

// Storing static data to call libraries less often
// change to let if we add user refresh functionality
const osData = si.osInfo();
const versionData = si.versions();
const userData = si.users();
const programData = plistr.getProgs();

/**
* Called once to initiate the page
*/
function initOs() {
    // Renders OS data once ready
    osData.then(data => {
        $("#subtitle").text(data.distro);
        $("#os-container").append(osHtml(data));
    });
    // Renders version data once ready
    versionData.then(data => {
        $("#versions-container").html(versionHtml(data));
    });
    // Renders user data once ready
    userData.then(data => {
        $("#user-container").html(userHtml(data));
    });
    // Renders program data once ready
    programData
        .then(data => {
            $("#loading").remove();
            document.querySelector("#table-head").style.display = "";
            $("#programs-container").html(programHtml(data));
        })
        .catch(error => {
            $("#loading").remove();
            document.querySelector("#table-head").style.display = "";
            $("#programs-container").html(error);
        });
}

/**
* Called from app.js
*/
function refreshOs() {
    console.log("OS refresh call");
}

function osHtml(os) {
    const body = `<h3>${os.platform}</h3><br />
    <b>Distro</b>: ${os.distro}<br />
    <b>Codename</b>: ${os.codename}<br />
    <b>Release</b>: ${os.release}<br />
    <b>Kernel</b>: ${os.kernel}<br />
    <b>Hostname</b>: ${os.hostname}<br />
    <b>Architecture</b>: ${os.arch}<br />`;
    return body;
}

function versionHtml(versions) {
    const body = `<b>Git</b>: ${versions.git}<br />
    <b>Grunt</b>: ${versions.grunt}<br />
    <b>Gulp</b>: ${versions.gulp}<br />
    <b>Node</b>: ${versions.node}<br />
    <b>npm</b>: ${versions.npm}<br />
    <b>OpenSSL</b>: ${versions.openssl}<br />
    <b>PM2</b>: ${versions.pm2}<br />
    <b>TypeScript</b>: ${versions.tsc}<br />
    <b>V8</b>: ${versions.v8}<br />
    <b>Yarn</b>: ${versions.yarn}<br />`;
    return body;
}

function userHtml(users) {
    let body = "";
    users.forEach(user => {
        body += `<b>${user.user}</b><br />`;
    });
    return body;
}

function programHtml(programs) {
    let body = "";
    programs.forEach(program => {
        body += `<tr><td>${program.name}</td><td>${program.version}</td></tr>`;
    });
    return body;
}

function searchPrograms() {
    const query = document.querySelector("#search-field").value.toUpperCase();
    const tableRows = document.querySelectorAll("#programs-container tr");
    tableRows.forEach((row, index) => {
        const td = row.querySelector("td");
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(query) > -1) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        }
    });
}
