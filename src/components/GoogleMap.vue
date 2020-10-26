
<template>
  <div>
  
  <div v-if = "markers.length > 0">
      <v-container class="pb-16">

    <gmap-map
      :center="center"
      :zoom="10"
      style=" height: 350px; margin:auto;"
    >
  

  <GmapMarker 
   
    :key="index"
    v-for="(m, index) in markers"
    :position="m.position"
    :clickable="true"
    :draggable="true"
    @click="center=m.position"
  />

   
</gmap-map>

 </v-container>

  </div>

  </div>

</template>

<script>
import { functions } from "@/firebase/init"


export default {
  name: "GoogleMap",
  props: ['centerLat','centerLng'],
  
  data() {

    return {
      //center: {lat: 31.52, lng: 49.8},  


     center: {lat: this.centerLat, lng: this.centerLng},
      places: [],
      currentPlace: null,
      markers: []
      
    };
  },


  methods: {

  geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },


async getMarkers(){

    let rawData = await functions.httpsCallable("retrieveScooters")({});

    for(let i=0;i<rawData.data.length;i++){

          this.markers.push({
              position:{lat: rawData.data[i].lat, lng: rawData.data[i].long}      
            });            
        }
    },
  },


  async mounted() {
      await this.getMarkers(); 
  },

};

</script>

