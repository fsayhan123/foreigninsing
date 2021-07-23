<template>
  <div>
    <div v-if="loading" class="SignUpContainer">
      <b-spinner label="spinning"></b-spinner>
    </div>
    <div v-else>
      <NavBar></NavBar>
      <div class="SignUpContainer">
        <h3>Complete your Profile!</h3>
        <b-form class="mt-4 formContainer" v-on:submit.prevent="updateProfile">
          <img
            :src="previewImage"
            style="
              width: 300px;
              height: 300px;
              object-fit: scale-down;
              border-radius: 25%;
            "
          />
          <br />
          <b-form-file
            id="profilePicture"
            accept="image/*"
            v-on:change="previewImageFunc"
          ></b-form-file>
          <b-form-input
            placeholder="Username"
            class="mt-4"
            v-model="userName"
            required
          ></b-form-input>
          <b-button type="submit" variant="dark" class="mt-4">Update </b-button>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "./Helpers/Navbar.vue";
import firebase from "firebase";
import database from "../main.js";

export default {
  data: function () {
    return {
      uid: "",
      user: {},
      userName: null,
      loading: true,
      previewImage: null,
      toUploadImage: null,
      profilePictureURL: null,
    };
  },
  components: {
    NavBar,
  },
  methods: {
    updateProfile: async function () {
      var user = firebase.auth().currentUser;
      this.uid = user.uid;
      if (this.previewImage === null) {
        return;
      } else if (this.userName === "") {
        return;
      } else {
        this.user.Username = this.userName;
        var profileRef = firebase
          .storage()
          .ref()
          .child(`profilePictures/${this.uid}.jpg`);
        await profileRef.put(this.toUploadImage).then(console.log("Done"));
        await profileRef.getDownloadURL().then((url) => {
          this.profilePictureURL = url;
        });
        await database
          .collection("users")
          .doc(this.uid)
          .update({
            Username: this.userName,
            uid: this.uid,
            profilePictureURL: this.profilePictureURL,
            chatList: [],
          })
          .then(() => {
            localStorage.setItem("id", user.uid);
            localStorage.setItem("name", this.userName);
            localStorage.setItem("photoURL", this.profilePictureURL);
            
          });
        this.$router.push("/");
      }
    },

    previewImageFunc: function (e) {
      const image = e.target.files[0];
      this.toUploadImage = image;
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.previewImage = e.target.result;
      };
      console.log(typeof image);
    },
  },
  mounted() {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        this.uid = user.uid;
        await database
          .collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            this.user = doc.data();
            if (this.user.profilePictureURL !== null) {
              this.previewImage = this.user.profilePictureURL;
              this.userName = this.user.Username;
            }
          });
        this.loading = false;
      }
    });
  },
};
</script>

<style scoped>
.SignUpContainer {
  margin-top: 7vh;
  height: 93vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 60%;
}

.formContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>