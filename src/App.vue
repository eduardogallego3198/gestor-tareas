<template>
  <div id="app" class="container-fluid text-white">
    <Cabecera></Cabecera>
    <Contenido>
    </Contenido>
    <Pie></Pie>
  </div>
</template>

<script>
import Cabecera from './components/Cabecera.vue'
import Contenido from './components/Contenido.vue'
import Pie from './components/Pie.vue'

export default {
  name: 'app',
  components: {
    Cabecera, Contenido, Pie
  }
}
</script>