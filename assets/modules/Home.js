 // Classe principale responsable de la mise à jour dynamique de l'accueil du portfolio
class Home {
    constructor() {
        // Sélection des éléments HTML à manipuler (DOM) pour afficher les infos du profil GitHub
        this.descriptionHTML = document.querySelector('.js-home-description');
        this.profilHTML = document.querySelector('.js-home-profil-url');
        this.avatarHTML = document.querySelector('.js-home-avatar');

        // Sélection des éléments HTML liés aux projets (titre, description, tags)
        this.projectsTitle = document.querySelectorAll('.js-home-project-title');
        this.projectsDescription = document.querySelectorAll('.js-home-project-description');
        this.projectsTagsContainer = document.querySelectorAll('.js-home-project-tags-container');

        // Démarrage de l'application
        this.init();
    }

    // Méthode principale appelée au démarrage de l'application
    init() {
        this.getUserInformations();      // Appel de l’API GitHub pour récupérer les infos du profil
        this.getReposInformations();     // Appel de l’API GitHub pour récupérer les dépôts publics
    }

    // Récupération des informations de l’utilisateur GitHub via fetch
    async getUserInformations() {
        try {
            const response = await fetch("https://api.github.com/users/lili1326");
            if (!response.ok) throw new Error("Erreur HTTP " + response.status);

            const data = await response.json();

            // Mise à jour dynamique du DOM avec les données utilisateur
            this.descriptionHTML.textContent = data.bio;
            this.profilHTML.href = data.html_url;
            this.profilHTML.textContent = data.html_url;
            this.avatarHTML.src = data.avatar_url;
        } catch (error) {
            console.error("Erreur lors de l'appel de l'API getUserInformations :", error);
        }
    }

    // Récupération des 3 derniers dépôts GitHub (classés par date de création, décroissant)
    async getReposInformations() {
        try {
            const response = await fetch("https://api.github.com/users/lili1326/repos?sort=created&direction=desc");
            if (!response.ok) throw new Error("Erreur HTTP");

            const data = await response.json();

            // Appel de la méthode d'affichage avec les 3 projets les plus récents
            await this.updateHTMLProjects(data.slice(0, 3));
        } catch (error) {
            console.error("Erreur lors de getReposInformations :", error);
        }
    }

    // Mise à jour de l’interface avec les projets GitHub
    async updateHTMLProjects(projects) {
        // Sélection des balises pour afficher la date de création
        const dateElements = document.querySelectorAll('.js-home-project-date');

        for (let i = 0; i < projects.length; i++) {
            const infos = projects[i];
            const creationDate = formatDate(infos.created_at); // Conversion de la date

            // Mise à jour du titre et de la description
            this.projectsTitle[i].textContent = infos.name;
            this.projectsDescription[i].textContent = infos.description || 'Aucune description.';

            // Affichage de la date de création si la balise est présente
            if (dateElements[i]) {
                dateElements[i].textContent = `Créé le ${creationDate}`;
            }

             // Sélectionne le bon lien dans le même <li>
            const projectItem = this.projectsTitle[i].closest("li");
            const link = projectItem?.querySelector('a[href="/projet.html"]');
            if (link) {
                link.href = `/projet.html?repo=${encodeURIComponent(infos.name)}`;
            }

            try {
                // Appel de l’API GitHub pour récupérer les langages utilisés
                const response = await fetch(infos.languages_url);
                if (!response.ok) throw new Error("Erreur HTTP");

                const languages = await response.json();

                // Création des balises "tags" dynamiques avec pastilles colorées
                this.projectsTagsContainer[i].innerHTML = Object.keys(languages).map(lang => {
                    return `<span class="tag-lang">
                        <span class="dot" style="background-color:${getColorForLang(lang)};"></span>
                        ${lang}
                    </span>`;
                }).join("");
            } catch (err) {
                // Gestion d’erreur lors de la récupération des langages
                console.error("Erreur lors de la récupération des langages :", err);
                this.projectsTagsContainer[i].textContent = "Langages non disponibles";
            }
        }
    }
}

// Fonction qui retourne une couleur selon le nom du langage (pour les pastilles de tags)
function getColorForLang(lang) {
    const colors = {
        JavaScript: "#f1e05a",
        HTML: "#e34c26",
        CSS: "#563d7c",
        Python: "#3572A5",
        TypeScript: "#2b7489",
        PHP: "#4F5D95",
        Shell: "#89e051",
        Dockerfile: "#384d54"
    };
    return colors[lang] || "#ccc"; // Gris par défaut si langage inconnu
}

// Fonction de formatage de date au format français (ex : 02 juin 2025)
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', options);
}

// Export de la classe pour l’utiliser ailleurs dans l’application (ex: dans app.js)
export { Home };
