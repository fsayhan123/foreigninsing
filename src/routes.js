import Login from './components/Login.vue'
import Signup from './components/Signup.vue'
import Home from './components/Home.vue'

export default [
    {path : '/login', component : Login},
    {path : '/signup', component : Signup},
    {path : '/', component : Home, meta: {requiresAuth: true}}
]