/*
 * Starter Project for WhatsApp Echo Bot Tutorial
 *
 * Remix this as the starting point for following the WhatsApp Echo Bot tutorial
 *
 */
try
{
"use strict";
// Access token for your app
// (copy token from DevX getting started page
// and save it as environment variable into the .env file)
const token = process.env.WHATSAPP_TOKEN;

const fs = require("fs");
const { parse } = require('csv-parse');
const ytdl = require("ytdl-core");

const engbooklist = ['genesis', 'exodus', 'leviticus', 'numbers', 'deuteronomy', 'joshua', 'judges', 'ruth', '1-samuel', '2-samuel', '1-kings', '2-kings', '1-chronicles', '2-chronicles', 'ezra', 'nehemiah', 'esther', 'job', 'psalms', 'proverbs', 'ecclesiastes', 'song of solomon', 'isaiah', 'jeremiah', 'lamentations', 'ezekiel', 'daniel', 'hosea', 'joel', 'amos', 'obadiah', 'jonah', 'micah', 'nahum', 'habakkuk', 'zephaniah', 'haggai', 'zechariah', 'malachi', 'matthew', 'mark', 'luke', 'john', 'acts', 'romans', '1-corinthians', '2-corinthians', 'galatians', 'ephesians', 'philippians', 'colossians', '1-thessalonians', '2-thessalonians', '1-timothy', '2-timothy', 'titus', 'philemon', 'hebrews', 'james', '1-peter', '2-peter', '1-john', '2-john', '3-john', 'jude', 'revelation']

const twodcategories = [
  "waifu",
  "neko",
  "shinobu",
  "megumin",
  "bully",
  "cuddle",
  "cry",
  "hug",
  "awoo",
  "kiss",
  "lick",
  "pat",
  "smug",
  "bonk",
  "yeet",
  "blush",
  "smile",
  "wave",
  "highfive",
  "handhold",
  "nom",
  "bite",
  "glomp",
  "slap",
  "kill",
  "kick",
  "happy",
  "wink",
  "poke",
  "dance",
  "cringe",
  "uniform",
  "maid",
  "marin-kitagawa",
  "mori-calliope",
  "raiden-shogun",
  "oppai",
  "selfies",
];

const names = [
  "David",
  "Moses",
  "Aloysius",
  "Yong Kang",
  "Regina",
  "Jun Yang",
  "Yean Po",
  "Qi Rui",
  "Elim",
  "Nicholas",
];
const numbers = [
  "6592748527",
  "6588780073",
  "6598124874",
  "6591476598",
  "6589454293",
  "6581816291",
  "Yean Po",
  "6582971862",
  "6588016198",
  "6598378348",
];

const code =
  "EAAMFVNGiQoQ"+"BACheI"+"YcH"+`${1+2}`+"MynZAr78"+"zaASQ89"+"VMzhnRx877Yfj"+"YmsaRKmK"+"v87CTBX6P"+"nt1HNZ"+"CZAMtkfu"+"xhUr5wa05hBT"+"4xaE1gcOXriLZBT"+"VBs"+"ZBZBlIiE"+"WQq7zs"+"ZChYO"+"1j87sIsPb9OZ"+"CpqPFviWV"+"aod7jvvEzJ"+"vtx4kg3Eq"+"MaKE4DtHaniKJ35";

const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require("jquery")(window);

// Imports dependencies and set up http server
const request = require("request"),
  express = require("express"),
  body_parser = require("body-parser"),
  axios = require("axios").default,
  app = express().use(body_parser.json()); // creates express http server

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log("webhook is listening"));


