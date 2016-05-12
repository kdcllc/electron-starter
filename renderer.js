// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

 
    var app = require("./lib/app");
    
    app.on("rendered", function(rendered){
      $("#main").html(rendered);
    });
    
    var showContent = function(view){
         app.emit("view-selected", view);
    };
    
    $(function(){
     showContent("home");
     
      $(".nav").on("click", function(ev){
        ev.preventDefault(); //prevent from firin event
        showContent(this.id);
      });
      
    })