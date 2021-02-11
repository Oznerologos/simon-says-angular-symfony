#Bonjour
##Voici ma doc pour le TP numéro 1 : Simon Says

Pour ce projet j'ai utilisé un back en symfony comme on l'a vu en cours alors que pour le front j'ai préféré utilisé Angular avec qui je suis bien plus a l'aise (d'autant plus que sur le TP concert, j'ai fait bien plus de symfony que de React).

IMPORTANT : Pensez a activer l'extension pour le CORS, même combat que pour react.

Rien de bien particulier pour le coté back, une seule entité, un répository pour trier les ranks en fonction du score (le plus fort apparait en haut).

Cependant il n'y a pas de fixtures, il vous suffit de jouer pour incrémenter le tableau des scores.

Pour installer angular, rien de plus simple. Je pars du principe que vous avez déjà node donc un simple : 

```
npm install -g @angular/cli
```

une fois que vous etes dans le projet angular : 

```
ng serve 
```
pour lancer le serveur front


##A propos du site :
A l'arrivée sur le site, le jouer est invité a choisir un pseudo pour jouer au jeux. Une fois écrit, son pseudo est sauvegarder dans la session pour pouvoir etre envoyé plus tard en base. Il n'y a pas de système de connexion.

Une fois sur la page du jeu, le joueur doit cliquer sur "Start the game !" pour que Simon commence sa séquence.

Le principe de mon Simon ne suit pas exactement la même que celle de l'énoncé. En effet ici on peut jouer a l'infini, tant que le joueur ne perd pas, Simon ajoutera des couleurs a cliquer. Compte tenu de l'infini possibilité de jouer, j'ai décidé de creer cette séquence dans le front afin d'eviter des appel incéssant en base de données et rajouté un dynamisme.

Lorsque le joueur perd, son score, son pseudo, la date a laquelle il a joué et le temps qu'il a mit (datetimeDeFin - datetimeDeDebut) sont envoyé en base de donnée pour etre stocké. Il est ensuite invité a visionner son score sur la page de ranking a l'adresse  "/ranking"

Sur cette page, un simple get permet de récuperer tous les score qui sont déjà trié de manière décroissante et qui apparaissent sous la forme 

```
"Machin" won "X" rounds in "X" seconds on "Month day, year"
```


##Librairie supplémentaire :
Coté front : Moment JS pour les dates
Coté back : https://github.com/nelmio/NelmioCorsBundle
