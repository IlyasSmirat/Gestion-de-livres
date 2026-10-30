
const Fform = document.getElementById('form input')
const tableB = document.querySelector("#tableBody");
const Titre = document.querySelector("#title");
const auteur = document.querySelector("#auteur");
const submit = document.querySelector("#btnAjouter");
const annee = document.querySelector("#year");
const genre = document.querySelector("#genre");
const nameRule = /^[\p{L}\d ]{2,}$/u;
const digitRule = /^[\p{L} ]{2,}$/u;
const anneeRule = /^\d{4}$/;
const genreRule = /^\p{L}+$/u;

const Books = JSON.parse(localStorage.getItem("Books")) || [];

function validTitle(){
    const isValid = nameRule.test(Titre.value)

    if(isValid){
        return true;
    }
    else{
        
        return false;
    }
}

function validAuteur(){
    const isValid = digitRule.test(auteur.value);

    if(isValid){
        return true;
    }
    else{
        return false;
    }
}

function validAnnee(){
    const isValid = anneeRule.test(annee.value);

    if(isValid){
        return true;
    }
    else{
        return false;
    }
}

function validGenre(){
    const isValid = genreRule.test(genre.value);

    if(isValid){
        return true;
    }
    else{
        return false;
    }
}

const messgEeeu = document.getElementById("erreurNom");
const messageAuteur = document.getElementById("erreurauteur");
const messageAnnee = document.getElementById("erreurannee");
const messageGenre = document.getElementById("erreurgenre");

function AjouterLivre(){
    if(!validTitle()){
        messgEeeu.classList.remove("hidden");
    }else{
        messgEeeu.classList.add("hidden");
    }


    if(!validAuteur()){
        messageAuteur.classList.remove("hidden");
    }
    else{
        messageAuteur.classList.add("hidden");
    }


    if(!validGenre()){
        messageGenre.classList.remove("hidden");
    }
    else{
        messageGenre.classList.add("hidden");
    }


    if(!validAnnee()){
        messageAnnee.classList.remove("hidden");
    }
    else{
        messageAnnee.classList.add("hidden");
    }

    if(!validTitle() || !validAuteur() || !validGenre() || !validAnnee()){
        return;
    }
    
    const bookData = {
        Titre: Titre.value,
        auteur: auteur.value,
        annee: Number(annee.value),
        genre: genre.value,
    }
    Books.push(bookData);
    localStorage.setItem("Books", JSON.stringify(Books));
}

submit.addEventListener("click", function(){
    AjouterLivre();
    affichierListe();
    const inputs = document.getElementsByName('input')
    inputs.forEach(function(input){
    input.value = "";
});

})

function affichierListe(){
    tableB.innerHTML = "";

    Books.forEach(function(td){
        tableB.innerHTML += `
            <tr>
                <td>${td.Titre}</td>
                <td>${td.auteur}</td>
                <td>${td.annee}</td>
                <td>${td.genre}</td>
                <td><button type="button" class="btnModifier">Modifier</button></td>
                    <td><button type="button" class="btnSupprimer">Supprimer</button></td>
            </tr>
        `
    });
};
affichierListe();

const titlebutton = document.querySelector("#buttontitre");
const inputsearch = document.querySelector("#Ajouter");
const cherchebody = document.querySelector("#tablecherche");

function searchtitle(){
    const title = inputsearch.value.trim();
    const result = Books.filter((line) => {
        return line.Titre.toLowerCase().includes(title);
    })
    return result;
}

function createTable(i){
    const line = document.createElement("tr");
    cherchebody.textContent = "";

    line.innerHTML = `
    <td>${i[0].Titre}</td>
    <td>${i[0].auteur}</td>
    <td>${i[0].annee}</td>
    <td>${i[0].genre}</td>
    `
    cherchebody.appendChild(line);
}

const errorSearch = document.querySelector("#searchErreur");

titlebutton.addEventListener("click", function(){
    const result = searchtitle();
    if(result.length == 0 || inputsearch.value === ""){
        errorSearch.textContent = "Titre introuvable !";
        errorSearch.classList.remove("hidden");
    }
    else{
        errorSearch.classList.add("hidden");
        cherchebody.classList.remove("hidden");
        createTable(result);
    }
});


function searchAuteur(){
    const auteur = inputsearch.value.trim();
}