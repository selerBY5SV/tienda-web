const API_PEDIDOS = 'http://localhost:3000/pedidos';
const API_USUARIOS = 'http://localhost:3000/usuarios';
const API_PRODUCTOS = 'http://localhost:3000/productos';

let pedidoEditando = null;

document.getElementById('btnGuardar').addEventListener('click', guardarPedido);
document.getElementById('btnCancelar').addEventListener('click', limpiarFormulario);

// Cargar usuarios en select
function cargarUsuarios() {
    fetch(API_USUARIOS)
        .then(res => res.json())
        .then(data => {
            const select = document.getElementById('usuario');
            select.innerHTML = '';

            data.forEach(usuario => {
                const option = document.createElement('option');
                option.value = usuario.id;
                option.textContent = usuario.nombre;
                select.appendChild(option);
            });
        });
}

// Cargar productos en select
function cargarProductos() {
    fetch(API_PRODUCTOS)
        .then(res => res.json())
        .then(data => {
            const select = document.getElementById('producto');
            select.innerHTML = '';

            data.forEach(producto => {
                const option = document.createElement('option');
                option.value = producto.id;
                option.textContent = producto.nombre;
                select.appendChild(option);
            });
        });
}

// Cargar pedidos
function cargarPedidos() {
    fetch(API_PEDIDOS)
        .then(res => res.json())
        .then(data => {
            const lista = document.getElementById('listaPedidos');
            lista.innerHTML = '';

            data.forEach(pedido => {
                const li = document.createElement('li');

                li.innerHTML = `
                    ${pedido.usuario} compra ${pedido.producto} (Cantidad: ${pedido.cantidad})
                    <button onclick="editarPedido(${pedido.id}, ${pedido.usuario_id}, ${pedido.producto_id}, ${pedido.cantidad})">Editar</button>
                    <button onclick="eliminarPedido(${pedido.id})">Eliminar</button>
                `;

                lista.appendChild(li);
            });
        });
}

// Guardar pedido
function guardarPedido() {
    const usuario_id = document.getElementById('usuario').value;
    const producto_id = document.getElementById('producto').value;
    const cantidad = document.getElementById('cantidad').value;

    if (!usuario_id || !producto_id || !cantidad) {
        alert('Rellena todos los campos');
        return;
    }

    const metodo = pedidoEditando ? 'PUT' : 'POST';
    const url = pedidoEditando ? `${API_PEDIDOS}/${pedidoEditando}` : API_PEDIDOS;

    fetch(url, {
    method: metodo,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario_id, producto_id, cantidad })
})
.then(res => res.json().then(data => ({ status: res.status, body: data })))
.then(result => {
    if (result.status !== 201 && result.status !== 200) {
        alert(result.body.error);
        return;
    }

    limpiarFormulario();
    cargarPedidos();
})
.catch(() => {
    alert('Error al crear pedido');
});
}

// Editar pedido
function editarPedido(id, usuario_id, producto_id, cantidad) {
    pedidoEditando = id;
    document.getElementById('usuario').value = usuario_id;
    document.getElementById('producto').value = producto_id;
    document.getElementById('cantidad').value = cantidad;
    document.getElementById('tituloFormulario').textContent = 'Editar pedido';
}

// Eliminar pedido
function eliminarPedido(id) {
    fetch(`${API_PEDIDOS}/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        cargarPedidos();
    });
}

// Limpiar formulario
function limpiarFormulario() {
    pedidoEditando = null;
    document.getElementById('cantidad').value = '';
    document.getElementById('tituloFormulario').textContent = 'Crear pedido';
}

// Inicializar
cargarUsuarios();
cargarProductos();
cargarPedidos();