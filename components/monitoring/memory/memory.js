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

var configMemUsage = {};

/*
* Build the canvas etc...
* TODO: prettify
*/
function initMemory() {
    si.mem()
    .then(data => {
        $("#subtitle").text(formatSize(data.total)[0].toFixed(2)+"GB")
        console.log(formatSize(data.total)[0]);
        /*
        * Config for the Usage chart
        */
        configMemUsage = {
            type: 'line',
            data: {
                datasets: [{
                    label: "Usage",
                    backgroundColor: "#cc576e",
                    borderColor: "#cc576e",
                    fill: false,
                }]
            },
            options: {
                responsive: true,
                title:{
                    display:false,
                },
                tooltips: {
                    enabled: false
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Time'
                        }
                    }],
                    yAxes: [{
                        ticks:{
                            min : 0,
                            max : Math.ceil(formatSize(data.total)[0]),
                            stepSize : 1,
                        },
                        display: true,
                        scaleLabel: {
                            display: false,
                            labelString: 'Value'
                        }
                    }]
                }
            }
        };

        var ctx = document.getElementById("canvasMemUsage").getContext("2d");
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
        var usageGB = formatSize(data.active);
        /* update the graph */
        configMemUsage.data.labels.push("");
        configMemUsage.data.datasets.forEach(function(dataset) {
            dataset.data.push(usageGB[0]);
            /* Delete a value at the beginning of the graph to make it 30 items */
            if (dataset.data.length > 31) {
                dataset.data.splice(0, 1);
                configMemUsage.data.labels.splice(0, 1);
            }
        });
        window.memUsage.update();
    });
}

/*
* Used to go from kb to GB
*/
var sizes = ["bytes", "KB", "MB", "GB", "TB"];
function formatSize(bytes) {
    var l = Math.min(sizes.length - 1, Math.log(bytes) / Math.LN2 / 10 | 0);
    return [bytes / Math.pow(1024, l), sizes[l]];
}
