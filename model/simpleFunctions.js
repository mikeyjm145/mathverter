function theDate(timeBehind) {
    var today = new Date();

    if (timeBehind === 0) {
        return (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
    }

    var pastDate = new Date();
    pastDate.setDate(today.getDate() - timeBehind);
    return (pastDate.getMonth() + 1) + "/" + pastDate.getDate() + "/" + pastDate.getFullYear();
}

function injectHTML(elementID, text) {
	document.getElementById(elementID).innerHTML = text;
}

function checkBrowserSupport() {
	var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
		// Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
	var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
	var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
		// At least Safari 3+: "[object HTMLElementConstructor]"
	var isChrome = !!window.chrome && !isOpera;              // Chrome 1+
	var isIE = /*@cc_on!@*/false || !!document.documentMode;   // At least IE6
	
	if (isOpera || isFirefox) { return "supported"; }
	else { return "not supported"; }
}

function check() {
    var browserSupport = checkBrowserSupport();
		
    if (browserSupport !== "supported") {
        document.write('<link rel="stylesheet" href="/mathml/mathmlMain.css">');
    }
}