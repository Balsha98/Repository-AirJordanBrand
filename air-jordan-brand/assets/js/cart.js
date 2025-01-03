import { deleteCookie, getCookie } from "./cookie.js";

// ***** DOM ELEMENTS ***** //
const homeBtn = document.querySelector(".btn-home");
const confirmOrderBtn = document.querySelector(".btn-confirm-order");
confirmOrderBtn.classList.add("hide-element");

// ***** VARIABLES ***** //
const dataKeys = ["shoe", "gender", "color", "size", "depth"];

// ***** FUNCTIONS ***** //
const generateImage = function (imgSrc) {
    const newImage = document.createElement("img");
    newImage.setAttribute("src", imgSrc);
    newImage.setAttribute("alt", "Chosen Shoe");
    newImage.classList.add("shoe-image");

    return newImage;
};

const updateOrder = function () {
    if (!getCookie("img")) return;

    document.querySelector("h2").textContent = "Hope you enjoy your new shoes!";
    document.querySelectorAll(".span-shoe-data").forEach((span, i) => {
        span.textContent = getCookie(dataKeys[i]);
    });

    const imgCookie = getCookie("img");
    document.querySelector("#text_div").after(generateImage(imgCookie));

    confirmOrderBtn.classList.remove("hide-element");
};

// ***** EVENT LISTENERS ***** //
document.body.onload = updateOrder;

confirmOrderBtn.addEventListener("click", function () {
    document.querySelector(".popup-confirmation").classList.remove("hide-element");
    document.querySelector(".blur-overlay").classList.remove("hide-element");
});

homeBtn.addEventListener("click", function () {
    const deletionKeys = [...dataKeys, "img"];
    deletionKeys.forEach((key) => {
        deleteCookie(key);
    });
});
