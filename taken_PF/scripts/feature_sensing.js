/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var aFeatureSensing = [
    [document.images, 'document.images'],
    [document.layers, 'document.layers'],
    [document.all, 'document.all'],
    [document.getElementById, 'document.getElementById'],
    [document.querySelector, 'document.querySelector'],
    [document.styleSheets, 'document.styleSheets'],
    [document.createElement, 'document.createElement'],
    [document.createNodeIterator, 'document.createNodeIterator'],
    [document.implementation.createDocument, 'document.implementation.createDocument'],
    [window.walkTheDog, 'window.walkTheDog'],
    [window.focus, 'window.focus'],
    [window.ActiveXObject, 'window.ActiveXObject'],
    [window.XMLHttpRequest, 'window.XMLHttpRequest'],
    [window.localStorage, 'window.localStorage'],
    [[].push, '[].push'],
    [[].filter, '[].filter'],
    [Object.prototype, 'Object.prototype'],
    [navigator.geolocation, 'navigator.geolocation'],
    [document.documentElement.classList, 'document.documentElement.classList']];

window.onload = function () {
    var hans = '1+3';
    alert(eval(hans));
    var eNoScript = document.getElementById('noscript');
    eNoScript.style.display = "none";

    var nLength = aFeatureSensing.length;
    var sFeatureSensing = aFeatureSensing.toString();


    //console.log(nLength + sFeatureSensing);
    if (nLength > 0) {
        var eContainer = document.getElementById('container');
        var eTitle = document.createElement('h1');
        eTitle.innerHTML = navigator.appName + '<br> Version : ' + navigator.appVersion;
        eTitle.innerHTML += '<br> UserAgent : ' + navigator.userAgent;
        eTitle.innerHTML = getBrowserDetails();
        eContainer.appendChild(eTitle);
        var eTable = document.createElement('table');

        for (var i = 0; i < nLength; i++) {
            var aFeature = aFeatureSensing[i];
            voegRijToe(aFeature, eTable);
        }

        eContainer.appendChild(eTable);

    }

};

function getBrowserDetails() {
    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browserName = navigator.appName;
    var fullVersion = '' + parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;
// In Opera, the true version is after "Opera" or after "Version"
    if ((verOffset = nAgt.indexOf("Opera")) != -1) {
        browserName = "Opera";
        fullVersion = nAgt.substring(verOffset + 6);
        if ((verOffset = nAgt.indexOf("Version")) != -1)
            fullVersion = nAgt.substring(verOffset + 8);
    }
// In MSIE, the true version is after "MSIE" in userAgent
    else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
        browserName = "Microsoft Internet Explorer";        
        fullVersion = nAgt.substring(verOffset + 5);
    }
// In Chrome, the true version is after "Chrome" 
    else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
        browserName = "Chrome";
        fullVersion = nAgt.substring(verOffset + 7);
    }
// In Safari, the true version is after "Safari" or after "Version" 
    else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
        browserName = "Safari";
        fullVersion = nAgt.substring(verOffset + 7);
        if ((verOffset = nAgt.indexOf("Version")) != -1)
            fullVersion = nAgt.substring(verOffset + 8);
    }
// In Firefox, the true version is after "Firefox" 
    else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
        browserName = "Firefox";
        fullVersion = nAgt.substring(verOffset + 8);
    }
// In most other browsers, "name/version" is at the end of userAgent 
    else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
        browserName = nAgt.substring(nameOffset, verOffset);
        fullVersion = nAgt.substring(verOffset + 1);
        if (browserName.toLowerCase() == browserName.toUpperCase()) {
            browserName = navigator.appName;
        }
    }
// trim the fullVersion string at semicolon/space if present
    if ((ix = fullVersion.indexOf(";")) != -1)
        fullVersion = fullVersion.substring(0, ix);
    if ((ix = fullVersion.indexOf(" ")) != -1)
        fullVersion = fullVersion.substring(0, ix);

    majorVersion = parseInt('' + fullVersion, 10);
    if (isNaN(majorVersion)) {
        fullVersion = '' + parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion, 10);
    }
    
    return browserName + ' Version ' + fullVersion;
}

function voegRijToe(aPropertie, eTable) {
    /*
     * aPropertie : the propertie to check
     * eTable : the table to add the row to
     */
    var eTableRow = document.createElement('tr');
    var eTablePropertie = document.createElement('td');
    eTablePropertie.innerHTML = aPropertie[1];
    eTableRow.appendChild(eTablePropertie);
    var eTableBoolean = document.createElement('td');

    var sLogTekst = aPropertie[1];

    if (aPropertie[0]) {
        eTableBoolean.innerHTML = 'Ja';
        eTableRow.style.backgroundColor = 'green';
        sLogTekst += ' : ja';
    } else {
        eTableBoolean.innerHTML = 'Nee';
        eTableRow.style.backgroundColor = 'red';
        sLogTekst += ' : nee';
    }
    //console.log(sLogTekst);
    eTableRow.appendChild(eTableBoolean);
    eTable.appendChild(eTableRow);
}


