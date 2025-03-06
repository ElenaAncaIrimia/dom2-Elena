// Función para validar y procesar el formulario de registro
document
  .getElementById("registration-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe

    // Obtener los valores del formulario
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // Reiniciar los mensajes de error
    document.getElementById("username-error").textContent = "";
    document.getElementById("password-error").textContent = "";

    // Validar el nombre de usuario
    if (username.length < 3) {
      document.getElementById("username-error").textContent =
        "El nombre de usuario debe tener al menos 3 caracteres.";
      return;
    }

    // Validar la contraseña
    if (password.length < 6) {
      document.getElementById("password-error").textContent =
        "La contraseña debe tener al menos 6 caracteres.";
      return;
    }

    // Si todas las validaciones son exitosas, puedes continuar con el registro
    // Aquí puedes almacenar los datos del usuario en el almacenamiento local o enviarlos a un servidor

    // Almacenar en el almacenamiento local
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    // Mostrar un mensaje de registro exitoso
    let successMessage = `¡Registro exitoso! ${username}!`;
    document.getElementById("success-message").innerHTML = successMessage;
    document.getElementById("success-popup").style.display = "block";

    // Ocultar los inputs y el botón de registro
    document.getElementById("username").parentElement.style.display = "none";
    document.getElementById("password").parentElement.style.display = "none";
    document.getElementById("registro-btn").style.display = "none";

    // Mostrar el nombre del usuario en la parte superior
    document.getElementById("user-display").textContent = `Bienvenido/a: ${username}`;
});

// Función para cerrar la ventana emergente de registro exitoso
function closeSuccessPopup() {
    document.getElementById("success-popup").style.display = "none";
}
document.addEventListener("DOMContentLoaded", function () {
  const carouselTrack = document.querySelector(".carousel-track");
  const slides = document.querySelectorAll(".carousel-slide");

  if (carouselTrack && slides.length > 0) {
      const imageCount = slides.length;
      const duplicateCount = 5;

      // Duplicar las imágenes
      for (let i = 0; i < duplicateCount; i++) {
          slides.forEach((slide) => {
              carouselTrack.appendChild(slide.cloneNode(true));
          });
      }

      // Animación usando requestAnimationFrame
      let position = 0;
      const speed = 1; // Ajusta la velocidad

      function animate() {
          position -= speed;
          carouselTrack.style.transform = `translateX(${position}px)`;

          if (position <= -carouselTrack.scrollWidth / 2) {
              position = 0;
          }

          requestAnimationFrame(animate);
      }

      animate();
  } else {
      console.error("No se encontraron los elementos del carrusel.");
  }
});

function add() {
  // Obtener los valores del formulario
  let productName = document.querySelector(".product_name-input").value;
  let productPrice = document.querySelector(".product_price-input").value;
  let productQuantity = document.querySelector(".product_quantity-input").value;

  // Verificar si el precio o la cantidad son menores o iguales a 0 y no son nulos
  if (
    !productPrice ||
    !productQuantity ||
    parseFloat(productPrice) <= 0 ||
    parseFloat(productQuantity) <= 0
  ) {
    // Mostrar el mensaje de error
    document.getElementById("error-message").classList.remove("hidden");
    // Ocultar el mensaje de error después de 5 segundos
    setTimeout(function () {
      document.getElementById("error-message").classList.add("hidden");
    }, 5000);
    return; // Salir de la función si hay un error
  }
  // Crear un objeto producto
  let product = {
    name: productName,
    price: productPrice,
    quantity: productQuantity
  };

  // Obtener la lista de productos desde localStorage o inicializarla si no existe
  let productList = JSON.parse(localStorage.getItem("productList")) || [];

  //Evitar la duplicación de productos
if (productList.some(product => product.name === productName)) {
  alert("Este producto ya existe.");
  return;
}


  // Agregar el nuevo producto a la lista
  productList.push(product);
  

  // Guardar la lista actualizada en localStorage
  localStorage.setItem("productList", JSON.stringify(productList));

  // Actualizar la tabla
  updateTable();
}

// Función para cargar los productos en la tabla al cargar la página
function loadProducts() {
  let productList = JSON.parse(localStorage.getItem("productList")) || [];

  productList.forEach(function (product) {
    addProductToTable(product);
  });
}

