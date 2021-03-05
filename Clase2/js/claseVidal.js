/*
Autor: Juan Vidal
Camada: 14365
*/

/* Variables */

//EC6
let nombreVariable; //solo declarada. sin inicializar
const SEPARADOR = " ";

/*
    Emitir alerta en browser y consola.
*/
function alertCampoNulo(nombreCampo) {
    let cadenaSalida = "  > WARNING: El valor ingresado es nulo ( " + nombreCampo + " )";
    console.log(cadenaSalida);
}

/*
    Primer letra en mayúscula.
*/
String.prototype.capitalize = function (lower) {
    return (lower ? this.toLowerCase() : this).replace(/(?:^|\s|['`‘’.-])[^\x00-\x60^\x7B-\xDF](?!(\s|$))/g, function (a) {
        return a.toUpperCase();
    });
};


/*
    Preguntar Nombre y apellido.
*/
function preguntarNombreApellido() {
    let AlumnoNombre = prompt("Ingresa tu nombre");
    if (AlumnoNombre === "") {
        // user pressed OK, but the input field was empty
        alertCampoNulo("Nombre");
        return false;
    } else if (AlumnoNombre) {
        // user typed something and hit OK
        let AlumnoApellido = prompt("Ingresa tu apellido");
        if (AlumnoApellido === "") {
            // user pressed OK, but the input field was empty
            alertCampoNulo("Apellido");
        } else if (AlumnoApellido) {
            // user typed something and hit OK
            let cadenaSaludo = "Bienvenido" + SEPARADOR + AlumnoNombre.capitalize(true) + SEPARADOR + AlumnoApellido.capitalize(true) + SEPARADOR + "al curso de" + SEPARADOR + nombreCurso.capitalize(true);
            alert(cadenaSaludo);
            console.log(cadenaSaludo);
            return true;
        } else {
            // user hit cancel
            alertCampoNulo("Apellido");
            return false;
        }
    } else {
        // user hit cancel
        alertCampoNulo("Nombre");
        return false;
    }

}

/*
    Determinar Criterio para vacunación COVID-19
*/
function determinarVacunación() {
    return true;
}


/*
    Responder al llamado del boton de criterios.
*/
function fBotonCriterios() {

    cadenaSalida = "Comenzar evaluación de criterios";
    console.log(cadenaSalida);       

    if (preguntarNombreApellido()) {
        determinarVacunación();
    }
    else {
        cadenaSalida = "El usuario ha cancelado. Se aborta el proceso de evaluación.";
        console.log(cadenaSalida);       
    }
    

}