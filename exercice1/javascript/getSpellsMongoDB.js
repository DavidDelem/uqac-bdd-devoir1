/*-------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------*/
/* Récupération des sorts valides stockés dans la base MongoDB                         */
/*-------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------*/


var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');


MongoClient.connect('mongodb://localhost:27017', function(err, client) {
    
    assert.equal(null, err);
    
    // Connection à la collection sorts
    var sorts_db = client.db("sorts");
    var sorts = sorts_db.collection("sorts");
    console.log("-- Connecté à la collection 'sorts --");

    // Map
    var map = function(){
        
        var is_wizard = false;
        var is_verbal = false;
        
        // On check qu'il s'agit d'un sort wizard maximum de niveau 4
        if(this.levels !== undefined) {
            for(i = 0; i < this.levels.length; i++) {
                // 'i' = insensible à la casse
                if(this.levels[i].class.search(/wizard/i) != -1 && this.levels[i].level <= 4) is_wizard = true;
            }
        }
        
        // On check s'il s'agit d'un sort verbal uniquement (et rien d'autre)
        if(this.components!== undefined && this.components.length == 1 && this.components[0] == "V") is_verbal = true;
        
        // Si c'est un sort wizard maximum de niveau 4 qui est verbal uniquement on fait l'emit
        if(is_wizard && is_verbal) emit({id: this._id, name: this.name}, 1);
    };
    
    // Reduce
    var reduce = function(key, values){
        return key;
    };
    
    sorts.mapReduce(map, reduce, {out: {inline : 1}}, function(err, result){
        assert.equal(null, err);
        console.log(result);
    });
    
    console.log("-- Fin du programme --");
    client.close();
})