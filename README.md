# uqac-bdd-devoir1

<h2>Rapport du devoir 1 de Bases de données réparties - Hivers 2018</h2>
<b>David Delemotte, Paul Michaud, Rénald Morice, Loïc Bothorel</b>

<h3>Exercice 1</h3>

<h4>Installation du projet</h4>

Se placer dans le dossier exercice1/js et faire <b>npm install</b> pour charger les dépendances.

---

<h4>Question 1</h4>

**`Prérequis`** avoir MongoDB de lancé et une base de données nomée "sorts" vide.<br/>
**`Lancement`** lancer le fichier <i>exercice1/js/crawler.js</i> pour faire le crawling et enregistrer dans MongoDB.

**`Ce qui a été fait`**

- [x] Crawler réalisé en Node.js (<i>exercice1/js/crawler.js</i>) en utilisant http://www.dxcontent.com
- [x] Enregistrement des données dans MongoDB (le crawler appelle une fonction de <i>exercice1/js/insertSpells.js</i>.

---

<h4>Question 2</h4>

**`Prérequis`** avoir exécuté le code la la Q1 pour que les données soient enregistrées dans mongoDB<br/>
**`Lancement`** lancer le fichier <i>exercice1/js/getSpellsMongoDB.js</i>

**`Ce qui a été fait`**

- [x] Code MapReduce pour récupérer les bons sorts (<i>exercice1/js/getSpellsMongoDB.js</i>).

**`Résultats et réponse à la question`**

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

- [x] Réponse à la question: le sort choisi par les experts pour libérer Pito est <b>Dimension Door (ID : 148)</b>.

---

<h4>Question 3</h4>

**`Prérequis`** Dans le <i>crawler.js</i>, commenter le code pour enregistrer dans MongoDB et décommenter celui pour SQlite (voir à partir de la ligne 125).<br/>
**`Lancement`** Lancer <i>exercice1/js/crawler.js</i> pour faire le crawling et enregistrer dans SQlite, puis <i>exercice1/js/getSpellsSQLlite.js</i> pour récupérer les bons sorts.

**`Ce qui a été fait`**

- [x] Enregistrement des données dans SQlite (le crawler appelle une fonction de <i>exercice1/js/insertSpells.js</i> à partir de la ligne 125).
- [x] Schéma plus complexe avec plusieurs tables (voir schéma plus bas).
- [x] Requête SQL pour récupérer les bons sorts (<i>exercice1/js/getSpellsSQlite.js</i>)

Le schéma est le suivant (une table <b>sort</b>, une table <b>level</b> (1 à n levels par sort) et une table <b>components</b> (1 à n components par sort). En raison des liaisons plusieurs à plusieurs, il est nécessaire de créer deux tables supplémentaires: 
<b>sort_level</b> et <b>sort_component</b>).

![schema bdd](./img/schemabdd.png)

---

<h4>Version en Python</h4>

Nous avons également réalisé une partie de cet exercice en python, dans le dossier <i>exercice1/python</i> pour comparer langage synchrone/langage asynchrone.

**`Prérequis`**

Se placer dans <i>exercice1/python</i>

```
# apt install python-pip
$ pip install beautifulsoup4
$ pip install lxml
```

**`Ce qui a été fait`**

- [x] Crawler en python (lancer <i>exercice1/python/crawler.py</i>) en utilisant http://www.dxcontent.com

```
python crawler.py
```

- [x] Insertion dans la base SQlite (lancer <i>exercice1/python/insertSqlite.py</i>)

```
python insertSqlite.py
```

- [x] Récupération des sorts (lancer <i>exercice1/python/getSpellsSQlite.py</i>)

```
python getSpellsSQlite.py
```

**`Résultats`**

Les sorts trouvés en résultat sont les mêmes qu'avec la version Node.js.

---

<h3>Exercice 2</h3>

L'exercice 2 a été réalisé en node.js (exercice2/pagerank.js). 

**`Prérequis`**

Se placer dans <i>exercice1/</i> et installer le module MongoDB

```
npm install mongodb --save
```

**`Ce qui a été fait`**

- [x] Calcul du Page Rank 

```
node pagerank.js
```
