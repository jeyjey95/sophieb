let btnLogin = document.querySelector("#btnlogin");
btnLogin.addEventListener("click", function() {
    //console.log("el= "+ el);
    if (btnLogin.textContent==="login")
    {
        console.log("textcontent= login");
        window.location = 'login.html';
    }else{
        console.log("textcontent= logout");
        localStorage.setItem("userId", "");
        window.location = 'index.html';
    }
});


if(localStorage.getItem("userId") && localStorage.getItem("userId")!==""){

    btnLogin.textContent="logout";
    //document.querySelector(".login").className="logout";

    document.getElementById("filtres").style.display="none";
    document.getElementById("svgMod").style.display="block";
    document.getElementById("modifier").style.display="block";


}else{
    btnLogin.textContent="login";
    //document.querySelector(".login").className="login";

    document.getElementById("filtres").style.display="flex";
    document.getElementById("svgMod").style.display="none";
    document.getElementById("modifier").style.display="none";

}
//document.getElementById('dialM').showModal();
// document.getElementsByClassName("clickMod").addEventListener("click", function() {
//     console.log("clickMOD");
// });

const boxes = document.querySelectorAll('.clickMod');

boxes.forEach(box => {
  box.addEventListener('click', function (event) {
   // document.getElementById('dialM').setAttribute("open","");
    document.getElementById('dialM').showModal();
    getTravauxMod();
    console.log('box clicked', event);

   // box.setAttribute('style', 'background-color: yellow;');
    });
});

document.getElementById("svgClose").addEventListener("click", function() {
    document.getElementById('dialM').close();
});
document.getElementById("svgClose2").addEventListener("click", function() {
    document.getElementById('dialAjout').close();
});


document.getElementById("btnAjout").addEventListener("click", function() {
    document.getElementById('dialM').close();
    document.getElementById('dialAjout').showModal();
});

//document.getElementById('dialAjout').showModal();

