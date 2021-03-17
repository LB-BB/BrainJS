const brain = require("brain.js");

//Brain.js is built to allow for the use of objects in training, and that's what this example is all about.
//The point of this net is to get the computer to assign a brightness scale to each color in a series of inputted colors (as RGB values)

//input: {red, green, blue}
//output: {light, neutral, dark}

//training data:
//if a key/value is not specified, the net will fill it in as value 0.
const colors = [
  { green: 0.2, blue: 0.4 },
  { green: 0.4, blue: 0.6 },
  { red: 0.2, green: 0.8, blue: 0.8 },
  { green: 1, blue: 1 },
  { red: 0.8, green: 1, blue: 1 },
  { red: 1, green: 1, blue: 1 },
  { red: 1, green: 0.8, blue: 0.8 },
  { red: 1, green: 0.6, blue: 0.6 },
  { red: 1, green: 0.4, blue: 0.4 },
  { red: 1, green: 0.31, blue: 0.31 },
  { red: 0.8 },
  { red: 0.6, green: 0.2, blue: 0.2 },
];

const brightnesses = [
  { dark: 0.8 },
  { neutral: 0.8 },
  { light: 0.7 },
  { light: 0.8 },
  { light: 0.9 },
  { light: 1 },
  { light: 0.8 },
  { neutral: 0.7, light: 0.5 },
  { dark: 0.5, neutral: 0.5 },
  { dark: 0.6, neutral: 0.3 },
  { dark: 0.85 },
  { dark: 0.9 },
];

const trainingData = [];
for (let i = 0; i < colors.length; i++) {
  trainingData.push({
    input: colors[i],
    output: brightnesses[i],
  });
}

const net = new brain.NeuralNetwork({ hiddenLayers: [3] });

const stats = net.train(trainingData); // the computer got the error (the diff between the ideal output and the computer's output) very small in 2829 iterations. { error: 0.004999307544531698, iterations: 2829 }

console.log(stats);

console.log(
  net.run({
    red: 0.9,
  })
);

//=> the computer has classified "red" as having this relationship to brightness:
// {
//     dark: 0.9341333508491516,
//     neutral: 0.02977026253938675,
//     light: 0.0004937329795211554
//   }

//LET'S INVERT!! What if we wanted the computer to classify a brightness as a color?

const invertedTrainingData = [];

for (let i = 0; i < colors.length; i++) {
  invertedTrainingData.push({
    input: brightnesses[i],
    output: colors[i],
  });
}

const invertedNet = new brain.NeuralNetwork({ hiddenLayers: [3] });

const invertedStats = invertedNet.train(invertedTrainingData);

console.log(invertedStats);

console.log(
  invertedNet.run({
    light: 0.9,
  })
);

// => The computer has decided that this is the composition of "light":
// {
//     green: 0.9604536890983582,
//     blue: 0.9444898962974548,
//     red: 0.8479599356651306
//   }
//it did not do that great a job, but it's ok. When you invert a net like this, you're sort of generating values, which is useful for predictive tech.
