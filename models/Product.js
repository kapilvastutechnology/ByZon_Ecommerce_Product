import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title:{
    type: String,
    unique: true,
    required: true
  },

  detail: {
    type: String,
    required: true
  },
  
  image:{
    type:String,
    required: true
  },

  price: {
    type: Number,
    required: true
  }

}, {timestamps:true});

const Product = mongoose.model('Product', productSchema);

export default Product;