const brain = require("brain.js");

//When a neuron fires, its value is 1, and if it doesn't fire, it's 0. T/F. Y/N.
//We can send any value into a neural net, provided it is attached to a neuron.

//The below data represents restaurants whose values are the day of the week when kids eat for free.
//The objective is to find a way to get these string values, represented as 1s and 0s, into the neural net.
//We will give the net a day of the week, and we want the net to return the restaurant we should go eat at with our kids.

const restaurants = {
  "Brilliant Yellow Corral": "Monday",
  "Penny’s": "Tuesday",
  "Right Coast Wings": "Wednesday",
  "The Delusion Last Railway Car": "Thursday",
  "Fun Day Inn": "Friday",
  JHOP: "Saturday",
  Owls: "Sunday",
};

//input: { Monday, Tuesday, Wednesday, etc }
//output: { Restaurant1, Restaurant2 }

const trainingData = [];

for (let restaurantName in restaurants) {
  const dayOfWeek = restaurants[restaurantName];
  trainingData.push({
    input: { [dayOfWeek]: 1 },
    output: { [restaurantName]: 1 },
  });
}

const net = new brain.NeuralNetwork({ hiddenLayers: [3] });

const stats = net.train(trainingData);
console.log(stats);

console.log(net.run({ Monday: 1 })); //this code outputs all restaurant names with LIKELIHOOD VALUES assigned to them (and appears to do so correctly!)

//But what if we want a string back?

function restaurantForDay(dayOfWeek) {
  const result = net.run({ [dayOfWeek]: 1 });
  let highestValue = 0;
  let highestRestaurantName = "";

  for (let restaurantName in result) {
    if (result[restaurantName] > highestValue) {
      highestValue = result[restaurantName];
      highestRestaurantName = restaurantName;
    }
  }
  return highestRestaurantName;
}
//the above function will iterate over the resulting data, store the highest likelihood match, and return a string of that restaurant name.

console.log(restaurantForDay("Monday")); //=> "Brilliant Yellow Corral"
