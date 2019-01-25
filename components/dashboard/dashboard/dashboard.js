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
/* global util $ */
"use strict";

module.exports = {
    init: initDashboard,
    refresh: refreshDashboard,
    activate: activateDashboard
};

// Array of elements to render
let favs = [];

function initDashboard() {
    //TODO
}

function refreshDashboard() {
    //TODO
}

function activateDashboard() {
    const container = document.getElementById("dashboard-items");
    console.log(container);
    container.innerHTML = "";
    // favs = [...document.querySelectorAll(".card")];
    if (favs.length === 0) {
        container.innerHTML = `<h5 class="col m12">You have no favourite items!</h5>`;
    } else {
        favs.forEach(fav => {
            const column = document.createElement("div");
            column.classList.add("col", "l6", "m12");
            column.appendChild(fav.cloneNode(true));
            container.appendChild(column);
        });
    }
}
