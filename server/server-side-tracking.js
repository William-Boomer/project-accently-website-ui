exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: "Hello, World"
  };
};


/*const User = mongoose.model("users");
const bodyParser = require("body-parser");
const shortid = require("shortid");
const cookieParser = require("cookie-parser");
const axios = require('axios');
const requestIp = require('request-ip');

const bizSdk = require('facebook-nodejs-business-sdk');
const Content = bizSdk.Content;
const CustomData = bizSdk.CustomData;
const DeliveryCategory = bizSdk.DeliveryCategory;
const EventRequest = bizSdk.EventRequest;
const UserData = bizSdk.UserData;
const ServerEvent = bizSdk.ServerEvent;

const access_token = process.env.FACEBOOK_ACCESS_TOKEN;
const pixel_id = process.env.FACEBOOK_PIXEL_ID;
const api = bizSdk.FacebookAdsApi.init(access_token);

  let current_timestamp = Math.floor(new Date() / 1000);

  try {
    console.log("1");
    console.log("Event Name" + req.body.eventName);
    console.log("Event Time" + current_timestamp);
    console.log("Event ID" + req.body.eventId);
    console.log("Event URL" + req.body.eventUrl);
    console.log("Event IP" + req.clientIp);
    console.log("Event IP" + req.headers['user-agent']);

    const userData = (new UserData())
      .setClientIpAddress(req.clientIp)
      .setClientUserAgent(req.headers['user-agent']);

    const serverEvent = (new ServerEvent())
      .setEventName(req.body.eventName)
      .setEventTime(current_timestamp)
      .setUserData(userData)
      .setEventSourceUrl(req.body.eventUrl)
      .setActionSource('website')
      .setEventId(req.body.eventId);

    const eventsData = [serverEvent];
    const eventRequest = (new EventRequest(access_token, pixel_id))
      .setEvents(eventsData);

    const response = await eventRequest.execute()

    console.log("2");

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: "Success" }),
    };

  } catch (err) {

    console.log("3");
    console.log("Error: " + err);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: err }),
    };

  }
})*/