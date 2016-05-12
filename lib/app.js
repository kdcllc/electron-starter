var Emitter = require("events").EventEmitter;
var util = require("util");
var path = require("path");
var fs = require("fs");
var View = require("./view");

var _ = require("underscore")._;
var MarkdownPage = require("./markdown_page");
var chapterDir = path.join(__dirname, "../", "chapters");

var loadChapters = function(){
    var result = [];
    var chapterFiles = fs.readdirSync(chapterDir);
    
    _.each(chapterFiles, function(file){
        var filePath = path.join(chapterDir, file);
        var page = new MarkdownPage(filePath);
        page.id = path.basename(file, ".md");
        result.push(page);
    });
    
    return result;
}

var App = function () {
    this.chapters = loadChapters();
       
    this.on("view-selected", function (viewName){
        var view = new View(viewName);
        this.emit("rendered", view.toHtml());
    })
    
    this.on("chapter-selected", function(id){
        var chapter = _.find(this.chapters, function(c){
            return c.id == id;
        });
        this.emit("chapter-rendered", chapter);
    })
    // console.log(this.chapters);
};

util.inherits(App,Emitter);
module.exports = new App();