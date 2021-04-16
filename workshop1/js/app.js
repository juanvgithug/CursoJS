/* Selectores */
const listaProductos = document.querySelector('#lista-productos');
const carritoHTML = document.querySelector('#lista-carrito tbody');
const btnVaciarCarrito = document.querySelector('#vaciar-carrito');
/* Variables */
let carrito = [];

/* Listeners */
listaProductos.addEventListener('click', agregarProducto);
carritoHTML.addEventListener('click', borrarProducto);
btnVaciarCarrito.addEventListener('click', vaciarCarrito);

document.addEventListener('DOMContentLoaded', () => {
	carrito = JSON.parse(localStorage.getItem('carrito')) || [];

	actualizarCarritoHTML();
})

function vaciarCarrito() {
	carrito = [];
	/* Actualizo carrito en el HTML y en el storage */
	actualizarCarritoHTML();
	actualizarStorage();
}

function borrarProducto(e) {
	e.preventDefault();
	if (e.target.classList.contains('borrar-producto')) {
		const id = e.target.getAttribute('data-id');

		/* Filtro los productos con un id distinto al que se quiere borrar */
		carrito = carrito.filter(producto => producto.id !== id);

		/* Actualizo carrito en el HTML y en el storage */
		actualizarCarritoHTML();
		actualizarStorage();
	}
}

function agregarProducto(e) {
	e.preventDefault();

	/* Verifico si se hizo click en Agregar al Carrito */
	if (e.target.classList.contains('agregar-carrito')) {
		/* Obtengo el card del producto seleccionado */
		const cardProducto = e.target.parentElement.parentElement;

		/* Paso el card a la funcion para obtener los datos */
		obtenerDatosProducto(cardProducto);
	}
}

function obtenerDatosProducto(card) {

	/* Obtenemos las propiedades del producto */
	const producto = {
		nombre: card.querySelector('h4').textContent,
		precio: card.querySelector('.precio span').textContent,
		imagen: card.querySelector('img').getAttribute('src'),
		cantidad: 1,
		id: card.querySelector('a').dataset.id
	}

	/* Verifico si el producto ya existe en el carrito */
	const prodExistente = carrito.find(prod => prod.id === producto.id);

	if (prodExistente) {
		/* Actualizo la cantidad de un producto existente */
		const productos = carrito.map(producto => {
			if (producto.id === prodExistente.id) {
				producto.cantidad++;
				return producto;
			} else {
				return producto;
			}
		});

		// carrito.forEach(producto => {
		// 	if (producto.id === prodExistente.id) {
		// 		producto.cantidad++;
		// 	}
		// })

		// carrito = [ productos[0], productos[1], productos[2], ... ];
		// console.log(productos);
		carrito = [...productos];
	} else {
		/* Inserto el producto en el arreglo de carrito */
		carrito.push(producto);
		// carrito = [...carrito, producto];
	}

	/* Inserto el carrito en el HTML */
	actualizarCarritoHTML();

	/* Actualizar storage */
	actualizarStorage();
}

function actualizarCarritoHTML() {

	carritoHTML.innerHTML = '';

	carrito.forEach(producto => {
		/* Extraemos las propiedades del objeto producto (destructuring) */
		const { nombre, precio, imagen, cantidad, id } = producto;

		/* Creaamos la fila para insertar en la tabla con los datos de los productos
			(Probar de hacer con scripting!!) */
		const row = document.createElement('tr');
		row.innerHTML = `
			<td>
				<img src="${imagen}">
			</td>
			<td>
				${nombre}
			</td>
			<td>
				${precio}
			</td>
			<td>
				${cantidad}
			</td>
			<td>
				<a href="#" class="borrar-producto" data-id="${id}">X</a>
			</td>
		`
		carritoHTML.appendChild(row);
	});
}

function actualizarStorage() {
	/* Guardamos en el localStorage el contenido del arreglo global carrito */
	localStorage.setItem('carrito', JSON.stringify(carrito));
}