import express from "express";
// port means server lai listen garnu ko lagi use hunxha
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import fileUpload from 'express-fileupload';
import mongoose from "mongoose";
const app = express();
const port = 5000;
app.use(express.json());

mongoose.connect('mongodb+srv://Anuj:Anuj2005@anujapi.pcejgp8.mongodb.net/BuyZon')
.then((val)=>{
    app.listen(port,()=>{
    console.log('database connected and server is running'); 
})

}).catch((err)=>{
    console.log(err);
})

app.use(fileUpload({
  limits: { fileSize: 5 * 1024 * 1024 },
}));


app.use(productRoutes);
app.use(userRoutes);
