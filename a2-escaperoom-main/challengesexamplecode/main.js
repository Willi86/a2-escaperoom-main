const challengesArea = document.querySelector(".challenges");
const testButton = document.querySelector(".testBtn");

async function testLoadFromApi() {
    const response = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges');
    const data = await response.json();
    /*data.challenges.forEach(challenge => {
        console.log(challenge.title)
    });*/

    //Build challenge cards
    for (let i = 0; i < data.challenges.length; i++) {
        const challenge = data.challenges[i];

        //To be deleted when finished working with code:
        //Print every challenge as an array to console for testing
        //& getting names & inspection of each challenge. 
        console.log(Object.values(challenge));

        //create a Challenge card & add it to section challengeArea
        let challengeCard = document.createElement("article");
        challengeCard.setAttribute("class", "challenge");
        challengesArea.appendChild(challengeCard);

        //Get image & add it to Challenge card
        let cardImage = document.createElement("img");
        cardImage.setAttribute("class", "challenge__img");
        cardImage.src = challenge.image;
        challengeCard.appendChild(cardImage);

        //Create icon and add it to card Image
        let cardIcon = document.createElement("img");
        cardIcon.setAttribute("class", "challenge__icon");
        if (challenge.type == "online") {
            cardIcon.src = "computer.png";
        } else {
            cardIcon.src = "house.png";
        }
        challengeCard.appendChild(cardIcon);

        //Get title & type & add it to Challenge card
        let cardTitleType = document.createElement("h3");
        cardTitleType.setAttribute("class", "challenge__titleType")
        if (challenge.type == "online") {
            cardTitleType.innerHTML = challenge.title;
        } else {
            cardTitleType.innerHTML = challenge.title + " (" + "on-site" + ")";
        }
        challengeCard.appendChild(cardTitleType);

        //Get number of participants & add it to Challenge card
        let cardParticipants = document.createElement("span");
        cardParticipants.setAttribute("class", "challenge__participants");
        if (challenge.type == "online") {
            cardParticipants.innerHTML = challenge.minParticipants + " participants (networked)";
        } else {
            cardParticipants.innerHTML = challenge.minParticipants + "-" + challenge.maxParticipants + " participants";
        }
        challengeCard.appendChild(cardParticipants);

        //Get description & add it to Challenge card
        let cardDescription = document.createElement("p");
        cardDescription.setAttribute("class", "challenge__description");
        cardDescription.innerHTML = challenge.description;
        challengeCard.appendChild(cardDescription);

        //Create a button and add it to Challenge card
        let cardButton = document.createElement("button");
        cardButton.setAttribute("class", "challenge__button");
        if (challenge.type == "online") {
            cardButton.textContent = "Take challenge online";
        } else {
            cardButton.textContent = "Book this room";
        }
        challengeCard.appendChild(cardButton);
    }
}

testButton.addEventListener("click", testLoadFromApi);



