const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {

  console.log("1");
  console.log("Event Object: " + event);
  console.log("Event Body Object: " + event.body);
  const array = event.body.split("email=");
  console.log("Array: " + array);
  const email = decodeURIComponent(array[1]);
  console.log("Email: " + email);

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