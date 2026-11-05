
import { csv } from 'https://esm.sh/d3-fetch';
import { select } from 'https://esm.sh/d3-selection';
import 'https://esm.sh/d3-transition';

// load our bank data
const data = await csv("https://michellebol36-ops.github.io/bank-customer-churn-analysis/Bank_Churn.csv");

// print out the data
console.log(data);

// use the first 20 customers
const customers = data.slice(0, 20);

// add title
select("svg")
  .append("text")
  .attr("x", 20)
  .attr("y", 20)
  .text("Bank Customer Data");

// create circles using Balance
select("svg")
  .selectAll("circle")
  .data(customers)
  .join("circle")
  .attr("cx", (d,i) => i * 35 + 25)
  .attr("cy", 70)
  .attr("r", d => (+d.Balance / 15000) + 4)
  .attr("fill", "steelblue")
  .transition()
  .duration(1000)
  .attr("fill", "orange");

// create rectangles using Age
select("svg")
  .selectAll("rect")
  .data(customers)
  .join("rect")
  .attr("x", (d,i) => i * 35 + 15)
  .attr("y", 160)
  .attr("width", 20)
  .attr("height", d => +d.Age)
  .attr("fill", "orange")
  .transition()
  .duration(1000)
  .attr("y", d => 160 - d.Age)
  .attr("fill", "steelblue");

// display customer ages
select("svg")
  .selectAll("text.age")
  .data(customers)
  .join("text")
  .attr("class", "age")
  .attr("x", (d,i) => i * 35 + 25)
  .attr("y", 245)
  .attr("text-anchor", "middle")
  .text(d => d.Age);
