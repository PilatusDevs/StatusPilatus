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
/* global si plistr $ */
"use strict";

// Storing static data to call libraries less often
// change to let if we add user refresh functionality
let osData = si.osInfo();
let versionData = si.versions();
let userData = si.users();
let programData = plistr.getProgs();
let isRefreshing = false;

function updateAndRefreshData() {
    if (isRefreshing) {
        return;
    }
    document.querySelector("#search-field").value = "";
    searchPrograms();
    isRefreshing = true;
    const refreshButton = document.querySelector("#program-header > span");
    refreshButton.style.color = "#777";
    osData = si.osInfo();
    versionData = si.versions();
    userData = si.users();
    programData = plistr.getProgs();
    insertData();
}

/**
* Called once to initiate the page
*/
function initOs() {
    insertData();
}
function insertData() {
    // Renders OS data once ready
    osData.then(data => {
        $("#subtitle").text(data.distro);
        $("#os-container").html(osHtml(data));
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
    const refreshButton = document.querySelector("#program-header > span");
    programData
        .then(data => {
            $("#loading").remove();
            document.querySelector("#table-head").style.display = "";
            $("#programs-container").html(programHtml(data));
            refreshButton.style.color = "";
            isRefreshing = false;
        })
        .catch(error => {
            $("#loading").remove();
            document.querySelector("#table-head").style.display = "";
            $("#programs-container").html(error);
            refreshButton.style.color = "";
            isRefreshing = false;
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
    tableRows.forEach(row => {
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
