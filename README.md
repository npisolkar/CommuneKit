# CommuneKit
CS307 Team 35 Project: Sharing within your community

## Building and runnning
You need to have maven and npm installed, and axios.
To run, start by creating a database. In MySQL workbench or MySQL CLI, use 
`CREATE DATABASE communekit_db;` to create the database to hold the data.
No need to create any tables or populate the database with anything.

Note to us: we should have a list of sql inserts to add a bunch of stuff to the database for working with

Then, run the backend.
In bash/command line, navigate to the CommuneKit-Backend directory and enter the command
`mvn spring-boot:run`
This should start the server.
Then, start the frontend. Navigate to the CommuneKit-Frontend directory and enter the commands
`npm run build` followed by `npm run dev`
You should then go to the link that appears, normally `http://localhost:5173`

### Application details for authorization: (very sensetive, don't share)
Application Name: CommuneKit\_javaSpringBootAuth
Domain: dev-e3kruw7dhnozu4v0.us.auth0.com
Client ID: tDnToxdRZwJNQKdLGpJyRHDJ4xz9JosV
Client Secret: r-ILwPR9Tub0-KYD36aJPRt7q1lHwEVmx4ANozjQOtSr-g9nvT-XCpZdCb0TAPm_
