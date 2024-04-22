
function add() {
    // Obtener los valores del formulario
    let productName = document.querySelector(".product_name-input").value;
    let productPrice = document.querySelector(".product_price-input").value;
  
    // Crear un objeto producto
    let product = {
      name: productName,
      price: productPrice
    };
  
    // Obtener la lista de productos desde localStorage o inicializarla si no existe
    let productList = JSON.parse(localStorage.getItem('productList')) || [];
  
    // Agregar el nuevo producto a la lista
    productList.push(product);
  
    // Guardar la lista actualizada en localStorage
    localStorage.setItem('productList', JSON.stringify(productList));
  
    // Actualizar la tabla
    updateTable();
  }
  
  // Función para cargar los productos en la tabla al cargar la página
  function loadProducts() {
    let productList = JSON.parse(localStorage.getItem('productList')) || [];
  
    productList.forEach(function(product) {
      addProductToTable(product);
    });
  }
  
  // Función para agregar un producto a la tabla
  function addProductToTable(product) {
    let tableBody = document.querySelector('.tbodyTable');
  
    let row = document.createElement('tr');
    row.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap">${product.name}</td>
      <td class="px-6 py-4 whitespace-nowrap">${product.price}</td>
      <td class="px-6 py-4 whitespace-nowrap">
        <button onclick="edit(this)" class="text-blue-600 hover:text-blue-900">Editar</button>
        <button onclick="deleteProduct(this)" class="text-red-600 hover:text-red-900">Eliminar</button>
      </td>
    `;
  
    tableBody.appendChild(row);
  }
  
  // Función para actualizar la tabla
  function updateTable() {
    // Limpiar la tabla
    let tableBody = document.querySelector('.tbodyTable');
    tableBody.innerHTML = '';
  
    // Cargar los productos actualizados en la tabla
    loadProducts();
  }
  
  // Función para eliminar un producto
  function deleteProduct(button) {
    let row = button.parentNode.parentNode;
    let productName = row.querySelector('td:first-child').innerText;
  
    let productList = JSON.parse(localStorage.getItem('productList')) || [];
  
    // Filtrar los productos para eliminar el que coincida con el nombre
    let updatedList = productList.filter(function(product) {
      return product.name !== productName;
    });
  
    // Guardar la lista actualizada en localStorage
    localStorage.setItem('productList', JSON.stringify(updatedList));
  
    // Actualizar la tabla
    updateTable();
  }
  
  // Cargar los productos al cargar la página
  window.onload = loadProducts;