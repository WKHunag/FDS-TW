const endpoint = "http://127.0.0.1:8000/graphql/";
const headers = {
    "content-type": "application/json",
};

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

const fetchPrimaryShare = function (query) {
    const options = {
        url: endpoint,
        method: 'post',
        headers: headers,
        data: query
    };

    axios.request(options)
        .then(function (response) {
            const res = response.data.data; // Response received from the API
            return res;
        })
        .then(function (res) {
            let PrimaryShare = (res.primaryByYearAndSector.map(d => {
                return (
                    {
                        'Compensation': d.Compensation,
                        'OperatingSurplus': d.OperatingSurplus,
                        'ConsumptionOfFixedCapital': d.ConsumptionOfFixedCapital,
                        'NetTaxes': d.NetTaxes,
                        'Imports': d.Imports,
                }
                )
            }));
            return PrimaryShare[0];
        })
        .then(function (data){
            let props = {
                chartName: "PrimaryShare",
                chartAreaId: "Primary",
                data: data,
                colors: ['#EBB02D','#B8621B','#A84448','#85586F','#80489C']
            };
            SharePlotting(props)
        })
        .catch(function (error) {
            console.error(error);
        });
};

const fetchIndustryShare = function (query) {
    const options = {
        url: endpoint,
        method: 'post',
        headers: headers,
        data: query
    };

    axios.request(options)
        .then(function (response) {
            const res = response.data.data; // Response received from the API
            return res;
        })
        .then(function (res) {
            let IndustryShare = (res.industryByYearAndSector.map(d => {
                return (
                    {
                    'agribusiness': d.agribusiness,
                    'FarmProduction': d.FarmProduction,
                    'FoodProcess': d.FoodProcess,
                    'Packaging': d.Packaging,
                    'Transportation': d.Transportation,
                    'WholesaleTrade': d.WholesaleTrade,
                    'RetailTrade': d.RetailTrade,
                    'FoodService': d.FoodService,
                    'Energy': d.Energy,
                    'FinanceInsurance': d.FinanceInsurance,
                    'Advertising': d.Advertising,
                }
                )
            }));
            return IndustryShare[0];
        })
        .then(function (data){
            let props = {
                chartName:'IndustryShare', 
                chartAreaId:'Industry', 
                data:data,
                colors:['#FEFF86','#F7DB6A','#EBB02D','#B8621B','#A84448','#7B2869','#A61F69','#85586F','#D989B5','#80489C','#432C7A']
            };
            SharePlotting(props)
        })
        .catch(function (error) {
            console.error(error);
        });
}

const fetchMarketingShare = function (query) {
        const options = {
        url: endpoint,
        method: 'post',
        headers: headers,
        data: query
    };

    axios.request(options)
        .then(function (response) {
            const res = response.data.data; // Response received from the API
            return res;
        })
        .then(function (res) {
            let MarketingShare = (res.marketingByYearAndSector.map(d => {
                return (
                    {
                    'FarmShare': d.FarmShare,
                    'MarketingShare': d.MarketingShare,
                }
                )
            }));
            return MarketingShare[0];
        })
        .then(function (data) {
            let props = {
                chartName:'MarketingShare', 
                chartAreaId:'Marketing', 
                data:data, 
                colors:['#EBB02D','#D989B5']
            }
            SharePlotting(props)
        })
        .catch(function (error) {
            console.error(error);
        });
}

const fetchData = function (data) {
    const PrimaryQuery = {
        "query": `query primaryByYearAndSector($year: Int!, $sectorName: String!) { 
                    primaryByYearAndSector (year:$year, sectorName: $sectorName) {
                            Compensation
                            OperatingSurplus
                            ConsumptionOfFixedCapital
                            NetTaxes
                            Imports
                            sectorName{
                                name
                            }
                        }
                    }`,
        "variables": {
            year: data,
            sectorName: "整體農食"
        }
    };
    const IndustryQuery = {
        "query": `query industryByYearAndSector($year: Int!, $sectorName: String!) { 
                    industryByYearAndSector (year:$year, sectorName: $sectorName) {
                            agribusiness
                            FarmProduction
                            FoodProcess
                            Packaging
                            Transportation
                            WholesaleTrade
                            RetailTrade
                            FoodService
                            Energy
                            FinanceInsurance
                            Advertising
                            sectorName{
                                name
                            }
                        }
                    }`,
        "variables": {
            year: data,
            sectorName: "整體農食"
        }
    };
    const MarketingQuery = {
        "query": `query marketingByYearAndSector($year: Int!, $sectorName: String!) { 
                    marketingByYearAndSector (year:$year, sectorName: $sectorName) {
                            FarmShare
                            MarketingShare
                            sectorName{
                                name
                            }
                        }
                    }`,
        "variables": {
            year: data,
            sectorName: "整體農食"
        }
    };
    fetchPrimaryShare(PrimaryQuery);
    fetchIndustryShare(IndustryQuery);
    fetchMarketingShare(MarketingQuery);
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
            let latestYear = Math.max(...res.allYears.map(d => d.year));
            return latestYear;
        })
        .then(fetchData)
        .catch(function (error) {
            console.error(error);
        });
}

getData();