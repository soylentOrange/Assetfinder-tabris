# Assetfinder  

![Project funding](https://www.healthcat.eu/wp-content/uploads/2019/01/website_logo_head.png)

## General information

This app is intended to demonstrate finding of assets (e.g. wheelchair) in a hospital.
It relies on a Bluetooth Mesh infrastructure running on [Thingy 52 devices by Nordic Semi](https://www.nordicsemi.com/Software-and-tools/Prototyping-platforms/Nordic-Thingy-52).


This app is developed by the [Biomechanics Lab of the University Medical Center Schleswig-Holstein, Campus Luebeck](https://www.uksh.de/unfallchirurgie-luebeck/Bereiche/Orthop%C3%A4dische_+unfallchirurgische+Forschung+und+Lehre+mit+Labor+f%C3%BCr+Biomechanik+und+Biomechatronik/Einf%C3%BChrung.html).


The [HealthCAT Project](http://www.healthcat.eu/) is supported by Interreg Germany-Danmark with funds from the European Regional Development Fund. Learn more about Interreg Germany-Danmark at [www.interreg5a.eu](https://www.interreg5a.eu/).
  
### Caveat  
The mqtt-libraries (paho-mqtt and mqtt.js) work only in the iOS Developer app by tabris (v3.3.0).  

# Tabris.js

See further sections on how to get Tabris.js setup and running.

## Tabris Setup

This section only applies when you want to start from scratch. More information is found at [Tabris.js](https://docs.tabris.com/3.3/getting-started.html).

If you haven't done so already, install the [Tabris CLI](https://www.npmjs.com/package/tabris-cli) on your machine:

```Shell
sudo npm i tabris-cli -g
```

Create an empty project folder:

```Shell
mkdir Assetfinder
```

Change to this directory and initialize Tabris within this folder:

```Shell
cd Assetfinder

sudo tabris init
```

* Select Tabris.js Version 3.x (default).
* Set an App name and App ID.
* Select Vanilla for the Type of Project.
* Optionally select an IDE integration.

To test that everything works as intended, forward to the [Run](https://github.com/soylentOrange/Assetfinder#run) section. You'll be rather ~~bored...~~ rocked!

## Sidenote setup in MacOS Catalina

Make sure to have at least the Xcode Command Line Tools installed. See [node-gyp Catalina notes](https://github.com/nodejs/node-gyp/blob/master/macOS_Catalina.md#Solutions) for details.

## Get bits and pieces into place

Assetfinder uses [paho-mqtt](https://www.npmjs.com/package/paho-mqtt), which is an MQTT browser-based client library written in Javascript that uses WebSockets to connect to an MQTT Broker. [See the license terms for paho-mqtt](https://github.com/eclipse/paho.mqtt.javascript/blob/master/epl-v10). To integrate the library, simply install paho-mqtt via npm:

```Shell
npm i paho-mqtt
```

Sidenote: I slightly modified the paho-mqtt.js because it gave me errors in Tabris.js:

```javascript
// in line 819
if(localStorage.length > 0) {
  for (var i = 0; i < localStorage.length; i++)
    if (   localStorage.key(i).indexOf("Sent:"+this._localKey) === 0 || localStorage.key(i).indexOf("Received:"+this._localKey) === 0)
      this.restore(key);
}
```

Copy the modified paho-mqtt.js-file into the apps's src directory.

Remove paho-mqtt from the dependencies-section of the "package.json" in the project directory (as you are now using the local file). The paho-mqtt is required in the app.js as:

```javascript
var Paho = require('./paho-mqtt');
```

Works only for ios......


Now, add some meaningful code to the app.js to test drive the mqtt-connection...

## Run

If you haven't done so already, install the [Tabris CLI](https://www.npmjs.com/package/tabris-cli) on your machine:

```Shell
sudo npm i tabris-cli -g
```
Then in the project directory, type:

```Shell
npm start
```


This will start a Tabris.js code server at a free port and print its URL to the console. The app code can then be [side-loaded](https://tabrisjs.com/documentation/3.3/developer-app.html#run-your-app) in the [developer app](https://tabrisjs.com/documentation/3.3/developer-app.html) by entering that URL.


## Build

The app can be built using the online build service at [tabrisjs.com](https://tabrisjs.com) or locally using [Tabris.js CLI](https://www.npmjs.com/package/tabris-cli).

See [Building a Tabris.js App](https://tabrisjs.com/documentation/3.3/build.html) for more information.
