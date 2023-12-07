console.log("js connected")

const options = ["","Orange", "Binoculars", "Scope", "Watch", "Rounds", "Wearable Decoy"]
const encounterTypes = ["Deer", "Doe", "Human"]
const encounterVisibleStatus = []
var equipment = [0,0,0,0,0,0]
var skills = [0,0,0,0,0]
var remainingCredits = 2;
var creditGraphic = []//manages colors of creditgraphic
var totalCredits;
var tbl;
var shootGradient = 'linear-gradient(135deg, #ff4a4a, #840f0f)';
var legalTime;
var tal;
var secondsPassed= 0;
var encounterPresent = 0;
var clipsize = 1;
var timer;
var rounds_in_clip = 1;
var safety_state = 0;
var encounterList = [];
var encounterTime = [];
var encounterHangtime= [];
var currentColor = document.getElementById("game").style.backgroundColor;
var scope = 0;



//stat trackers
var bucksShot= 0;
var doesShot = 0;
var humansShot = 0;
var triggerPulls= 0;
var safetyToggles= 0;
var reloads = 0;
var inventoryTime = 0;
var bulletsFired = 0;
var misses = 0;
var unethicalActions = 0;


var lightCycle= ["#020024", "#090979", "#394296", "#5a63a9", "#bed8f2", "#dbebf9"];//could be weather related.. change opacity and mimmick clouds..?

var totalSeconds = 0;





var timeSpeed = 1000;
var points = 0;




//Default values
var deerSpawn = 5;
var doeSpawn = 3;
var humanSpawn = 2;
var currentSky = 0;

var equipment_item = document.getElementsByClassName("equipment_item");
var inputs = document.getElementsByTagName("input");
start();


function start() {
    updateStats();

    document.getElementById("shoot").style.background = "black";//set shoot button to black
    document.getElementById("game-display").style.display = "none";//hide active hunt
    document.getElementById("inventory").style.display = "flex";
    document.getElementById("deerAlert").style.backgroundColor = "black";
    document.getElementById("deerAlert").style.visibility = "hidden";
    document.getElementById("reload").style.background = "grey";
    document.getElementById("stat-manual").style.display = "none";
    document.getElementById("reload").classList.add("disabled");
    document.getElementById("stat-watch").style.display = "none";
    document.getElementById("animal-detector").style.display = "none";

    makeEncounter();

    legalHuntingTimes();

    makeGraphics();
    console.log(encounterList)
    console.log(encounterTime)
    console.log(encounterHangtime);

    var div = document.getElementById("animal-detector").appendChild(document.createElement("div"));

    for (var i = 0; i < encounterList.length; i++) {
        var animal_tracker = document.createElement("p");
        animal_tracker.id = "encounter" + i;
        div.appendChild(animal_tracker);
        document.getElementById("encounter" + i).innerHTML = encounterTime[i] - secondsPassed + "s, " + encounterList[i];

    }

}

function makeGraphics() {
    totalCredits = remainingCredits;
    console.log(remainingCredits + " credits");
    for (let x = 0; x < remainingCredits; x++) {
        const div = document.createElement("div");
        div.id = "creditCircle" + x;
        div.className = "creditCircle unallocated";
        document.getElementById("creditGraphic").appendChild(div);
        creditGraphic.push("0")//Make each credit unallocated. 0 = unallocated, 1 = allocated. This is used to manage color appearance
        // document.getElementById("remainingCredits").innerHTML = remainingCredits;

    }
}


document.getElementById("restart").addEventListener("click", function(){
  location.reload();  
})//Restart game



function bang() {


gsap.from("#game", {duration: 1, scale: 1.5, ease: "expo"});




    currentColor = document.getElementById("game").style.backgroundColor;
    document.getElementById("game").style.backgroundColor = "red";
    setTimeout(function() {
        document.getElementById("game").style.backgroundColor = currentColor;
    }, 100);
     






}


