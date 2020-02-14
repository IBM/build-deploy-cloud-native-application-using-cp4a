# *** Work in Progress ***

# build-deploy-manage-cloud-native-application-on-openshift
This code pattern will showcase a complete lifecycle (Develop, Deploy and Manage) of a Cloud Native Java application. This will show how to develop an application using Codewind, deploy the application to RedHat Openshift using tekton and manage (Access Control and Scaling) the application.

### Run

To build and run the application:
1. `npm install`
2. `npm start`

To run the application in Docker use the Docker file called `Dockerfile`.

### Endpoints

The application will run on localhost port [`3000`](http://localhost:3000)

The application exposes the following endpoints:
* Health endpoint: `<host>:<port>/health`.

### Screenshots

![](/doc/source/images/screenshot.png)

