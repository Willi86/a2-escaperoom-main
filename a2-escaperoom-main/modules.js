import { default as modalSection1 } from './bookingAmodule.js';

function shortenText(text) {
    const maxCharacters = 50;
    if (text.length < maxCharacters) {
        return text;
    }
    // Find the last instance of a white space within the character limit
    const lastWhiteSpace = text.lastIndexOf(' ', maxCharacters);
    return text.slice(0, lastWhiteSpace) + "...";
}

function createChallengeBox(challengeData) {
    const challengeBox = document.createElement('div');
    challengeBox.classList.add('main__sliderBox');

    challengeBox.style.animation = 'openUp 0.5s'

    const cardHero = document.createElement('img');
    cardHero.src = challengeData.image;
    cardHero.classList.add('main__sliderBox--img');
    challengeBox.appendChild(cardHero);

    const challengeType = document.createElement('img');
    challengeType.classList.add('main__sliderBox--type');
    if (challengeData.type === 'online') {
        challengeType.src = 'images/computer.png';
    } else if (challengeData.type === 'onsite') {
        challengeType.src = 'images/house.png';
    }
    challengeBox.appendChild(challengeType);

    const title = document.createElement('p');
    title.classList.add('title');
    title.textContent = challengeData.title;
    challengeBox.appendChild(title);

    const info = document.createElement('div');
    info.classList.add('main__sliderBox--info');
    info.setAttribute("aria-valuenow", `${challengeData.rating}`);
    challengeBox.appendChild(info);

    for (let i = 0; i < 5; i++) {
        const stars = document.createElement('img');
        stars.src = i < challengeData.rating ? 'images/full_star.png' : 'images/emtpy_star.png';
        stars.classList.add('main__sliderBox--stars');
        info.appendChild(stars);
    }

    const participants = document.createElement('small');
    participants.classList.add('main__sliderBox--participants');
    participants.textContent = `${challengeData.minParticipants}-${challengeData.maxParticipants} participants ${challengeData.type === 'online' ? "(networked)" : ""}`
    info.appendChild(participants);

    const contentDescription = document.createElement('p');
    contentDescription.textContent = shortenText(challengeData.description);
    challengeBox.appendChild(contentDescription);

    const btn = document.createElement('button');
    if (challengeData.type === 'online') {
        btn.classList.add('main__sliderBox--button');
        btn.textContent = 'Take challenge online';
    } else if (challengeData.type === 'onsite') {
        btn.classList.add('main__sliderBox--button');
        btn.textContent = 'Book this room';
    }
    btn.classList.add('red');

    //to show first modal
    btn.addEventListener("click", modalSection1.bind(this, challengeData.title, challengeData.id, challengeData.minParticipants, challengeData.maxParticipants));

    challengeBox.appendChild(btn);

    return challengeBox;
}


///// FUNKTIONS \\\

function runOpenMenu() {
    document.querySelector("html").style.overflow = "hidden"
    runOpenAndClose("flex");

}

function runCloseMenu() {
    runOpenAndClose("none");
    document.querySelector("html").style.removeProperty("overflow");
}

function runOpenAndClose(property) {
    document.querySelector(".nav__mobile--bg").style.display = property;
    document.querySelector(".nav__mobile--menu").style.display = property;

}


function apiErrorMsg(printToCSS) {
    const printSection = document.querySelector(printToCSS);
    const noHit = document.createElement("p");
    const textNode = document.createTextNode("Seems to be a problem, please try again later");
    noHit.classList.add("nochallange")
    noHit.appendChild(textNode);
    printSection.appendChild(noHit)
}


export { apiErrorMsg, createChallengeBox, runOpenMenu, runCloseMenu, runOpenAndClose }