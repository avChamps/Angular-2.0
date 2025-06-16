window.addEventListener("DOMContentLoaded", () => {
  const tl = gsap.timeline();

  tl.from(".hero_container", {
    opacity: 0,
    y: 30,
    duration: 0.5,
    ease: "power3.out",
  })
    .from(".hero_title", {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: "power3.out",
    }, "-=0.3")
    .from(".hero_text", {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: "power3.out",
    }, "-=0.3")
    .from(".hero_buttons", {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: "power3.out",
    }, "-=0.3")
    .fromTo(
      ".button-scroll-down",
      {
        opacity: 1,
        y: 0,
      },
      {
        opacity: 1,
        y: 10,
        duration: 1,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      },
      "-=0.1" // Start bouncing shortly after hero buttons
    );
});

// Sweep gradient movement
const animateSweep = (selector, xOffset) => {
  gsap.to(selector, {
    x: xOffset,
    duration: 7,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
  });
};

animateSweep(".sweep-left", 120);
animateSweep(".sweep-right", -120);


document.getElementById("comingSoonBtn").addEventListener("click", () => {
  const tooltip = document.getElementById("comingSoonTooltip");
  tooltip.style.visibility = "visible";
  tooltip.style.opacity = "1";

  setTimeout(() => {
    tooltip.style.opacity = "0";
    tooltip.style.visibility = "hidden";
  }, 2000);
});

