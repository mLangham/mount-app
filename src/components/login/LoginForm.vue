// Sign Up      Log In 

// Actual log in page 
<template>
  <v-row
    class="pb-10 px-5 justify-center align-center"
    style="min-height: 100vh;"
  >
    <v-row justify="center" style="width: 100vw;">
      <v-col v-if="!this.renderLogin" cols="12" sm="6" md="4">
        <v-row class="justify-space-between">
          <v-btn color="#333B52"
            style="text-transform: none; width: 40%; height: 72px; font-size: 2em; z-index: 1;"
            class="align-self-center white--text ma-3"
            rounded
            x-large
            @click="$router.push(`/signup`)"
            >Sign Up</v-btn
          >
          <v-btn color="#333B52"
            style="text-transform: none; width: 40%; height: 72px; font-size: 2em;"
            class="align-self-center white--text ma-3"
            rounded
            x-large
            @click="renderLogin = !renderLogin"
            >Log In</v-btn
          >
        </v-row>
      </v-col>
      <v-col v-else cols="12" sm="6" md="4" lg="3">
        <v-card>
          <v-row class="justify-center">
            <v-card-title
              class="display-1 font-weight-bold"
              style="color:#333B52"
              >Log In</v-card-title
            >
          </v-row>
          <v-row class="flex-column align-center pa-6 pt-0">
            <v-form
              style="width: 100%"
              class="d-flex flex-column align-center"
              ref="form"
            >
              <v-row class="mb-n3  justify-space-between form-input">
                <v-subheader class="pl-0 font-weight-bold"
                  >Email Address</v-subheader
                >
              </v-row>
              <v-text-field
                dense
                :rules="emailRules"
                class="form-input"
                v-model="email"
                placeholder="jane@example.com"
                type="text"
                prepend-inner-icon="mdi-email-outline"
                outlined
              ></v-text-field>
              <v-row class="mb-n3 mt-n5 justify-space-between form-input">
                <v-subheader class="pl-0 font-weight-bold"
                  >Password</v-subheader
                >
                <router-link
                  style="z-index: 1;"
                  class="pr-0 d-flex align-center caption"
                  to="/resetPw"
                  >Forgot Password?</router-link
                >
              </v-row>
              <v-text-field
                dense
                :rules="passwordRules"
                class="form-input"
                v-model="password"
                placeholder="••••••••••••"
                type="password"
                prepend-inner-icon="mdi-lock-outline"
                outlined
              ></v-text-field>
            </v-form>
            <v-btn color="#333B52"
              style="text-transform: none; width: 70%;"
              class="mb-6 align-self-center white--text"
              rounded
              @click="login()"
              >Log In</v-btn
            >
            <v-row style="width: 95%;" class="justify-center divider">
              <span></span>
              <p>Or</p>
              <span></span>
            </v-row>
            <GoogleLoginButton buttonName="Log In with Google" />
          </v-row>
          <v-btn
            absolute
            dark
            fab
            bottom
            left
            small
            color="#333B52"
            @click="renderLogin = !renderLogin"
          >
            <v-icon small>mdi-arrow-left</v-icon>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
    <v-container class="mt-5">
      <v-row justify="space-between" class="mx-md-n8 mb-n16">
        <v-col cols="4" class="pa-0">
        </v-col>
        <v-col cols="4">
        </v-col>
      </v-row>
    </v-container>
  </v-row>
</template>

<script>
import GoogleLoginButton from "@/components/login/GoogleLoginButton";
import { auth } from "@/firebase/init";
export default {
  name: "LoginForm",
  data() {
    return {
      email: null,
      password: null,
      renderLogin: false,
      emailRules: [
        value => !!value || "Email is Required.",
        value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      ],
      passwordRules: [value => !!value || "Password is Required."]
    };
  },
  components: {
    GoogleLoginButton,
  },
  methods: {
    async login() {
      if (!this.$refs.form.validate()) return;
      auth.signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push("/");
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorMessage = error.message;
          alert(errorMessage);
        });
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.form-input {
  width: 95%;
}
.divider span {
  overflow: visible;
  padding: 0;
  margin-top: 12px;
  margin-left: 5px;
  margin-right: 5px;
  border: none;
  border-top: 1px solid #e0e0e0;
  color: #6e6d7a;
  text-align: center;
  width: 33%;
}
.divider p {
  color: #6e6d7a;
}
</style>