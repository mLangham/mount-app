
<template>
  <div>
<!--   
  <div v-if = "markers"> -->
    
    <gmap-map
      :center="center"
      :zoom="12"
      style="width:93%;  height: 350px; margin:auto;"
    >
   

       <GmapMarker
    :key="index"
    v-for="(m, index) in getMarkers()"

    :position="m.position"
    :clickable="true"
    :draggable="true"
    @click="center=m.position"
  />

   
</gmap-map>

  </div>
<!-- 
  </div> -->

</template>

<script>
import { functions } from "@/firebase/init"


export default {
  name: "GoogleMap",
  data() {


    return {
      center: { lat: 37.9168362, lng: -122.076972 },
      places: [],
      currentPlace: null,
      data: { lat: 37.9168362, lng: -122.076972 },
      
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




//   async mounted() {
//     let rawData = await functions.httpsCallable("retrieveScooters")({});
//     this.data = rawData.data;
 

//     console.log(this.data,"this is you raw data")
//   },



async getMarkers(){




    let rawData = await functions.httpsCallable("retrieveScooters")({});

    console.log(rawData.data, "first print")

    var markers = [];
    var temp = [];


    for(let i=0;i<rawData.data.length;i++){
     
          temp.push({
              position:{lat: rawData.data[i].lat, lng: rawData.data[i].long}      
            });  
            
        }

        markers = temp;

        console.log(markers, "these markers")
        return markers;      
    },

    
  },

};
// store into temporary array
//set temp to markers

// v if (markers)


</script>

