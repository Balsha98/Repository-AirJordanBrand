"use strict";

// UNSUPPORTED VERSIONS
// https://browser-update.org/browsers.html
const minBrowVs = [
    {
        name: "Chrome",
        version: 119,
    },
    {
        name: "Firefox",
        version: 115,
    },
    {
        name: "Internet Explorer",
        version: 11,
    },
    {
        name: "Edge",
        version: 119,
    },
    {
        name: "Opera",
        version: 101,
    },
    {
        name: "Safari",
        version: 16,
    },
];

// CHECKING BROWSER VERSION
(function (arrayOfObjects) {
    let numValid = 0;

    const userAgentValues = navigator.userAgent.split(" ");
    for (let browser of userAgentValues) {
        if (browser.includes("/")) {
            for (let { name, version } of arrayOfObjects) {
                const currName = browser.split("/")[0];
                const currVersion = parseFloat(browser.split("/")[1]);
                if (name.includes(currName)) {
                    // Redirecting to Firefox.
                    if (version >= currVersion && numValid < 1) {
                        window.open("https://www.mozilla.org/en-US/firefox/new/");
                    }

                    const isOkay = version >= currVersion ? "Unsupported!" : "Supported!";
                    console.log(`${isOkay}\n\tBrowser: ${currName}\n\tVersion: ${currVersion}`);
                    numValid++;
                }
            }
        }
    }
})(minBrowVs);
