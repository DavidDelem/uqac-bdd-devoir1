# uqac-bdd-crawler

<h2>Devoir 1 de Bases de données réparties - Hivers 2018</h2>
<b>David Delemotte, Paul Michaud, Rénald Morice, Loic Bothorel</b>

<h3>Exercice 1</h3>

<h4>Installation du projet</h4>

Se placer dans <b>devoir1/exercice1</b> et faire <b>npm install</b>.
Lancer le fichier correspondant à la question avec la commande <b>node nomFichier.js</b>

<h4>Question 1</h4>

- [x] Crawler réalisé en Node.js (<i>exercice1/crawler.js</i>).
- [x] Crawler réalisé en Python pour comparer la vitesse d'un langage synchrone VS asynchrone, dans (<i>exercice1/crawler.py</i>).
- [x] Enregistrement des données dans MongoDB (le crawler appelle une fonction de <i>exercice1/insertSpells.js</i>).

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
- [x] Schéma plus complexe avec plusieurs tables
- [x] Requête SQL pour récupérer les bons sorts (<i>getSpellsSQlite.js</i>)

Le schéma créé dans SQlite est le suivant:
![schema bdd](img/schemabdd.png?raw=true)

La présence des tables <b>sort_component</b> et <b>sort_level</b> est due aux liaisons plusieurs à plusieurs entre <b>sort</b>, <b>level</b> et <b>component</b> (un sort contient 1 à n levels, un level est associé à 1 à n sort, de même pour les components)

La récupération des sorts se fait grâce à la requête SQL suivante:
<b>METTRE LA REQUETTE SQL</b>

<h3>Exercice 2</h3>



