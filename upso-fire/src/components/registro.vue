<template>
    <div>
      <h1>
        Registro de usuario nuevo Exitoso
      </h1>
      <button @click="volver()">Volver al login</button>
    </div>
  </template>
  
  <script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  
  
  @Component
  export default class Registro extends Vue {
    volver() {
      this.$router.push("/");
    }

  }
  </script>
  
  <style>
  
  
  </style>
  