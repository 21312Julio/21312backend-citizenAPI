# Citizen API - CA1 
## Introduction
For this first assignment our task was to create an API application that was capable of performing CRUD operations. The tools used in the creation were:
- MongoDB Atlas Database
- Node.js
- Postman API Platform
- Visual Studio Code

## Project Init and Mongoose Setup
In order to create a project `npm init` was used, keeping all the default values except for description, and to install express inside the project the command `npm install express --save` was used. 
The type of information stored in the database is a citizen class created using a schema that represents the structure of the variables and information, in order to interact with the MongoDB collection. In order to use mongoose functions, it was installed via command line with `npm install --save mongoose`.

## Database Interaction
After setting up the schema, the entry point that was set up during initialization, **index.js** is then used to handle and parse the CRUD requests.  In order to update information in the database without using all class keys in postman, an inline if-statement was set for both the *age* and *stats* variables (*number* and *array*). It defines that if the body of the requested information is undefined, nothing happens `void(0)`, otherwise, the information will be either **parsed into Integer** `age: ((req.body.age) === undefined)? void(0) : parseInt(req.body.age)` or **split at coma** `let statsArr = (req.body.stats === undefined)? void(0) : req.body.stats.split(",")`.
