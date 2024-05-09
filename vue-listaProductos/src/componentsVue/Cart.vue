<template>
    <div class="cart">
      <h2>Lista de productos</h2>
      <ul>
        <li v-for="(item, index) in items" :key="index">
          {{ item.name }} - {{ item.price }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Cart',
    props: {
      items: {
        type: Array,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos específicos del componente */
  .cart {
    border: 1px solid #ccc;
    padding: 10px;
    margin-top: 20px;
  }
  
  .cart h2 {
    margin-bottom: 10px;
  }
  
  .cart ul {
    list-style-type: none;
    padding: 0;
  }
  
  .cart li {
    margin-bottom: 5px;
  }
  </style>