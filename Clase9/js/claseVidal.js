/*
Autor: Juan Vidal
Camada: 14365
*/

/* Constantes y Variables */
var countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central Arfrican Republic", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauro", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];
var lastSort = 0;
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
function row(rowId, txtId, Code, Client, countryName, Quantity, Price) {
    this.rowId = rowId;
    this.txtId = txtId;
    this.Code = Code;
    this.Client = Client;
    this.countryName = countryName;
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

//add functions to table form buttons
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
                $('#myAutoComplete').val(),
                Number($('#Quantity').val()),
                Number($('#Price').val())
            ))
            //say(mymodel.rows[mymodel.rows.length - 1]);
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


            let strTotCant = Number(document.getElementById("totalQuantity").innerHTML) + SEPARADOR + "producto(s)";
            document.getElementById("totCant").innerHTML = strTotCant;

            let strTotPrecio = "ARS" + SEPARADOR + Number(document.getElementById("totalPrice").innerHTML);
            document.getElementById("totPrecio").innerHTML = strTotPrecio;

            let strTotIVA = "ARS" + SEPARADOR + Math.round((Number(document.getElementById("totalPrice").innerHTML) * 0.21 + Number.EPSILON) * 100) / 100;
            document.getElementById("totIVA").innerHTML = strTotIVA;

            let strTotGeneral = "ARS" + SEPARADOR + Math.round((Number(document.getElementById("totalPrice").innerHTML) * 1.21 + Number.EPSILON) * 100) / 100;
            document.getElementById("totGeneral").innerHTML = strTotGeneral;


        }
    });


})

//draw table from array
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

    let btnTotal = document.getElementById('grandTotal');
    let btnSort = document.getElementById('btnSort');
    if (totalQuantity == 0 && totalPrice == 0) {
        //say ("Lista vacía");
        btnTotal.disabled = true;
        btnSort.disabled = true;
    } else {
        btnTotal.disabled = false;
        btnSort.disabled = false;
    }

    let select = document.getElementById("prodTable");
    select.focus();
    
}

//Fill combobox option
function loadCombo() {

    let options = ["Producto", "Servicio"];
    let select = document.getElementById("cliente");

    let el0 = document.createElement("option");
    el0.textContent = "Seleccione";
    el0.selected = "selected";
    el0.value = "";
    select.appendChild(el0);

    for (let n = 0; n < options.length; n++) {
        var opt = options[n];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }

    draw();

}

//Toggle sort by "Total" column
function sortPrice() {
    if (lastSort == 0) {
        lastSort = 1;
    } else {
        lastSort = 0;
    }

    switch (lastSort) {
        case 0:
            multiSort(mymodel.rows, {
                Total: 'desc'
            });
            break;
        case 1:
            multiSort(mymodel.rows, {
                Total: 'asc'
            });
            break;
    }
    //say("Despues de ordenar");
    //console.table(mymodel.rows);
    draw();

}

function autocomplete(inp, arr) {
    var currentFocus;
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {

            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                b = document.createElement("DIV");
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function (e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });

    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) { //up
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

//Listen for ENTER to add item to list.
function addElementKeyHandler() {
    document.addEventListener("keyup", function (event) {
        if (event.key == 'Enter') {
            document.getElementById("add").click();
        }
    });
}

//Listen for the "S" KEY to sort the list.
function addSortKeyHandler() {
    document.addEventListener("keyup", function (event) {
        if (event.code == 'KeyS') {
            sortPrice();
        }
    });
}