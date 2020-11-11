<template>
  <div>
    <v-toolbar color="#333B52">
      <v-btn text class="white--text" @click="home()">Mount Locks</v-btn>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <div v-if="user">
          <!-- if user is logged in -->
          <v-btn
            v-if="user.role != 'approvalRequested'"
            text
            @click="dataview()"
            class="white--text"
            >Scooter Info</v-btn
          >
          <v-btn
            v-if="user.role != 'approvalRequested'"
            text
            @click="profile()"
            class="white--text"
            >Profile</v-btn
          >
        </div>

        <v-icon v-if="user != null" @click="signOut()" class="white--text"
          >mdi-logout-variant</v-icon
        >

        <!-- if user is not logged in -->

        <div v-else>
          <v-btn
            color="#FFFFFF"
            class="align-self-center #333B52--text ma-3"
            @click="$router.push(`/signup`)"
            >Sign Up
          </v-btn>
          <v-btn
            color="#333B52"
            class="align-self-center white--text ma-3"
            @click="$router.push(`/login`)"
            >Log In</v-btn
          >
        </div>
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
