 // On importe la classe Octokit depuis le CDN pour interagir avec l'API GitHub
import { Octokit, App } from "https://esm.sh/octokit";

// Déclaration de la classe Home
class Home {
    constructor() {
        // Sélection des éléments HTML pour afficher les infos de l’utilisateur GitHub
        this.descriptionHTML = document.querySelector('.js-home-description');
        this.profilHTML = document.querySelector('.js-home-profil-url');
        this.avatarHTML = document.querySelector('.js-home-avatar');

        // Sélection des éléments HTML pour afficher les projets (titre, description, tags)
        this.projectsTitle = document.querySelectorAll('.js-home-project-title');
        this.projectsDescription = document.querySelectorAll('.js-home-project-description');
        this.projectsTagsContainer = document.querySelectorAll('.js-home-project-tags-container');

        // Appel à la fonction init pour lancer les appels API
        this.init();
    }

    // Fonction d'initialisation : lance les appels API
    init() {
        this.getUserInformations();     // Récupère les infos du profil GitHub
        this.getReposInformations();    // Récupère les dépôts publics
    }

    // Récupère les informations générales de l’utilisateur GitHub
    getUserInformations() {
        fetch("https://api.github.com/users/lili1326")
            .then((response) => response.json())  // Transforme la réponse en JSON
            .then((data) => {
                // Met à jour les éléments HTML avec les données récupérées
                this.descriptionHTML.textContent = data.bio;
                this.profilHTML.href = data.html_url;
                this.profilHTML.textContent = data.html_url;
                this.avatarHTML.src = data.avatar_url;
            })
            .catch((error) => {
                // Gestion des erreurs en cas d’échec de l’appel API
                console.error("Erreur lors de l'appel de l'API getUserInformations", error);
            });
    }

    // Fonction asynchrone pour récupérer les dépôts GitHub de l’utilisateur
    async getReposInformations() {
        const octokit = new Octokit(); // Création d'une instance Octokit

        try {
            // Envoi de la requête GET pour récupérer les dépôts publics de l'utilisateur
            const response = await octokit.request("GET /users/lili1326/repos");

            // Mise à jour de l’interface avec les projets récupérés
            await this.updateHTMLProjects(response.data);
        } catch (error) {
            // Gestion des erreurs de l’appel API
            console.log("Erreur lors de l'appel de l'API getReposInformations", error);
        }
    }

    // Met à jour les 3 premiers projets dans le HTML
    async updateHTMLProjects(projects) {
        let htmlIndex = 0;

        // Boucle sur les 3 premiers projets (ou moins si moins de 3)
        for (let i = 0; i < 3 && i < projects.length; i++) {
            const infos = projects[i]; // Récupération des infos du projet
            console.log(infos); // Log en console pour débogage

            // Mise à jour du titre et de la description du projet dans le DOM
            this.projectsTitle[htmlIndex].textContent = infos.name;
            this.projectsDescription[htmlIndex].textContent = infos.description;

            try {
                // Appel API pour récupérer les langages utilisés dans ce dépôt
                const languages = await fetch(infos.languages_url).then(res => res.json());

                // Extraction des noms de langages (JavaScript, HTML, etc.)
                const tags = Object.keys(languages).join(", ");
                this.projectsTagsContainer[htmlIndex].textContent = tags;
            } catch (err) {
                // En cas d’erreur dans la récupération des langages
                console.error("Erreur lors de la récupération des languages:", err);
                this.projectsTagsContainer[htmlIndex].textContent = "Langages non disponibles";
            }

            htmlIndex++; // Passage à l’élément HTML suivant
        }
    }
}

// Export de la classe Home pour pouvoir l’utiliser dans d’autres fichiers
export { Home };
 