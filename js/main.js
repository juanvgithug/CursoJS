/*
Autor: Juan Vidal
Camada: 14365
*/

const CODERHOUSE = "POWERED BY CODERHOUSE";

say(CODERHOUSE);

//manejar menu
function fMainMenu() {

    //includeMenuHTML();
}

//funciones de cada pagina
function func2() {

    let arrLocation = window.location.href.split("/");
    switch (arrLocation[arrLocation.length - 1]) {
        case "clase6.html":
            loadCombo();
            break;
        case "clase7y8.html":
            loadCombo();
            break;
        case "clase9.html":
            loadCombo();
            autocomplete(document.getElementById("myAutoComplete"), countries);
            addElementKeyHandler();
            addSortKeyHandler();
            break;
        case "Clase12.html":
            loadCombo();
            autocomplete(document.getElementById("myAutoComplete"), countries);
            addElementKeyHandler();
            addSortKeyHandler();
            break;
        case "clase13.html":
            loadCombo();
            autocomplete(document.getElementById("myAutoComplete"), countries);
            addElementKeyHandler();
            addSortKeyHandler();
            break;
        case "Clase14.html":
            loadCombo();
            autocomplete(document.getElementById("myAutoComplete"), countries);
            addElementKeyHandler();
            addSortKeyHandler();
            loadCountries();
            break;
        case "1aEntregaProyFinal.html":
            loadCombo();
            break;
        case "2aEntregaProyFinal.html":
            loadCombo();
            autocomplete(document.getElementById("myAutoComplete"), countries);
            addElementKeyHandler();
            addSortKeyHandler();
            break;
        case "ProyectoFinal.html":
            loadCombo();
            autocomplete(document.getElementById("myAutoComplete"), countries);
            addElementKeyHandler();
            addSortKeyHandler();
            loadCountries();
            break;
        default:
    }
}

//hook a OnLoad
window.addEventListener("load", FirstLoad());

function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            if (oldonload) {
                oldonload();
            }
            func();
        }
    }
}

//
function FirstLoad() {
    addLoadEvent(fMainMenu);
    addLoadEvent(func2);
}

$(function () { //$(document).ready()

    //say("main.js : DOM is now safe to use.");
    if (isDark) {
        say("THEME: Make it DARK.");
        enableDarkTheme();
    } else {
        disableDarkTheme();
        say("THEME: Let there be light.");
    }

});