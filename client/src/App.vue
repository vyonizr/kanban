<template>
  <v-app>
    <Navbar />

    <v-content id="content">
      <router-view />
    </v-content>

    <Footer />
  </v-app>
</template>

<style>
  @import "./assets/styles/index.css";
  #content {
    background-image: linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%);
  }
</style>

<script>
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  created () {
    this.$store.dispatch('getAllBacklogs')
    this.$store.dispatch('getAllTodos')
    this.$store.dispatch('getAllGoings')
    this.$store.dispatch('getAllDones')
  },
  data () {
    return {
      //
    }
  }
}
</script>
