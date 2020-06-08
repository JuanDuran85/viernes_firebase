<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link :to="{name: 'Registro'}">Registro</router-link>
    </div>
    <router-view :usuario="usuario" @salidaUsuario="salidaUsuario"/>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'App',
  data() {
    return {
      usuario: '',
      correouser: '',
      uid: ''
    }
  },
  methods: { 
    salidaUsuario(){
      firebase.auth().signOut().then(()=>{
        this.usuario = '';
        this.correoUser = '';
        this.uid = '';
        this.$router.push('/login');
      })
    } 
  },
  mounted(){
    firebase.auth().onAuthStateChanged(dato=>{
      if(dato){
        this.usuario = dato.displayName;
        this.correoUser = dato.email;
        this.uid = dato.uid;
        console.log(dato.emailVerified);
        if (!dato.emailVerified){
            dato.sendEmailVerification().then(function() {
            console.log("correo enviado")
            console.log(dato.emailVerified);
          }).catch(function(error) {
            console.log(error);
          });
        }
      }else{
        this.usuario = '';
      }
    })
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
