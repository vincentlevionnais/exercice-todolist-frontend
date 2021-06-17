
let app = {

  init: function()
  {
    // Initialisation de la liste des taches
    tasksList.initializeTasksFromDOM();

    // Initialisation du formulaire d'ajout !
    taskForm.init();
  }

};

document.addEventListener( "DOMContentLoaded", app.init )