<template>
  <div>
    <div>
      <h1 style="text-align: center">{{ this.name }}'s information</h1>
    </div>
    <div style="padding: 30px">
      <b-card bg-variant="dark" text-variant="white" title="Organisation Description">
        <b-card-text>
          {{this.description}}
        </b-card-text>
      </b-card>
      <br>
      <b-card bg-variant="dark" text-variant="white" title="Contact Number">
        <b-card-text>
          {{this.contactNum}}
        </b-card-text>
      </b-card>
      <br>
      <b-card bg-variant="dark" text-variant="white" title="Organisation Link">
        <b-card-text>
          {{this.link}}
        </b-card-text>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrgInfo",
  props: {
    name: String,
    link: String,
    contactNum: String,
    description: String,
  },
  data() {
    return {};
  },

  methods: {},
  created: function() {
    this.name = this.$route.query.name;
    this.link = this.$route.query.link;
    this.contactNum = this.$route.query.contactNum;
    this.description = this.$route.query.description;
  },
};
</script>

<style scoped></style>
