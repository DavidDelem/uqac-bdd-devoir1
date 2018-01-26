var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

/* Lorsque l'utilisateur fera une requête à localhost:8088/sorts, les sorts seront récupérés par Crawling */

app.get('/sorts', function(req, res){

    var baseUrl = 'http://www.dxcontent.com/SDB_SpellBlock.asp?SDBID='
    
    // Parcours de tous les sorts un a un
    for(var i=1; i <= 2; i++) { // mettre 1971 à la place de 2
        
        // Réalisation de la requête
        request('http://www.dxcontent.com/SDB_SpellBlock.asp?SDBID=' + i, function(error, response, html){

            if(!error){
                
                // On utilise la librairie Cheerio sur le code HTML renvoyé, qui nous offre les fonctionnalités d'analyse du DOM de jQuery
                // Doc de Cheerios: https://cheerio.js.org
                
                var $ = cheerio.load(html);

                // Définition des variables à capturer
//                var jsonSortElem = {
//                    name: '',
//                    school: '',
//                    level: '',
//                    components: [],
//                    spell_resistance: '',
//                    touch: '',
//                };
                
                var jsonSortElem = new Object();
                
                // Capture des éléments dans le HTML
                
                $('.heading').filter(function(){
                    var data = $(this);
                    jsonSortElem.name = data.children().text();
                });
                
                $('.SPDet').each(function(i, elem) {
                    var data = $(this).html(); // doit renvoyer un truc du style (exemple): <b>School</b> evocation <b>Level</b> paladin 4, ranger 4
                    // regarder le contenu de tous les <b>, si un des <b> contient un des éléments qu'on recherche, récupérer le texte qui est juste après
                    
                    var reg=new RegExp("[ ,;]+", "g");
                });
                
            }
        })
    }

})

app.listen('8088')
console.log('Lancement du serveur');
exports = module.exports = app;