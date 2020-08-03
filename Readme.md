# Work-in-progress

# Build and Deploy Cloud-Native application using Accelerator for Teams in IBM Ccoud Pak for Applications

#### Develop a weather application using Codewind and deploy using CI/CD Tekton pipelines



#### IBM Accelerator for Teams - overview

Accelerator for Teams is the commercial enterprise-ready and fully supported implementation of the Kabanero open source community project. Accelerator for Teams integrates with, extends, and adds value to Red Hat OpenShift. Accelerator for Teams supports the activity of application developers, architects, and operations teams in developing, managing, and deploying cloud native applications that meet the requirements of an organization. The product enables Continuous Integration / Continuous Deployment (CI/CD) workflows across the end to end development lifecycle.

Kabanero offers open source technologies in a microservices-based framework that simplifies development, build, and deployment of applications for both Kubernetes and Knative (serverless).

Kabanero installs on OpenShift and integrates a modern DevOps toolchain and application stack hubs which enable developers to use runtimes and frameworks in pre-built container images called `Application stacks`.

Kabanero's developer experience for IDEs is provided by Eclipse Codewind. For more information on how Kabanero and its components work, visit [Kabanero's Architecture and Development Workflows](https://kabanero.io/docs/ref/general/overview/architecture-overview.html).

Eclipse Codewind provides the ability to create application projects from these `Application Stacks` that your company has built, enabling developers to focus on their code and not infrastructure and Kubernetes.  These include IBM Cloud starters, OpenShift Do (odo), and Appsody templates. Today, there are templates for: IBM Cloud Starters, odo, Eclipse MicroProfile/Java EE, Springboot, Node.js, Node.js with Express, Node.js with Loopback. Application deployments to Kubernetes occur via pipelines when developers commit their local code to the correct Git repos Kabanero is managing via webhooks.

In this code pattern we will build a simple Java application using Codewind on eclipse. We will deploy the Java application to IBM Cloud Pak for Applications using Tekton pipelines. The application has a simple interface which accepts name or lat/lon of a location and provides basic weather details of the location using a weather API.

Follow the below instructions to build and deploy the weather app to IBM Cloud Pak for Applications using Accelerator for Teams.

##### 1. Install tools and runtimes

- Eclipse editor. You can install the latest version from [here](https://www.eclipse.org/downloads/packages/).

- Docker. Install [Docker](https://docs.docker.com/install/) 17.06 or later.If you use Linux, you must also install [Docker Compose](https://docs.docker.com/compose/install/).

- Cloud Pak for Applications instance. Refer this [link](https://cloud.ibm.com/catalog/content/ibm-cp-applications-b4fbe4b9-a9de-406a-94de-5e0c7dc20bf7-global) for details.

- Appsody. Refer this [installation instructions](https://appsody.dev/docs/installing/installing-appsody/).

- Install Codewind on eclipse. You may use these [instructions](https://www.eclipse.org/codewind/eclipse-getting-started.html#installing-codewind-for-eclipse).

##### 2. Add Kabanero stack templates to Codewind

IBM Cloud Pak for Applications provide a set of project templates. We will configure Codewind to use this template to create projects so that we have all the necessary resources readily available to deploy application to CP4A.
- Login to your ICPA instance

- On the home page (scroll a bit down). Click on `View team instance` button. 

  ![image-20200716152755669](./images/image-20200716152755669.png)

- Copy the `Codewind URL`. 

  ![image-20200716153235134](./images/image-20200716153235134.png)

We will use this endpoint with the Stack Management CLI login command to login and manage your stacks. For more information about using the CLI see the [Stack Management CLI documentation](https://ibm-cp-applications.cpindiadevteam-cp-766913-f2c6cdc6801be85fd188b09d006f13e3-0000.us-south.containers.appdomain.cloud/docs/ref/general/reference/kabanero-cli.html).

- Ensure that the `Local` connection in Codewind view is in running status. 
- Right click on the `Local` connection and click `Manage Template Sources...`
![image-20200724134408853](./images/image-20200724134408853.png)

- It opens `Manage Template Sources` window. Click on `Add...` button. 

  ![image-20200724135411078](./images/image-20200724135411078.png)

- In the popup window enter URL - Codewind URL copied earlier. Provide a Name. Optionally add a description. Click `OK`.

  ![image-20200724140039874](./images/image-20200724140039874.png)

- The template gets added to Template Sources. Click the refresh button if the newly added template is not reflecting in the list.

##### 3. Create a project in Codewind

You can create a project in codewind either by pointing to an existing Codewind project or by creating a new project from scratch. In this demonstration we will use an existing application. However, you can follow any method and create your own application. Let's see both the ways of doing it.

###### 3.1 Add an existing project

- For the sake of this code pattern, we have a readily available [Codewind project - Add actual Java repo link](https://github.com/muralidharchavan/cw-mf-weather-app). Clone the repo. Run below command to clone the repo at a path of your choice.

  ```
  $ git clone git@github.com:muralidharchavan/cw-mf-weather-app.git
  ```

- In eclipse Codewind Explorer view, right click on `Local` connection. Click on `Add Existing Project...`

  ![image-20200728130706404](/Users/murali/Documents/Murali/Work/IBM Developer/1Core/2020/09CP4A-End-to-end_CodePattern/Repos/DocumentationRepo/images/image-20200728130706404.png)

- In the popup window, browse the parent directory of the cloned repository. Click `Next`.

  ![image-20200728132038806](/Users/murali/Documents/Murali/Work/IBM Developer/1Core/2020/09CP4A-End-to-end_CodePattern/Repos/DocumentationRepo/images/image-20200728132038806.png)

- Click `Finish`. A new Codewind project is created from the cloned repository. The application will be built and deployed on local docker container to run. The status will change to `Running` after a while.

###### 3.2 Create a new Project

- Right click on `Local` connection in Codewind explorer view. And click `Create New Project...`.

  ![image-20200728152937914](/Users/murali/Documents/Murali/Work/IBM Developer/1Core/2020/09CP4A-End-to-end_CodePattern/Repos/DocumentationRepo/images/image-20200728152937914.png)

- In `New Codewind Project` popup window enter `Project name` and select a Kabanero stack template. Click `Finsih`.

  ![image-20200728153542187](/Users/murali/Documents/Murali/Work/IBM Developer/1Core/2020/09CP4A-End-to-end_CodePattern/Repos/DocumentationRepo/images/image-20200728153542187.png)

- The project gets created in eclipse workspace. Additionally, the application is built and deployed to local docker container. The status of the application will change to `Running` after a while.
![image-20200728154552408](/Users/murali/Documents/Murali/Work/IBM Developer/1Core/2020/09CP4A-End-to-end_CodePattern/Repos/DocumentationRepo/images/image-20200728154552408.png)

- Once the template is initialized successfully, you can edit the project code to include your custom code. The changes are immediately built and deployed.

##### 4. Get API Key from Open Weather

Since the application we are using accesses weather information from [Open Weather](https://home.openweathermap.org), we will have to get 

- Register at [Open Weather](https://home.openweathermap.org/users/sign_up), if not already registered.

- Login at https://home.openweathermap.org and click on `API keys` as shown.

  ![image-20200730151353525](/Users/murali/Documents/Murali/Work/IBM Developer/1Core/2020/09CP4A-End-to-end_CodePattern/Repos/DocumentationRepo/images/image-20200730151353525.png)

- Enter a name for API Key and click `Generate`.

  ![image-20200730151715892](/Users/murali/Documents/Murali/Work/IBM Developer/1Core/2020/09CP4A-End-to-end_CodePattern/Repos/DocumentationRepo/images/image-20200730151715892.png)

- Copy the api key generated. This key needs to be added in code.

- Go to eclipse IDE and navigate to `WeatherResources.java` file. Double click on the file to open it.
![image-20200730152140899](/Users/murali/Documents/Murali/Work/IBM Developer/1Core/2020/09CP4A-End-to-end_CodePattern/Repos/DocumentationRepo/images/image-20200730152140899.png)

- Around line no. 35, paste the API key that you copied within the double quotes for the variable `apikey`. Save the file.

##### 5. Run the application

- Now the project is deployed and running on local docker container. To access the application, right-click on the application entry in Codewind Explorer view, and click on `Open Application`. 
![image-20200728171832454](/Users/murali/Documents/Murali/Work/IBM Developer/1Core/2020/09CP4A-End-to-end_CodePattern/Repos/DocumentationRepo/images/image-20200728171832454.png)

- The application home page is launched in a browser.

  ![image-20200728172033843](/Users/murali/Documents/Murali/Work/IBM Developer/1Core/2020/09CP4A-End-to-end_CodePattern/Repos/DocumentationRepo/images/image-20200728172033843.png)

- Enter either city name or Latitude/Longitude of a location and click on `Submit`. The location's weather details are displayed.

  ![image-20200728172947891](/Users/murali/Documents/Murali/Work/IBM Developer/1Core/2020/09CP4A-End-to-end_CodePattern/Repos/DocumentationRepo/images/image-20200728172947891.png)



- You can perform various operations on the application, including checking log files, debugging, monitor performance. 

  ![image-20200728173335118](/Users/murali/Documents/Murali/Work/IBM Developer/1Core/2020/09CP4A-End-to-end_CodePattern/Repos/DocumentationRepo/images/image-20200728173335118.png)

- You can get more details about these project actions [here](https://www.eclipse.org/codewind/project-actions.html).

  

##### 6. Push application code to Git repository 

Once you have added your code into the application and have tested the same, now it is time to deploy the code to IBM Cloud Pak for Application. We will use Tekton pipelines to deploy the application to CP4A. For Tekton pipelines to access the code, we will push our application code to Git repository.

###### If you have cloned repo

If you have already cloned the repo and using it for this code pattern, then you just need to checkin updated files back to git repository. You may use the below commands from the parent folder of the cloned repository.

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

  











1. 

2. a

   ![image-20200728174650612](/Users/murali/Documents/Murali/Work/IBM Developer/1Core/2020/09CP4A-End-to-end_CodePattern/Repos/DocumentationRepo/images/image-20200728174650612.png)

3. b

   ![image-20200728174736345](/Users/murali/Documents/Murali/Work/IBM Developer/1Core/2020/09CP4A-End-to-end_CodePattern/Repos/DocumentationRepo/images/image-20200728174736345.png)

4. 



## Appendix of images





![image-20200728173403045](/Users/murali/Documents/Murali/Work/IBM Developer/1Core/2020/09CP4A-End-to-end_CodePattern/Repos/DocumentationRepo/images/image-20200728173403045.png)



![image-20200728173420308](/Users/murali/Documents/Murali/Work/IBM Developer/1Core/2020/09CP4A-End-to-end_CodePattern/Repos/DocumentationRepo/images/image-20200728173420308.png)



![image-20200728173610335](/Users/murali/Documents/Murali/Work/IBM Developer/1Core/2020/09CP4A-End-to-end_CodePattern/Repos/DocumentationRepo/images/image-20200728173610335.png)



![image-20200728173625538](/Users/murali/Documents/Murali/Work/IBM Developer/1Core/2020/09CP4A-End-to-end_CodePattern/Repos/DocumentationRepo/images/image-20200728173625538.png)



![image-20200728174623343](/Users/murali/Documents/Murali/Work/IBM Developer/1Core/2020/09CP4A-End-to-end_CodePattern/Repos/DocumentationRepo/images/image-20200728174623343.png)

