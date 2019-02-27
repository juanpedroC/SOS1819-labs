var cool = require("cool-ascii-faces");

var express = require("express ");

var app = express();
var port = (process.env.PORT || 8080);

app.get("/", (request, response) => 
    {
     response.send(cool());
     console.log("New request received");
    }
);

app.listen(port, () => {
    console.log("Server TRULY ready!");
});

console.log("Server ready");