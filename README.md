# MEAN-AU-TS

MEAN-AU-TS is a full-stack TypeScript starter project that uses MongoDB, Express, Aurelia, and Node.JS

The goal is to build a starter project that is easy to use and to provide a jumping off point for developing with TypeScript, Aurelia, and WebPack especially.  There are some more experimental patterns in the backend so it probably isn't the best option for developers new to Node, Express, and MongoDB

## Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:
* Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/)
* MongoDB - [Download & Install MongoDB](http://www.mongodb.org/downloads), and make sure it's running on the default port (27017).
* Yarn - After installing Node.js, install [Yarn](https://yarnpkg.com/en/) globally with the command below. MEAN-AU-TS uses yarn for managing dependencies that are shared between the client and server.
* Aurelia CLI - After installing Node.js, install the Aurelia-CLI globally with the command below.  MEAN-AU-TS uses the Aurelia-CLI for building and running the client 
```
npm install yarn aurelia-cli -g
```

## Download MEAN-AU-TS
Use git to clone the starter project
```
git clone https://github.com/rdelhommer/mean-au-ts.git mean-au-ts
```
This will clone the repositroy in a directory called 'mean-au-ts'

## Install dependencies
Dependencies for each of the three parts of the project need to be installed separately.  From the respository directory execute the following commands
```
cd ./client && yarn
```
```
cd ./server && yarn
```
```
cd ./shared && yarn
```
If you want, you can mash them all together
```
cd ./client && yarn && cd ../server && yarn && cd ../shared && yarn
```

## Running your application
There are three steps to running the application
1. Build the shared dependencies
```
cd ./shared && npm run build
```
or to run tsc in watch mode
```
cd ./shared && npm run watch
```
2. Run the server.  This command starts an instance of [ts-node](https://github.com/TypeStrong/ts-node/) which runs the backend
```
cd ./server && npm run start:dev
```
or to use nodemon and restart the server when a file changes
```
cd ./server && npm run watch:dev
```
3. Run the client.  This command starts a webpack server which bundles up all your ts and hosts it.
```
cd ./client && au run
```
or to run webpack in watch mode and take advantage of hot module reload
```
cd ./client && au run --watch
```

## Using the App
At this point, your front end webpack server should be running at
```
http://localhost:8080
```
and your backend will be running at
```
http://localhost:3030
```

Webpack conveniently proxies API requests to the node server at localhost:3030 automagically

## TODO
MEAN-AU-TS is still very unfinished and the todo list is pretty large.  If you'd like to help, any contributions especially in these area would be greatly appreciated:

### Shared Dependencies
* improvements to how shared dependencies are managed.  This was sort of a proof of concept for me to share interfaces and classes between the front and backends.  I'm sure there's a cleaner way to implement it.

### Front End
* homepage - some more stuff....
* various webpack improvements... I'm a webpack novice, so I want to believe there are ways to make the experience better

### Back End
* seed data examples

### General
* get reflect metadata working

### Documentation and Testing
* simple heroku production dist and deployment proof of concept
* unit tests
