import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL:"https://we-are-the-champions-9a3cd-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsListInDB = ref(database, "endorsementsList")

const inputFieldEl = document.getElementById("input-field")
const fromEl = document.getElementById("from-el")
const toEl = document.getElementById("to-el")
const publishButtonEl = document.getElementById("publish-el")
const endorsementsListEl = document.getElementById("endorsements-list")


publishButtonEl.addEventListener("click", function() {
    let endorsementField = inputFieldEl.value
    let fromField = fromEl.value
    let toField = toEl.value

    const entry = {
        "Endorsement": endorsementField,
        "From": fromField,
        "To": toField
    }
    
    const json = JSON.stringify(entry)

    push(endorsementsListInDB, json)
    .then(() => {
        console.log("Entry added to the database!");
    })
    .catch((error) => {
        console.error("Error adding entry: ", error);
    });
    
    clearInputFieldEl()
})

onValue(endorsementsListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearEndorsementsListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToEndorsementsListEl(currentItem)
        }    
    } else {
        endorsementsListEl.innerHTML = ""
    }
})

function clearEndorsementsListEl() {
    endorsementsListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
    fromEl.value = ""
    toEl.value = ""
}

// Your Firebase and initialization code remain unchanged...

// Rest of your existing code...

function appendItemToEndorsementsListEl(item) {
    let itemID = item[0];
    let itemValue = JSON.parse(item[1]);

    let newEl = document.createElement("li");

    let toField = "To " + itemValue.To;
    let endorsementField = itemValue.Endorsement;
    let fromField = "From " + itemValue.From;

    // Wrapping the fields in spans for styling
    let toSpan = document.createElement("span");
    let endorsementSpan = document.createElement("span");
    let fromSpan = document.createElement("span");

    toSpan.innerHTML = toField + "<br>";
    endorsementSpan.innerHTML = endorsementField + "<br>";
    fromSpan.innerHTML = fromField + "<br>";

    // Applying different font sizes using CSS classes
    toSpan.classList.add("to-field");
    endorsementSpan.classList.add("endorsement-field");
    fromSpan.classList.add("from-field");

    // Appending spans to the new list item
    newEl.appendChild(toSpan);
    newEl.appendChild(endorsementSpan);
    newEl.appendChild(fromSpan);

    endorsementsListEl.appendChild(newEl);
}



