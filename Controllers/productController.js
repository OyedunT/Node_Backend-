const {cloudinary} = require("../Config/cloudinaryConfig");
const productModel = require("../Models/productModel");

const createProduct = async (req, res) => {
  const {
    ProductName,
    ProductDescription,
    ProductPrice,
    ProductImage,
    ProductCategory,
  } = req.body;

  if (
    !ProductName ||
    !ProductDescription ||
    !ProductPrice ||
    !ProductImage ||
    !ProductCategory
  ) {
    res.status(400).send({ message: "All  fields are required" });
  } else {
    try {
      const imageUpload = await cloudinary.uploader.upload(ProductImage, {folder : 'productImage'})

      const productLink = imageUpload.secure_url;
      console.log("product Link :", productLink);
      const createProduct = await productModel.create({
          ProductName,
          ProductDescription,
          ProductPrice,
          ProductImage: productLink,
          ProductCategory
      });
      if (createProduct){
      res.status(200).send({ message: "Product craeted Successfully", status: true});
      }else{
      res.status(400).send({ message: "Server error", error });
      }
    } catch (error) {
      res.status(400).send({ message: "unable to post product", error });
      console.log('server error :', error)
    }
  }
};


const getList = async (req, res)=> {
  try {
      const productList = await productModel.find()
      if (!productList) {
          res.status(400).send({message:"unable to fetch products" , status:"false"})
      }else {
          res.status(200).send({message:"products fetched successfully" , status:"okay" , data:productList})
          console.log('product list', productList);
      }
      
  } catch (error) {
      res.status(400).send({message:"internal server error"})
      console.log('server error', error);
  }

}


const getProductById = async (req, res) => {
  const id = req.params.id 
  if(!id){
    res.status(400).send({message:'id is not provided'})
  }else{
    try {
        const product = await productModel.findById(id)
        if (!product) {
            res.status(400).send({message:"product not found" , status:'false'} )
            
        }else {
            console.log('product found:', product);
            res.status(200).send({message:"product successfully fetched", status:"okay", product})
        }
    } catch (error) {
        res.status(400).send({message:"internal server error" } )
        console.log('server error', error);
    }
  }
};

module.exports = { createProduct };
