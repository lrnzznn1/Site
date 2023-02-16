const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    },
    surname: {
    type: String,
    required: true,
    },
    email: {
    type: String,
    required:true,
    },
    password: {
    type: String,
    required:true        
    },
    Is_tutor: {
    type:Boolean,
    default:false
    },
    universita_seguite: [String],
    Is_Admin: {
    type:Boolean,
    default:false
    }
    
});

const User = mongoose.model("users", UserSchema);
module.exports = User;