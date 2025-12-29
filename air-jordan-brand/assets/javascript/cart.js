import { deleteCookie, getCookie } from "./cookie.js";

// ***** DOM ELEMENTS ***** //
const homeBtn = document.querySelector(".btn-home");
const cartContainerDiv = document.querySelector(".div-cart-content-container");
const cartContentHeading = document.querySelector(".cart-content-heading");
const confirmOrderBtn = document.querySelector(".btn-confirm-order");

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

    cartContentHeading.textContent = "Hope you enjoy your new shoes!";
    document.querySelectorAll(".span-shoe-data").forEach((span, i) => {
        span.textContent = getCookie(dataKeys[i]);
    });

    cartContainerDiv.after(generateImage(getCookie("img")));
    confirmOrderBtn.classList.remove("hide-element");
};

// ***** EVENT LISTENERS ***** //
document.body.onload = updateOrder;

confirmOrderBtn.addEventListener("click", function () {
    document.querySelector(".popup-confirmation").classList.remove("hide-element");
});

homeBtn.addEventListener("click", function () {
    const deletionKeys = [...dataKeys, "img"];
    deletionKeys.forEach((key) => {
        deleteCookie(key);
    });
});
