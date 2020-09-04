# BAMA

> BAMA is a research project for elderly adults' cognitive stimulation from orientation, language, memory, and calculation games.

## Getting Started
This guide explains how to set up your environment for BAMA development. It includes information about prerequisites, creating an initial workspace and starter app, and running that app locally to verify your setup.

### Prerequisites
To use the BAMA, you should be familiar with the following:
- [NodeJS](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)
- [HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML)
- [CSS](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps)

To install BAMA on your local system, you need the following:
* Node js
BAMA requires a [current, active LTS, or maintenance LTS](https://nodejs.org/en/about/releases/)  version of Node.js.
> For information about specific version requirements, see the engines key in the [package.json](https://github.com/rafita96/BAMA/blob/master/package.json) file.

For more information on installing Node.js, see [nodejs.org](https://nodejs.org/en/). If you are unsure what version of Node.js runs on your system, run node -v in a terminal window.

* npm package manager
BAMA depend on npm packages for many features and functions. To download and install npm packages, you need an npm package manager. This guide uses the npm client command line interface, which is installed with Node.js by default. To check that you have the npm client installed, run npm -v in a terminal window.

* MongoDB
BAMA requires a [current, active LTS, or maintenance LTS](https://docs.mongodb.com/manual/installation/)  version of MongoDB.

### Install BAMA
To install the BAMA, open a terminal window and run the following command:
```
git clone https://github.com/rafita96/BAMA && cd BAMA && npm install
```

### Create a workspace and initial application
To create a new workspace and initial starter app:

Run the CLI command node init.js as shown here:
```
node init.js
```
> MongoDB must have started successfully

### Run the application
```bash
node server.js
```

# Project structure

```
juegos/                      games
|- x-game/                   game example structure (naming without space)
|  |- data/                  blobs
|  |- public/js/             game source code
|  |- songs/                 blobs
|  |- index.ejs              game entry
|  |- meta.json              game description
|  |- thumbnail.png          game thumbnail
audios/                      games sounds (blobs)
public/                      assets
|- common/             
|- js/                   
src/                         project source code
|- controllers/             
|- routers/                   
|- views/             
|- config.js                 starter local config
|- router.js                 
server.js                    server listener
```
