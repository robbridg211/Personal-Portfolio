var express = require("express");
var path = require("path");
var app = express();



// var config = require("./config/secrets");
// var emailPassword = config.emailPassword;
require('dotenv').config({path: path.join(__dirname, '.env')})
var emailPassword = process.env.DB_PASS


//FORM DATA server side

var cors = require("cors");
var bodyParser = require('body-parser');
var nodemailer = require("nodemailer");
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());


//////////////////////////////////////


//now angular ponts to this for static files directory
app.use(express.static( __dirname + '/public/dist/public' ));


/////////////// NODEMAILER ////////////////

app.post('/sendmail', (req, res) => {
    let user = req.body
    const output = `
      <h2>Contact Us Details</h2>
      <hr style="margin-right:200px">
      <ul>  
        <li>Name: ${user.name}</li>
        <br>
        <li>Email: ${user.email}</li>
        <br>
        <li>Company: ${user.company}</li>
        </ul>
      <hr style="margin-right:200px">
      <h2>Message</h2>
      <p style="border: 2px solid steelblue; padding:25px; margin-right:200px">${user.message}</p>
    `;
  
    console.log("FROM SERVER: ", output)
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
          user: 'rob.bridgeman@gmail.com', 
          pass: emailPassword
      },
      tls:{
        rejectUnauthorized:false
      }
    });
  
    // setup email data with unicode symbols
    let mailOptions = {
        from: user.email, // sender address
        to: '"Robert Bridgeman", <rob.bridgeman@gmail.com>', // list of receivers
        subject: `Job Opportunity from ${user.company}`, // Subject line
        html: output // html body
    };
    console.log(mailOptions);
    // send mail with defined transport object
    console.log("Sending Mail server side!");
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Mail sent successfully! ! !')
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
    });
  });


//brings everything necessary over to routes.js
require('./server/config/routes')(app);


app.listen(8000, function() {
    console.log("listening on port 8000");
   });




