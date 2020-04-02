const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({


    _id:mongoose.Schema.Types.ObjectId,
    id:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required: true
    },
    //array of options Id
   options:{
        type:Array,
   }

});
module.exports = mongoose.model('questions', questionSchema);
