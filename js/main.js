/*
Autor: Juan Vidal
Camada: 14365
*/

const CODERHOUSE = "POWERED BY CODERHOUSE";

say(CODERHOUSE);

//manejar menu
function fMainMenu() {

    var xMenu = document.getElementById("clasesMenu");

    //clase 1
    var content = xMenu.insertAdjacentHTML('beforeend', "<a class=\"dropdown-item\" href=\"Clase1/clase1.html\">Clase 1</a>");

    //clase 2
    var content = xMenu.insertAdjacentHTML('beforeend', "<a class=\"dropdown-item\" href=\"Clase2/clase2.html\">Clase 2</a>");

    //clase 3
    var content = xMenu.insertAdjacentHTML('beforeend', "<a class=\"dropdown-item\" href=\"Clase3/clase3.html\">Clase 3</a>");

    //clase 4a
    var content = xMenu.insertAdjacentHTML('beforeend', "<a class=\"dropdown-item\" href=\"Clase4a/clase4a.html\">Clase 4 - Simulador interactivo</a>");

    //clase 4b
    var content = xMenu.insertAdjacentHTML('beforeend', "<a class=\"dropdown-item\" href=\"Clase4b/clase4b.html\">Clase 4 - Funciones Relacionadas</a>");

    //Clase 5
    var content = xMenu.insertAdjacentHTML('beforeend', "<a class=\"dropdown-item\" href=\"Clase5/clase5.html\">Clase 5</a>");

    //Separador
    var content = xMenu.insertAdjacentHTML('beforeend', "<div class=\"dropdown-divider\"></div>");

    //WS1
    var content = xMenu.insertAdjacentHTML('beforeend', "<a class=\"dropdown-item\" href=\"#\">Workshop 1</a>");

    //WS2
    var content = xMenu.insertAdjacentHTML('beforeend', "<a class=\"dropdown-item\" href=\"#\">Workshop 2</a>");

}
//funciones de cada pagina
function func2() {
    say("Funciones de cada página.");
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