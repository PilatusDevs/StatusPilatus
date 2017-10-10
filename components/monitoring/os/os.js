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

// Storing static data to call si library less often
var osData = {};
var versionData = {};
var userData = [];
var programData = "";
/**
* Called once to initiate the page
*/
function initOs() {
    // Loads OS data
    if ($.isEmptyObject(osData)) {
        si.osInfo()
        .then((data) => {
            osData = data;
            $("#subtitle").text(osData.distro);
            $("#os-container").append(osHtml(osData));
        });
    }else{
        $("#subtitle").text(osData.distro);
        $("#os-container").append(osHtml(osData));
    }
    // Loads version data
    if ($.isEmptyObject(versionData)) {
        si.versions()
        .then((data) => {
            versionData = data;
            $("#versions-container").html(versionsHtml(versionData));
        });
    }else{
        $("#versions-container").html(versionsHtml(versionData));
    }
    // Loads user data
    if (userData.length === 0) {
        si.users()
        .then((data) => {
            userData = data;
            $("#user-container").html(userHtml(userData));
        });
    }else{
        $("#user-container").html(userHtml(userData));
    }

    console.warn("CALLING GETPROGRAMS");
    programData = getPrograms();
    console.warn("programData value: "+programData);
}

/**
* Called from app.js
*/
function refreshOs() {
    console.log("OS refresh call");
}

function osHtml(os) {
    let body = `<h3>${os.platform}</h3><br />
    <b>Distro</b>: ${os.distro}<br />
    <b>Codename</b>: ${os.codename}<br />
    <b>Release</b>: ${os.release}<br />
    <b>Kernel</b>: ${os.kernel}<br />
    <b>Hostname</b>: ${os.hostname}<br />
    <b>Architecture</b>: ${os.arch}<br />`;
    return body;
}

function versionsHtml(versions) {
    let body = `<b>Git</b>: ${versions.git}<br />
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
    users.forEach((user) => {
        body += `<b>${user.user}</b><br />`;
    });
    return body;
}

function searchPrograms() {
    let query = document.querySelector("#search-field").value.toUpperCase();
    let tableRows = document.querySelectorAll("#programs-container tr");
    tableRows.forEach((row, index) => {
        let td = row.querySelector("td");
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(query) > -1) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        }
    });
}
