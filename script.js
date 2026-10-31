const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuToggle?.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});

document.querySelectorAll(".menu-trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const item = trigger.closest(".nav-item");
    const willOpen = !item.classList.contains("open");
    document.querySelectorAll(".nav-item.open").forEach((openItem) => {
      openItem.classList.remove("open");
      openItem.querySelector(".menu-trigger")?.setAttribute("aria-expanded", "false");
    });
    if (willOpen) {
      item.classList.add("open");
      trigger.setAttribute("aria-expanded", "true");
    }
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".nav-item")) {
    document.querySelectorAll(".nav-item.open").forEach((item) => {
      item.classList.remove("open");
      item.querySelector(".menu-trigger")?.setAttribute("aria-expanded", "false");
    });
  }
});

document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const tripIdeas = [
  { destination: "new-england", style: "hiking", season: "fall", name: "Acadia National Park Lodge Tour" },
  { destination: "appalachians", style: "hiking", season: "fall", name: "Smoky Mountains Autumn Foliage Trek" },
  { destination: "new-england", style: "backpacking", season: "summer", name: "White Mountains Ridge Traverse" },
  { destination: "alaska", style: "hiking", season: "summer", name: "Denali Unexplored Basecamp" },
  { destination: "alaska", style: "family", season: "summer", name: "Katmai Bear Viewing & Basecamp" },
  { destination: "alaska", style: "camping", season: "summer", name: "Twin Lakes Paddle & Hike" },
  { destination: "alaska", style: "backpacking", season: "summer", name: "Wrangell-St. Elias Wilderness Backpacking" },
  { destination: "pacific", style: "hiking", season: "summer", name: "Olympic National Park Rainforest & Coast" },
  { destination: "southwest", style: "hiking", season: "spring", name: "Grand Canyon & Sedona Desert Tour" },
  { destination: "southwest", style: "backpacking", season: "fall", name: "Utah Canyons: Escalante & Capitol Reef" }
];

document.getElementById("tripFinder")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const destination = document.getElementById("destinationFilter").value;
  const style = document.getElementById("styleFilter").value;
  const season = document.getElementById("seasonFilter").value;
  const matches = tripIdeas.filter((trip) =>
    (!destination || trip.destination === destination) &&
    (!style || trip.style === style) &&
    (!season || trip.season === season)
  );
  const result = document.getElementById("finderResult");
  if (matches.length) {
    result.innerHTML = `<strong>Ideas for your trip:</strong> ${matches.slice(0, 3).map((trip) => trip.name).join(" · ")}. <a href="#contact">Ask us about these ideas →</a> <span class="availability-note">Sample concepts only; not bookable departures.</span>`;
  } else {
    result.textContent = "No sample ideas match every selection yet. Try changing a filter or send us a custom inquiry.";
  }
});

document.querySelectorAll(".destination-card").forEach((card) => {
  card.addEventListener("click", () => {
    const destination = card.dataset.destination;
    const select = document.getElementById("destinationFilter");
    if (select && destination) select.value = destination;
  });
});

document.getElementById("inquiryForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const subject = encodeURIComponent(`Adventure inquiry — ${data.get("interest")}`);
  const body = encodeURIComponent(
    `Hello Summit Wilderness Adventures,\n\nI'd like to ask about an adventure.\n\nName: ${data.get("name")}\nEmail: ${data.get("email")}\nInterest: ${data.get("interest")}\nTiming: ${data.get("timing")}\n\nMy idea:\n${data.get("message") || "Not specified"}\n\nPlease let me know the next steps.`
  );
  document.getElementById("formStatus").textContent = "Your email app should open with the inquiry details. This demo does not submit or store your information.";
  window.location.href = `mailto:summitwildernessadventures@gmail.com?subject=${subject}&body=${body}`;
});

document.getElementById("year").textContent = new Date().getFullYear();
