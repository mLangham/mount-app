const admin = require("firebase-admin");
const functions = require("firebase-functions");

const db = admin.firestore();

module.exports.requestApproval = functions.https.onCall(
  async (data, context) => {
    if (!context.auth) {
      return { message: "Authentication Required!", code: 401 };
    }
    let userUID = data.uid;
    let userName = data.name;
    let cityName = data.cityName;
    let companyName = data.companyName;
    if (cityName) {
      db.collection("approvals").add({
        toApprove: userUID,
        userName: userName,
        cityName: cityName
      });
    } else {
      db.collection("approvals").add({
        toApprove: userUID,
        userName: userName,
        companyName: companyName
      });
    }
    return;
  }
);
