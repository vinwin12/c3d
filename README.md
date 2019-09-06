# c3d

## Introduction

This repository contains the files for the 3-D simulation and real-time rendering for the the Cyphyhouse project. This project establishes
an effort to research, design, and test using a framework called [Three.js](https://threejs.org/) to enable the 3-D rendering of moving drones and cars used in the research instead of the frameworks such as Unity. The beauty of using 3.js (Three.js) is that it can be rendered in popular browsers with no installation required, esentially behaving as a website. This is convienient for people who want to view the drones/cars anytime and anywhere.

In the documentation below I aim to provide explanation of the project and the files in the repository, potential issues with this repository, problems I have faced, and a few next steps if one were to take up this project. 


## Overview of Architecture

The interconnected components to the project are the robots, proxy server, server, and the website.

This project needs two types of data from the robots. The first is the current position. This can be obtained from the Viacon network and I will include a link to some example code. The second is the expected path. These datapoints must be collected through using the proxy server, which will be discussed below, as part of the network of the robots as the active individual robots would send the expected path to the server thinking it is a robot. 

The proxy server can essentially be a raspberry pi that resides inside the IRL(Intelligent Robotics Lab). This server essentially serves for 2 purposes. Due to the security policies of the Illinois network, computers cannot talk to computers inside the Illinois network. The term compuer here refers to any device that can be used for communication over the internet such as phone, laptops, servers, etc. However, through using a proxy server inside the Illinois network, information can be sent from the proxy servery to any computer. Therefore, through the proxy server, we send the expected path points and current position points to another server outside the Illinois network.

The third component, the server, is essentially the server which would receive and store incoming data for use by the visual renderer. The server will also host the c3d website, which also contains the 3.js visual rendering.

## Project

The repository contains different types of files that represent different parts of the project.

As this project was a prototype into the possibilites and limitations of using Three.js for the required objectives, the web server was on the localhost itself, but was also ported into a Raspberry Pi that was emulated as a server for demonstration purposes. Given the sake of simplicity, this documentation will talk about the server being on the localhost. The layout and design of the server code were similar irrespective of it being on the localhost or the Raspberry Pi, with changes to the firewall(if needed), port forwarding, etc. Installing node.js, files and folders were installed for the project. Furthermore, ExpressJS was used for libraries for a web application framework on node.js. Please look at the documentation for ExpressJS and node.js. Furthermore, please understand the x, y, and z coordinates in the three.js system as well. 

### Server

The most important file on the web server side is server.js. The first couple lines contain the intialization and setup for development. For prototyping puproses, the web server side included hard coded coordinates and respective times as the installation of the proxy server in the IRL was not feasible at the time. Essentially the code responds to get requests and for each get request the `index` variable, which starts at 0, would be incremented each time. Consequently, each time the get request is sent to the server, the `index` indexes the 3-4 arrays of a vehicle(time,x,y,z).

### Client

For this protoype project, all the client code has been written in the index.ejs page. 
```
<script src="../js/three.js"></script>
<script src="../js/OrbitControls.js"></script>
<script src="../js/stats.js"></script>
<script src="../js/gui.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="https://cdn.rawgit.com/mrdoob/three.js/master/examples/js/loaders/GLTFLoader.js"></script>
```
These libraries are crucial for the protoype to perform. The `OrbitControls.js` is a package that is used for moving the camera with the mouse and keyboard, which is a useful feature for this project. The `stats.js` and `gui.js` are libraries used for visual representation and display of the performance of this application in the top right corner of the page. The `ajax` library is used for communication with the server and the `GLTFLoader.js` is used for easily loading 3-D modules that are in the .gltf format. It is recommended to briefly read the [introduction](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) to three.js for understanding certain commands that are needed for rendering 3-D objects and a scene in a browser. Below, there would be code snippets that will be briefly explained on their importance and/or functionality. 

```var loader = new THREE.GLTFLoader();
                    var model2;
                    loader.load( './car1/scene.gltf', function ( gltf ) {
                        model2 = gltf.scene;
                        model2.scale.set(5,5,5);
                        model2.castShadow = false;
                        model2.rotation.y = 0;
                        scene.add(model2);
                    }, undefined, function ( error ) {
                        console.error( error );
                    } );
```
The code above is an example of how a GLTFLoader was used to load a car model in scene. The car1 model is described by the `scene.gltf` file and is placed in a car1 folder.



## Limitations and Future
