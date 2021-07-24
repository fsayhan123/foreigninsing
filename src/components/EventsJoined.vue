<template>
  <div>
    <p>hi</p>
    <ul class="list-group" v-for="(ev, index) in this.events" :key="index">
      <li class="list-group-item"></li>
      {{
        ev.eventName
      }}
      <li class="list-group-item list-group-item-primary">
        This is a primary list group item
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data: function () {
    return {
      events: [],
    };
  },
  methods: {
    async fetchEvents() {
      var enterUser = firebase.auth().currentUser;
      this.uid = enterUser.uid;
      var idArr = [];
      await firebase
        .firestore()
        .collection("users")
        .doc(this.uid)
        .get()
        .then((doc) => {
          idArr = doc.data().events;
          console.log(idArr);
        });
      for (let x of idArr) {
        await firebase
          .firestore()
          .collection("Events")
          .where('attendee', 'array-contains', x)
          .get()
          .then((snapshot) => {
              snapshot.forEach((doc) =>{
                console.log("event is: " + doc.data().eventName)
              this.events.push(doc.data())
              })
          });
      }
    },
  },
  created() {
    this.fetchEvents();
  },
};
</script>

<style scoped>
</style>