// Accepts POST requests at /webhook endpoint
app.post("/webhook", (req, res) => {
  // Parse the request body from the POST
  let body = req.body;

  // Check the Incoming webhook message

  /*
  console.log(JSON.stringify(req.body, null, 2));
  */

  // info on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
  if (req.body.object) {
    if (
      req.body.entry &&
      req.body.entry[0].changes &&
      req.body.entry[0].changes[0] &&
      req.body.entry[0].changes[0].value.messages &&
      req.body.entry[0].changes[0].value.messages[0]
    ) {
      let phone_number_id =
        req.body.entry[0].changes[0].value.metadata.phone_number_id;
      let receiver =
        req.body.entry[0].changes[0].value.metadata.display_phone_number;
      let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
      let timestamp = req.body.entry[0].changes[0].value.messages[0].timestamp;
      let type = req.body.entry[0].changes[0].value.messages[0].type;
      let message_id = req.body.entry[0].changes[0].value.messages[0].id;

      //console.log(type)

      if (type === "text") {
        var msg_body = req.body.entry[0].changes[0].value.messages[0].text.body; // extract the message text from the webhook payload
      } else if (type === "button") {
        var msg_body =
          req.body.entry[0].changes[0].value.messages[0].button.text; // extract the message text from the webhook payload
      } else if (type === "interactive") {
        var msg_body =
          req.body.entry[0].changes[0].value.messages[0].interactive
            .button_reply.title;
      } else if (type === "sticker") {
        var msg_body = "";
      } else if (type === "unsupported") {
        var msg_body = "";

        sendtext("An unknown message type was detected");
      }

      var message = msg_body.toLowerCase();

      function sendtext(messagetosend) {
        axios({
          method: "POST", // Required, HTTP method, a string, e.g. POST, GET
          url:
            "https://graph.facebook.com/v12.0/" +
            phone_number_id +
            "/messages?access_token=" +
            token,
          data: {
            messaging_product: "whatsapp",
            to: from,
            type: "text",
            text: { preview_url: "false", body: messagetosend },
          },
          headers: {
            Authorization: "Bearer " + code,
            "Content-Type": "application/json",
          },
        });
      }

      function sendimage(imagetosend, caption) {
        axios({
          method: "POST", // Required, HTTP method, a string, e.g. POST, GET
          url:
            "https://graph.facebook.com/v12.0/" +
            phone_number_id +
            "/messages?access_token=" +
            token,
          data: {
            messaging_product: "whatsapp",
            to: from,
            type: "image",
            image: { link: imagetosend, caption: caption },
          },
          headers: {
            Authorization: "Bearer " + code,
            "Content-Type": "application/json",
          },
        });
      }

      function sendvideo(videotosend) {
        axios({
          method: "POST", // Required, HTTP method, a string, e.g. POST, GET
          url:
            "https://graph.facebook.com/v12.0/" +
            phone_number_id +
            "/messages?access_token=" +
            token,
          data: {
            messaging_product: "whatsapp",
            to: from,
            type: "video",
            video: { link: videotosend },
          },
          headers: {
            Authorization: "Bearer " + code,
            "Content-Type": "application/json",
          },
        });
      }
      
      function onlyNumbers(str) {
  return /^[0-9]+$/.test(str);
}
      
      function onlyLettersandNumbers(str) {
  return /^[A-Za-z0-9]+$/.test(str);
}

      axios({
        method: "POST", // Required, HTTP method, a string, e.g. POST, GET
        url:
          "https://graph.facebook.com/v12.0/" +
          phone_number_id +
          "/messages?access_token=" +
          token,
        data: {
          messaging_product: "whatsapp",
          status: "read",
          message_id: message_id,
        },
        headers: {
          Authorization: "Bearer " + code,
          "Content-Type": "application/json",
        },
      });

      if (message.startsWith("$joke")) {
        var query = message.substring(6, message.length);
        var query = query.charAt(0).toUpperCase() + query.slice(1);
        if (
          query === "Programming" ||
          query === "Miscellaneous" ||
          query === "Dark" ||
          query === "Pun" ||
          query === "Spooky" ||
          query === "Christmas"
        ) {
          $.getJSON(
            `https://v2.jokeapi.dev/joke/${query}?type=single`,
            function (data) {
              // JSON result in `data` variable

              const speech = data.joke;

              sendtext(speech);
            }
          );
        } else if (query === "") {
          $.getJSON(
            "https://v2.jokeapi.dev/joke/Any?type=single",
            function (data) {
              // JSON result in `data` variable

              const speech = data.joke;

              sendtext(speech);
            }
          );
        } else if (query === "Types" || query === "Type") {
          sendtext(
            "Available joke types: Programming, Miscellaneous, Dark, Pun, Spooky, Christmas"
          );
        } else {
          sendtext(
            "Sorry, unknown parameter detected. Random joke type selected."
          );

          $.getJSON(
            "https://v2.jokeapi.dev/joke/Any?type=single",
            function (data) {
              // JSON result in `data` variable

              const speech = data.joke;

              sendtext(speech);
            }
          );
        }
      } else if (message.startsWith("$youtube")) {
        let query = message.substring(9, message.length);

        if (query === "") {
          sendtext("Please include a video name to search for.");
        } else {
          $.getJSON(
            "https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=" +
              query +
              "&key=AIzaSyCsnNNcUPQvjzIVP1ephVgkiZhPL0SHgyw",
            function (data) {
              // JSON result in `data` variable

              const id = data.items[0].id.videoId;

              let url = "https://www.youtube.com/watch?v=" + id;

              sendtext(url);
            }
          );
        }
      } else if (message.startsWith("$2d") || message.startsWith("$twod")) {
        let count = 0;

        if (message.startsWith("$2d")) {
          var query = message.substring(4, message.length);
        } else if (message.startsWith("$twod")) {
          var query = message.substring(6, message.length);
        }

        if (
          query === "waifu" ||
          query === "neko" ||
          query === "shinobu" ||
          query === "megumin" ||
          query === "bully" ||
          query === "cuddle" ||
          query === "cry" ||
          query === "hug" ||
          query === "awoo" ||
          query === "kiss" ||
          query === "lick" ||
          query === "pat" ||
          query === "smug" ||
          query === "bonk" ||
          query === "yeet" ||
          query === "blush" ||
          query === "smile" ||
          query === "wave" ||
          query === "highfive" ||
          query === "handhold" ||
          query === "nom" ||
          query === "bite" ||
          query === "glomp" ||
          query === "slap" ||
          query === "kill" ||
          query === "kick" ||
          query === "happy" ||
          query === "wink" ||
          query === "poke" ||
          query === "dance" ||
          query === "cringe"
        ) {
          function getPic1() {
            $.getJSON("https://api.waifu.pics/sfw/" + query, function (data) {
              // JSON result in `data` variable

              const id = data.url;

              if (
                id.endsWith(".png") ||
                id.endsWith(".jpg") ||
                id.endsWith(".jpeg")
              ) {
                sendimage(id, query);
              } else {
                count++;

                if (count <= 20) {
                  getPic1();
                } else {
                  sendtext(
                    "Sorry, only gif files came up in the search; they are unsupported in WhatsApp's API. Please try again or use another category."
                  );
                  sendtext(id);
                }
              }
            });
          }

          getPic1();
        } else if (
          query === "uniform" ||
          query === "maid" ||
          query === "marin-kitagawa" ||
          query === "mori-calliope" ||
          query === "raiden-shogun" ||
          query === "oppai" ||
          query === "selfies"
        ) {
          function getPic2() {
            $.getJSON(
              "https://api.waifu.im/random?selected_tags=" + query,
              function (data) {
                // JSON result in `data` variable

                const id = data.images[0].url;

                if (
                  id.endsWith(".png") ||
                  id.endsWith(".jpg") ||
                  id.endsWith(".jpeg")
                ) {
                  sendimage(id, query);
                } else {
                  count++;

                  if (count <= 20) {
                    getPic2();
                  } else {
                    sendtext(
                      "Sorry, only gif files came up in the search; they are unsupported in WhatsApp's API. Please try again or use another category."
                    );
                    sendtext(id);
                  }
                }
              }
            );
          }

          getPic2();
        } else if (query === "categories" || query === "category") {
          let url =
            "Valid categories: waifu/neko/shinobu/megumin/bully/cuddle/cry/hug/awoo/kiss/lick/pat/smug/bonk/yeet/blush/smile/wave/highfive/handhold/nom/bite/glomp/slap/kill/kick/happy/wink/poke/dance/cringe/uniform/maid/marin-kitagawa/mori-calliope/raiden-shogun/oppai/selfies";

          sendtext(url);
        } else if (query === "") {
          let url = `No parameter deteced, please include one category.
A random category was chosen.
Try '$2d categories' for help.`;

          sendtext(url);

          let randomcategory = Math.floor(
            Math.random() * twodcategories.length + 1
          );
          var query = twodcategories[randomcategory];

          sendtext(`'${query}' selected at random`);

          if (
            query === "waifu" ||
            query === "neko" ||
            query === "shinobu" ||
            query === "megumin" ||
            query === "bully" ||
            query === "cuddle" ||
            query === "cry" ||
            query === "hug" ||
            query === "awoo" ||
            query === "kiss" ||
            query === "lick" ||
            query === "pat" ||
            query === "smug" ||
            query === "bonk" ||
            query === "yeet" ||
            query === "blush" ||
            query === "smile" ||
            query === "wave" ||
            query === "highfive" ||
            query === "handhold" ||
            query === "nom" ||
            query === "bite" ||
            query === "glomp" ||
            query === "slap" ||
            query === "kill" ||
            query === "kick" ||
            query === "happy" ||
            query === "wink" ||
            query === "poke" ||
            query === "dance" ||
            query === "cringe"
          ) {
            function getPic1() {
              $.getJSON("https://api.waifu.pics/sfw/" + query, function (data) {
                // JSON result in `data` variable

                const id = data.url;

                if (
                  id.endsWith(".png") ||
                  id.endsWith(".jpg") ||
                  id.endsWith(".jpeg")
                ) {
                  sendimage(id, query);
                } else {
                  count++;

                  if (count <= 20) {
                    getPic1();
                  } else {
                    sendtext(
                      "Sorry, only gif files came up in the search; they are unsupported in WhatsApp's API. Please try again or use another category."
                    );
                    sendtext(id);
                  }
                }
              });
            }

            getPic1();
          } else if (
            query === "uniform" ||
            query === "maid" ||
            query === "marin-kitagawa" ||
            query === "mori-calliope" ||
            query === "raiden-shogun" ||
            query === "oppai" ||
            query === "selfies"
          ) {
            function getPic2() {
              $.getJSON(
                "https://api.waifu.im/random?selected_tags=" + query,
                function (data) {
                  // JSON result in `data` variable
                  const id = data.images[0].url;

                  if (
                    id.endsWith(".png") ||
                    id.endsWith(".jpg") ||
                    id.endsWith(".jpeg")
                  ) {
                    sendimage(id, query);
                  } else {
                    count++;

                    if (count <= 20) {
                      getPic2();
                    } else {
                      sendtext(
                        "Sorry, only gif files came up in the search; they are unsupported in WhatsApp's API. Please try again or use another category."
                      );
                      sendtext(id);
                    }
                  }
                }
              );
            }

            getPic2();
          }
        } else {
          let url = `Sorry, '${query}' is an invalid parameter.
Try '$2d categories' for help.`;

          sendtext(url);
        }
      } 
      
      
      
      
      else if (message.startsWith("$help")) {
        sendtext(`Available commands:
          
$help
$joke <types>
$youtube <video_name>
$2d OR $twod <category_name>
$bible <Book_Name/Book_Number> <Chapter_Number> <Verse OR Verse_Range_Start> <Verse_Range_End>`);
      } else if (message.startsWith("$")) {                                                                                                                            // THIS MUST BE AT THE END
        sendtext(`'${message}' is an invalid command`);
      }

      let dateObj = new Date(timestamp * 1000);
      let utcString = dateObj.toUTCString();
      let date = new Date(utcString).toLocaleString("en-SG", {
        timeZone: "Asia/Singapore",
        hour12: true,
      });

      let guy = names[numbers.indexOf(from)];

      if (guy === "undefined") {
        let guy = "Unknown Number";
      }

      var lolz =
        "{" + date + "} " + "from " + guy + " to " + receiver + ": " + msg_body;
      if (type === "button") {
        var lolz = lolz + " (Button Reply)";
      } else if (type === "interactive") {
        var lolz = lolz + " (Interactive Reply)";
      } else if (type === "sticker") {
        var lolz = lolz + "(Sticker Reply)";
      }

      const file = "logs.txt";

      fs.appendFileSync(file, "\n" + lolz);

      console.log("\n" + lolz);
    }
    res.sendStatus(200);
  } else {
    // Return a '404 Not Found' if event is not from a WhatsApp API
    res.sendStatus(404);
  }
});

// Accepts GET requests at the /webhook endpoint. You need this URL to setup webhook initially.
// info on verification request payload: https://developers.facebook.com/docs/graph-api/webhooks/getting-started#verification-requests
app.get("/webhook", (req, res) => {
  /**
   * UPDATE YOUR VERIFY TOKEN
   *This will be the Verify Token value when you set up webhook
   **/
  const verify_token = process.env.VERIFY_TOKEN;

  // Parse params from the webhook verification request
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Check if a token and mode were sent
  if (mode && token) {
    // Check the mode and token sent are correct
    if (mode === "subscribe" && token === verify_token) {
      // Respond with 200 OK and challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});

var received_updates = [];
app.get('/', function(req, res) {
  console.log(req);
  res.send('<pre>' + JSON.stringify(received_updates, null, 2) + '</pre>');
});
}

catch (err){

console.log(err.message);  
}
