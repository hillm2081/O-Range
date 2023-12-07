console.log("js connected")

const options = ["","Orange", "Binoculars", "Scope", "Watch", "Rounds", "Wearable Decoy"]
const encounterTypes = ["Deer", "Doe", "Human"]
const encounterVisibleStatus = []
var equipment = [0,0,0,0,0,0]
var skills = [0,0,0,0,0]
var remainingPoints = 2;
var tbl;
var legalTime;
var tal;
var secondsPassed= 0;
var clipsize = 1;
var rounds_in_clip = 1;
var safety_state = 0;
var encounterList = [];
var encounterTime = [];
var encounterHangtime= [];

var lightCycle= ["#020024", "#090979", "#394296", "#5a63a9", "#bed8f2", "#dbebf9"];//could be weather related.. change opacity and mimmick clouds..?

var totalSeconds = 0;





var timeSpeed = 1000;
var points = 0;




//Default values
var deerSpawn = 5;
var doeSpawn = 3;
var humanSpawn = 2;
var currentSky = 0;

// buildValues();
var equipment_item = document.getElementsByClassName("equipment_item");
var inputs = document.getElementsByTagName("input");
start();
function start() {
    makeEncounter();

    legalHuntingTimes();

    console.log(encounterList)
    console.log(encounterTime)
    console.log(encounterHangtime);

    var div = document.getElementById("animal-detector").appendChild(document.createElement("div"));

    for (var i = 0; i < encounterList.length; i++) {
        var animal_tracker = document.createElement("p");
        animal_tracker.id = "encounter" + i;
        div.appendChild(animal_tracker);
        document.getElementById("encounter" + i).innerHTML = encounterTime[i] - secondsPassed + "s, " + encounterList[i];
        encounterVisibleStatus.push("0")

    }

}


document.getElementById("game").addEventListener("mouseover", function(){//Must keep mouse here, or lose points
    console.log("Mouse is hovering over deer detector")
    document.getElementById("deerAlert").style.backgroundColor =  "orange";
    points+5;
});
document.getElementById("game").addEventListener("mouseout", function(){
    console.log("Mouse is no longer hovering over deer detector")
    document.getElementById("game").style.backgroundColor =  "grey";
    points = points - 20;
});

function bang() {
    document.getElementById("game").style.backgroundColor = "red";
    setTimeout(function() {
        document.getElementById("deerAlert").style.backgroundColor =  "black";
    }, 100);
     

}


document.getElementById("shoot").addEventListener("click", function(){//Shoot your gun

    if (rounds_in_clip > 0 && safety_state == 1) {
    console.log("BANG!")
    bang();
    document.getElementById("game").style.backgroundColor = "rgb(255, 0, 0)";

    rounds_in_clip--;
    } else if (rounds_in_clip == 0 && safety_state == 1) {   
    console.log("Click.")
    
    } else if (safety_state == 0) {
        console.log("Cannot fire, safety is on.")
    }
 
});
document.getElementById("reload").addEventListener("click", function(){//Reload your clip

if (rounds_in_clip == 0) {   
    console.log("Clip reloaded.")
    rounds_in_clip = clipsize;
    } else if (rounds_in_clip > 0) {
    console.log("Clip has been filled.")
    }

});
document.getElementById("safety").addEventListener("click", function(){//Having safety off reduces points.

    if (safety_state == 0) {   
        console.log("Safety is off.")
        safety_state++;
        } else {
        console.log("Safety is on.")
        safety_state--;
        }
    
    });
document.getElementById("toggle-timer").addEventListener("click", function(){//Toggle timer on and off


    console.log(this.value);
    if (Number(this.value) == 0) {

        console.log("Disabling stats..")
        this.value = 1;
        document.getElementById("personal-stats-information").classList.add("disabled");
        console.log("Enabling game..")
        setInterval(timer);
        document.getElementById("game-display").classList.remove("disabled");
        document.getElementById("remainingPoints").innerHTML = remainingPoints;



    } else if (Number(this.value) == 1) {

        console.log("Enabling stats..")
        this.value = 0;
        document.getElementById("personal-stats-information").classList.remove("disabled");
        console.log("Disabling game..")
        clearInterval(timer);
        document.getElementById("game-display").classList.add("disabled");
        document.getElementById("remainingPoints").innerHTML = remainingPoints;

    }
});


