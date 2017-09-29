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
var speedmin = 0;
var speedmax = 0;
var speed = 0;

/* set the config for the graph */
var config = {
    type: 'line',
    data: {
        //labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "Usage",
            backgroundColor: "#f38b4a",
            borderColor: "#f38b4a",
            data: [
                      0,
                      0,
                      0,
                      0,
                   ],
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
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
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
    console.log("initCpu");
    var ctx = document.getElementById("canvas").getContext("2d");
    window.myLine = new Chart(ctx, config);
}

/**
* Called in a loop in app.js
*/
function refreshCpu() {
    console.log("CPU refresh");
    refreshCpuUsage();
}

/**
* Update the chart
*/
function refreshCpuUsage() {
    /* get the cpu information */
    si.cpu(function(data) {
        speedmin = data.speedmin;
        speedmax = data.speedmax;
        console.log(data);
    })

    si.cpuCurrentspeed(function(data) {
        speed = data.avg;
    })

    /* calculate it */
    var usage = (speed - speedmin) / (speedmax - speedmin) * 100;
    console.log(parseInt(usage));

    /* update the graph */
    config.data.labels.push("");
    config.data.datasets.forEach(function(dataset) {
        dataset.data.push(parseInt(usage));
    });
     window.myLine.update();
    // $("#cpuUsage").text(parseInt(usage) + "%");
    // $("#cpuUsage").css( "width", parseInt(usage)+"%" );

}