document.getElementById("shoot").addEventListener("click", function(){//Shoot your gun

    if (rounds_in_clip > 0 && safety_state == 1) {
        bang();

        bulletsFired++;
    console.log("BANG!")
    document.getElementById("game").style.backgroundColor = "rgb(255, 0, 0)";
        var missed = 1;//missed until proven not missed
        var accuracy = Math.round(Math.random() * 10);

        console.log(secondsPassed + "|" + tbl + "|" + (tbl + legalTime));
        if (secondsPassed < tbl || secondsPassed > (tbl + legalTime)) {
            console.log("No shooting before legal light. Penalty applied.");
            points -= 100;
            unethicalActions++;
        }

        if (document.getElementById("equipmentItem2").dataset.val == 1) {//If scope equipped, increase accuracy
            accuracy = 10;
            console.log("Scope equipped, accuracy increased!");
        } 
        console.log(accuracy)
    if (accuracy > 5) {
        for (x = 0; x < encounterVisibleStatus.length; x++) {
            // console.log(encounterVisibleStatus[x])
        
        if (encounterVisibleStatus[x] == 1) {
            console.log("You shot something!")
            encounterVisibleStatus[x] = 2;//record death of encountered creature
            if (encounterList[x] == 0) {
                points = points + 150;
                console.log("You shot a buck!")
                bucksShot++;
                missed = 0;//didn't miss
            } else if (encounterList[x] == 1) {
                points =  points - 175;
                unethicalActions++;

                doesShot++;
                console.log("You shot a doe. Don't do that!")
                missed = 0;//didn't miss
            } else if (encounterList[x] == 2) {
                points = points - 500;
                unethicalActions++;

                humansShot++;
                console.log("You just shot a human! You're going to jail!")
                missed = 0;//didn't mi
                }
            }
        }
    } else {
        console.log("No scope equipped, you missed!")
        unethicalActions++;

        points = points - 25;//point dedution for no scope & miss.
        missed = 1;//missed
        document.getElementById("deerAlert").innerHTML = "Shot missed!";
    }
  

        

        console.log("Points updated");
    
    if (missed = 1) {//if you missed, lose points
        console.log("You probably missed, whatever it was.")
        misses++;

        console.log(points)
        points = points - 50;
        console.log(points);
    }



    rounds_in_clip--;

    if (rounds_in_clip == 0) {
        gsap.from("#shoot", {duration: .1, scale:1.2,opacity: 0.0, ease: "sine"});

        document.getElementById("reload").classList.remove("disabled");

        document.getElementById("reload").style.background = "yellow";
    } else {
        document.getElementById("reload").style.background = "grey";
        document.getElementById("reload").classList.add("disabled");


    }

    } else if (rounds_in_clip == 0 && safety_state == 1) {   
        triggerPulls++;
    console.log("Click.")//gun is empty
    
    } else if (safety_state == 0) {
        console.log("Cannot fire, safety is on.")
        triggerPulls++;

    }
 
});
document.getElementById("reload").addEventListener("click", function(){//Reload your clip

if (rounds_in_clip == 0) {   
    reloads++;
    console.log("Clip reloaded.")
    rounds_in_clip = clipsize;
    } else if (rounds_in_clip > 0) {
    console.log("Clip has been filled.")
    }
    document.getElementById("reload").style.background = "grey";


});
document.getElementById("safety").addEventListener("click", function(){//Having safety off reduces points.
    safetyToggles++;

    if (safety_state == 0) {   
        console.log("Safety is off.")
        safety_state++;
        gsap.from("#shoot", {duration: .1, scale:1.2,opacity: 0.0, ease: "sine"});

        document.getElementById("safety-dot").style.backgroundColor = "red";
        document.getElementById("shoot").style.background = shootGradient;
        document.getElementById("shoot").style.filter = "blur(0px) opacity(1)"

        } else {
        console.log("Safety is on.")
        safety_state--;
        document.getElementById("safety-dot").style.backgroundColor = "limegreen";
        document.getElementById("shoot").style.background = "black";
        document.getElementById("shoot").style.filter = "blur(2px) opacity(0.5)"
        }
    
    });
