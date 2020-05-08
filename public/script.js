//module.exports.script = script;

const data = [
  {
    "state": "CT",
    "per100k": "tested",
    "result": 1156.1
  },
  {
    "state": "CT",
    "per100k": "positive",
    "result": 337.6
  },
  {
    "state": "LA",
    "per100k": "tested",
    "result": 2238.1
  },
  {
    "state": "LA",
    "per100k": "positive",
    "result": 443
  },
  {
    "state": "MA",
    "per100k": "tested",
    "result": 1693.6
  },
  {
    "state": "MA",
    "per100k": "positive",
    "result": 370
  },
  {
    "state": "NJ",
    "per100k": "tested",
    "result": 1426.8
  },
  {
    "state": "NJ",
    "per100k": "positive",
    "result": 696.3
  },
  {
    "state": "MI",
    "per100k": "tested",
    "result": 795.4
  },
  {
    "state": "MI",
    "per100k": "positive",
    "result": 247
  },
  {
    "state": "GA",
    "per100k": "tested",
    "result": 513.8
  },
  {
    "state": "GA",
    "per100k": "positive",
    "result": 118.2
  },
  {
    "state": "IL",
    "per100k": "tested",
    "result": 794.6
  },
  {
    "state": "IL",
    "per100k": "positive",
    "result": 164.6
  },
  {
    "state": "PA",
    "per100k": "tested",
    "result": 975.6
  },
  {
    "state": "PA",
    "per100k": "positive",
    "result": 178.4
  },
  {
    "state": "NY",
    "per100k": "tested",
    "result": 2372.8
  },
  {
    "state": "NY",
    "per100k": "positive",
    "result": 970
  },
  {
    "state": "FL",
    "per100k": "tested",
    "result": 861
  },
  {
    "state": "FL",
    "per100k": "positive",
    "result": 92.7
  },
  {
    "state": "TX",
    "per100k": "tested",
    "result": 429.5
  },
  {
    "state": "TX",
    "per100k": "positive",
    "result": 46.5
  },
  {
    "state": "CA",
    "per100k": "tested",
    "result": 481.7
  },
  {
    "state": "CA",
    "per100k": "positive",
    "result": 55.2
  }
]

const titleText = 'COVID Test Result by States';
const xAxisLabelText = 'State';
const yAxisLabelText = 'Tested/Positive per 100k population';
const margin = {
  top: 50,
  right: 40,
  bottom: 75,
  left: 95
};
var d3 = require("d3");
const width = 600;
const height = 400;
//const svg = d3.select('svg');


svg = d3.select('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom);

const chart = svg.append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

stateDomain = data.map((d) => d.state);
per100kDomain = ["tested", "positive"];

const xScale = d3.scaleBand()
  .range([0, width])
  .domain(stateDomain)
  .padding(0.5);


const yScale = d3.scaleLinear()
  .range([height, 0])
  .domain([0, 2400]);

//horizontal grid lines.
const makeYLines = () => d3.axisLeft()
  .scale(yScale)

//axis
chart.append('g')
  .attr('transform', `translate(0, ${height})`)
  .call(d3.axisBottom(xScale));

chart.append('g')
  .call(d3.axisLeft(yScale));


chart.append('g')
  .attr('class', 'grid')
  .call(makeYLines()
    .tickSize(-width)
    .tickFormat('')
  )
//works

//xaxis
xaxixs = chart
  .append('g')
  .attr('transform', `translate(0, ${height})`)
  .call(d3.axisBottom(xScale));

//yaxis
yaxis = chart
  .append('g')
  .call(d3.axisLeft(yScale));

//ytitle
ytitle = svg
  .append('text')
  .attr('class', 'label')
  .attr('x', 0 - height / 2 - margin.top)
  .attr('y', margin.right)
  .attr('transform', 'rotate(-90)')
  .attr('text-anchor', 'middle')
  .text(yAxisLabelText)

//xtitle
xtitle = svg
  .append('text')
  .attr('class', 'label')
  .attr('x', width / 2 + margin.left)
  .attr('y', height + (margin.bottom + margin.top / 2))
  .attr('text-anchor', 'middle')
  .text(xAxisLabelText)

//maintitle
title = svg
  .append('text')
  .attr('class', 'title')
  .attr('x', width / 2 + margin.left)
  .attr('y', 40)
  .attr('text-anchor', 'middle')
  .text(titleText)

//works


function colorScale() {
  const testedColor = '#d4ebd0';
  const positiveColor = '#937d14';

  return d3.scaleOrdinal()
    .domain(per100kDomain)
    .range([testedColor, positiveColor]);

}


/***********per100k legend************/
const legend = d3.legendColor()
  .scale(colorScale())
  .labels(['Tested', 'Positive']);


svg
  .append('g')
  .attr('class', 'legend')
  .style('font-family', 'Arial')
  .style('font-size', '13px')
  .attr('transform', 'translate(380, 52)')
  .call(legend)



const barGroups = chart.selectAll()
  .data(data)
  .enter()
  .append('g')

  .append('rect')
  .attr('class', 'bar')
  .attr('x', (g) => xScale(g.state))
  .attr('y', (g) => yScale(g.result))
  .attr('width', xScale.bandwidth())
  .attr('height', (g) => height - yScale(g.result))
  .attr('fill', (g) => colorScale()(g.per100k))





const tooltip = d3.tip()
    .attr('class', "d3-tip")
    .style("color", "white")
    .style("position", "absolute")
    .style("background-color", "steelblue")
    .style("padding", "7.5px")
    .style("border-radius", "8px")
    .style("font-size", "12px")
    .offset([-10, 0])
    .html(function(d) {
      return `<strong>${d3.format(',')(d.result)}</strong>`;})

    svg.call(tooltip)


    chart
    .selectAll('.bar')
    .on('mouseover', function(d) {
      // show the tooltip on mouse over
      tooltip.show(d, this);
      // when the bar is mouse-overed, we slightly decrease opacity of the bar.
      d3.selectAll('.result')
        .attr('opacity', 0)
      d3.select(this)
        .style('opaticity', 0.5)
        .transition()
        .duration(100)
        .attr('opacity', 0.5)
        .attr('x', (a) => xScale(a.state) - 9)
        .attr('width', xScale.bandwidth() + 17)
        .style('opacity', 0.7);
    })
    .on('mouseout', function(d) {
      // hide the tooltip on mouse out
      tooltip.hide();
      d3.selectAll('.result')
        .attr('opacity', 1)
      d3.select(this)
        .transition()
        .duration(100)
        .style('opacity', 1)
        .attr('x', (a) => xScale(a.state))
        .attr('width', xScale.bandwidth())

});
