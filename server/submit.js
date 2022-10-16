const mongoose = require("mongoose");
require("./customFunctions/userModel");
const User = mongoose.model("users");
const shortid = require("shortid");

exports.handler = async (event, context) => {

  console.log("1");
  console.log("Event Object: " + event);
  console.log("Event Body Object: " + event.body);
  const array = event.body.split("email=");
  console.log("Array" + array);
  const email = decodeURIComponent(array[1]);
  console.log("Email" + email);
  const data = JSON.parse(event.body);

  try {
    console.log("2");
    mongoose.connect(process.env.MONGO_URI);

    const existingUser = await User.findOne({ email: data.email });
    console.log("3");

    if (!existingUser) {
      const shortIdVariable = shortid.generate();
      const user = await new User({
        email: data.email,
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