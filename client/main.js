const featuredCareers = [
  {
    title: "Software Developer",
    salary: "$95,000 - $150,000",
    growth: "High",
    description: "Design and develop software applications",
  },
  {
    title: "Data Scientist",
    salary: "$90,000 - $140,000",
    growth: "Very High",
    description: "Analyze complex data sets to drive business decisions",
  },
  {
    title: "UX Designer",
    salary: "$75,000 - $120,000",
    growth: "High",
    description: "Create user-friendly digital experiences",
  },
];

const careerResources = [
  {
    icon: '<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>',
    title: "Career Guides",
    description: "Comprehensive guides for various career paths",
  },
  {
    icon: '<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>',
    title: "Resume Templates",
    description: "Professional templates for your job applications",
  },
  {
    icon: '<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>',
    title: "Video Tutorials",
    description: "Learn from industry professionals",
  },
  {
    icon: '<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>',
    title: "Mentorship",
    description: "Connect with experienced professionals",
  },
];

let currentCareerIndex = 0;
let carouselInterval;

function updateCarousel() {
  const careerElement = document.getElementById("featuredCareers");
  const career = featuredCareers[currentCareerIndex];

  const newCareerHtml = `
    <div class="bg-purple-900/30 p-6 rounded-xl hover:bg-purple-800/40 transition opacity-0">
      <h3 class="text-xl font-semibold mb-2">${career.title}</h3>
      <div class="space-y-2 text-purple-200">
        <p class="text-sm">Salary Range: ${career.salary}</p>
        <p class="text-sm">Growth Outlook: ${career.growth}</p>
        <p class="text-sm">${career.description}</p>
      </div>
      <button class="mt-4 w-full bg-purple-600 hover:bg-purple-700 py-2 rounded-lg transition text-sm">
        Learn More
      </button>
    </div>
  `;

  const currentCard = careerElement.querySelector("div");
  if (currentCard) {
    currentCard.classList.add("opacity-0");
    setTimeout(() => {
      careerElement.innerHTML = newCareerHtml;
      // Trigger fade-in effect
      setTimeout(() => {
        const newCard = careerElement.querySelector("div");
        newCard.classList.remove("opacity-0");
        newCard.classList.add("opacity-100");
      }, 50);
    }, 500);
  } else {
    careerElement.innerHTML = newCareerHtml;
    setTimeout(() => {
      const newCard = careerElement.querySelector("div");
      newCard.classList.remove("opacity-0");
      newCard.classList.add("opacity-100");
    }, 50);
  }

  currentCareerIndex = (currentCareerIndex + 1) % featuredCareers.length;
}

function startCarousel() {
  updateCarousel();
  carouselInterval = setInterval(updateCarousel, 3000);
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    clearInterval(carouselInterval);
  } else {
    startCarousel();
  }
});

startCarousel();

document.getElementById("careerResources").innerHTML = careerResources
  .map(
    (resource) => `
    <div class="bg-purple-900/30 p-6 rounded-xl text-center hover:bg-purple-800/40 transition cursor-pointer">
      <div class="text-purple-300 mb-4 flex justify-center">${resource.icon}</div>
      <h3 class="font-semibold mb-2">${resource.title}</h3>
      <p class="text-sm text-purple-200">${resource.description}</p>
    </div>
  `
  )
  .join("");

document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", (e) => {
    // Add button click animations
    e.target.style.transform = "scale(0.95)";
    setTimeout(() => {
      e.target.style.transform = "scale(1)";
    }, 100);
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(20px)";
  section.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
  observer.observe(section);
});

const searchInput = document.querySelector('input[type="text"]');
searchInput.addEventListener("input", (e) => {
  // Add search functionality here
  console.log("Searching for:", e.target.value);
});

const industrySelect = document.querySelector("select");
industrySelect.addEventListener("change", (e) => {
  console.log("Selected industry:", e.target.value);
});
