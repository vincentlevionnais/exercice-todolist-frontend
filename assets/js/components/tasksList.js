console.log("Module/composant tasksList chargé !");

let tasksList = {

  initializeTasksFromDOM: function () {
    // Récupération des taches via le DOM
    // On prend uniquement les taches qui se trouvent dans la div .tasks
    // pour éviter de sélectionner le formulaire d'ajout (qui a aussi la classe .task)
    let taskElements = document.querySelectorAll(".tasks .task");

    // On vérifie
    console.log(taskElements);

    // Pour chacune de ces taches, je veux déclarer les
    // différents écouteurs d'événements de ces taches
    // C'est le composants Task qui va s'en occuper
    for (let currentTaskElement of taskElements) {
      // J'appelle la méthode task.initTask
      // en donnant chacune des taches de la liste
      // a chaque itération de la boucle
      task.initTask(currentTaskElement);
    }
  },

  // TODO Atelier : Gérer l'ajout d'une tache via le formulaire


}