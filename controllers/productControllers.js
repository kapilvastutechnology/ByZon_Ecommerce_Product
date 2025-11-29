import Product from "../models/Product.js";
import fs from "fs";
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

export const getProduct = async (req, res) =>{

    try {
        const isExist = await Product.findById(req.id);
        if(!isExist)
            return res.status(404).json({
                status:'error',
                data: 'product not found'});
        
        return res.status(200).json({
            status: 'success',
            data: isExist
        })
        
    } catch (err) {
            return res.status(500).json({
                status: 'error',
                data: err.message
            })
    }
}

export const createProduct = async (req,res) =>{
    const {title, detail,image, price} = req.body ?? {};
        
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


export const updateProduct = async (req, res) =>{
  const {title, detail, price} = req.body ?? {};
    try {
    const isExist = await Product.findById(req.id);
        if(!isExist){
            if(req.imagePath){
                fs.unlinkSync(`./uploads/${req.imagePath}`);
                return res.status(404).json({
                    status:'error',
                    data: 'product not found'});
            }else{
                return res.status(404).json({
                    status:'error',
                    data: 'product not found'});
            }
        }

        isExist.title = title || isExist.title;
        isExist.detail = detail || isExist.detail;
        isExist.price = price || isExist.price;
        await isExist.save();
        //update file 

        if(req.imagePath){
            fs.unlink(`./uploads/${isExist.image}`, async (err)=>{
                isExist.image = req.imagePath;
                await isExist.save();
                return res.status(200).json({
                    status: 'success',
                    data: 'product successfully updated'
                })
            });
        }else{
            return res.status(200).json({
                status: 'success',
                data: 'product successfully updated'
            })
        }

    } catch (err) {
        if(req.imagePath){
            fs.unlink(`./uploads/${req.imagePath}`,(error)=>{
                return res.status(500).json({
                    status: 'error',
                    data: err.message
                });
            })
        }else{
            return res.status(500).json({
            status: 'error',
            data: err.message
        });

        }
    }
}


export const deleteProduct = async (req,res) => {
    try {
        const isExist = await Product.findById(req.id);
        if(!isExist)
            return res.status(400).json({
                status: 'error',
                data: 'product does not exist'
            });
        
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