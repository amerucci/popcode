

// Create cookie
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    window['ga-disable-G-ZWKNYV187G'] = false;
}

// Delete cookie
function deleteCookie(cname) {
    const d = new Date();
    d.setTime(d.getTime() + (24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=;" + expires + ";path=/";
}

//STOP GOOGLE 
function stopAnalytics(){
    document.cookie = "username=_ga_ZWKNYV187G; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
}

// Read cookie
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Set cookie consent
function acceptCookieConsent(){
    deleteCookie('user_cookie_consent');
    setCookie('user_cookie_consent', 1, 30);
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-ZWKNYV187G');
    document.getElementById("cookieNotice").style.display = "none";
}

function refuseCookieConsent(){
    window['ga-disable-G-ZWKNYV187G'] = true;
    document.getElementById("cookieNotice").style.display = "none";
}
// The following code will check the cookie acceptance flag in JavaScript Cookies when the web page is loaded.

// If already accepted, it will hide the Cookie Consent Popup. Otherwise, the Cookie Consent Popup will be displayed.
let cookie_consent = getCookie("user_cookie_consent");
if(cookie_consent != ""){
    document.getElementById("cookieNotice").style.display = "none";
}else{
    document.getElementById("cookieNotice").style.display = "block";
}