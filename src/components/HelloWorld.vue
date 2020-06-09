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
    <br>
    <hr>
    <h3>Datos en DB</h3>
    <table>
      <thead>
        <th>Nº</th>
        <th>Nombre</th>
        <th>Email</th>
        <th>RUT</th>
        <th>Borrar</th>
        <th>Editar</th>
      </thead>
      <tbody>
        <tr v-for="(item,index) in datos" :key="index">
          <td>{{index+1}}</td>
          <td>{{item.name}}</td>
          <td>{{item.email}}</td>
          <td>{{item.rut}}</td>
          <td><button @click="borrando(item.id)">Borrar</button></td>
          <td><button @click="editando(item.id)">Editar</button></td>
        </tr>
      </tbody>
    </table>

<!--     <ul>
      <li v-for="(item,index) in datos" :key="index">
        {{item.name}} - {{item.email}} - {{item.rut}} - {{item.id}} | <br>
      </li>
    </ul> -->

  </div>
</template>

<script>
import { db } from "../main";
import firebase from 'firebase';

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
    editando(id){
      let nuevoRut = prompt("Ingrese su nuevo rut",111111111);
      db.collection("user").doc("datosUser").collection("colecion2020").doc(id)
      .update({      
        rut: nuevoRut
      })
    },
    borrando(id){
      console.log(id);
      db.collection("user").doc("datosUser").collection("colecion2020").doc(id).delete().then(()=>{
        alert(`Documento ${id} borrado`);
      })
    },
    llamadoBD(){
        db.collection("user").doc("datosUser").collection("colecion2020").where("rut", ">=", 10000).onSnapshot((respuesta)=>{
          let auxiliar = [];
          respuesta.forEach(elementos=>{
            auxiliar.push({
              name: elementos.data().name,
              email: elementos.data().email,
              rut: elementos.data().rut,
              id: elementos.id,
              creacion: elementos.data().creacion
            });
          })
          this.datos = auxiliar;
        })
    },
    registrando(){
      if (this.correo && this.nombre && this.rut){
        db.collection("user").doc("datosUser").collection("colecion2020").add({
          name: this.nombre,
          email: this.correo,
          rut: parseInt(this.rut),
          creacion: firebase.firestore.FieldValue.serverTimestamp()
        });
        // db.collection("coleciones").doc(this.rut+this.nombre).set({
        //   name: this.nombre,
        //   email: this.correo,
        //   rut: this.rut,
        // })
      }
    } 
  },
  mounted() {
    /* db.collection("usuarios").doc("V2bfGCmSUCXNS9vmTM3V").collection("premios").doc("adZbLZM1Tr9ySmZGkNmXD").get().then((response)=>{
      console.log(response.data());
    }); */
/*     db.collection("user").doc("datosUser").collection("colecion2020").get().then(respuesta=>{
      respuesta.forEach(element => {
          this.datos.push({
              name: element.data().name,
              email: element.data().email,
              rut: element.data().rut,
              id: element.id
          })
      });
    }) */
    this.llamadoBD();
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

table, th, tr , td, tbody {
  border: 1px solid black;
  text-align: center;
  font-size: 18px;
  background-color: azure;
}
</style>
