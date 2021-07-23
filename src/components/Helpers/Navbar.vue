<template>
    <div>
        <b-navbar class = "navbar fixed-top"> 
            <b-navbar-nav class = "mr-auto">
            </b-navbar-nav>
            <b-navbar-nav class = "mx-auto center-items">
                <router-link to="/events" class = "navBarItems">Events</router-link> <br /> 
                <router-link to="/chats" class = "navBarItems">Chats</router-link> <br />
                <router-link to="/orgs" class = "navBarItems">Organizations </router-link> <br />
                <router-link to="/groups" class = "navBarItems">Interest Groups </router-link> <br />
            </b-navbar-nav>
            <b-navbar-nav class = "ml-auto">   
                
                <b-nav-item-dropdown right>
                <template slot="button-content">
                    <b-icon icon = "person-fill" style = "width:30px; height:30px; color : white;"></b-icon>
                </template>
                <b-dropdown-item v-on:click = "profile">Profile <br /></b-dropdown-item>
                <b-dropdown-item v-on:click = "logout">Log Out</b-dropdown-item>
            </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-navbar>
    </div>
</template>

<script>
import firebase from "firebase"
export default {
    methods : {
        logout : function() {
            firebase.auth().signOut().then(() => {
                this.$router.push({path : "/login"})
            })
        },
        profile : function() {
            this.$router.push('/signup')
        }
    }
}
</script>

<style scoped>
.navbar {
    background-color: black;
    height: 7vh;
    box-shadow: 0 2px 2px -1px gray;
}

.navBarItems  {
    margin-left:20px;
    font-size:20px;
    display:flex;
    justify-content: center;
    align-items: center;
    color:white;
}
</style>