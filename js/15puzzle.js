var array = [];
var field;
var emptyX;
var emptyY;
var timerElement = $("#timer");
var timer = 0;
var steps = 0;

var fieldSize = 4;

function updateTimer(){
	timer++;
	$("#timer").html(timer);
};

function updateSteps(){
	steps++;
	$("#steps").html(steps);
}

function resetGame(){	
	$( ".result" ).addClass( "hidden" );
	$( ".result" ).removeClass( "visible" );
	array = [];
	for( var i = 0; i < fieldSize; ++i ){
		array[i] = [];
		for( var j = 0; j < fieldSize; ++j){
			array[i][j] = i*(fieldSize) + j + 1;
		}
	}
	array[fieldSize-1][fieldSize-1] = "";

	emptyX = fieldSize - 1;
	emptyY = fieldSize - 1;
	for( var i = 0; i < fieldSize * 1000; i++ ){
		var rand = Math.round( 3 * Math.random() );
		switch( rand ){
			case 0:
				if(emptyX != 0)
					transferEmpty( emptyX, emptyY, --emptyX, emptyY);
				break;
			case 1:
				if(emptyX != fieldSize - 1)
					transferEmpty( emptyX, emptyY, ++emptyX, emptyY);
				break;
			case 2:
				if(emptyY != fieldSize - 1)
					transferEmpty( emptyX, emptyY, emptyX, ++emptyY);
				break;
			case 3:
				if(emptyY != 0)
					transferEmpty( emptyX, emptyY, emptyX, --emptyY);
				break;
		}
	}
	for ( var i = 0; i < fieldSize; i++ )
		for ( var j = 0; j < fieldSize; j++ )
			$('#', i + "_" + j).click(tdClick);

	clearInterval(timerId);
	timer = 0;
	timerId = setInterval(updateTimer, 1000);
	steps = 0;
	$("#timer").html("0");
	$("#steps").html("0");
};

var timerId = setInterval(updateTimer, 1000);

function tdClick(event){
	var targetElement = event.target;
	var posX = targetElement.id.split("_")[0]; 
	var posY = targetElement.id.split("_")[1];

	if( ( posX == emptyX && Math.abs( posY - emptyY ) === 1) ||
		( posY == emptyY && Math.abs( posX - emptyX ) === 1) ){
		$("#" + emptyX + "_" + emptyY).html(targetElement.innerHTML);
		$(targetElement).html("");
		updateSteps();
		emptyX = posX;
		emptyY = posY;
	}
	checkWin();
}

function checkWin(){
	var win = true;
	for( var i = 0; i < fieldSize; i++){
		for( var j = 0; j < fieldSize; j++){
			if ( i + j != 2 * ( fieldSize - 1 )
				&& $("#" + i + "_" + j).html() != i*(fieldSize) + j + 1){
				win = false;
				break;
			}
		}
	}
	if ( win ){
		clearInterval(timerId);
		$( ".result" ).addClass( "visible" );
		$( ".result" ).removeClass( "hidden" );
		for ( var i = 0; i < fieldSize; i++ )
			for ( var j = 0; j < fieldSize; j++ )
				$("#" + i + "_" + j).prop('onclick',null).off('click');
	}
}

function createTable(){
	var table = document.createElement("table");
	var	tbody = document.createElement("tbody");					
	table.appendChild(tbody);
	for ( var i = 0; i < fieldSize; i++ ){
		var row = document.createElement("tr");
		for ( var j = 0; j < fieldSize; j++ ){
			var cell = document.createElement("td");
			$(cell).attr('id', i + "_" + j).click(tdClick).html(array[i][j]);
			row.appendChild(cell);
		}
		tbody.appendChild(row);					
	}
	if (field.childNodes.length >= 1)
		field.removeChild($(field).children()[0]);
	field.appendChild(table);
}

function transferEmpty( i1, j1, i2, j2 ){
	var tmp = array[i1][j1];
	array[i1][j1] = array[i2][j2];
	array[i2][j2] = tmp;
}

function newGame(){
	resetGame();
	createTable();
}

window.onload = function() {
	field = $("#field-container")[0];
	newGame();
	$("#reset").click( function(){
		fieldSize = $(".quantity-num").val();
		// var width = 60 / fieldSize;
		// console.log($("table").width());
		// $('table td').width("10px");
  	newGame();
	});						
}

$(function() {
  (function quantityProducts() {
    var $quantityArrowMinus = $(".quantity-arrow-minus");
    var $quantityArrowPlus = $(".quantity-arrow-plus");
    var $quantityNum = $(".quantity-num");

    $quantityArrowMinus.click(quantityMinus);
    $quantityArrowPlus.click(quantityPlus);

    function quantityMinus() {
      if ($quantityNum.val() > 2) {
        $quantityNum.val(+$quantityNum.val() - 1);
      }
    }

    function quantityPlus() {
      $quantityNum.val(+$quantityNum.val() + 1);
    }
  })();

});