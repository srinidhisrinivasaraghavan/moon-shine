var nodemailer = require('nodemailer');
const databaseConfig = require('../config/db');
const db= databaseConfig.db;

var Token = require('../models/token-model').Token;

var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'srinidhiraghavan1993@gmail.com', // Your email id
            pass: 'shyampuff' // Your password
        }
    });

module.exports.sendEmail =function(subject, body, email,entityId){
require('crypto').randomBytes(48, function(err, buffer) {
    var token = buffer.toString('hex');
    var TOKEN = new Token();
    TOKEN.entityId=entityId;
    TOKEN.tokenValue=token;
    TOKEN.save(function(err, savedToken){
            if(err){
                console.log('error while saving Token');
            }
        });
  //var text = 'Please click on link to confirm account '+ URL +'/entity/'+entityId+'/confirm/'+token;//+'/entity/'+entityId+'/confirm/'+token;
  var mailOptions = {
    from: 'srinidhiraghavan1993@gmail.com', // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    text: body+token //, // plaintext body
    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
    };
    transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    };
});

});
}