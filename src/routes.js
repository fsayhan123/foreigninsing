import Login from './components/Login.vue'
import Signup from './components/Signup.vue'
import Organisations from './components/Organisations.vue'
import OrgInfo from './components/OrgInfo.vue'

export default [
    {path : '/', component : Login},
    {path : '/signup', component : Signup},
    {path: '/organisations', component: Organisations},
    {path: '/orgInfo', name: 'OrgInfo', component: OrgInfo}
]