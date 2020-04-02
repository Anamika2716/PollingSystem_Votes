const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const optionsSchema = new Schema({


    //ref for question Id
    questionId:{
        type:Number,
        required:true
    },
    id:{
        type:Number,
        required:true
    },
    text:{
        type:String,
        required: true
    },
    vote:{
        type:Number,
        default:0
    },
    vote_link: {
        type: String,
        required:true
    }

});
module.exports = mongoose.model('options', optionsSchema);
