import Vue from 'vue';
import App from './App.vue';
import router from './router';
import firebase from 'firebase';
import { firebaseConfig } from "./config/firebaseConfig";

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
