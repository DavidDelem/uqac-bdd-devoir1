var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

/* Lorsque l'utilisateur fera une requête à localhost:8088/sorts, les sorts seront récupérés par Crawling */

app.get('/sorts', function(req, res){

    var baseUrl = 'http://www.dxcontent.com/SDB_SpellBlock.asp?SDBID='
    
    // parcours de tous les sorts un a un
    for(var i=1; i <= 1971; i++) {
        
        // réalisation de la requête
        request('http://www.dxcontent.com/SDB_SpellBlock.asp?SDBID=' + i, function(error, response, html){

            if(!error){
                // On utilise la libraieie Cheerio sur le code HTML renvoyé, qui nous offre les fonctionnalités d'analyse du DOM de jQuery
                var $ = cheerio.load(html);

                // Définition des variables à capturer
                var title, release, rating;
                var jsonSortElem = {
                    name : '',
                    level : '',
                    components : '',
                    spell_resistance: '',
                    
                };
                
                // Capture des éléments
                
                 $('.EXEMPLECLASSE').filter(function(){
                    var data = $(this);

                    // The .star-box-giga-star class was exactly where we wanted it to be.
                    // To get the rating, we can simply just get the .text(), no need to traverse the DOM any further

                    rating = data.text();

                    json.rating = rating;
                })
                
            }
        })
    }

})

app.listen('8088')
console.log('Lancement du serveur');
exports = module.exports = app;