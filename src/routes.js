import Login from './components/Login.vue'
import Signup from './components/Signup.vue'
import Home from './components/Home.vue'
import Organisations from './components/Organisations.vue'
import OrgInfo from './components/OrgInfo.vue'
import Chats from './components/Chats.vue'

export default [
    {path : '/login', component : Login},
    {path : '/signup', component : Signup},
    {path : '/', component : Home, meta: {requiresAuth: true}},
    {path: '/orgs', component: Organisations},
    {path: '/orgInfo', name: 'OrgInfo', component: OrgInfo},
    {path: '/chats', component: Chats}
]