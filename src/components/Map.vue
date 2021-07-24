<template>
    <div>
        <div v-if = "loading">
            <b-spinner label = "spinner"></b-spinner>
        </div> 
        <div v-else>
            <Navbar></Navbar>
            <b-card no-body>
                    <b-tabs pills card style = "margin-top: 7vh; display:flex; justify-content:center;">
                    <b-tab title = "Social Feed" v-on:click = "goToFeed"></b-tab>
                    <b-tab title = "Upcoming Events" v-on:click = "goToEvents"></b-tab>
                    <b-tab title = "Events Near Me" active></b-tab>
                    </b-tabs>
                </b-card>
            <div>
                <div class = "mapContainer">
                    <h3>Find events near you!</h3>
                
                    <GmapMap
                        :center="{lat:1.348674, lng:103.867691}"
                        :zoom="13"
                        map-type-id="terrain"
                        style="width: 50vw; height: 83vh"
                        >
                        <GmapMarker
                            v-for="(event, index) in events"
                            :key= "index"
                            :position= "event[1].position"
                            :clickable= "true"
                            :draggable= "true"
                            @click= "clickPin(index)"
                        />
                    </GmapMap>
                </div>
            </div>
            <b-sidebar v-model = "displayInfo" id="sidebar-1" width = "25%" shadow v-if = "events.length > 0">
                <div class = "pl-4">
                    <h4>{{selectedEvent[1].eventName}}</h4>
                    <h6>{{selectedEvent[1].eventDate}}</h6>
                    <p>{{selectedEvent[1].eventDesc}}</p>
                    <b-button v-if = "selectedEvent[1].attendee.includes(uid)" disabled>You already signed up for this event </b-button>
                    <b-button v-else variant = "dark" v-on:click = "signUpForEvent">Sign up for event</b-button>
                </div>
            </b-sidebar>
        </div>
    </div>
</template>


<script>
import Navbar from './Helpers/Navbar.vue'
import firebase from 'firebase'
import database from "../main.js"


export default {
    components : {
        Navbar
    },
    data : function () {
        return {
            uid : "",
            loading : false,
            displayInfo : false,
            events : [],
            selectedEvent : null,
        }
    },

    methods : {
        clickPin : function(key) {
            this.selectedEvent = this.events[key]
            console.log(this.selectedEvent)
            this.displayInfo = !this.displayInfo;  
        },
        goToFeed: function() {
            this.$router.push({ name: 'feed', query: {groupId: this.$route.query.groupId }})
        }, 
        goToEvents: function() {
            this.$router.push({ name: 'events', query: {groupId: this.$route.query.groupId }})
        },
        signUpForEvent : async function() {
            console.log(this.selectedEvent[0])
            await database.collection("Events").doc(this.selectedEvent[0])
                .update({
                    attendee: firebase.firestore.FieldValue.arrayUnion(this.uid)
                })
            await database.collection("users").doc(this.uid)
                .update({
                    events: firebase.firestore.FieldValue.arrayUnion(this.selectedEvent[0])
            })
            location.reload()
        }
    },

    created() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.uid = user.uid
            }  
        });
    },
    
    async mounted() {
        await database.collection("Events")
            .where("groupId", "==", this.$route.query.groupId)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((event) => {
                    this.events.push([event.id, event.data()])
                })
            })
        this.selectedEvent = this.events[0]
        console.log(this.selectedEvent)
    },
}
</script>

<style scoped>
.mapContainer {
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>