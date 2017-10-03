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

/**
* Called once to initiate the page
*/
function initStorage() {
    initStorageUsage();
}

/**
* Called from app.js
*/
function refreshStorage() {
    console.log("HDD refresh call");
}

/**
* Make all the progess-bars for all the drives.
* it explains itself
*/
function initStorageUsage() {
    si.fsSize()
    .then(data => {
        data.forEach(drive => {
            let size = formatSize(drive.size);
            let used = formatSize(drive.size-drive.used);
            let html = `<h3>Disk ${drive.mount}<small> ${used[0].toFixed(2)+used[1]} free of ${size[0].toFixed(2)+size[1]}</small></h3>`;
            let status;
            if(drive.use < 60){
                status = "progress-bar-success";
            }else if(drive.use > 60 && drive.use < 90){
                status = "progress-bar-warning";
            }else{
                status = "progress-bar-danger";
            }

            /* generate the html and append it*/
            html += `<div class="progress">
            <div class="progress-bar ${status} role="progressbar" aria-valuenow="${drive.use}" aria-valuemin="0" aria-valuemax="100" style="width: ${drive.use}%">
            ${parseInt(drive.use)}%
            </div>
            </div>`;
            $(".frame").append(html);
        });
    });
}
