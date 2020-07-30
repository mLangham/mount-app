const admin = require("firebase-admin");
const functions = require("firebase-functions");

const db = admin.firestore();

module.exports.retrieveScooters = functions.https.onCall(
  async (data, context) => {
    if (!context.auth) {
      return { message: "Authentication Required!", code: 401 };
    }
    let userData = await db
      .collection("users")
      .doc(context.auth.uid)
      .get();
    console.log(userData.data());
    if (userData.data().cityName) {
      const requests = db
        .collection("scooters")
        .where("cityName", "==", userData.data().cityName);
      let reqData = await requests.get();
      let res = [];
      reqData.forEach(element => {
        res.push({
          avgTripLength: element.data().avgTripLength,
          batteryLevel: element.data().batteryLevel,
          cityName: element.data().cityName,
          companyName: element.data().companyName,
          lat: element.data().lat,
          long: element.data().long,
          lockID: element.data().lockID,
          scooterID: element.data().scooterID,
          numRides: element.data().numRides,
          elementID: element.id
        });
      });
      return res;
    } else if (userData.data().companyName) {
      const requests = db
        .collection("scooters")
        .where("companyName", "==", userData.data().companyName);
      let reqData = await requests.get();
      let res = [];
      reqData.forEach(element => {
        res.push({
          avgTripLength: element.data().avgTripLength,
          batteryLevel: element.data().batteryLevel,
          cityName: element.data().cityName,
          companyName: element.data().companyName,
          lat: element.data().lat,
          long: element.data().long,
          lockID: element.data().lockID,
          scooterID: element.data().scooterID,
          numRides: element.data().numRides,
          elementID: element.id
        });
      });
      return res;
    } else if (userData.data().role === "admin") {
      const requests = db.collection("scooters");
      let reqData = await requests.get();
      let res = [];
      reqData.forEach(element => {
        res.push({
          avgTripLength: element.data().avgTripLength,
          batteryLevel: element.data().batteryLevel,
          cityName: element.data().cityName,
          companyName: element.data().companyName,
          lat: element.data().lat,
          long: element.data().long,
          lockID: element.data().lockID,
          scooterID: element.data().scooterID,
          numRides: element.data().numRides,
          elementID: element.id
        });
      });
      return res;
    }
  }
);