function getTravaux () {
    fetch('http://localhost:5678/api/works/')
    .then(function (res){
        return res.json();
    })
    .then(function (data){

        //console.log(data);

        const gallerie = document.querySelector(".gallery");

        data.forEach(function(travail){

           // let gallerie = document.querySelector(".gallery");
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

getTravaux();



// AJOUT PREVIEW
document.getElementById('newImg').addEventListener('change', function(e){

   // e.preventDefault();
    let file=document.forms["formNewPic"].elements["newImg"].files[0];

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function() {
        //console.log('RESULT: ', reader.result);
        let result=reader.result;
        let eltPreview = document.createElement("img");
        eltPreview.src = result;
        eltPreview.alt = "imgReview";
        eltPreview.style.maxHeight="169px";

        let preview = document.getElementById('conteneurPreview')
        preview.innerHTML="";
        preview.appendChild(eltPreview);
    }

});

// AJOUT PHOTO
document.getElementById("formNewPic").addEventListener('submit',function(e){
    e.preventDefault();

    console.log("btn ajout");

    let file = document.forms["formNewPic"].elements["newImg"].files[0];
    let titre = document.forms["formNewPic"].elements["titre"].value;
    let cat = document.forms["formNewPic"].elements["cat"].value;

    console.log(file);

    var form = new FormData();
	form.append('image', file);
	form.append('title',titre);
    form.append('category',cat);

  //  formattedFormData = {image:   ,title:  , category:   }
    ajoutTravaux(form);

});

 async function ajoutTravaux(formattedFormData) {

        let token = localStorage.getItem("token");
        const reponse = await fetch("http://localhost:5678/api/works/",{
 			method: 'POST',
 			body: formattedFormData,
            headers: {
                Authorization: `Bearer ${token}`,
             }

		});document.getElementById('dialAjout').close();
        if (reponse.ok) {
            console.log("image mise");

        }else console.log("image pas mise");

 }

async function getTravauxMod() {
    const reponse = await fetch("http://localhost:5678/api/works/");
    const data = await reponse.json();

    //console.log(data);

    let gallerieMod = document.getElementById("conteneurPic");
    gallerieMod.innerHTML="";

    data.forEach(function(travail){

        // let gallerie = document.querySelector(".gallery");
        let eltFigure = document.createElement("figure");
        let eltImage1 =  document.createElement("img");
        let eltImage2 =  document.createElement("img");


        eltFigure.dataset.cat = travail.categoryId;
        eltFigure.dataset.id = travail.id;
        eltFigure.style.width="76px";
        eltFigure.style.height="102px";
        eltFigure.style.position="relative";

        // eltFigure.style.backgroundImage="url('assets/icons/trash.svg'),url('"+travail.imageUrl+"')";
        // eltFigure.style.backgroundSize="contain";
        // eltFigure.style.backgroundPosition="right 2px top";
        // eltFigure.style.displayt="inline-grid";

        //eltFigure.className="figureMod";
        // eltFigure.style.gap="10px";

        eltImage1.src = travail.imageUrl;
        eltImage1.alt = "imgTravail";
        eltImage1.style.objectFit="contain";
        eltImage1.style.width="76px";
        eltImage1.style.height="102px";
        eltImage1.style.position="absolute";

        eltImage2.src = 'assets/icons/trash.svg';
        eltImage2.alt = "trashIcon";
        eltImage2.className="trashIcon";
        eltImage2.dataset.cat = travail.categoryId;
        eltImage2.dataset.id = travail.id;
        eltImage2.style.background="black";
        eltImage2.style.borderRadius="3px";
        eltImage2.style.padding="4px";
        eltImage2.style.position="absolute";
        eltImage2.style.right="6px";
        eltImage2.style.top="6px";

        eltFigure.appendChild(eltImage1);
        eltFigure.appendChild(eltImage2);
        gallerieMod.appendChild(eltFigure);

        // SUPPRESSION TRAVAUX
        eltImage2.addEventListener("click", function(e){
            e.preventDefault();
            e.stopPropagation();
           // document.getElementById("dialM").preventDefault();
            console.log("id= "+travail.id)


            let token = localStorage.getItem("token");
            let lien = "http://localhost:5678/api/works/"+travail.id;


            var xhr = new XMLHttpRequest();
		
            xhr.open('DELETE', lien);

            xhr.setRequestHeader("accept", "*/*");
            xhr.setRequestHeader("Authorization", "Bearer "+token);

            xhr.onload = function (e) {
                console.log("ondone")
                 
                let btnSup = document.querySelectorAll("figure[data-id='"+travail.id+"']");
                for (let selSup of btnSup) {
                
                    selSup.style.display="none";
                }
            };

            xhr.onloadend = function (e) {
                console.log("onloadend")
            }
           
            xhr.onerror = function() {
                console.log("xhr.onerror ="+onerror) 
            };
                    
            xhr.send();



            // supTravaux();
            // async function supTravaux() {
            //     const response = await fetch(lien,{
            //     method: 'DELETE',
            //     headers: {
            //         accept: "*/*",
            //         Authorization: `Bearer ${token}`,
            //       },
            //     //body: formattedFormData
            //     });
            //     if (response.ok) {
            //         try {
            //             let sel = document.querySelector("figure [data-id='"+travail.id+"']");
            //             sel.style.display="none";

            //         return false;
            //         } catch (error) {
            //             console.log("error response="+error);
            //             return false;
            //         }

            //       } else {
            //             alert("Echec de suppression");
            //             return false;
            //       }
            // }
        });


    })
   // })
}


//FILTRES

//window.addEventListener("load", function() {

let btnsFilter = document.getElementsByClassName("btn-filter");
// console.log(btnsFilter);

 for (let btn of btnsFilter) {
    // btnsFilter.forEach(function(btn){
    // console.log(`btncosole=${btn}`);
    btn.addEventListener("click",() => {
    // e.preventDefault();

       if (btn.dataset.id === "all"){
            console.log("btndataset ok");
            // let nameOject = document.querySelectorAll["figure[data-cat='1']"];
            let container = document.querySelector("body");
            const nameOject = container.querySelectorAll( "figure[data-cat]"); //:scope .gallery >
            console.log(`nameOject= ${nameOject}`);
            //for (let name of nameOject) {
            nameOject.forEach(function(name) {
               name.style.display="block";
            });
        }

        else if (btn.dataset.id === "1"){
            console.log("btndataset ok");
            // let nameOject = document.querySelectorAll["figure[data-cat='1']"];
            let container = document.querySelector("body");
            const nameOject = container.querySelectorAll("figure[data-cat]");
            console.log('nameOject= '+nameOject);
            //for (let name of nameOject) {
            nameOject.forEach(function(name) {
                if (name.dataset.cat!=="1") name.style.display="none";
                if (name.dataset.cat==="1") name.style.display="block";
            });
        }

        if (btn.dataset.id === "2"){
            console.log("btndataset ok");
           // let nameOject = document.querySelectorAll["figure[data-cat='1']"];
            let container = document.querySelector("body");
            const nameOject = container.querySelectorAll("figure[data-cat]");
            console.log('nameOject= '+nameOject);
            //for (let name of nameOject) {
            nameOject.forEach(function(name) {
            if (name.dataset.cat!=="2") name.style.display="none";
            if (name.dataset.cat==="2") name.style.display="block";
            });
        }

        if (btn.dataset.id === "3"){
            console.log("btndataset ok");
           // let nameOject = document.querySelectorAll["figure[data-cat='1']"];
            let container = document.querySelector("body");
            const nameOject = container.querySelectorAll("figure[data-cat]");
            console.log('nameOject= '+nameOject);
            //for (let name of nameOject) {
            nameOject.forEach(function(name) {
                if (name.dataset.cat!=="3") name.style.display="none";
                if (name.dataset.cat==="3") name.style.display="block";
            });
        }
    });
}
//});