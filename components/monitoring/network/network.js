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

/**
* Called once to initiate the page
*/
function initNetwork() {
    initAdapters();

    /* make the chart */
    var ctx = document.getElementById("canvasNetworkUsage").getContext("2d");
    window.networkUsage = new Chart(ctx, configNetworkUsage);
}

/**
* Called from app.js
*/
function refreshNetwork() {
    refreshNetworkUsage();
}

function adapterHtml(adapter) {
    let body = `<div>
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
    si.networkInterfaces(data => {
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
    window.networkUsage.destroy();
    configNetworkUsage.data = {datasets: [{label: "Usage down (Mb/sec)",backgroundColor: "#a4cc99",borderColor: "#a4cc99",fill: false,}]};
    var ctx = document.getElementById("canvasNetworkUsage").getContext("2d");
    window.networkUsage = new Chart(ctx, configNetworkUsage);
}

/**
* Refresh the network usage for the chosen adapter.
*/
function refreshNetworkUsage() {
    si.networkStats(currentAdapter)
    .then(data => {
        /* convert the bytes to Mb */
        var usage = ((data.rx_sec / (1024*1024)).toFixed(2));
        console.log(data);
        /* update the graph - usage*/
        configNetworkUsage.data.labels.push("");
        configNetworkUsage.data.datasets[0].data.push(usage);
        if (configNetworkUsage.data.datasets[0].data.length > graph_width()) {
            configNetworkUsage.data.datasets[0].data.splice(0, 1);
            configNetworkUsage.data.labels.splice(0, 1);
        }
        window.networkUsage.update();
    });
}

/*
* Config for the usage chart
*/
var configNetworkUsage = {
    type: 'line',
    data: {
        datasets: [{
            label: "Usage down (Mb/sec)",
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
                    labelString: 'Usage'
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
                    labelString: 'Value'
                }
            }]
        }
    }
};
