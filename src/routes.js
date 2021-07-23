import Login from './components/Login.vue'
import Signup from './components/Signup.vue'
import Home from './components/Home.vue'
import Organisations from './components/Organisations.vue'
import OrgInfo from './components/OrgInfo.vue'
import Groups from './components/Groups.vue'

export default [
    {path : '/login', component : Login},
    {path : '/signup', component : Signup},
    {path : '/', component : Home, meta: {requiresAuth: true}},
    {path: '/orgs', component: Organisations, meta : {requiresAuth: true}},
    {path: '/orgInfo', name: 'OrgInfo', component: OrgInfo, meta : {requiresAuth: true}},
    {path: '/groups', component: Groups, meta: {requiresAuth: true}}
]