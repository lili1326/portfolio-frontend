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
                //console.log(data);
                //afficher la descristion de mon profil github
                //afficher l url de mon profilt github
                //afficher mon avatar 
                this.descriptionHTML.textContent = data.bio;
                this.profilHTML.href = data.html_url;
                this.profilHTML.textContent = data.html_url;
                this.avatarHTML.src = data.avatar_url;
            })
            .catch((error) => {
                console.error("Erreur lors de l'appel de l'API", error);
            });
    }
}

// Export de la classe
export { Home };
