<template>
  <div>
    <p>Organisations page</p>
    <ul class="ngoList">
      <li v-for="org in ngoArr" v-bind:key="org.index">
        <b-list-group-item>
          <a v-bind:href="org[1]" style="padding: 20px">{{ org[0] }}</a>
          <br />
          <b-col lg="4" class="pb-2"
            ><b-button
              pill
              size="sm"
              v-on:click="getInfo(org[0], org[1], org[2], org[3])"
              >Information</b-button
            ></b-col
          >
        </b-list-group-item>
        <br />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      ngoArr: [
        [
          "Transient Workers Count too",
          "https://twc2.org.sg/",
          "6247 7001",
          "Transient Workers Count Too (TWC2) is a non-profit organisation in Singapore dedicated to improving conditions for low-wage migrant workers, perhaps the largest group of disadvantaged persons here, numbering about one million out of a total population of nearly six million in this city.Founded in 2003, we are led by an Executive Committee comprised mainly of Singapore citizens. We operate with a small number of regular staff and a larger number of unpaid volunteers.",
        ],
        [
          "Humanitarian Organisation for Migrant Economics",
          "https://www.teamlewis.com/our-work/home-humanitarian-organization-for-migration-economics/#:~:text=Humanitarian%20Organization%20for%20Migration%20Economics%20%5B%E2%80%9CH.O.M.E.%E2%80%9D%5D%20is%20a,and%20suffer%20abuse%20and%20exploitation.",
          "6337 0282",
          "Humanitarian Organization for Migration Economics [“H.O.M.E.”] is a Singapore-based charity founded in 2004. They are dedicated to empowering and supporting migrant workers who are victims of human rights violations and suffer abuse and exploitation. They work with corporations, government agencies, and community partners to promote inclusion, justice, equality, and dignity for all. They aim to increase awareness of their situation through public education and campaigns on issues affecting the migrant worker population. Through their advocacy work, they hope to help bring about changes to improve the lives of migrant workers in Singapore. HOME also ramped up the operations at the shelter for domestic workers in distress and to accommodate an increasing number of people reaching out for support.",
        ],
        [
          "HealthServe",
          "https://www.healthserve.org.sg/",
          "6493 3282",
          "Founded in 2006 on Christian values, HealthServe seeks to meet the needs of the migrant workers in our community through the provision of medical care, counseling, case work, social assistance, and other support services. Over the years, we have developed partnerships with regulatory authorities, agencies, schools and corporate organisations to initiate public health awareness programs and research projects. OUR MISSION: To serve disadvantaged migrant workers in Singapore through healthcare, counseling, casework and social assistance. To advocate for and raise awareness of the needs of migrant workers. To bridge communities through meaningful partnerships and being a platform for effective volunteerism.",
        ],
        [
          "Migrant Worker Centre",
          "http://www.mwc.org.sg/",
          "6493 3282",
          "placeholder",
        ],
        ["Aidha", "https://www.aidha.org", "6493 3282", "placeholder"],
        [
          "Philippine Bayanihan Society Singapore (PBSS)",
          "https://www.bayanihancentre.org.sg/",
          "6493 3282",
          "placeholder",
        ],
        ["ACMI", "http://www.acmi.org.sg/", "6493 3282", "placeholder"],
        [
          "Foreign Domestic Worker Association for Social Support and Training (FAST)",
          "https://www.fast.org.sg/",
          "6493 3282",
          "placeholder",
        ],
      ],
    };
  },

  methods: {
    getInfo: function(name,link, contactNum, description) {
      console.log("name is: " + name);
      this.$router.push({
        name: "OrgInfo",
        query: {
          name: name,
          link: link,
          contactNum: contactNum,
          description: description,
        },
      });
    },
  },
};
</script>

<style scoped>
.container {
  border: 1px solid black;
}
.ngoList {
  text-decoration: none;
  list-style: none;
}
</style>
