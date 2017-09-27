![statuspilatus](https://avatars1.githubusercontent.com/u/32306556)

# StatusPilatus

Monitor your PC like never before!

# Features

* None so far ;)

# How to use

Currently there are no binary releases.

To run the project you need Node.js installed (with npm).  
The steps to do so, are different for every operating system,  
and can be found on the [Node.js website](https://nodejs.org/en/).

After that, simply run the following commands:

```
npm install
npm start
```

Any errors that occur during the process can mean two things:

* You downloaded the latest source from an unstable branch
* Node.js, npm or you have configured something wrong

# Structure

We decided to structure our project like so:
```
.
├── components
│   ├── cpu/
│   ├── gpu/
│   ├── hdd/
│   ├── network/
│   └── os/
├── core
│   ├── css/
│   ├── img/
│   └── js/
├── index.html
├── LICENSE
├── main.js
├── npm-shrinkwrap.json
├── package.json
└── README.md
```

# Style guide

We try to follow these suggestions when writing code:

* Always add "use strict"; to js files
* Add the GPL license header to all js, css and html files
* Always indent the js, css and html files with 4 spaces
* For css classes, use names-like-this-one
* For js, try to follow the [MDN Javascript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
* In js, function names should be lowerCamelCase
* In js, always declare strings with double quotes, unless there is a good reason not to
* When you need to store complex structures, use JSON

# Technologies

We made use of the following software to create StatusPilatus:

* Electron (MIT)
* Bootstrap (MIT)
* JQuery (MIT)
* Chartjs (MIT)
* Popper.js (MIT)
* Systeminformation (MIT)
* Tether (MIT)

# License

GPL-3.0+, see LICENSE for details.
