/*
Autor: Juan Vidal
Camada: 14365
*/

/* Constantes y Variables */
const SEPARADOR = " ";
let bBoton2Activo = false;
let strEjemplo2 = "";
let nIteracion2 = 0;
var myVar;

/* Toolkit */
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

/* Dispara dialogo modal con ejemplos */
function funcDispararModal(ventanaID) {
    switch (ventanaID) {
        case 0:
            $("#modal0").modal('show');
            break;
        case 1:
            $("#modal1").modal('show');
            break;
        case 2:
            $("#modal2").modal('show');
            break;
        default:
            break;

    }
    return true;
}

/* Validaciones BOTON 1 */
function validarValor(nVal) {
    bRetval = false;
    switch (nVal) {

        case 1:
            //Numero1 
            let nNumber1 = Number(document.getElementById("Valor1").value);
            say("nNumber1=" + nNumber1);

            if (!isNumber(Number(nNumber1))) {
                document.getElementById("Valor1Help").innerHTML = `Por favor ingrese un número`;
                bRetval = false;
            } else {
                bRetval = true;
            }
            if (isNaN(nNumber1)) {
                document.getElementById("Valor1Help").innerHTML = `Por favor ingrese un número`;
                bRetval = false;
            } else {
                bRetval = true;
            }
            break;

        case 2:
            //Numero2
            let nNumber2 = Number(document.getElementById("cantRep").value);
            say("nNumber2=" + nNumber2);

            if (!isNumber(Number(nNumber2))) {
                document.getElementById("cantRepHelp").innerHTML = `Por favor ingrese un número`;
                bRetval = false;
            } else {
                bRetval = true;
            }
            if (isNaN(nNumber2)) {
                document.getElementById("cantRepHelp").innerHTML = `Por favor ingrese un número`;
                bRetval = false;
                break;
            } else {
                bRetval = true;
            }
            if (!Number.isInteger(nNumber2)) {
                document.getElementById("cantRepHelp").innerHTML = `Debe ser un número entero.`;
                bRetval = false;
            } else {
                bRetval = true;
            }
            break;
    }
    say(`bRetval = ${bRetval}`);

    return bRetval;
}


/*

    Clase 3 : Ciclos + Iteraciones

*/

function clearHelp() {
    saycs("BEGIN");
    if (validarValor(1)) {
        document.getElementById("Valor1Help").innerHTML = "";

        if (validarValor(2)) {
            document.getElementById("cantRepHelp").innerHTML = "";
            const button = document.getElementById('btnEjemplo1');
            button.disabled = false;

        }

    } else {
        const button = document.getElementById('btnEjemplo1');
        button.disabled = true;

    }

    saycs("END");
    const button = document.getElementById('btnEjemplo1');
    button.disabled = !bRetval;

}

function fBotonSumarNumeros() {
    saycs("BEGIN");

    funcDispararModal(0);

    saycs("END");
}

function funcClearEjemplo1() {
    const button = document.getElementById('btnEjemplo1');
    button.disabled = false;

    const button1 = document.getElementById('btnEjemplo1.2');
    button1.disabled = true;

    const text1 = document.getElementById('Valor1');
    text1.innerHTML.value = "";
    text1.disabled = false

    const text2 = document.getElementById('cantRep');
    text2.innerHTML.value = "";
    text2.disabled = false

    var x = document.getElementById("Resultado1");
    if (x.style.display === "block") {
        x.style.display = "none";
    }
    var strResults = "";
    document.getElementById("pResultados").innerHTML = strResults;

}

function funcCloseEjemplo1() {
    funcClearEjemplo1();
    $("#modal0").modal('hide');
}

