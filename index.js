var app = require('./App')

const port = process.env.PORT || 3050;



app.listen(port, () => {
    console.log('server running on port:', port);
})