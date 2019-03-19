var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());

var port = process.env.PORT || 8080;

/* JP
  ======================
 |  API REST DE JUAN PEDRO  |
  ======================
*/
//CREACIÓN DEL OBJETO "stat"
var Stat = {
    initStat: function(country, year, rating, variation, countryConsumition) {
        this.country = country;
        this.year = year;
        this.rating = rating;
        this.variation = variation;
        this.countryConsumition = countryConsumition;
    }
}

var stats = [];

//GET /api/v1/beer-consumed-stats/loadInitialData
app.get("/api/v1/beer-consumed-stats/loadInitialData", (req, res) => {
    
        var stat1 = Object.create(Stat);
        var stat2 = Object.create(Stat);
        var stat3 = Object.create(Stat);
        var stat4 = Object.create(Stat);
        
        stat1.initStat("spain", 2016, 84.8, 2, 3909);
        stat2.initStat("germany", 2016, 104.2, -0.5, 8412);
        stat3.initStat("lithuania", 2016, 88.7, -8.4, 257);
        stat4.initStat("south korea", 2016, 42.8, 0.3, 2160);
        
        stats.push(stat1);
        stats.push(stat2);
        stats.push(stat3);
        stats.push(stat4);
        
        res.sendStatus(201);
        res.send("<h1>Initial Data Succesfuly Loaded</h1>");
    
    }
);


//GET /api/v1/beer-consumed-stats (DEVUELVE UNA LISTA CON TODOS LOS RECURSOS)
app.get("/api/v1/beer-consumed-stats", (req, res) => {
    
        res.send(stats);
    
    }
);

//POST /api/v1/beer-consumed-stats (CREA UN NUEVO RECURSO)
app.post("/api/v1/beer-consumed-stats", (req, res) => {
        
        var newStat = req.body;
        stats.push(newStat);
        
        res.sendStatus(201);
        res.send("<h1>Resource created successfully.</h1>");
        
    }
);

//GET /api/v1/beer-consumed-stats/--reurso-- (DEVUELVE UN RECURSO CONCRETO)
app.get("/api/v1/beer-consumed-stats/:country", (req, res) => {
        
        var country = req.params.country;
        
        var filteredStats = stats.filter( (s) => { return s.country == country; } );
        
        if(filteredStats.length >= 1){
            
            res.sendStatus(200);
            res.send(filteredStats);
            
        } else {
            
            res.sendStatus(404);
            res.send("<h1>ERROR: Resource not Found.</h1>");
            
        }
        
    }
);

//DELETE /api/v1/beer-consumed-stats/--reurso-- (BORRA UN RECURSO CONCRETO)
app.delete("/api/v1/beer-consumed-stats/:country", (req, res) => {
        
        var country = req.params.country;
        var found = false;
        
        var updatedStats = stats.filter( (s) => { 
            
                if(s.country == country) found = true;
                return s.country != country 
            
            } 
        );
        
        if(found){
            stats = updatedStats;
            res.sendStatus(200);
            res.send("<h1>Resource successfully deleted.</h1>");
        } else {
            res.sendStatus(404);
            res.send("<h1>ERROR: Resource not Found.</h1>");
        }
        
    }
);

//PUT /api/v1/beer-consumed-stats/--reurso-- (ACTUALIZA UN RECURSO CONCRETO)
app.put("/api/v1/beer-consumed-stats/:country", (req, res) => {
        
        var country = req.params.country;
        var updatedStat = req.body;
        var found = false;
        
        var updatedStats = stats.map( (s) => {
            
                if(s.country == country){
                    found = true;
                    return updatedStat;
                } else {
                    return s;
                }
            
            }
        );
        
        if(found){
            stats = updatedStats;
            res.sendStatus(200);
            res.send("<h1>Resource successfully updated.</h1>");
        } else {
            res.sendStatus(404);
            res.send("<h1>ERROR: Resource not Found.</h1>");
        }
        
    }
);

//POST /api/v1/beer-consumed-stats/--reurso-- (ERROR METODO NO PERMITIDO)
app.post("/api/v1/beer-consumed-stats/:country", (req, res) => {
        
        res.sendStatus(405);
        res.send("<h1>ERROR. Method 'post' not Allowed on a Particular Resource.</h1>")
        
    }
);

//PUT /api/v1/beer-consumed-stats (ERROR METODO NO PERMITIDO)
app.put("/api/v1/beer-consumed-stats", (req, res) => {
        
        res.sendStatus(405);
        res.send("<h1>ERROR. Method 'put' not Allowed on Base Route.</h1>")
        
    }
);

//DELETE /api/v1/beer-consumed-stats (BORRA TODOS LOS RECURSOS)
app.delete("/api/v1/beer-consumed-stats", (req, res) => {
        
        stats = [];
        res.sendStatus(200);
        res.send("<h1>All resources successfully deleted.</h1>");

        
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
    
    res.sendStatus(201);
});


// DELETE /contacts/

app.delete("/contacts", (req,res)=>{
    
    contacts =  [];

    res.sendStatus(200);
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
        res.sendStatus(404);
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
        res.sendStatus(404);
    }else{
        contacts = updatedContacts;
        res.sendStatus(200);
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
        res.sendStatus(404);
    }else{
        contacts = updatedContacts;
        res.sendStatus(200);
    }

});



app.listen(port, () => {
    console.log("Super server ready on port " + port);
});

*/