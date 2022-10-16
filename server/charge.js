const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {

  console.log("1");
  console.log("Event Object: " + event);
  console.log("Event Body Object: " + event.body);
  const array = event.body.split("stripeToken=");
  console.log("Stripe Token: " + array[1]);

  try {
    const token = array[1];

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