console.log( "Module/composant categoriesList chargé !" );

let categoriesList = {

  categories : {},

  init: function()
  {
    categoriesList.loadCategoriesFromAPI();
  },

  loadCategoriesFromAPI : function()
  {
    console.log( "loadCategoriesFromAPI" );

    // On créé un objet pour stocker les options du fetch
    let fetchOptions = {
      method : "GET",
      mode   : "cors",
      cache  : "no-cache"
    };

    // On envoi une requête à l'API pour récupérer les catégories
    // On reçoit non pas la réponse mais une "promesse de réponse"
    let promise = fetch( app.apiBaseURL + "categories", fetchOptions );

    // Lorsque la promesse sera résolue (et donc la réponse reçue)
    // on executera la méthode convertResponseToJson qui recevra en 
    // paramètre les informations de la réponse du serveur
    let jsonPromise = promise.then( categoriesList.convertResponseToJson );
    
    // Lorsque la conversion en JSON est terminée, on appelle registerCategoriesListing
    jsonPromise.then( categoriesList.registerCategoriesListing );
  },

  // Retourne la promesse de la conversion en JSON de la requete
  convertResponseToJson: function( response )
  {
    console.log( "convertResponseToJson" );
    return response.json();
  },

  // Enregistrer les categories dans la propriété categories du module
  registerCategoriesListing: function( jsonResponse )
  {
    console.log( "registerCategoriesListing" );

    // On enregistre dans le module chacune des categories reçues
    for( let categoryData of jsonResponse )
    {
      // On stock les données de la catégorie à la "case"
      // dont la clé correspond a son ID
      // Malgré l'utilisation de crochets, on est bien
      // dans un objet !
      categoriesList.categories[ categoryData.id ] = categoryData;
    }

    // Pour comparer :
    // console.log( jsonResponse );
    // console.log( categoriesList.categories );

    // Une fois arrivé ici, je suis sur que mes categories ont
    // bien été chargées dans mon module à partir de l'API
    // Je peux donc passer à la modification du DOM
    categoriesList.displayCategoriesInFilter();
    categoriesList.displayCategoriesInTaskAddForm();
  },

  displayCategoriesInFilter: function()
  {
    // On récupère la div dans laquelle on va créer notre select
    let categoriesFilterParentElement = document.querySelector(".filters__task--category");

    // On créé notre nouveau select
    let categoriesFilterSelectElement = document.createElement( "select" );

    // On créé les options de ce select
    // SAUF QUE, ces options, sont crées de la même façon
    // pour ce select et pour le select du form d'ajout
    categoriesList.createOptionsForCategoriesSelect( categoriesFilterSelectElement );

    // Une fois qu'on a créé les options du select, on peut l'ajouter au DOM
    categoriesFilterParentElement.appendChild( categoriesFilterSelectElement );
  },

  displayCategoriesInTaskAddForm: function()
  {
    let categoriesFilterParentElement = document.querySelector(".task--add .task__category .select");
    let categoriesFilterSelectElement = document.createElement( "select" );
    categoriesList.createOptionsForCategoriesSelect( categoriesFilterSelectElement );
    categoriesFilterParentElement.appendChild( categoriesFilterSelectElement );
  },

  // Fonction qui va créer les <option> du <select> passé en paramètre
  createOptionsForCategoriesSelect: function( selectElement )
  {
    // Je boucle sur toutes les catégories que j'ai stocké
    // précédemment dans mon module, dans la propriété categories
    // petit problème, categoriesList.categories n'est pas un tableau
    // la boucle for ... of ne marche donc pas dessus !

    // Deux solutions :

    // 1 : Boucle for ... in
    // TODO

    // 2 : Object.values() + for ... of
    // On "converti" notre objet en tableau 
    let categoriesArray = Object.values( categoriesList.categories );
    // console.log( categoriesArray );

    // BONUS : option "par défaut"
    let optionElement = document.createElement("option");
    optionElement.textContent = "Choisissez une catégorie";
    selectElement.appendChild( optionElement );

    for( let categoryData of categoriesArray )
    {
      // On créé notre option de toute pièce
      let optionElement = document.createElement("option");
      optionElement.textContent = categoryData.name;
      optionElement.setAttribute( "name", categoryData.id );

      // On l'ajoute au select
      selectElement.appendChild( optionElement );
    }
  }

};