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

module.exports = {
    init: initOs,
    refresh: refreshOs,
    activate: activateOs
};

// Storing static data to call libraries less often
let osData = si.osInfo();
let versionData = si.versions();
let userData = si.users();
let programData = plistr.getProgs();
let isLoading = true;

function refreshData() {
    if (isLoading) {
        return;
    }
    document.querySelector("#search-field").value = "";
    searchPrograms();
    isLoading = true;
    const refreshButton = document.querySelector("#os-program-refresh-button");
    refreshButton.style.color = "";
    refreshButton.style.animation = "";
    refreshButton.style.cursor = "";
    document.querySelector("#table-head").style.display = "none";
    $("#programs-container").empty();
    $("#loading").show();
    osData = si.osInfo();
    versionData = si.versions();
    userData = si.users();
    programData = plistr.getProgs();
    insertData();
}

function initOs() {
    insertData();
    const refreshButton = document.querySelector("#os-program-refresh-button");
    refreshButton.onclick = () => {
        refreshData();
    };
    const searchField = document.querySelector("#search-field");
    searchField.onkeyup = () => {
        searchPrograms();
    };
}

function insertData() {
    // Renders OS data once ready
    osData.then(data => {
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
    const refreshButton = document.querySelector("#os-program-refresh-button");
    programData
        .then(data => {
            $("#loading").hide();
            document.querySelector("#table-head").style.display = "";
            $("#programs-container").html(programHtml(data));
            refreshButton.style.color = "#000";
            refreshButton.style.animation = "none";
            refreshButton.style.cursor = "pointer";
            isLoading = false;
        })
        .catch(error => {
            $("#loading").hide();
            document.querySelector("#table-head").style.display = "";
            $("#programs-container").html(error);
            refreshButton.style.color = "#000";
            refreshButton.style.animation = "none";
            refreshButton.style.cursor = "pointer";
            isLoading = false;
        });
}

function activateOs() {
    osData.then(data => {
        $("#subtitle").text(data.distro);
    });
}

function refreshOs() {
    // Nothing
}

function osHtml(os) {
    const body = `<span class="card-title">${os.platform}</span>
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
