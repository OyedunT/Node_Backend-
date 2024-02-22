const UserModel = require("../Models/UserModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../Models/UserModels");
const {sendMail, SendOtp} = require("../Config/mailer");

let genRandomNum = ()=> {
  let six = ''

  for (let index = 0; index < 6; index++) {
      let randomNum = Math.floor(Math.random() * 10)
      six += randomNum  
    
}
return six
 }

const signUp = async (req, res, next) => {
    const { FullName, Email, Password,  } = req.body;

    if (!FullName || !Email || !Password) {
      res.status(400);
      return next(new Error( "All Field are mandatory"));
    }
  
    const ValidateUser = await UserModel.findOne({ Email });
    if (ValidateUser) {
      res
        .status(403)
        .send({ message: "User Already exist, try logging in to your account" });
    } else {
      try {
        const hashPassword = await bcrypt.hash(Password, 10);
  
        const createUser = await UserModel.create({
          FullName,
          Email,
          Password: hashPassword
          
        });
  
      if (createUser) {
        sendMail(FullName,Email)
        res.status(200).send({
            message: `Account created successfully for ${createUser.FullName}`, status : "success"
          });
         
        }else{
            res
        .status(400)
        .send({ message: "User Already exist, try logging in to your account" });
        }
  
        
      } catch (error) {
        console.log("Error", error);
      }
    }
  };

  const Login = async (req, res) => {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
      res.status(404).send({ message: "All Fields are mandatory" });
      return;
    } else {
      try {
        const validateUser = await UserModel.findOne({ Email });
        if (validateUser) {
          const comparePassword = await bcrypt.compare(
            Password,
            validateUser.Password
          );
  
          // Generate JWT token

          // Use a secure secret key
          let SecretKey = process.env.JWT_SECRET;
          const generateToken = jwt.sign(
            {
              user: {
                FullName: validateUser.FullName,
                Email: validateUser.Email
              },
            },
            // Use a secure secret key
            SecretKey,
            { expiresIn: "1d" } // Token expiration time
          );
  
          if (comparePassword) {
            res.status(200).send({ message: `Welcome ${validateUser.FullName}` , generateToken, status : "success"}); 
          } else {
            res.status(403).send({ message: "Password does not match" });
          }
        } else {
          res.status(403).send({
            message: "Invalid Email, User not found, Try creating an account",
          });
        }
      } catch (error) {
        res.status(403).send({ message: "Internal Server error", error });
      }
    }
  };

  const Editacc = async (req, res) =>{
    const user = req.user;
    console.log("User : ", user)
    
      console.log("User trying to edit account :", user);

      const {FullName, Email, Password} = req.body;
      if (!FullName || !Email || !Password){
        res.status(400).send({message: "All Fields Are Mandatory"});
      }else{
        try {
        const hashPassword = await bcrypt.hash(Password, 10);
          const validateUser = await userModel.findOneAndUpdate({Email: user.Email}, {FullName, Email, Password :hashPassword},
            {new: true})
            if(validateUser){
        res.status(200).send({message: "Account Updated Successfully", status: "success"});
            }else{
        res.status(400).send({message: ""});

            }
        } catch (error) {
      res.status(500).send({message: "Internal serval error"});
          
        }
      }
  };

const getCurrentUser = async (req, res) =>{
  const user = req.user;
  try {
    const fetchCurrentUser =  await userModel.findOne({ Email: user.Email});
       if (fetchCurrentUser){
        const userDetails = {
          FullName: fetchCurrentUser.FullName,
          Email: fetchCurrentUser.Email,
        };
        res.status(200).send({message: "User userDetails", userDetails});
       }
     
  } catch (error) {
    res.status(500).send({message : "Internal Server Error"})
    
  }
};



const DeleteAccount = async(req,res)=> {
  const user = req.user
  if(!user){
      res.status(400).send({message:"Authentication not provided"})
  }else{
      try {
          const userToDelete = await userModel.findOneAndDelete({Email:user.Email})
          if(!userToDelete){
              res.status(400).send({message:"Unable to delete user at the moment" , status:"false"})
          }else{
              res.status(200).send({message:"User successfully deleted" , status:"okay"})
              console.log('deleted user', userToDelete);
          }
          
      } catch (error) {
          res.status(500).send({message:"internal server error" })
          console.log(error);
      }
  }
}


const getOtp = async(req,res)=> {
  const {Email} = req.body
  if (!Email){
      res.status(400).send({message:"email is mandatory"})
  }else{
      try {
      const validateEmail = await userModel.findOne({Email})
      if(!validateEmail){
          res.status(400).send({message:"User doesnt exist"})  
      }else{
        let otp = genRandomNum()
      SendOtp( otp , validateEmail.FullName , Email )
      res.status(200).send({message:"Your OTP has been sent Successfully"}) 
      }
       
      } catch (error) {
          res.status(500).send({message:"internal server error"})  
          console.log(error);
      }
  }
}
  
  module.exports = {signUp, Login, Editacc, DeleteAccount, getCurrentUser, getOtp };