//console.log("Module/composant task chargé !");

let task = {

  // Fonction qui va ajouter toutes les 
  // listeners nécessaires a notre tâche
  initTask: function (taskElement) {
    // Cibler le nom de la tache actuelle
    // avec querySelector sur mon élément task
    // afin de trouver uniquement SON titre
    let taskNameElement = taskElement.querySelector('.task__name-display');
    // Je peux maintenant écouter l'event "click" sur cette balise
    taskNameElement.addEventListener("click", task.handleClickOnTaskName);

    // Même chose pour le clic sur le bouton "éditer"
    let taskEditButtonElement = taskElement.querySelector('.task__button--modify');
    taskEditButtonElement.addEventListener("click", task.handleClickOnEditButton);

    // Je récupère l'input du nom de la tache
    let taskInputNameElement = taskElement.querySelector(".task__name-edit");

    // On ajoute un écouteur d'événement lors de l'appui sur une touche
    taskInputNameElement.addEventListener("keyup", task.handleKeyUpOnTaskName);
    // On écoute l'event "blur" => perte de focus de l'élément
    taskInputNameElement.addEventListener("blur", task.handleBlurOnTaskName)

    // BOUTON tache complète/incomplète
    // Récupération deses boutons verts pour marquer une tache comme terminée
    let taskValidateButtonElement = taskElement.querySelector(".task__button--validate");
    taskValidateButtonElement.addEventListener("click", task.handleClickOnValidateButton);

    // Récupération des boutons verts pour marquer une tache comme incomplète
    let taskUnvalidateButtonElement = taskElement.querySelector(".task__button--incomplete");
    taskUnvalidateButtonElement.addEventListener("click", task.handleClickOnUnvalidateButton);

    // BOUTON SUPPRIMER
    let taskDeleteButtonElement = taskElement.querySelector(".task__button--delete");
    taskDeleteButtonElement.addEventListener("click", task.handleClickOnDeleteButton);
  },

  createNewTask: function (taskNewName, taskId) {
    // Première étape, on récupère le template
    let template = document.querySelector("#task-template");

    // Cloner le contenu du template en un nouvel élément
    let newTaskFromTemplate = template.content.cloneNode(true);

    // Pareil pour le nom de la tache
    newTaskFromTemplate.querySelector(".task__name-display").textContent = taskNewName;
    newTaskFromTemplate.querySelector(".task__name-edit").value = taskNewName;
    // Petite astuce pour avoir la value qui s'affiche également dans l'inspecteur
    // Mais ça fonctionne aussi sans, tant qu'on a fait la ligne précédente.
    newTaskFromTemplate.querySelector(".task__name-edit").setAttribute("value", taskNewName);

    // On ajoute également au dataset, l'id de la tache
    newTaskFromTemplate.querySelector(".task").dataset.id = taskId;

    // Est-ce que la tache est complétée ? Si oui, je la marque comme tel
    task.changeCompletion(newTaskFromTemplate.querySelector(".task"), tasksList.tasks[taskId].completion);

    // On initialise notre nouvelle tache
    // pour enregistrer les écouteurs d'événement etc
    task.initTask(newTaskFromTemplate);

    // On peut ajouter notre nouvelle tache a notre page
    let taskList = document.querySelector(".tasks");
    taskList.prepend(newTaskFromTemplate);    
  },

  // Modifie le DOM d'une tache pour la marquer comme complétée
  changeCompletion(taskElement, completion) {
    if (completion == 100) {
      taskElement.classList.remove("task--todo");
      taskElement.classList.add("task--complete");
    } else {
      taskElement.classList.replace("task--complete", "task--todo");
      taskElement.classList.add("task--todo");
    }

    let currentProgressBarElement = taskElement.querySelector(".progress-bar__level");
    currentProgressBarElement.style.width = completion + "%";

  },

  // Modifie le DOM d'une tache pour la supprimer
  deleteTask(taskElement) {
    taskElement.remove();
  },

  // ===========================================
  //  Events callbacks / handlers
  // ===========================================
  // GESTION DU CLICK SUR LE NOM DE LA TACHE
  handleClickOnTaskName: function (evt) {
    let taskNameElement = evt.currentTarget;

    // On va changer la classe qui se trouve sur la tache
    // Le CSS se chargera d'afficher/masquer le p/l'input
    // En l'occurrence ici, on ajoute la classe "task--edit"
    // Pour ça, on dois d'abord récupérer la tache à partir du nom :
    // element.closest permet de cibler le parent le plus proche qui
    // correspond au sélecteur fourni
    let taskElement = taskNameElement.closest(".task");

    // Maintenant que j'ai mon élément task
    // je lui ajoute la classe task--edit
    taskElement.classList.add("task--edit");

    let taskNameInputElement = taskElement.querySelector(".task__name-edit");
    taskNameInputElement.focus();
  },

  // GESTION DU BOUTON D'EDITION
  handleClickOnEditButton: function (evt) {
    // On garde un handler différent pour pas se perdre
    // mais on va quand même pas coder deux fois la même chose
    // Donc au clic sur le bouton edit, on fait comme au clic sur le titre
    task.handleClickOnTaskName(evt)
  },

  // GESTION DE L'APPARENCE DU NOM DE LA TACHE
  handleBlurOnTaskName: function (evt) {
    // Récupération de l'élément concerné 
    let taskInputNameElement = evt.currentTarget;

    // On récupère ce qui a été tapé dans l'input
    let taskNewName = taskInputNameElement.value;

    // On récupère toute la tache
    let taskElement = taskInputNameElement.closest(".task")

    // On prépare les entêtes HTTP (headers) de la requête
    // afin de spécifier que les données sont en JSON
    const httpHeaders = new Headers();
    httpHeaders.append("Content-Type", "application/json");

    // On stocke les données à envoyer à l'API sous forme d'objet JS
    let data = {
      title: taskNewName
    };

    // On appelle l'API pour lui dire de modifier le nom de la tache
    let fetchOptions = {
      method: "PATCH",
      mode: "cors",
      cache: "no-cache",
      // On ajoute les headers dans les options
      headers: httpHeaders,
      // On ajoute les données, encodées en JSON, dans le corps de la requête
      body: JSON.stringify(data)
    };

    // Cette fois, on enchaine les then avec des fonctions anonymes
    fetch(app.apiBaseURL + "tasks/" + taskElement.dataset.id, fetchOptions) // <= Promesse de réponse a la requete
      .then( // <= Lors qu'on reçoit la réponse (ici pas de JSON, car la réponse est "vide", code 204 No Content)
        function (response) {
          if (response.status === 204) {
            // A partir du parent, je peux récupérer facilement la balise <p> du nom
            let taskNameElement = taskElement.querySelector(".task__name-display");
            taskNameElement.textContent = taskNewName;
            // On retire la classe CSS task--edit du parent
            // ce qui remasquera l'input et réaffichera le <p>
            taskElement.classList.remove("task--edit");
          } else {
            alert("Une erreur est survenue lors du changement de nom !");
          }
        }
      );
  },

  handleKeyUpOnTaskName: function (evt) {
    // On vérifie que la touche "relachée" est bien Entrée
    // Pour ça, on utilise evt.key
    if (evt.key === "Enter") {
      task.handleBlurOnTaskName(evt);
    }
  },

  // GESTION DU BOUTON DE COMPLETION
  handleClickOnValidateButton: function (evt) {
    // Récupération de l'élément concerné 
    let validateButtonElement = evt.currentTarget;
    // Récupération de la tache concernée
    let taskElement = validateButtonElement.closest(".task");

    // On prépare les entêtes HTTP (headers) de la requête
    // afin de spécifier que les données sont en JSON
    const httpHeaders = new Headers();
    httpHeaders.append("Content-Type", "application/json");

    // On stocke les données à envoyer à l'API sous forme d'objet JS
    let data = {
      completion: 100,
    };

    // On appelle l'API pour lui dire de modifier la complétion de la tache
    let fetchOptions = {
      method: "PATCH",
      mode: "cors",
      cache: "no-cache",
      // On ajoute les headers dans les options
      headers: httpHeaders,
      // On ajoute les données, encodées en JSON, dans le corps de la requête
      body: JSON.stringify(data)
    };

    // Cette fois, on enchaine les then avec des fonctions anonymes
    fetch(app.apiBaseURL + "tasks/" + taskElement.dataset.id, fetchOptions) // <= Promesse de réponse a la requete
      .then( // <= Lors qu'on reçoit la réponse (ici pas de JSON, car la réponse est "vide", code 204 No Content)
        function (response) {
          if (response.status === 204) {
            // On marque la tache comme complétée dans le DOM
            task.changeCompletion(taskElement, 100);
          } else {
            alert("Une erreur est survenue lors de la complétion !");
          }
        }
      );
  },

  // GESTION DU BOUTON DE DECOMPLETION
  handleClickOnUnvalidateButton: function (evt) {
    // Récupération de l'élément concerné 
    let validateButtonElement = evt.currentTarget;
    // Récupération de la tache concernée
    let taskElement = validateButtonElement.closest(".task");

    // On prépare les entêtes HTTP (headers) de la requête
    // afin de spécifier que les données sont en JSON
    const httpHeaders = new Headers();
    httpHeaders.append("Content-Type", "application/json");

    // On stocke les données à envoyer à l'API sous forme d'objet JS
    let data = {
      completion: 1,
    };

    // On appelle l'API pour lui dire de modifier la complétion de la tache
    let fetchOptions = {
      method: "PATCH",
      mode: "cors",
      cache: "no-cache",
      // On ajoute les headers dans les options
      headers: httpHeaders,
      // On ajoute les données, encodées en JSON, dans le corps de la requête
      body: JSON.stringify(data)
    };

    // Cette fois, on enchaine les then avec des fonctions anonymes :cri:
    fetch(app.apiBaseURL + "tasks/" + taskElement.dataset.id, fetchOptions) // <= Promesse de réponse a la requete
      .then( // <= Lors qu'on reçoit la réponse (ici pas de JSON, car la réponse est "vide", code 204 No Content)
        function (response) {
          if (response.status === 204) {
            // On marque la tache comme complétée dans le DOM
            task.changeCompletion(taskElement, 1);
          } else {
            alert("Une erreur est survenue lors de la décomplétion!");
          }
        }
      );
  },

  // GESTION DU BOUTON DE SUPPRESSION
  handleClickOnDeleteButton: function (evt) {
    // Récupération de l'élément concerné 
    let deleteButtonElement = evt.currentTarget;
    // Récupération de la tache concernée
    let taskElement = deleteButtonElement.closest(".task");

    let fetchOptions = {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
    };

    confirm("Supprimer la tâche?");
    // Cette fois, on enchaine les then avec des fonctions anonymes :cri:
    fetch(app.apiBaseURL + "tasks/" + taskElement.dataset.id, fetchOptions) // <= Promesse de réponse a la requete
      .then( // <= Lors qu'on reçoit la réponse (ici pas de JSON, car la réponse est "vide", code 204 No Content)
        function (response) {
          if (response.status === 204) {
            // On masque la tache supprimée dans le DOM
            task.deleteTask(taskElement);
          } else {
            alert("Une erreur est survenue lors de la suppression!");
          }
        }
      );
  }
};