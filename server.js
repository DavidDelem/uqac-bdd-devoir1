var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

/* Lorsque l'utilisateur fera une requête à localhost:8088/sorts, les sorts seront récupérés par Crawling */

app.get('/sorts', function(req, res){

    var baseUrl = 'http://www.dxcontent.com/SDB_SpellBlock.asp?SDBID='
    var sorts = [];
    
    // Parcours de tous les sorts un a un
    for(var i=1; i <= 20; i++) { // mettre 1971 à la place de 2
        
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
                jsonSortElem._id = i;
                
                // Capture des éléments dans le HTML
                
                $('.heading').filter(function(){
                    var data = $(this);
                    jsonSortElem.name = data.children().text();
                });
                
                $('.SPDet').each(function(i, elem) {
                    var data = $(this).html(); // doit renvoyer un truc du style (exemple): <b>School</b> evocation <b>Level</b> paladin 4, ranger 4
                    // regarder le contenu de tous les <b>, si un des <b> contient un des éléments qu'on recherche, récupérer le texte qui est juste après
                    var res = data.split("<b>");
                    res.forEach(function(element) {
                        if (element.includes("School")) {
                            var school = element.split("</b> ")[1];
                            jsonSortElem.school = school;
                        }
                        if (element.includes("Level")) {
                            var res = element.split("</b> ")[1];
                            res = element.split(",");
                            var levels = [];
                            res.forEach(function(element) {
                                var res2 = element.split(" ");
                                levels.push({"class":res2[1],"level":res2[2]});
                            });
                            jsonSortElem.levels = levels;
                        }
                        if (element.includes("Casting Time")) {
                            var casting_time = element.split("</b> ")[1];
                            jsonSortElem.casting_time = casting_time;
                        }
                        if (element.includes("Components")) {
                            var res = element.split("</b> ")[1];
                            res = element.split(",");
                            var components = [];
                            res.forEach(function(element) {
                                var component = element.split(" ")[1];
                                components.push(component);
                            });
                            jsonSortElem.components = components;
                        }
                        if (element.includes("Range")) {
                            var range = element.split("</b> ")[1];
                            jsonSortElem.range = range;
                        }
                        if (element.includes("Effect")) {
                            var effect = element.split("</b> ")[1];
                            jsonSortElem.effect = effect;
                        }
                        if (element.includes("Saving Throw")) {
                            var saving_throw = element.split("</b> ")[1];
                            jsonSortElem.saving_throw = saving_throw;
                        }
                        if (element.includes("Spell Resistance")) {
                            var spell_resistance = element.split("</b> ")[1];
                            var exp = /no/;
                            if (exp.test(spell_resistance)) {
                                spell_resistance = false;
                            } else {
                                spell_resistance = true;
                            }
                            jsonSortElem.spell_resistance = spell_resistance;
                        }
                    });
                });
                
                $('.SPDesc').filter(function(){
                    var data = $(this);
                    jsonSortElem.description = data.children().text();
                });
                
                sorts.push(jsonSortElem);
            }
        })
        
    }
    res.json(sorts);

})

app.listen('8088')
console.log('Lancement du serveur');
exports = module.exports = app;