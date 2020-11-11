<template>
  <v-layout align-center justify-center>
    <div>
      <v-container>
        <v-layout text-center wrap>
          <v-flex xs12>
            <div v-if="user">
              <div v-if="user.role == 'approvalRequested'">
                Not Approved yet
              </div>

              <div v-else>
                Hello, welcome to Mount
              </div>
            </div>

            <v-img
              v-else
              :src="require('../assets/MountLogo.png')"
              class="my-3"
              contain
              height="190"
            ></v-img>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </v-layout>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user;
    }
  }
};
</script>

<style scoped></style>
