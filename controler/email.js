
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const OAuth2 = google.auth.OAuth2;


const oauth2Client = new OAuth2(
    "1063247534350-lmgnqtt48kpav0akni19vko0nccea0g7.apps.googleusercontent.com",
    "35dDtHk2rX8BETJmafwwj7Dw", // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
);


oauth2Client.setCredentials({
    refresh_token: "1/RTImtpEkF5o2KYXRFbtrjatXFJzlkV0dI2ZR5hN_bzdckdEKhRY0_kHaZMwLvCKb"
});

const accessToken = oauth2Client.refreshAccessToken()
    .then(res => res.credentials.access_token);





const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: "siddimuaz@gmail.com",
        clientId: "1063247534350-lmgnqtt48kpav0akni19vko0nccea0g7.apps.googleusercontent.com",
        clientSecret: "35dDtHk2rX8BETJmafwwj7Dw",
        refreshToken: "1/RTImtpEkF5o2KYXRFbtrjatXFJzlkV0dI2ZR5hN_bzdckdEKhRY0_kHaZMwLvCKb",
        accessToken: accessToken
    }
});

//<img src="logo.png" style="height: 30%;width: 30%" alt="Coin Grace" href="./logo.png">







async function sendEmail(mailOptions) {
    
    var resp;
    var some = smtpTransport.sendMail(mailOptions)

    await some.then(res => {
        resp = true
    })
        .catch(err => {
            resp = false
        })
    return resp
}


module.exports = sendEmail