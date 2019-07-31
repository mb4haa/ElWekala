const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const productSchema = mongoose.Schema({
    name: { type: String, required: true, unique: false },
    image: { type: String, required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    price: { type: Number, required: true },
    size: { type: String, enum: ['XS', 'Small', 'Medium', 'Large', 'XL', 'XXL'], default: 'Small' },
    condition: { type: String, enum: ['New', 'Used', 'Unspecified'], default: 'Unspecified' },
    category: { type: String, default: 'TBD' },
    date: { type: Date, default: Date.now },
    lastShare: { type: Date, default: Date.now },
    tags: { type: Array, required: true },
    likes: { type: Number, default: 0 },
    sellerName:{type:String, required:true,default:''},
    sellerEmail:{type:String,required:true,default:''},
    shares:{type:Number,default:0},
    comments:{type:Array,default:[]},
    description:{type:String,default:""}
});

productSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Product', productSchema);
