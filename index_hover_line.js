// const chartSec = document.getElementById("stockChart");
// const hoverLine = document.getElementById("hover-line");
// hoverLine.style.transitionProperty = "left";
// hoverLine.style.transitionDuration = "0.4s";

// chartSec.addEventListener("mousemove", (e) => {
//   hoverLine.style.left = `${e.pageX}px`;
// });

// chartSec.addEventListener("mouseover", (e) => {
//   hoverLine.style.left = `${e.pageX}px`;
//   console.log(e.pageX);
// });

const chartSec = document.getElementById("stockChart");
const hoverLine = document.getElementById("hover-line");
function istouchDevice() {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
}
const move = (e) => {
  try {
    var x = !istouchDevice() ? e.pageX : e.touches[0].pageX;
  } catch (e) {}
  hoverLine.style.left = x + "px";
};
chartSec.addEventListener("mousemove", (e) => {
  move(e);
});
chartSec.addEventListener("touchmove", (e) => {
  move(e);
});

// chartSec.addEventListener("mouseenter", () => {
//   hoverLine.style.display = "inline";
// });
// chartSec.addEventListener("mouseleave", () => {
//   hoverLine.style.display = "none";
// });
