console.log("Nouveau formulaire newTask chargé!!!!");

let newTaskForm = {

    initNewTaskForm: function () {
        let newTaskFormElement = document.querySelector('.task--add');

        console.log(newTaskFormElement);

        newTaskFormElement.addEventListener("submit", newTaskForm.handleNewTaskFormSubmit);


    },

    handleNewTaskFormSubmit: function (evt) {
        evt.preventDefault();

        console.log("mon petit console.log");


        let newTask = document.getElementById('newTask').content.cloneNode(true);
        // vanina est un clone 'vide', ajoutons les infos dans ses enfants
        newTask.querySelector('.task__name-display').textContent = 'input . value';
        newTask.querySelector('.task__category').textContent = '.task__category . p';
        
        document.getElementById('tasks').appendChild(newTaskFormElement);
    },

}