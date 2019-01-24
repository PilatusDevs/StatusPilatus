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
"use strict";

module.exports = {
    formatBytesToMb: formatBytesToMb,
    formatSize: formatSize,
    title: title,
    sleep: sleep
};

/*
* Used to go from bytes to MB
*/
function formatBytesToMb(bytes) {
    return  ((bytes / (1024*1024)).toFixed(2));
}

/*
* Used to pretty print a number of bytes
*/
const sizes = ["bytes", "KB", "MB", "GB", "TB"];
function formatSize(bytes) {
    const l = Math.min(sizes.length - 1, Math.log(bytes) / Math.LN2 / 10 | 0);
    return [bytes / Math.pow(1024, l), sizes[l]];
}

/*
* Returns the title case of a string
*/
function title(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

/*
* Take a break
*/
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
