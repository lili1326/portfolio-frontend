//FETCH

class Home {
    constructor() {
        this.descriptionHTML = document.querySelector('.js-home-description');
        this.profilHTML = document.querySelector('.js-home-profil-url');
        this.avatarHTML = document.querySelector('.js-home-avatar');

        this.init();
    }

    init() {
        //Récupérer les info du profil depuis l api
        this.getUserInformations();
        
    }

    getUserInformations() {
        //API ex 1 récupérer le contenu avec un fetch
        fetch("https://api.github.com/users/lili1326")
            .then((response) => response.json())
            .then((data) => {
                this.uppdateHTML(data)              
            })
            .catch((error) => {
                console.error("Erreur lors de l'appel de l'API", error);
            });
    }

    uppdateHTML(APIdata){
        //afficher la descristion de mon profil github
        this.descriptionHTML.textContent = APIdata.bio;
         //afficher l url de mon profilt github
         this.profilHTML.setAttribute("href",APIdata.html_url)
         //afficher mon avatar  
        this.avatarHTML.setAttribute("scr",APIdata.avatar_url)
    }
}

// Export de la classe
//export { Home };
