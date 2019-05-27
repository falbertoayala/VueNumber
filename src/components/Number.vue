<template>
  <div class="container d-flex justify-content-center">

    <div role="status" v-if="showSpinner">
      <span class="sr-only">Loading...</span>
    </div>

    <form v-if="window=='jugar'" >
      <div class="form-group">
        <h2 class="mb-5">Quieres Jugar</h2>
      </div>
      <div class="form-group form-check ">
        <button type="submit"  v-on:click="Window('nombre')">Iniciar Juego</button>
      </div>
    </form>
    <form v-if="window == 'nombre'" >
      <div class="form-group">
        <h5 class="mb-10">Nombre</h5>
        <input type="text" v-model="jugador"  placeholder="nombre" required>
      </div>
      <div class="form-group form-check ">
        <button @click="Window('numero')">Aceptar</button>
        <button @click="Window('jugar')" type="submit" >Cancelar</button>
      </div>
    </form>
    <form v-if="window == 'numero'" >
      <div class="form-group">
        <h5 class="mb-5">Cual es el número </h5>
        <input type="number"  v-model="adivinarNumero"  placeholder="Ingresa número" required>
      </div>
      <div class="form-group form-check">
        <button type="submit" @click="numero" v-if="!fin" >Adivinar</button>
        <button type="submit" @click="reiniciar" v-if="fin" >Reiniciar Juego</button>
      </div>
    </form>

  </div>

</template>

<script>
export default {
  name: 'numero',
  data () {
    return {
      jugador: '',
      window: 'jugar',
      adivinarNumero: 0,
      generaNumero: 0,
      intentos: 0,
      showSpinner: false,
      fin: false
    }
  },
  methods: {
    generarNumero: function () {
      this.generaNumero = Math.floor(Math.random() * 100)
      // eslint-disable-next-line
      setTimeout(() => this.showSpinner = false, 500)
    },
    Window: function (window) {
      if (window === 'nombre') {
        this.showSpinner = true
        this.generarNumero()
      }
      this.window = window
    },
    numero: function () {
      if (this.generaNumero < Number(this.adivinarNumero)) {
        this.intentos++
        this.$swal.fire({
          type: 'error',
          title: 'Intentalo de nuevo',
          text: 'Es un numero menor`'
        })
        this.intentos++
      } else if (this.generaNumero > Number(this.adivinarNumero)) {
        this.$swal.fire({
          type: 'error',
          title: 'Intentalo de nuevo',
          text: 'Es un numero mayor`'
        })
        this.intentos++
      } else if (this.generaNumero === Number(this.adivinarNumero)) {
        this.$swal(`Acertaste ${this.jugador}`, `Lo hicistes en ${this.intentos} intentos`, `success`)
        this.fin = true
      }
    },
    reiniciar: function () {
      this.generarNumero()
      this.adivinarNumero = 0
      this.window = 'jugar'
      this.jugador = ''
      this.intentos = 0
      this.fin = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}

</style>
