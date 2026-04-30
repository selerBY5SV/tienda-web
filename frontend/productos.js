const API_URL = 'http://localhost:3000/productos';

let productoEditando = null;

document.getElementById('btnGuardar').addEventListener('click', guardarProducto);
document.getElementById('btnCancelar').addEventListener('click', limpiarFormulario);

function cargarProductos() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            const lista = document.getElementById('listaProductos');
            lista.innerHTML = '';

            data.forEach(producto => {
                const li = document.createElement('li');

                li.innerHTML = `
                    ${producto.nombre} - ${producto.precio}€ - Stock: ${producto.stock}
                    <button onclick="editarProducto(${producto.id}, '${producto.nombre}', ${producto.precio}, ${producto.stock})">Editar</button>
                    <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
                `;

                lista.appendChild(li);
            });
        })
        .catch(() => {
            alert('Error al cargar productos');
        });
}

function guardarProducto() {
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const stock = document.getElementById('stock').value;

    if (!nombre || !precio || !stock) {
        alert('Rellena todos los campos');
        return;
    }

    const metodo = productoEditando ? 'PUT' : 'POST';
    const url = productoEditando ? `${API_URL}/${productoEditando}` : API_URL;

    fetch(url, {
        method: metodo,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, precio, stock })
    })
    .then(() => {
        limpiarFormulario();
        cargarProductos();
    })
    .catch(() => {
        alert('Error al guardar producto');
    });
}

function editarProducto(id, nombre, precio, stock) {
    productoEditando = id;
    document.getElementById('nombre').value = nombre;
    document.getElementById('precio').value = precio;
    document.getElementById('stock').value = stock;
    document.getElementById('tituloFormulario').textContent = 'Editar producto';
}

function eliminarProducto(id) {
    fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        cargarProductos();
    });
}

function limpiarFormulario() {
    productoEditando = null;
    document.getElementById('nombre').value = '';
    document.getElementById('precio').value = '';
    document.getElementById('stock').value = '';
    document.getElementById('tituloFormulario').textContent = 'Crear producto';
}

cargarProductos();