# Short title

Build and Deploy Cloud-Native Java application using IBM Cloud Pak for Applications

# Long title

Develop a Cloud-Native weather application in Java using Codewind and deploy, using CI/CD Tekton pipelines, to Openshift cluster of IBM Cloud Pak for Applications


# Author

* [Manoj Jahgirdar](https://developer.ibm.com/profiles/manoj.jahgirdar/)
* [Muralidhar Chavan](https://developer.ibm.com/profiles/muralidhar.chavan/)
* [Shikha Maheshwari](https://developer.ibm.com/profiles/shikha.mah/)

# URLs

### Github repo

* [Build and Deploy Cloud-Native Java application using IBM Cloud Pak for Applications](https://github.com/IBM/build-deploy-manage-cloud-native-application-on-openshift)

# Summary

IBM Cloud Pak for Applications (CP4A) helps you modernize existing applications and develop new cloud-native applications that can quickly deliver value and can be tailored to your specific needs. This can help you to respond to customer needs faster.

In this code pattern, you will use the Accelerators for Teams feature of CP4A to demonstrate how to develop a cloud-native application and deploy it on OpenShift using CI/CD features.

# Technologies

* [Java](https://developer.ibm.com/technologies/java/): The Java programming language is a high-level, object-oriented language. It is rapidly evolving across several fronts to simplify and accelerate development of modern applications.
* [Continuous Integration](https://developer.ibm.com/technologies/continuous-integration/): Continuous integration (CI) is a software development and DevOps practice of integrating code regularly into one shared repository. Quickly and easily detect errors within your code to keep your team agile and efficient.
* [Continuous Delivery](https://developer.ibm.com/technologies/continuous-delivery/): Automate your software release process with continuous delivery (CD), a practice that allows teams to build, test, and deploy code changes quickly, ensuring your software is always ready for deployment.

# Description

IBM Cloud Pak for Applications (CP4A) helps you modernize existing applications and develop new cloud-native applications that can quickly deliver value and can be tailored to your specific needs. This can help you to respond to customer needs faster.

In this code pattern, you will use the Accelerators for Teams feature of CP4A to demonstrate how to develop a cloud-native application and deploy it on OpenShift using CI/CD features. 

**Accelerator for Teams of CP4A - overview**

Accelerator for Teams is the enterprise-ready and fully supported implementation of the Kabanero open source community project. The product enables Continuous Integration / Continuous Deployment (CI/CD) workflows across the end to end development lifecycle using Appsody, Codewind and Tekton (DevOps toolchain). Kabanero integrates application stack hubs which enable developers to use runtimes and frameworks in pre-built container images.

Kabanero's developer experience for IDEs is provided by Codewind, which is used for creating, building, running, and profiling applications. Appsody can be used for deployment, in addition to creating, building, running applications. Tekton pipelines provide consistent, managed, and governed CI/CD processes that react to repository events that occur during code development. For more information on how Kabanero and its components work, refer this [link](https://kabanero.io/docs/ref/general/overview/architecture-overview.html).

You will develop a simple Java weather application using Codewind and Tekton pipeline for Continous delivery in this code pattern. 

Accelerators deliver innovative technology to speed up the design process. As well as embedding Reference Blueprints that are based on Reference Architectures in the  [Cloud Architecture Center](https://www.ibm.com/cloud/architecture/architectures), they also provide the framework for designing your application from scratch.

When you have completed this code pattern, you will understand how to:

* build a simple Java application using Codewind on Eclipse
* use Tekton pipelines to deploy the Java application on OpenShift using CP4A

At the end, you will run the application with a simple interface which accepts name or latitude/longitude of the location and provides basic weather details of the location using Open Weather API.


# Flow

<img src="./images/image-20200805163350746.png" alt="image-20200805163350746" width="50%;" />


1. User develops/updates an application using Codewind in Eclipse.
2. User pushes the code to the GitHub repository.
3. User configures Tekton Pipeline and defines Github Webhook to get events for code change.
4. Tekton pipeline builds and deploys the application whenever there is a change in the Github repository.
5. User accesses the application on the Cloud.

# Instructions

> Find the detailed steps for this pattern in the [readme file](https://github.com/IBM/build-deploy-manage-cloud-native-application-on-openshift/blob/master/README.md). The steps will show you how to:

1. Install Codewind and Appsody
2. Add project templates to Codewind
3. Create a project in Codewind
4. Get API Key from Open Weather
5. Run the application locally
6. Push application code to GitHub repository
7. Create token for your Github
8. Configure and Execute Tekton Pipeline
9. Access the deployed Application


# Components and services

[IBM Cloud Pak for Application](https://developer.ibm.com/series/introduction-ibm-cloud-paks-for-applications/)

[Kabanero](https://developer.ibm.com/open/projects/kabanero/)

[Java](https://developer.ibm.com/technologies/java/)

[Tekton](https://developer.ibm.com/articles/introduction-to-tekton-architecture-and-design/)


# Runtimes

* Java


# Related IBM Developer content

* [Deep dive on IBM Cloud Pak for Application](https://developer.ibm.com/videos/deep-dive-on-ibm-cloud-pak-for-applications/)
* [Introduction to IBM Cloud Pak for Application](https://developer.ibm.com/series/introduction-ibm-cloud-paks-for-applications/)
* [Introduction to Accelerator for Teams](https://developer.ibm.com/articles/introduction-to-accelerators-for-cloud-native-solutions/)
