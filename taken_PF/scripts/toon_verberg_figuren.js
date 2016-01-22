/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 window.onload = function(){
 var aScreenshots = document.querySelector('article');
 console.log(aScreenshots[0].firstChild.src);
 }
 
 */

var aScreenshots;
var nTaalKeuze = 0;
var aTeksten = [['Verberg screenshot', 'Toon screenshot'],
    ['Hide screenshot', 'Show screenshot']];

window.onload = function () {
    aScreenshots = document.querySelectorAll('article .toggle');
    var nScreenshotsLength = aScreenshots.length;

    for (var i = 0; i < nScreenshotsLength; i++) {
        var eVerbergKnop = document.createElement('button');
        eVerbergKnop.value = i;
        eVerbergKnop.innerHTML = aTeksten[nTaalKeuze][0];
        eVerbergKnop.style.display = "block";
        eVerbergKnop.addEventListener('click', function (e) {
            e.preventDefault();
            toggleVisibility(this.value);
        });
        aScreenshots[i].appendChild(eVerbergKnop);
    }


    var eVerbergAlleSchermen = document.getElementById('hoofdknop');
    eVerbergAlleSchermen.onclick = function () {
        for (var i = 0; i < nScreenshotsLength; i++) {
            aScreenshots[i].firstChild.style.display = "none";
            aScreenshots[i].lastChild.innerHTML = aTeksten[nTaalKeuze][1];
        }
    };
    //console.log(aScreenshots[1].firstChild.src);


};

function toggleVisibility(index) {
    if (aScreenshots[index].firstChild.style.display === "none") {
        aScreenshots[index].firstChild.style.display = "block";
        aScreenshots[index].lastChild.innerHTML = aTeksten[nTaalKeuze][0];
    } else {
        aScreenshots[index].firstChild.style.display = "none";
        aScreenshots[index].lastChild.innerHTML = aTeksten[nTaalKeuze][1];
    }
}