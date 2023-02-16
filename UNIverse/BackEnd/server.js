const dotenv = require('dotenv').config;
const express=require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const app=express();
mongoose.set('strictQuery', false);
app.use(express.json());
const unis = require('./routes/universita'); //to import the routes
app.use('/', unis); //to use them via express.
const users = require('./routes/user'); //to import the routes
app.use('/', users); //to use them via express.
const chats = require('./routes/chat'); //to import the routes
app.use('/', chats)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/*const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());*/

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log ('Your port is listening on port ' + listener.address().port)
})

//establish connection to database
mongoose.connect('mongodb+srv://Admin:test123@cluster0.54xibxu.mongodb.net/?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true },(err) => {
if (err) return console.log("Error: ", err);
    console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
}
);
