
// Classe pour représenter une commande
class Commande {
    constructor(nom, email, adresse, option, quantite) {
        this.nom = nom;
        this.email = email;
        this.adresse = adresse;
        this.marque = option;
        this.quantite = quantite;
    }
}

function add() {
    // Récupération des champs du formulaire
    var a = document.getElementById("name").value;
    var b = document.getElementById("address").value;
    var c = document.getElementById("email").value;
    var d = document.getElementById("quantity").value;
    var e = document.getElementById("op").value;

  

    // Vérification du format de l'email
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(c)) {
        alert("Veuillez entrer une adresse email valide.");
        return;
    }

    // Vérification si la quantité est un nombre valide
    if (isNaN(d) || parseInt(d) <= 0) {
        alert("Veuillez entrer une quantité valide (un nombre positif).");
        return;
    }

    // Création d'une nouvelle commande
    var commande = new Commande(a, c, b, e, d);

    // Génération d'un ID unique pour la commande
    var uniqueId = Date.now();
    commande.id = uniqueId;

    // Récupération des commandes existantes depuis localStorage
    let commandes = JSON.parse(localStorage.getItem("commande")) || [];

    // Ajout de la nouvelle commande
    commandes.push(commande);

    // Mise à jour de localStorage
    localStorage.setItem("commande", JSON.stringify(commandes));

    // Confirmation de l'enregistrement
    alert("Votre commande a été bien enregistrée !");
    alert("veuiller enregistrer cet ID: " + uniqueId);

    // Réinitialisation des champs du formulaire
    document.getElementById("name").value = "";
    document.getElementById("address").value = "";
    document.getElementById("email").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("op").value = "";
}

//-------------suivie_de_commande---------------//



function suivie() {
   var id = document.getElementById("cherche").value; // ID de recherche
   var commandes = JSON.parse(localStorage.getItem("commande")) || [];
   
   // Filtrer les commandes correspondant à l'ID recherché
   var commandesFiltrees = id ? commandes.filter(c => c.id == id) : commandes;

   // Sélectionner la div pour afficher les commandes
   var commandeResultDiv = document.getElementById("commandeResult");
   commandeResultDiv.innerHTML = ""; // Effacer tout contenu précédent

   if (commandesFiltrees.length > 0) {
       // Créer un tableau
       var table = document.createElement("table");
       var header = table.createTHead();
       var headerRow = header.insertRow(0);

       // En-têtes du tableau
       var headers = ["Nom", "Email", "Adresse", "Marque", "Quantité", "Actions"];
       headers.forEach(headerText => {
           var cell = headerRow.insertCell();
           cell.innerHTML = `<b>${headerText}</b>`;
       });

       // Ajouter les lignes pour chaque commande filtrée
       var body = table.createTBody();
       commandesFiltrees.forEach(commande => {
           var row = body.insertRow();

           // Ajouter les données dans les colonnes
           var values = [commande.nom, commande.email, commande.adresse, commande.marque, commande.quantite];
           values.forEach(value => {
               var cell = row.insertCell();
               cell.textContent = value;
           });

           // Ajouter une cellule pour les boutons
           var actionCell = row.insertCell();

           // Bouton Modifier
           var modifyButton = document.createElement("button");
           modifyButton.textContent = "Modifier";
           modifyButton.style.marginRight = "10px";
           modifyButton.onclick = function () {
               modifierCommande(commande.id);
           };

           // Bouton Supprimer
           var deleteButton = document.createElement("button");
           deleteButton.textContent = "Supprimer";
           deleteButton.onclick = function () {
               supprimerCommande(commande.id);
           };

           actionCell.appendChild(modifyButton);
           actionCell.appendChild(deleteButton);
       });

       commandeResultDiv.appendChild(table);
   } else {
       alert("Aucune commande trouvée !");
   }
}


/*-----------------modifier_commande-----------------*/
function modifierCommande(id) {
   var commandes = JSON.parse(localStorage.getItem("commande")) || [];
   var commande = commandes.find(c => c.id == id);

   if (commande) {
       // Demander de nouvelles informations
       var nouveauNom = prompt("Entrer le nouveau nom :", commande.nom);
       var nouvelEmail = prompt("Entrer le nouvel email :", commande.email);
       var nouvelleAdresse = prompt("Entrer la nouvelle adresse :", commande.adresse);
       var nouvelleMarque = prompt("Entrer la nouvelle marque :", commande.marque);
       var nouvelleQuantite = prompt("Entrer la nouvelle quantité :", commande.quantite);

       // Mettre à jour la commande
       commande.nom = nouveauNom || commande.nom;
       commande.email = nouvelEmail || commande.email;
       commande.adresse = nouvelleAdresse || commande.adresse;
       commande.marque = nouvelleMarque || commande.marque;
       commande.quantite = nouvelleQuantite || commande.quantite;

       // Enregistrer dans localStorage
       localStorage.setItem("commande", JSON.stringify(commandes));

       // Mettre à jour l'affichage
       suivie();
   } else {
       alert("Commande non trouvée !");
   }
}

/*-----------------supprimer_commande-----------------*/
function supprimerCommande(id) {
   var commandes = JSON.parse(localStorage.getItem("commande")) || [];
   var index = commandes.findIndex(c => c.id == id);

   if (index !== -1) {
       // Confirmer la suppression
       if (confirm("Êtes-vous sûr de vouloir supprimer cette commande ?")) {
           commandes.splice(index, 1); // Supprimer la commande
           localStorage.setItem("commande", JSON.stringify(commandes)); // Enregistrer les modifications

           // Mettre à jour l'affichage
           suivie();
       }
   } else {
       alert("Commande non trouvée !");
   }
}






