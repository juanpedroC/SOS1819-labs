//CREACIÓN DEL SERVIDOR WEB
var express = require("express");
var app = express();
const port = process.env.PORT || 8080;

//USO DEL PAQUETE BODY-PARSER PARA MOSTRAR CORRECTAMENTE EL JSON
var bodyParser = require("body-parser");
app.use(bodyParser.json());

//CONECTARSE A LA BASE DE DATOS
var beer_stats;
const MongoClient = require("mongodb").MongoClient;
const uri_beer_stats = "mongodb+srv://test:test@sosjpcc-usex1.mongodb.net/test?retryWrites=true";
const client_beer_stats = new MongoClient(uri_beer_stats, { useNewUrlParser: true });


client_beer_stats.connect(err => {
  if(err) console.log("error: " , err);
  beer_stats = client_beer_stats.db("sos-jpcc").collection("beers");
  // perform actions on the collection object
  console.log("Connected!");
});


/*
const uri_suicide_stats = "mongodb+srv://test:test@sos1819-04-afg-ysoip.mongodb.net/test?retryWrites=true";
const client_suicide_stats = new MongoClient(uri_suicide_stats, { useNewUrlParser: true });

const uri_beer_stats = "mongodb+srv://test:test@sos1819-04-afg-ysoip.mongodb.net/test?retryWrites=true";
const client_beer_stats = new MongoClient(uri_beer_stats, { useNewUrlParser: true });

client_happiness_stats.connect(err => {
    
    if(err) console.log("Error:", err);
    happiness_stats = client_happiness_stats.db("sos1819").collection("happiness-stats");
    console.log("Connected!");
  
});
*/

/* JP
  ======================
 |  API REST DE JUAN PEDRO  |
  ======================
*/

//DOCUMENTACION /api/v1/suicide-rates/docs (REDIRIGE A LA DOCUMENTACIÓN DE LA API REST)



//CREACIÓN DEL OBJETO "BeerStat"
var BeerStat = {
    initBeerStat: function(country, year, rating, variation, countryConsumition) {
        this.country = country;
        this.year = year;
        this.rating = rating;
        this.variation = variation;
        this.countryConsumition = countryConsumition;
    }
}


//GET /api/v1/beer-consumed-BeerStats/loadInitialData
app.get("/api/v1/beer-consumed-BeerStats/loadInitialData", (req, res) => {
    
        var beerStat1 = Object.create(BeerStat);
        var beerStat2 = Object.create(BeerStat);
        var beerStat3 = Object.create(BeerStat);
        var beerStat4 = Object.create(BeerStat);
        var beerStat5 = Object.create(BeerStat);
        
        beerStat1.initBeerStat("españa", 2016, 84.8, 2, 3909);
        beerStat2.initBeerStat("alemania", 2016, 104.2, -0.5, 8412);
        beerStat3.initBeerStat("lituania", 2016, 88.7, -8.4, 257);
        beerStat4.initBeerStat("corea del sur", 2016, 42.8, 0.3, 2160);
        beerStat5.initBeerStat("reino unido", 2016, 67.7, 1.6, 4373);
        
        beer_stats.find({}).toArray( (err, beer_stats_array) => {
                
                if (err) console.log("FATAL ERROR !!: ", err);
                
                if (beer_stats_array.length == 0) {
                    
                    beer_stats.insert(beerStat1);
                    beer_stats.insert(beerStat2);
                    beer_stats.insert(beerStat3);
                    beer_stats.insert(beerStat4);
                    beer_stats.insert(beerStat5);
                    console.log("Request accepted, creating new resources in database.");
                    res.sendStatus(201);
                    
                } else {
                    
                    console.log("FATAL ERROR !!: Data Base is not empty.");
                    res.sendStatus(409);
                    
                }
                
            }
        );
    }
);


//GET /api/v1/beer-consumed-BeerStats (DEVUELVE UNA LISTA CON TODOS LOS RECURSOS)
app.get("/api/v1/beer-consumed-BeerStats", (req, res) => {
    
          beer_stats.find({}).toArray( (err, beer_stats_array) => {
                
                if (err) {
                    console.log("FATAL ERROR !! : ", err);
                } else {
                    console.log("Request accepted, sending resources from database.");
                }
                
                res.send(beer_stats_array);
                
            }
        );
    
    }
);

//POST /api/v1/beer-consumed-BeerStats (CREA UN NUEVO RECURSO)
app.post("/api/v1/beer-consumed-BeerStats", (req, res) => {
        
        var newStat = req.body;
        
        beer_stats.find(newStat).toArray( (err, beer_stats_array) => {
            
                if(err) console.log("FATAL ERROR !!: ", err);
                
                if(beer_stats_array == 0){
                    
                    beer_stats.insert(newStat);
                    console.log("Request accepted, creating new resource in database.");
                    res.sendStatus(201);
                    
                } else {
                    
                    console.log("FATAL ERROR !!: Resource already exists in the database.");
                    res.sendStatus(409);
                    
                }
            
            }
        );
        
    }
);

