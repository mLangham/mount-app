<template>
  <div>
    <v-toolbar color="#333B52">
      <v-btn text class="white--text" @click="home()">Mount Locks</v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn
          v-if="user != 'approvalRequested' && user != null"
          text
          @click="dataview()"
          class="white--text"
          >Scooter Info</v-btn
        >
        <v-btn
          v-if="user != 'approvalRequested' && user != null"
          text
          @click="profile()"
          class="white--text"
          >Profile</v-btn
        >
        <v-btn icon>
          <v-icon v-if="user != null" @click="signOut()" class="white--text"
            >mdi-logout-variant</v-icon
          >
          <v-icon color="white" v-else @click="signIn()"
            >mdi-login-variant</v-icon
          >
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: "NavigationBar",
  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    async signOut() {
      await this.$store.dispatch("logOut");
      this.$router.push("/").catch(() => {});
    },
    signIn() {
      this.$router.push("/login");
    },
    home() {
      this.$router.push("/");
    },
    profile() {
      this.$router.push("/profile");
    },
    dataview() {
      this.$router.push("/dataview");
    }
  }
};
</script>
