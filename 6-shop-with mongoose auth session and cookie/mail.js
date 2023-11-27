const axios = require('axios');

const url = "https://justwork11.000webhostapp.com/mydevapps/EmailApi/mail.php";
console.log("sending......");
const myEmailApiKey = "himApiKey";
axios.post(url, $json = `{
  "from": "shop@yes.com", 
  "fromName" : "Apni SHop",
  "to": "himanshurw56@gmail.com", 
  "body" : "<i> hi bro this is js </i>", 
  "subject" : "Thx for shopping", 
  "altplaintextbody" : "plain text",
  "himApi" : "${myEmailApiKey}"
}`)
.then(function (response) {
  console.log(response.data);
})
.catch(function (error) {
  console.log(error);
});