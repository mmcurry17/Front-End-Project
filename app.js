const apiKey = "fc8420ad05d66ece97da69fdbe398813";
const appId = "3a5c3cda";
let globalData;
const results = $("#results");
// data used for offline request (limited number of ajax requests per day)

function nutritionSearch() {
  $("#submit").click((event) => {
    event.preventDefault();
    // let userInput = "grape";
    let userInput = $("input").val();

    results.empty();

    console.log(`userInput: ${userInput}`);

    /* uncomment for online invocation and comment out performAjaxRequestOffline(data) */
    performAjaxRequestList(userInput);

    /* uncomment for offline invocation and comment out performAjaxRequest(userInput) */
    // performAjaxRequestOffline(foodItem);
  });
}

function performAjaxRequestList(search) {
  $.ajax({
    method: "GET",
    url: "https://trackapi.nutritionix.com/v2/search/instant",
    headers: {
      "Content-Type": "application/json",
      "x-app-id": appId,
      "x-app-key": apiKey,
    },
    data: {
      query: search,
    },
    success: (data) => {
      globalData = data;
      console.log(data);
      console.log(data.common);
      // console.log(data.foods[0]);
      // for (let item of data.foods) {
      data.common.forEach((item) => {
        let foodInfo = $("<div>").addClass("result-card");
        let titleCard = $("<h3>").addClass("card-title");
        let foodName = item.food_name;
        let foodNameCaps = foodName[0].toUpperCase() + foodName.slice(1);
        titleCard.text(foodNameCaps);
        foodInfo.append(titleCard);

        // add below
        let picture = $("<img>")
          .addClass("card-image")
          .attr("src", item.photo.thumb);
        foodInfo.append(picture);
        // add above

        // create nutrition facts
        let servingSize = $("<p>").html(
          `<b>Serving Size:</b> ${item.serving_qty} ${item.serving_unit}`
        );

        // Append the nutrition facts container to the food item container

        foodInfo.click(() => {
          results.empty();
          performAjaxRequestItem(foodName);
          console.log(`Clicked on ${foodName}`);
        });

        results.append(foodInfo[0]);
      });
      // Handle the data and update the results div as needed
    },
    error: (error) => {
      console.error(`Error: ${error}`);
    },
  });
}

// Call the nutritionSearch function to bind the event
nutritionSearch();

function performAjaxRequestItem(search) {
  $.ajax({
    method: "POST",
    url: "https://trackapi.nutritionix.com/v2/natural/nutrients",
    headers: {
      "Content-Type": "application/json",
      "x-app-id": appId,
      "x-app-key": apiKey,
    },
    data: JSON.stringify({
      query: search,
    }),
    success: (data) => {
      globalData = data;
      console.log(data);
      // console.log(data.foods[0]);
      // for (let item of data.foods) {
      data.foods.forEach((item) => {
        let foodInfo = $("<span>").addClass("result-card");
        let titleCard = $("<h3>").addClass("card-title");
        let foodName = item.food_name;
        let foodNameCaps = foodName[0].toUpperCase() + foodName.slice(1);
        titleCard.text(foodNameCaps);
        foodInfo.append(titleCard);

        // add below
        let picture = $("<img>")
          .addClass("card-image")
          .attr("src", item.photo.thumb);
        foodInfo.append(picture);
        // add above

        // create nutrition facts div
        let nutritionFacts = $("<div>").addClass("nutrition-facts");

        // create nutrition facts
        let servingSize = $("<p>").html(
          `<b>Serving Size:</b> ${item.serving_qty} ${item.serving_unit}`
        );
        let calories = $("<p>")
          .attr("id", "calories")
          .html(`<b>Calories:</b> ${item.nf_calories} kcal`);
        let protein = $("<p>").html(`<b>Protein:</b> ${item.nf_protein} g`);
        let carbs = $("<p>").html(
          `<b>Carbohydrates:</b> ${item.nf_total_carbohydrate} g`
        );
        let fats = $("<p>").html(`<b>Total Fat:</b> ${item.nf_total_fat} g`);
        let cholesterol = $("<p>").html(
          `<b>Cholesterol:</b> ${item.nf_cholesterol} mg`
        );
        let fiber = $("<p>").html(
          `<b>Dietary Fiber:</b> ${item.nf_dietary_fiber} g`
        );
        let sugars = $("<p>").html(`<b>Sugars:</b> ${item.nf_sugars} g`);
        let sodium = $("<p>").html(`<b>Sodium:</b> ${item.nf_sodium} mg`);
        let potassium = $("<p>").html(
          `<b>Potassium:</b> ${item.nf_potassium} mg`
        );

        // append nutrition facts to div
        nutritionFacts.append(
          servingSize,
          calories,
          protein,
          carbs,
          fats,
          cholesterol,
          fiber,
          sugars,
          sodium,
          potassium
        );

        // Append the nutrition facts container to the food item container
        foodInfo.append(nutritionFacts);

        results.append(foodInfo[0]);
      });
      // Handle the data and update the results div as needed
    },
    error: (error) => {
      console.error(`Error: ${error}`);
    },
  });
}

const userData = {
  Calories: 0,
  Protein: 0,
  Carbs: 0,
  "Total Fat": 0,
  Foods: [],
};

$("#user-update").click(function () {
  let foodItem = globalData;
  userData.Calories += foodItem.foods[0].nf_calories;
  userData.Protein += foodItem.foods[0].nf_protein;
  userData.Carbs += foodItem.foods[0].nf_total_carbohydrate;
  userData["Total Fat"] += foodItem.foods[0].nf_total_fat;
  userData.Foods.push(foodItem.foods[0].food_name);
  console.log(userData["Foods"]);

  dailyIntake();
});

function dailyIntake() {
  let calorieIntakeElement = $("#calories");
  //condition to override existing
  if (calorieIntakeElement.length) {
    calorieIntakeElement.text(
      Object.keys(userData)[0] + ": " + userData.Calories.toFixed(2)
    );
    $("#protein").text(
      Object.keys(userData)[1] + ": " + userData.Protein.toFixed(2)
    );
    $("#carbs").text(
      Object.keys(userData)[2] + ": " + userData.Carbs.toFixed(2)
    );
    $("#fat").text(
      Object.keys(userData)[3] + ": " + userData["Total Fat"].toFixed(2)
    );
  } else {
    //else condition to create new
    let calorieIntake = $("<div>")
      .attr("id", "calories")
      .text(Object.keys(userData)[0] + ": " + userData.Calories.toFixed(2));
    let proteinIntake = $("<div>")
      .attr("id", "protein")
      .text(Object.keys(userData)[1] + ": " + userData.Protein.toFixed(2));
    let carbIntake = $("<div>")
      .attr("id", "carbs")
      .text(Object.keys(userData)[2] + ": " + userData.Carbs.toFixed(2));
    let fatIntake = $("<div>")
      .attr("id", "fat")
      .text(Object.keys(userData)[3] + ": " + userData["Total Fat"].toFixed(2));

    $("#nutrition-data").append(
      calorieIntake,
      proteinIntake,
      carbIntake,
      fatIntake
    );
  }
}

dailyIntake();
