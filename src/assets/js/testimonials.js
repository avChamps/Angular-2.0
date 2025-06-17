const testimonials = [
  {
    name: "Bharat Dhane",
    position: "AV Engineer",
    work: "TechAV Solutions",
    feedback:
      "The AV Champs EVENTS Calendar efficiently tracks trade shows, events, webinars, and training sessions, saving me valuable time and keeping me consistently updated on key industry happenings.",
    initial: "B",
  },
  {
    name: "Uday P",
    position: "AV Engineer",
    work: "AudioVisual Experts",
    feedback:
      "The VC BAR SIMULATOR on AV Champs is excellent. It helps visualize camera, mic, and speaker coverage, making my designs more accurate and client presentations more impressive.",
    initial: "U",
  },
  {
    name: "Vishnu Vardhan",
    position: "AV Specialist",
    work: "Visual Systems Inc.",
    feedback:
      "The directory concept on AV Champs is brilliant. It helps me connect with the right POC from organizations, streamlining collaboration and networking in the industry.",
    initial: "V",
  },
  {
    name: "Priya Sharma",
    position: "AV Consultant",
    work: "Integrated Solutions",
    feedback:
      "AV Champs has transformed how I approach AV projects. The resources and community support are invaluable for staying current with industry trends and solving complex technical challenges.",
    initial: "P",
  },
  {
    name: "Rajesh Kumar",
    position: "System Integrator",
    work: "AV Integration Pro",
    feedback:
      "The training materials on AV Champs helped me advance my career. I highly recommend it to all AV professionals looking to enhance their skills and stay competitive in the industry.",
    initial: "R",
  },
];

const wrapper = document.getElementById("testimonial-wrapper");
debugger;
wrapper.innerHTML = testimonials
  .map(
    (t) => `
  <div class="swiper-slide">
    <div class="testimonials_card">
      <div class="testimonials_card_top">
       <svg class="quote_icon xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-quote-icon lucide-quote"><path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/><path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/></svg>
        <div class="stars">
          ${'<svg class="star" fill="var(--stars-icon-color)" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star-icon lucide-star"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>'.repeat(5)}
        </div>
      </div>
      <div class="testimonials_card_middle">
        <p>${t.feedback}</p>
      </div>
      <div class="testimonials_card_bottom">
        <div class="testimonials_author_img">${t.initial}</div>
        <div class="testimonials_author_details">
          <div class="name">${t.name}</div>
          <div class="position">${t.position}</div>
          <div class="work">${t.work}</div>
        </div>
      </div>
    </div>
  </div>
`
  )
  .join("");

// Initialize Swiper
const swiper = new Swiper(".testimonials_swiper", {
  spaceBetween: 24,
  slidesPerView: 1,
  centeredSlides: true,
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".custom-swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    768: { slidesPerView: 1.5 },
    1024: { slidesPerView: 3 },
  },
  on: {
    init: highlightActiveCard,
    slideChangeTransitionEnd: highlightActiveCard,
  },
});

function highlightActiveCard() {
  const allCards = document.querySelectorAll(".testimonials_card");
  allCards.forEach((card) => card.classList.remove("active"));

  const activeSlide = document.querySelector(".swiper-slide-active .testimonials_card");
  if (activeSlide) {
    activeSlide.classList.add("active");
  }
}
