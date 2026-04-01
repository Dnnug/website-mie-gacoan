console.log("Mie Gacoan Website Loaded");

// Navbar Scroll Effect
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Menu Filtering
const categoryBtns = document.querySelectorAll(".category-btn");
const menuCards = document.querySelectorAll(".menu-card");

categoryBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    categoryBtns.forEach((b) => b.classList.remove("active"));
    // Add active class to clicked button
    btn.classList.add("active");

    const filterValue = btn.getAttribute("data-filter");

    menuCards.forEach((card) => {
      if (
        filterValue === "all" ||
        card.getAttribute("data-category") === filterValue
      ) {
        card.style.display = "block";
        // Add fade in animation
        card.style.opacity = "0";
        setTimeout(() => (card.style.opacity = "1"), 50);
      } else {
        card.style.display = "none";
      }
    });
  });
});

// Scroll Animations
const observerOptions = {
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

const scrollElements = document.querySelectorAll(
  ".section-title, .menu-card, .feature, .stat-item, .location-card",
);

scrollElements.forEach((el) => {
  el.classList.add("fade-up");
  observer.observe(el);
});

// Location Search
const locationInput = document.getElementById("locationInput");
const locationSearchBtn = document.getElementById("locationSearchBtn");
const locationCards = document.querySelectorAll(".location-card");
const noLocationsMsg = document.getElementById("no-locations");

function filterLocations() {
  const query = locationInput.value.toLowerCase();
  let visibleCount = 0;

  locationCards.forEach((card) => {
    const city = card.querySelector("h3").textContent.toLowerCase();
    const address = card.querySelector("p").textContent.toLowerCase();

    if (city.includes(query) || address.includes(query)) {
      card.style.display = "flex";
      visibleCount++;
      // Re-trigger animation
      card.style.animation = "none";
      card.offsetHeight; /* trigger reflow */
      card.style.animation = "fade-up 0.5s ease-out forwards";
    } else {
      card.style.display = "none";
    }
  });

  // Show/hide no results message
  if (visibleCount === 0) {
    noLocationsMsg.style.display = "block";
  } else {
    noLocationsMsg.style.display = "none";
  }
}

// Event Listeners for Search
if (locationInput) {
  locationInput.addEventListener("input", filterLocations);
  locationSearchBtn.addEventListener("click", filterLocations);
}
