const topRockSongs = [
      { artist: "Fleetwod Mac", title: "Dreams", sales_and_streams: 1882000 },
      { artist: "AJR", title: "Bang!", sales_and_streams: 1627000 },
      { artist: "Imagine Dragons", title: "Believer", sales_and_streams: 1571000 },
      { artist: "Journey", title: "Don't Stop Believin'", sales_and_streams: 1497000 },
      { artist: "Eagles", title: "Hotel California", sales_and_streams: 1393000 }
   ];
   
const topSongsSection = d3.select('#top-songs');

topSongsSection.append('h3').text('Top Rock Songs');

const circlesChartWidth = 550;
const circlesChartHeight = 130;


const circlesChart = topSongsSection.append('svg')
	.attr('viewbox', [0, 0, circlesChartWidth, circlesChartHeight])
	.attr('width', circlesChartWidth)
	.attr('height', circlesChartHeight);
	
const marginTop = circlesChartHeight/2;
circlesChart
  .append('line')
	 .attr('x1', 0)
	 .attr('y1', marginTop)
	 .attr('x2', circlesChartWidth)
	 .attr('y2', marginTop)
	 .attr('stroke', '#333')
	 .attr('stroke-width', 2);
	 
const circlesChartGroups = circlesChart
	.selectAll('g')
	.data(topRockSongs)
	.join('g');

const circlesScale = d3.scaleSqrt()
    .domain([0, d3.max(topRockSongs, d => d.sales_and_streams)])
    .range([0, 40]);
	
circlesChartGroups
	.append('circle')
		.attr('r', d => circlesScale(d.sales_and_streams))
		.attr('cx', (d, i) => circlesChartWidth/10 + i * circlesChartWidth/5)
		.attr('cy', marginTop)
		.attr('fill', '#FFCE36');

circlesChartGroups
	.append('text')
		.attr('class', 'label label-title')
		.attr('x', (d, i) => circlesChartWidth/10 + i * circlesChartWidth/5)
		.attr('text-anchor', 'middle')
		.attr("dy", "0.5em")
		.attr('y', circlesChartHeight - 10)
		.text( d => d.title);		
		
circlesChartGroups
	.append('text')
		.attr('class', 'label label-count')
		.attr('x', (d, i) => circlesChartWidth/10 + i * circlesChartWidth/5)
		.attr('text-anchor', 'middle')
		.attr('y', 10)
		.attr("dy", "0.5em")
		.text( d => d.sales_and_streams/1000000 + 'M');	
		