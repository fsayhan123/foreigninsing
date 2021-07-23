<template>
    <div>
        <div v-if = "loading" style = "display:flex; justify-content:center; align-items:center; height:100vh">
            <b-spinner label = "spinner"> </b-spinner>
        </div>
        <div v-else> 
            <NavBar> </NavBar>
            <div style = "margin-top:7vh;">
                <h3 style = "text-align:center;">Find your interest groups and communities!</h3>
                <div class = "groupsContainer" v-for = "(group, index) in chunkedGroupsArray" :key = "index"> 
                    <div v-if = "group.length == 2" class = "rowContainer">
                        <div class = "item">
                            <GroupDisplay v-bind:data = "group[0]"></GroupDisplay>
                        </div>
                        <div class = "item">
                            <GroupDisplay v-bind:data = "group[1]"></GroupDisplay>
                        </div>
                    </div>
                    <div v-else class = "rowContainer"> 
                        <div class = "item">
                            <GroupDisplay v-bind:data = "group[0]"></GroupDisplay>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from './Helpers/Navbar.vue'
import database from '../main.js'
import GroupDisplay from './Helpers/GroupDisplay.vue'

export default {
    components: {
        NavBar, 
        GroupDisplay,
    },
    data : function () {
        return {
            loading: true,
            groupsArray: [],
            chunkedGroupsArray: []
        }
    },

    methods: {
        chunkArray : function() {
            var temp = []
            for (let i = 0; i < this.groupsArray.length; i++) {
                temp.push(this.groupsArray[i])
                if (temp.length > 1) {
                    this.chunkedGroupsArray.push(temp)
                    temp = []
                } 
            }
            if (temp.length > 0) {
                this.chunkedGroupsArray.push(temp)
            }
        }
    },

    async mounted() {
        await database.collection("Communities").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            this.groupsArray.push([doc.id, doc.data()])
            })
        });
        this.chunkArray();
        console.log(this.chunkedGroupsArray)
        this.loading = false;
    }
}
</script>

<style scoped>
.groupsContainer {
    min-width:650px;
    width:60%;
    margin-left:auto;
    margin-right:auto;
    display:flex;
}

.rowContainer {
    display:flex;
    width:100%;
    justify-content: space-evenly;
    align-items: center;
    margin-top:20px;
}

.item {
    flex-grow:1;
    display:flex;
    align-items:center;
    justify-content: center;
}
</style>