// Define local project data used in the portfolio
const PROJECTS = [
  {
    title: "QR Code Generator",
    description: "A clean, responsive QR Code generator used to take student attendance.",
    tags: ["HTML", "CSS", "Responsive", "Web"],
    demoUrl: "#projects",
    codeUrl: "https://github.com/RedhaAlturaik/QR-Code-Generator",
  },
  {
    title: "Quiz App",
    description: "A simple Quiz Application used to add, remove, update, and generate quiz questions.",
    tags: ["MAUI", "SQLite", "Database"],
    demoUrl: "#projects",
    codeUrl: "https://github.com/RedhaAlturaik/Quiz-App",
  },
  {
    title: "Library Management System",
    description: "Library management system used to borrow books from the library.",
    tags: ["HTML", "CSS", "JavaScript", "Python", "Database"],
    demoUrl: "#projects",
    codeUrl: "https://github.com/RedhaAlturaik/Library-Management-System",
  },
];

// Store all projects (local + API projects)
let ALL_PROJECTS = [...PROJECTS];

// Helper functions for selecting elements from DOM
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

// Create HTML structure for a single project card
function createProjectCard(project) {
  const tags = project.tags.map(tag => `<span class="tag">${tag}</span>`).join("");

  return `
    <article class="project-card">
      <div>
        <h3>${project.title}</h3>
        <p class="muted">${project.description}</p>
      </div>
      <div class="project-tags">${tags}</div>
      <div class="project-links">
        <a href="${project.demoUrl}">Demo</a>
        <a href="${project.codeUrl}" target="_blank">Code</a>
      </div>
    </article>
  `;
}

// Render project list to the page
function renderProjects(projectList = ALL_PROJECTS) {
  const grid = $("#projectsGrid");
  const status = $("#projectsStatus");
  if (!grid || !status) return;

  if (!projectList.length) {
    grid.innerHTML = "";
    status.textContent = "No projects found.";
    return;
  }

  status.textContent = `Showing ${projectList.length} project(s).`;
  grid.innerHTML = projectList.map(createProjectCard).join("");
}

// Setup search functionality with debounce for better performance
function setupProjectSearch() {
  const searchInput = $("#projectSearch");
  if (!searchInput) return;

  let timeout;

  searchInput.addEventListener("input", (e) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      const value = e.target.value.trim().toLowerCase();

      const filtered = ALL_PROJECTS.filter(project => {
        const text = [
          project.title,
          project.description,
          ...project.tags
        ].join(" ").toLowerCase();

        return text.includes(value);
      });

      renderProjects(filtered);
    }, 300); // delay = 300ms
  });
}

