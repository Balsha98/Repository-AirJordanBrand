"use strict";

// ***** DOM ELEMENTS ***** //
const pageHeader = document.querySelector(".page-header");
const pageNavContainer = document.querySelector(".div-page-nav-container");
const getStartedBtn = document.querySelector(".btn-get-started");
const contentSections = document.querySelectorAll(".section");
const galleryImages = document.querySelectorAll(".gallery-image");
const selectContainer = document.querySelector(".div-select-container");
const toTopBtn = document.querySelector(".div-btn-container");

// ***** VARIABLES ***** //
let currBox;
const currKey = [];
const userChoices = [];
const selectBoxes = [];
const boxTopics = ["shoe", "gender", "color", "size", "depth"];

// ***** OBSERVERS ***** //
// Page navigation observer.
const navObserver = new IntersectionObserver(
    function (entry) {
        const { isIntersecting } = entry[0];

        if (isIntersecting) {
            pageNavContainer.classList.remove("fixed-nav-container");
            toTopBtn.classList.add("y-appear");
            return;
        }

        pageNavContainer.classList.add("fixed-nav-container");
        toTopBtn.classList.remove("y-appear");
    },
    { root: null, threshold: 0 }
);

navObserver.observe(pageHeader);

// Content sections observer.
const secObserver = new IntersectionObserver(
    function (entry, observer) {
        const { target, isIntersecting } = entry[0];

        if (isIntersecting) {
            target.classList.remove("fade-in");
            observer.unobserve(target);
        }
    },
    { root: null, threshold: 0.1 }
);

contentSections.forEach((section) => {
    section.classList.add("fade-in");
    secObserver.observe(section);
});

// Gallery images observer.
const imageObserver = new IntersectionObserver(
    function (entry, observer) {
        const { target, isIntersecting } = entry[0];

        if (isIntersecting) {
            target.classList.remove("image-blur");
            observer.unobserve(target);
        }
    },
    { root: null, threshold: 1 }
);

galleryImages.forEach((img) => {
    img.classList.add("image-blur");
    imageObserver.observe(img);
});

// ***** FUNCTIONS ***** //
const createParagraph = function (question) {
    const pTag = document.createElement("p");
    pTag.classList.add("text-question-confirmation");

    const pTxt = document.createTextNode(question);
    pTag.appendChild(pTxt);

    return pTag;
};

const createSelectBox = function (options) {
    const selectBox = document.createElement("select");
    selectBox.setAttribute("class", "new-select-box");
    selectBox.setAttribute("onchange", "switchBox();");

    for (let i = 0; i < options.length; i++) {
        const option = document.createElement("option");
        option.setAttribute("value", `${i}${options[i]}`);
        const optTxt = document.createTextNode(options[i]);
        option.appendChild(optTxt);
        selectBox.appendChild(option);
    }

    return selectBox;
};

const createAnchor = function () {
    const anchorTag = document.createElement("a");
    anchorTag.setAttribute("href", "cart.html");
    anchorTag.setAttribute("onclick", "saveShoeInfo();");
    anchorTag.classList.add("btn-confirm-selection");

    const btnTxt = document.createTextNode("Confirm");
    anchorTag.appendChild(btnTxt);

    return anchorTag;
};

const checkNumBoxes = function (sBoxes, bTopics) {
    if (sBoxes.length > bTopics.length) return true;
    else if (sBoxes.length === bTopics.length) {
        const finalQuestion = "Are you sure about your choices?";
        selectContainer.appendChild(createParagraph(finalQuestion));
        selectContainer.appendChild(createAnchor());
        return true;
    }
};

const removeBox = function (sBox) {
    let nextChild = sBox.nextSibling;

    while (nextChild) {
        if (nextChild.classList.contains("new-select-box")) selectBoxes.pop();

        if (!nextChild.classList.contains("text-question-confirmation")) {
            userChoices.pop();
            currKey.pop();
        }

        nextChild.remove();
        nextChild = sBox.nextSibling;
    }
};

const switchBox = function () {
    if (currBox.nextSibling) removeBox(currBox);

    const parsedValue = parseInt(currBox.value);

    // Guard condition.
    if (parsedValue === 0) return;

    userChoices.push(currBox.value.slice(1));
    currKey.push(parsedValue);

    // Guard condition.
    if (checkNumBoxes(selectBoxes, boxTopics)) return;

    const optionKey = currKey.join("");
    const { question, options } = possibleOptions[optionKey];
    const newQuestion = createParagraph(question);
    const newBox = createSelectBox(options);

    selectContainer.appendChild(newQuestion);
    selectBoxes.push(selectContainer.appendChild(newBox));
};

const saveShoeInfo = function () {
    for (let i = 0; i < boxTopics.length; i++) {
        createCookie(boxTopics[i], userChoices[i]);
    }

    const { img } = possibleOptions[currKey.join("")];
    createCookie("img", img);
};

// ***** EVENT LISTENERS ***** //
getStartedBtn.addEventListener("click", function () {
    const { question, options } = possibleOptions["0"];
    selectContainer.appendChild(createParagraph(question));
    selectBoxes.push(selectContainer.appendChild(createSelectBox(options)));

    selectContainer.classList.remove("hide-element");
    this.classList.add("hide-element");
});

selectContainer.addEventListener("click", function (event) {
    const selectBox = event.target;
    if (selectBox.classList.contains("new-select-box")) currBox = selectBox;
});
