<template>
    <div style = "display:flex; justify-content:center; height:100vh; align-items-center">
        <b-spinner></b-spinner>
    </div>
</template>

<script>
import firebase from "firebase"

export default {
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
                } else {
                    this.$router.push("/groups")
                }
                this.loading = false;
            }  
        });
    },
}
</script>

<style  scoped>

</style>