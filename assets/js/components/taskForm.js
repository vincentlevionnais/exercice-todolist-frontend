//console.log( "Module/composant taskForm chargé !" );

let taskForm = {

  init: function()
  {
    // Récupération du formulaire d'ajout
    let formElement = document.querySelector( ".task--add form" );
    formElement.addEventListener( "submit", taskForm.handleFormSubmit )
  },

  // ===========================================
  //  Events callbacks / handlers
  // ===========================================

  handleFormSubmit: function( evt )
  {
    // On dit au navigateur de ne pas recharger la page 
    // lors de la soumission du form
    evt.preventDefault();

    // Récupération du formulaire
    let formElement = evt.currentTarget;
    // Récupération des valeurs des input form :
    let taskNewNameElement = formElement.querySelector( ".task__name-edit" );
    let taskNewName = taskNewNameElement.value;

    // On prépare la requete d'ajout de task à l'API
    // On stocke les données à envoyer à l'API sous forme d'objet JS
    let taskData = {
      title : taskNewName,
      completion : 1
    };

    // On prépare les entêtes HTTP (headers) de la requête
    // afin de spécifier que les données sont en JSON
    const httpHeaders = new Headers();
    httpHeaders.append("Content-Type", "application/json");

    // On appelle l'API pour lui dire de créer la tache
    let fetchOptions = {
      method : "POST",
      mode   : "cors",
      cache  : "no-cache",      
      // On ajoute les headers dans les options
      headers: httpHeaders,
      // On ajoute les données, encodées en JSON, dans le corps de la requête
      body   : JSON.stringify( taskData )
    };

    // Cette fois, on enchaine les then avec des fonctions anonymes
    fetch( app.apiBaseURL + "tasks", fetchOptions ) // <= Promesse de réponse a la requete
    
    // A partir d'ici, on a une promesse de réponse
    .then( // <= Lorsqu'on reçoit la réponse
      function( response )
      {
        // Si l'API nous réponds que c'est ok (code 201 Created)
        if( response.status === 201 )
        {
          return response.json(); // <= on renvoi une "promesse de conversion en json"
        }
        else // Sinon, on gère les erreurs
        {
          alert( "une erreur est survenue lors de l'ajout" );
          return;
        }
      }
    ) 
    
    .then( // <= Lors qu'on reçoit la réponse convertie en JSON
      function( jsonResponse )
      {
        // Ici, pour l'ajout, jsonResponse contient l'objet Task inséré en base
        // On a donc aussi son id (et même created_at etc)
        console.log( jsonResponse );

        // On oublie pas d'ajouter la nouvelle tâche au tableau 
        tasksList.tasks[jsonResponse.id] = jsonResponse;

        // On va créer notre nouvelle tâche grâce à une méthode du composant Task
        task.createNewTask( jsonResponse.title, jsonResponse.id );
      }
    );
  }    
};
