import { RatioGraph, RunChart } from "./components/Plottings.js";

const endpoint = "http://127.0.0.1:8000/graphql/";
const headers = {
  "content-type": "application/json",
};

const optionsCreate = (props) => {
  const select = document.querySelector(`#${props.id}`);
  select.options.length = 1; // Clear options except the first one

  props.data.forEach((d) => {
    const option = document.createElement("option");
    option.value = d;
    option.innerHTML = d;
    select.appendChild(option);
  });
};

const getIndustryShare = async (props) => {
    const IndustryShareQuery = {
        query: `query industryshareByYearAndSector($year: Int!, $sector: String) {
            industryshareByYearAndSector (year:$year, sector: $sector) {
                Agribusiness
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
                Sector{
                    Name
                }
            }
        }`,
        variables: {
            year: parseInt(props.year),
            sector: props.sector,
        },
    };

    const options = {
        url: endpoint,
        method: "post",
        headers: headers,
        data: StageShareQuery,
    };

    try {
        const response = await axios.request(options);
        const res = response.data.data.stageshareByYearAndSector.map((d) => ({
            Agribusiness: d.Agribusiness,
            FarmProduction: d.FarmProduction,
            FoodProcess: d.FoodProcess,
            Packaging: d.Packaging,
            Transportation: d.Transportation,
            WholesaleTrade: d.WholesaleTrade,
            RetailTrade: d.RetailTrade,
            Trade: d.Trade,
            FoodService: d.FoodService,
            Energy: d.Energy,
            FinanceInsurance: d.FinanceInsurance,
            Advertising: d.Advertising,
        }));
        RunChart(res);
    } catch (error) {
        console.error(error);
    }
}

const getStageShare = async (props) => {
  const StageShareQuery = {
    query: `query stageshareByYearAndSector($year: Int!, $sector: String) { 
      stageshareByYearAndSector (year:$year, sector: $sector) {
        FarmGate
        TransGate
        ProcessGate
        TradeGate
      }
    }`,
    variables: {
      year: parseInt(props.year),
      sector: props.sector,
    },
  };

  const options = {
    url: endpoint,
    method: "post",
    headers: headers,
    data: StageShareQuery,
  };

  try {
    const response = await axios.request(options);
    const res = response.data.data.stageshareByYearAndSector.map((d) => ({
      FarmGate: d.FarmGate,
      TransGate: d.TransGate,
      ProcessGate: d.ProcessGate,
      TradeGate: d.TradeGate,
    }));
    RunChart(res);
  } catch (error) {
    console.error(error);
  }
};

const getSectors = async (data) => {
  const SectorQuery = {
    query: `query stageshareByYearAndSector($year: Int!, $sector: String) { 
      stageshareByYearAndSector (year:$year, sector: $sector) {
        Sector{
          Name
        }
      }
    }`,
    variables: {
      year: data,
      sector: "",
    },
  };

  const options = {
    url: endpoint,
    method: "post",
    headers: headers,
    data: SectorQuery,
  };

  try {
    const response = await axios.request(options);
    const res = response.data.data;
    let data = res.stageshareByYearAndSector.map((d) => d.Sector.Name);
    data = data.filter((element, index, self) => self.indexOf(element) === index);
    optionsCreate({ id: "sectors", parentID: "StageShareArea", data });

    const sectorSelector = document.querySelector("#sectors");
    sectorSelector.addEventListener("change", (event) => {
      if (sectorSelector.value !== "0") {
        getStageShare({
          year: document.querySelector("#years").value,
          sector: document.querySelector("#sectors").value,
        });
      }
    });
  } catch (error) {
    console.error(error);
  }
};

const getData = async () => {
  const YearQuery = {
    query: `query { allYears { Year } }`,
    variables: {},
  };

  const options = {
    url: endpoint,
    method: "post",
    headers: headers,
    data: YearQuery,
  };

  try {
    const response = await axios.request(options);
    const res = response.data.data;

    const plottingSelector = document.querySelector("#plottings");
    const StageShareContainer = document.querySelector(".StageShareContainer");
    plottingSelector.addEventListener("change", (event) => {
      StageShareContainer.style.display = plottingSelector.value === "Stage Share" ? "flex" : "none";
    });

    const data = res.allYears.map((d) => d.Year);
    await Promise.all([
      optionsCreate({ id: "years", parentID: "StageShareArea", data }),
      getStageShare({ year: Math.max(...data), sector: "整體農食" }),
    ]);

    const yearSelector = document.querySelector("#years");
    yearSelector.addEventListener("change", (event) => {
      if (yearSelector.value !== "0") {
        document.querySelector("#sectors").style.visibility = "visible";
        getSectors(parseInt(yearSelector.value));
      } else {
        document.querySelector("#sectors").style.visibility = "hidden";
      }
    });
  } catch (error) {
    console.error(error);
  }
};

getData();
