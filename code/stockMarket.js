const brain = require("brain.js");
const rawData = require("./stockData");

//What if we were given a data set full of very high numbers? The computer really prefers 0 and 1, and will take a long time to compute if we do.
//The answer is to NORMALIZE the data. This can also be referred to as "scaling down".

//to get the raw data values easily into the neural net, we can find what seems to be the smallest number in the array, and divide all others by it. In this case, it's 138.

function scaleDown(step) {
  //normalize
  return {
    open: step.open / 138,
    high: step.high / 138,
    low: step.low / 138,
    close: step.close / 138,
  };
}

// console.log(scaleDown(rawData[0]));

//What if we wanted to DENORMALIZE??
function scaleUp(step) {
  return {
    open: step.open * 138,
    high: step.high * 138,
    low: step.low * 138,
    close: step.close * 138,
  };
}

// console.log(scaleUp(scaleDown(rawData[0]))); //data back to original state!

const scaledData = rawData.map(scaleDown);

const trainingData = [
  //an array of arrays
  scaledData.slice(0, 5),
  scaledData.slice(5, 10),
  scaledData.slice(10, 15),
  scaledData.slice(15, 20),
];

const net = new brain.recurrent.LSTMTimeStep({
  inputSize: 4,
  hiddenLayers: [8, 8],
  outputSize: 4,
});

net.train(trainingData, {
  learningRate: 0.005,
  errorThresh: 0.02,
  //   log: (stats) => console.log(stats),
});
//^^ we want our learningRate low so as not to shoot past our desired outcome, and we have established an error threshhold to keep the outcomes manageable.

console.log(scaleUp(net.run(trainingData[0]))); //the outcome of this is the prediction for what would come after the last index in our raw data!!!

// let's try a new method that will allow us to predict more steps. this one predicts three steps ahead.
console.log(
  net.forecast([trainingData[0][0], trainingData[0][1]], 3).map(scaleUp)
);

//^^must be mapped because the return is an array.
