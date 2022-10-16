const mongoose = require("mongoose");
require("./customFunctions/userModel");
const User = mongoose.model("users");
const shortid = require("shortid");

exports.handler = async (event, context) => {

  const data = JSON.parse(event.body);

  try {
    console.log("1");
    mongoose.connect(process.env.MONGO_URI);

    const existingUser = await User.findOne({ email: data.email });
    console.log("2");

    if (!existingUser) {
      const shortIdVariable = shortid.generate();
      const user = await new User({
        email: data.email,
        referralId: shortIdVariable,
        numberOfReferrals: 0
      }).save();
    }
    console.log("3");
    mongoose.disconnect();
    console.log("4");

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