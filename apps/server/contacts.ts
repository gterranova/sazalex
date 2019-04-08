import * as express from 'express';

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: 'mail.eventbabel.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'info@terranovanet.it',
        pass: '*********'
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take messages');
    }
});

export const contactsRoutes = () => {
    var contactsRouter = express.Router();

    // Catch all other routes and return the index file
    contactsRouter.post('/', (req, res) => {
        //res.sendFile(join(contactsPath, 'index.html'));
        const { name, email, phone, subject, message, privacy } = req.body;
        const content = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\nMessage:\n${message}\nPrivacy consent: ${privacy}`;
        var mail = {
            from: 'info@terranovanet.it',
            to: 'g.terranova@sazalex.com',  //Change to email address that you want to receive messages on
            subject: 'New Message from Contact Form',
            text: content
        }

        transporter.sendMail(mail, (err, data) => {
            if (err) {
                res.json({
                    msg: 'fail'
                })
            } else {
                res.json({
                    msg: 'success'
                })
            }
        });
    });
    return contactsRouter;
};
