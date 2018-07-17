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
/* global $ si Chart settings util */
"use strict";

module.exports = {
    init: initMemory,
    refresh: refreshMemory,
    activate: activateMemory
};

const configMemUsage = {
    type: "line",
    data: {
        datasets: [{
            label: "Usage",
            backgroundColor: "#cc576e",
            borderColor: "#cc576e",
            fill: false
        }]
    },
    options: {
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: "Time"
                }
            }],
            yAxes: [{
                ticks:{
                    min : 0,
                    stepSize : 1
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

function initMemory() {
    si.mem()
        .then(data => {
            const ctx = document.getElementById("canvasMemUsage").getContext("2d");
            const max = Math.ceil(util.formatBytesToMb(data.total)/1024);
            configMemUsage.options.scales.yAxes[0].ticks.max = max;
            window.memUsage = new Chart(ctx, configMemUsage);
        });
}

function activateMemory() {
    si.mem()
        .then(data => {
            $("#subtitle").text(util.formatBytesToMb(data.total)+"Mb");
        });
}

function refreshMemory() {
    refreshMemUsage();
}

function refreshMemUsage(){
    si.mem()
        .then(data => {
            const usageGB = util.formatBytesToMb(data.active);
            /* update the graph */
            configMemUsage.data.labels.push("");
            configMemUsage.data.datasets.forEach(dataset => {
                dataset.data.push(usageGB / 1024);
                while (dataset.data.length > settings.graphs.width) {
                    dataset.data.splice(0, 1);
                    configMemUsage.data.labels.splice(0, 1);
                }
            });
            window.memUsage.update();
        });
}
