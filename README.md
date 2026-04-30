# Tienda Web

Consiste en un sistema completo con backend API REST, base de datos SQLite y frontend en HTML y JavaScript.

---

## Tecnologías utilizadas

- Node.js
- Express
- SQLite
- HTML
- JavaScript
- Fetch API
- Git y GitHub

---

## Funcionalidades

La aplicación permite gestionar tres entidades principales:

### Usuarios
- Crear usuario
- Ver usuarios
- Editar usuario
- Eliminar usuario

### Productos
- Crear producto
- Ver productos
- Editar producto
- Eliminar producto

### Pedidos
- Crear pedido
- Ver pedidos
- Editar pedido
- Eliminar pedido

---

## Relación entre entidades

La entidad **pedidos** relaciona usuarios y productos.

Un pedido contiene:
- Usuario
- Producto
- Cantidad

Esto permite representar un caso real en el que un usuario realiza pedidos de productos.

---

## Validación de stock

Se ha implementado una validación en el backend:

- No se permite crear un pedido si la cantidad solicitada supera el stock disponible.
- Cuando un pedido se crea correctamente, el stock del producto se actualiza automáticamente.

---

## Estructura del proyecto

tienda-web/
- backend/
  - src/
    - app.js
    - config/
    - routes/
    - services/
  - package.json
- frontend/
  - index.html
  - usuarios.html
  - productos.html
  - pedidos.html
  - index.js
  - productos.js
  - pedidos.js
- README.md

---

## Instalación y ejecución

1. Clonar repositorio  
   git clone URL_DEL_REPOSITORIO  

2. Acceder al backend  
   cd tienda-web/backend  

3. Instalar dependencias  
   npm install  

4. Ejecutar servidor  
   node src/app.js  

El servidor se iniciará en:  
http://localhost:3000  

5. Uso del frontend  
   Abrir en el navegador:  
   http://localhost:3000  

Desde el menú principal se puede acceder a:
- Gestión de usuarios
- Gestión de productos
- Gestión de pedidos

---

## API REST

Usuarios:
- GET /usuarios
- POST /usuarios
- PUT /usuarios/:id
- DELETE /usuarios/:id

Productos:
- GET /productos
- POST /productos
- PUT /productos/:id
- DELETE /productos/:id

Pedidos:
- GET /pedidos
- POST /pedidos
- PUT /pedidos/:id
- DELETE /pedidos/:id

---

## Control de versiones

El desarrollo del proyecto se ha realizado utilizando Git y GitHub, organizando el trabajo mediante ramas y Pull Requests para cada funcionalidad:

- CRUD usuarios
- CRUD productos
- Frontend usuarios
- Frontend productos
- Menú principal
- Relación entre entidades (pedidos)
- Validación de stock