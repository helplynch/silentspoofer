// ==UserScript==
// @name         SilentSpoofer for UserAgents
// @namespace    https://staybrowser.com/
// @version      3
// @description  UserAgent spoofer working for EasyAgent
// @author       @smokethatzip
// @match        *
// @grant        none
// ==/UserScript==
(function() {
    var spoofedValue = "N/A";

    function overrideProperty(obj, property, value) {
        Object.defineProperty(obj, property, {
            get: function() {
                return value;
            },
            configurable: true
        });
    }

    var propertiesToSpoof = [
        'userAgent',
        'platform',
        'vendor',
        'appVersion',
        'appName',
        'product',
        'productSub',
        'vendorSub',
        'oscpu',
        'language',
        'languages',
        'hardwareConcurrency',
        'deviceMemory'
    ];

    propertiesToSpoof.forEach(function(property) {
        overrideProperty(navigator, property, spoofedValue);
    });

    var methodsToSpoof = [
        'getBattery',
        'getGamepads',
        'getVRDisplays',
        'getUserMedia',
        'javaEnabled',
        'sendBeacon',
        'vibrate'
    ];

    methodsToSpoof.forEach(function(method) {
        navigator[method] = function() {
            return spoofedValue;
        };
    });
    
    if (window.XMLHttpRequest) {
        var originalOpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
            this.setRequestHeader("User-Agent", spoofedValue);
            originalOpen.apply(this, arguments);
        };
    }

    if (window.fetch) {
        var originalFetch = window.fetch;
        window.fetch = function(input, init) {
            if (init && init.headers) {
                init.headers['User-Agent'] = spoofedValue;
            } else if (typeof input === 'string') {
                init = {
                    headers: {
                        'User-Agent': spoofedValue
                    }
                };
            } else if (input instanceof Request) {
                input.headers.set('User-Agent', spoofedValue);
            }
            return originalFetch(input, init);
        };
    }

    overrideProperty(document, 'referrer', spoofedValue);
    overrideProperty(document, 'cookie', spoofedValue);
    overrideProperty(document, 'domain', spoofedValue);

    console.log("User Agent spoofed to: " + navigator.userAgent);
    console.log("Platform spoofed to: " + navigator.platform);
    console.log("Vendor spoofed to: " + navigator.vendor);
    console.log("App Version spoofed to: " + navigator.appVersion);
    console.log("App Name spoofed to: " + navigator.appName);
    console.log("Product spoofed to: " + navigator.product);
    console.log("ProductSub spoofed to: " + navigator.productSub);
    console.log("VendorSub spoofed to: " + navigator.vendorSub);
    console.log("OSCPU spoofed to: " + navigator.oscpu);
    console.log("Language spoofed to: " + navigator.language);
    console.log("Languages spoofed to: " + navigator.languages);
    console.log("HardwareConcurrency spoofed to: " + navigator.hardwareConcurrency);
    console.log("DeviceMemory spoofed to: " + navigator.deviceMemory);
    console.log("Document referrer spoofed to: " + document.referrer);
    console.log("Document cookie spoofed to: " + document.cookie);
    console.log("Document domain spoofed to: " + document.domain);
})();
