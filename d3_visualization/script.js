// For bundlers such as Vite and Webpack omit https://esm.sh/
import { csv, json } from 'https://esm.sh/d3-fetch';
import { select, selectAll } from 'https://esm.sh/d3-selection';

// load our bank data
const data = await csv("https://michellebol36-ops.github.io/bank-customer-churn-analysis/Bank_Churn.csv");

// print out the data
console.log(data);

// use the first 20 customers
const customers = data.slice(0, 20);

// create circles using Balance
select("svg")
  .selectAll("circle")
  .data(customers)
  .join("circle")
  .attr("cx", (d,i) => i * 35 + 25)
  .attr("cy", 70)
  .attr("r", d => (+d.Balance / 15000) + 4)
  .attr("fill", "steelblue");

// create rectangles using Age
select("svg")
  .selectAll("rect")
  .data(customers)
  .join("rect")
  .attr("x", (d,i) => i * 35 + 15)
  .attr("y", 130)
  .attr("width", 20)
  .attr("height", d => +d.Age)
  .attr("fill", "orange");

// display customer ages
select("svg")
  .selectAll("text")
  .data(customers)
  .join("text")
  .attr("x", (d,i) => i * 35 + 25)
  .attr("y", 245)
  .attr("text-anchor", "middle")
  .text(d => d.Age);