const express = require("express");
var bodyParser = require('body-parser')
const cors = require("cors");
const newaptsch = require('./schema/appointment')
const mongoose = require("mongoose");
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
let monuRI = "mongodb+srv://desing:desing@cluster0.hbk1a.mongodb.net/"
let DBNAME = "appointment"
mongoose.Promise = global.Promise;
mongoose.connection.on('connected', function() {
    console.log('Connection to Mongo established.');
    if (mongoose.connection.client.s.url.startsWith('mongodb+srv')) {
        mongoose.connection.db = mongoose.connection.client.db(DBNAME);
    }
});
mongoose.connect(monuRI, { dbName: DBNAME, useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }).catch(err => {
    if (err) {

        console.log("TEST", err)
        return err;
    }
})

app.get("/", (req, res) => {
    res.json("Connected");
    res.end();
});

app.get('/allappointment', (req, res) => {
    newaptsch.find().then(result => {
        res.json({ "status": true, "data": result });
        res.end();
    }).catch(e => {
        console.log(e)
        res.json({ "status": false, "Error": e });
        res.end();
    });
})

app.post('/patient', (req, res) => {
    newaptsch.find({ "doctorname": req.body.doctorname }).then(result => {
        res.json({ "status": true, "data": result });
        res.end();
    }).catch(e => {
        console.log(e)
        res.json({ "status": false, "Error": e });
        res.end();
    });
})

app.post("/appointment", (req, res) => {
    aptsch = new newaptsch({
        doctorname: req.body.doctorname,
        speciality: req.body.speciality,
        fee: req.body.fee,
        patientName: req.body.patientName,
        age: req.body.age,
        phonenumber: req.body.phonenumber
    });

    aptsch.save().then(result => {
        res.json({ "status": true, "msg": "Record Insertion Success" });
        res.end();
    }).catch(e => {
        console.log(e)
        res.json({ "status": false, "msg": "Record Insertion UnSuccess", "Error": e });
        res.end();
    })
})
var port = process.env.PORT || 3000;
app.listen(port, (err) => {
    if (!err) {
        console.log("Port is Listening on " + port);
    }
    return err;

})