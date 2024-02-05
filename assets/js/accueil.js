
//AFFICHAGE ACCUEIL

let btnLogin = document.querySelector("#btnlogin");

btnLogin.addEventListener("click", function() {
    if(btnLogin.textContent == "logout"){
        localStorage.setItem("userId", "");
    }

});

if(localStorage.getItem("userId") && localStorage.getItem("userId") !== ""){
    //CONNECTE
    btnLogin.textContent = "logout";
    document.getElementById("navEdit").style.display = "flex";
    document.querySelector("header").style.paddingTop = "60px";
    document.getElementById("filtres").style.display = "none";
    document.getElementById("svgMod").style.display = "block";
    document.getElementById("modifier").style.display = "block";
    btnLogin.href="index.html";

}else{
    //PAS CONNECTE
    btnLogin.textContent = "login";
    document.getElementById("navEdit").style.display = "none";
    document.querySelector("header").style.paddingTop = "0px";
    document.getElementById("filtres").style.display = "flex";
    document.getElementById("svgMod").style.display = "none";
    document.getElementById("modifier").style.display = "none";
    localStorage.setItem("userId", "");

}


// AFFICHAGE DES TRAVAUX PAGE PRINCIPALE

getTravaux();

function getTravaux () {
    fetch('http://localhost:5678/api/works/')
    .then(function (res){
        return res.json();
    })
    .then(function (data){

        const gallerie = document.querySelector(".gallery");

        data.forEach(function(travail){

            let eltFigure = document.createElement("figure");
            let eltImage =  document.createElement("img");

            eltFigure.dataset.cat = travail.categoryId;
            eltFigure.dataset.id = travail.id;

            eltImage.src = travail.imageUrl;
            eltImage.alt = travail.title;
            eltFigure.appendChild(eltImage);

            let eltFigcaption = document.createElement("figcaption");
            eltFigcaption.textContent = travail.title;

            eltFigure.appendChild(eltFigcaption);
            gallerie.appendChild(eltFigure);
        })
    })
}