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

var currentAdapter = "";

function adapterHtml(adapter) {
    var body = "<div>";
    body += `<h3>${adapter.iface}</h3><br />`;
    body += `<b>IPv4</b>: ${adapter.ip4}<br />`;
    body += `<b>IPv6</b>: ${adapter.ip6}<br />`;
    body += `<b>MAC</b>: ${adapter.mac}<br />`;
    body += `</div>`;
    return body;
}

function refreshAdapters() {
    $("#adapters").html = "";
    si.networkInterfaces(function(data) {
        currentAdapter = data[0].iface;
        data.forEach(function(adapter) {
            if (adapter.internal == false) {
                $("#adapters").append(adapterHtml(adapter));
                $("#networkAdapterSelect").append("<option value='"+adapter.iface+"'>"+adapter.iface+"</option>");
            }
        });
    });

    var ctx = document.getElementById("canvasNetworkUsage").getContext("2d");
    window.networkUsage = new Chart(ctx, configNetworkUsage);
}

function initNetwork() {
    refreshAdapters();

}

function refreshNetwork() {
    refreshNetworkUsage();
}

function changeNetworkAdapter(){
    var e = document.getElementById("networkAdapterSelect");
    currentAdapter = e.options[e.selectedIndex].value;
    window.networkUsage.destroy();
    configNetworkUsage.data = {datasets: [{label: "Usage down (Mb/sec)",backgroundColor: "#a4cc99",borderColor: "#a4cc99",fill: false,}]};
    var ctx = document.getElementById("canvasNetworkUsage").getContext("2d");
    window.networkUsage = new Chart(ctx, configNetworkUsage);
}

function refreshNetworkUsage() {
    var usage;

    si.networkStats(currentAdapter)
    .then(data => {
        usage = ((data.rx_sec / (1024*1024)).toFixed(2));
        console.log(usage);
        /* update the graph - average*/
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
* Config for the Temperature chart
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
