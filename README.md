# 🐦 Flocking Simulation with Perlin Flow Field

This is an implementation of a flocking simulation with a Perlin flow field in JavaScript, based on Daniel Shiffman's [Coding Train](https://thecodingtrain.com/) tutorial series.

The simulation uses a combination of steering behaviors and Perlin noise to simulate flocking behavior, such as alignment, cohesion, and separation, among the agents.

## 🚀 How to Run the Simulation

To run the simulation, you need to create a `libraries` folder in the project directory and place the p5.js libraries inside it. Then, add the following paths to your HTML file:

``` javascript
<script language="javascript" type="text/javascript" src="./libraries/p5.js"></script>
<script language="javascript" src="./libraries/p5.dom.js"></script>
<script language="javascript" src="./libraries/p5.sound.js"></script>
```


To run the simulation, simply open the `index.html` file in a web browser or visit the live demo [here](https://example.com).

## 💡 How to Use the Simulation

Upon running the simulation, agents will appear on the canvas, moving in random directions. The user can interact with the simulation by changing the flow field, which will affect the movement of the agents.

The user can also adjust various parameters of the simulation, such as the number of agents, the size of the agents, and the strength of the flow field.

## 🛠️ Technologies Used

The simulation was implemented using the following technologies:
- HTML
- CSS
- JavaScript
- [p5.js](https://p5js.org/) library for creating and animating graphics in a web browser.

## 🙏 Acknowledgments

This simulation was developed with the help of Daniel Shiffman's [Coding Train](https://thecodingtrain.com/) tutorial series on flocking behavior and Perlin noise. Special thanks to him for his valuable resources and expertise.

## 🔮 Future Development

In the future, we plan to add more features to the simulation, such as obstacle avoidance, dynamic flow fields, and multiple agent types. We also plan to optimize the performance of the simulation for larger agent populations.
