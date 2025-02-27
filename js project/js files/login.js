
class user {
    constructor(name, email, password, confirmPassword) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }
}

// ...existing code...

function sign_up() {
    var a = document.getElementById("nm").value;
    var b = document.getElementById("em").value;
    var c = document.getElementById("ps").value;
    var d = document.getElementById("lps").value;

    if (a==""||b=="") 
        {
        alert("remplir les champs");
        }

     else if (c == d&&c!=""&&d!="") {
        var u = new user(a, b, c, d);
        let users = JSON.parse(localStorage.getItem("utilisateur")) || [];
        users.push(u);
        console.log(u);
        localStorage.setItem("utilisateur", JSON.stringify(users));
        alert("votre compte a été bien enregistré");
    }
    else{
        alert("verifier votre mot de passe");
    }
}

class sign{
    email;
    password;
    constructor(e,p)
    {
        this.email=e;
        this.password=p;

    }

}

function sign_in()
{
    var a=document.getElementById("e").value;
    var b=document.getElementById("p").value;
    let user=JSON.parse(localStorage.getItem("utilisateur")) || [];
    var lien=document.getElementById("lien");
    var exit=user.find(utilisateur=>a==utilisateur.email&&b==utilisateur.password) ;

    if(exit)
    {
        alert("bienvenue "+exit.name);
        lien.setAttribute("href","page.html");
        lien.click();
    }
    else if (a==""||b=="") 
    {
        alert("remplir les champs");
    }
    else if (a === "admin@example.com" && b === "admin123")
    {
        alert("Bienvenue Admin");
        lien.setAttribute("href", "admin_page.html");
        lien.click();
    }
    else
    {
        alert("verifier votre email ou mot de passe");
    }
   


}


/*------------------------------------------------------Admin section---------------------------------------------------------------*/

/*--------------------------affichage des utilisateurs pour l'interface d'admin----------------------*/
function afficher_utilisateurs() {
    // Récupérer la section où les utilisateurs seront affichés
    const usersSection = document.getElementById("usersSection");
    const usersResult = document.getElementById("usersResult");

    // Réinitialiser le contenu de la section
    usersResult.innerHTML = "";

    // Vérifier si des utilisateurs sont stockés dans le localStorage
    const utilisateurs = localStorage.getItem("utilisateur");

    if (utilisateurs) {
        // Convertir les données JSON en tableau d'objets
        const usersArray = JSON.parse(utilisateurs);

        // Générer une liste des utilisateurs connectés
        if (usersArray.length > 0) {
            const userList = document.createElement("ul");

            usersArray.forEach((user, index) => {
                const listItem = document.createElement("li");

                // Ajouter les informations de l'utilisateur
                const userInfo = document.createElement("span");
                userInfo.textContent = `Nom: ${user.name}, Email: ${user.email}`;
                listItem.appendChild(userInfo);

                // Ajouter le bouton de suppression
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Supprimer";
                deleteButton.style.marginLeft = "10px";
                deleteButton.onclick = () => supprimer_utilisateur(index);
                listItem.appendChild(deleteButton);

                userList.appendChild(listItem);
            });

            usersResult.appendChild(userList);
        } else {
            usersResult.textContent = "Aucun utilisateur connecté pour le moment.";
        }
    } else {
        usersResult.textContent = "Aucune donnée d'utilisateur trouvée.";
    }

    // Afficher la section des utilisateurs
    usersSection.style.display = "block";
}


/*--------------------------suppression d'un utilisateur----------------------*/
function supprimer_utilisateur(index) {
    // Récupérer les utilisateurs connectés depuis le localStorage
    const utilisateurs = localStorage.getItem("utilisateur");

    if (utilisateurs) {
        // Convertir les données JSON en tableau d'objets
        const usersArray = JSON.parse(utilisateurs);

        // Supprimer l'utilisateur à l'index donné
        usersArray.splice(index, 1);

        // Mettre à jour le localStorage
        localStorage.setItem("utilisateur", JSON.stringify(usersArray));

        // Réactualiser l'affichage
        afficher_utilisateurs();
    }
}
/*-----------------------afficher commande--------------------*/
function afficher_commandes() {
    // Récupérer la section où les commandes seront affichées
    const ordersSection = document.getElementById("ordersSection");
    const ordersResult = document.getElementById("ordersResult");

    // Réinitialiser le contenu de la section
    ordersResult.innerHTML = "";

    // Exemple de récupération de commandes depuis le localStorage
    const commandes = localStorage.getItem("commande");

    if (commandes) {
        const commandesArray = JSON.parse(commandes);

        if (commandesArray.length > 0) {
            const ordersList = document.createElement("ul");

            commandesArray.forEach((commande, index) => {
                const listItem = document.createElement("li");
                listItem.textContent = `Commande ID: ${commande.id}, Name: ${commande.nom}, Email: ${commande.email}, Address: ${commande.adresse}, Brand: ${commande.marque}, Quantity: ${commande.quantite}`;

                // Ajouter un bouton pour supprimer la commande
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Supprimer";
                deleteButton.className = "delete-btn";
                deleteButton.onclick = () => supprimer_commande(index);
                listItem.appendChild(deleteButton);

                ordersList.appendChild(listItem);
            });

            ordersResult.appendChild(ordersList);
        } else {
            ordersResult.textContent = "Aucune commande disponible.";
        }
    } else {
        ordersResult.textContent = "Aucune donnée de commande trouvée.";
    }

    // Afficher la section des commandes
    ordersSection.style.display = "block";
}
/*-----------------------supprimer commande--------------------*/

function supprimer_commande(index) {
    const commandes = localStorage.getItem("commande");

    if (commandes) {
        const commandesArray = JSON.parse(commandes);
        commandesArray.splice(index, 1);
        localStorage.setItem("commande", JSON.stringify(commandesArray));
        afficher_commandes();
    }
}




