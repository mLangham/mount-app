<!-- For use after Google Signup Route -->
<template>
  <v-row
    class="pb-10 px-5 justify-center align-center"
    style="min-height: calc(100vh - 120px)"
  >
    <v-container class="mt-5">
      <v-row justify="space-between" class="mx-md-n8 mb-n16">
        <v-col cols="6" class="pa-0">
        </v-col>
      </v-row>
    </v-container>
    <v-col cols="12" sm="6" md="4">
      <v-card>
        <v-card-title
          class="justify-center font-weight-bold --text"
          style="color= #333B52"
        >
          
          <h3>Finish Sign Up</h3>
        </v-card-title>
        <v-card-text>
          <v-form class="form-input" ref="form">
            <v-text-field
              class="form-input"
              v-model="displayName"
              type="text"
              label="Name"
              placeholder="Jone Doe"
            ></v-text-field>
            <div class="d-flex flex-column align-center">
                <v-row class="w-100p mb-n3 mt-n5 justify-space-between">
                  <v-subheader class="font-weight-bold">I am a...</v-subheader>
                </v-row>
                <v-select
                  class="form-input"
                  v-model="accountType"
                  :items="accountTypes"
                  :rules="[(value) => !!value || 'Select a Value.']"
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
                  :rules="[(value) => !!value || 'Select a Value.']"
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
                  :rules="[(value) => !!value || 'Select a Value.']"
                  label="Select..."
                  outlined
                  required
                  dense
                  prepend-inner-icon="mdi-account-box-outline"
                ></v-select>
              </div>
            <v-btn color="#333B52" class="mr-4 white--text" @click="finishSignUp">
              Submit
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
    <v-container class="mt-5">
      <v-row justify="space-between" class="mx-md-n8 mb-n16">
      </v-row>
    </v-container>
  </v-row>
</template>

<script>
import { db, auth } from "@/firebase/init";
import store from "@/store";
export default {
  name: "FinishSignUpForm",
  data() {
    return {
      displayName: null,
      accountType: null,
      accountTypes: ["Company Representative", "City Representative"],
      city: null,
      cityList: [],
      company: null,
      companyList: [],
    };
  },
  methods: {
    async finishSignUp() {
      if (!this.$refs.form.validate()) return;
      var user = auth.currentUser;
          await db
            .collection("users")
            .doc(user.uid)
            .set({
              role: "approvalRequested",
            });
          if (this.accountType == "City Representative") {
            await db.collection("approvals").add({
              toApprove: user.uid,
              userName: this.formFields.name.model,
              representativeType: this.accountType,
              representing: this.city,
            });
          } else {
            await db.collection("approvals").add({
              toApprove: user.uid,
              userName: this.formFields.name.model,
              representativeType: this.accountType,
              representing: this.company,
            });
          }
          store.dispatch("getUser").then(() => {
            this.$router.push("/");
          });
    }
  },
  async mounted() {
    this.displayName = auth.currentUser.displayName;
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
.form-input {
  width: 95%;
}
</style>