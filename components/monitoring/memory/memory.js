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
/* global $ si Chart formatBytesToMb graphWidth */
"use strict";

const configMemUsage = {
    type: "line",
    data: {
        datasets: [{
            label: "Usage",
            backgroundColor: "#cc576e",
            borderColor: "#cc576e",
            fill: false,
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
                    stepSize : 1,
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

/*
* Build the canvas etc...
* TODO: prettify
*/
function initMemory() {
    si.mem()
        .then(data => {
            $("#subtitle").text(formatBytesToMb(data.total)+"Mb");
            console.log(formatBytesToMb(data.total));
            const ctx = document.getElementById("canvasMemUsage").getContext("2d");
            const max = Math.ceil(formatBytesToMb(data.total)/1024);
            configMemUsage.options.scales.yAxes[0].ticks.max = max;
            window.memUsage = new Chart(ctx, configMemUsage);
        });
}

/*
* Function called by app.js
*/
function refreshMemory() {
    console.log("Memory refresh call");
    refreshMemUsage();
}

/*
* Update the memory usage chart
*/
function refreshMemUsage(){
    console.log("temperature");

    si.mem()
        .then(data => {
            const usageGB = formatBytesToMb(data.active);
            /* update the graph */
            configMemUsage.data.labels.push("");
            configMemUsage.data.datasets.forEach(dataset => {
                dataset.data.push(usageGB[0]);
                /* Delete a value at the beginning of the graph to make it 30 items */
                if (dataset.data.length > graphWidth()) {
                    dataset.data.splice(0, 1);
                    configMemUsage.data.labels.splice(0, 1);
                }
            });
            window.memUsage.update();
        });
}
