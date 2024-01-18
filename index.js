// https://api.github.com/users/mo-jo-dev/repos?page=1
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const PORT = 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const startServer = async () => {
    const res = await axios.get(`https://api.github.com/users/mo-jo-dev`);
    // res.data.objects.forEach(i => {
    //     console.log(i);
    // });
    console.log(res);
    app.listen(PORT,() => {
        console.log(`SERVER STARTED IN PORT: ${PORT}`);
    })
}

startServer();
