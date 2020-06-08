<template>
  <div class="home">
    <div v-if="usuario">
      <h3>Bienvenido: {{usuario}} | </h3>
      <a href="#" @click="salida">Salir</a>
    </div>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
//import firebase from 'firebase';

export default {
  name: 'Home',
  props: ['usuario'],
  components: {
    HelloWorld
  },
  methods: {
    salida(){
      this.$emit('salidaUsuario');
/*       firebase.auth().signOut().then(()=>{
        this.$router.push("/login");
      }) */
    }
  },
}
</script>
