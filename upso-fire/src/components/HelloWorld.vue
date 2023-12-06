<template>
  <div class="container my-4  bg-info-subtle text-emphasis-info rounded font-monospace">
    <div class="row justify-content-center">
      <div class="col-md-6 ">
        <button class="btn btn-primary m-2" @click="mostrarLoginForm = true">
          Iniciar Sesión
        </button>
        <button class="btn btn-secondary m-2" @click="mostrarLoginForm = false">
          Registrarse
        </button>

        <form v-if="mostrarLoginForm" @submit.prevent="login" class="mt-4">
          <h2>Iniciar Sesión</h2>
          <div class="form-group">
            <label for="emailLogin">Email</label>
            <input
              type="email"
              class="form-control"
              id="emailLogin"
              v-model="email"
            />
          </div>
          <div class="form-group ">
            <label for="passwordLogin">Contraseña</label>
            <input
              type="password"
              class="form-control"
              id="passwordLogin"
              v-model="password"
            />
          </div>
          <button type="submit" class="btn btn-success mt-5">
            Iniciar Sesión
          </button>
        </form>
        <form v-else class="mt-4" @submit.prevent="register">
          <h2>Registrarse</h2>
          <div class="form-group">
            <label for="emailRegister">Email</label>
            <input
              type="email"
              class="form-control"
              id="emailRegister"
              v-model="emailSign"
            />
          </div>
          <div class="form-group">
            <label for="passwordRegister">Contraseña</label>
            <input
              type="password"
              class="form-control"
              id="passwordRegister"
              v-model="passwordSign"
            />
          </div>
          <div class="form-group">
            <label for="passwordRegisterRepeat">Repetir Contraseña</label>
            <input
              type="password"
              class="form-control"
              id="passwordRegisterRepeat"
              v-model="passwordCompare"
            />
          </div>
          <button type="submit" class="btn btn-success mt-5">Registrarse</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { auth } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Swal from "sweetalert2";

@Component
export default class HelloWorld extends Vue {
  mostrarLoginForm: boolean = true;
  email: string = "";
  password: string = "";
  emailSign: string = "";
  passwordSign: string = "";
  passwordCompare: string = "";

  // Creamos los métodos para iniciar sesión y registrarse
  login() {
    signInWithEmailAndPassword(auth, this.email, this.password)
      .then((credenciales) => {
        // Signed in
        const user = credenciales.user;
        console.log(user);
        //window.alert("Inicio de sesión exitoso");
        Swal.fire({
          title: "Registro exitoso",
          text: "Usuario autenticado correctamente",
          icon: "success",
          confirmButtonText: "Ir a la LISTA DE TAREAS",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
        }).then((result) => {
          if (result.isConfirmed) {
            this.$router.push("/home");
          }
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: "Error al iniciar sesión",
          icon: "error",
          confirmButtonText: "Ok",
        });
        //window.alert("Error al iniciar sesión");
      });
  }

  register() {
    if (this.passwordSign === this.passwordCompare) {
      createUserWithEmailAndPassword(auth, this.emailSign, this.passwordSign)
        .then((credenciales) => {
          // Signed in
          const user = credenciales.user;
          console.log(user);
          Swal.fire({
            title: "Registro exitoso",
            text: "Usuario registrado correctamente",
            icon: "success",
            confirmButtonText: "Ir al INICIO",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
          }).then((result) => {
            if (result.isConfirmed) {
              this.$router.push("/registro");
            }
          });
        })
        .catch((error) => {
          Swal.fire({
            title: "Error",
            text: "Error al registrarse",
            icon: "error",
            confirmButtonText: "Ok",
          });
          //window.alert("Error al registrarse");
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
