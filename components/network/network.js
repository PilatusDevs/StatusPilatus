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
        data.forEach(function(adapter) {
            if (adapter.internal == false) {
                $("#adapters").append(adapterHtml(adapter));
            }
        });
    });
}

function initNetwork() {
    refreshAdapters();
}

function refreshNetwork() {
}
