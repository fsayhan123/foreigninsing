<template>
    <div>
        <div class = "loginContainer">
            <b-form class = "formDisplay" v-on:submit.prevent = "onSignInSubmit"> 
                <h2>Sign in with Phone Number </h2>
                <label>Phone:</label>
                <b-form-input placeholder = "Enter Phone Number" v-model = "phoneNumber"> </b-form-input>
                <b-button id = "sign-in-button" type = "submit" variant = "dark" class = "mt-4" style = "width:100%;">Next </b-button>
            </b-form>
            <div style = "width:30vw" class = "mt-5" v-if = "smsSent">
                <b-form-input placeholder = "Enter OTP" v-model = "OTPCode"> </b-form-input>
                <b-button v-on:click = "submitOTP" variant = "dark" class = "mt-4" style = "width:100%">Log In </b-button>
            </div>
        </div>    
        <div class = "OTPcontainer"> 
            
        </div>
    </div>
</template>

<script>
import firebase from "firebase"

export default {
    data : function () {
        return {
            recaptchaVerifier: null,
            confirmationResult : null,
            OTPCode: "",
            smsSent : false,
            phoneNumber : null,
        }
    },

    methods : {
        onSignInSubmit: function() {
            const phoneNumber = this.phoneNumber;
            const appVerifier = this.recaptchaVerifier;
            firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
                .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                    this.confirmationResult = confirmationResult;
                    this.smsSent = true;
                    console.log("Reached")
                }).catch((error) => {
                    console.log(error)
                });
        },

        submitOTP : function() {
            const code = this.OTPCode;
            this.confirmationResult.confirm(code).then((result) => {
                const user = result.user;
                console.log(user);
                console.log(result);
                this.$router.push('/signup')
            }).catch((error) => {
                console.log(error)
            })
        }
    },

    created() {
        firebase.auth().onAuthStateChanged(user => {
            this.loading = false;
            if (user) {
                this.$router.push('/')
            }  
        });
    },
 
    mounted() {
        firebase.auth().useDeviceLanguage();
        this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
                console.log(response)
                this.onSignInSubmit();
            }
        });
    }
}
</script>

<style scoped>
.loginContainer {
    display:flex;
    height: 60vh;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.OTPcontainer {
    display:flex;
    flex-direction: column;
    height: 40vh;
    align-items: center;
    justify-content: center;
}

.formDisplay {
    display:flex;
    flex-direction: column;
    justify-content: center;
    width : 30vw;
}
</style>