// Función para agregar un producto a la tabla
function addProductToTable(product) {
  let tableBody = document.querySelector(".tbodyTable");

  let row = document.createElement("tr");
  row.innerHTML = `
   <td class="px-1 py-1 text-xs font-bold uppercase">${product.name}</td>
<td class="px-1 py-1 text-center text-xs">${product.price}€</td>
<td class="px-1 py-1  text-center text-xs">${product.quantity}</td>
<td class="px-1 py-1 text-xs">
    <div class="flex gap-2 justify-center items-center ">
        <button onclick="editProduct(this)" class="text-white bg-blue-400 hover:bg-blue-800 px-2 py-1 rounded-md sm:px-2 sm:py-1">
            <i class="fas fa-edit text-sm"></i> Editar
        </button>
        <button onclick="deleteProduct(this)" class="text-green-100 bg-red-400 hover:bg-red-800 px-2 py-1 rounded-md sm:px-2 sm:py-1">
            <i class="fas fa-trash-alt text-sm"></i> Eliminar
        </button>
    </div>
</td>
 
  `;

  tableBody.appendChild(row);
}
function editProduct(button) {
  let row = button.closest('tr');
  let productName = row.querySelector("td:nth-child(1)").innerText;
  let productPrice = row.querySelector("td:nth-child(2)").innerText;
  let productQuantity = row.querySelector("td:nth-child(3)").innerText;

  // Mostrar un cuadro de diálogo para editar
  let newName = prompt("Editar nombre del producto:", productName);
  let newPrice = parseFloat(prompt("Editar precio del producto:", productPrice.replace('€', '').trim()));  // Asegurar que se elimine el simbolo de euro
  let newQuantity = parseFloat(prompt("Editar cantidad del producto:", productQuantity));

  // Verificar si se cancela la edición
  if (newName === null || isNaN(newPrice) || isNaN(newQuantity)) {
    return;
  }

  // Actualizar los valores en la tabla
  row.querySelector("td:nth-child(1)").innerText = newName;
  row.querySelector("td:nth-child(2)").innerText = newPrice.toFixed(2);
  row.querySelector("td:nth-child(3)").innerText = newQuantity;

  // Obtener la lista de productos desde localStorage
  let productList = JSON.parse(localStorage.getItem("productList")) || [];

  // Buscar el producto original en la lista y actualizarlo
  let updatedList = productList.map(function (product) {
    if (product.name === productName) {
      return {
        name: newName,
        price: newPrice,
        quantity: newQuantity
      };
    }
    return product;
  });

  // Guardar la lista actualizada en localStorage
  localStorage.setItem("productList", JSON.stringify(updatedList));

  // Mostrar una alerta de éxito
  let alertElement = document.createElement("div");
  alertElement.textContent = `El producto "${productName}" ha sido editado correctamente.`;
  alertElement.classList.add("blue-alert");
  document.body.insertBefore(
    alertElement,
    document.querySelector(".productTable")
  );
  
  // Desaparecer la alerta después de 2 segundos
  setTimeout(function () {
    alertElement.remove();
  }, 2000);
}

// Función para actualizar la tabla
function updateTable() {
  // Limpiar la tabla
  let tableBody = document.querySelector(".tbodyTable");
  tableBody.innerHTML = "";

  // Cargar los productos actualizados en la tabla
  loadProducts();
}

// Función para eliminar un producto
function deleteProduct(button) {
  const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este producto?");
  if (!confirmDelete) return;
  
  console.log("Eliminar producto");

  // Obtener la fila que contiene el botón
  let row = button.closest('tr'); // Mejor usar closest() para asegurar que seleccionamos el tr
  // Eliminar la fila de la tabla
  row.remove();
  
  // Obtener el nombre del producto desde la primera celda de la fila
  let productName = row.querySelector("td:nth-child(1)").innerText;
  console.log("Producto a eliminar:", productName);

  // Obtener la lista de productos desde el almacenamiento local
  let productList = JSON.parse(localStorage.getItem("productList")) || [];

  // Filtrar los productos para eliminar el que coincida con el nombre
  let updatedList = productList.filter(function (product) {
    return product.name !== productName;
  });
  console.log("Lista actualizada:", updatedList); // Verificar la lista actualizada después de filtrar

  // Guardar la lista actualizada en localStorage
  localStorage.setItem("productList", JSON.stringify(updatedList));

  // Actualizar la tabla
  updateTable();
}

function updateTable() {
  console.log("Actualizar tabla"); // Verificar si se llama a la función updateTable()
  let tableBody = document.querySelector(".tbodyTable");
  tableBody.innerHTML = "";
  loadProducts();
}
function loadProducts() {
  let productList = JSON.parse(localStorage.getItem("productList")) || [];

  productList.forEach(function (product) {
    addProductToTable(product);
  });
}
// Cargar los productos al cargar la página
window.onload = loadProducts;