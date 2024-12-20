const ulist = document.querySelector("#cp");

async function displayList() {
  try {
    const response = await fetch(
      "https://stocksapi-uhe1.onrender.com/api/stocks/getstockstatsdata"
    );
    const data = await response.json();
    const orgList = data.stocksStatsData[0];

    //forEach on Object of objects -- The company name and its corresponding summary is organised in
    // an object rather than array
    // Hence to iterate over object of objects we use global Object.keys
    Object.keys(orgList).forEach((key) => {
      // console.log(key + " Summary" + orgList[key].summary);
      if (key != "_id") {
        const newLi = document.createElement("li");
        const newBut = document.createElement("button");
        const newSp1 = document.createElement("span");
        const newSp2 = document.createElement("span");

        newLi.appendChild(newBut);
        newLi.appendChild(newSp1);
        newLi.appendChild(newSp2);
        newBut.textContent = key;
        newBut.classList.add("list-button");
        newSp1.textContent = ` $` + `${orgList[key].bookValue}`;
        newSp2.textContent = `${orgList[key].profit}` + `%`;
        newSp1.classList.add("span1");
        newSp2.classList.add("span2");

        if (orgList[key].profit > 0) {
          newSp2.classList.add("color-green");
        } else {
          newSp2.classList.add("color-red");
        }

        ulist.appendChild(newLi);
      }
    });
    // console.log(data.stocksProfileData[0].MSFT.summary);
  } catch (err) {
    console.error(err);
  } finally {
    console.log("Complete");
  }
}

displayList();
