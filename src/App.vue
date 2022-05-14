<template>
  <Navbar />
  <div class="content">
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  components: { Navbar },
  setup() {
    
  },
}
</script>

<style>
.content {
  max-width: 1200px;
  margin: 5px auto;
  padding: 0 20px;
}
</style>
