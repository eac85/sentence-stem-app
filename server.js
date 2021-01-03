const express = require('express');
const bodyParser = require('body-parser')
const routes = require('./routes/routes')
const path = require('path');
var cors = require('cors');
const app = express();
const port = 3002;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

routes(app);

// Start the server
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);

    console.log(`Server listening on port ${server.address().port}`);
});
