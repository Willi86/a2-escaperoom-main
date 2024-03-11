import { default as bookingSlots } from './bookingBmodule.js';

/////Create modalSection1\\\\\\

//add firstModal to body
export default function modalSection1(challengeDataTitle, challengeDataId, challengeDataMinParticipants, challengeDataMaxParticipants) {
    const firstModal = createFirstModal(challengeDataTitle, challengeDataId, challengeDataMinParticipants, challengeDataMaxParticipants);
    firstModal.style.display = "block";
    const body = document.querySelector("body").appendChild(firstModal);
}

//create firstModal
function createFirstModal(challengeDataTitle, challengeDataId, challengeDataMinParticipants, challengeDataMaxParticipants) {
    const firstModal = document.createElement("form");
    firstModal.setAttribute("class", "modal1");
    firstModal.addEventListener("submit", (event) => {
        event.preventDefault();
    });

    const headline = document.createElement("h2");
    headline.setAttribute("class", "modal1__headline");
    headline.textContent = `Book room "${challengeDataTitle}" (step 1)`;

    const question = document.createElement("p");
    question.setAttribute("class", "modal1__question");
    question.textContent = "What date would you like to come?";

    const inputLabel = document.createElement("label");
    inputLabel.setAttribute("class", "modal1__inputLabel");
    inputLabel.setAttribute("for", "bookingDate");
    inputLabel.textContent = "Date";

    const inputDate = document.createElement("input");
    let dateToday = new Date().toJSON().slice(0, 10);
    inputDate.setAttribute("class", "modal1__inputDate");
    inputDate.setAttribute("type", "date");
    inputDate.setAttribute("min", dateToday);
    inputDate.setAttribute("placeholder", "YYYY-MM-DD");
    inputDate.setAttribute("name", "bookingDate");
    inputDate.setAttribute("data-cy", "booking-date");
    inputDate.setAttribute("required", "");

    const searchBtn = document.createElement("button");
    searchBtn.setAttribute("class", "modal1__searchBtn--booking");
    searchBtn.setAttribute("type", "submit");
    searchBtn.textContent = "Search available times";
    //to GET request for available slots & later show second modal
    searchBtn.addEventListener("click", bookingSlots.bind(this, challengeDataTitle, challengeDataId, challengeDataMinParticipants, challengeDataMaxParticipants, inputDate));

    firstModal.append(headline, question, inputLabel, inputDate, searchBtn);

    return firstModal;
}