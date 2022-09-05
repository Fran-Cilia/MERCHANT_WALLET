const express = require('express');
const routes = require('./routes/routes')

const PORT = 3010;

const app = express();

app.use(express.json());

app.use('/', routes)

const lintener = app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is now listening on port ${PORT}`);
})

