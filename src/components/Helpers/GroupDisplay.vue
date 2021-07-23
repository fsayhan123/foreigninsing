<template>
    <div class = "card" v-on:click = "redirect">
        <div class = "icon">
            <b-avatar src = "https://placekitten.com/300/300" size = "4rem"></b-avatar>
        </div>
        <div class = "text">
            <p style = "font-size:22px;"><strong>{{data[1].communityName}}</strong></p>
            <p style = "font-size: 14px;">{{data[1].description}}</p>
        </div>
        
    </div>
</template>

<script>
export default {
    data : function () {
        return {
            
        }
    },
    props: {
        data : Array
    },
    methods : {
        redirect : function() {
            this.$router.push({ name: 'feed', query: {groupId: this.data[0]}})
        }
    }
}
</script>

<style scoped>
.card {
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 1px solid rgb(220,220,220);
    border-radius:25px;
    width:300px;
    height:125px;
}

.icon {
    display:flex;
    flex-basis:100px;
    align-items: center;
    justify-content: center;
}

.text {
    flex-basis:240px;
}

p {
    margin-bottom:0px;
}

</style>