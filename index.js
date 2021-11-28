//declarations 
//express for server and routes
const express = require('express')
//bodyParser for x-www-urlencoded (html form like) variables
const bodyParser = require('body-parser')
// defining the actual app to handle the requests (e.g. push, get, etc.)
const app = express()
const port = 3000
// require the driver to connect to the database
const mongoose = require('mongoose')
// require the class constructor from different file
const Citizen = require('./citizen.js')

//make the app use the bodyParser
app.use(bodyParser.urlencoded({
    extended: false
}))

//API ROUTES
//show all citizens from the database using GET request
app.get('/citizen', (req, res) => {
    //find all citizens in the database and store them in the "result" variable
    //use the Model created in the citizen.js file to retrieve all citizen entries from the database
    Citizen.find((err, citizens) => {
        //in case there is an error with our Citizen model, we we will send it to the user(postman)
        if (err) {
            res.status(404).send(err)
            return
        }
        //if no error send the array conting citizens to the user/postman
        res.status(200).send(citizens)
        //log the result in the console as well
        console.log(citizens)
    })
})

//insert request using POST to add a citizen into the database
app.post('/citizen', (req, res) => {
    console.log("Inserting a citizen in the database")
    //inser the dog into the database
    // citizen.save() // insert the citizen into the database

    let isNeutred = false;
    if (req.body.isNeutred === 'true') {
        isNeutred = true;
    }
    let statsArr = req.body.stats.split(",")
    let citizen = new Citizen({
        age: parseInt(req.body.age), //Number
        name: req.body.name, //String
        vaccinated: (req.body.vaccinated === 'true') ? true : false, //Boolean
        profession: req.body.profession, //String
        stats: statsArr, //Array
    });
    //inserting a citizen and checking to see if any errors occured
    citizen.save(err => {
        if (err) {
            // if error send a message to let the user know
            res.status(404).send(err)
            //return to be used in order to not send to res.send and crash the program
            return
        }
        //send a message to the user with the result
        res.status(201).send("Citizen was created")
        console.log("Citizen is in the database")
    })

    //if return runs, code will start from here
    return
})

// FIND ONE BY ID, using a GET REQUEST and A PARAMETER (id)
app.get('/citizen/:id', (req, res) => {
    const id = req.params.id;
    // we use the findById query, details on https://mongoosejs.com/docs/queries.html
    // this query only returns one element
    // you can also use findOneById
    // you can also use findOne({_id:req.paramas.id}) - this query will find depending on other properties,
    //                                    e.g. age, name
    //                                    will only return first element found
    // to return more then 1 element use find({}) // see previous request
    Citizen.findById(id, (err, citizen) => {
        if (err) {
            res.status(404).send(err)
            return
        }
        //"citizen" is an object file retrieved from the database
        //"citizen" will only be defined if there is a citizen with the specific id
        // inside the Database
        // for a wrong ID, "citizen" will be undefined

        //we will send it back to the user/postman
        res.send(citizen)
        console.log(citizen)
    })
})

// PUT request to update or modify one citizen from the database
app.put('/citizen/:id', (req, res) => {
    // you can use fineOneAndUpdate() see https://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
    // or
    // you can use findByIdAndUpdate() see https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
    // You can use req.params.id to send the _id and req.body for your new variables
    // or you can send all variables, including id, in req.body
    console.log("Trying to edit citizen")
    console.log(parseInt(req.body.age))


    Citizen.findByIdAndUpdate(req.params.id, {
        age: parseInt(req.body.age), //Number
        name: req.body.name, //String
        vaccinated: (req.body.vaccinated === 'true') ? true : false, //Boolean
        profession: req.body.profession, //String
        stats: statsArr, //Array
    }, err => {
        if (err) {
            res.status(404).send(err)
            return;
        }
        res.send("It did edit")
    })
})

//delete request using DELETE and a PARAMETER (id)
app.delete('/citizen/:id', (req, res) => {

    // You can use findOneAndDelete({_id:})
    // or
    // You can use findByIdAndDelete(id)
    //see https://mongoosejs.com/docs/api.html#model_Model.findByIdAndDelete
    Citizen.findByIdAndDelete(req.params.id, err => {
        if (err) {
            res.status(404).send(err)
            return
        }
        res.send("Citizen deleted")
        console.log(`Citizen with id ${req.params.id} is now deleted`)
        // console.log("Citizen with id "+req.params.id + "is now deleted")
    })
})

//start the server
app.listen(port, () => {
    //change the link to your database
    mongoose.connect('mongodb+srv://admin:iJMZw39o0usM6zyk@citizenapi.8uzbm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').
    catch(error => console.log(error));
    console.log(`Example app listening at http://localhost:${port}`)
})



