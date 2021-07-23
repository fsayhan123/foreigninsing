<template>

  <div>
      <div>
          <NavBar></NavBar>
      </div>
      <div style="margin-top: 10vh"> 
      <b-form-input style="margin:10px 70px 10px 70px" type="text" v-model="search" placeholder="Search for users..."></b-form-input>
    <div v-for="user in filteredNames" v-bind:key="user.index">
      <b-list-group-item variant="primary" button v-on:click="backToChat(user[0],user[1], user[2])">{{ user[0] }}</b-list-group-item>
    </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import NavBar from "./Helpers/Navbar.vue";
export default {
  name: "FindUsers",
  props: {
    username: String,
    userID: String,
  },
  components: {
      NavBar
  },
  data() {
    return {
      allUsersArr: [],
      search: "",
    };
  },
  methods: {
    getAllUsers: function () {
      console.log(this.userID);
      firebase
        .firestore()
        .collection("users")
        .where("uid", "!=", this.userID)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.allUsersArr.push([doc.data().Username, doc.data().uid, doc.data().profilePictureURL]);
          });
        });
    },
    backToChat: function(peerName, peerID, peerURL) {
        var peer = {
            URL: peerURL,
            name: peerName,
            id: peerID
        }
        this.$router.push({
        name: "Chats",
        query: {
          peerInfo: peer,
          peerID: peerID,
          username: this.username,
          userID: this.userID,
        },
      });
    }
  },
  computed: {
      filteredNames: function() {
          return this.allUsersArr.filter((user) => {
              return (user[0]).toLowerCase().match(this.search.toLowerCase())
          });
      }
  },
  created: function () {
    this.username = this.$route.query.username;
    this.userID = this.$route.query.userID;
    this.getAllUsers();
  },
};
</script>

<style scoped></style>
