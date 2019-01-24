![statuspilatus](https://avatars1.githubusercontent.com/u/32306556)

# StatusPilatus

Monitor your PC like never before!

## Features

- Cross-platform and free

### Monitoring

- CPU information, usage, flags and temperature
- GPU information, with support for multiple GPUs
- RAM information and usage
- Disk usage statistics and activity
- General system information such as hostname, operating system, program list with versions and more
- Network statistics with support for multiple network interfaces
- Battery information and status

### Miscellaneous

- Information about running processes
- Configurable user settings

## Stable releases

To install a built version of the program on your system, simply [go here](https://github.com/PilatusDevs/StatusPilatus/releases).
You can download and install the program from there.

## Developing and running from source

To run from source, you need Node.js installed (with npm).  
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
```

## Structure

In the root of the project, we store the README and LICENSE, among the other files that you would expect there. We have an app directory containing the core application parts. Another important folder is the components folder, which stores all the different parts of the application.

### App

Inside the app folder the container for all components is stored. It starts with the index.js file, which loads the index.html file. From there, all the stylesheets and scripts are loaded. The core components like the settings are also created and managed there. Inside the index.html the sidebar shows a list of all the components. This list will be used to start the components as described below.

### Components

The first function that is called is the init function. This generates the charts and other things that should be available at all times. Aside from that, each module has a refresh function, which is called once every half a second (can be changed in the settings). This updates the data inside the charts and other places. This is one of the reasons why all components are loaded on startup. All components will be updated on the background using this refresh function, but this functionality can be disabled in the settings. Lastly, each module has an activate function, which is called when the user switches to this component. This is for example used to update the subtitle. There is no hard-coded list of components, instead a list is generated based on the sidebar menu. From there all the init, refresh and activate functions will be called for each component when needed. Each component exports only these three functions, unless there is other interaction required (such as refresh buttons).

## Style guide

We try to follow these suggestions when writing code:

* Add the GPL license header to all JavaScript, CSS and HTML files
* For CSS class and id names, use kebab-case-like-this
* For JavaScript, try to follow the [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
* For JavaScript we also have suggestions by eslint, with the included config
* Indentation settings are done with editorconfig

To check the JavaScript style suggestions:

`eslint .`

and fix them mostly automatically with:

`eslint . --fix`

## Technologies

We made use of the following software to create StatusPilatus:

* [Electron](https://github.com/electron/electron) (MIT)
* [Materialize](https://github.com/Dogfalo/materialize) (MIT)
* [Material Icons](https://github.com/marella/material-icons) (Apache-2.0)
* [JQuery](https://github.com/jquery/jquery) (MIT)
* [Chart.js](https://github.com/chartjs/Chart.js) (MIT)
* [Systeminformation](https://github.com/sebhildebrandt/systeminformation) (MIT)
* [ProgListr.js](https://github.com/M4Yt/ProgListr.js) (MIT)

## License

StatusPilatus is copyrighted software made by PilatusDevs in 2019. You can copy and modify it under the GNU GPL version 3 or later, see LICENSE for details.
