const nodemailer = require('nodemailer');

const sendMail = async(FullName, Email)=>{
 const contactTemplate  = `<div>
   <h2 style="color: #00a859;">Welcome to Stackplus Technology</h2>
 <ul>
   <li>Name: ${FullName}</li>
   <li>Email: ${Email}</li>
 </ul>
 <div>
   <p>
     Dear ${FullName},
   </p>
   <p>
     Welcome to our community! We are thrilled to have you on board.
   </p>
   <p>
     With your new account, you can explore all the features our website has to offer.
   </p>
   <p>
     If you have any questions or need assistance, feel free to contact us.
   </p>
 </div>
 <p style="color: #00a859;"><i>Stackplus Technology</i></p>
</div>
;`

const transporter = nodemailer.createTransport({
    service : "gmail",
    auth : {
        user : process.env.GOOGLE_EMAIL,
        pass : process.env.GOOGLE_PASSWORD,
    }
})

const mailOptions = {
    from : process.env.GOOGLE_EMAIL,
    to : Email,
    subject : "Welcome To The Community",
    html : contactTemplate,
    text : "Hello World Community"
};

try {
    transporter.sendMail(mailOptions)
   console.log( "Email Sent Successfully")
} catch (error) {
    console.log("Internal sever error");
    throw error;
}
}

const SendOtp = async(Otp, FullName, Email)=>{
    const contactTemplate  = `<div>
      <h2 style="color: brown;">Forget Password Request</h2>
    <ul>
      <li>Name: ${FullName}</li>
      <li>Email: ${Email}</li>
    </ul>
    <div>
      <p>
        Dear ${FullName},
      </p>
      <p>
        We Recieved Your Request For A Password Reset.
      </p>
      <p>
        Your OTP is : ${Otp}
      </p>
      <p>
        If you have any questions or need assistance, feel free to contact us.
      </p>
    </div>
    <p style="color: #00a859;"><i>Stackplus Technology</i></p>
   </div>
   ;`
   
   const transporter = nodemailer.createTransport({
       service : "gmail",
       auth : {
           user : process.env.GOOGLE_EMAIL,
           pass : process.env.GOOGLE_PASSWORD,
       }
   })
   
   const mailOptions = {
       from : process.env.GOOGLE_EMAIL,
       to : Email,
       subject : "Welcome To The Community",
       html : contactTemplate,
       text : "Hello World Community"
   };
   
   try {
       transporter.sendMail(mailOptions)
      console.log( "Email Sent Successfully")
   } catch (error) {
        console.log("Internal sever error",error );
   }
   }
module.exports = {sendMail, SendOtp};