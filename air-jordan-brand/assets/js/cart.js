import { deleteCookie, getCookie } from "./cookie.js";

const singleObject = (idClass) => document.querySelector(idClass);
const multipleObjects = (idClass) => document.querySelectorAll(idClass);

const creationKeys = ["shoe", "gender", "color", "size", "depth"];

const bntHome = singleObject("#home_btn");
const btnConfirm = singleObject("#confirm_order");
btnConfirm.classList.add("hide_element");

const generateImage = function (imgSrc) {
    const newImage = document.createElement("img");
    newImage.setAttribute("src", imgSrc);
    newImage.setAttribute("alt", "Chosen Shoe");
    return newImage;
};

const updateOrder = function () {
    if (getCookie("img")) {
        singleObject("h2").textContent = "Hope you enjoy your new shoes!";

        multipleObjects(".shoe_info").forEach((span, i) => {
            span.textContent = getCookie(creationKeys[i]);
        });

        const imgCookie = getCookie("img");
        singleObject("#text_div").after(generateImage(imgCookie));

        btnConfirm.classList.remove("hide_element");
    }
};

// EVENT LISTENERS
document.body.onload = updateOrder;

btnConfirm.addEventListener("click", function () {
    singleObject(".window_overlay").classList.remove("hidden_window");
    singleObject(".confirmation_window").classList.remove("hidden_window");
});

bntHome.addEventListener("click", function () {
    const deletionKeys = [...creationKeys, "img"];
    deletionKeys.forEach((key) => {
        deleteCookie(key);
    });
});
