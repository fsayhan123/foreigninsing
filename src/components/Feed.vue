<template>
    <div>
        <b-card no-body>
            <b-tabs pills card style = "margin-top: 7vh; display:flex; justify-content:center;">
            <b-tab title="Social Feed" active></b-tab>
            <b-tab title="Events" v-on:click = "goToEvents"></b-tab>
            </b-tabs>
        </b-card>
        <div v-if = "loading" style = "display:flex; height:100vh; justify-content:center; align-items:center">
            <b-spinner label = "spinning"></b-spinner>
        </div>
        
        <div v-else>
            <NavBar></NavBar>
            <div class = "createPostContainer"> 
                <h5>Share your thoughts!</h5>
                <b-form v-on:submit.prevent = "submit">
                    <b-form-input placeholder = "Create Post" maxlength = "160" v-model = "newPost.description" required></b-form-input>
                    <b-form-file  accept = "image/*" style = "width:40%" placeholder = "Add Image" v-on:change = "changeImage"></b-form-file> <br />
                    <b-button type = "submit" class = "mt-2" variant = "dark">Create Post!</b-button>
                </b-form>
            </div>
            <div class = "postContainer">
                <div v-if = "postsArray.length === 0" class = "emptyFeed mt-2"> 
                    <p>There are currently no posts in this community. </p>
                </div>
                <div v-else class = "gotFeed mt-2" v-for = "(posts, index) in postsArray" :key = "index">
                    <PostDisplay v-bind:data = "posts"></PostDisplay>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from './Helpers/Navbar.vue'
import PostDisplay from './Helpers/PostDisplay.vue'
import database from '../main.js'
import firebase from 'firebase'

export default {
    components : {
        NavBar,
        PostDisplay,
    },

    data : function () {
        return {
            loading: true,
            postsArray : [],
            newPost : {
                communityId : this.$route.query.groupId,
                description: "",
                imageURL : "",
                user : {
                    Username : "",
                    profilePictureURL : "",
                    userId : "",
                }
            },
            toUploadImage : null,
            newImageURL : null,
        }
    },
    
    methods: {
        submit: async function() {

            console.log(this.newPost)
            var documentId = ""
            await database.collection('posts').add(
                this.newPost
            ).then((docRef) => {
                documentId = docRef.id;
            })
            if (!(this.toUploadImage === null)) {
                var postRef = firebase.storage().ref().child(`postPicture/${documentId}.jpg`);
                await postRef.put(this.toUploadImage).then(console.log("Done"));
                await postRef.getDownloadURL().then((url) => {
                    this.newImageURL = url;
                })
                await database.collection('posts').doc(documentId)
                    .update({
                        imageURL : this.newImageURL
                    });
            }
            this.$router.go()
        },
        changeImage: function(e) {
            const image = e.target.files[0];
            this.toUploadImage = image;
        },
        goToEvents: function() {
            this.$router.push({ name: 'events', query: {groupId: this.$route.query.groupId}})
        }
    },

    created() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                database.collection("users").doc(user.uid).get()
                    .then((doc) => {
                        const data = doc.data();
                        this.newPost.user.Username = data.Username
                        this.newPost.user.profilePictureURL = data.profilePictureURL
                        this.newPost.user.userId = user.uid
                        console.log(this.newPost)
                    })
            }  
        });
    },
 
    async mounted() {
        const groupId = this.$route.query.groupId
        console.log(groupId)
        await database.collection("posts").where("communityId", "==", groupId).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                this.postsArray.push([doc.id, doc.data()])
            })
        });
        this.loading = false;
    }
}


</script>

<style scoped>
.postContainer {
    margin-top: 2vh;
    
}
.createPostContainer {
    margin-top:8vh;
    min-width:600px;
    width:40%;
    margin-left:auto;
    margin-right:auto;
    border: 2px solid rgb(220,220,220);
    padding:5px;
}

.emptyFeed {
    display:flex;
    justify-content: center;
    align-items: center;
    height:93vh;
    min-width:600px;
    width:50%;
    margin-left: auto;
    margin-right: auto;
    border: 2px solid rgb(220,220,220);
}

.gotFeed {
    min-width:600px;
    width:40%;
    margin-left: auto;
    margin-right:auto;
    border: 2px solid rgb(220, 220, 220);
}

</style>
