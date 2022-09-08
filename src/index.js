const express = require('express');
const routes = require('./routes/routes')

const PORT = 3010;

const app = express();
app.use(express.json());

app.listen(process.env.PORT || 3010, (err) => {
    if (err) {
        console.log("Something bad happened");
    }
    console.log(`server is listening on port: ${process.env.PORT || 3010}`);
});

app.use('/', routes)

module.exports = { app }

