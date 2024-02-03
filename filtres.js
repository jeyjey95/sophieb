let btnsFilter = document.getElementsByClassName("btn-filter");

for (let btn of btnsFilter) {
    btn.addEventListener("click",() => {
        if (btn.dataset.id === "all"){
            console.log("btndataset ok");
            let container = document.querySelector("body");
            const nameOject = container.querySelectorAll( "figure[data-cat]");
            nameOject.forEach(function(name) {
                name.style.display="block";
            });
        }

        else if (btn.dataset.id === "1"){
            let container = document.querySelector("body");
            const nameOject = container.querySelectorAll("figure[data-cat]");
            nameOject.forEach(function(name) {
                if (name.dataset.cat !== "1") name.style.display = "none";
                if (name.dataset.cat === "1") name.style.display = "block";
            });
        }

        else if (btn.dataset.id === "2"){
            let container = document.querySelector("body");
            const nameOject = container.querySelectorAll("figure[data-cat]");
            nameOject.forEach(function(name) {
            if (name.dataset.cat !== "2") name.style.display = "none";
            if (name.dataset.cat === "2") name.style.display = "block";
            });
        }

        else if (btn.dataset.id === "3"){
            let container = document.querySelector("body");
            const nameOject = container.querySelectorAll("figure[data-cat]");
            nameOject.forEach(function(name) {
                if (name.dataset.cat !== "3") name.style.display = "none";
                if (name.dataset.cat === "3") name.style.display = "block";
            });
        }
    });
}