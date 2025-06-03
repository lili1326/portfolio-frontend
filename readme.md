# Portfolio Développeuse Web – Aurélie

Bienvenue sur mon portfolio web, conçu pour présenter mes compétences en développement et mettre en valeur mes projets GitHub de manière dynamique.

---

## Objectif du projet

Ce projet a été réalisé dans le cadre de ma formation/dossier professionnel pour démontrer ma capacité à :

- Développer une **interface web dynamique**
- Utiliser **JavaScript natif (ES6)** pour manipuler le **DOM**
- Consommer une **API externe (GitHub REST API)**
- Générer dynamiquement une interface en fonction des données
- Appliquer une **structuration propre du code** avec des classes JavaScript

---

## Technologies utilisées

- **HTML5**
- **CSS3**
- **JavaScript ES6**
- **Fetch API**
- **GitHub Public API**
- Aucun framework (React, Vue…) n’a été utilisé volontairement.

---

## Structure du projet

```bash
portfolio-frontend/
│
├── index.html               # Page d’accueil dynamique
├── tous-mes-projets.html    # Liste complète des projets GitHub
├── projet.html              # Redirection automatique vers GitHub
│
├── assets/
│   ├── styles/
│   │   └── styles.css       # Feuille de style principale
│   ├── icons/               # Icônes SVG (home, GitHub, flèche, etc.)
│   ├── modules/
│   │   └── Home.js          # Classe JS principale (DOM + API)
│   ├── projects.js          # Script de la page 'tous mes projets'
│   └── app.js               # Point d’entrée JS de l’accueil
```

---

## Fonctionnement

### Page `index.html`

- Affiche automatiquement :
  - La bio GitHub, l’avatar, le lien du profil
  - Les **3 derniers projets triés par date de création**
  - Les **langages utilisés** (pastilles colorées)
  - La **date de création** de chaque projet

### Page `tous-mes-projets.html`

- Affiche **tous les dépôts publics GitHub**
- Les projets sont :
  - Triés du **plus récent au plus ancien**
  - Affichés avec **description, date, langages colorés**

### Page `projet.html`

- Sert de **redirection automatique**
- Lit `?repo=nomduprojet` dans l’URL
- Redirige vers : `https://github.com/lili1326/nomduprojet`

---

## À noter

- Toutes les données sont récupérées dynamiquement depuis l’API GitHub.
- Aucun contenu projet n’est codé en dur : tout est généré à partir des dépôts réels.
- Le code est entièrement en JavaScript natif pour valoriser la **compréhension du DOM et des API**.

---

## Lancer le projet en local

1. Cloner le dépôt ou copier les fichiers localement
2. Lancer un serveur local (ex. avec VS Code + Live Server)
3. Ouvrir `index.html` dans le navigateur

```bash
npx serve
# ou
php -S localhost:3000
```

---

## Réalisé par

**Aurélie**  
Développeuse Full Stack junior  
[github.com/lili1326](https://github.com/lili1326)
