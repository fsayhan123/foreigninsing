import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './routes.js'
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.use(VueRouter)
Vue.config.productionTip = false
var firebaseConfig = {
  apiKey: "AIzaSyD6xnnmm9e4qUOP7w2pDxP2Cbi0FEfjwUU",
  authDomain: "foreigninsg.firebaseapp.com",
  projectId: "foreigninsg",
  storageBucket: "foreigninsg.appspot.com",
  messagingSenderId: "837171467670",
  appId: "1:837171467670:web:ba41b72f27f2d9f730b9b7",
  measurementId: "G-7SM6VENK25"
};

firebase.initializeApp(firebaseConfig)


firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
          unsubscribe();
          resolve(user);
      }, reject);
  })
};

const router = new VueRouter({
  mode: 'history',
  routes: Routes
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !await firebase.getCurrentUser()){
    next('login');
  }else{
    next();
  }
});

const database = firebase.firestore();
export default database;

new Vue({
  render: h => h(App),
  router: router,
}).$mount('#app')
