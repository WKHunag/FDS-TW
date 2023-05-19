const endpoint = "http://127.0.0.1:8000/graphql/";
const headers = {
    "content-type": "application/json",
};

const Plotting = function (stageShare) {  
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

    if (stageShare) {
        data = stageShare[0];
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

const optionsCreate = function (props) {
    props.data.map(d => {
        let option = document.createElement('option');
        option.value = d;
        option.innerHTML = d;
        document.querySelector('#'+props.id).appendChild(option);
    })
}

const getStageShare = function (props) {
    const StageShareQuery = {
        "query": `query stageshareByYearAndSector($year: Int!, $sector: String) { 
            stageshareByYearAndSector (year:$year, sector: $sector) {
                FarmGate
                TransGate
                ProcessGate
                TradeGate
                }
            }`,
        "variables": {
            year: parseInt(props.year),
            sector: props.sector,
        }
    };
    const options = {
        url: endpoint,
        method: 'post',
        headers: headers,
        data: StageShareQuery
    };
    axios.request(options)
        .then(function (response) {
            const res = response.data.data.stageshareByYearAndSector.map((d) =>{
                return (
                    {
                        FarmGate: d.FarmGate,
                        TransGate: d.TransGate,
                        ProcessGate: d.ProcessGate,
                        TradeGate: d.TradeGate
                    }
                )
            }); // Response received from the API
            return res;
        })
        .then(function (res) {
            Plotting(res);
        })
        .catch(function (error) {
            console.error(error);
        });
}

const getSectors = function (data) {
    const SectorQuery = {
        "query": `query stageshareByYearAndSectorname($year: Int!, $sectorName: String) { 
            stageshareByYearAndSectorname (year:$year, sectorName: $sectorName) {
                    sectorName{
                        name
                    }
                }
            }`,
        "variables": {
            year: data,
            sectorName: ""
        }
    };

    const options = {
        url: endpoint,
        method: 'post',
        headers: headers,
        data: SectorQuery
    };

    axios.request(options)
        .then(function (response) {
            const res = response.data.data; // Response received from the API
            return res;
        })
        .then(function (res) {
            let data = res.stageshareByYearAndSectorname.map(d => d.sectorName.name)
            data = data.filter(function(element, index, self){
                return self.indexOf(element) === index;
            })
            optionsCreate({id: 'sectors', parentID: 'StageShareArea', data: data});
        })
        .then(function () {
            let sectorSelector = document.querySelector("#sectors");
            sectorSelector.addEventListener('change', (event) => {
                if (sectorSelector.value !== '0') {
                    getStageShare(
                        {
                            year: document.querySelector('#years').value,
                            sectorName: document.querySelector('#sectors').value
                        }
                        );
            }
            })
        })
        .catch(function (error) {
            console.error(error);
        });
}



function getData() {
    const YearQuery = {
        "query": `query { allYears { year } }`,
        "variables": {}
    };

    const options = {
        url: endpoint,
        method: 'post',
        headers: headers,
        data: YearQuery
    };

    axios.request(options)
        .then(function (response) {
            const res = response.data.data; // Response received from the API
            return res;
        })
        .then(function (res) {
            let plottingSelector = document.querySelector('#plottings');
            let StageShareContainer = document.querySelector(".StageShareContainer");
            plottingSelector.addEventListener('change', (event) => {
                if (plottingSelector.value === 'Stage Share') {
                    StageShareContainer.style.display = 'flex';
                } else {
                    StageShareContainer.style.display = 'none';
                }
            })
            return res;
        })
        .then(function (res) {
            let data = res.allYears.map(d => d.year)
            getStageShare({year:Math.max(...data), sectorName:"整體農食"})
            optionsCreate({id: 'years', parentID: 'StageShareArea', data: data});
        })
        .then(function () {
            let yearSelector = document.querySelector('#years');
            yearSelector.addEventListener('change', (event) => {
            if (yearSelector.value !== '0') {
                document.querySelector("#sectors").style.visibility = 'visible';
                getSectors(parseInt(yearSelector.value));
            }else if (parseInt(yearSelector.value) === 0){
                document.querySelector('#sectors').style.visibility = 'hidden';
            }
            })
        })
        .catch(function (error) {
            console.error(error);
        });
}

getData();