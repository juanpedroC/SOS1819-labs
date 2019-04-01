const express = require("../node_modules/express");
const router = express.Router();

const v1 = require("./v1");
const v2 = require("./v2");

router.use("/v1", v1);
router.use("/v2", v2);

module.exports = router;


//A partir de aqui lo nuevo, igual hay que borrar lo de arriba.


/* JP
  ~~~~~~~~~~~~~~~~~~~~~~~~~~
 ~  API REST DE JUAN PEDRO  ~
  ~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

//DOCUMENTACION /api/v1/beer-consumed-stats/docs (REDIRIGE A LA DOCUMENTACIÓN DE LA API REST)
const beer_consumed_stats_URL = "https://documenter.getpostman.com/view/7063342/S17usmpE";
app.get("/api/v1/beer-consumed-stats/docs", (req, res) => {

        res.redirect(beer_consumed_stats_URL);
            
    }
);

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

//GET /api/v1/beer-consumed-stats/loadInitialData
app.get("/api/v1/beer-consumed-stats/loadInitialData", (req, res) => {
    
  var beerStat1 = Object.create(BeerStat);
        var beerStat2 = Object.create(BeerStat);
        var beerStat3 = Object.create(BeerStat);
        var beerStat4 = Object.create(BeerStat);
        var beerStat5 = Object.create(BeerStat);
        
        beerStat1.initBeerStat("espania", 2016, 84.8, 2, 3909);
        beerStat2.initBeerStat("alemania", 2016, 104.2, -0.5, 8412);
        beerStat3.initBeerStat("lituania", 2016, 88.7, -8.4, 257);
        beerStat4.initBeerStat("corea del sur", 2016, 42.8, 0.3, 2160);
        beerStat5.initBeerStat("reino unido", 2016, 67.7, 1.6, 4373);
        
        beer_stats.find({}).toArray( (err, beer_stats_array) => {
                
                if (err) console.log("[beeeer-stats] FATAL ERROR !!: ", err);
                
                if (beer_stats_array.length == 0) {
                    
                    beer_stats.insert(beerStat1);
                    beer_stats.insert(beerStat2);
                    beer_stats.insert(beerStat3);
                    beer_stats.insert(beerStat4);
                    beer_stats.insert(beerStat5);
                    console.log("[beeeer-stats] Request accepted, creating new resources in database.");
                    res.sendStatus(201);
                    
                } else {
                    
                    console.log("[beeeer-stats] FATAL ERROR !!: Data Base is not empty.");
                    res.sendStatus(409);
                    
                }
                
            }
        );
    
    }
);


//GET /api/v1/beer-consumed-stats (DEVUELVE UNA LISTA CON TODOS LOS RECURSOS)
app.get("/api/v1/beer-consumed-stats", (req, res) => {
    
       beer_stats.find({}).toArray( (err, beer_stats_array) => {
                
                if (err) {
                    console.log("[beeeer-stats] FATAL ERROR !! : ", err);
                } else {
                    console.log("[beeeer-stats] Request accepted, sending resources from database.");
                }
                
                res.send(beer_stats_array);
                
            }
        );
    
    }
);

//POST /api/v1/beer-consumed-stats (CREA UN NUEVO RECURSO)
app.post("/api/v1/beer-consumed-stats", (req, res) => {
        
        var newStat = req.body;
        
       beer_stats.find({"country": newStat["country"],"year": newStat["year"]}).toArray( (err, beer_stats_array) => {
            
                if(err) console.log("FATAL ERROR !!: ", err);
                
        if(Object.keys(newStat).length == 5){
                
                if(beer_stats_array == 0){
                    
                    beer_stats.insert(newStat);
                    console.log("[beeeer-stats] Request accepted, creating new resource in database.");
                    res.sendStatus(201);
                    
                } else {
                    
                    console.log("[beeeer-stats] FATAL ERROR !!: Resource already exists in the database.");
                    res.sendStatus(409);
                    
                }
        } else {
                    
                    console.log("[beeeer-stats] FATAL ERROR !!: The input fields are not expected.");
                    res.sendStatus(400);
                    
                }
            
            }
        );
    }
);

//GET /api/v1/beer-consumed-stats/--reurso-- (DEVUELVE UN RECURSO CONCRETO)
app.get("/api/v1/beer-consumed-stats/:country", (req, res) => {
        
       var country = req.params.country;
        
         beer_stats.find( {"country": country} ).toArray( (err, beer_stats_array) => {
            
                if(err) console.log("FATAL ERROR !!: ", err);
                
                if(beer_stats_array.length  > 0){
                    
                    console.log("[beeeer-stats] Request accepted, sending resource from database.");
                    res.send(beer_stats_array[0]);
                    
                } else {
                    
                    console.log("[beeeer-stats] Request accepted, removing resource of database.");
                    res.sendStatus(404);
                    
                }
            
            }
        );
        
    }
);

//DELETE /api/v1/beer-consumed-stats/--reurso-- (BORRA UN RECURSO CONCRETO)
app.delete("/api/v1/beer-consumed-stats/:country", (req, res) => {
        
        var country = req.params.country;
        var found = false;
        
        beer_stats.find( {"country": country} ).toArray( (err, beer_stats_array) =>{
            
                if(err) console.log("[beeeer-stats] FATAL ERROR: ", err);
                
                if(beer_stats_array.length > 0){
                    
                    beer_stats.remove(beer_stats_array[0]);
                    console.log("[beeeer-stats] Request accepted, removing resource of database.");
                    res.sendStatus(200);
                    
                } else {
                    
                    console.log("[beeeer-stats] FATAL ERROR !!: Resource not found in database.");
                    res.sendStatus(404);
                    
                }
   
            }
        );
        
    }
);

//PUT /api/v1/beer-consumed-stats/--reurso-- (ACTUALIZA UN RECURSO CONCRETO)
app.put("/api/v1/beer-consumed-stats/:country", (req, res) => {
        
       var country = req.params.country;
        var updatedBeerStat = req.body;
        
        if(country == updatedBeerStat["country"]){
        beer_stats.find( {"country": country} ).toArray( (err, beer_stats_array) => {
                
                if(err) console.log("[beeeer-stats] FATAL ERROR: ", err);
                
                if(beer_stats_array.length > 0){
                    
                    beer_stats.update( {"country": country}, updatedBeerStat );
                    console.log("[beeeer-stats] Request accepted, updating resource of database.");
                    res.sendStatus(200);
                    
                } else {
                    
                    console.log("[beeeer-stats] FATAL ERROR : Resource not found in database.");
                    res.sendStatus(404);
                    
                }
            
            }
        );
        } else {
            
            console.log("[beeeer-stats] FATAL ERROR : Resource addressed is not the same as resouced trying to modify.");
            res.sendStatus(400);
        }
        
    }
);

//POST /api/v1/beer-consumed-stats/--reurso-- (ERROR METODO NO PERMITIDO)
app.post("/api/v1/beer-consumed-stats/:country", (req, res) => {
        
        console.log("[beeeer-stats] FATAL ERROR !!: Method not Allowed.");
        res.sendStatus(405);
    }
);

//PUT /api/v1/beer-consumed-stats (ERROR METODO NO PERMITIDO)
app.put("/api/v1/beer-consumed-stats", (req, res) => {
    
        console.log("[beeeer-stats] FATAL ERROR !!: Method not Allowed.");
        res.sendStatus(405);
    }
);

//DELETE /api/v1/beer-consumed-stats (BORRA TODOS LOS RECURSOS)
app.delete("/api/v1/beer-consumed-stats", (req, res) => {
        
        beer_stats.remove({});
        console.log("[beeeer-stats] Request accepted, removing all resources of database.");
        res.sendStatus(200);
    }
);