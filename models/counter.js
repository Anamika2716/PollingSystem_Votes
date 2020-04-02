const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const counterSchema = new Schema({

    _id:mongoose.Schema.Types.ObjectId,
    id:{
        type:Number,
        required:true,
        default:0
    }

});
module.exports = mongoose.model('counter', counterSchema);
