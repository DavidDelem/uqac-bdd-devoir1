# uqac-bdd-crawler

<h2>Devoir 1 de Bases de données réparties - Hivers 2018</h2>
<b>David Delemotte, Paul Michaud, Rénald Morice, Loic Bothorel</b>

<h3>Exercice 1</h3>

<h4>Question 1</h4>

<p>Nous avons réalisé le crawler en Node.js (<i>crawler.js</i>). Nous avons aussi réalisé un autre crawler en Python
afin de voir lequel des deux était le plus rapide pour récupérer toutes les données (<i>crawler.py</i>).
Nous récupérons un maximum d'information sur le sort, en plus des informations demandées de base.</p>

<p>Nous enregistrons ensuite les données récupérées dans MongoDB (<i>insertSpells.js</i>).</p>

<h4>Question 2</h4>

Nous avons réalisé le code MapReduce permettant de récupérer les sorts correspondants (<i>getSpellsMongoDB.js</i>).

<h4>Question 3</h4>

Nous avons choisi de faire un schéma plus complexe, avec une table <b>level</b> et une table <b>components</b>.
En raison des liaisons plusieurs à plusieurs, il est donc nécessaire de créer deux tables supplémentaires: 
<b>sort_level</b> et <b>sort_component</b>. Le MPD de la base de données est consultable ici:
<a href="https://drive.google.com/file/d/10Gzm9UqpQWytelA4e6ejtYysefTJFOBY/view?usp=sharing">https://drive.google.com/file/d/10Gzm9UqpQWytelA4e6ejtYysefTJFOBY/view?usp=sharing</a>

La récupération des sorts se fait grâce à la requête SQL suivante (<i>getSpellsSQlite.js</i>):
<b>METTRE LA REQUETTE SQL</b>

La requête SQL pour récupérer les sorts 

<h3>Exercice 2</h3>



