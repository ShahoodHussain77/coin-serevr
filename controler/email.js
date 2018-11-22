
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const OAuth2 = google.auth.OAuth2;


const oauth2Client = new OAuth2(
    "1030721971064-jem2tociul7g1p9da20cml4stqgumejb.apps.googleusercontent.com",
    "rcWEQBk8XUCSdFLlf1P9xXnF", // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
);


oauth2Client.setCredentials({
    refresh_token: "1/NcIXU1klvPf_4dPLlkud6N0MR92qH7159E9quN4D43A"
});

const accessToken = oauth2Client.refreshAccessToken()
    .then(res => res.credentials.access_token);





const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: "no-reply@coingrace.com",
        clientId: "1030721971064-jem2tociul7g1p9da20cml4stqgumejb.apps.googleusercontent.com",
        clientSecret: "rcWEQBk8XUCSdFLlf1P9xXnF",
        refreshToken: "1/NcIXU1klvPf_4dPLlkud6N0MR92qH7159E9quN4D43A",
        accessToken: accessToken
    }
});
  
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