<template>
    <div>
        <div v-if = "loading" class = "loadingContainer">
            <b-spinner label = "spinning"></b-spinner>
        </div>
        <div> 
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
                const userRef = firebase.auth().currentUser.metadata
                console.log(userRef);
                const creationTime = userRef.creationTime;
                const lastTime = userRef.lastSignInTime;
                console.log(creationTime)
                console.log(lastTime)
                if (creationTime === lastTime) {
                    this.$router.push("/signup")
                }
                this.loading = false;
            }  
        });
    },
}
</script>

<style scoped>

</style>