<template>
  <v-layout align-center justify-center>
    <div>
      <v-container>
        <v-layout text-center wrap>
          <v-flex xs12>
            <div v-if="user">
              <div v-if="user.role == 'approvalRequested'">
                <v-card-title class="display-1" style="color:#333B52"
                  >Hold tight! An administrator will approve your account soon.
                </v-card-title>
              </div>

              <div v-else>
                <v-row class="justify-center">
                  <v-card-title class="display-1" style="color:#333B52"
                    >Hello, welcome to
                  </v-card-title>

                  <v-img
                    :src="require('../assets/MountLogo.png')"
                    class="my-3"
                    contain
                    height="190"
                  ></v-img>
                </v-row>
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
