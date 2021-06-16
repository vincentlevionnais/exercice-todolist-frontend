
console.log( "Module/composant task chargé !" );

let task = {

  // Fonction qui va ajouter toutes les 
  // listeners necessaires a notre tache
  initTask : function( taskElement )
  {
    // Cibler le nom de la tache actuelle
    // Pour ça, j'utilise querySelector sur mon élément task
    // afin de trouver uniquement SON titre
    let taskNameElement = taskElement.querySelector('.task__name-display');
    // Je peux maintenant écouter l'event "click" sur cette balise
    taskNameElement.addEventListener( "click", task.handleClickOnTaskName );

    
    // Même histoire pour le clic sur le bouton "éditer"
    let taskEditButtonElement = taskElement.querySelector( '.task__button--modify' );
    taskEditButtonElement.addEventListener( "click", task.handleClickOnEditButton );

    // TODO Atelier : Ajouter la complétion d'une tache au clic sur le bouton compléter

    let taskValidateButtonElement = taskElement.querySelector('.task__button--validate');
    taskValidateButtonElement.addEventListener("click", task.handleClickOnValidateButton);
    

    // TODO Bonus : Terminer la modification d'une tache
  },

  // ===========================================
  //  Events callbacks / handlers
  // ===========================================

  handleClickOnTaskName: function( evt )
  {
    // TODO : Masquer le <p> et afficher le <input>
    console.log( "handleClickOnTaskName" )

    let taskNameElement = evt.currentTarget;

    // Tout ce qu'on va faire, c'est changer la 
    // classe qui se trouve sur la tache
    // Le CSS se chargera d'afficher/masquer le p/l'input
    // En l'occurrence ici, ajouter la classe "task--edit"
    // Pour ça, je dois d'abord récupérer la tache à partir du nom
    // element.closest permet de cibler le parent le plus proche qui
    // correspond au sélecteur fourni
    let taskElement = taskNameElement.closest( ".task" );

    // Maintenant que j'ai mon élément task
    // je lui ajoute la classe task--edit
    taskElement.classList.add( "task--edit" );

    // TODO Bonus : Gérer le focus sur l'input
  },

  handleClickOnEditButton: function( evt )
  {
    // On garde un handler différent pour pas se perdre
    // mais on va quand même pas coder deux fois la même chose
    // Donc au clic sur le bouton edit, on fait comme au clic sur le tire ;)
    task.handleClickOnTaskName( evt )
  },

  handleClickOnValidateButton: function( evt )
  {
    // TODO : Masquer le <p> et afficher le <input>
    console.log( "handleClickOnValidateButton" )

    let buttonElement = evt.currentTarget;

    // Tout ce qu'on va faire, c'est changer la 
    // classe qui se trouve sur la tache
    // Le CSS se chargera d'afficher/masquer le p/l'input
    // En l'occurrence ici, ajouter la classe "task--edit"
    // Pour ça, je dois d'abord récupérer la tache à partir du nom
    // element.closest permet de cibler le parent le plus proche qui
    // correspond au sélecteur fourni
    let taskElement = buttonElement.closest( ".task" );

    // Maintenant que j'ai mon élément task
    // je lui ajoute la classe task--edit
    taskElement.classList.remove( "task--todo" );
    taskElement.classList.add( "task--complete" );

    // TODO Bonus : Gérer le focus sur l'input
  },

};