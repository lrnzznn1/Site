const mongoose = require('mongoose');
const UniSchema = new mongoose.Schema({
    UniName: {
    type: String,
    required: true
    },
    MIURcode: {
    type: Number,
    required:true
    },
    Location: {
    type:String, 
    },
    DgCourse: [String],
    Tutor: [String],
    StudentsNumber: {
        type:Number
    }

});


const Uni = mongoose.model("universit√†", UniSchema);
module.exports = Uni;
