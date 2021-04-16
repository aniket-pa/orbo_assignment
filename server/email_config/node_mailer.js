const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

var transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: process.env.email,
      pass: process.env.password
       }
  });
 
   function sendEmail(content,tomail){

    var mailOptions = {
      from: 'sunitaanilpatil@outlook.com',
      to: tomail,
      subject: 'Verify email',
      text: ' Dear Sir/Madam ',
      html: content
    };

    return new Promise((resolve,reject)=>{

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          reject(false)
        } else {
          console.log('Email sent: ' + info.response);
          resolve(true);
        }
      });

      
    })
 

}


module.exports= sendEmail;