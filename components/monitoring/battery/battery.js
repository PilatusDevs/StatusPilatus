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
}

function refreshBattery() {

}

function activateBattery() {
    if (loading) {
        return;
    }
    loading = true;
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

            let text = `
                IsCharging: ${data.charging} </br>
                Percentage: ${data.ischarging} </br>
                Manufacturer: ${manufacturer} </br>
                Model: ${model} </br>
                Type: ${type} </br>
                Max Capacity: ${maxcapacity} </br>
            `;
            $("#battery-info").append(text);
            
            loading = false;
        });
}
