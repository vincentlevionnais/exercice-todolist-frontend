
let app = {

  apiBaseURL : "http://localhost:8080/",

  init: function()
  {
    // Initialisation de la liste des taches
    //tasksList.initializeTasksFromDOM();
    tasksList.initializeTasksFromAPI();

    // Initialisation du formulaire d'ajout !
    taskForm.init();

  }

};

document.addEventListener( "DOMContentLoaded", app.init )