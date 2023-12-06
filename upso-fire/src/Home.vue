<template>
  <div class="container mt-5 bg-info-subtle text-emphasis-info rounded font-monospace">
    <h2 class="mb-4 fst-italic  ">Lista de Tareas</h2>

    <ul class="list-group">
      <li
        v-for="tarea in tareas"
        :key="tarea._id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        {{ tarea.titulo }} -- {{ tarea.descripcion }} -- {{ tarea.fecha }} --
        {{ tarea.completado ? "Completado" : "Pendiente" }}
        <div>
          <button
            @click="($event) => editarTarea(tarea._id)"
            class="btn btn-primary btn-sm  rounded-start-pill"
          >
            Editar
          </button>
          <button
            @click="($event) => confirmarBorrado(tarea._id, tarea.titulo)"
            class="btn btn-danger btn-sm  rounded-end-pill"
          >
            Borrar
          </button>
        </div>
      </li>
    </ul>

    <div v-if="editandoTarea" class="mt-4">
      <h3>Editar Tarea</h3>
      <div class="form-group">
        <label for="TareaEditadaTitulo">Título</label>
        <input
          v-model="tareaEditada.titulo"
          id="TareaEditadaTitulo"
          class="form-control"
        />

        <label for="TareaEditadaDescripcion">Descripción</label>
        <input
          v-model="tareaEditada.descripcion"
          id="TareaEditadaDescripcion"
          class="form-control"
        />

        <label for="TareaEditadaFecha">Fecha</label>
        <input
          v-model="tareaEditada.fecha"
          id="TareaEditadaFecha"
          class="form-control"
          type="date"
        />
      </div>
      <div class="form-group form-check">
        <input
          v-model="tareaEditada.completado"
          id="TareaEditadaCompletado"
          type="checkbox" class="btn-check"
        />
        <label class="btn  btn btn-outline-secondary mt-2" for="TareaEditadaCompletado"
          >Realizada
        </label>
      </div>
      <button
        @click="($event) => actualizarTarea()"
        class="btn btn-primary mt-2 rounded-start-2"
      >
        Guardar cambios
      </button>
      <button
        @click="($event) => cancelarEdicion(tareaEditada.titulo)"
        class="btn btn-danger mt-2 rounded-start-2"
      >
        Cancelar
      </button>
    </div>

    <div class="mt-4">
      <h3 class="fst-italic ">Nueva Tarea</h3>
      <div class="form-group">
        <label for="nuevaTareaTitulo">Título</label>
        <input
          v-model="nuevaTarea.titulo"
          id="nuevaTareaTitulo"
          class="form-control"
        />
        <label for="nuevaTareaDescripcion">Descripción</label>
        <input
          v-model="nuevaTarea.descripcion"
          id="nuevaTareaDescripcion"
          class="form-control"
          type="text"
        />
        <label for="nuevaTareaFecha">Fecha</label>
        <input
          v-model="nuevaTarea.fecha"
          @keyup.enter="crearTarea"
          id="nuevaTareaFecha"
          class="form-control"
          type="date"
        />
      </div>
      <button @click="($event) => crearTarea()" class="btn btn-primary mt-2  rounded-start-2">
        Crear Tarea
      </button>
    </div>

    <button @click="($event) => cerrarSesion()" class="btn btn-danger mt-4 rounded-start-2">
      Cerrar Sesión
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import { auth } from "../firebaseConfig";
import Swal from "sweetalert2";

// se define una interface para cargar las tareas
interface Tarea {
  _id: string;
  titulo: string;
  descripcion: string;
  fecha: string | Date;
  completado: boolean;
}

@Component
export default class HelloWorld extends Vue {
  // se define un arreglo de tareas vacio
  tareas: Tarea[] = [];

  editandoTarea: string | null = null;

  tareaEditada: Tarea = {
    _id: "",
    titulo: "",
    descripcion: "",
    fecha: "",
    completado: false,
  };

  nuevaTarea: {
    titulo: String;
    descripcion: string;
    fecha: string;
    completado: boolean;
  } = { titulo: "", descripcion: "", fecha: "", completado: false };

