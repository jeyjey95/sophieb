// AFFICHAGE MODALE SUPPRESSION TRVAUX
const boxes = document.querySelectorAll('.clickMod');
boxes.forEach(box => {
    box.addEventListener('click', function () {
        document.getElementById('dialM').showModal();
        getTravauxMod();
    });
});

//AFFICHAGE MODALE AJOUT TRAVAUX
document.getElementById("btnAjout").addEventListener("click", function() {
    document.getElementById('dialM').close();

    document.forms["formNewPic"].reset();
    document.forms["formNewPic"].titre.style.background = "white";
    document.forms["formNewPic"].cat.style.background = "white";

    let idOption = document.getElementById("optionElmt");
    if(idOption)  
        document.forms["formNewPic"].cat.removeChild(idOption);

    document.getElementById("messEerrorFile").style.display="none";
    document.getElementById('dialAjout').showModal();
});

//RETOUR VERS MODALE SUPPRESSION TRVAUX
document.getElementById("dialRetour").addEventListener("click", function() {
    document.getElementById('dialM').showModal();
    document.getElementById('dialAjout').close();
});

//FERMETURE DES MODALES
document.getElementById("svgClose").addEventListener("click", function() {
    document.getElementById('dialM').close();
});
document.getElementById("svgClose2").addEventListener("click", function() {
    document.getElementById('dialAjout').close();
});

//CLICK SUR BACKDROP 1ERE MODALE
document.getElementById("dialM").addEventListener("click", function(e) {
    document.getElementById('dialM').backdrop = "true";
    if(e.target.backdrop)
        document.getElementById('dialM').close();
    
});

//CLICK SUR BACKDROP 2EME MODALE
document.getElementById("dialAjout").addEventListener("click", function(e) {
    document.getElementById('dialAjout').backdrop = "true";
    if(e.target.backdrop)
        document.getElementById('dialAjout').close();
    
});


// AFFICHE LES TRAVAUX DANS LA MODALE
async function getTravauxMod() {
    const reponse = await fetch("http://localhost:5678/api/works/");
    const data = await reponse.json();

    let gallerieMod = document.getElementById("conteneurPic");
    gallerieMod.innerHTML="";

    data.forEach(function(travail){

        let eltFigure = document.createElement("figure");
        let eltImage1 = document.createElement("img");
        let eltImage2 = document.createElement("img");

        eltFigure.dataset.cat = travail.categoryId;
        eltFigure.dataset.id = travail.id;

        eltImage1.src = travail.imageUrl;
        eltImage1.alt = "imgTravail";
        eltImage1.id = "picGallerieModal";

        eltImage2.src = 'assets/icons/trash.svg';
        eltImage2.alt = "trashIcon";
        eltImage2.className = "trashIcon";
        eltImage2.dataset.cat = travail.categoryId;
        eltImage2.dataset.id = travail.id;
        eltFigure.appendChild(eltImage1);
        eltFigure.appendChild(eltImage2);
        gallerieMod.appendChild(eltFigure);

        eltImage2.addEventListener("click", function(){
            supTravaux(travail.id);
        });
    });
}


// SUPPRESSION TRAVAUX
async function supTravaux(travauxId) {

    let token = localStorage.getItem("token");
    let lien = "http://localhost:5678/api/works/"+travauxId;

    const response = await fetch(lien,{
        method: 'DELETE',
        headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
        }
    });

    if (response.ok) {
        let btnSup = document.querySelectorAll("figure[data-id='"+travauxId+"']");
        for (let selSup of btnSup) {
            selSup.style.display="none";
        }
    }
}


// PREVISUALISATION DE LA PHOTO AVANT AJOUT

document.getElementById('newImg').addEventListener('change', function(e){

    let file=document.forms["formNewPic"].elements["newImg"].files[0];

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function() {
        let result = reader.result;
        let eltPreview = document.createElement("img");
        eltPreview.src = result;
        eltPreview.alt = "Image de prévisualisation";
        eltPreview.style.maxHeight="169px";

        document.getElementById('conteneurClickPreview').style.display="none";
        let preview = document.getElementById('conteneurPreview');
        preview.style.display = "flex";
        preview.appendChild(eltPreview);
    }
});


//BOUTON VALIDATION AJOUT TRAVAIL

document.getElementById("formNewPic").addEventListener('change',function(e){

    let file = document.forms["formNewPic"].elements["newImg"].files[0];
    let titre = document.forms["formNewPic"].elements["titre"].value;
    let cat = document.forms["formNewPic"].elements["cat"].value;

    if(file != "" && titre != "" && cat != ""){
        console.log("vide");
        document.getElementById("btnValiderAjout").style.background = "#1D6154";
    }
    else document.getElementById("btnValiderAjout").style.background = "#A7A7A7";
});


// AJOUT DU TRAVAIL

document.getElementById("btnValiderAjout").addEventListener('click',function(e){
    e.preventDefault();

    //console.log("btn ajout");
    let titreElm = document.forms["formNewPic"].elements.titre;
    let catElm = document.forms["formNewPic"].elements.cat;
    let fileElm = document.forms["formNewPic"].elements["newImg"];

    let file = fileElm.files[0];
    let titre = titreElm.value;
    let cat = catElm.value;
    let formAjout = true;

    if (titre == false){
        titreElm.value = "Veuillez remplir un titre";
        titreElm.style.background="red";
        formAjout = false;
    }

    if(cat == ""){
        var optionForm = document.createElement("OPTION");
        optionForm.setAttribute('selected','selected');
        optionForm.setAttribute('disabled','');
        optionForm.setAttribute('id','optionElmt');

        var t = document.createTextNode("Veuillez sélectionner une catégorie");
        optionForm.appendChild(t);
        catElm.appendChild(optionForm);
        catElm.style.background="red";
        formAjout = false;
    }

    if(file === undefined){
        formAjout = false;
        document.getElementById("messEerrorFile").style.display = "table";
    }

    if(formAjout != false){
        var form = new FormData();
        form.append('image', file);
        form.append('title',titre);
        form.append('category',cat);

        ajoutTravaux(form);
    }
});

async function ajoutTravaux(formattedFormData) {

    let token = localStorage.getItem("token");

    const reponse = await fetch("http://localhost:5678/api/works/",{
        method: 'POST',
        body: formattedFormData,
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    
    if (reponse.ok) {
        document.getElementById('conteneurPreview').innerHTML = "";
        document.forms["formNewPic"].reset();
        document.querySelector("#portfolio .gallery").innerHTML = "";
        getTravaux();
        document.getElementById('conteneurClickPreview').style.display = "flex";
        document.getElementById('conteneurPreview').style.display = "none";
        document.getElementById('dialAjout').close();
    }
}