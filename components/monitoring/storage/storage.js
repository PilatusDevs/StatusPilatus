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
/* global Chart $ si settings util */
"use strict";

module.exports = {
    init: initStorage,
    refresh: refreshStorage,
    activate: activateStorage
};

// Storing static data to call libraries less often
let driveSizes = si.fsSize();
let driveTypes = si.blockDevices();
// TODO: test if indices always match up
let isLoading = true;

/*
* Config for the usage chart
*/
const configDiskUsage = {
    type: "line",
    data: {
        datasets: [{
            label: "Total disk usage (Mb/sec)",
            backgroundColor: "#c1cc66",
            borderColor: "#c1cc66",
            fill: false
        }]
    },
    options: {
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: "Usage"
                }
            }],
            yAxes: [{
                ticks:{
                    suggestedMin: 0,
                    beginAtZero: true
                },
                display: true,
                scaleLabel: {
                    display: false,
                    labelString: "Value"
                }
            }]
        }
    }
};

function refreshData() {
    if (isLoading) {
        return;
    }
    isLoading = true;
    const refreshButton = document.querySelector("#storage-devices-refresh-button");
    refreshButton.style.color = "";
    refreshButton.style.animation = "";
    refreshButton.style.cursor = "";
    $("#storage-bars").empty();
    driveSizes = si.fsSize();
    driveTypes = si.blockDevices();
    insertData();
}

function initStorage() {
    insertData();
    const refreshButton = document.querySelector("#storage-devices-refresh-button");
    refreshButton.onclick = () => {
        refreshData();
    };
    /* make the chart */
    const ctx1 = document.getElementById("canvasDiskUsage").getContext("2d");
    window.diskUsage = new Chart(ctx1, configDiskUsage);
}

function activateStorage() {
    // Nothing
}

function refreshStorage() {
    updateDiskUsage();
}

function updateDiskUsage(){
    si.fsStats()
        .then(data => {
            const usageMb = util.formatBytesToMb(data.tx_sec);
            /* update the graph */
            configDiskUsage.data.labels.push("");
            configDiskUsage.data.datasets.forEach(dataset => {
                dataset.data.push(usageMb);
                while (dataset.data.length > settings.graphs.width) {
                    dataset.data.splice(0, 1);
                    configDiskUsage.data.labels.splice(0, 1);
                }
            });
            window.diskUsage.update();
        })
        .catch(() => {});
}

function insertData() {
    // Renders drive data once ready
    const refreshButton = document.querySelector("#storage-devices-refresh-button");
    Promise.all([driveSizes, driveTypes]).then(data => {
        $("#storage-bars").html(driveHtml(...data));
        refreshButton.style.color = "#000";
        refreshButton.style.animation = "none";
        refreshButton.style.cursor = "pointer";
        isLoading = false;
    });
}

function driveHtml(sizes, types) {
    let body = "";
    sizes.forEach((drive, index) => {
        const hasData = drive.size !== undefined;
        const size = util.formatSize(drive.size);
        const used = util.formatSize(drive.size - drive.used);
        const type = types[index].physical;
        body += `<h3>Disk ${drive.mount} (${type})<small> `;
        if (!hasData) {
            body += `No media found</small></h3>`;
        } else {
            body += `${used[0].toFixed(2)+used[1]} free of
            ${size[0].toFixed(2)+size[1]}</small></h3>`;
            let status;
            if (drive.use < 60){
                status = "progress-bar-success";
            } else if (drive.use > 60 && drive.use < 90){
                status = "progress-bar-warning";
            } else {
                status = "progress-bar-danger";
            }
            body += `<div class="progress">
                <div class="progress-bar ${status} role="progressbar"
                aria-valuenow="${drive.use}" aria-valuemin="0"
                aria-valuemax="100" style="width: ${drive.use}%">
                    ${parseInt(drive.use)}%
                </div>
            </div>`;
        }
    });
    return body;
}
