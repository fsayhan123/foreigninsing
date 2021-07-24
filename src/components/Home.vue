<template>
    <div>
        <div v-if = "loading" class = "loadingContainer">
            <b-spinner label = "spinning"></b-spinner>
        </div>
        <div v-else> 
            <NavBar> </NavBar>
            <p style = "margin-top:7vh">Home Page </p>
        </div> 
    </div>   
</template>

<script>
import NavBar from './Helpers/Navbar.vue'
import firebase from "firebase"

export default {
    data : function () {
        return {
            loading:true,
        }
    },

    components: {
        NavBar
    },

    created() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.$router.push('/groups')
                this.loading = false;
            }  
        });
    },
}
</script>

<style scoped>

</style>