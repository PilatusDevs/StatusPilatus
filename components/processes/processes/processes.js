/*
*    StatusPilatus: Monitor your PC like never before!
*    Copyright (C) 2019 PilatusDevs
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
/* global util si */
"use strict";

module.exports = {
    init: initProcesses,
    refresh: refreshProcesses,
    activate: activateProcesses
};


function initProcesses(){
    const refreshButton = document.querySelector("#processes-refresh-button");
    refreshButton.onclick = () => {
        loadCpuProcesses();
    };
    loadCpuProcesses();
}

function refreshProcesses() {
}

function activateProcesses() {

}

function loadCpuProcesses(){
    const refreshButton = document.querySelector("#processes-refresh-button");
    refreshButton.style.color = "";
    refreshButton.style.animation = "";
    refreshButton.style.cursor = "";
    util.sleep(2000).then(() => {
    // Do something after the sleep!
        si.processes()
            .then(data => {
                document.getElementById("processes-container").innerHTML = "";
                for (let i = 0; i < data.list.length; i++) {
                    document.getElementById("processes-container").innerHTML += `
                  <tr>
                    <td>${data.list[i].name}</td>
                    <td>${data.list[i].pcpu.toFixed(4)}</td>
                    <td>${data.list[i].pmem.toFixed(4)}</td>
                    <td>${data.list[i].pid}</td>
                  </tr>`;
                }
            });
        refreshButton.style.color = "#000";
        refreshButton.style.animation = "none";
        refreshButton.style.cursor = "pointer";
    });
}
