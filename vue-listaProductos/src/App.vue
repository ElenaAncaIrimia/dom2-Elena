<template>
  <div id="app" class="flex justify-center items-center h-screen">
    <div class="w-full max-w-md">
      <h1 class="text-2xl font-semibold mb-8 text-center">Administrador de Lista de Productos</h1>
      
      <!-- Mostrar el formulario de registro -->
      <RegistrationForm @register="handleRegister" />
      
      <!-- Ventana emergente de registro exitoso -->
      <div v-if="successMessage" class="success-popup mt-4">
        <div class="success-content">
          <span class="close" @click="closeSuccessPopup">&times;</span>
          <p>{{ successMessage }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Importa el componente RegistrationForm.vue
import RegistrationForm from './componentsVue/RegistrationForm.vue';

export default {
  name: 'App',
  components: {
    // Registra el componente en el objeto components
    RegistrationForm
  },
  data() {
    return {
      successMessage: ''
    };
  },
  methods: {
    handleRegister(message) {
      console.log('Mensaje de registro recibido:', message); // Aquí colocamos el console.log para verificar el mensaje recibido
      this.successMessage = message;
    },
    closeSuccessPopup() {
      this.successMessage = '';
    }
  }
};
</script>

<style>
/* Estilos específicos del componente */




.close {
  position: absolute;
  top: -15px;
  right: -6px;
  font-size: 20px;
  cursor: pointer;
}

/* Agrega estilos adicionales según sea necesario */
</style>