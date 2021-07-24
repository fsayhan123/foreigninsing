<template>
  <div>
    <div
      v-if="loading"
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      "
    >
      <b-spinner label="spinner"> </b-spinner>
    </div>
    <div v-else>
      <NavBar> </NavBar>
      <div style="margin-top: 8vh">
        <h3 style="text-align: center">
          Find Events that you are Interested in!
        </h3>
        <div class="flexbox">
          <div style="width: 70%; float: left">
            <div v-for="(ev, index) in evArray" :key="index">
              <b-card-group deck style="margin:30px">
                <b-card
                  footer= " "
                  footer-tag="footer"
                >
                <h4>Event: {{ev[1].eventName}}</h4>
                <h6>Date: {{ ev[1].eventDate }}</h6>
                  <h6>{{ ev[1].eventDesc }}</h6>
                  <b-button v-on:click="joinEvent(ev[0])" variant="primary">Sign up for event</b-button>
                </b-card>
              </b-card-group>
            </div>
          </div>
          <div class="createEvent">
            <b-form-group
              id="fieldset-1"
              label="Name of Event"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="eventName"
                :state="state"
                trim
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="fieldset-2"
              label="Event Description"
              label-for="input-2"
            >
              <b-form-input
                id="input-2"
                v-model="eventDesc"
                style="height: 100px"
                :state="state"
                trim
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="fieldset-3"
              label="Venue of Event"
              label-for="input-3"
            >
              <b-form-input
                id="input-3"
                v-model="eventVenue"
                :state="state"
                trim
              ></b-form-input>
            </b-form-group>
            <label for="date">Date of Event </label> <br />
            <b-form-datepicker
              name="date"
              v-model="eventDate"
              :min="new Date()"
              required
              style="width: 100%"
            >
            </b-form-datepicker
            ><br />
            <b-button v-on:click="createEvent" pill variant="primary"
              >Create Event</b-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "./Helpers/Navbar.vue";
import database from "../main.js";
import firebase from "firebase";
export default {
  components: {
    NavBar,
  },
  data: function () {
    return {
      loading: true,
      evArray: [],
      eventName: "",
      eventDesc: "",
      eventVenue: "",
      eventDate: "",
      uid: "",
    };
  },

  methods: {
    async createEvent() {
      await firebase
        .firestore()
        .collection("Events")
        .add({
          eventName: this.eventName,
          eventDesc: this.eventDesc,
          eventVenue: this.eventVenue,
          eventDate: this.eventDate,
          attendee: [],
        })
        .then(() => {
          alert("Event Created!");
          location.reload();
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    async joinEvent(eventID) {
        var enterUser = firebase.auth().currentUser;
        this.uid = enterUser.uid;
        var newEvents = []
        await database
          .collection("users")
          .doc(this.uid)
          .get()
          .then((doc) => {
              newEvents = doc.data().events
          })
        newEvents.push(eventID)
        await database
          .collection("users")
          .doc(this.uid)
          .update({
            events: newEvents
          });
        var attendees = []
        await database
          .collection("Events")
          .doc(eventID)
          .get()
          .then((doc) => {
              attendees = doc.data().attendee
          })
        attendees.push(this.uid)
        await database
          .collection("Events")
          .doc(eventID)
          .update({
            attendee: attendees
          });
    }
  },
  async mounted() {
    await database
      .collection("Events")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.evArray.push([doc.id, doc.data()]);
        });
      });
    this.loading = false;
  },
};
</script>

<style scoped>
.groupsContainer {
  min-width: 650px;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
}

.rowContainer {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 20px;
}

.item {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.flexbox {
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: "center";
  justify-content: "left";
  float: "left";
}

.createEvent {
  border: 1px solid black;
  width: 28%;
  margin-top: 20px;
  margin-right: 100px;
  padding: 25px;
  float: left;
}
</style>