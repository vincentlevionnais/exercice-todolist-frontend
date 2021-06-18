
let app = {

  apiBaseURL : "https://benoclock.github.io/S07-todolist/",

  init: function()
  {
    // Initialisation de la liste des taches
    // tasksList.initializeTasksFromDOM();
    tasksList.initializeTasksFromAPI();

    // Initialisation du formulaire d'ajout !
    taskForm.init();

    // Initialisation du composant categoriesList
    categoriesList.init();
  }

};

document.addEventListener( "DOMContentLoaded", app.init )