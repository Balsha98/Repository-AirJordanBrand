"use strict";

// TAG SELECTOR FUNCTIONS
const singleObject = (idClass) => document.querySelector(idClass);
const multipleObjects = (idClass) => document.querySelectorAll(idClass);

// NAV BAR VARIABLES
const navLinksDiv = singleObject("#nav_links_div");
const menuBar = singleObject("#menu_bar");
const closeBtn = singleObject("#close_btn");

// SELECT DIV VARIABLES
const getStarted = singleObject(".start_select");
const selectDiv = singleObject(".select_div");

// INTERSECTION OBSERVER (NAVIGATION)
const navElement = singleObject(".navigation");
const toTopBtn = singleObject(".div_to_top");
const navObserver = new IntersectionObserver(
    function (entry) {
        const { isIntersecting } = entry[0];

        if (isIntersecting) {
            navElement.classList.remove("fixed_nav");
            toTopBtn.classList.add("to_top_appear");
            return;
        }

        navElement.classList.add("fixed_nav");
        toTopBtn.classList.remove("to_top_appear");
    },
    { root: null, threshold: 0 }
);

const header = singleObject("header");
navObserver.observe(header);

// INTERSECTION OBSERVER (CONTENT SECTIONS)
const sectionElements = multipleObjects(".section");
const secObserver = new IntersectionObserver(
    function (entry, observer) {
        const { target, isIntersecting } = entry[0];

        if (isIntersecting) {
            target.classList.remove("section_fade_in");
            observer.unobserve(target);
        }
    },
    { root: null, threshold: 0.1 }
);

sectionElements.forEach((section) => {
    section.classList.add("section_fade_in");
    secObserver.observe(section);
});

// INTERSECTION OBSERVER (IMG LOADER)
const flexImages = multipleObjects(".flex_img");
const imageObserver = new IntersectionObserver(
    function (entry, observer) {
        const { target, isIntersecting } = entry[0];

        if (isIntersecting) {
            target.classList.remove("img_blur");
            observer.unobserve(target);
        }
    },
    { root: null, threshold: 1 }
);

flexImages.forEach((img) => {
    img.classList.add("img_blur");
    imageObserver.observe(img);
});

// SELECT BOX LOGIC
let currBox;
const currKey = [];
const userChoices = [];
const selectBoxes = [];
const boxTopics = ["shoe", "gender", "color", "size", "depth"];

// PARAGRAPH FACTORY METHOD
const createParagraph = function (question) {
    const pTag = document.createElement("p");
    pTag.setAttribute("class", "question");

    const pTxt = document.createTextNode(question);
    pTag.appendChild(pTxt);

    return pTag;
};

// SELECT BOX FACTORY METHOD
const createSelectBox = function (options) {
    const selectBox = document.createElement("select");
    selectBox.setAttribute("class", "select_box");
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

// ANCHOR FACTORY METHOD
const createAnchor = function () {
    const anchorTag = document.createElement("a");
    anchorTag.setAttribute("href", "cart.html");
    anchorTag.setAttribute("onclick", "saveShoeInfo();");
    anchorTag.classList.add("btn_confirm");

    const btnTxt = document.createTextNode("Confirm");
    anchorTag.appendChild(btnTxt);

    return anchorTag;
};

// CHECKING # OF SELECT BOXES
const checkNumBoxes = function (sBoxes, bTopics) {
    if (sBoxes.length > bTopics.length) {
        return true;
    } else if (sBoxes.length === bTopics.length) {
        const finalQuestion = "Are you sure about your choices?";
        selectDiv.appendChild(createParagraph(finalQuestion));
        selectDiv.appendChild(createAnchor());
        return true;
    }
};

// SELECT BOX REMOVAL METHOD
const removeBox = function (sBox) {
    let nextChild = sBox.nextSibling;

    while (nextChild) {
        if (nextChild.classList.contains("select_box")) {
            selectBoxes.pop();
        }

        if (!nextChild.classList.contains("question")) {
            userChoices.pop();
            currKey.pop();
        }

        nextChild.remove();
        nextChild = sBox.nextSibling;
    }
};

// SELECT BOX SWITCHING
const switchBox = function () {
    if (currBox.nextSibling) {
        removeBox(currBox);
    }

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

    selectDiv.appendChild(newQuestion);
    selectBoxes.push(selectDiv.appendChild(newBox));
};

// SHOE INFO COOKIE SAVING
const saveShoeInfo = function () {
    for (let i = 0; i < boxTopics.length; i++) {
        createCookie(boxTopics[i], userChoices[i]);
    }

    const { img } = possibleOptions[currKey.join("")];
    createCookie("img", img);
};

// EVENT LISTENERS
menuBar.addEventListener("click", function () {
    navLinksDiv.classList.remove("hide_nav_links_div");
});

navLinksDiv.addEventListener("click", function (event) {
    const navLink = event.target;

    if (navLink.classList.contains("nav_link")) {
        navLinksDiv.classList.add("hide_nav_links_div");
    }
});

getStarted.addEventListener("click", function () {
    const { question, options } = possibleOptions["0"];
    selectDiv.appendChild(createParagraph(question));
    selectBoxes.push(selectDiv.appendChild(createSelectBox(options)));

    selectDiv.classList.remove("hide_element");
    this.classList.add("hide_element");
});

selectDiv.addEventListener("click", function (event) {
    const selectBox = event.target;

    if (selectBox.classList.contains("select_box")) {
        currBox = selectBox;
    }
});
