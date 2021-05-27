# Solve.it

# BIG LOGO

<!-- - bullet point
  **bold text**

# main title

## subtitle

1. numbering (1,2,3,4)

```
multi line code snippet
```

`single line code`

[linking text][heroku-cli]
[heroku-cli]: https://devcenter.heroku.com/articles/heroku-cli -->

## Overview

Solve.it is the all encompassing platform to either find a freelancer or work as a freelancer using your extraordinary coding and programming skills. Solve.it aims to bring demand and resolution to the issues you come across when programming.

The platform is designed bring users to your issue by incentivizing those who resolve issues quickly and effectively. This allows users to generate income no matter who they are or where they live.

It comes with a built in coding environment so that you can take code snippet, sandbox and send your code. You can put your skills to the test while helping people at the same time!

Schema: https://dbdiagram.io/d/60956258b29a09603d13e2c4

Wireframe: https://www.figma.com/file/bSWFLLNNjJQgogmG4U7VMN/Solve.it?node-id=0%3A1

## Technology Stack & Tools

Solve.it implements the NERDS (Node, Express, React, Database using SQL) stack, utilizing each technology to provide a better user experiences all through out the application.

**Backend**

PostgreSQL is one of the most popular relational databases. It allowed us to effectively create the association between the user and algorithm models. This was necessary in order to store information on the specific code each user submits for each algorithm.

Express was selected because of its RESTful API. This allows Solve.it to handle the load of requests and responses created by interacting with the web app. These calls can be made numerous different actions, ranging from logging in to running code in the built in coding environment.

**Frontend**

React was used to manage our applications state. This was beneficial to store user information in the state as a logged in user navigated through the website and attempted/ completed algorithms. In addition, this approach allowed the team to efficiently manage our frontend components.

**Other Technologies**

Docker was a key part of our web application that provided necessary security. Every time a user submits code, a new Docker container is created with that code. The user code is run within the container, and the output is written to a file, which is then read and rendered in our frontend through Monaco Editor. The Docker container protects our server if a user were to submit malicious code, as the user code is being run in an isolated environment.

Monaco Editor is created by Microsoft and is the code editor that powers VS Code. It is open source and under the MIT license. It supports syntax highlighting, bracket matching, and intellisense.

![Image of Stack](https://github.com/Team-Neptune-FSA/solve-it/blob/main/public/Images/techstack.png)

## Schema

Solve.it uses a relational database schema connection with the intent to query for tables through those relations.

![Image of DB](https://github.com/Team-Neptune-FSA/solve-it/blob/main/public/Images/schema.png)

## Setup

We used the boilermaker linked below as the base of our project and built off it. Please follow the setup instructions in the link. https://github.com/fullstackacademy/fs-app-template

Once you have cloned the repo you will need to npm install and follow the docker setup instructions below.

Docker Setup
Install Docker
Run npm run docker-build once to create the code runner Docker image.
If you modify anything in ./dockerTestRunner, remember to re-run npm run build-docker

## Deployment

With the use of Docker, deployment options were limited. In order to deploy our application we decided to purchase a virtual machine from Scaleway and run our setup on this virtual machine. We were able to use the machine's public IP address in order to deploy our application, but due to the pricing to keep the virtual machine running we have decided to only run it when it is necessary. Please review https://www.scaleway.com/en/docs/create-and-connect-to-your-server/ for more details if you would like to follow our method of deployment.
