// On importe la classe Octokit depuis le CDN pour interagir avec l'API GitHub
import { Octokit } from "https://esm.sh/octokit";

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

        // Initialisation
        this.octokit = new Octokit(); // Une seule instance réutilisée partout
        this.init();
    }

    // Point d’entrée : on lance les appels API
    init() {
        this.getUserInformations();     // Récupère les infos du profil GitHub
        this.getReposInformations();    // Récupère les dépôts publics
    }

    // Récupère les informations générales de l’utilisateur GitHub
    async getUserInformations() {
        try {
            const { data } = await this.octokit.request("GET /users/lili1326");

            this.descriptionHTML.textContent = data.bio;
            this.profilHTML.href = data.html_url;
            this.profilHTML.textContent = data.html_url;
            this.avatarHTML.src = data.avatar_url;
        } catch (error) {
            console.error("Erreur lors de l'appel à getUserInformations", error);
        }
    }

    // Récupère la liste des dépôts publics de l’utilisateur
    async getReposInformations() {
        try {
            const { data: repos } = await this.octokit.request("GET /users/lili1326/repos");

            // Limite à 3 projets max
            await this.updateHTMLProjects(repos.slice(0, 3));
        } catch (error) {
            console.error("Erreur lors de l'appel à getReposInformations", error);
        }
    }

    // Met à jour l'interface avec les données des projets
    async updateHTMLProjects(projects) {
        for (let i = 0; i < projects.length; i++) {
            const project = projects[i];

            this.projectsTitle[i].textContent = project.name;
            this.projectsDescription[i].textContent = project.description;

            try {
                // Récupère les langages du projet avec Octokit (sans fetch)
                const { data: languages } = await this.octokit.request(
                    `GET /repos/${project.owner.login}/${project.name}/languages`
                );

                const tags = Object.keys(languages).join(", ");
                this.projectsTagsContainer[i].textContent = tags;
            } catch (err) {
                console.error("Erreur lors de la récupération des langages:", err);
                this.projectsTagsContainer[i].textContent = "Langages non disponibles";
            }
        }
    }
}

// On exporte la classe pour pouvoir l'utiliser ailleurs
export { Home };
