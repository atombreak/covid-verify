

const path = require('path');
const express = require("express");
const json = require('json-server');

const app = express();
const port = process.env.PORT || 9000;

app.use(express.static(path.join(__dirname,'..','build')));
app.use('/api', json.router(path.join(__dirname,'..','db.json')));

// console.log(path.join(__dirname,'..','db.json'));

app.all('*', (req,res) => {
    res.sendFile(path.join(__dirname,'..',"build/index.html"));
})

app.listen(port);