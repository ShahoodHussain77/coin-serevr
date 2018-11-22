const escrow = require("../models/escrow/escrowProcess")
const curreny = require("../models/escrow/currenySchema")
const email = require("./email")
const crypto = require('crypto')


module.exports = {

    startProcess: (req, resp, next) => {

        var buyerEmail = req.body.buyerEmail
        var sellerEmail = req.body.sellerEmail


        let saltlength = 32;
        let keylength = 10;
        let password = buyerEmail + sellerEmail;

        let salt = crypto.randomBytes(saltlength).toString('hex');
        let key = crypto.pbkdf2Sync(password, salt, 1000, keylength, 'sha512').toString('hex');
        let pass = crypto.pbkdf2Sync(key, salt, 1000, keylength, 'sha256').toString('hex');



        escrow.create(req.body)
            .then((res) => {





                escrow.findByIdAndUpdate({ _id: res._id }, { $set: { transactionKey: key, passKey: pass } }, function (err, doc) {
                    if (err) {
                        res.send({ message: 'Error', response: false, })
                    }

                    var output = `<div style="padding-bottom: 5%; background: #497c93; font-family: Comic Sans MS; color: white">
                <div style="padding-top: 5%;padding-bottom: 5%;width: 100%;text-align: center;">
                    <!-- <img src="logo.png" style="height: 10%;width: 12%" alt="Coin Grace"> -->
                    <div>Coin Grace</div>
                </div>
                <center>
                    <form style=" width: 50% ;  background: white ; border-radius: 10px">
                    <img src="https://cdn.pixabay.com/photo/2014/04/03/11/50/coin-312284_960_720.png" style="padding-top: 5%;height: 30%;width: 30%" alt="Coin Grace" href="./logo.png">
                        <div style="color: black;width: 80%;">In order to start using your Coin Grace account, you need to use these keys </div>
                        <div style="color: black;width: 100%;margin-top: 5%">Transiction Key : ${key} </div>
                        <div style="color: black;width: 100%;">Pass Key : ${pass}</div>
                        <button style="    margin-top: 5%;margin-bottom: 5%;width: 90%;color: white;background: #01a7f0;padding: 5%;border-radius: 12px;border: none; font-family: Comic Sans MS;">Start using your Account </button>
                        <div style="color: gray;width: 100%; font-size: 12px; padding-bottom: 5%">If you did not signup for this account you can ignore this email and the
                            <br/>account will be deleted soon</div>
                    </form>
                </center>
                <div style="color: white; font-size: 12px; padding-top: 12px ; text-align: center">Want to invite more firends? Click now</div>
                <div style="color: white; font-size: 12px; padding-top: 12px ; text-align: center">More information visit www.coingrace.com</div>
                <div style="color: white; font-size: 12px; padding-top: 12px ; text-align: center">feel free to contact us at any time on info@coingrace.com</div>
                </div>`
                    var emails = buyerEmail + ',' + sellerEmail
                    const mailOptions = {
                        from: "coin grace",
                        to: emails,
                        subject: "Activation Keys",
                        generateTextFromHTML: true,
                        html: output
                    };
                    email(mailOptions)
                        .then((response) => {
                            if (response === true) {
                                resp.status(200).json({
                                    error: false,
                                    message: 'Email sent successfully'
                                })
                            }
                            else {
                                resp.status(200).json({
                                    error: true,
                                    message: 'Invalid email'
                                })
                            }
                        })
                })
            })
            .catch((err) => {
                resp.status(404).json({
                    error: true,
                    message: "can not create transiction "
                })
            })
    },







    addCurrency: (req, res, next) => {
        var data = req.body
        curreny.create(data)
            .then((response) => {

                if (response !== null) {
                    var id = response._id.toString()
                    var currencyid = id.slice(id.length - 5)
                    curreny.findByIdAndUpdate({ _id: response._id }, { $set: { currencyId: currencyid } }, function (err, doc) {
                        if (err) {
                            res.send({ message: 'Error', response: false, })
                        }
                    })
                    res.send({ message: 'currency added', response: true, })
                }
            })
            .catch((err) => {
                res.send(err)
            })
    },



    getAllCurrency: (req, res, next) => {
        curreny.find()
            .then((response) => {
                res.send(response)
            })

            .catch((err) => {
                res.send(err)

            })
    }
}