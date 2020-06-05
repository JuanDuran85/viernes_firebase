<template>
  <div class="about">
    <h1>Login</h1>
    <label for="email">Ingrese el correo electrónico: </label>
    <input type="email" v-model="correo" placeholder="Ingrese su correo"><br>
    <label for="clave">Ingrese la contraseña: </label>
    <input type="password" v-model="clave" placeholder="Ingrese su clave"><br>
    <button @click="loginUsuario">Entrar</button>
    <br>
    <a @click="restablecer" href="#">Olvide la contraseña</a>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'about',
  data() {
    return {
      clave: null,
      correo: null,
    }
  },
  methods: { 
    loginUsuario(){
      firebase.auth().signInWithEmailAndPassword(this.correo,this.clave).then((datos)=>{
        console.log(datos.user.email);
        console.log(datos.user.uid);
        this.$router.push('/');
      }).catch(erro => {
        console.error(erro);
        alert(erro.message);
      })
    },
    restablecer(){
      firebase.auth().sendPasswordResetEmail(this.correo).then(function() {
        console.log("enviado")
      }).catch(function(error) {
        console.error(error.message);
      });
    } 
  }
}
</script>