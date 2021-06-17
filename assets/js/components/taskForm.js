console.log( "Module/composant taskForm chargé !" );

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

    // Pareil pour la catégorie
    let taskCategorySelectElement = formElement.querySelector( ".task__category select" );
    let taskCategory = taskCategorySelectElement.value;

    // On va créer notre nouvelle tache grace a une méthode du composant Task
    let newTaskElement = task.createNewTask( taskNewName, taskCategory );
  }
    
};
