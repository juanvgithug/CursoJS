/*
Autor: Juan Vidal
Camada: 14365
*/
/* JS Toolkit */


/* Constantes y Variables */
const SEPARADOR = " ";
const THEME_LIGHT = "<i class=\"far fa-lightbulb\"></i>"; 
const THEME_DARK = "<i class=\"fas fa-lightbulb\"></i>"; 
const LOCAL_STORAGE_KEY = "toggle-cursojs-theme";
const LOCAL_META_DATA = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
const DARK_THEME_PATH = "css/style.dark.css";
const DARK_THEME_PATH2 = "../css/style.dark.css";

let isDark = LOCAL_META_DATA && LOCAL_META_DATA.isDark;
var DARK_STYLE_LINK = document.getElementById("dark-theme-style");
var THEME_TOGGLER = document.getElementById("theme-toggler");

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

/*    Salida a consola + call stack */
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


/*    Emitir alerta en browser y consola. */
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

/* Activar / Desactivar el modo DARK | Almacenar en local storage. */
function toggleTheme() {
  isDark = !isDark;
  if (isDark) {
    enableDarkTheme();
  } else {
    disableDarkTheme();
  }
  const META = {
    isDark
  };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(META));
}

function enableDarkTheme() {
  let arrLocation = window.location.href.split("/");

  switch (arrLocation[arrLocation.length - 1]) {
    case "index.html":
      DARK_STYLE_LINK.setAttribute("href", DARK_THEME_PATH);
      break;
    case "about.html":
      DARK_STYLE_LINK.setAttribute("href", DARK_THEME_PATH);
      break;
    default:
      DARK_STYLE_LINK.setAttribute("href", DARK_THEME_PATH2);
      break;
  }
  THEME_TOGGLER.innerHTML = THEME_DARK;
}

function disableDarkTheme() {
  DARK_STYLE_LINK.setAttribute("href", "");
  THEME_TOGGLER.innerHTML = THEME_LIGHT;
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
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
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

/* Order an Array / Toggle ascending|descending */
function sortArray(a, isAscending) {
  var currentSort = a["my_sort_order"];
  if (typeof currentSort != 'boolean') {
    // assume it be unsorted, use sort alogorithm
    a.sort(function (a, b) {
      //say(a[7]+" "+b[7]);
      return isAscending ? a - b[8] : b - a;
    }); // assuming numerical array, modify as per your needs

  } else if (currentSort != isAscending) {
    // sorted but in different order, reverse the order
    a.reverse(); // or use for loop
  }
  // set the sort order
  a["my_sort_order"] = isAscending ? true : false;
}

function multiSort(array, sortObject = {}) {
  const sortKeys = Object.keys(sortObject);

  // Return array if no sort object is supplied.
  if (!sortKeys.length) {
    return array;
  }

  // Change the values of the sortObject keys to -1, 0, or 1.
  for (let key in sortObject) {
    sortObject[key] = sortObject[key] === 'desc' || sortObject[key] === -1 ? -1 : (sortObject[key] === 'skip' || sortObject[key] === 0 ? 0 : 1);
  }

  const keySort = (a, b, direction) => {
    direction = direction !== null ? direction : 1;

    if (a === b) { // If the values are the same, do not switch positions.
      return 0;
    }

    // If b > a, multiply by -1 to get the reverse direction.
    return a > b ? direction : -1 * direction;
  };

  return array.sort((a, b) => {
    let sorted = 0;
    let index = 0;

    // Loop until sorted (-1 or 1) or until the sort keys have been processed.
    while (sorted === 0 && index < sortKeys.length) {
      const key = sortKeys[index];

      if (key) {
        const direction = sortObject[key];

        sorted = keySort(a[key], b[key], direction);
        index++;
      }
    }

    return sorted;
  });
}