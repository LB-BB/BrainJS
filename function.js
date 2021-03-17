//This page explores the basic fundamentals of the neural net.
//the neural net is basically a function that recieves inputs and outputs outputs.

(inputs) => outputs;

//random values
//Each neuron is, techinically, just:
Math.random();
//the net starts out with random data and organizes over time.

//activation
//a commonly used activation function is called "relu".
function relu(value) {
  return value < 0 ? 0 : value;
}

//the math that lives between each neuron can be described as:
activate(inputWeights * inputs + biases);