document.getElementById("toggle-timer").addEventListener("click", function(){//Toggle timer on and off


    console.log(this.value);
    if (Number(this.value) == 0) {
        document.getElementById("shoot").classList.remove("disabled");
        document.getElementById("reload").classList.remove("disabled");
        document.getElementById("safety").classList.remove("disabled");


        gsap.from("#controls", {duration: .2, opacity: 0.0,scale: 1, ease: "sine"});

        console.log("Disabling stats..")
        this.value = 1;
        document.getElementById("personal-stats-information").classList.add("disabled");
        console.log("Enabling game..")
        huntingTimer();

        
        document.getElementById("game-display").classList.remove("disabled");
        gsap.from("#game-display", {duration: .2, opacity: 0.0,scale: 1, ease: "sine"});
        gsap.from("#inventory", {duration: .2, opacity: 0.0,scale: 1, ease: "sine"});

        document.getElementById("game-display").style.display = "flex";//shows active hunt
        document.getElementById("inventory").style.display = "none";//shows inventory




    } else if (Number(this.value) == 1) {
        document.getElementById("shoot").classList.add("disabled");
        document.getElementById("reload").classList.add("disabled");
        document.getElementById("safety").classList.add("disabled");
        gsap.from("#controls", {duration: .2, opacity: 0.0,scale: 1, ease: "sine"});


        console.log("Enabling stats..")
        this.value = 0;
        document.getElementById("personal-stats-information").classList.remove("disabled");
        console.log("Disabling game..")
        clearInterval(timer);
        document.getElementById("game-display").classList.add("disabled");
        gsap.from("#game-display", {duration: .2, opacity: 0.0,scale: 1, ease: "sine"});
        gsap.from("#inventory", {duration: .2, opacity: 0.0,scale: 1, ease: "sine"});
        document.getElementById("game-display").style.display = "none";//shows active hunt
        document.getElementById("inventory").style.display = "flex";//shows inventory

    }
});


for(var i = 0; i < equipment_item.length; i++) {//For all equipment, make a corresponding array.Track poitnts
    equipment_item[i].dataset.val = 0; // initialize data-val to 0
    equipment_item[i].addEventListener("click", function(){
        console.log(this.innerText)
        console.log(this.dataset.val)



        if (this.dataset.val == '0' && checkPoints() == true) {//If unselected and points remaining, select it
            console.log(remainingCredits)
            this.dataset.val = '1';
            this.classList.add("selected");
            console.log((totalCredits - remainingCredits));
            document.getElementById("creditCircle0").classList.remove("unallocated");
            console.log(this.id)


            if (this.id == "equipmentItem3") {//If watch equipped, show timer
                gsap.from("#stat-watch", {duration: .2, opacity: 0.0,scale: 0, ease: "sine"});

                document.getElementById("stat-watch").style.display = "block";

            } else if (this.id == "equipmentItem1") {//If binoculars equipped, show animal detector
                gsap.from("#deerAlert", {duration: .2, opacity: 0.0,scale: 0, ease: "sine"});

                document.getElementById("equipmentItem1").style.display = "block";

                document.getElementById("deerAlert").style.visibility = "visible";
                document.getElementById("deerAlert").innerHTML = "looking...";

            }else if (this.id == "equipmentItem4") {//If Hunters Manual equipped, show rules and safety
                gsap.from("#stat-manual", {duration: .2, opacity: 0.0,scale: 0, ease: "sine"});

                document.getElementById("stat-manual").style.display = "block";

            }else if (this.id == "equipmentItem0") {
                gsap.from("#controls", {duration: .2, opacity: 0.0, ease: "sine"});

                document.getElementById("controls").style.backgroundColor = "orange";
            }else if (this.id == "equipmentItem2") {

            }

            console.log('entering for loop')
            var allocated = 0;
            for (var i = 0; i < totalCredits; i++) {// see if last credit is unallocated. if unallocated, allocate it.
                console.log(creditGraphic)
                console.log(i)
                console.log(creditGraphic[i] + "|"+ remainingCredits)
                if (creditGraphic[i] == 0 && remainingCredits > 0 && allocated == 0) {
                    console.log("Allocating credit")
                    remainingCredits--;
                    creditGraphic[i] = 1;
                    allocated = 1;




                }

                if (creditGraphic[i] == 1) {
                    document.getElementById("creditCircle" + i).classList.remove("unallocated");
                } else {
                    document.getElementById("creditCircle" + i).classList.add("unallocated");
                }

            }




            // Add the "selected" class
        } else if(this.dataset.val == '1') {
            this.dataset.val = '0';
            this.classList.remove("selected"); // Remove the "selected" class
            // document.getElementById("remainingCredits").innerHTML = remainingCredits;
            document.getElementById("creditCircle0").classList.add("unallocated");


            
            if (this.id == "equipmentItem3") {//If watch equipped, show timer
                document.getElementById("stat-watch").style.display = "block";

                document.getElementById("stat-watch").style.display = "none";

            } else if (this.id == "equipmentItem1") {//If binoculars equipped, show animal detector
                gsap.from("#deerAlert", {duration: .2, opacity: 0.0,scale: 0, ease: "sine"});

                document.getElementById("deerAlert").style.visibility = "hidden";
                document.getElementById("deerAlert").innerHTML = "looking...";

            }else if (this.id == "equipmentItem4") {//If Hunters Manual equipped, show rules and safety
                gsap.from("#stat-manual", {duration: .2, opacity: 0.0,scale: 0, ease: "sine"});

                document.getElementById("stat-manual").style.display = "none";

            }else if (this.id == "equipmentItem0") {
                gsap.from("#controls", {duration: .2, opacity: 0.0, ease: "sine"});
                unethicalActions++;//taking off your orange  clothing mid hunt is unethical, wait until you are within a safe area, like near a vehicle significant landmark

                document.getElementById("controls").style.backgroundColor = "black";
            }else if (this.id == "equipmentItem2") {

            }















            console.log('entering for loop')
            var refunded = 0;
            for (var i = 0; i < totalCredits; i++) {// see if last credit is unallocated. if unallocated, allocate it.
                console.log(creditGraphic)
                console.log(i)
                console.log(creditGraphic[i] + "|"+ remainingCredits + "|" + (totalCredits - i))

                if (creditGraphic[i] == 1 && refunded == 0) {
                    console.log("Refunding credit")
                    remainingCredits++;
                    creditGraphic[i] = 0;
                    refunded = 1;
                }

                if (creditGraphic[i] == 0) {
                    document.getElementById("creditCircle" + i).classList.add("unallocated");
                } else {
                    document.getElementById("creditCircle" + i).classList.remove("unallocated");
                }
                // document.getElementById("remainingCredits").innerHTML = remainingCredits;

            }


        }
        console.log(this)
        // selectOption(this.value, this.classList,);
    });

}


