const chartEle = document.querySelector("#chart");
let highest, lowest;

async function displayChart(compName, duration = "5 years") {
  try {
    const response = await fetch(
      "https://stocksapi-uhe1.onrender.com/api/stocks/getstocksdata"
    );
    const data = await response.json();
    let actDur;
    switch (duration) {
      case "5 years":
        actDur = "5y";
        break;
      case "1 year":
        actDur = "1y";
        break;
      case "3 months":
        actDur = "3mo";
        break;
      case "1 month":
        actDur = "1mo";
        break;
      default:
        actDur = "5y";
        break;
    }
    console.log(data.stocksData[0][compName][actDur]);

    const timeArray = data.stocksData[0][compName][actDur].timeStamp;
    const newTimeArray = timeArray.map((timeStamp) => {
      return new Date(timeStamp * 1000).toLocaleDateString();
    });

    const xValues = newTimeArray; //[50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150];
    const yValues = data.stocksData[0][compName][actDur].value; //[7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15];

    highest = Math.max(...yValues);
    lowest = Math.min(...yValues);

    const peakSec = document.getElementById("peaks");
    peakSec.textContent = "";
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    p1.textContent = `Highest: ${highest.toFixed(2)}$`;
    p2.textContent = `Lowest: ${lowest.toFixed(2)}$`;
    peakSec.appendChild(p1);
    peakSec.appendChild(p2);

    new Chart("stockChart", {
      type: "line",
      data: {
        labels: xValues,
        datasets: [
          {
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(0,255,255,1.0)",
            borderColor: "rgba(0,255,255,1.1)",
            data: yValues,
            pointRadius: 3,
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        legend: { display: false },
        scales: {
          yAxes: [{ ticks: { min: 0, max: 500 } }],
        },
        interaction: {
          mode: "nearest",
        },
      },
    });
  } catch (err) {
    console.error(err);
  } finally {
    console.log("Complete");
  }
}

let currComp = "AAPL";
let flag = true;
// Build listeners on list and 4 buttons
// const list = document.querySelectorAll("#cp li button");
// list.forEach((but) => {
//   but.addEventListener("click", async () => {
//     const compName = but.textContent;
//     currComp = compName;
//     console.log(currComp);
//     flag = false;
//     await displayChart(compName);
//   });
// });

// Build listeners on 4 buttons
const fourButtons = document.querySelectorAll(".time-slot");
fourButtons.forEach((but) => {
  but.addEventListener("click", async () => {
    const duration = but.textContent;
    console.log(duration);
    await displayChart(currComp, duration);
  });
});

if (flag) displayChart(currComp);
