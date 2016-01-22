/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var aoWinkels = [
    {
        naam: "de fruitmand",
        adres: "steenstraat 34",
        post: 8000,
        gemeente: "Brugge",
        tel: "050342218",
        manager: "Francine Lapoule"
    },
    {
        naam: "Jos & Anneke",
        adres: "visserijstraat 1",
        post: 8400,
        gemeente: "Oostende",
        tel: "059463689",
        manager: "Jos Leman"
    },
    {
        naam: "groene vingers",
        adres: "hoogstraat 108",
        post: 9000,
        gemeente: "Gent",
        tel: "091342218"
    },
    {
        naam: "de buurtwinkel",
        adres: "die laene 22",
        post: 2000,
        gemeente: "Antwerpen",
        tel: "0230342218",
        manager: "Bert Simoens"
    }
];

var aaGroenten = [
    ["aardappelen", 0.95, "kg"],
    ["avocado", 2.69, "stuk"],
    ["bloemkool", 1.93, "stuk"],
    ["brocoli", 1.29, "stuk"],
    ["champignons", 0.89, "250g"],
    ["chinese kool", 1.59, "stuk"],
    ["groene kool", 1.69, "stuk"],
    ["knolselder", 1.29, "stuk"],
    ["komkommer", 2.49, "stuk"],
    ["kropsla", 1.69, "stuk"],
    ["paprika", 0.89, "net"],
    ["prei", 2.99, "bundel"],
    ["princessenbonen", 1, "250g"],
    ["rapen", 0.99, "bundel"],
    ["kropsla", 1.69, "stuk"],
    ["rode kool", 1.39, "stuk"],
    ["sla iceberg", 1.49, "stuk"],
    ["spinazie vers", 1.89, "300g"],
    ["sjalot", 0.99, "500g"],
    ["spruiten", 1.86, "kg"],
    ["trostomaat", 2.99, "500g"],
    ["ui", 0.89, "kg"],
    ["witloof 1ste keus", 1.49, "700g"],
    ["wortelen", 2.59, "kg"],
    ["courgetten", 1.5, "stuk"]
];

var oFouten = {
    required: {
        /* enkel voor input type="text|password" */
        msg: "verplicht veld",
        test: function (elem) {
            return elem.value !== "";
        }
    },
    aantal: {
        msg: "getal groter dan 0 verwacht",
        test: function (elem) {
            //aantal test enkel de inhoud als getal als er een inhoud is 
            if (elem.value !== "") {
                return (!isNaN(elem.value) && elem.value > 0);
            } else {
                return true;
            }
        }
    }
};

var aaMandje = [];

window.onload = function () {
    // DOM REFERENCES
    var eWinkel = document.frmBestel.winkel;
    var eGroente = document.frmBestel.groente;
    var eToevoegen = document.querySelector('#toevoegen');

    var nWinkels = aoWinkels.length;
    var nGroenten = aaGroenten.length;

    console.log(nWinkels + ' ' + nGroenten);
    // opvullen winkel select
    for (var i = 0; i < nWinkels; i++) {
        var aWinkel = aoWinkels[i];
        var eOption = document.createElement('option');
        eOption.value = i;
        eOption.label = aWinkel.naam;
        eOption.title = aWinkel.adres + ', ' + aWinkel.post + ' ' + aWinkel.gemeente;
        eWinkel.appendChild(eOption);
    }
    // opvullen groenten select
    for (var i = 0; i < nGroenten; i++) {
        var aGroente = aaGroenten[i];
        var eOption = document.createElement('option');
        eOption.value = i;
        eOption.label = aGroente[0] + ' (' + aGroente[1] + '/' + aGroente[2] + ')';
        eGroente.appendChild(eOption);
    }
    
    eToevoegen.addEventListener('click', function (e) {
        e.preventDefault();
        var bValid = valideer(this.form);
        if (bValid) {
            voegToeAanWinkelMandje(this.form);
        }
    });

};

