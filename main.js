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
    var newUserAgent = prompt("SilentSpoofer v1.2\nEnter a userAgent:")
    Object.defineProperty(navigator, 'userAgent', {
        get: function() {
            return newUserAgent;
        },
        configurable: true
    });
})();
