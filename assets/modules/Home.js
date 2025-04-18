 //import bib github https://github.com/octokit/octokit.js
//avec la partie getReposInformation
import { Octokit, App } from "https://esm.sh/octokit";

class Home {
    constructor() {
        this.descriptionHTML = document.querySelector('.js-home-description');
        this.profilHTML = document.querySelector('.js-home-profil-url');
        this.avatarHTML = document.querySelector('.js-home-avatar');

        this.projectsTitle = document.querySelectorAll('.js-home-project-title');
        this.projectsDescription = document.querySelectorAll('.js-home-project-description');
        this.projectsTagsContainer = document.querySelectorAll('.js-home-project-tags-container');

        this.init();
    }

    init() {
        this.getUserInformations();
        this.getReposInformations();
    }

    getUserInformations() {
        fetch("https://api.github.com/users/lili1326")
            .then((response) => response.json())
            .then((data) => {
                this.descriptionHTML.textContent = data.bio;
                this.profilHTML.href = data.html_url;
                this.profilHTML.textContent = data.html_url;
                this.avatarHTML.src = data.avatar_url;
            })
            .catch((error) => {
                console.error("Erreur lors de l'appel de l'API getUserInformations", error);
            });
    }

    async getReposInformations() {
        const octokit = new Octokit();

        try {
            const response = await octokit.request("GET /users/lili1326/repos");
            await this.updateHTMLProjects(response.data);
        } catch (error) {
            console.log("Erreur lors de l'appel de l'API getReposInformations", error);
        }
    }

    async updateHTMLProjects(projects) {
        let htmlIndex = 0;

        for (let i = 0; i < 3 && i < projects.length; i++) {
            const infos = projects[i];
            console.log(infos);

            this.projectsTitle[htmlIndex].textContent = infos.name;
            this.projectsDescription[htmlIndex].textContent = infos.description;

            try {
                const languages = await fetch(infos.languages_url).then(res => res.json());
                const tags = Object.keys(languages).join(", ");
                this.projectsTagsContainer[htmlIndex].textContent = tags;
            } catch (err) {
                console.error("Erreur lors de la récupération des languages:", err);
                this.projectsTagsContainer[htmlIndex].textContent = "Langages non disponibles";
            }

            htmlIndex++;
        }
    }
}

// Export de la classe
export { Home };
