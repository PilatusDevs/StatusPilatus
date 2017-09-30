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

function initGpu() {
    si.graphics()
    .then(data => {
        let allGPUs = data.controllers;
        let subtitle = allGPUs[0].model;
        if(allGPUs.length > 1) {
            allGPUs.shift();
            allGPUs.forEach((gpu => {
                subtitle += " + "+gpu.model;
            }));
        }
        $("#subtitle").text(subtitle);
    });
}

function refreshGpu() {
    console.log("Gpuu shit geresrhed");
}
