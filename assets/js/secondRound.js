$.getJSON("data/presidente.json", function (jsonData) {

  function getSecondRoundData() {
    let filteredJson = jsonData.filter((c) => {
      return c.value[0].id_candidate_seq === '280000000083'
          || c.value[0].id_candidate_seq === '280000000085'
    });

    let candidates = [];

    for(let i=0; i<filteredJson.length; i++) {
      let candidate = {
        name:'',
        data: []
      };
      candidate.name = filteredJson[i].key;

      for(let j=0; j<filteredJson[i].value.length - 1; j++) {
        let stateData = filteredJson[i].value[j];

        if(stateData.num_turn === "2") {
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

  function createSecondRoundChart() {
    let candidates = getSecondRoundData();

    console.log(candidates);

    let ctx = document.getElementById('chartSecondRound').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: candidates[0].data.map(d => d.stateName),
        datasets: [
          {
            label: 'Dilma',
            backgroundColor: "rgba(204,37,41,1)",
            data: candidates[0].data.map(d => parseFloat(d.numVotes))
          },
          {
            label: 'Aécio',
            backgroundColor: "rgba(57, 106, 177, 1)",
            data:  candidates[1].data.map(d => parseFloat(d.numVotes))
          }
        ]
      },
      options: {
        legend: { display: true },
        title: {
          display: false,
          text: 'Eleiçoes 2014 - 2º Turno - Presidência '
        },
        scales: {
          xAxes: [{
            ticks: {
              fontSize: 11
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Número de Votos',
              fontSize: 16
            },
            ticks: {
              fontSize: 11
            }
          }]
        }
      }
    });
  }

  $( document ).ready(function() {
    createSecondRoundChart();
  });
});