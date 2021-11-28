//requesting mongooose and Schema so the class can be defined
const mongoose = require('mongoose')
const {Schema} = mongoose;
//setting up the Rules for our class using schema 
const citizenSchema = new Schema({
  
    age: Number, 
    name: String,
    vaccinated: Boolean,
    profession: String,
    stats: Array, 
  })
//defining the name of the constructor for our class
const Citizen = mongoose.model('Citizen', citizenSchema);
//export the class, also called a model or a document, to use in different files
module.exports = Citizen
