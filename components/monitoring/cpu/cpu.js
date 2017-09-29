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

/* set the config for the graph */
var configUsage = {
    type: 'line',
    data: {
        //labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "Usage",
            backgroundColor: "#f38b4a",
            borderColor: "#f38b4a",
            //data: [],
            fill: false,
        }]
    },
    options: {
        responsive: true,
        title:{
            display:false,
            text:'Chart.js Line Chart'
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
                    max : 100,
                    stepSize : 10,
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

var configTemperature = {
    type: 'line',
    data: {
        //labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "temperature",
            backgroundColor: "#f38b4a",
            borderColor: "#f38b4a",
            //data: [],
            fill: false,
        }]
    },
    options: {
        responsive: true,
        title:{
            display:false,
            text:'Chart.js Line Chart'
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
                    max : 100,
                    stepSize : 10,
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

/**
* Called when someone clicks cpu in the sidebar
*/
function initCpu() {
    si.cpu()
    .then(data => {
        $("#subtitle").text(data.manufacturer+" "+data.brand)
    });
    console.log("initCpu");
    var ctx = document.getElementById("canvasUsage").getContext("2d");
    window.usage = new Chart(ctx, configUsage);

    var ctx = document.getElementById("canvasTemperature").getContext("2d");
    window.temperature = new Chart(ctx, configTemperature);
}

/**
* Called in a loop in app.js
*/
function refreshCpu() {
    console.log("CPU refresh");
    refreshCpuUsage();
    refreshTemperature();
}

function refreshTemperature(){
    console.log("temperature");
    var temperature;

    si.cpuTemperature()
    .then(data => {
        temperature = data.main;

        console.log(data);
        /* update the graph */
        configTemperature.data.labels.push("");
        configTemperature.data.datasets.forEach(function(dataset) {
            dataset.data.push(parseInt(temperature));
            if (dataset.data.length > 31) {
                dataset.data.splice(0, 1);
                configTemperature.data.labels.splice(0, 1);
            }
        });
        window.temperature.update();

    });
}

/**
* Update the cpu temperature chart
*/
function refreshCpuUsage() {
    /* get the cpu information */
    var usage;

    si.currentLoad()
    .then(data => {
        usage = data.currentload;

        /* update the graph */
        configUsage.data.labels.push("");
        configUsage.data.datasets.forEach(function(dataset) {
            dataset.data.push(parseInt(usage));
            if (dataset.data.length > 31) {
                dataset.data.splice(0, 1);
                configUsage.data.labels.splice(0, 1);
            }
        });
        window.usage.update();

    });

}
