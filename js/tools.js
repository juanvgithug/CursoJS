/*
Autor: Juan Vidal
Camada: 14365
*/
/* JS Toolkit */


/* Constantes y Variables */
const SEPARADOR = " ";

/*    Primer letra en mayúscula. */
String.prototype.capitalize = function (lower) {
    return (lower ? this.toLowerCase() : this).replace(/(?:^|\s|['`‘’.-])[^\x00-\x60^\x7B-\xDF](?!(\s|$))/g, function (a) {
        return a.toUpperCase();
    });
};

/*    isNumber: Retorna TRUE si es un numero */
function isNumber(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
}

/*    Salida a consola + call stack*/
function saycs(stringOut) {
    var thisFunction = arguments.callee;
    var caller = thisFunction.caller;
    var outStr = String(caller.caller).split(/\r?\n/);
    console.log(outStr + stringOut);
}

/*    Salida a consola */
function say(stringOut) {
    console.log(stringOut);
}


/*    Emitir alerta en browser y consola.*/
function alertCampoNulo(nombreCampo) {
    return say("  > WARNING: El valor ingresado es nulo ( " + nombreCampo + " )");
}

/*    Fibonacci: Obtener el N... término de la sucesión */
function fibonacci(num) {
    var a = 1,
        b = 0,
        temp;

    while (num >= 0) {
        temp = a;
        a = a + b;
        b = temp;
        num--;
    }

    return b;
}

/*  Include external file as HTML */
function includeMenuHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = elmnt.getAttribute("menu-html");
      if (file) {
        /* Make an HTTP request using the attribute value as the file name: */
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            /* Remove the attribute, and call this function once more: */
            elmnt.removeAttribute("menu-html");
            includeMenuHTML();
          }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        /* Exit the function: */
        return;
      }
    }
  }