for(var i = 0; i < equipment_item.length; i++) {//For all equipment, make a corresponding array.Track poitnts
    equipment_item[i].dataset.val = 0; // initialize data-val to 0
    equipment_item[i].addEventListener("click", function(){
        console.log(this.innerText)
        console.log(this.dataset.val)
        if (this.dataset.val == '0' && checkPoints() == true) {
            console.log(remainingPoints)
            this.dataset.val = '1';
            this.classList.add("selected");
            remainingPoints--;
            document.getElementById("remainingPoints").innerHTML = remainingPoints;

            // Add the "selected" class
        } else if(this.dataset.val == '1') {
            this.dataset.val = '0';
            this.classList.remove("selected"); // Remove the "selected" class
            remainingPoints++;
            document.getElementById("remainingPoints").innerHTML = remainingPoints;


        }
        console.log(this)
        // selectOption(this.value, this.classList,);
    });
}


function checkPoints() {//check if any points remaining
    if (remainingPoints > 0) {
        console.error("No points remaining! Free some up to select something different.")
    }
    return remainingPoints > 0;
}

function selectOption(value, clss) {//Pick a piece of equipment to bring
    console.log(options[value])
    console.log(clss);
    if (clss == "equipment_item") {
        console.log(clss + " "+"is equipment_item")
    } else if (clss == "skill_item") {
        console.log(clss + " "+ "is skill_item")
    }

}


var timer = setInterval(function() {
    secondsPassed++;

    for (var x = 0; x < encounterList.length; x++) {
        // console.log(encounterTypes[encounterList[x]])
        var z = encounterTypes[encounterList[x]];
        document.getElementById("encounter" + x).innerHTML = encounterTime[x] - secondsPassed + " - " + (encounterTime[x] - secondsPassed + encounterHangtime[x]) + "s, " + z;
    }

    // document.getElementById("encounterOne").innerHTML = encounterTime[0] - secondsPassed + " - " + (encounterTime[0] - secondsPassed + encounterHangtime[0]) + "s until enc one";
    // document.getElementById("encounterTwo").innerHTML = encounterTime[1] - secondsPassed + " - " + (encounterTime[1] - secondsPassed + encounterHangtime[1]) + "s until enc two";
    // document.getElementById("encounterThree").innerHTML = encounterTime[2] - secondsPassed + " - " + (encounterTime[2] - secondsPassed + encounterHangtime[2]) + "s until enc three";
    // document.getElementById("encounterFour").innerHTML = encounterTime[3] - secondsPassed + " - " + (encounterTime[3] - secondsPassed + encounterHangtime[3]) + "s until enc four";


    currentSky = ((secondsPassed / (tbl + tal + legalTime)).toFixed(1)) * 10;
    if (currentSky >= 5) {
        currentSky = 10 - currentSky;
        document.getElementById("game").style.backgroundColor = lightCycle[Number(currentSky)];

    } else {
        document.getElementById("game").style.backgroundColor = lightCycle[Number(currentSky)];
    }


    // console.log(secondsPassed+"/"+(tal+legalTime+tbl))
    document.getElementById("current-time").innerHTML = (tbl + tal + legalTime) - secondsPassed + "s remaining.";
    var deerAppearance = 20;
    //insert (if clock equipped) here

    
                            //Deer encounters
     if (secondsPassed == tbl) {
        console.log("Legal hunting time begins!")
    } else if (secondsPassed == tbl + legalTime) {
        console.log("Legal hunting time ends!")
    } else if (secondsPassed == tbl + legalTime + tal) {
        console.log("Game over!")
        clearInterval(timer);
    }
                            //Deer encounters
    for (x = 0; x < encounterList.length; x++) {
        if (secondsPassed == encounterTime[x]) {
            console.log("Encounter " + x + " appears!")
            encounterVisibleStatus[x] = 1;
            document.getElementById("deerAlert").style.backgroundColor = "red";


        }else if (secondsPassed >= (encounterTime[x] + encounterHangtime[x])) {
            console.log("Encounter " + x + " leaves!")
            document.getElementById("encounter" + x).innerHTML = encounterTypes[encounterList[x]] + " fled."
            encounterVisibleStatus[x] = 0;
            document.getElementById("deerdetector").style.backgroundColor = "rgb(88, 19, 19)";

    
    }
    }
                            //Deer hangtime
    if (secondsPassed == deerAppearance) {

    }
                            //Safety bonus
    if (safety_state == 0) {
        points = points + 2;

    } else if(safety_state == 1) {
        points = points - 5;
    }
    document.getElementById("points").innerHTML = points; 

    
    

}, timeSpeed);
function buildValues() {
    legalHuntingTimes();
    makeAppearance();
}

