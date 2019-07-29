const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const productSchema = mongoose.Schema({
 name: {type: String, required: true, unique: true},
 image: {type: String, required: true},
 seller: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
 price: {type: Number, required: true},
 size: {type: String ,enum:['XS','Small','Medium','Large','XL','XXL','Unknown'] , default:'Unknown'},
 condition: {type: String , enum: ['New','Used','Unspecified'] , default:'Unspecified'},
 category: {type: String , enum: ['TBD'], default:'TBD'},
 date: {type: Date, default: Date.now},
 lastShare: {type:Date , default:Date.now},
 tags: {type:Array , required:true}
});

productSchema.plugin(uniqueValidator);

module.exports=mongoose.model('Product', productSchema);
