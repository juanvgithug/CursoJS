/*
Autor: Juan Vidal
Camada: 14365
*/

/* Constantes y Variables */
var countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central Arfrican Republic", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauro", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];
var lastSort = 0;
/* 2da Entrega Proy Final */
var myTableArray = [];
var myChart;

function funcCloseGrandTotal() {
    $("#modal0").modal('hide');
}


function funcCloseCharts() {
    $("#modal1").modal('hide');
    try {
        myChart.destroy();
    } catch (error) {
        say(error);
    }

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

//DOM READY: add functions to table form buttons
$(function () {

    say("DOM Ready.");

    $("body").on("click", ".btnDelete", function () {
        var id = $(this).data('id');
        for (i = 0; i < mymodel.rows.length; i++) {
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
                $('#myInput').val(),
                Number($('#Quantity').val()),
                Number($('#Price').val())
            ))
            multiSort(mymodel.rows, {
                countryName: 'asc'
            });
            draw();
        }
    });

    $('#clearList').click(function () {
        if (validarDatos() == true) {
            mymodel.rows.length = 0;
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

    $('#btnGraph').click(function () {
        if (mymodel.rows.length > 0) {
            //showmodal
            $("#modal1").modal('show');
            var x = document.getElementById("Resultado");
            if (x.style.display === "none") {
                x.style.display = "block";
                x.style.fontWeight = "bold";
            }
            loadCharts();
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

    if (totalQuantity == 0 && totalPrice == 0) {
        //say ("Lista vacía");
        grayOutButtons();
    } else {
        enableButtons();
    }

    let select = document.getElementById("Id");
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

    var x = document.getElementById("Id");
    x.addEventListener("keyup", function (event) {
        if (event.key == 'Enter') {
            document.getElementById("Code").focus();
        }
    });

    x = document.getElementById("Code");
    x.addEventListener("keyup", function (event) {
        if (event.key == 'Enter') {
            document.getElementById("cliente").focus();
        }
    });

    x = document.getElementById("cliente");
    x.addEventListener("keyup", function (event) {
        if (event.key == 'Enter') {
            document.getElementById("myInput").focus();
        }
    });

    x = document.getElementById("myInput");
    x.addEventListener("keyup", function (event) {
        if (event.key == 'Enter') {
            document.getElementById("Quantity").focus();
        }
    });

    x = document.getElementById("Quantity");
    x.addEventListener("keyup", function (event) {
        if (event.key == 'Enter') {
            document.getElementById("Price").focus();
        }
    });


    x = document.getElementById("Price");
    x.addEventListener("keyup", function (event) {
        if (event.key == 'Enter') {
            document.getElementById("add").focus();
        }
    });

    /*
        x = document.getElementById("add");
        x.addEventListener("keyup", function (event) {
            if (event.key == 'Enter') {
                document.getElementById("add").click();
            }
        });
    */

}

//Listen for the "S" KEY to sort the list.
function addSortKeyHandler() {
    document.addEventListener("keyup", function (event) {
        if (event.code == 'KeyS') {
            sortPrice();
        }
    });
}

//gray out buttons for page reset/first load
function grayOutButtons() {
    var x = document.getElementById("grandTotal");
    x.disabled = true;
    x = document.getElementById("btnSort");
    x.disabled = true;
    x = document.getElementById("clearList");
    x.disabled = true;
    x = document.getElementById("btnGraph");
    x.disabled = true;
}

//enable buttons for page reset/first load
function enableButtons() {
    var x = document.getElementById("grandTotal");
    x.disabled = false;
    x = document.getElementById("btnSort");
    x.disabled = false;
    x = document.getElementById("clearList");
    x.disabled = false;
    x = document.getElementById("btnGraph");
    x.disabled = false;
}

//show charts
function BuildChart(labels, values, chartTitle) {
    try {
        myChart.destroy();
    } catch (error) {
        say(error);
    }
    var ctx = document.getElementById("myChart").getContext('2d');
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels, // Our labels
            datasets: [{
                label: chartTitle, // Name the series
                data: values, // Our values
                backgroundColor: [ // Specify custom colors
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [ // Add custom color borders
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1 // Specify bar border width
            }]
        },
        options: {
            responsive: true, // Instruct chart js to respond nicely.
            //maintainAspectRatio: false, // Add to prevent default behavior of full-width/height 
            grouped: true,
            skipNull: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    return myChart;
}

function loadCharts() { // HTML To JSON Script 
    var table = document.getElementById('prodTable'); //prodTable
    var json = []; // first row needs to be headers 
    var headers = [];
    for (var i = 0; i < table.rows[0].cells.length - 1; i++) {
        headers[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi, '');
    }
    // go through cells 
    for (var i = 1; i < table.rows.length - 2; i++) {
        var tableRow = table.rows[i];
        var rowData = {};

        //say (tableRow);    
        for (var j = 0; j < tableRow.cells.length - 2; j++) {
            rowData[headers[j]] = tableRow.cells[j].innerHTML;
        }
        json.push(rowData);
        var filtered = JSON.parse(JSON.stringify(json.filter(function (el) {
            // keep element if it's not an object, or if it's a non-empty object
            return typeof el != "object" || Array.isArray(el) || Object.keys(el).length > 0;
        })));
    }
    console.log(filtered);

    var result = [];
    filtered.reduce(function (res, value) {
        if (!res[value.pais]) {
            res[value.pais] = {
                pais: value.pais,
                cantidad: 0
            };
            result.push(res[value.pais])
        }
        res[value.pais].cantidad += Number(value.cantidad)
        return res;
    }, {});
    console.log(filtered);


    // Map json values back to label array
    var labels = result.map(function (e) {
        return e.pais;
    });
    console.log("Labels: " + labels);

    // Map json values back to values array
    var values = result.map(function (e) {
        return e.cantidad;
    });
    console.log("Values: " + values);
    var chart = BuildChart(labels, values, "Cantidad de unidades por país");

}
