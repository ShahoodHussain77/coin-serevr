var app = require('./App')

const port = process.env.PORT || 3050;
var cors = require('cors')

app.use(cors())


app.listen(port, () => {
    console.log('server running on port:', port);
})
