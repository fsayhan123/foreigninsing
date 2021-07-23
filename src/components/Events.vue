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
            <div
              class="groupsContainer"
              v-for="(group, index) in chunkedGroupsArray"
              :key="index"
            >
              <div v-if="group.length == 2" class="rowContainer">
                <div class="item">
                  <GroupDisplay v-bind:data="group[0]"></GroupDisplay>
                </div>
                <div class="item">
                  <GroupDisplay v-bind:data="group[1]"></GroupDisplay>
                </div>
              </div>
              <div v-else class="rowContainer">
                <div class="item">
                  <GroupDisplay v-bind:data="group[0]"></GroupDisplay>
                </div>
              </div>
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
            <label for = "date">Date of Event </label> <br> 
            <b-form-datepicker name="date" v-model = "eventDate" :min = "new Date()" required style = "width:100%"> </b-form-datepicker><br>
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
import GroupDisplay from "./Helpers/GroupDisplay.vue";
import firebase from "firebase";
export default {
  components: {
    NavBar,
    GroupDisplay,
  },
  data: function () {
    return {
      loading: true,
      groupsArray: [],
      chunkedGroupsArray: [],
      eventName: "",
      eventDesc: "",
      eventVenue: "",
      eventDate: ""
    };
  },

  methods: {
    chunkArray: function () {
      var temp = [];
      for (let i = 0; i < this.groupsArray.length; i++) {
        temp.push(this.groupsArray[i]);
        if (temp.length > 1) {
          this.chunkedGroupsArray.push(temp);
          temp = [];
        }
      }
      if (temp.length > 0) {
        this.chunkedGroupsArray.push(temp);
      }
    },
    async createEvent() {
      await firebase
        .firestore()
        .collection("Events")
        .add({
          eventName: this.eventName,
          eventDesc: this.eventDesc,
          eventVenue: this.eventVenue,
          eventDate: this.eventDate,
          attendee: []
        })
        .then(() => {
          alert("Event Created!");
          location.reload();
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    
  },
  async mounted() {
    await database
      .collection("Communities")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.groupsArray.push([doc.id, doc.data()]);
        });
      });
    this.chunkArray();
    console.log(this.chunkedGroupsArray);
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