document.addEventListener("DOMContentLoaded", function () {
  const btnWrapper = document.getElementById("comingSoonBtn");
  const tooltip = document.getElementById("comingSoonTooltip");

  if (btnWrapper && tooltip) {
    btnWrapper.addEventListener("click", function (e) {
      e.preventDefault();
      tooltip.classList.add("show");
      setTimeout(() => {
        tooltip.classList.remove("show");
      }, 4000);
    });
  }
});
