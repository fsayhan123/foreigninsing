<template>
    <div>
        <div v-if = "data[1].imageURL === ''">
            <div class = "postItem"> 
                <div class = "postName"> 
                    <div class = "icon">
                        <b-avatar :src = "data[1].user.profilePictureURL" size = "3rem"></b-avatar>
                    </div>
                    <div class = "Name">
                        {{data[1].user.Username}}
                    </div>
                </div>
                <div class = "postText"> 
                    <div style = "flex-basis:20%;"></div>
                    <div style = "flex-basis:80%;">{{data[1].description}}</div>
                </div>
            </div> 
        </div>
        <div v-else>
            <div class = "postItemWithImage">
                <div class = "postName"> 
                    <div class = "icon">
                        <b-avatar :src = "data[1].user.profilePictureURL" size = "3rem"></b-avatar>
                    </div>
                    <div class = "Name">
                        {{data[1].user.Username}}
                    </div>
                </div>
                <img class = "postImage" :src = "data[1].imageURL" /> 
                <div class = "postText">    
                    <div style = "flex-basis:20%; display:flex;"></div>
                    <div style = "flex-basis:80%; display:flex;">{{data[1].description}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data : Array,
    }    
}
</script>

<style scoped>
.postItemWithImage {
    height:60vh;
    width:100%;
}

.postName {
    display:flex;
    flex-direction: row;
    height:7vh;
    width:100%;
}

.postText {
    display:flex;
    padding-top:20px;
    height:13vh;
}

.icon {
    display: flex;
    flex-basis: 20%;
    justify-content: center;
    align-items: center;
}

.Name {
    display: flex;
    flex-basis: 80%;
    align-items: center;
}

.postImage {
    object-fit: scale-down;
    height:40vh;
    width:100%;
}

.postText {
    height:13vh;
}

.postItem {
    height:20vh;
    width:100%;
}

p {
    margin-bottom: 0px;
}

</style>