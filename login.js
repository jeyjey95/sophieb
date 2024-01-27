document.querySelector("#btnlogin").addEventListener("click", function() {
    window.location.href = 'login.html';
});

if(window.location.href.includes('login.html')){
    document.querySelector("#btnlogin").style.fontWeight="bold";
}


const formulaireLogin = document.querySelector("#formLogin");
formulaireLogin.addEventListener("submit", function (event) {

    event.preventDefault();
    formLogin();
    // Création de l’objet du nouvel avis.
    //formLogin(chargeUtile);
    async function formLogin() {

        let credential = {
            email: event.target.querySelector("[name=mail]").value,
            password: event.target.querySelector("[name=password").value,
        };
        // Création de la charge utile au format JSON
        let chargeUtile = JSON.stringify(credential);
    
        console.log(chargeUtile);

        let response= await fetch("http://localhost:5678/api/users/login/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: chargeUtile
        });

        let data= await response.json();
		console.log(data);
        if (data.userId)
        {
            console.log("setItem");
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("token", data.token);
            window.location = 'index.html';
        }
        else alert("Identification incorrecte");
        
    }
});

