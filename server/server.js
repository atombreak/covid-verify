

const path = require('path');
const express = require("express");

const app = express();
const port = 9000 || process.env.PORT

app.use(express.static(path.join(__dirname,'..','build')));

app.all('*', (req,res) => {
    res.sendFile(path.join(__dirname,'..',"build/index.html"));
})

app.listen(port);