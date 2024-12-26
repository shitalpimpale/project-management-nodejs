
// Send Email Notification
exports.sendEmailNotification = (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your_email@gmail.com',
            pass: 'your_email_password',
        },
    });

    const mailOptions = {
        from: 'your_email@gmail.com',
        to,
        subject,
        text,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.log(err);
        else console.log('Email sent: ' + info.response);
    });
};