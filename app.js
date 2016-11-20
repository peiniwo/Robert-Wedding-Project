'use strict'
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();
var port = process.env.PORT || 3030;
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'peinihwang128@gmail.com', // Your email id
        pass: 'peinihwang0325' // Your password
    }
});
app.get('/', function(request, response) {
  response.send('Hello World!')
});
app.post('/contact', function (req, res) {
    var text = 'You have new message from contact form\n=============================\n' +
        '\nFirstName: ' + req.body.firstName +
        '\nLastName: ' + req.body.lastName +
        '\nPhone: ' + req.body.phone +
        '\nEmail: ' + req.body.email +
        '\nComments: ' + req.body.comments +
        '\nEventType: ' + req.body.eventType +
        '\nEventDate: ' + req.body.eventDate +
        '\nEventLocation: ' + req.body.eventLocation +
        '\nTalent: ' + req.body.talent +
        '\nEventStart: ' + req.body.eventStart +
        '\nEventDuration: ' + req.body.eventDuration;
    var mailOptions = {
        from: req.body.firstName + ' ' + req.body.lastName + ' ' + req.body.email,
        to: 'peiniwo@gmail.com',
        subject: 'Booking Request: Robert Chang Wedding', // Subject line
        text: text
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.send({
                success: false,
                message: 'There was an error while submitting the form. Please try again.'
            });
        }
        res.send({
            success: true,
            message: 'Contact form successfully submitted. Thank you, we will get back to you soon!'
        })
    });
})
app.listen(port, function () {
    console.log('Server running on port ' + port);
});
