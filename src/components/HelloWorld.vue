<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Agregar datos de usuario</h2>
    
    <label for="email">Ingrese el correo electrónico: </label>
    <input type="email" v-model="correo" placeholder="Ingrese su correo"><br>
    
    <label for="rut">Ingrese el Rut </label>
    <input type="number" v-model="rut" placeholder="Ingrese su RUT"><br>
    
    <label for="nombre">Ingrese el Nombre </label>
    <input type="text" v-model="nombre" placeholder="Ingrese su Nombre"><br>
    
    <button @click="registrando">Registrar Datos</button>
  </div>
</template>

<script>
import { db } from "../main";

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      nombre: '',
      rut: '',
      correo: '',
      datos: []
    }
  },
  methods: { 
    registrando(){
      if (this.correo && this.nombre && this.rut){
        db.collection("user").doc("datosUser").collection("colecion2020").add({
          name: this.nombre,
          email: this.correo,
          rut: this.rut,
        })
      }
    } 
  },
  mounted() {
    db.collection("usuarios").doc("V2bfGCmSUCXNS9vmTM3V").collection("premios").doc("adZbLZM1Tr9ySmZGkNmXD").get().then((response)=>{
      console.log(response)
      console.log(response.data());
    });
    db.collection("user").doc("datosUser").collection("colecion2020").get().then(respuesta=>{
      console.log(respuesta);
      respuesta.forEach(element => {
          this.datos.push(element.data())
      });
    })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
