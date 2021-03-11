/*
Autor: Juan Vidal
Camada: 14365
*/

/* Constantes y Variables */
const SEPARADOR = " ";


let nNumber1=0;
let nNumber2=0;
let nFibostep=0;






/* Toolkit */ 
/*    Primer letra en mayúscula. */
String.prototype.capitalize = function (lower) {
    return (lower ? this.toLowerCase() : this).replace(/(?:^|\s|['`‘’.-])[^\x00-\x60^\x7B-\xDF](?!(\s|$))/g, function (a) {
        return a.toUpperCase();
    });
};

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



/*    Determinar Criterio para vacunación COVID-19 */

/*    Responder al llamado del boton de criterios. */
function fBotonCriterios() {

    saycs("Entra en HACER TEST / nPaso=" + nPaso);

    switch (nPaso) {
        case 0:
            funcDispararModal(nPaso);
            break;
        case 1:
            funcDispararModal(nPaso);
            break;
        case 2:
            funcDispararModal(nPaso);
            break;
        case 3:
            funcDispararModal(nPaso);
            break;
        case 4:
            funcDispararModal(nPaso);
            break;
        case 5:
            funcDispararModal(nPaso);
            break;
        case 6:
            funcDispararModal(nPaso);
            break;

    }
    saycs("Sale de HACER TEST / nPaso=" + nPaso);
    return true;

}
/* Dispara dialogo modal con pasos */
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

/* Validar Paso*/
function validarPaso(numeroPaso) {

    switch (numeroPaso) {
        case 0:
            nNumber1 = Number(document.getElementById("Nombre").value);
            say("nNumber1=" + nNumber1);

            nNumber2 = Number(document.getElementById("Apellido").value);
            say("nNumber2=" + nNumber2);

            nNumber3 = Number(document.getElementById("Edad").value);
            say("nNumber3=" + nNumber3);

            //Nombre
            if (usrNombre === "") {
                // user pressed OK, but the input field was empty
                //alertCampoNulo("Nombre");
                document.getElementById("NombreHelp").innerHTML = "Demasiado Corto.";
                bContinuar = bContinuar && false;
            } else if (usrNombre.length < 2) {
                //say("Nombre es demasiado corto.");
                document.getElementById("NombreHelp").innerHTML = "Demasiado Corto.";
                bContinuar = bContinuar && false;
            } else {
                //say("NOMBRE=" + usrNombre);
                document.getElementById("NombreHelp").innerHTML = "";
                bContinuar = true;
            }

            //Apellido
            if (usrNombre === "") {
                // user pressed OK, but the input field was empty
                //alertCampoNulo("Apellido");
                document.getElementById("ApellidoHelp").innerHTML = "Demasiado Corto.";
                bContinuar = bContinuar && false;
            } else if (usrApellido.length < 2) {
                //say("Apellido es demasiado corto.");
                document.getElementById("ApellidoHelp").innerHTML = "Demasiado Corto.";
                bContinuar = bContinuar && false;
            } else {
                document.getElementById("ApellidoHelp").innerHTML = "";
                //say("APELLIDO=" + usrApellido);
                bContinuar =  true;
            }

            //edad
            if (Number(usrEdad) >= 18 && Number(usrEdad) < 150) {
                document.getElementById("EdadHelp").innerHTML = "";
                bContinuar = bContinuar && true;
            } else {
                say("  > WARNING: EDAD=" + usrEdad + " . El valor ingresado es inválido")
                document.getElementById("EdadHelp").innerHTML = "Debe tener al menos 18 años.";
                bContinuar = bContinuar && false;
            }
            break;
        case 2:
            bContinuar = bContinuar && true;
            break;
        case 3:
            bContinuar = bContinuar && true;
            break;
        case 4:
            bContinuar = bContinuar && true;
            break;
        case 5:
            bContinuar = bContinuar && true;
            break;
        case 6:
            bContinuar = bContinuar && false;
            break;
        default:
            bContinuar = false;
            break;
    }

    //cadenaSalida = "END";
    //say(cadenaSalida);
    return bContinuar;
}



function funcNext() {
    saycs(" / BEGIN / nPaso=" + nPaso + "/ bContinuar=" + bContinuar);
    switch (nPaso) {
        case 0:
            if (bContinuar == true) {
                $("#modal0").modal('hide');
                nPaso = nPaso + 1;
                funcDispararModal(nPaso);
            }
            break;
        case 1:
            validarPaso(nPaso);
            if (bContinuar == true) {
                say("paso 1 validado");
                $("#modal1").modal('hide');
                nPaso = nPaso + 1;
                funcDispararModal(nPaso);

            } else {
                say("paso 1 no validado");
                $("#modal1").modal();
            }
            break;
        case 2:
            if (bContinuar == true) {
                $("#modal2").modal('hide');
                nPaso = nPaso + 1;
                funcDispararModal(nPaso);
            }
            break;
        case 3:
            if (bContinuar == true) {
                $("#modal3").modal('hide');
                nPaso = nPaso + 1;
                funcDispararModal(nPaso);
            }
            break;
        case 4:
            if (bContinuar == true) {
                $("#modal4").modal('hide');
                nPaso = nPaso + 1;
                funcDispararModal(nPaso);
            }
            break;
        case 5:
            if (bContinuar == true) {
                $("#modal5").modal('hide');
                nPaso = nPaso + 1;
                funcDispararModal(nPaso);
            }
            break;
        case 6:
            if (bContinuar) {
                $("#modal6").modal('toggle');
                nPaso = nPaso + 1;
                funcDispararModal(nPaso);
            }
            break;

        default:
            break;

    }
    saycs(" / END / nPaso=" + nPaso + "/ bContinuar=" + bContinuar);
    return true;

}

function funcProcesarResultados() {
    var bPrioritario = new Boolean(false);
    var nNivel=[0];

    document.getElementById("resNombre").innerHTML = usrNombre + SEPARADOR + usrApellido + ":";

    strResults = "";
    if (Number(userMedico)) {
        bPrioritario = true;
        nNivel.push(1);
        strResults += "<ul>";
        strResults += "<li>Es personal de salud.</li>";
    }

    if (Number(usrEdad) >= 70) {
        bPrioritario = true;
        nNivel.push(2);
        strResults += "<li>Es mayor de 70 años y/o vive en un establecimientos geriátrico.</li>";
    }
    if (Number(usrEdad) >= 60) {
        bPrioritario = true;
        nNivel.push(3);
        strResults += "<li>Es mayor de 60 años.</li>";
    }
    if (userFFAA) {
        bPrioritario = true;
        nNivel.push(4);
        strResults += "<li>Es personal de las Fuerzas Armadas, de Seguridad o servicios penitenciarios.</li>";
    }

    if (userRiesgo) {
        bPrioritario = true;
        nNivel.push(5);
        strResults += "<li>Posee factores considerados 'de riesgo'.</li>";
    }

    if (userDocente) {
        bPrioritario = true;
        nNivel.push(6);
        strResults += "<li>Es docente.</li>";
    }

    if (userEstrategico) {
        bPrioritario = true;
        nNivel.push(7);
        strResults += "<li>Es estratégico.</li>";
    }

    strResults += "</ul>";
    if (nNivel[1]==1)
    strResults += "<br>VAYA CORRIENDO A VACUNARSE!";
    if (bPrioritario == true) {
        document.getElementById("resPrioritario").innerHTML = "Usted ES PRIORITARIO NIVEL " + nNivel[1] + ", porque:";
    } else {
        document.getElementById("resPrioritario").innerHTML = "Usted NO es prioritario. <br> Será vacunado cuando todos los demas estén a salvo.";
    }

    document.getElementById("pResultados").innerHTML = strResults;
}


/*

    Clase 3 : Ciclos + Iteraciones

*/
function fBotonSumarNumeros ()
{
    funcDispararModal(0);

}
