const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {

  console.log("1");
  const data = JSON.parse(event.body);

  try {
    const token = data.stripeToken;

    const charge = await stripe.charges.create(
      {
        amount: 10000,
        currency: "usd",
        description: "Down payment for first access to Accently",
        source: token,
      }
    );

    return {
      statusCode: 200,
      headers: {
        "Location": "/thank-you-eary-access"
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