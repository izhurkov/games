function genCharArray(charA, charZ) {
    var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
        a.push(String.fromCharCode(i));
    }
    return a;
}
var alphabet = genCharArray('а', 'я'); // ["a", ..., "z"]
// console.log(alphabet);


for ( var i = 0; i < alphabet.length; i++ ){
	$(".block ul").append('<div class="container" id="' + alphabet[i] + '">' + alphabet[i] + '</div>');
}


$('.block ul .container').on('click', function(event){
  var targetElement = event.target;
  var id = targetElement.id;
  var contain = false;
  for ( var i in keys ){
  	if ( keys[i] == id ){
  		console.log($("#key_" + id));
  		$("#key_" + id).css("opacity", "1");
  		contain = true;
  		guessedLetters++;
  	}
  }
  if ( !contain ){
  	$("#lives").html(--lives);
  }
  checkWin();
  $(targetElement).fadeOut(0);
});

function checkWin(){
	if ( lives <= 0 ){
		$("#result").html('Увы, вы проиграли! Слово было "' + word + '"');
		startGame();
	}
	if ( guessedLetters >= keys.length ){
		$("#result").html('Поздравялем! Вы отгадали слово "' + word + '"');
		startGame();
	}
}

var dictionary = ["виселица", "минералка", "ночь", "утро", "головоломка",
	"комиссия", 'душа', 'статья', 'писатель', 'князь', 'премия', 'ухо',
	'фонд', 'схема', 'увеличение', 'оборудование', 'телевидение'];
var lives = 6;
var keys;
var guessedLetters = 0;
var word;

function startGame(){
	lives = 6;
	guessedLetters = 0;
	var rand = Math.round( dictionary.length * Math.random() );
	word = dictionary[rand];
	keys = word.split('');

	$(".block .word").empty();
	$(".container").each( function(){}).fadeIn(500);
	for ( var i = 0; i < keys.length; i++ ){
		$(".block .word").append('<div class="keys-container"><div class="key" id="key_' + keys[i] + '">' + keys[i] + '</div></div>');
	}
}

startGame();