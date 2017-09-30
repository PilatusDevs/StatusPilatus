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

/**
* Called when someone clicks cpu in the sidebar
*/
function initCpu() {
    si.cpu()
    .then(data => {
        $("#subtitle").text(data.manufacturer+" "+data.brand)
    });
    console.log("initCpu");
    var ctx = document.getElementById("canvasCpuUsage").getContext("2d");
    window.cpuUsage = new Chart(ctx, configUsage);

    var ctx = document.getElementById("canvasCpuTemperature").getContext("2d");
    window.cpuTemperature = new Chart(ctx, configTemperature);
}

/**
* Called in a loop in app.js
*/
function refreshCpu() {
    console.log("CPU refresh");
    refreshCpuUsage();
    refreshCpuTemperature();
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
            /* Delete a value at the beginning of the graph to make it 30 items */
            if (dataset.data.length > 31) {
                dataset.data.splice(0, 1);
                configUsage.data.labels.splice(0, 1);
            }
        });
        window.cpuUsage.update();
    });
}

/*
* Update the cpu Temperature chart
* TODO: On windows the temperature aint right
*/
function refreshCpuTemperature(){
    console.log("temperature");
    var temperature;

    si.cpuTemperature()
    .then(data => {
        temperature = data.max;

        console.log(data);
        /* update the graph */
        configTemperature.data.labels.push("");
        configTemperature.data.datasets.forEach(function(dataset) {
            dataset.data.push(parseInt(temperature));
            /* Delete a value at the beginning of the graph to make it 30 items */
            if (dataset.data.length > 31) {
                dataset.data.splice(0, 1);
                configTemperature.data.labels.splice(0, 1);
            }
        });
        window.cpuTemperature.update();
    });
}

/*
* Config for the Usage chart
*/
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

/*
* Config for the Temperature chart
*/
var configTemperature = {
    type: 'line',
    data: {
        //labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "Temperature",
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
