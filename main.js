// ==UserScript==
// @name         My Tampermonkey Script
// @namespace    https://fmovies.wtf/*
// @match        https://fmovies.wtf/*
// @author       Justin Slocum
// @version      1.0
// @description  In loving memory of Soap.
// @icon         https://www.google.com/s2/favicons?domain=google.com
// @require      https://code.jquery.com/jquery-2.1.4.min.js
// @require      E:\Code\TamperMonkey\fMovies\js\startup.js
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @resource     IMPORTED_CSS https://raw.githubusercontent.com/Smodoopa/SteamingEnhance/main/style.css
// ==/UserScript==

(function () {
    const my_css = GM_getResourceText("IMPORTED_CSS");
    GM_addStyle(my_css);

    setTimeout(() => {
        startUp();
    }, 5000);
    
})();



function startUp() {
    console.log("SteamEnhance activated.");
    $('.btn-watchnow').click();

    setTimeout(() => {
        window.scrollTo(0, 0);
        $('.jw-icon-fullscreen').click();
    }, 3000);
}