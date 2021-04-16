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
            autocomplete(document.getElementById("myInput"), countries);
            addElementKeyHandler();
            addSortKeyHandler();
            break;
        case "1aEntregaProyFinal.html":
            loadCombo();
            break;
        case "2aEntregaProyFinal.html":
            loadCombo();
            autocomplete(document.getElementById("myInput"), countries);
            addElementKeyHandler();
            addSortKeyHandler();
            break;
        default:

    }

}

//hook a OnLoad
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
addLoadEvent(fMainMenu);
addLoadEvent(func2);
addLoadEvent(function () {

    if (isDark) {
        enableDarkTheme();
    } else {
        disableDarkTheme();
    }

    //document.body.style.backgroundColor = '#EFDF95';
})