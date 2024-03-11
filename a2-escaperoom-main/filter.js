import { default as modalSection1 } from './bookingAmodule.js';
import { apiErrorMsg, createChallengeBox, runOpenMenu, runCloseMenu, runOpenAndClose } from './modules.js';
let online = true;
let onsite = true;
filterFromLink()
//Load API
// test för pre-commit
const fullApiJson = []
getApi()
    .then(data => data.challenges.forEach(challenge => fullApiJson.push(challenge)))
    .then(fetchAllTags)
    .then(printAllTags)
    .then(printAllChallenges)
    .then(grabAllTags)
    .catch(err => {
        console.log('errors: ' + err.message)
        apiErrorMsg('#testbox')
    })
    .then(loadingBar)

//Fetch Challange API
async function getApi() {
    if (fullApiJson.length == 0) {
        const url = 'https://lernia-sjj-assignments.vercel.app/api/challenges';
        const res = await fetch(url);
        const data = await res.json();
        return data
    } else
        console.log('Api alredy loaded')
}



//Query selectors
const filterMinAll = document.querySelectorAll(".cbMin");
const filterMin = document.querySelector(".filter__options--rating--min");
const filterMaxAll = document.querySelectorAll(".cbMax");
const filterMax = document.querySelector(".filter__options--rating--max");
const filterIncOnline = document.querySelector("#online");
const filterIncOnsite = document.querySelector("#on-site");
let filterTags = document.querySelectorAll(".tags");
const filterSearchBar = document.querySelector("#filter__input--bar");
const filterTagBox = document.querySelector(".filter__options--tags--collectionBox")
const testbox = document.querySelector('#testbox');
const filterButton = document.querySelector(".toFilter__bigButton");
const exitBtn = document.querySelector(".exitBtn");

//Selectors
const menuBg = document.querySelector(".nav__mobile--bg");
const mobileMenu = document.querySelector(".nav__mobile--menu");
const hamburgerButton = document.querySelector(".nav__mobile--openMenu");
const closeMobileMenu = document.querySelector(".nav__mobile--closeMenu");
const queryHtmlEle = document.querySelector("html");
const hamburgerMenuLinks = document.querySelectorAll(".hamburgerLink");
const filterAllLabels = document.querySelector('#AllLabels')
const filterSomeLabels = document.querySelector('#someLabels')

//Variables
let cbMinValue = filterMin.ariaValueNow;
let cbMaxValue = filterMax.ariaValueNow;
let allTagsArray = [];
let activeFilterTags = [];
let someOrAll = false;

//Eventlistener
filterSomeLabels.addEventListener('change', () => {
    document.querySelector('#AllLabels').checked = false;
    if (someOrAll == true) {
        someOrAll = false;
    }
    printAllChallenges()
});

filterAllLabels.addEventListener('change', () => {
    document.querySelector('#someLabels').checked = false;
    if (someOrAll == false) {
        someOrAll = true;
    }
    printAllChallenges()
});

filterSearchBar.addEventListener('keyup', () => {
    filterFunctionSearchBar()
});

filterIncOnline.addEventListener('change', () => {
    changeStatusFilterOnline()
});

filterIncOnsite.addEventListener('change', () => {
    changeStatusFilterOnsite()
})

filterButton.addEventListener('click', () => {
    document.querySelector(".filter").classList.toggle("hidden");
    document.querySelector(".toFilter__bigButton").classList.toggle("hidden");
    document.querySelector(".filter__title").scrollIntoView();
    
})
exitBtn.addEventListener('click', () => {
    document.querySelector(".filter").classList.toggle("hidden");
    document.querySelector(".toFilter__bigButton").classList.toggle("hidden");
})




//Change the min star rating filter and match the max value.
filterMinAll.forEach(cbMinSpan => {
    cbMinSpan.addEventListener('click', (event) => {
        // Bind star ID to variable
        let id = event.target.id
        let idValue = id.split('-');
        cbMinValue = idValue[1];
        //Change aria-valuenow to ID-variable
        filterMin.ariaValueNow = cbMinValue;

        //Check and change if min value is higher then max value
        if (cbMaxValue < cbMinValue) {
            cbMaxValue = cbMinValue
            filterMax.ariaValueNow = cbMinValue;
        }

        printAllChallenges()
    });
});

//Change the max star rating filter and match the min value.
filterMaxAll.forEach(cbMaxSpan => {
    cbMaxSpan.addEventListener('click', (event) => {
        // Bind star ID to variable
        let id = event.target.id
        let idValue = id.split('-');
        cbMaxValue = idValue[1]

        //Change aria-valuenow to ID-variable
        filterMax.ariaValueNow = cbMaxValue;

        //Check and change if max value is lower then min value.
        if (cbMaxValue < cbMinValue) {
            cbMinValue = cbMaxValue
            filterMin.ariaValueNow = cbMaxValue;
        }
        printAllChallenges()
    });
});

function filterFromLink() {
    var url_string = window.location.search.substring(1);
    if (url_string == 'online') {
        online = true
        onsite = false
        document.querySelector("#on-site").checked = false;

    } else if (url_string == 'onsite') {
        onsite = true;
        online = false;
        document.querySelector("#online").checked = false;
    }


}



