'use strict'
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const env = process.env.NODE_ENV || 'development';
const port = env === 'development' ? 3030 : process.env.PORT;
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'peiniwo121@gmail.com', // Your email id
        pass: 'Yellow0325NiNi!' // Your password
    }
});

app.post('/contact', function (req, res) {
    const text = 'You have new message from contact form\n=============================\n' +
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
    const mailOptions = {
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
