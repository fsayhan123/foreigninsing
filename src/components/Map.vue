<template>
    <div>
        <div v-if = "loading">
            <b-spinner label = "spinner"></b-spinner>
        </div> 
        <div v-else>
            <Navbar></Navbar>
            <div style = "margin-top:7vh">
                <div class = "mapContainer">
                    <GmapMap
                        :center="{lat:1.348674, lng:103.867691}"
                        :zoom="15"
                        map-type-id="terrain"
                        style="width: 50vw; height: 93vh"
                        >
                        <GmapMarker
                            v-for="(m, index) in markers"
                            :key= "index"
                            :position= "m.position"
                            :clickable= "true"
                            :draggable= "true"
                            @dragend="gMapFunc($event.latLng)"
                            @click= "clickPin(index, m.position)"
                        />
                    </GmapMap>
                </div>
            </div>
            <b-sidebar v-model = "displayInfo" id="sidebar-1" title="Sidebar" width = "30%" shadow>
                <div>
                    <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                    in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                    </p>
                </div>
            </b-sidebar>
        </div>
    </div>
</template>


<script>
import Navbar from './Helpers/Navbar.vue'

export default {
    components : {
        Navbar
    },
    data : function () {
        return {
            loading : false,
            displayInfo : false,
            markers: [
                {
                position:
                    {
                    lat: 1.348674,
                    lng: 103.867691
                    },
                }
            ],
        }
    },

    methods : {
        clickPin : function(key, position) {
            console.log(key);
            console.log(position)
            this.displayInfo = !this.displayInfo;  
        },
        
        gMapFunc(evnt) {
            console.log(evnt.lat())
            console.log(evnt.lng())
        }

    }
}
</script>

<style scoped>
.mapContainer {
    display:flex;
    justify-content: center;
    align-items: center;
}
</style>