//introduce weather?

function legalHuntingTimes() {
    tbl = Math.round(Math.random() * 30 + 10);
    legalTime = Math.round(Math.random() * 180 + 30);
    tal = Math.round(Math.random() * 30 + 10);
    console.log(tbl +  " before legal light")
    console.log(legalTime +  " seconds of legal light")
    console.log(tal +  " after legal light")
    console.log(tbl + legalTime + tal + " total hunting game length" )
    document.getElementById("legal-hunting-start").innerHTML = tbl + legalTime + tal + " seconds ";
    // console.log(deerAppearance + " seconds until deer appears")



}




function makeAppearance() {
    var deerAppearance = Math.round(Math.random() * 50);
    var deerHangtime = Math.round(Math.random()*4 + 2);

    console.log(deerSpawn + "|" +doeSpawn  + "|" + humanSpawn)

    
    if (deerAppearance < (tbl + legalTime + tal)) {
        var random = Math.round(Math.random() * 10);
        console.log(random)

        console.log((deerSpawn + doeSpawn) +"|" + (deerSpawn + doeSpawn + humanSpawn))


        //make another appearance spawn
    }
    console.log(deerAppearance + " seconds until deer appears")

    }



function makeEncounter() {

    var encounterAmount = Math.round(Math.random() * 5 + 1);
        console.log(encounterAmount)
    for (x = 0; x < encounterAmount; x++) {
        var random = Math.round(Math.random() * 10);
        var encTime;



        console.log(encounterTime)
        if (encounterTime.length === 0) {
            encTime = Math.round(Math.random() * 50 + 2);
            console.log("No previous encounter")
        } else {
            encTime = Math.round(Math.random() * 50 + encounterTime[x-1]);
            console.log("Previous encounter, taken into account")
        }



        var encHangtime = Math.round(Math.random() * 2 + 2);
        var temp;

                                //Select encounters
        if (random <= deerSpawn) {
            temp = 0;
        } else if (deerSpawn < random  && random <= (deerSpawn + doeSpawn)) {
            temp = 1;
        } else if ((deerSpawn + doeSpawn) < random && random <= (deerSpawn + doeSpawn + humanSpawn)) {
            temp = 2;
        }
        encounterList.push(temp)
        encounterTime.push(encTime)
        encounterHangtime.push(encHangtime)
        }
    // console.log("Encounter List --------")
    // console.log(encounterList)
    // console.log("Encounter Time --------")//Time the deer appears
    // console.log(encounterTime)
    // console.log("Encounter Hangtime --------")//Time the deer hangs around for before leaving
    // console.log(encounterHangtime)
    console.log(tbl + tal + legalTime)
    var totalHunt = 0;

    for (x = 0; x < encounterAmount; x++) {
        totalHunt = totalHunt + (encounterTime[x] + encounterHangtime[x])
        // console.log(totalHunt)
    }
    console.log(totalHunt + " total hunt time");

}





