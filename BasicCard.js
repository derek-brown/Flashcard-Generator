var basicLog = require("./data/basic.json");
var basic = "";
var UserPrompt = require("./UserPrompt");
var fs = require("fs");

var BasicCard = function(front, back){
	this.front = front;
	this.back = back;
	this.logData = function(){
		var card = this;
		basicLog.push(card);

		fs.writeFile("./data/basic.json", JSON.stringify(basicLog, null, 2));
	};
	this.getData = function(){
		fs.readFile(basicLog, "utf8", function(err, data){
			if(err) throw err;
			console.log(data);
		});
	};
};



module.exports = BasicCard;