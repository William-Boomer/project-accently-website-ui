const mongoose = require("mongoose");
require("./customFunctions/userModel");
const User = mongoose.model("users");
const shortid = require("shortid");

exports.handler = async (event, context) => {

  const array = event.body.split("email=");
  const email = decodeURIComponent(array[1]);

  try {
    console.log("2");
    mongoose.connect(process.env.MONGO_URI);

    const existingUser = await User.findOne({ email: email });
    console.log("3");

    if (existingUser) {
      //context.cookies.set("emailHash", email);
      console.log("Existing User Context Object: " + context.cookies);
      console.log("Existing User Cookie: " + context.cookies.get("email"));
    }

    if (!existingUser) {
      const shortIdVariable = shortid.generate();
      //context.cookies.set("emailHash", email);
      console.log("New User Context Object: " + context.cookies);
      console.log("New User Cookie: " + context.cookies.get("email"));
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
      statusCode: 302,
      headers: {
        "Location": "https://accently.ai/early-access"
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