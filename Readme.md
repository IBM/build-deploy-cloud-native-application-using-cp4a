## Work-in-progress

# Build and Deploy Cloud-Native application using Accelerator for Teams in IBM Cloud Pak for Applications

### Develop a weather application using Codewind and deploy using CI/CD Tekton pipelines



IBM Cloud Pak for Applications helps you modernize existing applications, embed additional security, and develop new apps that unleash digital initiatives. It offers cloud-native development solutions that can quickly deliver value, along with flexible licensing that can be tailored to your specific needs.

Apps that are built in the cloud are typically more scalable, easier to update and less costly to run. This can help you to respond to customer needs faster.

In this code pattern, we will use Accelerators for Teams of IBM Cloud Pak for Applications (CP4A) to demonstrate how to develop a cloud-native application and deploy it on Cloud Pak for Applications using CI/CD features. We will develop a simple Java weather application. We will use Codewind to develop, Appsody to build and Tekton for Continous delivery. 







**IBM Accelerator for Teams - overview**

Accelerator for Teams is the commercial enterprise-ready and fully supported implementation of the Kabanero open source community project. Accelerator for Teams integrates with, extends, and adds value to Red Hat OpenShift. Accelerator for Teams supports the activity of application developers, architects, and operations teams in developing, managing, and deploying cloud native applications that meet the requirements of an organization. The product enables Continuous Integration / Continuous Deployment (CI/CD) workflows across the end to end development lifecycle.

Kabanero offers open source technologies in a microservices-based framework that simplifies development, build, and deployment of applications for both Kubernetes and Knative (serverless).

Kabanero installs on OpenShift and integrates a modern DevOps toolchain and application stack hubs which enable developers to use runtimes and frameworks in pre-built container images called `Application stacks`.

