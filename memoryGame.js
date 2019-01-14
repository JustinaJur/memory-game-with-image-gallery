var topics = {
cinemas : ["neris", "wilno", "pergale", "vilnius", "spalis", "helios", 
"neris", "wilno", "pergale", "vilnius", "spalis", "helios"],
bridges : ["mindaugo", "pontoninis", "zaliasis", "antokol", "uzupio", "zveryno", "mindaugo", 
"pontoninis", "zaliasis", "antokol", "uzupio", "zveryno"],
restaurants : ["dainava", "draugyste", "literatu", "medininkai", "neringa", "nykstukas", 
"dainava", "draugyste", "literatu", "medininkai", "neringa", "nykstukas"],
transport : ["arklinis", "autobusas", "saurer", "katedra", "roges", "vezikas", 
"arklinis", "autobusas", "saurer", "katedra", "roges", "vezikas"]
}

// transport : ["arklinis", "autobusas", "arklinis", "autobusas" ]
// }




var matchedCards = [];
var clickedCards = [];
var pics = document.querySelectorAll(".pics");
var buttons = document.querySelectorAll(".topic");
var container = document.querySelector("#container");
var redFlag = document.querySelector(".redFlag");
var announcement = document.querySelector(".announcement");
var topic = [];
var playing = false;
var allowedGallery = false;

	
for (var i = 0; i<buttons.length; i++){	
        buttons[i].addEventListener("click", function(){	
		        playing = true;
			    allowedGallery = false;
			    //remove red color
				redFlag.classList.remove("attention");
				
				
				// get selected topic from topics object
		        topic = topics[this.textContent];
				reset();
		        mixCards(topic);
				play()
	})}

	   
	   function play(){ 
	   for (var i = 0; i < pics.length; i++){
		  pics[i].addEventListener("click", function(){    
		   if(clickedCards.length == 0 && matchedCards.indexOf(this.id) == - 1){
			  this.setAttribute("src", "images/" + topic[this.id] + ".jpg");
			   clickedCards.push(this);
			  }
		   if(clickedCards.length == 1 && matchedCards.indexOf(this.id) == - 1 && this.id !== clickedCards[0].id){
			   this.setAttribute("src", "images/" + topic[this.id] + ".jpg");
			   clickedCards.push(this);
			 }
			if(clickedCards.length == 2){compareCards(clickedCards[0], clickedCards[1]);
	}	
})}};
 
   // compare and count clicked cards
  function compareCards(first, second){
	     if(first.src === second.src){
			 if(matchedCards.every(item => item !== first.id && item !== second.id)){
				 matchedCards.push(first.id); console.log(first.id);
				 matchedCards.push(second.id); console.log(second.id);
		    }
			setTimeout(function(){
				first.setAttribute("src", "images/" + "black.jpg")
				second.setAttribute("src", "images/" + "black.jpg");}, 500);
				
			if(matchedCards.length == topic.length){
				// allowedGallery = true;
				console.log(matchedCards);
				/////////////////////////////////
				 openAllCards(topic);
				
	}
				smallReset();
		   }else{
				setTimeout(function(){
					first.setAttribute("src", "images/" + "white.jpg");
					second.setAttribute("src", "images/" + "white.jpg")}, 500);	  
					smallReset();					
  }
}	 


    
	 function openAllCards(topic){
		 setTimeout(function (){
			 for(var i = 0; i<pics.length; i++){		 
		 pics[i].setAttribute("src", "images/" + topic[i] + ".jpg")};
		 announcement.classList.remove("hidden");
		 startGallery();
		 }, 700); 
	 }
	 //////////////////////////////////////////////////////////////////////////////////
	//// ********* start gallery after all cards are matched 
const outerOverlay = document.querySelector(".outer-overlay");	
const overlay = document.querySelector(".overlay");
let overlayPic = document.querySelector(".overlay").getElementsByTagName("img")[0];
const closeButton = document.querySelector(".overlay").querySelector(".close");
const nextButton = document.querySelector(".overlay").querySelector(".next");
const backButton = document.querySelector(".overlay").querySelector(".back");


//allow clicking on pictures after all cards are matched
function startGallery(){  	
        pics.forEach(item => item.addEventListener("click", showPicture))
		allowedGallery = true;
}
	
	    // show pics of the gallery 
		function showPicture(e){
	    //get id of clicked pic
		let counter = e.target.id;
		// get source of clicked pic
		let src = e.target.src;
		 //show overlay
		 
		if (allowedGallery) {outerOverlay.classList.add("open");
		                     overlay.classList.add("open");}
			// show clicked picture on overlay
			overlayPic.src = src;
			//hide gallery announcement 
			announcement.classList.add("hidden");
			     
				
				 //show next pic
				nextButton.onclick = function() {
				 // add 1 to id of current pic	
			    counter++;
				
				// set counter to 0 when last pic is being displayed
				if(counter === pics.length) {counter = 0}
				// set currently viewed pic as overlay pic
				overlayPic.src = pics[counter].src;
			}
	           // show previous pic
			   backButton.onclick = function(){
			   counter--;
			   if(counter === -1) {counter = pics.length-1}
			   overlayPic.src = pics[counter].src;
			   
		}
		}

		
		
		
		  //close exposition
	      closeButton.addEventListener("click", close);
		  function close() {
          overlay.classList.remove("open");
          outerOverlay.classList.remove("open");
		 
    }
	 ///// ****** exposition ends
	 ///////////////////////////////////////////////////////////////////////////////////

	 
	 
	 
	 
	 
	 
function reset(){
	pics = Array.from(pics);// return arr
    pics.map(item => item.setAttribute("src", "images/white.jpg"));
	allowedGallery = false;
	matchedCards = [];
	clickedCards = [];
}

function mixCards(array){
    for (var i = array.length - 1; i > 0; i--) {
        var rand = Math.floor(Math.random() * (i + 1));
        [array[i], array[rand]] = [array[rand], array[i]];
    }
}

function smallReset(){
	setTimeout(function(){
		clickedCards = [];
    }, 500);
};

container.onclick = function(){
	if(!playing){
		redFlag.classList.add("attention");	  
	}else{
		redFlag.classList.remove("attention");
	}
};



