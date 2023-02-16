const mongoose = require("mongoose");
const { Schema } = mongoose;

const mongoAtlasUri =
    "mongodb+srv://antbucc:test1234@cluster0.szazbxv.mongodb.net/test?retryWrites=true&w=majority";

try {
    // Connect to the MongoDB cluster
    mongoose.connect(
        mongoAtlasUri,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => console.log(" Mongoose is connected"),
    );
} catch (e) {
    console.log("could not connect");
}

const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));


// Student Schema Definition
const schema = new Schema({ name: 'string', surname: 'string',email:'string',password:'string',Is_tutor: 'Boolean' });
const Student = mongoose.model('Student', schema);

//new student added to the DB
const student = new Student({ name: 'Lorenzo', surname: 'Masellinio ',email:'lorenzo.mase@studenti.unitn.it',password:'12345678',Is_tutor: 'false'  });
student.save(function (err) {
    if (err) return handleError(err);
    // saved!
    console.log("Student added");
});

const express = require('express') 
const app = express() 
const port = 3000  
app.get('/', (req, res) => {     res.send('Hello World!') })  
app.listen(port, () => { console.log('Example app listening on port ${port}') })