function voegToeAanWinkelMandje(frm) {
    var nMandje = aaMandje.length;
    console.log('aantal in mandje ' + nMandje);
    var nGroenteIndex = frm.groente.value;
    var nAantal = parseInt(frm.aantal.value);

    // reeds aanwezig -> voeg nieuw aantal toe bij huidige record
    var bReedsAanwezig = function (index) {
        for (var i = 0; i < nMandje; i++) {
            if (aaMandje[i].id === nGroenteIndex) {
                console.log('reeds aanwezig : ' + aaMandje[i].aantal);
                aaMandje[i].aantal += nAantal;
                return true;
            }
        }
        return false;
    }(nGroenteIndex);
    // niet aanwezig -> nieuwe rij in mandje
    if (!bReedsAanwezig) {
        aaMandje.push({id: nGroenteIndex, aantal: nAantal});
    }
    updateWinkelMandje();

}

function updateWinkelMandje() {
    
    var eWinkelmandje = document.getElementById('winkelmandje');
    var eTotaal = document.getElementById('totNum');
    var eLeeg = document.getElementById('leeg');
    
    eLeeg.removeChild(eLeeg.firstChild);
    var eTable = document.createElement('table');
    var nMandje = aaMandje.length;
    var nTotaalMandje = 0;
    for (var i = 0; i < nMandje; i++) {
        var nPrijs = Number.parseFloat(aaGroenten[aaMandje[i].id][1]);
        var nTotaalArtikel = parseFloat(nPrijs * aaMandje[i].aantal);
        eTable.innerHTML += "<tr> <td class = 'cel cellinks'>" + aaGroenten[aaMandje[i].id][0]
                + "</td> <td class = 'aantal'>" + aaMandje[i].aantal
                + " </td> <td class='prijs'> " + nPrijs
                + "</td><td class = 'subtotaal'>" + nTotaalArtikel.toFixed(2) + "</td></tr>";
        nTotaalMandje += parseFloat(nTotaalArtikel);
    }
    eLeeg.appendChild(eTable);
    eTotaal.innerHTML = parseFloat(nTotaalMandje).toFixed(2);
}

function valideer(frm) {
    var bValid = true; //optimistisch geen fouten

    //lus doorheen alle form elementen van het formulier
    for (var i = 0; i < frm.elements.length; i++) {
        //verwijder vorige foutboodschappen
        hideErrors(frm.elements[i]);
        //valideer veld
        var bVeld = valideerVeld(frm.elements[i]);
        //console.log("het element %s met name %s valideert %s", frm.elements[i].nodeName, frm.elements[i].name, bVeld);
        if (bVeld === false) {
            bValid = false;
        }
    }
    return bValid;
}

function valideerVeld(elem) {
    //valideert één veld volgens zijn class
    var aFoutBoodschappen = [];
    for (var fout in oFouten) {
        var re = new RegExp("(^|\\s)" + fout + "(\\s|$)"); //regex
        // fouten class aanwezig?
        if (re.test(elem.className)) {
            var bTest = oFouten[fout].test(elem);
            //console.log("het element %s met name %s wordt gevalideerd voor %s: %s", elem.nodeName, elem.name, fout, bTest);
            if (bTest === false) {
                aFoutBoodschappen.push(oFouten[fout].msg);
            }
        }
    }
    if (aFoutBoodschappen.length > 0) {
        showErrors(elem, aFoutBoodschappen);
    }
    return !(aFoutBoodschappen.length > 0);
}

function hideErrors(elem) {
    /*
     verwijdert alle fouten voor één element
     @elem element, te valideren veld
     */
    var eBroertje = elem.nextSibling;
    if (eBroertje && eBroertje.nodeName === "UL" && eBroertje.className === "fouten") {
        elem.parentNode.removeChild(eBroertje);
    }
}

function showErrors(elem, aErrors) {
    /*
     toont alle fouten voor één element
     @elem element, te valideren veld
     @aErrors array, fouten voor dit element
     */
    var eBroertje = elem.nextSibling;
    if (!eBroertje || !(eBroertje.nodeName === "UL" && eBroertje.className === "fouten")) {
        eBroertje = document.createElement('ul');
        eBroertje.className = "fouten";
        elem.parentNode.insertBefore(eBroertje, elem.nextSibling);
    }
    //plaats alle foutberichten erin
    for (var i = 0; i < aErrors.length; i++) {
        var eLi = document.createElement('li');
        eLi.innerHTML = aErrors[i];
        eBroertje.appendChild(eLi);
    }
}
