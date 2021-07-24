<template>
  <div>
    <div v-if = "loading">
      <b-spinner label = "spinner"></b-spinner>
    </div>
    <div v-else>
      <Navbar></Navbar>
      <div style = "margin-top:10vh">
        <div v-for="(ev, index) in events" :key="index" class = "mt-5" >
              <b-card-group deck style="margin:30px; width:60%; margin-left:auto; margin-right:auto;" >
                <b-card
                  footer= " "
                  footer-tag="footer"
                >
                <h4>Event: {{ev[1].eventName}}</h4>
                <h6>Date: {{ ev[1].eventDate }}</h6>
                  <h6>{{ ev[1].eventDesc }}</h6>
                  <p>Number of people attending: {{ev[1].attendee.length}} </p>
                  <GmapMap
                        :center= "ev[1].position"
                        :zoom="16"
                        map-type-id="terrain"
                        style="width: 100%; height: 20vh"
                        >
                        <GmapMarker
                            :key= "index"
                            :position= "ev[1].position"
                            :clickable= "false"
                            :draggable= "false"
                        />
                    </GmapMap>
                </b-card>
              </b-card-group>
            </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import Navbar from './Helpers/Navbar.vue'

export default {
  components : {
    Navbar
  },
  data: function () {
    return {
      loading:true, 
      uid: "",
      events: [],
    };
  },
  methods: {
    async fetchEvents() {
      var enterUser = firebase.auth().currentUser;
      this.uid = enterUser.uid;
      await firebase
      .firestore()
        .collection("Events")
        .where("attendee", "array-contains", this.uid)
        .orderBy("eventDate", "asc")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              this.events.push([doc.id, doc.data()])
          });
        });
        this.loading = false
        console.log(this.events)

    },
  },
  created() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.uid = user.uid
            }  
        });
        this.fetchEvents() 
    },
};
</script>

<style scoped>
</style>