
let app = {

  init: function()
  {
    // Initialisation de la liste des taches
    tasksList.initializeTasksFromDOM();

    // Initialisation du formulaire d'ajout !
    taskForm.init();


    //!initialisation de la liste des catégories
    categoriesList.init();

  }

};

document.addEventListener( "DOMContentLoaded", app.init )