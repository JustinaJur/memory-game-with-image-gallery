const topics = {
    cinemas: [
        { name: "neris", description: "The horse drawn tram. Operated in 1893–1925." },
        { name: "wilno", description: "first autobusas in vilnius" },
        { name: "pergale", description: "karieta saurer" },
        { name: "vilnius", description: "autobusas" },
        { name: "spalis", description: "roges in winter" },
        { name: "helios", description: "railway in year lalala" }
    ],

    bridges: [
        {
            name: "mindaugo", description: "A ferry at the current location of Mindaugas bridge. Year 1960-1965.",
            source: "http://www.grumlinas.lt/?p=16362"
        },
        {
            name: "pontoninis",
            description: "Pontoon bridge over Neris river close to the current location of Mindaugas bridge. On the picture: people walking to song festival at 'Žalgiris' stadium in 1950.",
            source: "https://lt.wikipedia.org/wiki/Pontoninis_tiltas_Vilniuje"
        },
        {
            name: "zaliasis", description: "Green Bridge at the end of 19th century.",
            source: "http://www.gidas.mb.vu.lt/2009/04/27/zaliojo-tilto-nuotrauka/"
        },
        {
            name: "antokol", description: "View to the upper castle of Vilnius from Antakalnis street.",
            source: "http://www.archyvai.lt/lt/vaa_virtualios-parodos/lietuvos-tiltai-ir-tilteliai.html"
        },
        {
            name: "uzupio", description: "Bridge in Užupis.",
            source: "http://www.archyvai.lt/lt/vaa_virtualios-parodos/lietuvos-tiltai-ir-tilteliai.html"
        },
        {
            name: "zveryno", description: "Opening of Žvėrynas bridge in 1907.",
            source: "http://www.archyvai.lt/lt/vaa_virtualios-parodos/lietuvos-tiltai-ir-tilteliai.html"
        }
    ],

    restaurants: [
        { name: "dainava", description: "The horse drawn tram. Operated in 1893–1925." },
        { name: "draugyste", description: "first autobusas in vilnius" },
        { name: "literatu", description: "karieta saurer" },
        { name: "medininkai", description: "autobusas" },
        { name: "neringa", description: "roges in winter" },
        { name: "nykstukas", description: "railway in year lalala" }
    ],

    transport: [
        {
            name: "arklinis", description: "The horse-drawn tram. Operated in 1893–1925.",
            source: "https://lt.wikipedia.org/wiki/Vilniaus_arklinis_tramvajus"
        },
        {
            name: "autobusas", description: "Bus of interwar Vilnius. Route: Municipality square - Jeruzalė - Verkiai.",
            source: "https://judumas.vilnius.lt/informacija/1905-m-1937-m/"
        },
        {
            name: "saurer", description: "Driver and conductors standing by a bus 'Saurer'. Year 1936-1937.",
            source: "https://judumas.vilnius.lt/informacija/1905-m-1937-m/"
        },
        {
            name: "katedra", description: "Cathedral Square by Antanas Sutkus.",
            source: "http://www.madeinvilnius.com/lt/vilniaus-miesto-studija/vilniaus-viesojo-transporto-istorija/i/"
        },
        {
            name: "roges", description: "Carriers at Cathedral Square. Picture by S. F. Fleury from year 1863.",
            source: "https://madeinvilnius.lt/vilniaus-istorija/vilniaus-miesto-studija/vilniaus-viesojo-transporto-istorija/"
        },
        {
            name: "gelezinkelis", description: "Railway station in year 1910.",
            source: "http://vilnius21.lt/senivaizdai.php?id=87636I7&t=3"
        }
    ]

}

let pics = document.querySelectorAll(".pics");
let buttons = document.querySelectorAll(".topic");
const container = document.querySelector("#container");
const redFlag = document.querySelector(".redFlag");
const announcement = document.querySelector(".announcement");
let matchedCards = [];
let clickedCards = [];
let playing = false;
let allowedGallery = false;

initialize();

function initialize() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function () {
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
        })
    }
}


