<template>
  <div>
    <div v-if="markers.length > 0">
      <v-container class="pb-16">
        <gmap-map
          :center="center"
          :zoom="10"
          style=" height: 350px; margin:auto;"
        >
          <gmap-marker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            @click="(center = m.position), toggleInfoWindow(m, index)"
          >
          </gmap-marker>

          <gmap-info-window
            :options="infoOptions"
            :position="infoWindowPos"
            :opened="infoWinOpen"
            @closeclick="infoWinOpen = false"
          >
            <div v-html="infoContent"></div>
          </gmap-info-window>
        </gmap-map>
      </v-container>
    </div>
  </div>
</template>

<script>
import { functions } from "@/firebase/init";

export default {
  name: "GoogleMap",
  props: ["centerLat", "centerLng"],

  data() {
    return {
      center: { lat: this.centerLat, lng: this.centerLng },
      //places: [],
      //currentPlace: {lat: 31.52, lng: 49.8},
      markers: [
        {
          scooterID: "",
          lockID: "",
          batteryLevel: 0,
          companyName: "",
          position: {}
        }
      ],
      map: null,
      infoContent: "",
      infoWindowPos: {
        lat: 0,
        lng: 0
      },
      infoWinOpen: false,
      currentMidx: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    };
  },

  methods: {
    toggleInfoWindow: function(marker, idx) {
      this.infoWindowPos = marker.position;
      this.infoContent = this.getInfoWindowContent(marker);

      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    },

    getInfoWindowContent: function(marker) {
      return `<div class="card">
            <div class="card-content">
              <div class="content">
                <b>Scooter ID:</b> ${marker.scooterID}
                <br>
                <b>Lock ID:</b> ${marker.lockID}
                <br>
                <b>Battery Level:</b> ${marker.batteryLevel}%
                <br>
                <b>Company:</b> ${marker.companyName}
               <br>
              </div>
          </div>
      </div>`;
    },

    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },

    async getMarkers() {
      let rawData = await functions.httpsCallable("retrieveScooters")({});

      for (let i = 0; i < rawData.data.length; i++) {
        this.markers.push({
          position: { lat: rawData.data[i].lat, lng: rawData.data[i].long },
          batteryLevel: [rawData.data[i].batteryLevel],
          scooterID: [rawData.data[i].scooterID],
          lockID: [rawData.data[i].lockID],
          companyName: [rawData.data[i].companyName]
        });
      }
    }
  },

  async mounted() {
    await this.getMarkers();
  }
};
</script>
