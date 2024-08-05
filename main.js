// ==UserScript==
// @name         SilentSpoofer for EasyAgent
// @namespace    https://staybrowser.com/
// @version      1.2
// @description  UserAgent spoofer working for EasyAgent
// @author       @smokethatzip
// @match        https://easyagent.glitch.me
// @grant        none
// ==/UserScript==
(function() {
    var newUserAgent = localStorage.getItem("ss-auto")
    if (newUserAgent) {
        console.log("Auto spoofed")
    } else {
        var x = prompt("SilentSpoofer v1.2\nEnter a userAgent:")
        localStorage.setItem("ss-auto", x)
        window.location.reload()
    }
    Object.defineProperty(navigator, 'userAgent', {
        get: function() {
            return newUserAgent;
        },
        configurable: true
    });
})();
