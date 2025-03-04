# Proyecto de Gestión de Productos

Este proyecto permite gestionar un inventario de productos mediante una interfaz web. Se pueden agregar, editar y eliminar productos, almacenando los datos en el `localStorage` del navegador.

## Tecnologías Utilizadas

- **HTML**: Para la estructura de la interfaz.
- **CSS**: Para el diseño y estilos.
- **JavaScript**: Para la lógica de la aplicación.
- **LocalStorage**: Para almacenar los productos de manera persistente en el navegador.

## Estructura del Proyecto

```
📂 MiProyecto
│── 📄 index.html     # Archivo principal con la estructura HTML
│── 📄 index.js       # Lógica del manejo de productos y eventos
│── 📄 styles.css     # Estilos de la interfaz
│── 📄 README.md      # Documentación del proyecto
```

## Funcionalidades

✅ **Registro de usuarios**: Permite a los usuarios registrarse con un nombre y contraseña.

✅ **Agregar productos**: Introducir nombre, precio y cantidad de productos.

✅ **Editar productos**: Modificar información de productos existentes.

✅ **Eliminar productos**: Eliminar productos de la lista.

✅ **Almacenamiento persistente**: Usa `localStorage` para guardar datos entre sesiones.


## Código Destacado

### Registro de Usuarios
```js
// Función para validar y procesar el formulario de registro
document.getElementById("registration-form").addEventListener("submit", function (event) {
    event.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    if (username.length < 3) {
        document.getElementById("username-error").textContent = "El nombre de usuario debe tener al menos 3 caracteres.";
        return;
    }
    if (password.length < 6) {
        document.getElementById("password-error").textContent = "La contraseña debe tener al menos 6 caracteres.";
        return;
    }
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    document.getElementById("success-message").textContent = `¡Registro exitoso! Bienvenido, ${username}!`;
    document.getElementById("success-popup").style.display = "block";
});
```

### Agregar Producto
```js
function add() {
    let productName = document.querySelector(".product_name-input").value;
    let productPrice = document.querySelector(".product_price-input").value;
    let productQuantity = document.querySelector(".product_quantity-input").value;
    if (!productPrice || !productQuantity || parseFloat(productPrice) <= 0 || parseFloat(productQuantity) <= 0) {
        document.getElementById("error-message").classList.remove("hidden");
        setTimeout(() => document.getElementById("error-message").classList.add("hidden"), 5000);
        return;
    }
    let product = { name: productName, price: productPrice, quantity: productQuantity };
    let productList = JSON.parse(localStorage.getItem("productList")) || [];
    productList.push(product);
    localStorage.setItem("productList", JSON.stringify(productList));
    updateTable();
}
```

## Notas Adicionales
- Asegúrate de que tu navegador permite el uso de `localStorage`.
- No es necesario instalar dependencias adicionales.

## 📧 Contacto
Si tienes preguntas o sugerencias, ¡contáctame!

💡 **Autor**: [Elena Irimia](https://www.linkedin.com/in/elena-irimia/)
