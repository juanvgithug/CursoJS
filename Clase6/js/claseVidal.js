/*
Autor: Juan Vidal
Camada: 14365
*/

/* Constantes y Variables */


/* Clase #6. Arrays */

function funcCloseGrandTotal() {
    $("#modal0").modal('hide');
}


function validarDatos() {
    bValidar = false;
    if ($('#Id').val() != "") {
        bValidar = true
    } else {
        bValidar = bValidar && false
    }

    if ($('#Code').val() != "") {
        bValidar = bValidar && true
    } else {
        bValidar = bValidar && false
    }

    if ($('#cliente').val() == "Producto" || $('#cliente').val() == "Servicio") {
        bValidar = bValidar && true
    } else {
        bValidar = bValidar && false
    }

    if ($('#Quantity').val() > 0) {
        bValidar = bValidar && true
    } else {
        bValidar = bValidar && false
    }

    if ($('#Price').val() != "") {
        bValidar = bValidar && true
    } else {
        bValidar = bValidar && false
    }

    return bValidar;
}

// OBJETO ROW
function row(rowId, txtId, Code, Client, Quantity, Price) {
    this.rowId = rowId;
    this.txtId = txtId;
    this.Code = Code;
    this.Client = Client;
    this.Quantity = Quantity;
    this.Price = Price;
    this.Total = Quantity * Price;
}

//OBJETO MODEL
function model() {
    this.rows = [];
}

//Constructor de OBJETO MODEL
var mymodel = new model();

$(document).ready(function () {

    $("body").on("click", ".btnDelete", function () {
        var id = $(this).data('id');
        for (i = 0; i < mymodel.rows.length; i++) {
            //saycs(mymodel.rows[i].rowId);
            if (mymodel.rows[i].rowId == id) {
                mymodel.rows.splice(i, 1);
            }
        }
        draw();
    });

    $('#add').click(function () {
        if (validarDatos() == true) {
            mymodel.rows.push(new row(
                mymodel.rows.length,
                $('#Id').val(),
                $('#Code').val(),
                $('#cliente').val(),
                Number($('#Quantity').val()),
                Number($('#Price').val())
            ))
            say(mymodel.rows[mymodel.rows.length - 1]);
            draw();
        }
    });

    $('#grandTotal').click(function () {
        if (mymodel.rows.length > 0) {
            //showmodal
            $("#modal0").modal('show');
            var x = document.getElementById("Resultado");
            if (x.style.display === "none") {
                x.style.display = "block";
                x.style.fontWeight = "bold";
            }

            let strEjemplo3 = "Total Cantidad = " + Number(document.getElementById("totalQuantity").innerHTML) + SEPARADOR + "productos. <br>";
            strEjemplo3 += "Total Precio = $" + Number(document.getElementById("totalPrice").innerHTML) + SEPARADOR + "<br>";
            strEjemplo3 += "IVA = 21% = $" + Number(document.getElementById("totalPrice").innerHTML) * 0.21 + SEPARADOR + "<br>";
            strEjemplo3 += "Total General = $" + Number(document.getElementById("totalPrice").innerHTML) * 1.21 + SEPARADOR + "<br>";
            document.getElementById("pResultados").innerHTML = strEjemplo3;
            //console.table(mymodel.rows);


            sortArray(mymodel.rows);
            say("Despues de ordenar");
            console.table(mymodel.rows);

        }
    });


})

function draw() {
    $('tbody').empty();
    var totalQuantity = 0;
    var totalPrice = 0;
    $.each(mymodel.rows, function (i, row) {
        totalQuantity += row.Quantity;
        totalPrice += row.Price * row.Quantity;
        var myrow = '<tr>';
        $.each(row, function (key, value) {
            if (key != "rowId") {
                myrow += '<td class="contenidoTabla">' + value + '</td>'
            }

        });
        myrow += '<td><button type="button" class="btn btn-outline-danger btnDelete" data-id="' + row.rowId + '" value="X"/><i class="fa fa-trash" aria-hidden="true"></i></button></td>'
        myrow += '<tr>'
        $('tbody').append(myrow);
    });
    $('#totalQuantity').text(totalQuantity)
    $('#totalPrice').text(totalPrice)
}