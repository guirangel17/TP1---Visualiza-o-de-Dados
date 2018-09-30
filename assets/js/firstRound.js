$.getJSON("data/presidente.json", function (jsonData) {
  const northStates = ['AC', 'AM', 'AP', 'PA', 'RO', 'RR', 'TO'];
  const northeastStates = ['AL', 'BA', 'MA', 'PA', 'PE', 'PI', 'RN', 'SE'];
  const centerStates = ['DF', 'GO', 'MT', 'MS'];
  const southeastStates = ['ES', 'MG', 'RJ', 'SP'];
  const southStates = ['PR', 'SC', 'RS'];

  const regions = {
    NORTH: 1,
    NORTHEAST: 2,
    CENTER: 3,
    SOUTHEAST: 4,
    SOUTH: 5
  }

  function getStatesInitials(region) {
    let statesNames = [];

    switch (region) {
      case regions.NORTH:
        statesNames = northStates;
        break;

      case regions.NORTHEAST:
        statesNames = northeastStates;
        break;

      case regions.CENTER:
        statesNames = centerStates;
        break;

      case regions.SOUTHEAST:
        statesNames = southeastStates;
        break;

      case regions.SOUTH:
        statesNames = southStates;
        break;
    }

    return statesNames;
  }

  function getColor(index) {
    let color = "";

    switch (index) {
      case 0:
        color = "rgba(57,106,177)";
        break;

      case 1:
        color = "rgba(218,124,48)";
        break;

      case 2:
        color = "rgba(62,150,81)";
        break;

      case 3:
        color = "rgba(204,37,41)";
        break;

      case 4:
        color = "rgba(83,81,84)";
        break;

      case 5:
        color = "rgba(107,76,154)";
        break;

      case 6:
        color = "rgba(146,36,40)";
        break;

      case 7:
        color = "rgba(148,139,61)";
        break;

      case 8:
        color = "rgba(200,100,50)";
        break;
    }

    return color;
  }

  function getDatasetByRegion(region, candidates) {
    let dataset = [];
    let statesNames = getStatesInitials(region);

    for(let i=0; i<statesNames.length; i++) {
      dataset.push({
        label: statesNames[i],
        backgroundColor: getColor(i),
        data: candidates.map(
            candidate => candidate.data
                .find(d => d.stateName === statesNames[i])
                .numVotes)
      });
    }

    return dataset;
  }

  function getFirstRoundData() {
    let candidates = [];

    for(let i=0; i<jsonData.length; i++) {
      let candidate = {
        name:'',
        data: []
      };
      candidate.name = jsonData[i].key;

      for(let j=0; j<jsonData[i].value.length; j++) {
        let stateData = jsonData[i].value[j];

        if(stateData.num_turn == "1") {
          let state = {
            stateName: stateData.cat_state,
            numVotes: stateData.num_votes
          };
          candidate.data.push(state);
        }
      }

      candidates.push(candidate);
    }

    return candidates;
  }

  function getRegionName(region) {
    let regionName = '';

    switch (region) {
      case regions.NORTH:
        regionName = 'Norte';
        break;

      case regions.NORTHEAST:
        regionName = 'Nordeste';
        break;

      case regions.CENTER:
        regionName = 'Centro Oeste';
        break;

      case regions.SOUTHEAST:
        regionName = 'Sudeste';
        break;

      case regions.SOUTH:
        regionName = 'Sul';
        break;
    }

    return regionName;
  }

  function createFirstRoundCharts() {
    let candidates = getFirstRoundData();

    for (let i=1; i<6; i++) {
      let ctx = document.getElementById('chart' + i).getContext('2d');
      new Chart(ctx, {
        type: 'horizontalBar',
        data: {
          labels: candidates.map(candidate => candidate.name.slice(0,12)),
          datasets: getDatasetByRegion(i, candidates)
        },
        options: {
          maintainAspectRatio: false,
          legend: { display: true },
          title: {
            display: true,
            text: 'Região ' + getRegionName(i)
          },
          scales: {
            xAxes: [{
              ticks: {
                fontSize: 11
              },
              scaleLabel: {
                display: true,
                labelString: 'Número de Votos',
                fontSize: 13
              }
            }],
            yAxes: [{
              ticks: {
                fontSize: 10
              }
            }]
          }
        }
      });
    }
  }

  $( document ).ready(function() {
    createFirstRoundCharts();
  });
});



