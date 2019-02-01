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
/* global $ components */
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
    favs.forEach(graph => {
        graph.render();
    });
}

function activateDashboard() {
    const container = document.getElementById("dashboard-items");
    const currentGraphs = Object.values(components)
        .flatMap(c => c.graphs) // Make list of graphs from all components
        .filter(e => e) // Filter out empty entries
        .filter(graph => graph.isPinned); // Filter to only pinned items
    container.innerHTML = "";
    // favs = [...document.querySelectorAll(".card")];

    // if (favs.length === 0) {
    //     container.innerHTML = `<h5 class="col m12">You have no favourite items!</h5>`;
    // } else {
    //     favs.forEach(fav => {
    //         const column = document.createElement("div");
    //         column.classList.add("col", "l6", "m12");
    //         column.appendChild(fav.cloneNode(true));
    //         container.appendChild(column);
    //     });
    // }

    const result = [];
    currentGraphs.forEach(graph => {
        const column = document.createElement("div");
        column.classList.add("col", "l6", "m12");
        column.innerHTML = `
        <div class="card">
            <div class="card-content">
                <span class="card-title">
                    ${graph.name}
                    <a href="#" class="material-icons right amber-text">star</a>
                </span>
                <canvas class="${graph.elementId}"></canvas>
            </div>
        </div>
        `;
        const newGraph = $.extend(true, {}, graph);
        newGraph.init(column);
        result.push(newGraph);
        container.appendChild(column);
    });
    favs = result;
    console.log("favs:", favs);
}
