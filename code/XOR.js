const brain = require("brain.js");

//This is the most basic neural net and solves the XOR equation. (see XOR)

const net = new brain.NeuralNetwork({ hiddenLayers: [3] });

const trainingData = [
  { input: [0, 0], output: [0] },
  { input: [0, 1], output: [1] },
  { input: [1, 0], output: [1] },
  { input: [1, 1], output: [0] },
];

net.train(trainingData, {
  log: (error) => console.log(error),
  logPeriod: 100,
}); //forward and backward propogation

// activate((inputWeights * inputs) + biases)

console.log(net.run([1, 0])); //[ 0.9340718984603882 ]
