const mongoose = require('mongoose');
const ChatSchema = new mongoose.Schema({
    Sender: {
    type: String,
    required:true
    },
    Receiver: {
    type:String,
    required:true
    },
    Time: {
    type: Date,
    required:true
    },
    Text: {
    type: String,
    required:true
    }
});

const Chat = mongoose.model("Chats", ChatSchema);
module.exports = Chat;
