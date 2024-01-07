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
    let inputValue = inputFieldEl.value
    
    push(endorsementsListInDB, inputValue)
    
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
}

function appendItemToEndorsementsListEl(item) {
    

    let itemID = item[0]
    let itemValue = item[1]
    
    // bosluk girildigi zaman bos kutu eklememesi icin
    if (item[1].trim() === '') {
        console.error("Add to endorsement is failed: Empty Text");
        return;
    }

    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    endorsementsListEl.append(newEl)
}

