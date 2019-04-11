var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var port = (process.env.PORT || 1607);
var BASE_API_PATH = "/api/v1";

var app = express();

app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname,"public")));

//Inicialización del Array
var contacts = [
        { 
            "name" : "pablo",
            "phone" : 1234   
        },
        { 
            "name" : "pepe",
            "phone" : 5678   
        }
    ];


//GET a la Ruta Base
app.get(BASE_API_PATH+"/contacts",(req,res)=>{
    console.log(Date() + " - GET /contacts");
    res.send(contacts);
});


//POST a la Ruta Base
app.post(BASE_API_PATH+"/contacts",(req,res)=>{
    console.log(Date() + " - POST /contacts");
    
    var contact = req.body;
    
    var filteredContacts = contacts.filter( (c) => {
            return (c.name==contact.name);
        }
    );
    
    if(filteredContacts.length) {
        res.sendStatus(409);
    } else {
        contacts.push(contact);
        res.sendStatus(201);    
    }
    
});


//PUT a la Ruta Base
app.put(BASE_API_PATH+"/contacts",(req,res)=>{
    console.log(Date() + " - PUT /contacts");
    res.sendStatus(405);
});


//DELETE a la Ruta Base
app.delete(BASE_API_PATH+"/contacts",(req,res)=>{
    console.log(Date() + " - DELETE /contacts");
    contacts = [];
    res.sendStatus(200);
});


//GET a Recurso Concreto
app.get(BASE_API_PATH+"/contacts/:name",(req,res)=>{
    var name = req.params.name;
    console.log(Date() + " - GET /contacts/"+name);
    
    var filteredContacts = contacts.filter((c)=>{
            return (c.name == name);
        }
    );
    
    if(filteredContacts.length > 0){
        res.send(filteredContacts[0]);    
    } else {
        res.sendStatus(404);
    }
    
});


//DELETE a Recurso Concreto
app.delete(BASE_API_PATH+"/contacts/:name",(req,res)=>{
    var name = req.params.name;
    var found = false;
    
    console.log(Date() + " - DELETE /contacts/"+name);
    
    contacts = contacts.filter((c)=>{
        if(c.name==name) found=true;
        return (c.name != name);
    });
    
    if(found){
        res.sendStatus(200);
    } else {
        res.sendStatus(404);    
    }
    
});


//POST a Recurso Concreto
app.post(BASE_API_PATH+"/contacts/:name",(req,res)=>{
    var name = req.params.name;
    console.log(Date() + " - POST /contacts/"+name);
    res.sendStatus(405);
});


//PUT a Recurso Concreto
app.put(BASE_API_PATH+"/contacts/:name",(req,res)=>{
    var name = req.params.name;
    var contact = req.body;
    
    console.log(Date() + " - PUT /contacts/"+name);
    
    if(name != contact.name){
        res.sendStatus(409);
        console.warn(Date()+" - Hacking attempt!");
        return;
    }
    
    contacts = contacts.map((c)=>{
        if(c.name == contact.name)
            return contact;
        else
            return c;
    });
    
    res.sendStatus(200);
});


app.listen(port,()=>{
    console.log("Server ready on port "+port+"!");
}).on("error",(e)=>{
    console.log("Server NOT READY:"+e);
});

console.log("Server setting up...");