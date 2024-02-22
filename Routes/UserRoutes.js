const express = require ("express")
const {signUp, Login, Editacc, DeleteAccount, getCurrentUser, getOtp} = require("../Controllers/UserController")
const verifyToken = require("../Middlewares/VerifyToken")




const router = express.Router()

router.post("/sign-up", signUp)
router.post("/login", Login)
router.post("/getOtp", getOtp)
router.post("/getCurrentUser" ,verifyToken , getCurrentUser)


// Private Route
router.put("/editAcc", verifyToken, Editacc)
router.post("/DeleteAccount" , verifyToken, DeleteAccount)


module.exports =router