const API_URL = 'http://localhost:3000/usuarios';

let usuarioEditando = null;

document.getElementById('btnGuardar').addEventListener('click', guardarUsuario);
document.getElementById('btnCancelar').addEventListener('click', limpiarFormulario);

function cargarUsuarios() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            const lista = document.getElementById('listaUsuarios');
            lista.innerHTML = '';

            data.forEach(usuario => {
                const li = document.createElement('li');

                li.innerHTML = `
                    ${usuario.nombre} - ${usuario.email}
                    <button onclick="editarUsuario(${usuario.id}, '${usuario.nombre}', '${usuario.email}')">Editar</button>
                    <button onclick="eliminarUsuario(${usuario.id})">Eliminar</button>
                `;

                lista.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error al cargar usuarios:', error);
            alert('Error al cargar usuarios. Revisa que el backend esté encendido.');
        });
}

function guardarUsuario() {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;

    if (!nombre || !email) {
        alert('Debes rellenar nombre y email');
        return;
    }

    const metodo = usuarioEditando ? 'PUT' : 'POST';
    const url = usuarioEditando ? `${API_URL}/${usuarioEditando}` : API_URL;

    fetch(url, {
        method: metodo,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, email })
    })
    .then(res => res.json())
    .then(() => {
        limpiarFormulario();
        cargarUsuarios();
    })
    .catch(error => {
        console.error('Error al guardar usuario:', error);
        alert('Error al guardar usuario');
    });
}

function editarUsuario(id, nombre, email) {
    usuarioEditando = id;
    document.getElementById('nombre').value = nombre;
    document.getElementById('email').value = email;
    document.getElementById('tituloFormulario').textContent = 'Editar usuario';
}

function eliminarUsuario(id) {
    fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        cargarUsuarios();
    })
    .catch(error => {
        console.error('Error al eliminar usuario:', error);
        alert('Error al eliminar usuario');
    });
}

function limpiarFormulario() {
    usuarioEditando = null;
    document.getElementById('nombre').value = '';
    document.getElementById('email').value = '';
    document.getElementById('tituloFormulario').textContent = 'Crear usuario';
}

cargarUsuarios();