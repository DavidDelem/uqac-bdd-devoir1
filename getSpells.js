var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');


MongoClient.connect('mongodb://localhost:27017', function(err, client) {
    
    assert.equal(null, err);
    console.log("-- Connecté à la collection 'sorts --");
    
    var sorts_db = client.db("sorts");
    var sorts = sorts_db.collection("sorts");
    
    //Collection = SQL Table
    //Document = 1 table's row
    // Map is called for every document in the collection.
    var map = function(){
        
        var is_wizard = false;
        var is_verbal = false;
        
        //Check s'il s'agit d'un sort wizard, maximum niveau 4
        if(this.levels !== undefined){
            for(i = 0; i < this.levels.length; i++){
                //'i' insensible à la casse
                if(this.levels[i].class.search(/wizard/i) != -1 && this.levels[i].level <= 4) is_wizard = true;
            }
        }
        
        //Check s'il s'agit d'un sort verbal
        if(this.components!== undefined && this.components.length == 1 && this.components[0] == "V") is_verbal = true;
        
        if(is_wizard && is_verbal) emit(this._id, 1);
    };
    
    
    var reduce = function(key, values){
        return values.toString();
    };
    
    sorts.mapReduce(map, reduce, {out: {inline : 1}}, function(err, result){
        assert.equal(null, err);
        console.log(result);
    });
    
    console.log("-- Fin du programme --");
    client.close();
})