function printAllTags() {
    const printSection = document.querySelector("#testbox");
    allTagsArray.forEach(tag => {
        const newDiv = document.createElement("div");
        const newPara = document.createElement("p");
        newPara.innerHTML = tag;
        newDiv.classList.add("tags");
        newDiv.appendChild(newPara);
        filterTagBox.appendChild(newDiv);
    });
}

function grabAllTags() {
    filterTags = document.querySelectorAll(".tags");
    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            tag.classList.toggle("active");
            if (activeFilterTags.includes(tag.innerText)) {
                activeFilterTags.splice(activeFilterTags.indexOf(tag.innerText), 1);
                printAllChallenges()
            } else
                activeFilterTags.push(tag.innerText)
            printAllChallenges()
        })
    });
}

function filterPlace(challenge) {
    let filterString = [];
    if (online && onsite) {
        filterString.push(((challenge.type.includes('online')) || (challenge.type.includes('onsite'))));
    } else if (onsite) {
        filterString.push((challenge.type.includes("onsite")));
    } else if (online) {
        filterString.push(challenge.type.includes("online"));
    }
    return filterString
}

function filterBuildLabels(challenge) {
    let filterArray = [];
    if (activeFilterTags.length > 0) {
        activeFilterTags.forEach(label => {
            filterArray.push(challenge.labels.includes(`${label}`))
        })
    }
    return filterArray
}

function printAllChallenges() {
    const printSection = document.querySelector("#testbox");
    printSection.innerHTML = " ";
    let didNotPrint = true
    try {
        if ((online && onsite) && (activeFilterTags.length == 0)) {
            fullApiJson.forEach(challenge => {
                if ((challenge.rating >= cbMinValue) && (challenge.rating <= cbMaxValue)) {
                    const challengeBox = createChallengeBox(challenge)
                    document.querySelector('#testbox').appendChild(challengeBox);
                    didNotPrint = false;
                }
            });
        } else
            if (someOrAll || activeFilterTags.length == 0) {
                fullApiJson.forEach(challenge => {
                    if (filterPlace(challenge).every(condition => condition == true) && filterBuildLabels(challenge).every(condition => condition == true) && (filterPlace(challenge).length != 0)) {
                        if ((challenge.rating >= cbMinValue) && (challenge.rating <= cbMaxValue)) {
                            const challengeBox = createChallengeBox(challenge)
                            document.querySelector('#testbox').appendChild(challengeBox);
                            didNotPrint = false
                        }
                    }
                });
            } else if (someOrAll == false && activeFilterTags.length != 0) {
                fullApiJson.forEach(challenge => {
                    if (filterPlace(challenge).every(condition => condition == true) && filterBuildLabels(challenge).some(condition => condition == true) && (filterPlace(challenge).length != 0)) {
                        if ((challenge.rating >= cbMinValue) && (challenge.rating <= cbMaxValue)) {
                            const challengeBox = createChallengeBox(challenge)
                            document.querySelector('#testbox').appendChild(challengeBox);
                            didNotPrint = false
                        }
                    }
                });

            }
    } catch (e) {
        console.log(e)
    }
    if (didNotPrint) {
        noMatchingSearch("#testbox");
    }
}

function noMatchingSearch(printToCSS) {
    const printSection = document.querySelector(printToCSS);
    const noHit = document.createElement("p");
    const textNode = document.createTextNode("No matching challanges");
    noHit.classList.add("nochallange")
    noHit.appendChild(textNode);
    printSection.appendChild(noHit)
}

function filterFunctionSearchBar() {
    const findThis = filterSearchBar.value.toLowerCase().split(" ");
    const hit = true;
    fullApiJson.forEach(challenge => {
        if (findThis[0] == '' || filterSearchBar.value.length <= 2) {
            testbox.innerHTML = ""
            printAllChallenges()
        }
        if (2 < filterSearchBar.value.length) {
            testbox.innerHTML = ""
            if (findThis.some(test => (test != "") && (challenge.title.toLowerCase().includes(test) || challenge.description.toLowerCase().includes(test)))) {
                const challengeBox = createChallengeBox(challenge)
                testbox.appendChild(challengeBox);
            };
            if (document.querySelectorAll(".main__sliderBox").length == 0) {
                noMatchingSearch("#testbox")
            }
        }
    })
};

//Adds all uniqe tags to an array.
async function fetchAllTags() {
    for (let i = 0; i < fullApiJson.length; i++) {
        const lable = fullApiJson[i].labels
        lable.forEach(lable => {
            if (!allTagsArray.includes(lable)) {
                allTagsArray.push(lable)
            }
        })
    }
}

//Toggle the bool of onsite filter.
function changeStatusFilterOnsite() {
    if (onsite == true) {
        onsite = false;
        printAllChallenges()

    } else onsite = true;
    printAllChallenges()
}

//Toggle the bool for online filter.
function changeStatusFilterOnline() {
    if (online == true) {
        online = false;
        printAllChallenges()

    } else online = true;
    printAllChallenges()
}


//Open and close mobile menu
hamburgerButton.addEventListener("click", runOpenMenu);
closeMobileMenu.addEventListener("click", runCloseMenu);
hamburgerMenuLinks.forEach(link => {
    link.addEventListener("click", runCloseMenu);
});

function loadingBar() {
    document.querySelector('.loading').classList.add('hidden')
}
