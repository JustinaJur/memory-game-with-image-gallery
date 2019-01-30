let topics = {
	cinemas:[ 
	          {name: "neris", description: "The horse drawn tram. Operated in 1893–1925."},
              {name: "wilno", description: "first autobusas in vilnius"},  
              {name: "pergale", description: "karieta saurer"},  
              {name: "vilnius", description: "autobusas"},  
              {name: "spalis", description: "roges in winter"},  
              {name: "helios", description: "railway in year lalala"}
],

    bridges:[ 
	          {name: "mindaugo", description: "The horse drawn tram. Operated in 1893–1925."},
              {name: "pontoninis", description: "first autobusas in vilnius"},  
              {name: "zaliasis", description: "karieta saurer"},  
              {name: "antokol", description: "autobusas"},  
              {name: "uzupio", description: "roges in winter"},  
              {name: "zveryno", description: "railway in year lalala"}
],

    restaurants:[ 
	          {name: "dainava", description: "The horse drawn tram. Operated in 1893–1925."},
              {name: "draugyste", description: "first autobusas in vilnius"},  
              {name: "literatu", description: "karieta saurer"},  
              {name: "medininkai", description: "autobusas"},  
              {name: "neringa", description: "roges in winter"},  
              {name: "nykstukas", description: "railway in year lalala"}
],

 transport : [
           {name: "arklinis", description: "The horse drawn tram. Operated in 1893–1925."},
           {name: "autobusas", description: "first autobusas in vilnius"},  
           {name: "saurer", description: "karieta saurer"},  
           {name: "katedra", description: "autobusas"},  
           {name: "roges", description: "roges in winter"},  
           {name: "gelezinkelis", description: "railway in year lalala"} 		   
]

}



let pics = document.querySelectorAll(".pics");
let buttons = document.querySelectorAll(".topic");
let container = document.querySelector("#container");
let redFlag = document.querySelector(".redFlag");
let announcement = document.querySelector(".announcement");
let matchedCards = [];
let clickedCards = [];
// let topic = [];
let playing = false;
let allowedGallery = false;

initialize();
	
function initialize (){	
for (let i = 0; i<buttons.length; i++){	
        buttons[i].addEventListener("click", function(){	
		        playing = true;
			    allowedGallery = false;
			    //remove red color
				redFlag.classList.remove("attention");
				// get selected topic from topics object
		        topic = topics[this.textContent];
				//double objects in topic array
				topic = topic.concat(topic);
				//mix order of objects in topic array
                topic.sort(() => Math.random() - 0.5); 
                reset();
				play()
	})}
}

	   
	   function play(){ 
	   for (let i = 0; i < pics.length; i++){
		  pics[i].addEventListener("click", function(){  
            // open clicked card if number of clicked cards is 0 and prevent opening of matched card 
		   if(clickedCards.length == 0 && matchedCards.indexOf(this.id) == - 1){
			  this.setAttribute("src", "images/" + topic[this.id].name + ".jpg");
               // push to clickedCards arr
			   clickedCards.push(this);
			  }
            // open clicked card if number of clicked cards is 1, prevent opening of matched card and previously clicked
		   if(clickedCards.length == 1 && matchedCards.indexOf(this.id) == - 1 && this.id !== clickedCards[0].id){
			   this.setAttribute("src", "images/" + topic[this.id].name + ".jpg");
			   clickedCards.push(this);
			 }
			if(clickedCards.length == 2){compareCards(clickedCards[0], clickedCards[1]);
	}	
})}};
 
   // compare and count clicked cards
  function compareCards(first, second){
        
	     if(first.src === second.src){
              //if two clicked cards are not in matchedCards array, push them there 
			 if(matchedCards.every(item => item !== first.id && item !== second.id)){
				 matchedCards.push(first.id); 
				 matchedCards.push(second.id);
		    }
			setTimeout(function(){
				first.setAttribute("src", "images/" + "black.jpg")
				second.setAttribute("src", "images/" + "black.jpg");}, 500);
			// if all cards are matched, open them all 
			if(matchedCards.length == topic.length){
				 openAllCards(topic);			
	}
				smallReset();
		   }else{
                 //if 2 opened cards are not equal, close them
				setTimeout(function(){
					first.setAttribute("src", "images/" + "white.jpg");
					second.setAttribute("src", "images/" + "white.jpg")}, 500);	  
					smallReset();					
  }
}	 


    
	 function openAllCards(topic){
		 setTimeout(function (){
			 for(let i = 0; i<pics.length; i++){	
          //open large pictures	 
		 pics[i].setAttribute("src", "lg/" + topic[i].name + ".jpg")};
		 announcement.classList.remove("hidden");
		 startGallery();
		 }, 700); 
	 }
	 
	 //////////////////////////////////////////////////////////////////////////////////
	//// ********* start gallery after all cards are matched 

let outerOverlay = document.querySelector(".outer-overlay");	
let overlay = document.querySelector(".overlay");
let overlayPic = document.querySelector(".overlay").getElementsByTagName("img")[0];
let closeButton = document.querySelector(".overlay").querySelector(".close");
let nextButton = document.querySelector(".overlay").querySelector(".next");
let backButton = document.querySelector(".overlay").querySelector(".back");
let description = document.querySelector(".description");


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
		 
		if (allowedGallery) {
			outerOverlay.classList.add("open");
		    overlay.classList.add("open")
			;}
			// show clicked picture on overlay
			overlayPic.src = src;
             // get description of the picture
            description.innerText = topic[counter].description;
            description.classList.add("open");
			//hide gallery announcement 
			announcement.classList.add("hidden");
			    
				 //show next pic
				nextButton.onclick = function() {
				 // add 1 to id of current pic	
			    counter++;
				// set counter to 0 when last pic is being displayed
				if(counter === pics.length) {counter = 0};
				 //update description
				description.innerText = topic[counter].description;
				// set currently viewed pic as overlay pic
				overlayPic.src = pics[counter].src;
			}
	           // show previous pic
			   backButton.onclick = function(){
			   counter--;
			   if(counter === -1) {counter = pics.length-1};
			   //update description
               description.innerText = topic[counter].description;
			   overlayPic.src = pics[counter].src;
			   
		}
}

		  //close gallery
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
