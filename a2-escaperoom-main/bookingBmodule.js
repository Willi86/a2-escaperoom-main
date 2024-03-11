import { default as requestPOST, } from './bookingCmodule.js';

/////Create modalSection2\\\\\

//get available slots
export default async function bookingSlots(challengeDataTitle, challengeDataId, challengeDataMinParticipants, challengeDataMaxParticipants, inputDate) {

    //create url with params
    const url = `https://lernia-sjj-assignments.vercel.app/api/booking/available-times?date=${inputDate.value}&challenge=${challengeDataId}`;

    const response = await fetch(url);
    const obj = await response.json();

    //to show second modal
    modalSection2(challengeDataTitle, challengeDataId, challengeDataMinParticipants, challengeDataMaxParticipants, inputDate, obj);
}

//add secondModal to body
function modalSection2(challengeDataTitle, challengeDataId, challengeDataMinParticipants, challengeDataMaxParticipants, inputDate, obj) {
    const secondModal = createSecondModal(challengeDataTitle, challengeDataId, challengeDataMinParticipants, challengeDataMaxParticipants, inputDate, obj);
    secondModal.style.display = "block";
    const body = document.querySelector("body").appendChild(secondModal);
}

//create secondModal
function createSecondModal(challengeDataTitle, challengeDataId, challengeDataMinParticipants, challengeDataMaxParticipants, inputDate, obj) {

    const secondModal = document.createElement("form");
    secondModal.setAttribute("class", "modal2");
    secondModal.addEventListener("submit", (event) => {
        event.preventDefault();
    });

    const headline = document.createElement("h2");
    headline.setAttribute("class", "modal2__headline");
    headline.textContent = `Book room "${challengeDataTitle}" (step 2)`;

    const inputLabel1 = document.createElement("label");
    inputLabel1.setAttribute("class", "modal2__inputLabel1");
    inputLabel1.setAttribute("for", "userName");
    inputLabel1.textContent = "Name";

    const inputName = document.createElement("input");
    inputName.setAttribute("class", "modal2__inputName");
    inputName.setAttribute("type", "text");
    inputName.setAttribute("name", "userName");
    inputName.setAttribute("data-cy", "user-name");
    inputName.setAttribute("required", "");

    const inputLabel2 = document.createElement("label");
    inputLabel2.setAttribute("class", "modal2__inputLabel2");
    inputLabel2.setAttribute("for", "email");
    inputLabel2.textContent = "E-mail";

    const inputEmail = document.createElement("input");
    inputEmail.setAttribute("class", "modal2__inputEmail");
    inputEmail.setAttribute("type", "email");
    inputEmail.setAttribute("name", "email");
    inputEmail.setAttribute("data-cy", "e-mail");
    inputEmail.setAttribute("required", "");

    //Phone number
    const inputLabel3 = document.createElement("label");
    inputLabel3.setAttribute("class", "modal2__inputLabel3");
    inputLabel3.setAttribute("for", "phoneNr");
    inputLabel3.textContent = "Phone Number";

    const inputPhoneNr = document.createElement("input");
    inputPhoneNr.setAttribute("class", "modal2__inputPhoneNr");
    inputPhoneNr.setAttribute("type", "tel");
    inputPhoneNr.setAttribute("name", "phoneNr");
    //inputPhoneNr.setAttribute("pattern", "[0-9]{3}-[0-9]{3}-[0-9]{4}");
    inputPhoneNr.setAttribute("placeholder", "070-123-4567");
    inputPhoneNr.setAttribute("data-cy", "phone-nr");
    //inputPhoneNr.setAttribute("required", "");

    const slotLabel = document.createElement("label");
    slotLabel.setAttribute("class", "modal2__slotLabel");
    slotLabel.setAttribute("for", "slots");
    slotLabel.textContent = "What time?";

    const selectSlot = document.createElement("select");
    selectSlot.setAttribute("class", "modal2__selectSlot");
    selectSlot.setAttribute("type", "time");
    selectSlot.setAttribute("name", "slots");
    selectSlot.setAttribute("data-cy", "time-slots");
    selectSlot.setAttribute("required", "");

    const slotStart = document.createElement("option");
    slotStart.setAttribute("class", "modal2__selectSlot--slotTime");
    slotStart.innerText = "-Choose a time-";
    selectSlot.appendChild(slotStart);

    for (let i = 0; i < obj.slots.length; i++) {
        const slot = document.createElement("option");
        slot.setAttribute("class", "modal2__selectSlot--slotTime");
        slot.setAttribute("value", [i]);
        slot.innerText = `${obj.slots[i]}`;
        selectSlot.appendChild(slot);
    }

    const playersLabel = document.createElement("label");
    playersLabel.setAttribute("class", "modal2__playersLabel");
    playersLabel.setAttribute("for", "participants");
    playersLabel.textContent = "How many participants?";

    const selectPlayers = document.createElement("select");
    selectPlayers.setAttribute("class", "modal2__selectPlayer");
    selectPlayers.setAttribute("type", "number");
    selectPlayers.setAttribute("name", "participants");
    selectPlayers.setAttribute("data-cy", "numb-participants");
    selectPlayers.setAttribute("required", "");

    const playersStart = document.createElement("option");
    playersStart.setAttribute("class", "modal2__selectPlayer");
    playersStart.innerText = "-Choose participants-";
    selectPlayers.appendChild(playersStart);

    for (let i = 0; i < ((challengeDataMaxParticipants - challengeDataMinParticipants) + 1); i++) {
        const players = document.createElement("option");
        players.setAttribute("class", "modal2__selectPlayer--players");
        players.setAttribute("min", `"${challengeDataMinParticipants}"`);
        players.setAttribute("max", `"${challengeDataMaxParticipants}"`);
        players.innerText = `${challengeDataMinParticipants + i} participants`;
        selectPlayers.append(players);
    }

    const submitBtn = document.createElement("button");
    submitBtn.setAttribute("class", "modal2__submitBtn--booking");
    submitBtn.setAttribute("type", "submit");
    submitBtn.textContent = "Submit booking";
    //to Post request for submit booking & later show third modal
    submitBtn.addEventListener("click", requestPOST.bind(this, challengeDataId, inputDate, inputName, inputEmail, selectSlot, selectPlayers));

    secondModal.append(headline, inputLabel1, inputName, inputLabel2, inputEmail, inputLabel3, inputPhoneNr, slotLabel, selectSlot, playersLabel, selectPlayers, submitBtn);

    return secondModal;
}