// Fetch projects dynamically from GitHub API
async function fetchGitHubProjects() {
  const username = "RedhaAlturaik";

  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos`);
    const data = await res.json();

    if (!res.ok) throw new Error("GitHub error");

    const githubProjects = data.slice(0, 6).map(repo => ({
      title: repo.name,
      description: repo.description || "No description available",
      tags: ["GitHub"],
      demoUrl: repo.homepage || "#",
      codeUrl: repo.html_url
    }));

    // Merge API projects with local projects
    ALL_PROJECTS = [...PROJECTS, ...githubProjects];
    renderProjects(ALL_PROJECTS);

  } catch (error) {
    console.error(error);
    renderProjects(PROJECTS);
    $("#projectsStatus").textContent =
      " GitHub failed. Showing local projects.";
  }
}

// Setup dark mode toggle and store preference using localStorage
function setupThemeToggle() {
  const btn = $(".theme-toggle");
  if (!btn) return;

  const icon = $(".theme-icon", btn);
  const text = $(".theme-text", btn);

  const setTheme = (theme) => {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      icon.textContent = "☀️";
      text.textContent = "Light";
    } else {
      document.documentElement.removeAttribute("data-theme");
      icon.textContent = "🌙";
      text.textContent = "Dark";
    }

    localStorage.setItem("theme", theme);
  };

  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") setTheme(saved);

  btn.addEventListener("click", () => {
    const current =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "dark"
        : "light";

    setTheme(current === "dark" ? "light" : "dark");
  });
}

// Save and display visitor name using localStorage
function setupUserName() {
  const input = $("#usernameInput");
  const btn = $("#saveNameBtn");
  const msg = $("#welcomeMsg");

  const savedName = localStorage.getItem("username");
  if (savedName) {
    msg.textContent = `Welcome back, ${savedName}!`;
  }

  btn.addEventListener("click", () => {
    const name = input.value.trim();
    if (!name) return;

    localStorage.setItem("username", name);
    msg.textContent = `Welcome, ${name}!`;
    input.value = "";
  });
}

// Toggle visibility of projects section
function setupToggleProjects() {
  const btn = $("#toggleProjects");
  const section = $("#projects");

  let visible = true;

  btn.addEventListener("click", () => {
    visible = !visible;

    section.style.display = visible ? "block" : "none";
    btn.textContent = visible ? "Hide Projects" : "Show Projects";
  });
}

// Setup mobile navigation menu toggle
function setupMobileMenu() {
  const toggle = $(".nav-toggle");
  const menu = $("#navMenu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    menu.classList.toggle("open");
  });
}

// Placeholder for scroll spy functionality
function setupScrollSpy() {}

// Validate contact form inputs before submission
function setupContactForm() {
  const form = $("#contactForm");
  const status = $("#formStatus");
  if (!form || !status) return;

  const setError = (id, message) => {
    const errorEl = document.querySelector(`[data-error-for="${id}"]`);
    const input = document.getElementById(id);

    if (errorEl) errorEl.textContent = message;
    if (input) input.style.borderColor = message ? "red" : "";
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = $("#name").value.trim();
    const email = $("#email").value.trim();
    const message = $("#message").value.trim();

    let valid = true;

    setError("name", "");
    setError("email", "");
    setError("message", "");
    status.textContent = "";

    if (!name) {
      setError("name", "Name is required");
      valid = false;
    } else if (name.length < 2) {
      setError("name", "Name must be at least 2 characters");
      valid = false;
    }

    if (!email) {
      setError("email", "Email is required");
      valid = false;
    } else {
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailValid) {
        setError("email", "Invalid email format");
        valid = false;
      }
    }

    if (!message) {
      setError("message", "Message is required");
      valid = false;
    } else if (message.length < 10) {
      setError("message", "Message must be at least 10 characters");
      valid = false;
    }

    if (!valid) {
      status.textContent = " Please fill the required above.";
      return;
    }

    status.textContent = " Message sent successfully!";
    form.reset();
  });
}

// Update footer year dynamically
function setYear() {
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();
}

// Apply filtering, sorting, and level-based logic to projects
function setupAdvancedFilters() {
  const filter = $("#filterType");
  const sort = $("#sortType");
  const level = $("#levelFilter");

  function applyFilters() {
    let result = [...ALL_PROJECTS];

    if (filter.value !== "all") {
      result = result.filter(p =>
        p.tags.some(tag => tag.toLowerCase().includes(filter.value.toLowerCase()))
      );
    }

    if (level.value === "beginner") {
      result = result.filter(p =>
        p.tags.includes("HTML") || p.tags.includes("CSS")
      );
    } else if (level.value === "advanced") {
      result = result.filter(p =>
        p.tags.includes("JavaScript") || p.tags.includes("Python") || p.tags.includes("MAUI")
      );
    }

    if (sort.value === "az") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort.value === "za") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }

    renderProjects(result);
  }

  filter.addEventListener("change", applyFilters);
  sort.addEventListener("change", applyFilters);
  level.addEventListener("change", applyFilters);
}

// Start timer to track time spent on site
function startTimer() {
  let seconds = 0;
  const el = $("#timer");

  setInterval(() => {
    seconds++;
    if (el) el.textContent = `Time on site: ${seconds}s`;
  }, 1000);
}

// Initialize all features when page loads
document.addEventListener("DOMContentLoaded", () => {
  fetchGitHubProjects();
  setupProjectSearch();
  setupAdvancedFilters();
  startTimer();
  setupMobileMenu();
  setupThemeToggle();
  setupScrollSpy();
  setupContactForm();
  setYear();
  setupUserName();
  setupToggleProjects();
});