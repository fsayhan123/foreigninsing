import Login from './components/Login.vue'
import Signup from './components/Signup.vue'
import Home from './components/Home.vue'
import Organisations from './components/Organisations.vue'
import OrgInfo from './components/OrgInfo.vue'
import Groups from './components/Groups.vue'
import Feed from './components/Feed.vue'
import Chats from './components/Chats.vue'
import FindUsers from './components/FindUsers.vue'
import Events from './components/Events.vue'
import Map from './components/Map.vue'
import WaitingPage from './components/WaitingPage.vue'
import EventsJoined from './components/EventsJoined.vue'

export default [
    {path : '/login', component : Login},
    {path : '/signup', component : Signup},
    {path : '/', component : Home, meta: {requiresAuth: true}},
    {path: '/orgs', component: Organisations, meta : {requiresAuth: true}},
    {path: '/orgInfo', name: 'OrgInfo', component: OrgInfo, meta : {requiresAuth: true}},
    {path: '/groups', component: Groups, meta: {requiresAuth: true}},
    {path: '/feed', name: 'feed', component: Feed, meta : {requiresAuth: true}},
    {path: '/chats', name: 'Chats', component: Chats,  meta : {requiresAuth: true}},
    {path:'/findUsers', name: 'FindUsers', component: FindUsers,  meta : {requiresAuth: true}},
    {path:'/events', name : 'events', component: Events,  meta : {requiresAuth: true}},
    {path:'/waitingPage', component: WaitingPage, meta : {requiresAuth: true}},
    {path:'/map', name : 'map', component: Map, meta : {requiresAuth:true }},
    {path:'/eventsJoined', component: EventsJoined, meta : {requiresAuth:true }},
]