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
/* global si $ */
"use strict";

module.exports = {
    init: initBattery,
    refresh: refreshBattery,
    activate: activateBattery
};

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
}

function refreshBattery() {

}

function activateBattery() {
    document.getElementById("battery-info").innerHTML = "";

    si.battery()
        .then(data => {
            let manufacturer;
            data.manufacturer == "" ? manufacturer = "unknown" : manufacturer = data.manufacturer;

            let model;
            data.model == "" ? model = "unknown" : model = data.model;

            let type;
            data.type == "" ? type = "unknown" : type = data.type;

            let maxcapacity;
            data.maxcapacity == "" ? maxcapacity = "unknown" : maxcapacity = data.maxcapacity;

            $("#battery-info").append("IsCharging: " + data.ischarging + "</br>");
            $("#battery-info").append("Percentage: " + data.percent + "</br>");
            $("#battery-info").append("Manufacturer: " + manufacturer + "</br>");
            $("#battery-info").append("Model: " + model + "</br>");
            $("#battery-info").append("Type: " + type + "</br>");
            $("#battery-info").append("Max Capacity: " + maxcapacity + "</br>");
        });
}
