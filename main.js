// ==UserScript==
// @name         My Tampermonkey Script
// @namespace    https://fmovies.wtf/*
// @match        https://fmovies.wtf/*
// @author       Justin Slocum
// @version      1.0
// @description  In loving memory of Soap.
// @icon         https://www.google.com/s2/favicons?domain=google.com
// @require      https://code.jquery.com/jquery-2.1.4.min.js
// @require      https://raw.githubusercontent.com/Smodoopa/SteamingEnhance/main/js/startup.js
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @resource     IMPORTED_CSS https://raw.githubusercontent.com/Smodoopa/SteamingEnhance/main/style.css
// ==/UserScript==

(function () {
    const my_css = GM_getResourceText("IMPORTED_CSS");
    GM_addStyle(my_css);

    setTimeout(() => {
        startUp();
    }, 3000);
})();