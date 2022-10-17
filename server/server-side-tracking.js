const requestIp = require('request-ip');
const bizSdk = require('facebook-nodejs-business-sdk');
const EventRequest = bizSdk.EventRequest;
const UserData = bizSdk.UserData;
const ServerEvent = bizSdk.ServerEvent;
const { createHash } = require('crypto');
const cookie = require('cookie');

const access_token = process.env.FACEBOOK_ACCESS_TOKEN;
const pixel_id = process.env.FACEBOOK_PIXEL_ID;
const api = bizSdk.FacebookAdsApi.init(access_token);

exports.handler = async (event, context) => {

  const current_timestamp = Math.floor(new Date() / 1000);
  const clientIp = requestIp.getClientIp(event);
  const data = JSON.parse(event.body);
  let cookies = null;
  if (event.headers.cookie) {
    cookies = cookie.parse(event.headers.cookie);
  }

  let email = null;
  if (!cookies.emailHash) {
    email = null;
  } else {
    email = emailHash;
  }
  //const email = cookies.emailHash || null;
  console.log("Email: " + email);

  try {
    console.log("1");
    console.log("Cookies: " + JSON.stringify(cookies));

    /*console.log("Event Name" + data.eventName);
    console.log("Event Time" + current_timestamp);
    console.log("Event ID" + data.eventId);
    console.log("Event URL" + data.eventUrl);
    console.log("Event IP" + clientIp);
    console.log("Event IP" + event.headers['user-agent']);
    console.log("Email: " + cookies.emailHash);
    console.log("Phone: " + cookies.phoneHash);*/

    const userData = (new UserData())
      //.setEmails([email])
      //.setPhones([data.phoneNumber])
      .setClientIpAddress(clientIp)
      .setClientUserAgent(event.headers['user-agent']);

    const serverEvent = (new ServerEvent())
      .setEventName(data.eventName)
      .setEventTime(current_timestamp)
      .setUserData(userData)
      .setEventSourceUrl(data.eventUrl)
      .setActionSource('website')
      .setEventId(data.eventId);

    const eventsData = [serverEvent];
    const eventRequest = (new EventRequest(access_token, pixel_id))
      .setTestEventCode("TEST9001")
      .setEvents(eventsData);

    const response = await eventRequest.execute()

    console.log("2");

    return {
      statusCode: 200,
      body: "Success",
    };

  } catch (err) {

    console.log("3");
    console.log("Error: " + err);
    return {
      statusCode: 400,
      body: err,
    };

  }
};

//1. Pass the email in the charge submission as well
//2. Save the purchase data
//3. Test everything one more time