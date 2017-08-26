var cards = [
	{
		character: "daenerys",
		cardImage: "images/daenerys-targaryen.jpg",
		cardSound: "media/dragon-roar.mp3"
	},
	{
		character: "jon snow",
		cardImage: "images/jon-snow.jpg",
		cardSound: "media/winter-is-coming.mp3"
	},
	{
		character: "daenerys",
		cardImage: "images/daenerys-targaryen.jpg",
		cardSound: "media/dragon-roar.mp3"
	},
	{	
		character: "jon snow",
		cardImage: "images/jon-snow.jpg",
		cardSound: "media/winter-is-coming.mp3"
	},
];
var cardsInPlay = [];
var cardId = 0;
var score = 0;
var backImage = 'images/game-of-thrones.jpg';

var resetGame = function() {
	document.location.reload();
	createBoard();
};

var playSound = function(soundSource) {
	var sound = document.getElementsByTagName('audio')[0];
	
	sound.src = soundSource;
	
	sound.load();
	sound.play();
};

var checkForWin = function() {
	if (score === 20) {
		alert("You won!");
		playSound();
		resetGame();
	}; 
};
	
var updateScore = function(score) {
	return score += 10;
};

var checkForMatch = function() {
	if (cardsInPlay[0] === cardsInPlay[1]) {
			//Match
			score = updateScore(score);
			document.getElementsByTagName('h2')[1].textContent = "score: " + score;
			if (cardsInPlay[0] === "daenerys") {
				playSound('media/dragon-roar.mp3');
			}; 
			if (cardsInPlay[0] === "jon snow") {
				playSound('media/winter-is-coming.mp3');
			}; 
			cardsInPlay = [];
			checkForWin();
		} else {
			//No Match
			//flip all the cards back over
			document.getElementsByTagName('img')[0].setAttribute('src', backImage);
			document.getElementsByTagName('img')[1].setAttribute('src', backImage);
			document.getElementsByTagName('img')[2].setAttribute('src', backImage);
			document.getElementsByTagName('img')[3].setAttribute('src', backImage);
			cardsInPlay = [];
		};
};

var flipCard = function() {
	var cardId = this.getAttribute('data-id');
	cardsInPlay.push(cards[cardId].character);
	this.setAttribute('src', cards[cardId].cardImage);
	//console.log(cardId);
	//return cardId;
	if (cardsInPlay.length === 2){
		checkForMatch();
	};
};

var createBoard = function() {
	
	//set cards to facedown
	for (i = 0; i < cards.length; i++) {
		var cardElement = document.createElement('img');
		cardElement.setAttribute('src', backImage);
		cardElement.setAttribute('data-id', [i]);
		cardElement.addEventListener('click', flipCard);
		document.getElementById('game-board').appendChild(cardElement);
	};
};

createBoard();
