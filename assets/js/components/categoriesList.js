console.log("Module/composant categoriesList chargé !");

let categoriesList = {

    apiBaseURL: "https://benoclock.github.io/S07-todolist/",

    init: function () {
        categoriesList.loadCategoriesFromAPI();
    },

    loadCategoriesFromAPI: function () {
        //console.log("JE SUIS DANS LA FONCTION!!!!!!!")

        // On prépare la configuration de la requête HTTP
        let fetchOptions = {
            method: "GET",
            mode: "cors",
            cache: "no-cache"
        };

        let promise = fetch(categoriesList.apiBaseURL + "categories.json", fetchOptions);

        promise.then(categoriesList.ajaxCategoriesResponse)

        //console.log("ma requête est transmise !!!")
    },

    ajaxCategoriesResponse: function (response) {
        let object = response.json();

        object.then(function (object) {
            //console.log(object)
            //console.log("mon objet 'tableau de catégories' est bien retourné!!!! GOOD!!")



            var conteneurDataNav = document.getElementById('dataNav');
            var ligneDataNav = document.createElement('div');
            ligneDataNav.className = 'filters__task filters__task--category select is-small';
            var selectionDataNav = document.createElement('select');
            selectionDataNav.className = 'filters__choice';




            for (index in object) {

                category = object[index];
                //console.log(category);
                //console.log(category.name);
                let option = (category.name);
                //console.log(option);

                let element = document.createElement("option");
                element.setAttribute('id', [index]);

                let text = document.createTextNode(option);
                element.appendChild(text);

                selectionDataNav.appendChild(element);
                ligneDataNav.appendChild(selectionDataNav);
                conteneurDataNav.appendChild(ligneDataNav);

            }

        })
    },

}