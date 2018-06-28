![statuspilatus](https://avatars1.githubusercontent.com/u/32306556)

# StatusPilatus

Monitor your PC like never before!

## Features

- Cross-platform and free

### Monitoring

- CPU usage, flags and temperature
- GPU information, with support for multiple GPUs
- RAM usage
- Disk usage statistics and activity
- General system information such as hostname, operating system, program list with versions and more
- Network statistics with support for multiple network interfaces

## Setup and running

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

When the time is right we will generate builds with one of the following commands:

```
npm run buildall
npm run buildlinux
npm run buildmac
npm run buildwin

## Structure

We decided to structure our project like so:

```
.
├── components
│   ├── dashboard
│   │   └── dashboard/
│   └── monitoring
│       ├── cpu/
│       ├── gpu/
│       ├── memory/
│       ├── network/
│       ├── os/
│       └── storage/
├── core
│   ├── css/
│   ├── img/
│   └── js/
├── .editorconfig
├── .eslintrc.json
├── index.html
├── ISSUE_TEMPLATE.md
├── LICENSE
├── main.js
├── package.json
├── package-lock.json
├── PULL_REQUEST_TEMPLATE.md
└── README.md

```

## Style guide

We try to follow these suggestions when writing code:

* Add the GPL license header to all javascript, css and html files
* For css class and id names, use kebab-case-like-this
* For javascript, try to follow the [MDN Javascript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
* For javscript we also have suggestions by eslint, with the included config
* Indentation settings are done with editorconfig

To check the javascript style suggestions:

`eslint .`

and fix them mostly automatically with:

`eslint . --fix`

## Technologies

We made use of the following software to create StatusPilatus:

* [Electron](https://github.com/electron/electron) (MIT)
* [Bootstrap](https://github.com/twbs/bootstrap) (MIT)
* [JQuery](https://github.com/jquery/jquery) (MIT)
* [Chart.js](https://github.com/chartjs/Chart.js) (MIT)
* [Systeminformation](https://github.com/sebhildebrandt/systeminformation) (MIT)
* [ProgListr.js](https://github.com/fabiaant/ProgListr.js) (MIT)

## License

StatusPilatus is copyrighted software made by PilatusDevs in 2018. You can copy and modify it under the GNU GPL version 3 or later, see LICENSE for details.
