//import bib github https://github.com/octokit/octokit.js
//avec la partie getReposInformation
//import { Octokit, App } from "https://esm.sh/octokit";
 



class Home {
    constructor() {
        this.projectsTitle = document.querySelectorAll('.js-home-project-title');
        this.projectsDescription = document.querySelectorAll('.js-home-project-description');
        this.projectsTagsContainer = document.querySelectorAll('.js-home-project-tags-container');

        this.init();
    }

    init() {
        //récupérer les infos du repo depuis l api
        this .getReposInformations();
        
    }

    //API ex 2 récupérer le contenu avec Oktokit JS avec=> away /async
    async getReposInformations(){
        
        //console.log(this.projectsTitle)
        //console.log(this.projectsDescription)
        //console.log(this.projectsTagsContainer)
       // console.log(Octokit)
        // Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
        //https://api.github.com/users/lili1326/repos"  
        const octokit = new Octokit( );
        //je stock la réponse
        const response = await octokit
        .request("GET /users/lili1326/repos")
        .catch((error) => {
            console.log("Erreur lors de l'appel de l'API getReposInformations", error)
        })
        //console.log(response) // contient les infos sur les dépôts
       // const data = response.data
        //console.log(data)
        //console.log(response.status)
        this.updateHTMLProjects(response.data)      
    }

        updateHTMLProjects(projects){
            let htmlIndex = 0
            for(let i= 0 ; i<3; i++){
                const infos =projects[i]
                console.log(infos)
                this.projectsTitle[htmlIndex].textContent=infos.name
                this.projectsDescription[htmlIndex].textContent = infos.description
                const languages = infos.topics
               // console.log(languages)
            htmlIndex++
             
            }
        }
}

// Export de la classe
//export { Home };
