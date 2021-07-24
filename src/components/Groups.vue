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
          Find your Interest Groups and Communities!
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
          <div class="createGroup">
            <b-form-group
              id="fieldset-1"
              label="Name of Community"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="groupName"
                :state="state"
                trim
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="fieldset-2"
              label="Brief Description"
              label-for="input-2"
            >
              <b-form-input
                id="input-2"
                v-model="briefDescription"
                :state="state"
                trim
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="fieldset-3"
              label="Information on the Community"
              label-for="input-3"
            >
              <b-form-input
                style="height: 100px"
                id="input-3"
                v-model="groupDescription"
                :state="state"
                trim
              ></b-form-input>
            </b-form-group>
            <br />
            <div>
              <b-button style="border-radius: 30px" @click="click1"
                >Choose a photo</b-button
              >
              <input
                type="file"
                accept="image/*"
                ref="input1"
                style="display: none"
                @change="previewImage"
              />
            </div>
            <br>
            <b-button v-on:click="createGroup" pill variant="primary"
              >Create Group</b-button
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
      groupName: "",
      briefDescription: "",
      groupDescription: "",
      img1: "",
    };
  },

  methods: {
      click1() {
      this.$refs.input1.click();
    },
    previewImage(event) {
      this.uploadValue = 0;
      this.img1 = null;
      this.imageData = event.target.files[0];
      this.onUpload();
    },
    onUpload() {
      this.img1 = null;
      const storageRef = firebase
        .storage()
        .ref(`${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.img1 = url;
          });
        }
      );
    },
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
    async createGroup() {
      await firebase
        .firestore()
        .collection("Communities")
        .add({
          communityName: this.groupName,
          briefDesc: this.briefDescription,
          groupDesc: this.groupDescription,
          groupPic : this.img1,
        })
        .then(() => {
          alert("Community Created!");
          location.reload();
          //   this.$router.push("/")
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
          // doc.data() is never undefined for query doc snapshots
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

.createGroup {
  border: 1px solid black;
  width: 28%;
  margin-top: 20px;
  margin-right: 100px;
  padding: 25px;
  float: left;
}
</style>