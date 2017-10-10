var cloze = require("./data/cloze");
var UserPrompt = require("./UserPrompt");
var fs = require("fs");
var clozeLog = "./data/cloze.json";

var ClozeCard = function(text, cloze){
	this.text = text;
	this.cloze = cloze;
	this.partial = "";
	this.magic = function(){
		var word = this.text.split(" ");
		for(var i=0; i<word.length; i++){
			if(word[i] === this.cloze){
				word[i] = "...";
				this.partial = word.join(" ");
				console.log(this.partial);
				this.logData();
			}
		}
	};
	this.logData = function(){

		fs.appendFile(clozeLog, JSON.stringify(this, null, 2));
	};
	this.getData = function(){
		fs.readFile(clozeLog, "utf8", function(err, data){
			if(err) throw err;
			console.log(data);
		});
	};
};

module.exports = ClozeCard;