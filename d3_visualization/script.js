
import { csv } from 'https://esm.sh/d3-fetch';
import { select } from 'https://esm.sh/d3-selection';
import 'https://esm.sh/d3-transition';

// Load the bank customer data
const data = await csv(
  "https://michellebol36-ops.github.io/bank-customer-churn-analysis/Bank_Churn.csv"
);

// Use the first 20 customers
const customers = data.slice(0, 20);

// Select the SVG
const svg = select("svg");

// Title
svg.append("text")
  .attr("x", 20)
  .attr("y", 30)
  .attr("font-size", "20px")
  .attr("font-weight", "bold")
  .text("Bank Customer Churn Visualization");

// Description
svg.append("text")
  .attr("x", 20)
  .attr("y", 55)
  .attr("font-size", "13px")
  .text("Circles represent Customer Balance | Rectangles represent Customer Age");

// Circles represent customer balances
svg.selectAll("circle")
  .data(customers)
  .join("circle")
  .attr("cx", (d, i) => i * 35 + 25)
  .attr("cy", 105)
  .attr("r", d => (+d.Balance / 15000) + 4)
  .attr("fill", "steelblue")
  .transition()
  .duration(1000)
  .attr("fill", "orange");

// Rectangles represent customer ages
svg.selectAll("rect")
  .data(customers)
  .join("rect")
  .attr("x", (d, i) => i * 35 + 15)
  .attr("y", 145)
  .attr("width", 20)
  .attr("height", 0)
  .attr("fill", "orange")
  .transition()
  .duration(1000)
  .attr("height", d => (+d.Age) * 1.5)
  .attr("fill", "steelblue");

// Show customer ages below the rectangles
svg.selectAll("text.age")
  .data(customers)
  .join("text")
  .attr("class", "age")
  .attr("x", (d, i) => i * 35 + 25)
  .attr("y", 195)
  .attr("text-anchor", "middle")
  .attr("font-size", "11px")
  .attr("fill", "black")
  .text(" ")
  .transition()
  .duration(1000)
  .text(d => d.Age);
