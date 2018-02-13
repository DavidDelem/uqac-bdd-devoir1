# uqac-bdd-devoir1

<h2>Devoir 1 de Bases de données réparties - Hivers 2018</h2>
<b>David Delemotte, Paul Michaud, Rénald Morice, Loic Bothorel</b>

<h3>Exercice 1</h3>

<h4>Installation du projet</h4>

Lancer la commande <b>npm install</b> pour charger les dépendances
Lancer le fichier correspondant à la question avec la commande <b>node nomFichier.js</b>

<h4>Question 1</h4>

- [x] Crawler réalisé en Node.js (<i>crawler.js</i>).
- [x] Crawler réalisé en Python pour comparer la vitesse d'un langage synchrone VS asynchrone, dans (<i>crawler.js</i>).
- [x] Enregistrement des données dans MongoDB (le crawler appelle une fonction de <i>insertSpells.js</i>).

<h4>Question 2</h4>

- [x] Code MapReduce pour récupérer les bons sorts (<i>getSpellsMongoDB.js</i>) qui sont listés ci-dessous :

| ID Sort | Nom Sort |
| ------- | -------- |
| 50 | Blindness/Deafness |
| 52 | Blur |
| 148 | Dimension Door |
| 198 | Feather Fall |
| 212 | Flare |
| 232 | Geas | Lesser |
| 272 | Hold Portal |
| 308 | Knock |
| 487 | Shout |
| 623 | Dweomer Retaliation |
| 624 | Emergency Force Sphere |
| 643 | Liberating Comand |
| 654 | Chastise |
| 658 | Sotto Voce |
| 774 | Flare Burst |
| 875 | Spark |
| 1133 | Steal Voice |
| 1326 | Liberating Command |
| 1444 | Buoyancy |
| 1662 | Anti-Summoning Shield |
| 1805 | Storm Step |
| 1866 | Buoyancy |
| 1937 | Silent Table |
| 1952 | Sundering Shards |
| 1967 | Wave Shield |

<b>Remarque :</b> le sort "Liberating Comand" (ID : 643) est mal orthographié, d'où la présence d'un doublon "Liberating Command" (ID :1326) !

- [x] Sort choisi par les experts pour libérer Pito : <b>Dimension Door (ID : 148)</b>.

<h4>Question 3</h4>

- [x] Enregistrement des données dans SQlite (fonction de <i>insertSpells.js</i>).
- [x] Schéma plus complexe avec plusieurs tables.
- [ ] Requête SQL pour récupérer les bons sorts (<i>getSpellsSQlite.js</i>)

Nous avons une table <b>sort</b>, une table <b>level</b> (1 à n levels pour un sort) et une table <b>components</b> (1 à n components pour un sort).
En raison des liaisons plusieurs à plusieurs, il est donc nécessaire de créer deux tables supplémentaires: 
<b>sort_level</b> et <b>sort_component</b>. Le MPD de la base de données est consultable ici:
<a href="https://drive.google.com/file/d/10Gzm9UqpQWytelA4e6ejtYysefTJFOBY/view?usp=sharing">https://drive.google.com/file/d/10Gzm9UqpQWytelA4e6ejtYysefTJFOBY/view?usp=sharing</a>

La récupération des sorts se fait grâce à la requête SQL suivante (<i>getSpellsSQlite.js</i>):
<b>METTRE LA REQUETTE SQL</b>

<h3>Exercice 2</h3>



