console.log("js connected")

const options = ["","Orange", "Binoculars", "Scope", "Watch", "Rounds", "Wearable Decoy"]
var equipment = [0,0,0,0,0,0]
var skills = [0,0,0,0,0]
var remainingPoints = 1;
var tbl;
var legalTime;
var tal;
var secondsPassed= 0;



//Default values
var deerSpawn = 6;
var dogSpawn = 3;
var humanSpawn = 1;


buildValues();
var equipment_item = document.getElementsByClassName("equipment_item");
var inputs = document.getElementsByTagName("input");
document.getElementById("remainingPoints").innerHTML = remainingPoints;






document.getElementById("toggle-timer").addEventListener("click", function(){


    console.log(this.value);
    if (Number(this.value) == 0) {

        console.log("Disabling stats..")
        this.value = 1;
        document.getElementById("personal-stats-information").classList.add("disabled");
        console.log("Enabling game..")
        setInterval(timer);
        document.getElementById("game-display").classList.remove("disabled");



    } else if (Number(this.value) == 1) {

        console.log("Enabling stats..")
        this.value = 0;
        document.getElementById("personal-stats-information").classList.remove("disabled");
        console.log("Disabling game..")
        clearInterval(timer);
        document.getElementById("game-display").classList.add("disabled");

    }
});


for(var i = 0; i < equipment_item.length; i++) {
    equipment_item[i].dataset.val = 0; // initialize data-val to 0
    equipment_item[i].addEventListener("click", function(){
        console.log(this.innerText)
        console.log(this.dataset.val)
        if (this.dataset.val == '0' && checkPoints() == true) {
            console.log(remainingPoints)
            this.dataset.val = '1';
            this.classList.add("selected");
            remainingPoints--;
            // Add the "selected" class
        } else if(this.dataset.val == '1') {
            this.dataset.val = '0';
            this.classList.remove("selected"); // Remove the "selected" class
            remainingPoints++;

        }
        console.log(this)
        // selectOption(this.value, this.classList,);
    });
}
// for (var i = 0; i < equipment.length; i++) {
//     inputs[i].value = 0; // initialize data-val to 0
//     inputs[i].addEventListener("input", function(){
//     });
// }




function checkPoints() {
    if (remainingPoints > 0) {
        console.error("No points remaining! Free some up to select something different.")
    }
    return remainingPoints > 0;
}

function selectOption(value, clss) {
    console.log(options[value])
    console.log(clss);
    if (clss == "equipment_item") {
        console.log(clss + " "+"is equipment_item")
    } else if (clss == "skill_item") {
        console.log(clss + " "+ "is skill_item")
    }

}

legalHuntingTimes();
var timer = setInterval(function() {
    secondsPassed++;
    console.log(secondsPassed+" "+ tbl + " "+legalTime+" "+tal+ " " + (tal+legalTime+tbl))
    var deerAppearance = 20;




//insert (if clock equipped) here


    if (secondsPassed == deerAppearance) {
        console.log("Deer appears!")
    } else if (secondsPassed == tbl) {
        console.log("Legal hunting time begins!")
    } else if (secondsPassed == tbl + legalTime) {
        console.log("Legal hunting time ends!")
    } else if (secondsPassed == tbl + legalTime + tal) {
        console.log("Game over!")
        clearInterval(timer);

    }
}, 1000
)




function buildValues() {


    legalHuntingTimes();

    makeAppearance();

}





function legalHuntingTimes() {
    tbl = Math.round(Math.random() * 30 + 10);
    legalTime = Math.round(Math.random() * 180 + 30);
    tal = Math.round(Math.random() * 30 + 10);
    console.log(tbl +  " before legal light")
    console.log(legalTime +  " seconds of legal light")
    console.log(tal +  " after legal light")
    console.log(tbl + legalTime + tal + " total hunting game length" )
    document.getElementById("legal-hunting-start").innerHTML = tbl + legalTime + tal + " seconds";
    // console.log(deerAppearance + " seconds until deer appears")



}




function makeAppearance() {
    var deerAppearance = Math.round(Math.random() * 50);

    console.log(deerSpawn + "|" +dogSpawn  + "|" + humanSpawn)

    




    if (deerAppearance < (tbl + legalTime + tal)) {
        var random = Math.round(Math.random() * 10);
        console.log(random)

        console.log((deerSpawn + dogSpawn) +"|" + (deerSpawn + dogSpawn + humanSpawn))

        if (random <= deerSpawn) {
            console.log("Deer appears!")
        } else if (deerSpawn < random  && random <= (deerSpawn + dogSpawn)) {
            console.log("Dog appears!")
        } else if ((deerSpawn + dogSpawn) < random && random <= (deerSpawn + dogSpawn + humanSpawn)) {
            console.log("Human appears!")
        }
        //make another appearance spawn
    }
    console.log(deerAppearance + " seconds until deer appears")

    }

