var fs = require("fs");
var _ = require("underscore");
var path = require("path");
var showdown = require("showdown");
var gm = require("gray-matter");
var converter = new showdown.Converter();


var MarkdownPage = function(filePath){
    var result = {};
       
    //load the file contents
    var raw = fs.readFileSync(filePath, "utf-8");
    
    //parse the front matter
    var parsed = gm(raw);
    
    _.extend(result, parsed.data);
    
 
    
    //parse the markdown
    result.body = converter.makeHtml(parsed.content);
    
       //added for the search functionality
    result.summary = result.body.substring(0,200) + "...";
    
    return result;
}

module.exports = MarkdownPage;