/*
Autor: Juan Vidal
Camada: 14365
*/

/* Variables */
//EC5
var nombreCurso = "Javascript"; // declarada + inicializada

//EC6
let nombreVariable; //solo declarada. sin inicializar
const SEPARADOR = " ";

/*
    Preguntar Nombre y apellido.
*/
function preguntarNombreApellido() {
    let AlumnoNombre = prompt("Ingresa tu nombre");
    if (AlumnoNombre === "") {
        // user pressed OK, but the input field was empty
        alertCampoNulo("Nombre");
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
            return;

        } else {
            // user hit cancel
            alertCampoNulo("Apellido");
        }
    } else {
        // user hit cancel
        alertCampoNulo("Nombre");
    }

}

/*
    Preguntar número entero y sumarle 3
*/
function funcionNumeros() {
    const nBASE = 10;
    let NumeroIngresado = Number.parseInt(prompt("Ingresa un número entero"), nBASE);
    if (NumeroIngresado === "") {
        // user pressed OK, but the input field was empty
        alertCampoNulo("Número entero");
    } else if (NumeroIngresado) {
        // user typed something and hit OK
        let otroNumero = Number.parseInt(3, nBASE);

        let sumaNumeros = NumeroIngresado + otroNumero;

        let cadenaSalida = "La suma del número ingresado " + SEPARADOR + NumeroIngresado + SEPARADOR + "+ 3 da" + SEPARADOR + Number.parseInt(sumaNumeros, nBASE);

        alert(cadenaSalida);
        console.log("funcionNumeros()" + cadenaSalida);
        return;

    } else {
        // user hit cancel
        alertCampoNulo("Número entero");
    }

}

/*
    Emitir alerta en browser y consola.
*/
function alertCampoNulo(nombreCampo) {
    let cadenaSalida = "WARNING: El valor ingresado es nulo ( " + nombreCampo + " )";
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