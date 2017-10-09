var inquirer = require("inquirer");
var basic = require("./data/basic");
var cloze = require("./data/cloze")
var BasicCard = require("./BasicCard");
var ClozeCard = require("./ClozeCard");
var count = 0;

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
	});
};

var startQuiz = function(){

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

//I need to critque this to make it just run the cloze cards and display them properly

var clozeSet = function(){

	inquirer.prompt([
	{
		name: "cloze",
		message: "Welcome to Cloze Flashcards"
	}
	]).then(function(response){
		if(basic[count]){
			var round = new BasicCard(basic[count].front, basic[count].back);
			console.log(basic[count].front);
			console.log(basic[count].back);
			console.log(round.front);
			console.log(round.back);
			count++;
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

var basicSet = function(){

	inquirer.prompt([
	{
		name: "basic",
		message: "Welcome to Basic Flashcards"
	}
	]).then(function(response){
		if(basic[count]){
			var round = new BasicCard(basic[count].front, basic[count].back);
			console.log(basic[count].front);
			console.log(basic[count].back);
			console.log(round.front);
			console.log(round.back);
			count++;
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
		newFact.getData();
	})
}

//startQuiz();
createCard();