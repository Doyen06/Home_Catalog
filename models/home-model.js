const mongoose = require("mongoose");

const Schema   =  mongoose.Schema;

const homeSchema =  new Schema({
    insuranceCompany: String,
    insurancePhone: String,
    agentName: String,
    insurancePolicy: String,
    homePicture: String,
});

const Home = mongoose.model('Home', homeSchema);

module.exports = Home;
