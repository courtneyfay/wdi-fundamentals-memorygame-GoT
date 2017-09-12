localStorage.clear();

var cards = [
	{
		//character 1
		character: "daenerys",
		cardImage: "images/daenerys-targaryen.jpg",
		cardSound: "media/dragon-roar.mp3"
	},
	{
		//character 2
		character: "jon snow",
		cardImage: "images/jon-snow.jpg",
		cardSound: "media/winter-is-coming.mp3"
	},
	{
		//character 3
		character: "arya stark",
		cardImage: "images/arya-stark.jpg",
		cardSound: "media/tell-them-the-north-remembers.mp3"
	},
	{	
		//character 4
		character: "tommen baratheon",
		cardImage: "images/tommen-baratheon.jpg",
		cardSound: "media/suicide.mp3"
	},
	{	
		//character 5
		character: "theon greyjoy",
		cardImage: "images/theon-greyjoy.jpg",
		cardSound: "media/for-yara.mp3"
	},
		//character 1
	{
		character: "daenerys",
		cardImage: "images/daenerys-targaryen.jpg",
		cardSound: "media/dragon-roar.mp3"
	},
		//character 2
	{
		character: "jon snow",
		cardImage: "images/jon-snow.jpg",
		cardSound: "media/winter-is-coming.mp3"
	},
		//character 3
	{
		character: "arya stark",
		cardImage: "images/arya-stark.jpg",
		cardSound: "media/tell-them-the-north-remembers.mp3"
	},
		//character 4
	{
		character: "tommen baratheon",
		cardImage: "images/tommen-baratheon.jpg",
		cardSound: "media/suicide.mp3"
	},
		//character 5
	{
		character: "theon greyjoy",
		cardImage: "images/theon-greyjoy.jpg",
		cardSound: "media/for-yara.mp3"
	},
];
//storage
var JSONCards = JSON.stringify(cards);
localStorage.setItem('cards', JSONCards);
console.log(JSON.parse(localStorage['cards']));

var cardsInPlay = [];
var cardId = 0;
var score = 0;
var backImage = 'images/game-of-thrones.jpg';

/*var resetGame = function() {
	document.location.reload();
	var resetButton = document.createElement('button');
	resetButton.setAttribute('textContent', 'Play again!');
	document.getElementById('game-board').appendChild(resetButton);
	//resetButton.setAttribute('data-id', [i]);
	//resetButton.addEventListener('click', createBoard()); //createBoard();
};*/

var playSound = function(audioSource) {
	var sound = document.getElementsByTagName('audio')[0];
	sound.src = audioSource;
	sound.load();
	sound.play();	
};

var checkForWin = function() {
	if (score === 50) {
		playSound("media/game-of-thrones.mp3");
		//sound is being interrupted by alert window
		//alert("You won!");
		//resetGame();
	};
};
	
var updateScore = function(score) {
	return score += 10;
};

var checkForMatch = function(cardId) {
	console.log(cardsInPlay);

	if (cardsInPlay[0] === cardsInPlay[1]) {
			//Match
			score = updateScore(score);
			document.getElementsByTagName('h2')[1].textContent = "score: " + score;
			playSound(cards[cardId].cardSound);
			cardsInPlay = [];
			checkForWin();
	} else {
			//No Match
			//flip only the wrong cards back over
			console.log("No match logic");
			playSound("media/buzzer.mp3");
			document.getElementsByTagName('img')[cards[cardId]].setAttribute('src', backImage);
				//cards[cardId];
			console.log(cards[cardsInPlay[0]]);
				//.setAttribute('src', backImage));
			//cardsInPlay[3].setAttribute('src', backImage);
			//this is broken
			/*for (i = 0; i < cardsInPlay.legnth; i++) {
				document.getElementsByTagName('img')[i].setAttribute('src', backImage);
			};*/
			cardsInPlay = [];
		};
};

var flipCard = function() {
	var cardId = this.getAttribute('data-id');
	this.setAttribute('src', cards[cardId].cardImage);
	cardsInPlay.push(cards[cardId].character);
	//cardsInPlay.push(cards[cardId].cardSound);
	//cardsInPlay.push(cardId); 
	//console.log(cardId);
	
	if (cardsInPlay.length === 2){
		checkForMatch(cardId);
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
