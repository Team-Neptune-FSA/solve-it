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

Is there and issue thats BUGGING you? Or maybe you you want to solve issues from other people?
Either way click this link to get started! LINK TO WEBSITE

Schema: https://dbdiagram.io/d/60956258b29a09603d13e2c4

Wireframe: https://www.figma.com/file/bSWFLLNNjJQgogmG4U7VMN/Solve.it?node-id=0%3A1

## Technology Stack & Tools

Solve.it implements the NERDS (Node, Express, React, Database using SQL) stack, utilizing each technology to provide a better user experiences all through out the application.

**Backend**

PostgreSQL is one of the most popular relational databases. It allowed us to effectively create the association between the user and algorithm models. This was necessary in order to store information on the specific code each user submits for each algorithm.

Express was selected because of its RESTful API. This allows Solve.it to handle the load of requests and responses created by interacting with the web app. These calls can be made numerous different actions, ranging from logging in to running code in the built in coding environment.

**Frontend**

React Redux was used to manage our applications state. This was beneficial to store user information in the state as a logged in user navigated through the website and attempted/ completed algorithms. In addition, this declarative class driven approach allowed the team to efficiently manage our frontend components.

**Other Technologies**

Docker was a key part of our web application that provided necessary security. Every time a user submits code, a new Docker container is created with that code, along with the corresponding Mocha test specs. The user code is run against the test specs in that Docker container and the pass and fail results are returned. The Docker container protects our server if a user were to submit malicious code, as the user code is being run in an isolated environment.

Monaco Editor is created by Microsoft and is the code editor that powers VS Code. It is open source and under the MIT license. It supports syntax highlighting, bracket matching, and intellisense.

<!-- picture of tech stack -->

## Schema

Solve.it uses a relational database schema connection with the intent to query for tables through those relations.

<!-- picture of db -->

## Setup

<!-- We used the boilermaker linked below as the base of our project and built off it. Please follow the setup instructions in the link. https://github.com/FullstackAcademy/boilermaker

OAuth Set Up
[Hop Hop] Array offers three options for a user to login: a [Hop Hop] Array account, Google, and Github.

The following variables need to be defined in your system environment in order for the Google OAuth and Github OAuth to be set up:

GOOGLE_CLIENT_ID

GOOGLE_CLIENT_SECRET

GOOGLE_CALLBACK

GITHUB_CLIENT_ID

GITHUB_CLIENT_SECRET

GITHUB_CALLBACK

Google

Please see Google's documentation for configuring Google OAuth.

Github

Check out Github's developer settings to set up an OAuth App within Github.

Docker Setup
Install Docker
Run npm run build-docker once to create the code runner Docker image.
If you modify anything in ./dockerTestRunner, remember to re-run npm run build-docker -->

## Deployment

<!-- To deploy our web application, we had to limit our options given our use of Docker and the budget we set for ourselves. With those factors in mind, we found that either AWS or Scaleway was the ideal deployment source for our product.

We then went ahead and purchased a virtual machine from Scaleway and used its public IP address, and our DNS on NameCheap.

If you choose to use our method of deployment, please note, you will need to ssh into your server from your terminal, reconfigure your dB, Docker, and your OAuth secrets. Please review https://www.scaleway.com/en/docs/create-and-connect-to-your-server/ for more details. -->