function funcEjemplo1() {
    saycs("BEGIN");

    if (validarValor(1) == true &&
        validarValor(2) == true) {
        saycs(">>HACER MAGIA");
        const button = document.getElementById('btnEjemplo1');
        button.disabled = true;
        const button1 = document.getElementById('btnEjemplo1.2');
        button1.disabled = false;
        const text1 = document.getElementById('Valor1');
        text1.disabled = true
        const text2 = document.getElementById('cantRep');
        text2.disabled = true
        var strResults = "";
        let nNumber1 = Number(document.getElementById("Valor1").value);
        let nMaxReps = Number(document.getElementById("cantRep").value);
        strResults += "<ul style=\"padding-left: 1em;\">";
        let n = 0;
        for (n = 1; n <= nMaxReps; n++) {
            let nNumber1 = Number(document.getElementById("Valor1").value);
            strResults += `<ul  class="list-unstyled"> Iteración ${n}:`;
            nNumber1 += n - 1;
            strResults += `<li style="padding-left: 2.3em;"> Numero = ${nNumber1} </li>`;
            say("nNumber1=" + nNumber1);
            let nFibo = fibonacci(nNumber1);
            say("nFibo=" + nFibo);
            strResults += `<li style="padding-left: 2.3em;"> Fibonacci(${nNumber1}) = ${nFibo}  </li>`;
            strResults += `<li style="padding-left: 2.3em;"> Resultado de la suma:  </li>`;
            let nResSuma = nNumber1 + nFibo;
            strResults += `<li style="padding-left: 3.9em;font-weight: bold;"> ${nNumber1} + ${nFibo} = ${nResSuma} </li>`;
            strResults += "</ul>";
        }

        strResults += "</ul>";
        document.getElementById("pResultados").innerHTML = strResults;

        var x = document.getElementById("Resultado1");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        const button3 = document.getElementById('btnEjemplo1.3');
        button3.disabled = false;

    } else {
        const button = document.getElementById('btnEjemplo1');
        button.disabled = true;
    }
    saycs("END");
}

function fBotonWhile() {
    saycs("BEGIN");

    funcDispararModal(1);

    saycs("END");
}

function funcClearEjemplo2() {

    strEjemplo2 = "";
    nIteracion2 = 0;

    const button3 = document.getElementById('btnMenu2');
    let strTemp = "<span class=\"fa-stack\"> <span class=\"fa fa-circle-o fa-stack-2x\"></span><strong class=\"fa-stack-1x\">2 </strong> </span>        &nbsp;Segundo ejemplo";
    button3.innerHTML = strTemp;

    const button = document.getElementById('btnEjemplo2');
    button.disabled = true;
    button.innerHTML = " &nbsp; Comenzar <i class=\"fas fa-play-circle\"></i>";

    const button1 = document.getElementById('btnEjemplo2.2');
    button1.disabled = true;

    const text1 = document.getElementById('Valor2');
    text1.innerHTML.value = "";
    text1.disabled = false

    const text2 = document.getElementById('cantRep');
    text2.innerHTML.value = "";
    text2.disabled = false

    var x = document.getElementById("Resultado2");
    if (x.style.display === "block") {
        x.style.display = "none";
    }
    var strResults = "";
    document.getElementById("pResultados2").innerHTML = strResults;

    clearInterval(myVar);
}


function funcCloseEjemplo2() {
    $("#modal1").modal('hide');
}

function Valor2Help() {

    const button1 = document.getElementById('btnEjemplo2');
    const data = document.getElementById('Valor2').value;


    if (data !== null && data !== '') {
        document.getElementById("Valor2Help").innerHTML = ``;
        button1.disabled = false;
        say("INGRESO UNA CADENA");
        if (data == 'ESC') {
            let strTemp = " &nbsp;\n                        Finalizar <i class=\"fa fa-check-circle-o\"></i>";
            button1.innerHTML = strTemp;
        }
    } else {
        document.getElementById("Valor2Help").innerHTML = `La caja de texto no puede estar vacía!`;
        button1.disabled = true;
        say("NO INGRESO UNA CADENA");
    }
}

function fWhile() {
    say("BEGIN fWhile");
    const data = document.getElementById('Valor2').value;
    while (data != "ESC") {
        say(`ITERACION ${nIteracion2}`);

        $("#modal1").modal('show');


        strEjemplo2 += SEPARADOR + data + SEPARADOR + fibonacci(nIteracion2);
        nIteracion2++;

        document.getElementById("pResultados2").innerHTML = strEjemplo2;
        document.getElementById("Resultado2Iteracion").innerHTML = `Iteración ${nIteracion2}`;
        const button1 = document.getElementById('btnEjemplo2.2');
        if (nIteracion2 != 0) {
            button1.disabled = false;
        } else {
            button1.disabled = true;
        }

        $("#modal1").modal('hide');
        clearInterval(myVar);
        say("END WHILE");
        break;
    }
    if (data == 'ESC') {
        funcClearEjemplo2();
    }
}

