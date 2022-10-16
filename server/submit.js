const mongoose = require("mongoose");
require("./customFunctions/userModel");
const User = mongoose.model("users");
const shortid = require("shortid");

exports.handler = async (event, context) => {

  const array = event.body.split("email=");
  console.log("Array: " + array);
  const email = decodeURIComponent(array[1]);
  console.log("Email: " + email);

  try {
    console.log("2");
    mongoose.connect(process.env.MONGO_URI);

    const existingUser = await User.findOne({ email: email });
    console.log("3");

    if (!existingUser) {
      const shortIdVariable = shortid.generate();
      const user = await new User({
        email: email,
        referralId: shortIdVariable,
        numberOfReferrals: 0
      }).save();
    }
    console.log("4");
    mongoose.disconnect();
    console.log("5");

    return {
      statusCode: 200,
      headers: {
        "Location": "/eary-access"
      },
      body: "Success",
    };

  } catch (err) {

    return {
      statusCode: 400,
      body: err,
    };

  }
};