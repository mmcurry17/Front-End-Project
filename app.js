const apiKey = "fc8420ad05d66ece97da69fdbe398813";
const appId = "3a5c3cda";
let globalData;

function nutritionSearch() {
  $("button").click((event) => {
    event.preventDefault();
    // let userInput = "grape";
    let userInput = $("input").val();

    let results = $("#results");
    results.empty();

    console.log(`userInput: ${userInput}`);

    /* uncomment for online invocation and comment out performAjaxRequestOffline(data) */
    performAjaxRequest(userInput);

    /* uncomment for offline invocation and comment out performAjaxRequest(userInput) */
    // performAjaxRequestOffline(apple);
  });
}

function performAjaxRequest(search) {
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
        let foodName = $("<h3>").addClass("card-title").text(item.food_name);
        foodInfo.append(foodName);

        // add below
        let picture = $("<img>")
          .addClass("card-image")
          .attr("src", item.photo.thumb);
        foodInfo.append(picture);
        // add above

        // create nutrition facts div
        let nutritionFacts = $("<div>").addClass("nutrition-facts");

        // create nutition facts
        let calories = $("<p>")
          .attr("id", "calories")
          .html(`<b>Calories:</b> ${item.nf_calories} kcal`);
        let protein = $("<p>").html(
          `<b>Protein:</b> ${item.nf_protein.toFixed(2)} g`
        );
        let carbs = $("<p>").html(
          `<b>Carbohydrates:</b> ${item.nf_total_carbohydrate.toFixed(2)} g`
        );
        let fats = $("<p>").html(
          `<b>Total Fat:</b> ${item.nf_total_fat.toFixed(2)} g`
        );

        // append nutrition facts to div
        nutritionFacts.append(calories, protein, carbs, fats);

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

// Call the nutritionSearch function to bind the event
nutritionSearch();

// data used for offline request (limited number of ajax requests per day)
const grape = {
  foods: [
    {
      alt_measures: [], // Array of alternative measures
      brand_name: null,
      brick_code: null,
      consumed_at: "2023-11-29T19:20:09+00:00",
      food_name: "grape",
      full_nutrients: [], // Array of full nutrients
      lat: null,
      lng: null,
      meal_type: 3,
      metadata: { is_raw_food: false },
      ndb_no: 9132,
      nf_calories: 33.81,
      nf_cholesterol: 0,
      nf_dietary_fiber: 0.44,
      nf_p: 9.8,
      nf_potassium: 93.59,
      nf_protein: 0.35,
      nf_saturated_fat: 0.03,
      nf_sodium: 0.98,
      nf_sugars: 7.59,
      nf_total_carbohydrate: 8.87,
      nf_total_fat: 0.08,
      nix_brand_id: null,
      nix_brand_name: null,
      nix_item_id: null,
      nix_item_name: null,
      photo: {
        thumb: "https://nix-tag-images.s3.amazonaws.com/586_thumb.jpg",
        highres: "https://nix-tag-images.s3.amazonaws.com/586_highres.jpg",
        is_user_uploaded: false,
      },
      serving_qty: 10,
      serving_unit: "grapes",
      serving_weight_grams: 49,
      source: 1,
      sub_recipe: null,
      tag_id: null,
      tags: {
        item: "grape",
        measure: null,
        quantity: "10.0",
        food_group: 3,
        tag_id: 586,
      },
      upc: null,
    },
  ],
};

const apple = {
  foods: [
    {
      alt_measures: [
        /* ... */
      ],
      brand_name: null,
      brick_code: null,
      class_code: null,
      consumed_at: "2023-11-29T21:17:05+00:00",
      food_name: "apple",
      full_nutrients: [
        /* ... */
      ],
      lat: null,
      lng: null,
      meal_type: 3,
      metadata: {
        is_raw_food: false,
      },
      ndb_no: 9003,
      nf_calories: 94.64,
      nf_cholesterol: 0,
      nf_dietary_fiber: 4.37,
      nf_p: 20.02,
      nf_potassium: 194.74,
      nf_protein: 0.47,
      nf_saturated_fat: 0.05,
      nf_sodium: 1.82,
      nf_sugars: 18.91,
      nf_total_carbohydrate: 25.13,
      nf_total_fat: 0.31,
      nix_brand_id: null,
      nix_brand_name: null,
      nix_item_id: null,
      nix_item_name: null,
      photo: {
        thumb: "https://nix-tag-images.s3.amazonaws.com/384_thumb.jpg",
        highres: "https://nix-tag-images.s3.amazonaws.com/384_highres.jpg",
        is_user_uploaded: false,
      },
      serving_qty: 1,
      serving_unit: 'medium (3" dia)',
      serving_weight_grams: 182,
      source: 1,
      sub_recipe: null,
      tag_id: null,
      tags: {
        item: "apple",
        measure: null,
        quantity: "1.0",
        food_group: 3,
        tag_id: 384,
      },
      upc: null,
    },
  ],
};

function performAjaxRequestOffline(data) {
  console.log(data);
  // console.log(data.foods[0]);
  // for (let item of data.foods) {
  data.foods.forEach((item) => {
    let foodInfo = $("<span>").addClass("result-card");
    let foodName = $("<h3>").addClass("card-title").text(item.food_name);
    foodInfo.append(foodName);

    // add below
    let picture = $("<img>")
      .addClass("card-image")
      .attr("src", item.photo.thumb);
    foodInfo.append(picture);
    // add above

    // create nutrition facts div
    let nutritionFacts = $("<div>").addClass("nutrition-facts");

    // create nutition facts
    let calories = $("<p>")
      .attr("id", "calories")
      .html(`<b>Calories:</b> ${item.nf_calories} kcal`);
    let protein = $("<p>").html(
      `<b>Protein:</b> ${item.nf_protein.toFixed(2)} g`
    );
    let carbs = $("<p>").html(
      `<b>Carbohydrates:</b> ${item.nf_total_carbohydrate.toFixed(2)} g`
    );
    let fats = $("<p>").html(
      `<b>Total Fat:</b> ${item.nf_total_fat.toFixed(2)} g`
    );

    // append nutrition facts to div
    nutritionFacts.append(calories, protein, carbs, fats);

    // Append the nutrition facts container to the food item container
    foodInfo.append(nutritionFacts);

    results.append(foodInfo[0]);
  });
  // Handle the data and update the results div as needed
}

const userData = {
  "Calorie Intake": 0,
  "Food Intake": [],
};

console.log(Object.keys(userData)[0]);
// change obj to globalData when running Ajax
$("#user-update").click(function () {
  userData["Calorie Intake"] += globalData.foods[0].nf_calories;
  console.log("calories " + globalData.foods[0].nf_calories);
  console.log(userData["Calorie Intake"]);
  userData["Food Intake"].push(globalData.foods[0].food_name);
  console.log(userData["Food Intake"]);

  dailyIntake();
});

let i = 0;
function dailyIntake() {
  let calorieIntakeElement = $("#calories");
  //condition to override existing
  if (calorieIntakeElement.length) {
    calorieIntakeElement.text(
      Object.keys(userData)[0] + ": " + userData["Calorie Intake"]
    );
  } else {
    //else condition to create new
    let calorieIntake = $("<div>")
      .attr("id", "calories")
      .text(Object.keys(userData)[0] + ": " + userData["Calorie Intake"]);
    $("#nutrition-data").append(calorieIntake);
  }
}

dailyIntake();
