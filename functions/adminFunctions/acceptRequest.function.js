const admin = require("firebase-admin");
const functions = require("firebase-functions");

const db = admin.firestore();

module.exports.acceptRequest = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    return { message: "Authentication Required!", code: 401 };
  }
  let userData = await db
    .collection("users")
    .doc(context.auth.uid)
    .get();
  if (userData.data().role !== "admin") {
    return {
      message: "You are not authorized to perform this action",
      code: 401
    };
  }
  let requestData = await db
    .collection("approvals")
    .doc(data.uid)
    .get();
  await db
    .collection("users")
    .doc(requestData.data().toApprove)
    .update({
      role: "approved",
      companyName: requestData.data().companyName
        ? requestData.data().companyName
        : null,
      cityName: requestData.data().cityName ? requestData.data().cityName : null
    });
  await db
    .collection("approvals")
    .doc(data.uid)
    .delete();
  return;
});
