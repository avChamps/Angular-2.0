// ===== Social, Company, and Product links data =====

const socialLinks = [
  {
    href: "https://www.linkedin.com/company/av-champs/",
    icon: "linkedin",
    label: "LinkedIn",
  },
  {
    href: "https://www.instagram.com/av.champs",
    icon: "instagram",
    label: "Instagram",
  },
  { href: "https://x.com/rgbaudiovideo", icon: "twitter-x", label: "Twitter" },
  {
    href: "https://www.youtube.com/@AVChamps",
    icon: "youtube",
    label: "YouTube",
  },
  {
    href: "https://www.facebook.com/profile.php?id=61558649983492",
    icon: "facebook",
    label: "Facebook",
  },
];

const companyLinks = [
  { label: "About", href: "#", comingSoon: true },
  { label: "Careers", href: "#", comingSoon: true },
  { label: "Events", href: "#", comingSoon: true },
  { label: "Login", href: "#", comingSoon: true },
];

const productLinks = [
  { label: "Tools", href: "#", comingSoon: true },
  { label: "Marketplace", href: "#", comingSoon: true },
  { label: "Community", href: "#", comingSoon: true },
  { label: "Training", href: "#", comingSoon: true },
  { label: "Reviews", href: "#", comingSoon: true },
];

// ===== Helper to get inline SVGs =====

function getIconSVG(name) {
  switch (name) {
    case "linkedin":
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" class="icon"><path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"/></svg>`;
    case "instagram":
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon"><path d="M 8 3 C 5.243 3 3 5.243 3 8 V 16 C 3 18.757 5.243 21 8 21 H 16 C 18.757 21 21 18.757 21 16 V 8 C 21 5.243 18.757 3 16 3 H 8 z M 8 5 H 16 C 17.654 5 19 6.346 19 8 V 16 C 19 17.654 17.654 19 16 19 H 8 C 6.346 19 5 17.654 5 16 V 8 C 5 6.346 6.346 5 8 5 z M 17 6 A 1 1 0 0 0 16 7 A 1 1 0 0 0 17 8 A 1 1 0 0 0 18 7 A 1 1 0 0 0 17 6 z M 12 7 C 9.243 7 7 9.243 7 12 C 7 14.757 9.243 17 12 17 C 14.757 17 17 14.757 17 12 C 17 9.243 14.757 7 12 7 z M 12 9 C 13.654 9 15 10.346 15 12 C 15 13.654 13.654 15 12 15 C 10.346 15 9 13.654 9 12 C 9 10.346 10.346 9 12 9 z"/></svg>`;
    case "twitter-x":
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon"><path d="M 2.37 3 L 9.46 13.14 L 2.74 21 H 5.38 L 10.64 14.83 L 14.96 21 H 21.87 L 14.45 10.38 L 20.74 3 H 18.14 L 13.27 8.69 L 9.30 3 H 2.37 z M 6.21 5 H 8.26 L 18.03 19 H 16.00 L 6.21 5 z"/></svg>`;
    case "youtube":
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" class="icon"><path d="M44.9 14.5 C44.5 12.3 42.6 10.7 40.4 10.2 C37.1 9.5 31 9 24.4 9 C17.8 9 11.6 9.5 8.3 10.2 C6.1 10.7 4.2 12.2 3.8 14.5 C3.4 17 3 20.5 3 25 C3 29.5 3.4 33 3.9 35.5 C4.3 37.7 6.2 39.3 8.4 39.8 C11.9 40.5 17.9 41 24.5 41 C31.1 41 37.1 40.5 40.6 39.8 C42.8 39.3 44.7 37.8 45.1 35.5 C45.5 33 46 29.4 46.1 25 C45.9 20.5 45.4 17 44.9 14.5 z M19 32 V18 L31.2 25 z"/></svg>`;
    case "facebook":
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" class="icon"><path d="M25 3 C12.85 3 3 12.85 3 25 C3 36.03 11.13 45.13 21.71 46.73 V30.83 H16.27 V25.05 H21.71 V21.2 C21.71 14.83 24.81 12.03 30.11 12.03 C32.65 12.03 34 12.22 34.64 12.31 V17.36 H31.03 C28.78 17.36 27.99 19.5 27.99 21.9 V25.05 H34.58 L33.69 30.83 H27.99 V46.78 C38.72 45.32 47 36.14 47 25 C47 12.85 37.15 3 25 3 z"/></svg>`;
  }
}

// ===== Populate Social Icons =====

const socialIconsEl = document.getElementById("socialIcons");
if (socialIconsEl) {
  socialLinks.forEach((link) => {
    const anchor = document.createElement("a");
    anchor.href = link.href;
    anchor.setAttribute("target", "_blank");
    anchor.setAttribute("rel", "noopener noreferrer");
    anchor.setAttribute("aria-label", link.label);
    anchor.innerHTML = getIconSVG(link.icon);
    socialIconsEl.appendChild(anchor);
  });
}


// ===== Populate Company and Product Links =====

function createLinks(list, container, group) {
  if (!container) {
    console.error("Container element not found.");
    return;
  }

  list.forEach((link, index) => {
    const li = document.createElement("li");

    if (link.comingSoon) {
      li.classList.add("coming_soon_item");

      const a = document.createElement("a");
      a.href = "#";
      a.classList.add("comingSoonBtn");
      a.setAttribute("data-tooltip-id", `${group}-${index}`);
      a.textContent = link.label;

      const tooltip = document.createElement("div");
      tooltip.className = "coming_soon_message";
      tooltip.id = `comingSoonTooltip-${group}-${index}`;
      tooltip.textContent = "This feature is coming soon";

      li.appendChild(a);
      li.appendChild(tooltip);
    } else {
      const a = document.createElement("a");
      a.href = link.href;
      a.textContent = link.label;
      li.appendChild(a);
    }

    container.appendChild(li);
  });
}


createLinks(companyLinks, document.getElementById("companyLinks"), "company");
createLinks(productLinks, document.getElementById("productLinks"), "product");

// ===== Tooltip Event Handling =====

document.addEventListener("click", function (e) {
  const btn = e.target.closest(".comingSoonBtn");

  document
    .querySelectorAll(".coming_soon_message.show")
    .forEach((el) => el.classList.remove("show"));

  if (btn) {
    e.preventDefault();
    const id = btn.dataset.tooltipId;
    const tooltip = document.getElementById(`comingSoonTooltip-${id}`);
    tooltip.classList.add("show");
    setTimeout(() => {
      tooltip.classList.remove("show");
    }, 3000);
  }
});
