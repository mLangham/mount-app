<template>
<div>



  <v-layout align-center justify-center class="table">
    <v-container class="pt-16">
      <!-- <h3>
        Scooter and Lock IDs for
        {{
          this.$store.state.user.cityName == null
            ? this.$store.state.user.companyName
            : this.$store.state.user.cityName
        }}
      </h3> -->
      <v-layout text-center row wrap>
        <v-flex mb-4>
          <template v-if="data != null"
            ><v-row class="table-search">
              <v-flex mx-1>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-flex>
              <v-flex v-if="user.cityName || user.role == 'admin'" mx-1>
                <v-select
                  :items="companyNames"
                  v-model="companyName"
                  label="Company Name"
                  multiple
                ></v-select>
              </v-flex>
              <v-flex v-if="user.companyName || user.role == 'admin'" mx-1>
                <v-select
                  :items="cityNames"
                  v-model="cityName"
                  label="City Name"
                  multiple
                ></v-select>
              </v-flex>
            </v-row>
            <v-data-table
              item-key="scooterID"
              :headers="headers"
              :items="data"
              :items-per-page="5"
              class="elevation-1"
              :search="search"
              :loading="data == null"
              loading-text="Loading please wait ..."
            >


             <template #item.location="{ item }"
            

                ><button>
                 <!-- <a @click="openMap(item)" target="_blank">Open</a> -->

                  <a @click="recenter(item)">Zoom</a>



                </button></template
              >


            </v-data-table>
          </template>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
 

  <GoogleMap v-bind:centerLat = 120.20 v-bind:centerLng = 16.52></GoogleMap>




  </div>
</template>

<script>
  //lat: 120.48
  //lng: 16.04

import { functions } from "@/firebase/init";
import GoogleMap from "../components/GoogleMap";

export default {
  name: "DataViewUI",
  computed: {
    user() {
      return this.$store.state.user;
    }
  },

  components: {   
    GoogleMap   
    
  },

  data() {
    return {
   
      loader: null,
      search: "",
      data: null,
      cityNames: ["Carbondale", "Providence", "Vail"],
      cityName: [],
      companyNames: ["Bird", "Lime", "Scoot"],
      companyName: [],

      currentLat: 120.48,
      currentLng: 16.04,

      headers: [
        {
          text: "Scooter ID",
          sortable: false,
          value: "scooterID"
        },
        {
          text: "Lock ID",
          sortable: false,
          value: "lockID"
        },
        {
          text: "Location",
          sortable: false,
          value: "location"
        },
        {
          text: "Number of Rides",
          value: "numRides"
        },
        {
          text: "Average Trip Length",
          value: "avgTripLength"
        },
        {
          text: "Lock Battery Level",
          value: "batteryLevel"
        },
        {
          text: "City",
          value: "cityName",
          filter: value => {
            if (this.cityName.length == 0) return true;
            return this.cityName.includes(value);
          }
        },
        {
          text: "Company",
          value: "companyName",
          filter: value => {
            if (this.companyName.length == 0) return true;
            return this.companyName.includes(value);
          }
        }
      ]
    };
  },
  methods: {
    
    // openMap(item) {

  

    //   window.open(
    //     `https://maps.google.com/maps?q=${item.lat},${item.long}`,
    //     "_blank"
    //   ); 
    // },

    recenter(item) {
 

      console.log(item.lat, "recentered");
      console.log(item.long, "recentered");

      this.currentLng = item.long;
      this.currentLat = item.lat;

    
    

    }



  },

  
  async mounted() {
    let rawData = await functions.httpsCallable("retrieveScooters")({});
    this.data = rawData.data;

    

  }
};


</script>
<style scoped>

</style>
