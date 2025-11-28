import Product from "../models/Product.js";
import fs, { stat } from 'fs';
export const getProducts = async (req, res) => {
   try {
    const products = await Product.find({});
    return res.status(200).json({
        status: 'success',
        data: products
    })
    
   } catch (error) {
     return res.status(400).json({
        status: 'error',
        data: err.message
     })
   }
    
}

export const getProduct = (req, res) =>{
    return res.status(200).json({data: 'get single product'});
}

export const createProduct = async (req,res) =>{
    const {title, detail,image, price} = req.body ?? {};
        console.log(req.imagePath);
    try {
        await Product.create({
            title,
            detail,
            image: req.imagePath,
            price
        });

        return res.status(201).json({
            status: 'success',
            data: 'product successfully added'
        })
    } catch (err) {

        fs.unlink(`./uploads/${req.imagePath}`,(error)=>{
            return res.status(400).json({
            status: 'error',
            data: err.message
        })
        });
    }
}


export const updateProduct = (req, res) =>{
    return res.status(200).json({data: 'update product'});
}

export const deleteProduct = async (req,res) => {
    try {
        const isExist = await Product.findById(req.id);
        if(!isExist)
            return res.status(400).json({
                status: 'error',
                data: 'product does not exist'
            })
        
            fs.unlink(`./uploads/${isExist.image}`, async  (err)=>{
                await isExist.deleteOne();
                return res.status(200).json({
                    status: 'success',
                    data: 'product successfully deleted'
                })
            });

    } catch (err) {
        return res.status(500).json({
            status: 'error',
            data: err.message
        })
    }

}