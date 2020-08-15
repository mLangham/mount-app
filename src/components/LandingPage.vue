<template>
  <v-layout align-center justify-center>
    <div>
      <v-container>
        <v-layout text-center wrap>
          <v-flex xs12>
            <v-img
              :src="require('../assets/MountLogo.png')"
              class="my-3"
              contain
              height="200"
            ></v-img>
          </v-flex>
          <v-flex mb-4>
            <h1 class="display-2 font-weight-bold mb-3">
              Welcome to Mount
            </h1>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </v-layout>
</template>

<script>
export default {};
</script>

<style scoped>
div {
  background-image: linear-gradient(
    225deg,
    #564f55 0%,
    #222233 33%,
    #021112 66%,
    #000000 100%
  );
}
h1 {
  color: white;
}
</style>