Kabanero's developer experience for IDEs is provided by Eclipse Codewind. For more information on how Kabanero and its components work, visit [Kabanero's Architecture and Development Workflows](https://kabanero.io/docs/ref/general/overview/architecture-overview.html).

Eclipse Codewind provides the ability to create application projects from these `Application Stacks` that your company has built, enabling developers to focus on their code and not infrastructure and Kubernetes.  These include IBM Cloud starters, OpenShift Do (odo), and Appsody templates. Today, there are templates for: IBM Cloud Starters, odo, Eclipse MicroProfile/Java EE, Springboot, Node.js, Node.js with Express, Node.js with Loopback. Application deployments to Kubernetes occur via pipelines when developers commit their local code to the correct Git repos Kabanero is managing via webhooks.


In this code pattern we will build a simple Java application using Codewind on eclipse. We will deploy the Java application to IBM Cloud Pak for Applications using Tekton pipelines. The application has a simple interface which accepts name or lat/lon of a location and provides basic weather details of the location using a weather API.

Follow the below instructions to build and deploy the weather app to IBM Cloud Pak for Applications using Accelerator for Teams.

## Flow

## Pre-requisites

* Eclipse editor: You can install the latest version from [here](https://www.eclipse.org/downloads/packages/).

* Docker: Install [Docker](https://docs.docker.com/install/) 17.06 or later. If you use Linux, you must also install [Docker Compose](https://docs.docker.com/compose/install/).

* Cloud Pak for Applications instance: Refer this [link](https://cloud.ibm.com/catalog/content/ibm-cp-applications-b4fbe4b9-a9de-406a-94de-5e0c7dc20bf7-global) for details.

## Steps

1. [Install Codewind and Appsody]()
2. [Add project templates to Codewind]()
3. [Create a project in Codewind]()
4. [Get API Key from Open Weather]()
5. [Run the application locally]()
6. [Push application code to GitHub repository]()
7. [Create token for your Github]()
8. [Configure Tekton Pipeline]()
9. [Access the deployed Application]()

### 1. Install Codewind and Appsody


- Appsody. Refer this [installation instructions](https://appsody.dev/docs/installing/installing-appsody/).

- Install Codewind on eclipse. You may use these [instructions](https://www.eclipse.org/codewind/eclipse-getting-started.html#installing-codewind-for-eclipse).

### 2. Add project templates to Codewind

IBM Cloud Pak for Applications provide a set of project templates. We will configure Codewind to use this template to create projects so that we have all the necessary resources readily available to deploy application to CP4A.
- Login to your CP4A instance.

- On the home page (scroll a bit down). Click on `View team instance` button. 

  <img src="./images/image-20200716152755669.png" alt="image-20200716152755669" width="50%" />

- Copy the `Codewind URL`. 

  <img src="./images/image-20200716153235134.png" alt="image-20200716153235134" width="50%" />

We will use this endpoint with the Stack Management CLI login command to login and manage your stacks. For more information about using the CLI see the [Stack Management CLI documentation](https://ibm-cp-applications.cpindiadevteam-cp-766913-f2c6cdc6801be85fd188b09d006f13e3-0000.us-south.containers.appdomain.cloud/docs/ref/general/reference/kabanero-cli.html).

- Ensure that the `Local` connection in Codewind view is in running status. 

- Right click on the `Local` connection and click `Manage Template Sources...`
<img src="./images/image-20200724134408853.png" alt="image-20200724134408853" width="50%" />

- It opens `Manage Template Sources` window. Click on `Add...` button. 

  <img src="./images/image-20200724135411078.png" alt="image-20200724135411078" width="50%" />

- In the popup window enter URL - Codewind URL copied earlier. Provide a Name. Optionally add a description. Click `OK`.

  <img src="./images/image-20200724140039874.png" alt="image-20200724140039874" width="50%" />

- The template gets added to Template Sources. Click the refresh button if the newly added template is not reflecting in the list.

### 3. Create a project in Codewind

You can create a project in codewind either by pointing to an existing Codewind project or by creating a new project from scratch. In this demonstration we will use an existing application. However, you can follow any method and create your own application. Let's see both the ways of doing it.

#### 3.1 Add an existing project

- For the sake of this code pattern, we have a readily available [Codewind project](https://github.com/IBM/build-deploy-manage-cloud-native-application-on-openshift). 

- Fork that GitHub repo. To fork the repo, on the top right page of the repo on GitHub, click on `Fork` button.

- Copy link for cloning. Go to your copy of the repo on GitHub. Click on `Code` dropdown. Copy the link provided in the text field.

  <img src="/Users/murali/Documents/Murali/Work/IBM Developer/1Core/2020/09CP4A-End-to-end_CodePattern/Repos/GitIBMRepo/build-deploy-manage-cloud-native-application-on-openshift/images/image-20200804155655109.png" alt="image-20200804155655109" width="50%;" />
  
- Clone your repo. Run below command to clone the repo at a path of your choice.

  ```
  $ git clone <link copied in above step>
  ```

- In eclipse Codewind Explorer view, right click on `Local` connection. Click on `Add Existing Project...`

  <img src="./images/image-20200728130706404.png" alt="image-20200728130706404" width="50%" />

- In the popup window, browse the parent directory of the cloned repository. Click `Next`.

  <img src="./images/image-20200728132038806.png" alt="image-20200728132038806" width="50%" />

- Click `Finish`. A new Codewind project is created from the cloned repository. The application will be built and deployed on local docker container to run. The status will change to `Running` after a while.

#### 3.2 Create a new Project

- Right click on `Local` connection in Codewind explorer view. And click `Create New Project...`.

  <img src="./images/image-20200728152937914.png" alt="image-20200728152937914" width="50%" />

- In `New Codewind Project` popup window enter `Project name` and select a Kabanero stack template. Click `Finsih`.

  <img src="./images/image-20200728153542187.png" alt="image-20200728153542187" width="50%" />

- The project gets created in eclipse workspace. Additionally, the application is built and deployed to local docker container. The status of the application will change to `Running` after a while.
<img src="./images/image-20200728154552408.png" alt="image-20200728154552408" width="50%" />

- Once the template is initialized successfully, you can edit the project code to include your custom code. The changes are immediately built and deployed.

### 4. Get API Key from Open Weather

Since the application we are using accesses weather information from [Open Weather](https://home.openweathermap.org), we will have to get API Key from Open Weather.

- Register at [Open Weather](https://home.openweathermap.org/users/sign_up), if not already registered.

- Login at https://home.openweathermap.org and click on `API keys` as shown.

  ![image-20200730151353525](./images/image-20200730151353525.png)

- Enter a name for API Key and click `Generate`.

  ![image-20200730151715892](./images/image-20200730151715892.png)

- Copy the api key generated. This key needs to be added in code.

- Go to eclipse IDE and navigate to `WeatherResources.java` file. Double click on the file to open it.
<img src="./images/image-20200730152140899.png" alt="image-20200730152140899" width="50%" />

- Around line no. 35, paste the API key that you copied within the double quotes for the variable `apikey`. Save the file. The changes get deployed.

### 5. Run the application locally

- Now the project is deployed and running on local docker container. To access the application, right-click on the application entry in Codewind Explorer view, and click on `Open Application`. 
<img src="./images/image-20200728171832454.png" alt="image-20200728171832454" width="50%" />

- The application home page is launched in a browser.

  <img src="./images/image-20200728172033843.png" alt="image-20200728172033843" width="50%" />

- Enter either city name or Latitude/Longitude of a location and click on `Submit`. The location's weather details are displayed.

  <img src="./images/image-20200728172947891.png" alt="image-20200728172947891" width="50%" />



- You can perform various operations on the application, including checking log files, debugging, monitor performance. 

  <img src="./images/image-20200728173335118.png" alt="image-20200728173335118" width="50%" />

- You can get more details about these project actions [here](https://www.eclipse.org/codewind/project-actions.html).

  

### 6. Prepare application to be deployed to CP4A

The deployment manifest for your project is created or updated when you run `appsody build` or `appsody deploy`. The Appsody CLI uses deployment information from the stack and adds various [traceability metadata](https://appsody.dev/docs/reference/metadata) while generating this manifest. You can edit this file to suit your application and store it under source control. Let's create the deployment manifest file. Your deployment configuration is taken care of so that you can focus on your application development.

- On command prompt, change directory to project parent folder.
- Run `$ appsody build` command

When the command runs successfully, it would have generated `appsody-config.yaml` file in the project parent folder.

### 7. Push application code to GitHub repository 

Once you have added your code into the application and have tested the same, now it is time to deploy the code to IBM Cloud Pak for Application. We will use Tekton pipelines to deploy the application to CP4A. For Tekton pipelines to access the code, we will push our application code to Git repository.

###### If you have cloned repo

If you have already cloned the repo and using it for this code pattern, then you just need to check-in updated files back to git repository. You may use the below commands from the parent folder of the cloned repository.

```
$ git add -u
$ git commit -m "<your comments>"
$ git remote add origin <git url>
$ git push -u origin master # Change branch name if other than master
```



###### If you have created a new project

In case you have created a new project in Codewind, you may use below instructions to push the code to Git Repo.

- Create a new repository in [GitHub](https://github.com). 

- Navigate to parent folder of the project on your local machine.

- Use below commands

  ```
  $ git init
  $ git add -A
  $ git commit -m "<your comments>"
  $ git remote add origin <git url>
  $ git push -u origin master
  ```


Application code is now pushed to GitHub repository. We will next see how to configure Tekton pipelines in CP4A to achieve CI/CD for the above application.

### 7. Create token for your Github

Before configuring the Tekton Pipeline, you need to create GitHub token so that the pipeline could access your application code. Follow the below steps to create the Github token.

* Open [GitHub](https://github.com) and log into your account.
* Click your profile photo to expand the account profile menu.
* From the menu, click 
` Settings > Developer settings > Personal access tokens`
* Click the Generate new token button. Provide your Github password again when prompted.
* Give a descriptive name into the Note field.
* Select the scopes, or permissions, you’d like to grant this token. To use your token to access repositories from the tekton pipeline, select the repo checkbox. Click the `Generate token` button.
* Copy the token to your clipboard and make a note of this token safely. For security reasons, after you navigate off the page, you will not be able to see the token again.

### 8. Configure Tekton Pipeline

Launch your Openshift cluster Console and then click on Cloud Pak Console.

In Cloud Pak Console, navigate to `Instances` and then `Manage Pipelines` as shown in snapshot below.

![manage_pipelines](./images/manage-pipelines.png)

In the newly opened tab, click on `Log-in with OpenShift` then it will launch a tekton dashboard as shown.

![tekton-dashboard](./images/tekton-dashboard.png)

**Tekton Dashboard** shows tekton resources, namespace, secret, service accounts, webhooks etc. The IBM Cloud Pak for Applications also provides some pre-configured pipelines for java and nodejs application in Kabanero namespace. If incase existing pipelines does not fulfill the purpose then you can write your own pipeline code and use `Import Tekton Resources` option. Here in this code pattern we are using the pre-configured pipeline for java application. As a first step, you need to create the webhook.

**Create Webhook**
* Select Webhooks from the left-side menu of the tekton dashboard.
* Click `Add Webhook`
* Provide the required values. Under Webhook Settings
    * name is your webhook name 
    * repositry URL is your github repository where application code resides
    * access token is the token to access your github repository created in the previous step. Add the token using `+` icon.
* Under Target Pipeline Settings
    * choose Namespace as the default namespace i.e. kabanero
    * choose pipeline as per your application requirement. Here we are using a weather app using Java so choosing ``
    * For preconfigured pipeline, service account will be kabanero-operator
    * Docker registry is the url where you want to push your container image followed by the namespace name. For OpenShift cluster 4.x, integrated container registry URL is `image-registry.openshift-image-registry.svc:5000/`
    

![webhook-settings](./images/webhook-settings.png)

* Click `Create`.

Check that Tekton and GitHub are successfully connected by opening your Github repository. Go to `your github repository > Settings -> Webhooks`. It should show a link as shown.
![webhook-repo-settings](./images/webhook-repo-settings.png)

* Now, make some changes in the code of your github repository to trigger pipeline.

* Open your Tekton dashboard. Under the Tekton resources list, select PipelineRuns. It should show one pipelinerun in progress. Wait for this one to get completed.





**deploy app in the same namespace**

**deploy app in different namespace**

If you want to deploy your application in different namespace instead of default one which is inthis case is *Kabanero*. Go to Visual Studio and run 
**appsody build** in your Visual Studio terminal. It will create a deployment configuration file for your project. 
After the above command executes successfully, you will see a new generated file called *app-deploy.yaml* on the left hand side of your screen. This file will help you to deploy the application on Cloud Pak for Applications in non-default namespace.  Add a namespace section as follows:



### 9. Access the deployed Application





## Backup images - To be deleted if unused



![image-20200728174650612](./images/image-20200728174650612.png)



![image-20200728174736345](./images/image-20200728174736345.png)



![image-20200728173403045](./images/image-20200728173403045.png)



<img src="./images/image-20200728173420308.png" alt="image-20200728173420308" width="50%" />



<img src="./images/image-20200728173610335.png" alt="image-20200728173610335" width="50%" />



<img src="./images/image-20200728173625538.png" alt="image-20200728173625538" width="50%" />



<img src="./images/image-20200728174623343.png" alt="image-20200728174623343" width="50%" />

