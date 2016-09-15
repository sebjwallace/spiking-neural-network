# Spiking Neural Network

Implementing a general approach to STDP (Spike-Timing-Dependant-Plasticity) neural network.

Using Cellular Automata as the framework each neuron is updated upon each step. New neurons spontaneously emerge from neurogenesis. New synaptic connections are forged when a hyperpolarized neuron coincides with a depolarized neuron. A synaptic connection increases (potentiation) when a presynaptic neuron contributes towards the activation of the postsynaptic neuron, if it doesn't the connection strength decreases (depression). This is done using back-propagation. Conversely, using forward-propagation, if the postsynaptic neuron is in refactory (hyperpolarization) during the presynaptic activation the synaptic strength weakens.

This is an on-going project as it improves in practical and illustrative use.

![Alt text](case/preview.png?raw=true "Preview")
