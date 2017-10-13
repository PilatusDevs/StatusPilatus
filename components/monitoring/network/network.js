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

var currentAdapter = null;

/*
* Config for the usage chart
*/
var configNetworkDownUsage = {
    type: "line",
    data: {
        datasets: [{
            label: "Download (MB/sec)",
            backgroundColor: "#a4cc99",
            borderColor: "#a4cc99",
            fill: false,
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

var configNetworkUpUsage = {
    type: "line",
    data: {
        datasets: [{
            label: "Upload (MB/sec)",
            backgroundColor: "#a4cc99",
            borderColor: "#a4cc99",
            fill: false,
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

/**
* Called once to initiate the page
*/
function initNetwork() {
    initAdapters();
    initPing();

    /* make the chart */
    var ctx = document.getElementById("canvasNetworkDownUsage").getContext("2d");
    window.networkDownUsage = new Chart(ctx, configNetworkDownUsage);

    /* make the chart */
    var ctx1 = document.getElementById("canvasNetworkUpUsage").getContext("2d");
    window.networkUpUsage = new Chart(ctx1, configNetworkUpUsage);
}

/**
* Called from app.js
*/
function refreshNetwork() {
    refreshNetworkUsage();
}

function initPing() {
  console.log("Init Ping");
  // si.inetLatency((data) => {
  //     console.log(data);
  // });
}

function adapterHtml(adapter) {
    let body = `<div class="col-sm-6">
    <h3>${adapter.iface}</h3><br />
    <b>IPv4</b>: ${adapter.ip4}<br />
    <b>IPv6</b>: ${adapter.ip6}<br />
    <b>MAC</b>: ${adapter.mac}<br />
    </div>`
    return body;
}

/**
* This function is called from initNetwork()
* so all the adapters are listed on the page
*/
function initAdapters() {
    $("#adapters").html = "";
    si.networkInterfaces((data) => {
        data.forEach(adapter => {
            if (adapter.internal == false) {
                if (!currentAdapter) {
                    currentAdapter = adapter.iface;
                }
                $("#adapters").append(adapterHtml(adapter));
                $("#networkAdapterSelect").append("<option value='"+adapter.iface+"'>"+adapter.iface+"</option>");
            }
        });
    });
}

/**
* When the used selects another network adapter this function is used to
* set the new currentAdapter variable and delete all the current data from
* the graph.
*/
function changeNetworkAdapter(){
    var e = document.getElementById("networkAdapterSelect");
    currentAdapter = e.options[e.selectedIndex].value;
    window.networkDownUsage.destroy();
    window.networkUpUsage.destroy();
    configNetworkDownUsage.data = {datasets: [{label: "Usage down (Mb/sec)",backgroundColor: "#a4cc99",borderColor: "#a4cc99",fill: false,}]};
    configNetworkUpUsage.data = {datasets: [{label: "Usage up (Mb/sec)",backgroundColor: "#a4cc99",borderColor: "#a4cc99",fill: false,}]};
    var ctx1 = document.getElementById("canvasNetworkDownUsage").getContext("2d");
    window.networkDownUsage = new Chart(ctx1, configNetworkDownUsage);
    var ctx2 = document.getElementById("canvasNetworkUpUsage").getContext("2d");
    window.networkUpUsage = new Chart(ctx2, configNetworkUpUsage);
}

/**
* Refresh the network usage for the chosen adapter.
*/
function refreshNetworkUsage() {
    si.networkStats(currentAdapter)
    .then((data) => {
        /* convert the bytes to Mb */
        var downUsage = ((data.rx_sec / (1024*1024)).toFixed(2));
        var upUsage = ((data.tx_sec / (1024*1024)).toFixed(2));
        console.log(data);
        /* update the graph - usage*/
        configNetworkDownUsage.data.labels.push("");
        configNetworkDownUsage.data.datasets[0].data.push(downUsage);
        if (configNetworkDownUsage.data.datasets[0].data.length > graphWidth()) {
            configNetworkDownUsage.data.datasets[0].data.splice(0, 1);
            configNetworkDownUsage.data.labels.splice(0, 1);
        }
        window.networkDownUsage.update();

        configNetworkUpUsage.data.labels.push("");
        configNetworkUpUsage.data.datasets[0].data.push(upUsage);
        if (configNetworkUpUsage.data.datasets[0].data.length > graphWidth()) {
            configNetworkUpUsage.data.datasets[0].data.splice(0, 1);
            configNetworkUpUsage.data.labels.splice(0, 1);
        }
        window.networkUpUsage.update();
    });
}
