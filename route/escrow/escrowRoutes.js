
var escrowControler = require("../../controler/escrowControler")

module.exports = (app) => {





    // add currency (BTC , etc )
    app.post('/api/add/currency', escrowControler.addCurrency)



    // start ascrew process
    app.post('/api/startEscrowProcess', escrowControler.startProcess)






}