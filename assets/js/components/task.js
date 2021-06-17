
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

    // Je récupère l'input du nom de la tache
    let taskInputNameElement = taskElement.querySelector( ".task__name-edit" );

    // On ajoute un écouteur d'événement lors de l'appui sur une touche
    taskInputNameElement.addEventListener( "keyup", task.handleKeyUpOnTaskName );

    // On écoute l'event "blur" => perte de focus de l'élément
    taskInputNameElement.addEventListener( "blur", task.handleBlurOnTaskName )

    // Atelier :
    // Récupération de tout les boutons verts pour marquer une tache comme terminée
    let taskValidateButtonElement = taskElement.querySelector( ".task__button--validate" );
    taskValidateButtonElement.addEventListener( "click", task.handleClickOnValidateButton );
  },

  createNewTask: function( taskNewName, taskCategory )
  {
    // Première étape, on récupère le template
    let template = document.querySelector("#task-template");

    // Cloner le contenu du template en un nouvel élément
    let newTaskFromTemplate = template.content.cloneNode( true );

    // Je change les différentes valeurs de mon nouvel élément
    newTaskFromTemplate.querySelector( ".task" ).dataset.category = taskCategory;
    newTaskFromTemplate.querySelector( ".task__category p" ).textContent = taskCategory;

    // Pareil pour le nom de la tache
    newTaskFromTemplate.querySelector( ".task__name-display" ).textContent = taskNewName;
    newTaskFromTemplate.querySelector( ".task__name-edit" ).value = taskNewName;
    // Petite astuce pour avoir la value qui s'affiche également dans l'inspecteur
    // Mais ça fonctionne aussi sans, tant qu'on a fait la ligne précédente ;)
    newTaskFromTemplate.querySelector( ".task__name-edit" ).setAttribute( "value", taskNewName );
    
    // On oublie pas d'initialiser notre nouvelle tache
    // pour enregistrer les écouteurs d'événement etc
    task.initTask( newTaskFromTemplate );

    // On peut ajouter notre nouvelle tache a notre page
    let taskList = document.querySelector(".tasks");
    taskList.prepend( newTaskFromTemplate );

    // BOonus organisation : On aurait pu return notre élément ici
    // puis passer l'ajout de cette nouvelle tache dans la list au composant taskList
    // C'est plus cohérent, mais plus long.

    // Bonus, vider le form
  },

  // ===========================================
  //  Events callbacks / handlers
  // ===========================================

  handleClickOnTaskName: function( evt )
  {
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
    let taskNameInputElement = taskElement.querySelector( ".task__name-edit" );
    taskNameInputElement.focus();

    // TODO Bonus bonus : Mettre le curseur a la fin de l'input
  },

  handleClickOnEditButton: function( evt )
  {
    // On garde un handler différent pour pas se perdre
    // mais on va quand même pas coder deux fois la même chose
    // Donc au clic sur le bouton edit, on fait comme au clic sur le titre ;)
    task.handleClickOnTaskName( evt )
  },

  handleBlurOnTaskName: function( evt )
  {
    // Récupération de l'élément concerné 
    let taskInputNameElement = evt.currentTarget;

    // On récupère ce qui a été tapé dans l'input
    let taskNewName = taskInputNameElement.value;

    // On récupère toute la tache
    let taskElement = taskInputNameElement.closest( ".task" )

    // A partir du parent, je peux récupérer facilement la balise <p> du nom
    let taskNameElement = taskElement.querySelector( ".task__name-display" );
    taskNameElement.textContent = taskNewName;

    // On retire la classe CSS task--edit du parent
    // ce qui remasquera l'input et réaffichera le <p>
    taskElement.classList.remove( "task--edit" );
  },

  handleKeyUpOnTaskName: function( evt )
  {
    // On vérifie que la touche "relachée" est bien Entrée
    // Pour ça, on utilise evt.key
    if( evt.key === "Enter" )
    {
      task.handleBlurOnTaskName( evt );
    }
  },

  handleClickOnValidateButton: function( evt )
  {
    // Récupération de l'élément concerné 
    let validateButtonElement = evt.currentTarget;

    // Récupération de la tache concernée
    let taskElement = validateButtonElement.closest( ".task" );

    // Une fois qu'on a l'élément il ne reste plus qu'à changer la classe CSS
    taskElement.classList.replace( "task--todo", "task--complete" );
    // On aurait aussi pu classList.add task--complete et classList.remove task--todo

    // Bonus : mettre la progressbar a 100% (on aurait pu le faire en CSS)
    let currentProgressBarElement = taskElement.querySelector( ".progress-bar__level" );
    currentProgressBarElement.style.width = "100%";
  }

};