<template>
  <v-layout align-center justify-center class="background">
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <v-toolbar dark color="#333B52">
          <v-toolbar-title>Profile</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form">
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                  v-model="name"
                  label="Name"
                  readonly
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                  v-model="email"
                  label="Email"
                  readonly
                ></v-text-field>
              </v-flex>
            </v-layout>
            <div v-if="role != 'admin' && role != 'rejected'">
              <v-layout v-if="role" row>
                <v-flex xs12>
                  <v-text-field
                    v-if="cityName"
                    v-model="cityName"
                    label="City Name"
                    readonly
                  ></v-text-field>
                  <v-text-field
                    v-else
                    v-model="companyName"
                    label="Company Name"
                    readonly
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout v-else row>
                <v-flex xs12>
                  <v-select
                    v-if="userType == 'city'"
                    v-model="cityName"
                    :items="cityList"
                    label="Cities"
                  ></v-select>
                  <v-select
                    v-else
                    v-model="companyName"
                    :items="companyList"
                    label="Companies"
                  ></v-select>
                </v-flex>
              </v-layout>
              <v-btn
                v-if="!uid && role != 'rejected' && role != 'approved'"
                color="#333B52"
                @click="requestApproval"
                >Request Approval</v-btn
              >
            </div>
          </v-form>
          <v-layout
            v-if="role == 'admin' && requests"
            align-center
            justify-center
          >
            <v-flex>
              <v-card class="elevation-0">
                <v-toolbar dark color="#333B52">
                  <v-toolbar-title>Requests</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-list two-line subheader>
                    <v-list-item
                      v-for="(item, i) in requests"
                      :key="i"
                      @click="viewProfile(item.toApprove)"
                    >
                      <v-list-item-content>
                        <v-list-item-title
                          v-text="item.userName"
                        ></v-list-item-title>
                        <v-list-item-subtitle
                          v-if="item.cityName"
                          v-text="item.cityName"
                        ></v-list-item-subtitle>
                        <v-list-item-subtitle
                          v-else
                          v-text="item.companyName"
                        ></v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-btn icon>
                          <v-icon color="grey lighten-1" @click.stop="accept(i)"
                            >mdi-check-circle</v-icon
                          >
                        </v-btn>
                      </v-list-item-action>
                      <v-list-item-action>
                        <v-btn icon>
                          <v-icon color="grey lighten-1" @click.stop="reject(i)"
                            >mdi-close-circle</v-icon
                          >
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { functions } from "../firebase/init";
export default {
  name: "ProfileUI",
  data() {
    return {
      uid: this.$route.params.uid,
      name: null,
      email: null,
      role: null,
      cityName: null,
      cityList: ["Carbondale", "Providence", "Vail"],
      companyName: null,
      companyList: ["Bird", "Lime", "Scoot"],
      userType: null,
      requests: null
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  async mounted() {
    this.role = this.user.role;
    if (this.uid) {
      let findUser = await functions.httpsCallable("getUserData")({
        uid: this.uid
      });
      if (!findUser.data) {
        this.$router.push({
          name: "profile"
        });
      } else {
        this.name = findUser.data.displayName;
        this.email = findUser.data.email;
      }
    } else {
      this.name = this.user.displayName;
      this.email = this.user.email;
      this.userType = this.user.userType;
      this.companyName = this.user.companyName;
      this.cityName = this.user.cityName;
    }
    if (this.role == "admin") {
      let requests = [];
      let reqs = await functions.httpsCallable("retrieveRequests")({});
      reqs.data.forEach(element => {
        if (!element.rejected) {
          requests.push(element);
        }
      });
      this.requests = requests;
    }
  },
  methods: {
    async requestApproval() {
      if (this.userType == "city") {
        await functions.httpsCallable("requestApproval")({
          uid: this.user.uid,
          name: this.user.displayName,
          cityName: this.cityName
        });
      } else {
        await functions.httpsCallable("requestApproval")({
          uid: this.user.uid,
          name: this.user.displayName,
          companyName: this.companyName
        });
      }
      this.$store.dispatch("getUser").then(() => {
        this.$router.push("/");
      });
    },
    async viewProfile(uid) {
      this.$router.push("/profile/" + uid);
    },
    async accept(i) {
      await functions.httpsCallable("acceptRequest")({
        uid: this.requests[i].requestID
      });
      this.requests.splice(i, 1);
    },
    async reject(i) {
      await functions.httpsCallable("rejectRequest")({
        uid: this.requests[i].requestID
      });
      this.requests.splice(i, 1);
    }
  }
};
</script>
<style scoped></style>
