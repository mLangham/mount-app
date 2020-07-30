<template>
  <v-layout align-center justify-center>
    <v-card width="400px">
      <v-card-title class="justify-center">
        <h3>Log in</h3>
      </v-card-title>
      <v-alert v-if="error == true" type="error"
        >Please sign up before attempting to login.</v-alert
      >
      <v-card-text>
        <div id="firebaseui-auth-container"></div>
        <div v-if="selection == true">
          <v-layout justify-center>
            <span>or, sign up as</span>
          </v-layout>
          <br />
          <div class="text-center">
            <v-btn ma-2 primary @click="citySignUp()">
              <span>City Rep</span>
            </v-btn>
            <v-btn ma-2 primary @click="companySignUp()">
              <span>Company Rep</span>
            </v-btn>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
import { authUI, authUIConfig } from "@/firebase/init";
export default {
  name: "AuthUI",
  props: ["error", "selection"],
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    citySignUp() {
      this.$router.push("/citySignUp");
    },
    companySignUp() {
      this.$router.push("/companySignUp");
    },
    profile() {
      this.$router.push("/profile");
    }
  },
  mounted() {
    authUI.start("#firebaseui-auth-container", authUIConfig);
  }
};
</script>
