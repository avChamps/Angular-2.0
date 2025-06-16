const header = document.querySelector(".header");
const hamburger = document.getElementById("hamburgerToggle");
const mobileMenu = document.getElementById("mobileMenu");
const overlay = document.getElementById("mobileOverlay");

let menuOpen = false;
let lastScrollY = window.scrollY;

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("overlay");
  let menuOpen = false;

  if (hamburger && mobileMenu && overlay) {
    hamburger.addEventListener("click", () => {
      menuOpen = !menuOpen;
      mobileMenu.classList.toggle("show", menuOpen);
      hamburger.classList.toggle("open", menuOpen);
      overlay.style.display = menuOpen ? "block" : "none";
    });
  }
});


// Close mobile menu on outside click
document.addEventListener("click", (e) => {
  if (
    menuOpen &&
    !mobileMenu.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    menuOpen = false;
    mobileMenu.classList.remove("show");
    hamburger.classList.remove("open");
    overlay.style.display = "none";
  }
});

// Header visibility on scroll
window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;
  if (currentScroll < lastScrollY) {
    header.classList.add("header--visible");
    header.classList.remove("header--hidden");
  } else {
    header.classList.add("header--hidden");
    header.classList.remove("header--visible");
  }
  lastScrollY = currentScroll;
});



document.addEventListener("DOMContentLoaded", () => {
  const tooltipTriggers = document.querySelectorAll(".tooltipTrigger");

  tooltipTriggers.forEach(trigger => {
    const wrapper = trigger.closest(".coming_soon_wrapper");
    const tooltip = wrapper.querySelector(".coming_soon_message");

    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation(); // Add this line

      tooltip.classList.add("show");

      setTimeout(() => {
        tooltip.classList.remove("show");
      }, 4000);
    });
  });
});
