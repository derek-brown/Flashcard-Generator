var basic = require("./data/basic");
var UserPrompt = require("./UserPrompt");
var fs = require("fs");
var basicLog = "./data/basic.json"

var BasicCard = function(front, back){
	this.front = front;
	this.back = back;
	this.logData = function(){

		fs.appendFile(basicLog, JSON.stringify(this, null, 2));
	};
	this.getData = function(){
		fs.readFile(basicLog, "utf8", function(err, data){
			if(err) throw err;
			console.log(data);
		});
	};
};



module.exports = BasicCard;