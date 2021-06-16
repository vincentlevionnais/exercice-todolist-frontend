
let app = {

    init: function()
    {
      // Initialisation des composants !
      tasksList.initializeTasksFromDOM();
    }
  
  };
  
  document.addEventListener( "DOMContentLoaded", app.init )