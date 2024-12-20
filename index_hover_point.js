const chartSection = document.getElementById("stockChart");
const hoverPoint = document.getElementById("hover-point");
function istouchDevice() {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
}
const move2 = (e) => {
  try {
    var x = !istouchDevice() ? e.pageX : e.touches[0].pageX;
    var y = !istouchDevice() ? e.pageY : e.touches[0].pageY;
  } catch (e) {}
  hoverPoint.style.left = x + "px";
  hoverPoint.style.top = y + "px";
};
chartSection.addEventListener("mousemove", (e) => {
  move2(e);
});
chartSection.addEventListener("touchmove", (e) => {
  move2(e);
});
