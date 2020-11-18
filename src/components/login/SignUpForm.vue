<template>
  <v-container class="justify-center align-center pb-10 pt-12 mx-0" fluid>
    <v-row justify="center" style="width: 100vw;">
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card>
          <v-row class="justify-center">
            <v-card-title
              class="display-1 font-weight-bold"
              style="color:#333B52"
              >Sign Up</v-card-title
            >
          </v-row>
          <v-row class="flex-column align-center pa-6 pt-0">
            <v-btn
              color="#333B52"
              v-if="!form"
              class="btn mb-6 align-self-center white--text"
              rounded
              @click="appear"
              >Sign Up with Email</v-btn
            >
            <v-form v-if="form" class="w-100p" ref="form">
              <div
                class="d-flex flex-column align-center"
                v-for="(field, index) in formFields"
                :key="index"
              >
                <v-row class="w-100p mb-n3 mt-n5 justify-space-between">
                  <v-subheader class="font-weight-bold">{{
                    field.name
                  }}</v-subheader>
                </v-row>
                <v-text-field
                  :rules="field.rules"
                  dense
                  v-model="field.model"
                  :placeholder="field.placeholder"
                  :type="field.type"
                  :prepend-inner-icon="field.icon"
                  outlined
                  required
                  password
                  class="form-input"
                ></v-text-field>
              </div>
              <div class="d-flex flex-column align-center">
                <v-row class="w-100p mb-n3 mt-n5 justify-space-between">
                  <v-subheader class="font-weight-bold">I am a...</v-subheader>
                </v-row>
                <v-select
                  class="form-input"
                  v-model="accountType"
                  :items="accountTypes"
                  :rules="[value => !!value || 'Select a Value.']"
                  label="City/Company Representative"
                  outlined
                  required
                  dense
                  prepend-inner-icon="mdi-account-box-outline"
                ></v-select>
              </div>
              <div v-if="accountType" class="d-flex flex-column align-center">
                <v-row class="w-100p mb-n3 mt-n5 justify-space-between">
                  <v-subheader class="font-weight-bold"
                    >I represent...</v-subheader
                  >
                </v-row>
                <v-select
                  v-if="accountType == 'City Representative'"
                  class="form-input"
                  v-model="city"
                  :items="cityList"
                  :rules="[value => !!value || 'Select a Value.']"
                  label="Select..."
                  outlined
                  required
                  dense
                  prepend-inner-icon="mdi-account-box-outline"
                ></v-select>
                <v-select
                  v-else
                  class="form-input"
                  v-model="company"
                  :items="companyList"
                  :rules="[value => !!value || 'Select a Value.']"
                  label="Select..."
                  outlined
                  required
                  dense
                  prepend-inner-icon="mdi-account-box-outline"
                ></v-select>
              </div>
            </v-form>
            <v-btn
              color="#333B52"
              v-if="form"
              class="btn mb-6 align-self-center white--text"
              rounded
              @click="signUp"
              >Sign Up</v-btn
            >
            <v-row class="justify-center divider">
              <span></span>
              <p>or</p>
              <span></span>
            </v-row>
            <GoogleLoginButton buttonName="Sign Up with Google" />
            <v-btn
              absolute
              dark
              fab
              bottom
              left
              small
              color="#333B52"
              @click="$router.go(-1)"
            >
              <v-icon small>mdi-arrow-left</v-icon>
            </v-btn>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-container class="mt-5">
      <v-row justify="space-between" class="mx-md-n8 mb-n16">
        <v-col cols="4" class="pa-0"> </v-col>
        <v-col cols="4"> </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import store from "@/store";
import GoogleLoginButton from "@/components/login/GoogleLoginButton.vue";
import { db, auth } from "@/firebase/init.js";
export default {
  name: "SignUpForm",
  data() {
    return {
      form: false,
      email: null,
      password: null,
      displayName: null,
      accountType: null,
      accountTypes: ["Company Representative", "City Representative"],
      city: null,
      cityList: [],
      company: null,
      companyList: [],
      formFields: {
        name: {
          name: "Name",
          type: "text",
          rules: [value => !!value || "Name is Required."],
          model: null,
          placeholder: "Jane Doe",
          icon: "mdi-account-outline"
        },
        email: {
          name: "Email",
          type: "text",
          rules: [
            value => !!value || "Email is Required.",
            value => {
              const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              return pattern.test(value) || "Invalid e-mail.";
            }
          ],
          model: null,
          placeholder: "jane@example.com",
          icon: "mdi-email-outline"
        },
        password: {
          name: "Password",
          type: "password",
          rules: [value => !!value || "Password is Required."],
          model: null,
          placeholder: "••••••••••••",
          icon: "mdi-lock-outline"
        }
      }
    };
  },
  components: {
    GoogleLoginButton
  },
  methods: {
    appear() {
      this.form = true;
    },
    async signUp() {
      if (!this.$refs.form.validate()) return;
      auth
        .createUserWithEmailAndPassword(
          this.formFields.email.model,
          this.formFields.password.model
        )
        .then(async () => {
          var user = auth.currentUser;
          await db
            .collection("users")
            .doc(user.uid)
            .set({
              displayName: this.formFields.name.model,
              email: this.formFields.email.model,
              uid: user.uid,
              role: "approvalRequested"
            });
          if (this.accountType == "City Representative") {
            await db.collection("approvals").add({
              toApprove: user.uid,
              userName: this.formFields.name.model,
              representativeType: this.accountType,
              representing: this.city
            });
          } else {
            await db.collection("approvals").add({
              toApprove: user.uid,
              userName: this.formFields.name.model,
              representativeType: this.accountType,
              representing: this.company
            });
          }

          store.dispatch("getUser").then(() => {
            this.$router.push("/");
          });
        })

        .catch(function(error) {
          // Handle Errors here.
          var errorMessage = error.message;
          alert(errorMessage);
        });
    }
  },
  async mounted() {
    const cityNames = await db
      .collection("adminData")
      .doc("cityNames")
      .get();
    this.cityList = cityNames.data().cities;
    const companyNames = await db
      .collection("adminData")
      .doc("companyNames")
      .get();
    this.companyList = companyNames.data().companies;
  }
};
</script>

<style scoped>
.cloud {
  position: relative;
}
.btn {
  text-transform: none;
  width: 70%;
}
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
.divider {
  width: 100%;
}
.w-100p {
  width: 100%;
}
@media screen and (max-width: 600px) {
  .pt-sm {
    padding-top: 15vh;
  }
}
</style>
