const nodemailer = require('nodemailer');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendCustomEmail = async (toEmail, companyName, trackingId) => {
    try {
        const EMAIL_SUBJECT = `Invitation for Placement Drive - ${companyName}`;

        // 1. Read the HTML
        const templatePath = path.join(__dirname, '../templates/inviteTemplate.html');
        let htmlTemplate = await fs.readFile(templatePath, 'utf-8');

        // 2. Setup the tracking pixel
        const trackingPixel = `<img src="http://localhost:3000/api/track/${trackingId}" width="1" height="1" style="display:none;" />`;

        // 3. Inject data into the HTML
        htmlTemplate = htmlTemplate.replace(/{{company}}/g, companyName);
        htmlTemplate = htmlTemplate.replace('{{tracking_pixel}}', trackingPixel);

        // 4. Configure the email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: toEmail,
            bcc: 'beauty6394@gmail.com',
            subject: EMAIL_SUBJECT,
            html: htmlTemplate, 
            attachments: [
                {
                    filename: 'NIT_Jamshedpur_Brochure.pdf', 
                    path: path.join(__dirname, '../assets/NIT_Jamshedpur_Brochure.pdf')
                }
            ]
        };

        // 5. Send it
        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent to ${toEmail} [ID: ${info.messageId}]`);
        return true;

    } catch (error) {
        console.error(`❌ Failed to send email to ${toEmail}:`, error.message);
        return false;
    }
};

module.exports = { sendCustomEmail };