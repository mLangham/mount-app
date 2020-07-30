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
    if (this.$store.state.user == "error") {
      this.$router.push("/loginerror");
    }
  }
};
</script>
