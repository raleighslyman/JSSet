
//create the deck

var deck;

function create_deck(){
	deck = [];
	var colors = ['green', 'purple', 'red'];
	for (var color=0; color<3; color++) {
		for (var shape=0; shape<3; shape++) {
			for (var fill=0; fill<3; fill++) {
				for (var number=0; number<3; number++) {
					deck.push ({color: colors[color], shape: shape, fill: fill, number: number, selected: false})
				}	
			}
		}
	}
}


create_deck();

var cards_in_play = [];
//cards_in_play are the cards currently in play

var number_of_cards = 12;
//number_of_cards are the total amount of cards that can be on the board


function pick_cards_in_play(){
	//creates the cards in play
	for (var i=0;i<number_of_cards;i++) {
		//creates a random number
		var random_card = Math.floor (Math.random()*deck.length);
		//draws a random card out of the deck and stores it as var card
		var card = deck[random_card];
		//gives the card an id to help distinguish it from other cards
		card.id = i;
		// remove it from deck
		deck.splice(random_card, 1);
		//adds it to cards_in_play
		cards_in_play.push(card);
	}
}
pick_cards_in_play();
console.log(cards_in_play);



//adds shapes to the card
function numberchanger(card, number){

	if (card.number==0)
	{	
		$("#card" + number).append('<div class="shape" id ="shape'+number+'"></div>');	
		$("#shape" + number).css("top", "140px");		
	}

	else if (card.number==1)
	{	
		$("#card" + number).append('<div class="shape" id ="shape'+number+'"></div>');	
		$("#card" + number).append('<div class="shape" id ="shape'+number+'"></div>');	
		$("div#shape" + number).css("top", "100px");
	}

	else if (card.number==2)
	{	
		$("#card" + number).append('<div class="shape" id ="shape'+number+'"></div>');	
		$("#card" + number).append('<div class="shape" id ="shape'+number+'"></div>');	
		$("#card" + number).append('<div class="shape" id ="shape'+number+'"></div>');	
		$("div#shape" + number).css("bottom", "80px");
	}
	else
	{
		alert ("PROBLEM!!  unrecognized card data.")
	}
}
//changes the shapes of the cards
function colorchanger(card, place){
	$("div#shape" + place).addClass(card.color);
}
//changes the fill in the card
function fillchanger(card, place){

	if (card.fill==0)
	{
		$("div#shape" + place).addClass("full");
	}

	else if (card.fill==1)
	{
		$("div#shape" + place).addClass("striped");
	}

	else if (card.fill==2)

	{
		$("div#shape" + place).addClass("transparent");
	}

	else
	{
		alert ("PROBLEM!!  unrecognized card data.")
	}
}
//changes the shapes in the card
function shapechanger(card, place){

	if (card.shape==0)	{
		$("div#shape" + place).addClass("square");
	}

	else if (card.shape==1)
	{
		$("div#shape" + place).addClass("circle");
	}

	else if (card.shape==2)
	{
		$("div#shape" + place).addClass("diamond");
	}

	else {
		alert ("PROBLEM!!  unrecognized card data.")
	}
}






//calls of of the modifying functions at once
function call_changers() {
	for (i=0;i<number_of_cards;i++) {
		numberchanger(cards_in_play[i], i)
		colorchanger(cards_in_play[i], i)
		fillchanger(cards_in_play[i], i)
		shapechanger(cards_in_play[i], i)

	}

}


call_changers();


$('.card').on('click', handle_touch);
$('.card').on('touchend', handle_touch);


function get_selected_card_info(whichcard) {
	// find the card that was just clicked on
	//returns the information
	for (var i=0; i<cards_in_play.length; i++) {
		if ("card"+cards_in_play[i].id == whichcard) {
			return cards_in_play[i];
		}
	}
}


function handle_touch(e) {
	var whichcard = this.id;
	console.log('card: '+whichcard);
	var card = get_selected_card_info(whichcard);
	console.log(card);
	console.log("BEFORE: card is now "+card.selected);


	// it is already highlighted.  TURN IT OFF.
	if ($(this).hasClass('highlighted')) {

		card.selected = false;
		$(this).removeClass('highlighted');
	}



	// TURN IT ON

	else {

		card.selected = true;
		$(this).addClass('highlighted');
	}

	console.log("AFTER: card is now "+card.selected);

	// count the number of selected cards
	var selected_cards_count = 0;

	for (var i = 0; i < cards_in_play.length; i++ ) {

		if (cards_in_play[i].selected == true) {

			selected_cards_count ++;
		}
	}



	console.log (selected_cards_count + " cards selected!")
	//creates the variable to store the set of three cards
	var set_of_cards = [];
	//executes actions if three cards are selected
	if (selected_cards_count == 3){

		console.log("Full Count");
		$("div").removeClass("highlighted");
		for(i=0; i<cards_in_play.length; i++){
			if( cards_in_play[i].selected == true){
						set_of_cards.push(cards_in_play[i]);
						console.log(set_of_cards);
			}
		}
		//creates a variable to check if the card has 4 similaritites of differences
		var cardsimilarities = 0;

		function checkset(attribute){
			if (set_of_cards[0][attribute]==set_of_cards[1][attribute] && set_of_cards[1][attribute] == set_of_cards[2][attribute]){
					cardsimilarities ++;
				}
			else if (set_of_cards[0][attribute]!=set_of_cards[1][attribute] && set_of_cards[1][attribute] != set_of_cards[2][attribute] && set_of_cards[0][attribute]!=set_of_cards[2][attribute])
				{
					cardsimilarities ++;
				}
			// comment the next line out if you want to disable cheat mode(all 3 cards are sets)	
			//cardsimilarities ++;			
		};
		checkset('color');
		checkset('fill');
		checkset('shape');
		checkset('number');

		if (cardsimilarities >= 4){

				// deselect all cards
				for (var i=0; i<number_of_cards; i++) {
					cards_in_play[i].selected = false;
				}

				// replace the cards in the set with new cards from the deck
				for(i=2;i>=0;i--){
					//creates a random number
					var random_card = Math.floor (Math.random()*deck.length);
					var new_card = deck[random_card];

					console.log(new_card);

					// remove it from deck
					deck.splice(random_card, 1);
					//gets rid of the card and adds a new one
					new_card.id=set_of_cards[i].id;
					cards_in_play.splice(set_of_cards[i]["id"],1,new_card);

				}
			$("div.shape").remove();

			call_changers();
			console.log(cards_in_play); 



			}
			else {
				selected_cards_count = 0;
				for(i=0;i<number_of_cards;i++)
					{cards_in_play[i].selected=false;}
				}
		var cards = document.getElementsByClassName('.card');
		cards.selected = false;

		set_of_cards.length = 0;
		selected_cards_count = 0;
	}

}

