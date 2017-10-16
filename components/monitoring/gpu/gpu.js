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
            gpuData = data.controllers;
            let subtitle = gpuData[0].model;
            if(gpuData.length > 1) {
                gpuData.shift();
                gpuData.forEach(gpu => {
                    subtitle += " + "+gpu.model;
                });
            }gpuTitle = subtitle;
            $("#subtitle").text(gpuTitle);
            $("#gpu-container").html(gpuHtml(gpuData));
        });
    } else {
        $("#subtitle").text(gpuTitle);
        $("#gpu-container").html(gpuHtml(gpuData));
    }
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
        body += `<div class="col-md-3 col-sm-6">
        <h3>GPU ${index+1}</h3>
        <b>Vendor</b>: ${gpu.vendor}<br />
        <b>Model</b>: ${gpu.model}<br />
        <b>VRAM amount</b>: ${formatSize(gpu.vram)[0].toFixed()} GB<br />
        <b>VRAM dynamic?</b>: ${gpu.vramDynamic}<br />
        <b>Bus</b>: ${gpu.bus}<br />
        </div>`
    });
    return body;
}