  // se define una funcion asincrona para cargar las tareas
  async obtenerTareas(): Promise<void> {
    try {
      // Se hace la peticion get a la ruta http://127.0.0.1/upso/tareas
      const respuesta = await axios.get("http://127.0.0.1:3000/upso/tareas");
      // se asigna la respuesta al arreglo de las tareas
      this.tareas = respuesta.data;
    } catch (error) {
      console.log(error);
    }
  }
  // funcion para obtener la tarea con el id
  editarTarea(id: string): void {
    this.editandoTarea = id;
    this.tareaEditada = {
      ...this.tareas.find((tarea) => tarea._id === id),
    } as Tarea; // ... => copia de la tarea
  }
  // se define una funcion asincrona para actualizar las tareas
  async actualizarTarea(): Promise<void> {
    try {
      //console.log(this.tareaEditada._id);
      const respuesta = await axios.put(
        `http://127.0.0.1:3000/upso/tareas/${this.tareaEditada._id}`,
        this.tareaEditada
      );
      //console.log(respuesta.data);
      Swal.fire({
        title: "Tarea actualizada correctamente",
        text: "Tarea actualizada correctamente",
        icon: "success",
        confirmButtonText: "Ok",
      });

      // se guarda el indice de la tarea que se va a actualizar
      const actualizarIndexTarea = this.tareas.findIndex(
        (tarea) => tarea._id === this.tareaEditada._id
      );
      //console.log(actualizarIndexTarea);
      // se actualiza la tarea
      this.$set(this.tareas, actualizarIndexTarea, respuesta.data);

      // se inicializa la tarea editada
      this.editandoTarea = null;
      this.tareaEditada = {
        _id: "",
        titulo: "",
        descripcion: "",
        fecha: "",
        completado: false,
      };
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: "Error al actualizar la tarea",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  }

  // se define una funcion para crear una tarea
  async crearTarea(): Promise<void> {
    try {
      if (this.nuevaTarea.titulo === "") {
        //window.alert("Debe ingresar un título");
        Swal.fire({
          title: "Error",
          text: "Debe ingresar un título",
          icon: "error",
          confirmButtonText: "Ok",
        });
      } else if (this.nuevaTarea.descripcion === "") {
        //window.alert("Debe ingresar una descripción");
        Swal.fire({
          title: "Error",
          text: "Debe ingresar una descripción",
          icon: "error",
          confirmButtonText: "Ok",
        });
      } else if (this.nuevaTarea.fecha === "") {
        //window.alert("Debe ingresar una fecha");
        Swal.fire({
          title: "Error",
          text: "Debe ingresar una fecha",
          icon: "error",
          confirmButtonText: "Ok",
        });
      } else {
        const respuesta = await axios.post(
          `http://127.0.0.1:3000/upso/tareas/`,
          this.nuevaTarea
        );
        // se agrega la nueva tarea al arreglo de tareas
        this.tareas.push(respuesta.data);
        // se inicializa la nueva tarea
        this.nuevaTarea = {
          titulo: "",
          descripcion: "",
          fecha: "",
          completado: false,
        };
        //window.alert("Tarea creada correctamente");
        Swal.fire({
          title: "Tarea creada correctamente",
          text: "Tarea creada correctamente",
          icon: "success",
          confirmButtonText: "Ok",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: "Error al crear la nueva tarea",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  }

  // se define una funcion para eliminar una tarea
  async borrarTarea(id: string): Promise<void> {
    try {
      // se inicializa la tarea editada
      this.editandoTarea = null;
      this.tareaEditada = {
        _id: "",
        titulo: "",
        descripcion: "",
        fecha: "",
        completado: false,
      };
      await axios.delete(`http://127.0.0.1:3000/upso/tareas/${id}`);
      // se filtra el arreglo de tareas para eliminar la tarea con el id, quedandome con las tareas que no tienen ese id
      this.tareas = this.tareas.filter((tarea) => tarea._id !== id);

      // se inicializa la nueva tarea
      this.nuevaTarea = {
        titulo: "",
        descripcion: "",
        fecha: "",
        completado: false,
      };
    } catch (error) {
      console.log(error);
    }
  }

  // se define una funcion para solicitar confirmacion de eliminacion de una tarea
  confirmarBorrado(id: string, titulo: string): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "¿Está seguro de eliminar?",
        text: "No podrá revertir el borrado.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "SI, Borrar",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.borrarTarea(id);
          swalWithBootstrapButtons.fire({
            title: "¡Borrado!",
            text: `La tarea ${titulo} ha sido borrada.`,
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelado",
            text: `Tarea ${titulo} NO Borrada`,
            icon: "error",
          });
        }
      });
  }

  // se define una funcion para cancelar la edicion de una tarea en el frontEnd
  cancelarEdicion(titulo: string): void {
    console.log(titulo);
    Swal.fire({
      title: "Edición cancelada",
      text: "La edición de la tarea " + titulo + " ha sido cancelada",
      icon: "success",
      confirmButtonText: "Ok",
    });
    this.editandoTarea = null;
    this.tareaEditada = {
      _id: "",
      titulo: "",
      descripcion: "",
      fecha: "",
      completado: false,
    };
  }

  // se define una funcion para cerrar la sesion
  cerrarSesion(): void {
    auth
      .signOut()
      .then(() => {
        // Si se cierra la sesion correctamente se redirige al inicio
        this.$router.push("/");
      })
      .catch((error) => {
        // sino ocurre un error
        console.log(error);
      });
  }

  mounted() {
    this.obtenerTareas();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
