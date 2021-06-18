
console.log( "Module/composant tasksList chargé !" );

let tasksList = {

  tasks : {},

  initializeTasksFromAPI : function()
  {
    // On créé un objet pour stocker les options du fetch
    let fetchOptions = {
      method : "GET",
      mode   : "cors",
      cache  : "no-cache"
    };

    // Cette fois, on enchaine les then avec des fonctions anonymes :cri:
    fetch( app.apiBaseURL + "tasks.json", fetchOptions ) // <= Promesse de réponse a la requete
    
    // A partir d'ici, on a une promesse de réponse
    .then( // <= Lorsqu'on reçoit la réponse
      function( response )
      {
        return response.json(); // <= on renvoi une "promesse dez conversion en json"
      }
    ) 

    // A partir d'ici, on a donc une promesse de conversion
    .then( // <= Lors qu'on reçoit le JSON de la réponse
      function( jsonResponse )
      {
        // console.log( jsonReponse );

        // On enregistre dans le module chacune des taches reçues
        for( let taskData of jsonResponse )
        {
          // On stock les données de la catégorie à la "case"
          // dont la clé correspond a son ID
          // Malgré l'utilisation de crochets, on est bien
          // dans un objet !
          tasksList.tasks[ taskData.id ] = taskData;

          // On peut réutiliser notre bonne vieille méthode createNewTask
          // pour ajouter au DOM nos taches fraichement chargées depuis l'API
          task.createNewTask( taskData.title, taskData.category.name );
        }
      }
    )
  },


  // Charger les taches existantes depuis le HTML
  initializeTasksFromDOM : function()
  {
    // Récupération des taches via le DOM
    // On prend uniquement les taches qui se trouvent dans la div .tasks
    // pour éviter de sélectionner le formulaire d'ajout (qui a aussi la classe .task)
    let taskElements = document.querySelectorAll( ".tasks .task" );

    // On vérifie
    console.log( taskElements );

    // Pour chacune de ces taches, je veux déclarer les
    // différents écouteurs d'événements de ces taches
    // C'est le composants Task qui va s'en occuper
    for( let currentTaskElement of taskElements )
    {
      // J'appelle la méthode task.initTask
      // en donnant chacune des taches de la liste
      // a chaque itération de la boucle
      task.initTask( currentTaskElement );
    }
  }

  // TODO Atelier : Gérer l'ajout d'une tache via le formulaire

};
