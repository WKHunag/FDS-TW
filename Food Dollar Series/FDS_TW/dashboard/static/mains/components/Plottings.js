const DollarPlotting = function (fetchedData) {  
    let data;  
    const rwdSvgWidth = parseInt(d3.select("#years").style("width"));
    const rwdSvgHeight = rwdSvgWidth*2;
    const margin = rwdSvgWidth * 0.09;
    d3.select(".StageShare").remove();
    const svg = d3
                .select('#StageShareArea')
                .append("svg")
                .attr("class", "StageShare")
                .attr("width", rwdSvgWidth)
                .attr("height", rwdSvgHeight*0.55);

    if (fetchedData) {
        data = fetchedData[0];
        const xAxisTickLable = Object.keys(data);
        const yData = Object.values(data);
        const xData = [0,1,2,3];

        const xScale = d3
                    .scaleLinear()
                    .domain(d3.extent(xData))
                    .range([margin+margin, 390+margin*2]);

        const xAxis = d3.axisBottom(xScale).tickSize(6).tickPadding(0).tickFormat((d)=>xAxisTickLable[d]);
        const xAxisGroup = svg
                            .append("g")
                            .call(xAxis)
                            .attr("transform", `translate(0,${rwdSvgHeight - margin*12})`)
                            .selectAll("text")
                            .style("text-anchor", "end")
                            .style("font-size","14px")
                            .style("font-weight","700")
                            .attr("dx", "-.5em")
                            .attr("dy", "0em")
                            .attr("transform", "rotate(-45)");
        const yScale = d3
                        .scaleLinear()
                        .domain([0,100])
                        .range([rwdSvgHeight - margin*12, margin]); //數值必須顛倒，否則y軸方向會錯
        const yAxis = d3.axisLeft(yScale).tickSize(0);
        const yAxisGroup = svg
                            .append("g")
                            .call(yAxis)
                            .style("font-size","14px")
                            .style("font-weight","700")
                            .attr("transform", `translate(${margin*2},0)`);

        const lineChart = d3
                        .line()
                        .x(d => xScale(d.id))
                        .y(d => yScale(d.value));

        const area = d3.area()
                        .x(d => xScale(d.id))
                        .y1(d => yScale(d.value))
                        .y0(rwdSvgHeight-margin*12);
        
        let defs = svg.append('svg:defs');
        defs.append("svg:pattern")
            .attr("id", "chartImage")
            .attr("width", rwdSvgWidth) 
            .attr("height", rwdSvgHeight - margin*12)
            .attr("patternUnits", "userSpaceOnUse")
            .append("svg:image")
            .attr("xlink:href", "../static/images/100TWD-rotate90.jpg")
            .attr("width", 390)
            .attr("height", 390*2.07)
            .attr("filter", "drop-shadow(2px 2px 5px black)")
            .attr("x", margin*2)
            .attr("y", margin);

        svg
            .append("path")
            .data(Object.values(data))
            .attr("d", lineChart(Object.values(data).map((d,index) => {return{id: index, value: d}})))
            .attr("stroke", "red")
            .attr("stroke-width", 3)
            .attr("fill", 'none')
            .attr("filter", "drop-shadow(2px -2px 5px black)");
        svg
            .append("path")
            .attr('d', area(Object.values(data).map((d,index) => {return{id: index, value: d}})))
            .attr('fill', 'url(#chartImage)')
            .style("fill-opacity", 0.7);
            
        } else {
            return null;
    }
}

function rectPlotting(props){
    let rect = props.svg.append("rect")
                    .attr('id', props.id);
    rect
        .attr('x',props.x)
        .attr('y',30)
        .style('margin-top','20px')
        .attr('width', props.width)
        .attr('height', props.height)
        .attr('fill', props.color)
        .attr('stroke', 'white')
        .attr('stroke-width', '1px')
        .style('opacity', .5)
        .style("fill-opacity", .7)
        .on('mouseover', function(d){
            if(d3.select(this).style("opacity") != 0){
                rect.transition()   
                    .style("opacity", 1)
                    .attr("stroke-width", '5px');
                // let pt = d3.pointer(event, this)
                props.label.style('visibility', 'visible')
                        .style('left', props.x+props.width/3+'px') // 設定tooltips位置
                        .style('top', props.height/2+'px')
                        .style("background-color", "none")
                        .style("border", props.color)
                        .html(props.id+': '+"<br>"+Math.round(props.value*100)/100+'%')
                }
            })
        .on('mouseout', function(d){
            rect.transition()   
                    .style("opacity", .5)
                    .attr('stroke-width', '1px');
            props.label.style('visibility', 'hidden');
        })
        ;
}

function SharePlotting (props) {
    const rwdSvgWidth = parseInt(d3.select("body").style("width")) * 0.4;
    const rwdSvgHeight = rwdSvgWidth/2;
    const margin = rwdSvgWidth * 0.075;
    d3.select('.'+props.chartName).remove();
    const svg = d3
                .select('#'+props.chartAreaId)
                .append("svg")
                .attr("class", props.chartName)
                .attr("width", rwdSvgWidth+margin*3)
                .attr("height", 400);
    let tooltip = d3.select(svg.node().parentNode)
                .append("div")
                .style("position", "absolute")
                .attr("class", "tooltip")
                .style('opacity', 1)
                .style('width', 'fit-content')
                .style('height', '70px')
                .style("visibility", "hidden") // 一開始tooltips是隱藏的
                .style('color', 'black')
                .style('font-weight', 800)
                .style("border-width", "2px")
                .style("border-radius", "5px")  
                .style("padding", "10px");

    if (props.data) {
        svg.append("rect")
            .attr('x',margin*2)
            .attr('y',30)
            .style('margin-top','20px')
            .attr('width', rwdSvgWidth)
            .attr('height', rwdSvgHeight)
            .attr('fill', 'url(#MarketingShareImage)');
            
        let defs = svg.append('svg:defs');
        defs.append("svg:pattern")
            .attr("id", "MarketingShareImage")
            .attr("width", rwdSvgWidth*1.5) 
            .attr("height", rwdSvgHeight*1.5)
            .attr("patternUnits", "userSpaceOnUse")
            .append("svg:image")
            .attr("xlink:href", '../static/images/100TWD.jpg')
            .attr("height", rwdSvgHeight)
            .attr("width", rwdSvgWidth)
            .attr('x',margin*2)
            .attr('y',30);

        let widths = Object.values(props.data);
        let idx = Object.keys(props.data);
        let xpositions = []
        for (let i=0; i<widths.length; i++){
            if (i === 0) {
                xpositions.push(margin*2)
            }else{
                xpositions.push(xpositions[i-1]+rwdSvgWidth*widths[i-1]/100)
            }
        };

        for (let i=0; i<widths.length; i++){
            rectPlotting({svg:svg,
                label: tooltip,
                id:idx[i], 
                x:xpositions[i],
                value: widths[i],
                width:rwdSvgWidth*widths[i]/100, 
                height:rwdSvgHeight, 
                color:props.colors[i]})
        }
    }
}

export { DollarPlotting, SharePlotting };