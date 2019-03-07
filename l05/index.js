var express = require("express");

var app = express();

var port = (process.env.PORT || 8080);

app.use("/",
        express.static("./home/ubuntu/workspace/l05"))
//        express.static(__dirname+  "./public"))

app.get("/time", (request, response) => 
   {
     response.send(new Date());
    }
);

app.listen(port, () => {
    console.log("Server TRULY ready!", port);
});