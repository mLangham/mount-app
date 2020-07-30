<template>
  <LandingPage />
</template>

<script>
import LandingPage from "../components/LandingPage";
export default {
  name: "Home",
  components: {
    LandingPage
  },
  mounted() {
    // if user tries to log in without signing up, redirect to /loginerror (see store to see how this is setup)
    if (this.$store.state.user == "error") {
      this.$router.push("/loginerror");
    }
  }
};
</script>
