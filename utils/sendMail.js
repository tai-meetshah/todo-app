const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const teamEmails = ['sales@dollarempirellc.com', 'buyer@dollarempirellc.com'];

const sendWelcome = function (to, name) {
    const msg = {
        to,
        from: {
            name: process.env.SENDER_NAME,
            email: process.env.SENDGRID_FROM,
        },
        bcc: teamEmails,
        templateId: 'd-9dfdafd4bcb04dd0ac45bbb69e298652',
        dynamic_template_data: { name },
    };

    sgMail.send(msg).catch(error => console.log(error.response.body));
};

const sendOrderConfirmation = async function (to, data) {
    try {
        const msg = {
            to,
            from: {
                name: process.env.SENDER_NAME,
                email: process.env.SENDGRID_FROM,
            },
            templateId: 'd-1ae03cd5eb15435e990f65d4325b70f0',
            dynamic_template_data: data,
        };

        const teamMsg = {
            ...msg,
            to: teamEmails,
            dynamic_template_data: { ...data, toTeam: true },
        };

        await Promise.all([sgMail.send(msg), sgMail.send(teamMsg)]);
    } catch (error) {
        console.log(error.response.body);
    }
};

const sendOtp = function (to, otp) {
    const msg = {
<<<<<<< HEAD
        to,
        from: {
            name: process.env.SENDER_NAME,
            email: process.env.SENDGRID_FROM,
        },
        subject: 'Reset Password',
        html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:900px;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                <div style="border-bottom:1px solid #eee">
                    <a href="" style="font-size:1.4em;color: #921CAF;text-decoration:none;font-weight:600">Dollar Empire</a>
=======
      to,
      from: {
        name: process.env.SENDER_NAME,
        email: process.env.SENDGRID_FROM,
      },
      subject: "Reset Password",
      html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:900px;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                <div style="border-bottom:1px solid #eee">
                    <a href="" style="font-size:1.4em;color: #921CAF;text-decoration:none;font-weight:600">Football Recruitment</a>
>>>>>>> 431f3f6c1603b243346ddac0284bd6378eec011b
                </div>
                <p style="font-size:1.1em">Hi,</p>
                <p>Use the following OTP to reset your password. OTP is valid for 5 minutes.</p>
                <h2 style="background: #921CAF;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
<<<<<<< HEAD
                <p style="font-size:0.9em;">Regards,<br />Dollar Empire</p>
                <hr style="border:none;border-top:1px solid #eee" />
                <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                    <p>Dollar Empire</p>
=======
                <p style="font-size:0.9em;">Regards,<br />Football Recruitment</p>
                <hr style="border:none;border-top:1px solid #eee" />
                <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                    <p>Football Recruitment</p>
>>>>>>> 431f3f6c1603b243346ddac0284bd6378eec011b
                    <p>4423 E Bandini Blvd.</p>
                    <p>Vernon,</p>
                    <p>Ca 90058, USA</p>
                </div>
                </div>
            </div>`,
    };
    sgMail.send(msg).catch(error => console.error(error));
};

const sendLink = function (to, link) {
    const msg = {
        to,
        from: {
            name: process.env.SENDER_NAME,
            email: process.env.SENDGRID_FROM,
        },
        templateId: 'd-b09ba651def64f53bb868e09f7b53c67',
        dynamic_template_data: { link },
    };

    sgMail.send(msg).catch(error => console.log(error.response.body));
};

const sendError = function (error) {
    const msg = {
        to: 'nik.theappideas@gmail.com',
        from: {
            name: process.env.SENDER_NAME,
            email: process.env.SENDGRID_FROM,
        },
        subject: 'Error message',
        html: `<div>${error}</div>`,
    };
    sgMail.send(msg).catch(error => console.error(error));
};

module.exports = {
    sendWelcome,
    sendOrderConfirmation,
    sendOtp,
    sendLink,
    sendError,
};