function play() {
    for (let i = 0; i < pics.length; i++) {
        pics[i].addEventListener("click", function () {
            // open clicked card if number of clicked cards is 0 and prevent opening of matched card 
            if (clickedCards.length == 0 && matchedCards.indexOf(this.id) == - 1) {
                this.setAttribute("src", "images/" + topic[this.id].name + ".jpg");
                // push to clickedCards arr
                clickedCards.push(this);
            }
            // open clicked card if number of clicked cards is 1, prevent opening of matched card and previously clicked
            if (clickedCards.length == 1 && matchedCards.indexOf(this.id) == - 1 && this.id !== clickedCards[0].id) {
                this.setAttribute("src", "images/" + topic[this.id].name + ".jpg");
                clickedCards.push(this);
            }
            if (clickedCards.length == 2) {
                compareCards(clickedCards[0], clickedCards[1]);
            }
        })
    }
};

// compare and count clicked cards
function compareCards(first, second) {
    if (first.src === second.src) {
        //if two clicked cards are not in matchedCards array, push them there 
        if (matchedCards.every(item => item !== first.id && item !== second.id)) {
            matchedCards.push(first.id);
            matchedCards.push(second.id);
        }
        setTimeout(function () {
            first.setAttribute("src", "images/" + "black.jpg")
            second.setAttribute("src", "images/" + "black.jpg");
        }, 500);
        // if all cards are matched, open them all 
        if (matchedCards.length == topic.length) {
            openAllCards(topic);
        }
        smallReset();
    } else {
        //if 2 opened cards are not equal, close them
        setTimeout(function () {
            first.setAttribute("src", "images/" + "white.jpg");
            second.setAttribute("src", "images/" + "white.jpg")
        }, 500);
        smallReset();
    }
}

function openAllCards(topic) {
    setTimeout(function () {
        for (let i = 0; i < pics.length; i++) {
            //open large pictures	 
            pics[i].setAttribute("src", "lg/" + topic[i].name + ".jpg")
        };
        announcement.classList.remove("hidden");
        startGallery();
    }, 700);
}

////  start gallery after all cards are matched 
const outerOverlay = document.querySelector(".outer-overlay");
const overlay = document.querySelector(".overlay");
const overlayPic = document.querySelector(".overlay").getElementsByTagName("img")[0];
const closeButton = document.querySelector(".overlay").querySelector(".close");
let nextButton = document.querySelector(".overlay").querySelector(".next");
const backButton = document.querySelector(".overlay").querySelector(".back");
const description = document.querySelector(".description");

//allow clicking on pictures after all cards are matched
function startGallery() {
    pics.forEach(item => item.addEventListener("click", showPicture))
    allowedGallery = true;
}

// show pics of the gallery 
function showPicture(e) {
    //get id of clicked pic
    let counter = e.target.id;
    // get source of clicked pic
    let src = e.target.src;
    //show overlay
    if (allowedGallery) {
        outerOverlay.classList.add("open");
        overlay.classList.add("open");
    }
    // show clicked picture on overlay
    overlayPic.src = src;
    // get description of the picture
    description.innerText = topic[counter].description;
    description.classList.add("open");
    //hide gallery announcement 
    announcement.classList.add("hidden");

    //show next pic
    nextButton.onclick = function () {
        // add 1 to id of current pic	
        counter++;
        // set counter to 0 when last pic is  displayed
        if (counter === pics.length) { counter = 0 };
        //update description
        description.innerText = topic[counter].description;
        // set currently viewed pic as overlay pic
        overlayPic.src = pics[counter].src;
    }
    // show previous pic
    backButton.onclick = function () {
        counter--;
        if (counter === -1) { counter = pics.length - 1 };
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
///// gallery ends

function reset() {
    pics = Array.from(pics);// return arr
    pics.map(item => item.setAttribute("src", "images/white.jpg"));
    allowedGallery = false;
    matchedCards = [];
    clickedCards = [];
}

function smallReset() {
    setTimeout(function () {
        clickedCards = [];
    }, 500);
};

container.onclick = function () {
    if (!playing) {
        redFlag.classList.add("attention");
    } else {
        redFlag.classList.remove("attention");
    }
};
