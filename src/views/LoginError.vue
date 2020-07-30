<template>
  <LoginUI :error="true" :selection="true" />
</template>

<script>
import LoginUI from "../components/LoginUI";

export default {
  components: {
    LoginUI
  },
  async mounted() {
    // logs out user if they receive the loginerror
    await this.$store.dispatch("logOut");
  }
};
</script>
