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

// Storing static GPU title
var gpuTitle = "";
var gpuData = [];

/**
* Called once to initiate the page
*/
function initGpu() {
    if (gpuData.length === 0) {
        si.graphics()
        .then((data) => {
            let allGpus = data.controllers;
            let subtitle = allGpus[0].model;
            gpuData.push(allGpus[0]);
            if(allGpus.length > 1) {
                allGpus.shift();
                allGpus.forEach(gpu => {
                    subtitle += " + "+gpu.model;
                    gpuData.push(gpu);
                });
            }
            gpuTitle = subtitle;
            $("#subtitle").text(gpuTitle);
            $("#gpu-container").html(gpuHtml(gpuData));
        });
    } else {
        $("#subtitle").text(gpuTitle);
        $("#gpu-container").html(gpuHtml(gpuData));
    }
    console.log(gpuData);
}

/**
* Called from app.js
*/
function refreshGpu() {
    console.log("GPU refresh call");
}

function gpuHtml(gpuData) {
    let body = "";
    gpuData.forEach((gpu, index) => {
        body += `<div class="col-md-4 col-sm-6">
        <h3>GPU ${index+1}</h3>
        <b>Vendor</b>: ${gpu.vendor}<br />
        <b>Model</b>: ${gpu.model}<br />
        <b>VRAM</b>: ${formatSize(gpu.vram)[0].toFixed()} GB, ${(gpu.vramDynamic ? "dynamic" : "undynamic")}<br />
        <b>Bus</b>: ${gpu.bus}<br />
        </div>`
    });
    return body;
}
