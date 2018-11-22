
var escrowControler = require("../../controler/escrowControler")

module.exports = (app) => {





    // add currency (BTC , etc )
    app.post('/api/add/currency', escrowControler.addCurrency)

    app.get('/api/getAllCurrency', escrowControler.getAllCurrency)



    // start ascrew process
    app.post('/api/startEscrowProcess', escrowControler.startProcess)

    
    app.post('/api/get/escrowForm/Detail' ,escrowControler.escrowFormDetail )







}