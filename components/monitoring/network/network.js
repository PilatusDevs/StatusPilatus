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
/* global settings $ si Chart util */
"use strict";

module.exports = {
    init: initNetwork,
    refresh: refreshNetwork,
    activate: activateNetwork,
    changeAdapter: changeNetworkAdapter
};

let currentAdapter = null;

/*
* Config for the usage chart
*/
const configNetworkDownUsage = {
    type: "line",
    data: {
        datasets: [{
            label: "Download (MB/sec)",
            backgroundColor: "#a4cc99",
            borderColor: "#a4cc99",
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

const configNetworkUpUsage = {
    type: "line",
    data: {
        datasets: [{
            label: "Upload (MB/sec)",
            backgroundColor: "#a4cc99",
            borderColor: "#a4cc99",
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

function initNetwork() {
    startAdapters();

    /* make the chart */
    const ctx = document.getElementById("canvasNetworkDownUsage").getContext("2d");
    window.networkDownUsage = new Chart(ctx, configNetworkDownUsage);

    /* make the chart */
    const ctx1 = document.getElementById("canvasNetworkUpUsage").getContext("2d");
    window.networkUpUsage = new Chart(ctx1, configNetworkUpUsage);

    const pingButton = document.querySelector("#pingButton");
    pingButton.onclick = () => {
        doAPing();
    };

    const clearButton = document.querySelector("#clearButton");
    clearButton.onclick = () => {
        $("#ping-well").text("");
        $("#ping-well").hide();
    };
}

function activateNetwork() {
    // Nothing
}

function refreshNetwork() {
    updateNetworkUsage();
    checkConnectivity();
}

function checkConnectivity(){
    si.inetChecksite('https://google.com')
	.then(data => {
        console.log(data);
		if (data.ms == -1) {
            $("#internet-connected").hide();
            $("#internet-disconnected").show();
        } else {
            $("#internet-connected").show();
            $("#internet-disconnected").hide();
        }
	})
	.catch(error => console.error(error));
}

function doAPing() {
    $("#ping-well").show();
    $("#clearButton").show();
    $("#pingButton").prop('disabled', true);
    for (var i = 0; i < 4; i++) {
        sleep(1000).then(() => {
            si.inetLatency((data) => {
                $("#ping-well").append(data + "<br>");
            });
        });
    }

    $("#pingButton").prop('disabled', false);
}

function adapterHtml(adapter) {
    const body = `<div class="col-sm-6 col-md-3">
    <div class="panel-group">
        <div class="panel panel-default">
            <div class="panel-heading">
                <h4 class="panel-title">
                    ${adapter.iface}
                </h4>
            </div>
            <div class="panel-collapse in">
                <div class="panel-body" id="cpu-flags">
                    <b>IPv4</b>: ${adapter.ip4}<br />
                    <b>IPv6</b>: ${adapter.ip6}<br />
                    <b>MAC</b>: ${adapter.mac}<br />
                </div>
            </div>
        </div>
    </div>
    </div>`;
    return body;
}

/*
* Take a break
*/
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
* This function is called from initNetwork()
* so all the adapters are listed on the page
*/
function startAdapters() {
    $("#adapters").html = "";
    si.networkInterfaces(data => {
        data.forEach(adapter => {
            if (adapter.internal === false) {
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
    const e = document.getElementById("networkAdapterSelect");
    currentAdapter = e.options[e.selectedIndex].value;
    window.networkDownUsage.destroy();
    window.networkUpUsage.destroy();
    configNetworkDownUsage.data = {
        datasets: [
            {
                label: "Usage down (Mb/sec)",
                backgroundColor: "#a4cc99",
                borderColor: "#a4cc99",
                fill: false
            }
        ]
    };
    configNetworkUpUsage.data = {
        datasets: [
            {
                label: "Usage up (Mb/sec)",
                backgroundColor: "#a4cc99",
                borderColor: "#a4cc99",
                fill: false
            }
        ]
    };
    const ctx1 = document.getElementById("canvasNetworkDownUsage")
        .getContext("2d");
    window.networkDownUsage = new Chart(ctx1, configNetworkDownUsage);
    const ctx2 = document.getElementById("canvasNetworkUpUsage")
        .getContext("2d");
    window.networkUpUsage = new Chart(ctx2, configNetworkUpUsage);
}

/**
* Update the network usage for the chosen adapter.
*/
function updateNetworkUsage() {
    si.networkStats(currentAdapter)
        .then(data => {
            /* convert the bytes to Mb */
            const downUsage = util.formatBytesToMb(data.rx_sec);
            const upUsage = util.formatBytesToMb(data.tx_sec);
            /* update the graph - usage*/
            configNetworkDownUsage.data.labels.push("");
            configNetworkDownUsage.data.datasets[0].data.push(downUsage);
            while (configNetworkDownUsage.data.datasets[0].data.length > settings.graphs.width) {
                configNetworkDownUsage.data.datasets[0].data.splice(0, 1);
                configNetworkDownUsage.data.labels.splice(0, 1);
            }
            window.networkDownUsage.update();

            configNetworkUpUsage.data.labels.push("");
            configNetworkUpUsage.data.datasets[0].data.push(upUsage);
            while (configNetworkUpUsage.data.datasets[0].data.length > settings.graphs.width) {
                configNetworkUpUsage.data.datasets[0].data.splice(0, 1);
                configNetworkUpUsage.data.labels.splice(0, 1);
            }
            window.networkUpUsage.update();
        });
}
