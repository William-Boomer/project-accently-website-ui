const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {

  const name = event.body.split("name=")[1].split("email=")[0];
  console.log("Name: " + name);
  const email = event.body.split("email=")[1].split("stripeToken=")[0];
  console.log("Name: " + email);
  const stripeToken = event.body.split("stripeToken=")[1];
  console.log("Stripe Token: " + stripeToken);

  try {
    const token = stripeToken;

    const charge = await stripe.charges.create(
      {
        amount: 10000,
        currency: "usd",
        description: "Down payment for first access to Accently",
        source: token,
      }
    );

    return {
      statusCode: 302,
      headers: {
        "Location": "https://accently.ai/thank-you-early-access"
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