function funcEjemplo2() {

    saycs("BEGIN");

    const button = document.getElementById('btnEjemplo2');
    const button3 = document.getElementById('btnMenu2');

    button.disabled = true;
    button.innerHTML = " &nbsp; Continuar <i class=\"fas fa-play-circle\"></i>";

    let strTemp = "<span class=\"fa-stack\"> <span class=\"fa fa-circle-o fa-stack-2x\"></span><strong class=\"fa-stack-1x\">2 </strong> </span>        &nbsp;Segundo ejemplo";
    button3.innerHTML = strTemp + " -  &nbsp;Trabajando... <i class=\"fa fa-hourglass\" aria-hidden=\"true\"\"></i>";
    button3.disabled = false;


    var x = document.getElementById("Resultado2");
    if (x.style.display === "none") {
        x.style.display = "block";
        x.style.fontWeight = "bold";
    }

    $("#modal1").modal('hide');


    saycs("Invocar setInterval");

    myVar = setInterval(fWhile, 1000);

    saycs("END");

}

function fBotonDoWhile() {
    saycs("BEGIN");

    funcDispararModal(2);

    saycs("END");
}

function funcCloseEjemplo3() {
    $("#modal2").modal('hide');
}

function Valor3Help() {

    const button1 = document.getElementById('btnEjemplo3');

    //Numero3
    let nNumber3 = Number(document.getElementById("Valor3").value);
    say("nNumber3=" + nNumber3);

    if (!isNumber(Number(nNumber3))) {
        document.getElementById("Valor3Help").innerHTML = `Por favor ingrese un número`;
        bRetval = false;
        button1.disabled = !bRetval;
        return;
    } else {
        bRetval = true;
    }
    if (isNaN(nNumber3)) {
        document.getElementById("Valor3Help").innerHTML = `Por favor ingrese un número`;
        bRetval = false;
        button1.disabled = !bRetval;
        return;
    } else {
        bRetval = true;
    }
    if (!Number.isInteger(nNumber3)) {
        document.getElementById("Valor3Help").innerHTML = `Debe ser un número entero.`;
        bRetval = false;
        button1.disabled = !bRetval;
        return;
    } else {
        bRetval = true;
    }

    button1.disabled = !bRetval;
    return;
}

function funcEjemplo3() {


    const button1 = document.getElementById('btnEjemplo3');
    button1.disabled = true;

    const sInput = document.getElementById("Valor3");
    sInput.disabled = true;

    var x = document.getElementById("Resultado3");
    if (x.style.display === "none") {
        x.style.display = "block";
        x.style.fontWeight = "bold";
    }


    const data = Number(document.getElementById('Valor3').value);
    let nCurIteracion = 1;
    let strEjemplo3 = "";
    do {
        say(`ITERACION ${nCurIteracion} de ${data}`);
        strEjemplo3 += "Hola!" + SEPARADOR + "<br>";
        document.getElementById("pResultados3").innerHTML = strEjemplo3;
        document.getElementById("Resultado3Iteracion").innerHTML = `Iteración ${nCurIteracion}`;
        const button2 = document.getElementById('btnEjemplo3.2');
        if (nCurIteracion != 1) {
            button2.disabled = false;
        } else {
            button2.disabled = true;
        }
        nCurIteracion++;
    }
    while (nCurIteracion <= data)
}

function funcClearEjemplo3() {


    const button = document.getElementById('btnEjemplo3');
    button.disabled = true;
    button.innerHTML = " &nbsp; Comenzar <i class=\"fas fa-play-circle\"></i>";

    const button1 = document.getElementById('btnEjemplo3.2');
    button1.disabled = true;

    const text1 = document.getElementById('Valor3');
    text1.innerHTML.value = "";
    text1.disabled = false

    var x = document.getElementById("Resultado3");
    if (x.style.display === "block") {
        x.style.display = "none";
    }
    var strResults = "";
    document.getElementById("pResultados3").innerHTML = strResults;

}
