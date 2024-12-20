const detDiv = document.querySelector("#detail");

async function displayList(key) {
  // console.log(key);
  let orgList;
  try {
    const response = await fetch(
      "https://stocksapi-uhe1.onrender.com/api/stocks/getstockstatsdata"
    );
    const data = await response.json();
    orgList = data.stocksStatsData[0];

    console.log(orgList[key].bookValue);
  } catch (err) {
    console.error(err);
  } finally {
    console.log("Complete");
  }
  return [orgList[key].bookValue, orgList[key].profit];
}

async function displayDetail(a, b, c) {
  try {
    const response = await fetch(
      "https://stocksapi-uhe1.onrender.com/api/stocks/getstocksprofiledata"
    );
    const data = await response.json();

    //forEach on Object of objects -- The company name and its corresponding summary is organised in
    // an object rather than array
    // Hence to iterate over object of objects we use global Object.keys
    // Object.keys(orgList).forEach((key) => {
    //   console.log(key + " Summary" + orgList[key].summary);
    // });
    const newHead = document.createElement("h2");
    const newSp1 = document.createElement("span");
    const newSp2 = document.createElement("span");
    const newPara = document.createElement("p");

    let compName = a;
    let compValue = b;
    let compProfit = c;

    const list = document.querySelectorAll("#cp li button");
    console.log(list.length);

    list.forEach((but) => {
      but.addEventListener("click", async () => {
        // console.log("Hello");
        compName = but.textContent;
        // console.log(compName);
        let arr = await displayList(compName);

        console.log(arr);
        compValue = arr[0];
        compProfit = arr[1];

        // displayDetail(compName, compProfit, compValue);
        newHead.textContent = `${compName}`;
        newSp1.textContent = `${compProfit}%`;
        newSp2.textContent = `$${compValue}`;
        newSp1.classList.add("margin-20");
        newSp2.classList.add("margin-20");

        if (compProfit > 0) {
          console.log(typeof compProfit);
          newSp1.classList.add("color-green");
        } else {
          newSp1.classList.add("color-red");
        }
        newHead.appendChild(newSp1);
        newHead.appendChild(newSp2);
        newPara.textContent = data.stocksProfileData[0][compName].summary;

        detDiv.textContent = "";
        detDiv.appendChild(newHead);
        detDiv.appendChild(newPara);

        currComp = compName;
        // console.log(currComp);
        flag = false;
        await displayChart(compName);
      });

      newHead.textContent = `${compName}`;
      newSp1.textContent = `${compProfit}%`;
      newSp2.textContent = `$${compValue}`;
      newSp1.classList.add("margin-20");
      newSp2.classList.add("margin-20");

      if (compProfit > 0) {
        console.log(compProfit);
        newSp1.classList.add("color-green");
      } else {
        newSp1.classList.add("color-red");
      }
      newHead.appendChild(newSp1);
      newHead.appendChild(newSp2);
      newPara.textContent = data.stocksProfileData[0][compName].summary;

      detDiv.textContent = "";
      detDiv.appendChild(newHead);
      detDiv.appendChild(newPara);
    });
    // console.log(data.stocksProfileData[0].MSFT.summary);
  } catch (err) {
    console.error(err);
  } finally {
    console.log("Complete");
  }
}

displayDetail("AAPL", 3.953, 0.24493);
