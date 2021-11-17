//console.log( "Module/composant tasksList chargé !" );

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

    // Cette fois, on enchaine les then avec des fonctions anonymes
    fetch( app.apiBaseURL + "tasks", fetchOptions ) // <= Promesse de réponse a la requete
    
    // A partir d'ici, on a une promesse de réponse
    .then( // <= Lorsqu'on reçoit la réponse
      function( response )
      {
        return response.json(); // <= on renvoi une "promesse de conversion en json"
      }
    ) 

    // A partir d'ici, on a donc une promesse de conversion
    .then( // <= Lorsqu'on reçoit le JSON de la réponse
      function( jsonResponse )
      {
        // On enregistre dans le module chacune des taches reçues
        for( let taskData of jsonResponse )
        {
          // Malgré l'utilisation de crochets, on est bien dans un objet !
          tasksList.tasks[ taskData.id ] = taskData;

          // On peut réutiliser notre méthode createNewTask
          // pour ajouter au DOM nos taches fraichement chargées depuis l'API
          task.createNewTask( taskData.title, taskData.id );
        }
      }
    )
  },
};
