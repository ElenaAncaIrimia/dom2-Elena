<template>
  <div>
    <form @submit.prevent="submitForm" class="flex flex-wrap justify-end items-center mt-5 mr-10">
      <div class="mb-4 w-full md:w-auto">
        <input v-model="username" type="text" placeholder="Nombre de Usuario:" required class="text-blue text-sm block w-full border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:border-blue-400">
        <div v-if="usernameError" class="error-message">{{ usernameError }}</div>
      </div>
      <div class="mb-4 w-full md:w-auto mt-5 md:mt-0 md:ml-4 h-auto">
        <input v-model="password" type="password" placeholder="Contraseña:" required class="text-blue text-sm block w-full border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:border-blue-400">
        <div v-if="passwordError" class="error-message">{{ passwordError }}</div>
      </div>
      <button type="submit" class="bg-blue-400 hover:bg-blue-700 text-white text-md py-1 px-2 mb-10 rounded focus:outline-none focus:shadow-outline md:mt-0 md:ml-4">Registrarse</button>
    </form>
    <!-- Ventana emergente de registro exitoso -->
    <div v-if="successMessage" class="success-popup">
      <div class="success-content">
        <span class="close" @click="closeSuccessPopup">&times;</span>
        <p>{{ successMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      usernameError: '',
      passwordError: '',
      successMessage: ''
    };
  },
  methods: {
    submitForm() {
      this.usernameError = '';
      this.passwordError = '';

      if (this.username.length < 3) {
        this.usernameError = 'El nombre de usuario debe tener al menos 3 caracteres.';
        return;
      }

      if (this.password.length < 6) {
        this.passwordError = 'La contraseña debe tener al menos 6 caracteres.';
        return;
      }

      // Aquí puedes realizar acciones adicionales, como enviar los datos a un servidor
      // y mostrar un mensaje de éxito después de que se haya completado el registro
      localStorage.setItem("username", this.username);
      localStorage.setItem("password", this.password);

      this.successMessage = `¡Registro exitoso! Bienvenido, ${this.username}!`;
      this.$emit('register', this.successMessage);
      console.log('Evento register emitido con el mensaje:', this.successMessage); // Aquí colocamos el console.log
      // Puedes agregar lógica adicional aquí, como restablecer los campos del formulario
      this.username = '';
      this.password = '';
    },
    closeSuccessPopup() {
      this.successMessage = '';
    }
  }
};
</script>

<style>
h1 {
  background-color: #BFDBFE; /* bg-blue-200 */
  display: flex; /* flex */
  justify-content: center; /* justify-center */
  font-size: 2rem; /* text-2xl */
  font-weight: 600; /* font-semibold */
  margin-top: 3.75rem; /* mt-15 */
  color: #2F855A; /* text-green-800 */
  transition: color 0.3s ease-in-out; /* transition duration-300 ease-in-out */
}
h1:hover {
  color: #000; /* hover:text-black */
}

/* Estilos específicos del componente */
.error-message {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

.success-popup {
  display: none;
  position: fixed;
  z-index: 9999;
  left: 50%;
  top: 23.8%;
  transform: translate(-50%, -50%);
  background-color: rgba(117, 222, 133, 0.326);
  width: 300px;
  padding: 11px;
  border-radius: 10px;
  color: white;
}

.success-content {
  position: relative;
}

.close {
  position: absolute;
  top: -15px;
  right: -6px;
  font-size: 20px;
  cursor: pointer;
}

/* Agrega aquí los estilos adicionales según sea necesario */
</style>