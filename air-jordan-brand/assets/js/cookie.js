"use strict";

const createCookie = function (key, value) {
    document.cookie = `${key}=${value};`;
};

const getCookie = function (cookieKey) {
    let cKey = `${cookieKey}=`;
    let cookies = document.cookie.split(";");

    for (let cookie of cookies) {
        if (cookie.includes(cKey)) {
            return cookie.trim().slice(cKey.length);
        }
    }
};

const deleteCookie = function (key) {
    document.cookie = `${key}=; expires=${new Date(0)};`;
};