//GET /api/v1/beer-consumed-BeerStats/--reurso-- (DEVUELVE UN RECURSO CONCRETO)
app.get("/api/v1/beer-consumed-BeerStats/:country", (req, res) => {
        
        var country = req.params.country;
        
         beer_stats.find( {"country": country} ).toArray( (err, beer_stats_array) => {
            
                if(err) console.log("FATAL ERROR !!: ", err);
                
                if(beer_stats_array.length  > 0){
                    
                    console.log("Request accepted, sending resource from database.");
                    res.send(beer_stats_array);
                    
                } else {
                    
                    console.log("Request accepted, removing resource of database.");
                    res.sendStatus(404);
                    
                }
            
            }
        );
        
    }
);

//DELETE /api/v1/beer-consumed-BeerStats/--reurso-- (BORRA UN RECURSO CONCRETO)
app.delete("/api/v1/beer-consumed-BeerStats/:country", (req, res) => {
        
        var country = req.params.country;
        var found = false;
        
        beer_stats.find( {"country": country} ).toArray( (err, beer_stats_array) =>{
            
                if(err) console.log("FATAL ERROR: ", err);
                
                if(beer_stats_array.length > 0){
                    
                    beer_stats.remove(beer_stats_array[0]);
                    console.log("Request accepted, removing resource of database.");
                    res.sendStatus(200);
                    
                } else {
                    
                    console.log("FATAL ERROR !!: Resource not found in database.");
                    res.sendStatus(404);
                    
                }
            
            }
        );
        
    }
);

//PUT /api/v1/beer-consumed-BeerStats/--reurso-- (ACTUALIZA UN RECURSO CONCRETO)
app.put("/api/v1/beer-consumed-BeerStats/:country", (req, res) => {
        
        var country = req.params.country;
        var updatedBeerStat = req.body;
        
        beer_stats.find( {"country": country} ).toArray( (err, beer_stats_array) => {
                
                if(err) console.log("FATAL ERROR: ", err);
                
                if(beer_stats_array.length > 0){
                    
                    beer_stats.update( {"country": country}, updatedBeerStat );
                    console.log("Request accepted, updating resource of database.");
                    res.sendStatus(200);
                    
                } else {
                    
                    console.log("FATAL ERROR : Resource not found in database.");
                    res.sendStatus(404);
                    
                }
            
            }
        );
        
    }
);

//POST /api/v1/beer-consumed-BeerStats/--reurso-- (ERROR METODO NO PERMITIDO)
app.post("/api/v1/beer-consumed-BeerStats/:country", (req, res) => {
        
        console.log("<h1>FATAL ERROR !!: Method not Allowed.</h1>");
        res.sendBeerStatus(405);
    }
);

//PUT /api/v1/beer-consumed-BeerStats (ERROR METODO NO PERMITIDO)
app.put("/api/v1/beer-consumed-BeerStats", (req, res) => {
        
        console.log("<h1>FATAL ERROR !!: Method not Allowed.</h1>");
        res.sendBeerStatus(405);
        
    }
);

//DELETE /api/v1/beer-consumed-BeerStats (BORRA TODOS LOS RECURSOS)
app.delete("/api/v1/beer-consumed-BeerStats", (req, res) => {
        
        beer_stats.remove({});
        console.log("<h1>Request accepted, removing all resources of database.</h1>");
        res.sendBeerStatus(200);
    }
);

//SERVIDOR A LA ESCUCHA DE PETICIONES
app.listen(port, () => { console.log("Server Ready and Listen in port", port); });








/*
var contacts = [{
    name: "peter",
    phone: "123456",
    email: "peter@peter.com"
}, {
    name: "paul",
    phone: "3333",
    email: "paul@paul.com"
}];

// GET /contacts/

app.get("/contacts", (req,res)=>{
    res.send(contacts);
});


// POST /contacts/

app.post("/contacts", (req,res)=>{
    
    var newContact = req.body;
    
    contacts.push(newContact)
    
    res.sendBeerStatus(201);
});


// DELETE /contacts/

app.delete("/contacts", (req,res)=>{
    
    contacts =  [];

    res.sendBeerStatus(200);
});


// GET /contacts/peter

app.get("/contacts/:name", (req,res)=>{

    var name = req.params.name;

    var filteredContacts = contacts.filter((c) =>{
       return c.name == name; 
    })
    
    if (filteredContacts.length >= 1){
        res.send(filteredContacts[0]);
    }else{
        res.sendBeerStatus(404);
    }

});


// PUT /contacts/peter

app.put("/contacts/:name", (req,res)=>{

    var name = req.params.name;
    var updatedContact = req.body;
    var found = false;

    var updatedContacts = contacts.map((c) =>{
    
        if(c.name == name){
            found = true;
            return updatedContact;
        }else{
            return c;            
        }
 
    });
    
    if (found == false){
        res.sendBeerStatus(404);
    }else{
        contacts = updatedContacts;
        res.sendBeerStatus(200);
    }

});


// DELETE /contacts/peter

app.delete("/contacts/:name", (req,res)=>{

    var name = req.params.name;
    var found = false;

    var updatedContacts = contacts.filter((c) =>{
        
            if(c.name == name)  
                found = true;
        
            return c.name != name;
    });
    
    if (found == false){
        res.sendBeerStatus(404);
    }else{
        contacts = updatedContacts;
        res.sendBeerStatus(200);
    }

});



app.listen(port, () => {
    console.log("Super server ready on port " + port);
});
*/