// Copyright 2018 Google LLC.
// SPDX-License-Identifier: Apache-2.0

var	margin = {top: 50, right: 50, bottom: 50, left: 50},
	width = 500 - margin.left - margin.right,
	height = 400 - margin.top - margin.bottom;

var	parseDate = d3.time.format("%d-%b-%y").parse;

var	x = d3.time.scale().range([0, width]);
var	y = d3.scale.linear().range([height, 0]);

var	xAxis = d3.svg.axis().scale(x)
	.orient("bottom").ticks(2);

var	yAxis = d3.svg.axis().scale(y)
	.orient("left").ticks(12);

var	valueline = d3.svg.line()
  .interpolate("cardinal")
	.x(function(d) { return x(d.date); })
	.y(function(d) { return y(d.close); });
    
    
var	svg = d3.select("#graphic")
	.append("svg")
  .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("https://cdn.glitch.com/cebdc5d3-db36-420f-b715-4ff9e712f760%2F188027c2-50bd-4402-8472-757773eb41aa_102a0b54-e2b7-4803-8ba3-2acf647744de_data(1).csv?v=1564135464310", function(error, data) {
	data.forEach(function(d) {
		d.date = parseDate(d.date);
		d.close = +d.close;
	});


	x.domain(d3.extent(data, function(d) { return d.date; }));
	y.domain([0, d3.max(data, function(d) { return d.close; })]);


	svg.append("path")		
		.attr("class", "line")
		.attr("d", valueline(data));

	svg.append("g")			
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	svg.append("g")	
		.attr("class", "y axis")
		.call(yAxis);

});