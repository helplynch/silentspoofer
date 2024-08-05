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
    var newUserAgent = "Mozilla/5.0 (Linux; Android 13; SM-S901B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36";
    var newPlatform = "Linux armv8l";
    var newVendor = "SilentSpoofer Inc."; 
    var newAppVersion = "5.0 (Linux; Android 13; SM-S901B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36";
    var newAppName = "Netscape";

    function overrideProperty(property, value) {
        Object.defineProperty(navigator, property, {
            get: function() {
                return value;
            },
            configurable: true
        });
    }

    overrideProperty('userAgent', newUserAgent);
    overrideProperty('platform', newPlatform);
    overrideProperty('vendor', newVendor);
    overrideProperty('appVersion', newAppVersion);
    overrideProperty('appName', newAppName);

    var originalGetUserAgent = navigator.userAgent;
    navigator.__defineGetter__('userAgent', function(){
        return newUserAgent;
    });

    var originalGetAppVersion = navigator.appVersion;
    navigator.__defineGetter__('appVersion', function(){
        return newAppVersion;
    });

    if (window.XMLHttpRequest) {
        var originalOpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
            this.setRequestHeader("User-Agent", newUserAgent);
            originalOpen.apply(this, arguments);
        };
    }

    if (window.fetch) {
        var originalFetch = window.fetch;
        window.fetch = function(input, init) {
            if (init && init.headers) {
                init.headers['User-Agent'] = newUserAgent;
            } else if (typeof input === 'string') {
                init = {
                    headers: {
                        'User-Agent': newUserAgent
                    }
                };
            } else if (input instanceof Request) {
                input.headers.set('User-Agent', newUserAgent);
            }
            return originalFetch(input, init);
        };
    }
})();

