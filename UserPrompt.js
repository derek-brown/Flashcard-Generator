var inquirer = require("inquirer");
var basic = require("./data/basic");
var cloze = require("./data/cloze")
var BasicCard = require("./BasicCard");
var ClozeCard = require("./ClozeCard");
var basicCnt = 0;
var clozeCnt = 0;

var createCard = function(){
	inquirer.prompt([
	{
		type: "list",
		name: "create",
		message: "Welcome to creating Flashcards. Which card would you like to create?",
		choices: ["basic", "cloze"]
	}
	]).then(function(response){
		if(response.create === "cloze"){
			createCloze();
		}
		else{
			createBasic();
		}
	});
};

var start = function(){

	inquirer.prompt([
	{
		type:"list",
		name: "selection",
		message: "Welcome! Would you like to create flashcards or study from the existing ones?",
		choices: ["create", "study"]
	}
	]).then(function(response){
		if(response.selection === "create"){
			inquirer.prompt([
			{
				type: "list",
				name: "cardtype",
				message: "Excellent! Which card would you like to create?",
				choices: ["basic", "cloze"]
			}
			]).then(function(response){
				if(response.cardtype === "basic"){
					createBasic();
				}else{
					createCloze();
				}
			});
		}else{
			study();
		}
	});
};

var study = function(){

	inquirer.prompt([
	{
		type: "list",
		name: "flashcard",
		message: "Welcome to Flashcards! Do you want to do Basic cards or Cloze cards?",
		choices: ["basic", "cloze"]
	}
	]).then(function(response){
		if(response.flashcard === "basic"){
			basicSet();
		}else{
			clozeSet();
		}
	});
};

var clozeSet = function(){

	inquirer.prompt([
	{
		name: "cloze",
		message: "Welcome to Cloze Flashcards"
	}
	]).then(function(response){
		if(cloze[clozeCnt]){
			console.log(cloze[clozeCnt].partial);
			console.log(cloze[clozeCnt].cloze);
			console.log(cloze[clozeCnt].text);
			clozeCnt++;
			clozeSet();
		}else{
			inquirer.prompt([
			{
				type: "list",
				name: "request",
				message: "You have answered all the questions! Would you like another go?",
				choices: ["Yes", "No"]
			}
			]).then(function(response){
				if(response.request === "Yes"){
					startQuiz();
					clozeCnt = 0;
				}
			});
		}
	});
};

var basicSet = function(){

	inquirer.prompt([
	{
		name: "basic",
		message: "Welcome to Basic Flashcards! Please enter to begin!"
	}
	]).then(function(response){
		if(basic[basicCnt]){
			console.log(basic[basicCnt].front);
			console.log(basic[basicCnt].back);
			basicCnt++;
			basicSet();
		}else{
			inquirer.prompt([
			{
				type: "list",
				name: "request",
				message: "You have answered all the questions! Would you like another go?",
				choices: ["Yes", "No"]
			}
			]).then(function(response){
				if(response.request === "Yes"){
					startQuiz();
					count = 0;
				}
			});
		}
	});
};

var createCloze = function (){
	inquirer.prompt([
	{
		type: "input",
		name: "text",
		message: "Please enter the full fact"
	},
	{
		type: "input",
		name: "cloze",
		message: "Please enter the partial to remove from the fact"
	}
	]).then(function(response){
		var newFact = new ClozeCard(response.text, response.cloze);
		newFact.magic();
	})
}


var createBasic = function (){
	inquirer.prompt([
	{
		type: "input",
		name: "front",
		message: "Please enter the a question"
	},
	{
		type: "input",
		name: "back",
		message: "Please enter the answer"
	}
	]).then(function(response){
		var newFact = new BasicCard(response.front, response.back);
		newFact.logData();
	})
}

start();