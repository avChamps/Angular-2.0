const servicesData = [
  {
    title: "Professional AV Tools",
    description:
      "Access cutting-edge AV tools and resources designed by industry experts to streamline your workflow and enhance project outcomes.",
    link: "/tools",
    buttonText: "Explore Tools",
    comingSoon:true
  },
  {
    title: "AV Career Hub",
    description:
      "Discover exciting career opportunities in the audio visual industry. Connect with top employers and advance your AV professional journey.",
    link: "/careers",
    buttonText: "Find Jobs",
    comingSoon:true
  },
  {
    title: "AV Marketplace",
    description:
      "Shop the latest audio visual equipment and solutions. Find everything from professional microphones to complete venue setups.",
    link: "#",
    buttonText: "Shop Now",
    comingSoon: true,
  },
  {
    title: "AV Professional Network",
    description:
      "Join a thriving community of audio visual professionals. Share knowledge, collaborate on projects, and grow your network.",
    link: "/discussions",
    buttonText: "Join Now",
    comingSoon:true
  },
  {
    title: "Equipment Reviews",
    description:
      "Read honest reviews and comparisons of the latest AV equipment from industry professionals who actually use the gear.",
    link: "/reviews",
    buttonText: "Read Reviews",
    comingSoon:true
  },
  {
    title: "Professional Training",
    description:
      "Enhance your skills with comprehensive training programs led by industry experts. Stay current with the latest AV technologies and techniques.",
    link: "/training",
    buttonText: "Start Learning",
    comingSoon:true
  },
];

const servicesCardsContainer = document.querySelector(".services_cards");

servicesData.forEach((service, index) => {
  const card = document.createElement("div");
  card.className = "services_card";

  const isComingSoon = service.comingSoon;

  const comingSoonWrapper = isComingSoon
    ? `
      <div class="coming_soon_wrapper">
        <a href="#" class="comingSoonBtn button button-sm button-outline button-outline-animated" data-tooltip-id="${index}">
          ${service.buttonText}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
        </a>
        <div class="coming_soon_message" id="comingSoonTooltip-${index}">
          This feature is coming soon
        </div>
      </div>`
    : `
      <a href="${service.link}" class="button button-sm button-outline button-outline-animated" aria-label="${service.buttonText}">
        ${service.buttonText}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
      </a>`;

  card.innerHTML = `
    <div class="services_card_blob"></div>
    <div class="services_card_bg"></div>
    <div class="services_card_content">
      <h4>${service.title}</h4>
      <p>${service.description}</p>
      ${comingSoonWrapper}
    </div>
  `;

  servicesCardsContainer.appendChild(card);
});

// Tooltip logic
document.addEventListener("click", function (e) {
  if (e.target.closest(".comingSoonBtn")) {
    e.preventDefault();

    const btn = e.target.closest(".comingSoonBtn");
    const id = btn.dataset.tooltipId;
    const tooltip = document.getElementById(`comingSoonTooltip-${id}`);

    tooltip.classList.add("show");

    setTimeout(() => {
      tooltip.classList.remove("show");
    }, 4000);
  }
});

// GSAP animation
gsap.registerPlugin(ScrollTrigger);

gsap.from(".services_cards", {
  scrollTrigger: {
    trigger: ".services_cards",
    start: "top 85%",
    toggleActions: "play none none none"
  },
  y: 100,
  opacity: 0,
  duration: 1,
  ease: "power3.out"
});