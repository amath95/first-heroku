const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const client = require('@mailchimp/mailchimp_marketing');

const list_id = "813244774c";

const app = express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");

});

//Setup the client server
client.setConfig({
  apiKey: 'ccf36fc38a06e72f8de09bce7168385e-us14',
  server: 'us14'
});

app.post("/", function(req, res) {

  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;


  //Run mailchimp add subscriber
  const run = async () => {
    const response = await client.lists.addListMember(list_id, {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    });
  };

  run().then(res.sendFile(__dirname+"/success.html")).catch(res.sendFile(__dirname+"/failure.html"));

});

app.post("/failure",function(req, res){
  res.redirect("/");
});


app.listen(process.env.PORT || 3000, function() {
  console.log("Listening on port 3000");
});

//APi Key MailChimp
//ccf36fc38a06e72f8de09bce7168385e-us14

//Audience
//813244774c
