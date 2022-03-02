

  d3.csv('../data/top_albums.csv').then(data => {
    createBubbleChart(data);
  });
  
const createBubbleChart = (data) => {


 // You can create your visualization here
  const metrics = ['total_album_consumption_millions', 'album_sales_millions', 'song_sales', 'on_demand_audio_streams_millions', 'on_demand_video_streams_millions'];
  const artists = [];
  
  data.forEach(datum => {
				metrics.forEach(metric => {
				datum[metric] = parseFloat(datum[metric]); // Convert strings to numbers
				});
      artists.push(datum.artist); // Populate the artists array
  });


  const width = 1160;
  const height = 380;
  const margin = {top: 40, right: 40, bottom: 60, left: 40};

  const bubbleChartSection = d3.select('#bubble-chart');

  const bubbleChart = bubbleChartSection.append('svg')
		.attr('viewbox', [0, 0, width, height])
		.attr('width', width)
		.attr('height', height);

  const audioStreamsScale = d3.scaleLinear()
		.domain([0, d3.max(data, d => d.on_demand_audio_streams_millions)*1.15])
		.range([margin.left, width - margin.right]);

  bubbleChart
	.append('g')
 	.attr('transform', `translate(0, ${height - margin.bottom})`)
	.call(d3.axisBottom(audioStreamsScale));
  
  bubbleChart
	.append('text')
	.attr('class', 'subtitle axis-label')
	.attr('x', width)
	.attr('text-anchor', 'end')
	.attr("dy", "-0.5em")
	.attr('y', height)
	.text('On-demand Audio Streams (millions)');
  
  const videoStreamsScale = d3.scaleLinear()
		.domain([0, d3.max(data, d => d.on_demand_video_streams_millions)*1.15])
		.range([height - margin.bottom, margin.top]);

  bubbleChart
	.append('g')
 	.attr('transform', `translate(${margin.left}, 0)`)
	.call(d3.axisLeft(videoStreamsScale));
  
  bubbleChart
	.append('text')
	.attr('class', 'subtitle axis-label')
	.attr('x', 0)
	.attr('text-anchor', 'start')
	.attr("dy", "1em")
	.attr('y', 0)
	.text('On-demand Video Streams (millions)');
  
  const bubbleAreaScale = d3.scaleSqrt()
    .domain([0, d3.max(data, d => d.album_sales_millions)])
    .range([0, 30]);
	
  const colorScale = d3.scaleOrdinal()
    .domain(artists)
    .range(d3.schemeTableau10);	

  const bubbleChartCircles = bubbleChart
	  .selectAll('circle')
	  .data(data)
	  .join('circle');	
	
  bubbleChartCircles
		.attr('r', d => bubbleAreaScale(d.album_sales_millions))
		.attr('cx', d => audioStreamsScale(d.on_demand_audio_streams_millions))
		.attr('cy', d => videoStreamsScale(d.on_demand_video_streams_millions))
		.attr('fill', d => colorScale(d.title));

//Legend colors
  const legendColor = d3.select('.legend-color');
  
  const ul = legendColor.append('ul');
  
  const legendColorItems = ul.selectAll('li')
	.data(data)
	.enter()
	.append('li');

  legendColorItems
	.append('span')
		.attr('class', 'legend-circle')
		.style('background-color', d => colorScale(d.title));

  legendColorItems
    .append('span')
		.text(d => d.artist + ', ' + d.title);

//Legend Area
  const legendArea = d3.select('.legend-area');
  
  const legendAreaWidth = 200
  const legendAreaHeight = 100
  const legendAreaMarginTop = 5
  
  const legendAreaSVG = legendArea
	.append('svg')
		.attr('viewbox', [0, 0, legendAreaWidth, legendAreaHeight])
		.attr('width', legendAreaWidth)
		.attr('height', legendAreaHeight);
		
  const legendLines = [0.1, 0.5, 1.5]
		
  legendAreaSVG
	.selectAll('circle')
	.data(legendLines)
	.enter()
	.append('circle')
		.attr('cx', bubbleAreaScale(1.6)) //bubbleAreaScale(d3.max(data, d => d.album_sales_millions)/2)
		.attr('cy', d => legendAreaMarginTop + 2*bubbleAreaScale(1.5) - bubbleAreaScale(d))
		.attr('r', d => bubbleAreaScale(d))
		.attr('fill', '#727a87')
		.attr('opacity', '0.4');
	
  legendAreaSVG
	.selectAll('line')
	.data(legendLines)
	.enter()
	.append('line')
		.attr('x1', bubbleAreaScale(1.6))
		.attr('y1', d => legendAreaMarginTop + 2*bubbleAreaScale(1.5) - 2*bubbleAreaScale(d))
		.attr('x2', bubbleAreaScale(1.6) + 60)
		.attr('y2', d => legendAreaMarginTop + 2*bubbleAreaScale(1.5) - 2*bubbleAreaScale(d))
		.attr('stroke', '#333')
		.style("stroke-dasharray", ("10,3"))
		.attr('stroke-width', 1);
	
	legendAreaSVG
	.selectAll('text')
	.data(legendLines)
	.enter()
	.append('text')
		.attr('x', bubbleAreaScale(1.6) + 65)
		.attr('y', d => legendAreaMarginTop + 2*bubbleAreaScale(1.5) - 2*bubbleAreaScale(d))
		.attr("dy", "0.45em")
		.style('font-size', '14px')
		.text(d => d + " M");
		
		
};


  
