/*
Autor: Juan Vidal
Camada: 14365
*/

const CODERHOUSE = "POWERED BY CODERHOUSE";

say(CODERHOUSE);

//manejar menu
function fMainMenu() {

    includeMenuHTML();

}
//funciones de cada pagina
function func2() {

    let arrLocation = window.location.href.split("/");
    if (arrLocation[arrLocation.length - 1] == "clase6.html") {
        //say(arrLocation[arrLocation.length - 1]);
        loadCombo();
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
    //document.body.style.backgroundColor = '#EFDF95';
})