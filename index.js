var express = require("express");

var app = express();
const port = process.env.PORT || 8080;


app.get("/", (req,res) =>{
    console.log("New request!");
    res.send("<html><h1>Vendo Opel Corsa</h1></html>");
});

app.listen(port, () => {
    console.log("Ready in port "+port);
});