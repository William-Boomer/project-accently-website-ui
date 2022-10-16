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

exports.handler = async (event, context) => {

  const current_timestamp = Math.floor(new Date() / 1000);
  const clientIp = requestIp.getClientIp(event);
  const data = JSON.parse(event.body);
  console.log("Body Test Object: " + data);
  console.log("Body Event Name Test: " + data.eventName);
  return {
    statusCode: 200,
    body: "Success",
  };

  /*try {
    console.log("1");
    console.log("Event Name" + event.body["eventName"]);
    console.log("Event Time" + current_timestamp);
    console.log("Event ID" + event.body.eventId);
    console.log("Event URL" + event.body.eventUrl);
    console.log("Event IP" + clientIp);
    console.log("Event IP" + event.headers['user-agent']);

    const userData = (new UserData())
      .setClientIpAddress(clientIp)
      .setClientUserAgent(event.headers['user-agent']);

    const serverEvent = (new ServerEvent())
      .setEventName(event.body["eventName"])
      .setEventTime(current_timestamp)
      .setUserData(userData)
      .setEventSourceUrl(event.body.eventUrl)
      .setActionSource('website')
      .setEventId(event.body.eventId);

    const eventsData = [serverEvent];
    const eventRequest = (new EventRequest(access_token, pixel_id))
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
      body: "Error",
    };

  }*/
};