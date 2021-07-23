<template>
  <div>
    <div class="loginContainer">
      <b-form class="formDisplay" v-on:submit.prevent="onSignInSubmit">
        <h2>Sign in with Phone Number</h2>
        <label>Phone:</label>
        <b-form-input placeholder="Enter Phone Number" v-model="phoneNumber">
        </b-form-input>
        <b-button
          id="sign-in-button"
          type="submit"
          variant="dark"
          class="mt-4"
          style="width: 100%"
          >Next
        </b-button>
      </b-form>
      <div style="width: 30vw" class="mt-5" v-if="smsSent">
        <b-form-input placeholder="Enter OTP" v-model="OTPCode"> </b-form-input>
        <b-button
          v-on:click="submitOTP"
          variant="dark"
          class="mt-4"
          style="width: 100%"
          >Log In
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
import database from "../main.js"

export default {
    data : function () {
        return {
            recaptchaVerifier: null,
            confirmationResult : null,
            OTPCode: "",
            smsSent : false,
            phoneNumber : null,
            uid: "",
        }
    },

    methods : {
        onSignInSubmit() {
            const phoneNumber = this.phoneNumber;
            const appVerifier = this.recaptchaVerifier;
            firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
                .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                    this.confirmationResult = confirmationResult;
                    this.smsSent = true;
                })
                .catch((error) => {
                    console.log(error)
                });  
        },

         submitOTP : function() {
            const code = this.OTPCode;
            this.confirmationResult.confirm(code).then(async (result) => {
                const userID = result.user.uid;
                await database.collection('users').doc(userID)
                    .set({
                        phoneNumber : this.phoneNumber
                    }, {merge: true});
            }).catch((error) => {
                console.log(error)
            })
        },
        async addToLocalStorage() {
            var enterUser = firebase.auth().currentUser;
            this.uid = enterUser.uid;
             firebase
              .firestore()
              .collection("users")
              .where("uid", "==", this.uid)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  let userData = doc.data();
                  console.log("uid saved to loval storage: ")
                  console.log(userData.uid)
                  localStorage.setItem("id", userData.uid);
                  localStorage.setItem("name", userData.Username);
                  localStorage.setItem("photoURL", userData.profilePictureURL);
                  localStorage.setItem("FirebaseDocumentId", doc.id);
                });
              }) 
        }
    },

    created() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.addToLocalStorage();
                this.$router.push('/');
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
  display: flex;
  height: 60vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.OTPcontainer {
  display: flex;
  flex-direction: column;
  height: 40vh;
  align-items: center;
  justify-content: center;
}

.formDisplay {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 30vw;
}
</style>