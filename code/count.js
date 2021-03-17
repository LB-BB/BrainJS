const brain = require("brain.js");

//Count upwards to 5!

const trainingData = [
  [1, 2, 3, 4, 5],
  [5, 4, 3, 2, 1],
  [10, 9, 8, 7, 6],
];

const net = new brain.recurrent.LSTMTimeStep();

//LSTM - long short term memory

net.train(trainingData);
//to include logging, add { log: (status) => console.log(status) } as the second argument.

console.log(net.run([1, 2, 3, 4]));
console.log(net.run([5, 4, 3, 2]));
console.log(net.run([10, 9, 8, 7]));

//^^ the above churns out the computer's best guess of what number comes next in sequence.
