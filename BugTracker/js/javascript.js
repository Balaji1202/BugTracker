// load main content on window load
$('window').ready(function(){
    $("#content").load("maincontent.html");
  });

    sidebarFunction.onmouseover = function(event)
    {
      let submenu = event.target.closest('.row').id;
      submenu += '-submenu';
      let submenuElement = document.getElementById(submenu);
      if(submenuElement!=null)
        {
          submenuElement.classList.remove('submenu-hide');
          submenuElement.classList.add('submenu-display');

          submenuElement.onmouseover = function()
          {
            submenuElement.classList.remove('submenu-hide');
            submenuElement.classList.add('submenu-display');
          }

          submenuElement.onmouseout = function()
          {
            submenuElement.classList.add('submenu-hide');
            submenuElement.classList.remove('submenu-display');
          }
        }
    };
    

    // sidebar submenu hide on mouse out
    sidebarFunction.onmouseout = function(event)
    {
      let submenu = event.target.closest('.row').id;
      submenu += '-submenu';
      let submenuElement = document.getElementById(submenu);
      if(submenuElement!=null)
      {
        submenuElement.classList.add('submenu-hide');
        submenuElement.classList.remove('submenu-display');

        submenuElement.onmouseover = function()
        {
          submenuElement.classList.remove('submenu-hide');
          submenuElement.classList.add('submenu-display');
        }

        submenuElement.onmouseout = function()
        {
          submenuElement.classList.add('submenu-hide');
          submenuElement.classList.remove('submenu-display');
        }
      }
    };

      sidebarFunction.onclick = function(event)
      {
        makeMenuActive(event);
        loadContent(event);
      };
      function makeMenuActive(event)
      {
        let x = document.getElementById('sidebarFunction').querySelectorAll(".row");
        for(let a of x)
        {
          a.classList.remove('active');
        }
        event.target.closest('.row').classList.add('active');
      }

      function loadContent(event)
      {
        let file = event.target.closest('.row').id;
        file +='.html';
        $("#content").load(file);
      }