function checkPoints() {//check if any points remaining
    if (remainingCredits > 0) {
        console.error("No points remaining! Free some up to select something different.")
    }
    return remainingCredits > 0;
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

function huntingTimer() {    //Lol this is suboptimal programming here
    timer = setInterval(function() {
        secondsPassed++;
        document.getElementById("timeAlert").innerHTML = secondsPassed + "m passed.";
    
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
        document.getElementById("current-time").innerHTML = "Day Length: "+ (tbl + tal + legalTime) + " minutes";
        document.getElementById("legal-hunting-start").innerHTML = "Legal Hunting Starts: "+ (tbl) + " minutes";

        //insert (if clock equipped) here
    
        
                                //Deer encounters
         if (secondsPassed == tbl) {
            console.log("Legal hunting time begins!")
            document.getElementById("timeAlert").style.backgroundColor = "limegreen";
            document.getElementById("timeAlert").style.backgroundColor = "black";

        } else if (secondsPassed == tbl + legalTime) {
            document.getElementById("timeAlert").style.backgroundColor = "black";
            document.getElementById("timeAlert").style.backgroundColor = "white";

            console.log("Legal hunting time ends!")
        } else if (secondsPassed == tbl + legalTime + tal) {
            console.log("Game over! And, you survived!")
            document.getElementById("encounterGraphic").innerHTML = "Hunt finished! <br> You finished with " + (points + 2) + " points!<br> <button id='restart'></button>";//shows active hunt
            document.getElementById("game-display").style.backgroundColor = "black";



            clearInterval(timer);
        }
                                //Deer encounters
        for (x = 0; x < encounterList.length; x++) {
            if (secondsPassed == encounterTime[x]) {
                console.log(encounterTypes[encounterList[x]] + " appears!")

            
                // document.getElementById("deerAlert").innerHTML = encounterList[x];

                encounterVisibleStatus[x] = 1;
                console.log(encounterVisibleStatus)

                gsap.from("#deerAlert", {duration: .2, opacity: 0.0,scale: 1, ease: "sine"});
                document.getElementById("deerAlert").style.backgroundColor = "red";
                gsap.from("#encounterGraphic", {duration: .2, opacity: 0.0,scale: 1, ease: "sine"});

                document.getElementById("encounterGraphic").classList.add("visible");
    
                
            }else if (secondsPassed >= (encounterTime[x]) && secondsPassed <= (encounterTime[x] + encounterHangtime[x] + 1)) {
                console.log(encounterList[x] + " visible!")
                console.log(document.getElementById("equipmentItem1").dataset.val == 1)
                if (document.getElementById("equipmentItem1").dataset.val == 1) {//If binoculars equipped, identify animal
                    if (encounterList[x] == 0) {//If buck, rapidly tell user
                        document.getElementById("deerAlert").style.backgroundColor = "limegreen";
                    } else if (encounterList[x] == 1) {//If doe, tell user

                        document.getElementById("deerAlert").style.backgroundColor = "orange";

                    } else if (encounterList[x] == 2) {//If human, tell user
                    
                        document.getElementById("deerAlert").style.backgroundColor = "red";
                    }
                    console.log(encounterTypes[x].toUpperCase() + " identified!")
                    console.log(encounterTypes[encounterList[x]]);
                    document.getElementById("deerAlert").innerHTML = encounterTypes[encounterList[x]].toUpperCase();
                
                }

                // console.log("Is the encounter human?" + "|"+encounterList[x])
                // console.log("Are you wearing orange?" + "|"+document.getElementById("equipmentItem0").dataset.val)
                if (encounterList[x] == 2 && document.getElementById("equipmentItem0").dataset.val == 1) {//this could be better written.
                    console.log("Human saw you because you were wearing orange!")

                    


                } else if (encounterList[x] == 2 && document.getElementById("equipmentItem0").dataset.val == 0) {
                    console.log("Human didn't see you because you were not wearing orange!")
                    console.log("You've been shot! <br> You should have been wearing orange clothing. <br><br> <button id='restart'></button>")
                    clearInterval(timer)
                    unethicalActions++;//taking off your orange  clothing mid hunt is unethical, wait until you are within a safe area, like near a vehicle significant landmark

                    gsap.from("#game", {duration: .2, scale: 1, ease: "sine"});
                    gsap.from("#game-display", {duration: .2, opacity: 0.0,scale: 1, ease: "sine"});
                    gsap.from("#encounterGraphic", {duration: .2, opacity: 0.0,scale: 1, ease: "sine"});

                    document.getElementById("game").style.backgroundColor = "red";
                    document.getElementById("game-display").style.backgroundColor = "red";
                    document.getElementById("encounterGraphic").innerHTML = "You've been shot! <br> You should have been wearing orange clothing. <br><br> <button id='restart'></button>"

                }


                // console.log(encounterList[x] + " fled!")
                document.getElementById("encounter" + x).innerHTML = encounterTypes[encounterList[x]] + " fled."
                encounterVisibleStatus[x] = 0;

                // document.getElementById("deerdetector").style.backgroundColor = "rgb(88, 19, 19)";
                document.getElementById("encounterGraphic").classList.remove("visible");
            } else if (secondsPassed > (encounterTime[x] + encounterHangtime[x] + 1)) {
                document.getElementById("deerAlert").style.backgroundColor = "black";
                document.getElementById("deerAlert").innerHTML = "looking...";


            }
        }

                                //Safety bonus
        if (safety_state == 0) {
            points = points + 2;
    
        } else if(safety_state == 1) {
            points = points - 3;
        }
        document.getElementById("points").innerHTML = points; 
    
        
        
        updateStats();

    }, timeSpeed);
}


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



        var encHangtime = Math.round(Math.random() * 4 + 1);
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
        encounterVisibleStatus.push(0);
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


var timerInterval;
startTimer()
function startTimer() {
    timerInterval = setInterval(function() {
        totalSeconds++;
        console.log(totalSeconds)
        updateStats();

    }, timeSpeed);
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

document.getElementById("toggle-timer").addEventListener("click", function() {
    if (timerInterval) {
        console.log("pause")
        pauseTimer();
    } else {
        console.log("start")

        startTimer();
    }
});


function updateStats() {


    gsap.from("#inventoryTime", {duration: 1, scale: 0, ease: "bounce"});

    document.getElementById("bucksShot").innerHTML = bucksShot;
    document.getElementById("doesShot").innerHTML = doesShot;
    document.getElementById("humansShot").innerHTML = humansShot;
    document.getElementById("inventoryTime").innerHTML = totalSeconds;
    document.getElementById("misses").innerHTML = misses;
    document.getElementById("unethicalActions").innerHTML = unethicalActions;



    
}


