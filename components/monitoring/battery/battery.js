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
/* global si $ Chart settings */
"use strict";

const graphs = [{
    elementId: "canvas-battery-percentage",
    name: "Battery Percentage",
    isPinned: true,
    togglePin() { this.isPinned = !this.isPinned; },
    chart: {},
    config: {
        type: "line",
        data: {
            datasets: [{
                label: "Percentage",
                backgroundColor: "#588fad",
                borderColor: "#588fad",
                fill: false
            }]
        },
        options: {
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    ticks:{
                        min : 0,
                        max : 100,
                        stepSize : 10
                    },
                    display: true,
                    scaleLabel: {
                        display: false,
                        labelString: "Value"
                    }
                }]
            }
        }
    },
    init(element) {
        const cvs = element
            ? element.querySelector(`.${this.elementId}`)
            : document.getElementById(this.elementId);
        this.chart = new Chart(cvs.getContext("2d"), this.config);
    },
    render() {
        si.battery()
            .then(data => {
                const percentage = data.percent;
                /* update the graph */
                this.config.data.labels.push("");
                this.config.data.datasets.forEach(dataset => {
                    dataset.data.push(parseInt(percentage));
                    while (dataset.data.length > settings.graphs.width) {
                        dataset.data.splice(0, 1);
                        this.config.data.labels.splice(0, 1);
                    }
                });
                this.chart.update();
            });
    }
}];

module.exports = {
    init: initBattery,
    refresh: refreshBattery,
    activate: activateBattery,
    graphs
};

let loading = false;

function initBattery() {
    si.battery()
        .then(data => {
            if (data.hasbattery) {
                $("#batteryRow").show();
            } else {
                $("#noBatteryText").show();
            }
        })
        .catch(error => console.error(error));

    graphs.forEach(graph => {
        graph.init();
    });
}

function refreshBattery() {
    graphs.forEach(graph => {
        graph.render();
    });
    showBatteryInfo();
}

function activateBattery() {
    if (loading) {
        return;
    }
    loading = true;
    document.getElementById("battery-info").innerHTML = "";

    showBatteryInfo();
}

function showBatteryInfo() {
    si.battery()
        .then(data => {
            const text = `
                <b>Charging</b>: ${data.ischarging ? "Yes" : "No"} </br>
                <b>Percentage</b>: ${data.percent}% </br>
                <b>Manufacturer</b>: ${data.manufacturer || "unknown"} </br>
                <b>Model</b>: ${data.model || "unknown"} </br>
                <b>Type</b>: ${data.type || "unknown"} </br>
                <b>Max Capacity</b>: ${data.maxcapacity || "unknown"} </br>
                <b>Current Capacity</b>: ${data.currentcapacity || "unknown"}
            `;
            $("#battery-info").html(text);

            loading = false;
        });
}
