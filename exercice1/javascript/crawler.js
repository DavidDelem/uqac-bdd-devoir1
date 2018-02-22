/*-------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------*/
/* Crawler pour récupérer les sorts sur internet                                       */
/*-------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------*/

var request = require('request');
var cheerio = require('cheerio');
var async = require("async");
var insertSpells = require('./insertSpells.js');


var baseUrl = 'http://www.dxcontent.com/SDB_SpellBlock.asp?SDBID='
var sorts = [];

// Parcours de tous les sorts un a un
var array = Array.from(Array(1975),(x,i)=>i+1);

console.log("Début de la récupération des sorts à l'adresse http://www.dxcontent.com/SDB_SpellBlock.asp ("+ array.length + " sorts à récupérer)");

async.each(array, function(item, callback) {

        // Réalisation de la requête
        request('http://www.dxcontent.com/SDB_SpellBlock.asp?SDBID=' + item, function(error, response, html) {

            if(!error) {

                // On utilise la librairie Cheerio sur le code HTML renvoyé, qui nous offre les fonctionnalités d'analyse du DOM de jQuery
                // Doc de Cheerios: https://cheerio.js.org

                var $ = cheerio.load(html);

                var jsonSortElem = new Object();
                jsonSortElem._id = item;

                // Capture des éléments dans le HTML

                $('.heading:first-of-type').filter(function() {
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
                                if(!levels.some(item => item.class == res2[1])) levels.push({"class":res2[1],"level":res2[2]});
                            });
                            jsonSortElem.levels = levels;
                        }
                        if (element.includes("Casting Time")) {
                            var casting_time = element.split("</b> ")[1];
                            jsonSortElem.casting_time = casting_time;
                        }
                        if (element.includes("Components")) {

                            var res = element.split("</b> ")[1];

                            var components = [];
                            var regex = / *,? *(V|S|F|M|DF|F\/DF|M\/DF) *,? */g;
                            while (match = regex.exec(res)){
                                if(components.indexOf(match[1]) == -1) components.push(match[1]);
                            }
                            jsonSortElem.components = components;

                            /*var res = element.split("</b> ")[1];
                            res = element.split(",");
                            var components = [];
                            res.forEach(function(element) {
                                var component = element.split(" ")[1];
                                components.push(component);
                            });
                            jsonSortElem.components = components;*/
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

                jsonSortElem.description = "";

                $('.SpellDiv > .SPDesc:nth-last-child(n+4)').filter(function(){
                    var data = $(this);
                    jsonSortElem.description = data.children().text();
                });

                if(jsonSortElem.description.length == 0) {
                    $('.SpellDiv > .SPDesc:nth-last-child(n+2)').filter(function(){
                        var data = $(this);
                        jsonSortElem.description = data.children().text();
                    });
                }

                sorts.push(jsonSortElem);
                callback();
            }
        });

}, function(err) {

    console.log("Fin de la récupération des sorts");

    /* Insertion en base de donnée MongoDB */
    console.log("Début de l'insertion des sorts avec MongoDB");

    insertSpells.insertMongoDB(sorts, function(result) {
        if(result) console.log('Sorts inssérés dans la base de données MongoDB');
        else console.log('Echec lors de l\'insertion des sorts dans la base de données MongoDB');
    });

    /* Insertion en base de donnée SQlite */
//    console.log("Début de l'insertion des sorts avec SQLite");
//
//    insertSpells.insertSQlite(sorts, function(err) {
//        if(err) console.log('Echec lors de l\'insertion des sorts dans la BDD SQlite : ' + err);
//        else console.log('Sorts insérés dans la base de données SQlite');
//    });

});
