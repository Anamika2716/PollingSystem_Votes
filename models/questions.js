const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({


    id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required: true
    },
    quantity:{
        type:Number,
        required:true
    }

});
module.exports = mongoose.model('products', productSchema);
