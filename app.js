const apiKey = "fc8420ad05d66ece97da69fdbe398813";
const appId = "3a5c3cda";

$.ajax({
  method: "POST",
  url: "https://trackapi.nutritionix.com/v2/natural/nutrients",
  headers: {
    "Content-Type": "application/json",
    "x-app-id": appId,
    "x-app-key": apiKey,
  },
  data: JSON.stringify({
    query: "gold fish",
  }),
  success: (data) => {
    console.log(data);
  },
  error: (error) => {
    console.error(`Error: ${error}`);
  },
});
