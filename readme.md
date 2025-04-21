# portfolio-frontend

## Objectif du projet

Ce projet consiste à créer une interface web qui interagit avec l'API GitHub pour afficher dynamiquement :

Le profil d'un utilisateur (bio, avatar, lien)

Les trois derniers dépôts publics

Les langages utilisés dans chaque projet

## Technologies utilisées

HTML5 / CSS3

JavaScript (ES6+)

API GitHub REST

Octokit (Client GitHub officiel)

Fetch API

Modules ES (import/export)

## Structure du projet

src/
│ ├── index.html
│ ├── style.css
│ └── home.js # Fichier contenant la classe Home (logique principale)

## Fonctionnalités principales

Récupération des informations utilisateur depuis l'API GitHub

Affichage dynamique dans la page web

Chargement des projets avec noms, descriptions et langages utilisés

Gestion des erreurs si les données ne sont pas disponibles

Utilisation de async/await pour les appels API

## Aperçu visuel

(Tu peux insérer une capture d'écran de ton site ici en Markdown)

![Aperçu du site](./screenshot.png)

## Comment lancer le projet

Cloner ce dépôt :

git clone https://github.com/toncompte/tonprojet.git
Ouvrir index.html dans un navigateur moderne

Aucun serveur requis – tout est en JavaScript front-end

## Auteur

Prénom NOM (alias GitHub : @lili1326)

Réalisé dans le cadre du Titre Professionnel DWWM

## Compétences mises en œuvre (TP DWWM)

Compétence Description
1.4 Développement de la partie dynamique d’une interface utilisateur
3 Débogage simple avec console, gestion d’erreurs
5 Documentation du projet et structuration Git

## Ressources

- [import bib github](https://github.com/octokit/octokit.js)
- [live server vscode](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- [lien pour authentification avec jeton d acces personnel](https://docs.github.com/en/rest/guides/scripting-with-the-rest-api-and-javascript?apiVersion=2022-11-28#instantiating-and-authenticating)
- [Octokit Rest.js](https://github.com/octokit/rest.js)
