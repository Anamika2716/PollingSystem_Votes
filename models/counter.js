const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const counterSchema = new Schema({

   _id:mongoose.Schema.Types.ObjectId,
    //to store the last ID seperatley of question and options
    Idof:{
       type:String,
        required: true
    },
    id:{
        type:Number,
        required:true,
        default:0
    }

});
module.exports = mongoose.model('counter', counterSchema);
