
import { csv } from 'https://esm.sh/d3-fetch';
import { select } from 'https://esm.sh/d3-selection';
import 'https://esm.sh/d3-transition';

// Load bank customer data
const data = await csv("https://michellebol36-ops.github.io/bank-customer-churn-analysis/Bank_Churn.csv");

// Use the first 20 customers
const customers = data.slice(0, 20);

// Select SVG
const svg = select("svg");

// Add title
svg.append("text")
  .attr("x", 20)
  .attr("y", 25)
  .attr("font-size", "20px")
  .attr("font-weight", "bold")
  .attr("fill", "black")
  .text("Bank Customer Churn Visualization");

// Add description
svg.append("text")
  .attr("x", 20)
  .attr("y", 48)
  .attr("font-size", "12px")
  .text("Circles show customer balances | Rectangles show customer ages");

// Add circles using Balance
svg.selectAll("circle")
  .data(customers)
  .join("circle")
  .attr("cx", (d, i) => i * 35 + 25)
  .attr("cy", 100)
  .attr("r", d => (+d.Balance / 15000) + 4)
  .attr("fill", "steelblue")
  .transition()
  .duration(1000)
  .attr("fill", "orange");

// Add rectangles using Age
svg.selectAll("rect")
  .data(customers)
  .join("rect")
  .attr("x", (d, i) => i * 35 + 15)
  .attr("y", 200)
  .attr("width", 20)
  .attr("height", d => +d.Age)
  .attr("fill", "orange")
  .transition()
  .duration(1000)
  .attr("y", d => 200 - d.Age)
  .attr("fill", "steelblue");

// Add customer age numbers
svg.selectAll("text.age")
  .data(customers)
  .join("text")
  .attr("class", "age")
  .attr("x", (d, i) => i * 35 + 25)
  .attr("y", 225)
  .attr("text-anchor", "middle")
  .attr("font-size", "10px")
  .attr("fill", "black")
  .text(" ")
  .transition()
  .duration(1000)
  .text(d => d.Age);

// Extra credit: D3 transitions animate the shapes' colors and positions
svg.append("text")
  .attr("x", 20)
  .attr("y", 280)
  .attr("font-size", "12px")
  .attr("fill", "green")
  .text("Extra Credit: Used D3 transitions to animate color and position.");
