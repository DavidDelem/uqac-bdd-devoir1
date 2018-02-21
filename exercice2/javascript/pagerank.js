var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


MongoClient.connect(url, function(err, db) {
    var dbo = db.db("pagerank");
    
    var graph =
        [
            { _id:"A" ,  value:{ url: "A", pagerank: 1, outlink_list: ["B", "C"]}},
            { _id:"B",   value:{ url: "B", pagerank: 1, outlink_list: ["C"]}},
            { _id:"C",   value:{ url: "C", pagerank: 1, outlink_list: ["A"]}},
            { _id:"D",   value:{ url: "D", pagerank: 1, outlink_list: ["C"]}},
        ];

    dbo.collection("data").removeMany();

    dbo.collection("data").insertMany(graph, {w:1}).then(function () {
        
        var map = function () {
            var page = this.value.url;
            var outlink_list = this.value.outlink_list;
            var pagerank = this.value.pagerank;

            outlink_list.forEach(function(outlink) {
                emit(outlink, pagerank/outlink_list.length);
            });
            
            emit(page, 0);
            emit(page, outlink_list);
        };
        
        var reduce = function(page, list_pr_or_urls) {
            var DAMPING_FACTOR = 0.85;
            
            var outlink_list = [];
            var pagerank = 0.0;
            
            list_pr_or_urls.forEach(function(pr_or_urls) {
                if(pr_or_urls instanceof Array) {
                    outlink_list = pr_or_urls;
                } else {
                    pagerank += pr_or_urls;
                }
            });
            
            pagerank = 1 - DAMPING_FACTOR + ( DAMPING_FACTOR * pagerank );
            return { url: page, pagerank: pagerank, outlink_list: outlink_list };
        };
        
        
        function pagerankIteration(i, max, callback) {
            dbo.collection("data").mapReduce(map, reduce, {out: {replace: "data"}}).then(function (collection) {
                collection.find().toArray().then(function (data){
                    console.log(data);
                    console.log("************************************************************************");
                    console.log("************************************************************************");
                    console.log("************************************************************************");
                    
                    console.log("VALEUR DE I = ", i);
                    if (i == max) callback();
                    

                    pagerankIteration(i + 1, max, callback);

                });
            });
        };
        
        pagerankIteration(0, 20, function fin() {
            console.log("Fin du programme!!!");
            db.close();
        });

        
    });
});