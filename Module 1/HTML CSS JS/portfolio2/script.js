// DOM Elements
const projectList = document.getElementById("project-list");
const addProjectBtn = document.getElementById("add-project");
const themeToggleBtn = document.getElementById("theme-toggle");
const body = document.body;
const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

// Modal Elements
const projectModal = document.getElementById("project-modal");
const closeModal = document.querySelector(".close");
const projectForm = document.getElementById("project-form");
const projectTitleInput = document.getElementById("project-title");
const projectDescriptionInput = document.getElementById("project-description");

// Toast Container
const toastContainer = document.getElementById("toast-container");

// Initial project data
let projects = [
  {
    title: "Portfolio Website",
    description:
      "A personal portfolio website built with HTML, CSS, and JavaScript.",
  },
  {
    title: "ToDo App",
    description: "A dynamic ToDo application with CRUD functionalities.",
  },
];

// Render Projects to the DOM
function renderProjects() {
  projectList.innerHTML = ""; // Clear list
  if (projects.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No projects added yet.";
    li.style.textAlign = "center";
    projectList.appendChild(li);
    return;
  }
  projects.forEach((project, index) => {
    const li = document.createElement("li");

    const projectInfo = document.createElement("div");
    projectInfo.classList.add("project-info");

    const projectTitle = document.createElement("h3");
    projectTitle.textContent = project.title;

    const projectDesc = document.createElement("p");
    projectDesc.textContent = project.description;

    projectInfo.appendChild(projectTitle);
    projectInfo.appendChild(projectDesc);

    li.appendChild(projectInfo);

    // Create a remove button for each project
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-project");
    removeBtn.addEventListener("click", () => removeProject(index));

    li.appendChild(removeBtn);
    projectList.appendChild(li);
  });
}

// Show modal to add a project
addProjectBtn.addEventListener("click", () => {
  projectModal.style.display = "block";
});

// Close modal when clicking the close button or outside the modal
closeModal.addEventListener("click", () => {
  projectModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target == projectModal) {
    projectModal.style.display = "none";
  }
});

// Add new project from modal form
projectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const projectTitle = projectTitleInput.value.trim();
  const projectDescription = projectDescriptionInput.value.trim();

  if (projectTitle && projectDescription) {
    projects.push({ title: projectTitle, description: projectDescription });
    renderProjects();
    showToast("Project added successfully!", "success");
    projectModal.style.display = "none";
    projectForm.reset();
  } else {
    showToast("Please fill in all fields.", "error");
  }
});

// Remove a project
function removeProject(index) {
  const confirmDelete = confirm(
    `Are you sure you want to remove "${projects[index].title}"?`
  );
  if (confirmDelete) {
    projects.splice(index, 1);
    renderProjects();
    showToast("Project removed!", "success");
  }
}

// Toggle theme
themeToggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-theme");
  // Update button icon
  if (body.classList.contains("dark-theme")) {
    themeToggleBtn.textContent = "☀️";
  } else {
    themeToggleBtn.textContent = "🌙";
  }
});

// Form submission handler
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();

  if (name === "" || email === "") {
    displayFormMessage("Please fill out all fields.", "error");
    return;
  }

  // Simulate an async callback after submission
  setTimeout(() => {
    displayFormMessage("Thank you for contacting us!", "success");
    contactForm.reset();
  }, 1000);
});

// Display form message
function displayFormMessage(message, type) {
  formMessage.textContent = message;
  formMessage.className = type;

  // Remove message after 3 seconds
  setTimeout(() => {
    formMessage.textContent = "";
    formMessage.className = "";
  }, 3000);
}

// Show Toast Notification
function showToast(message, type) {
  const toast = document.createElement("div");
  toast.className = `toast ${type === "error" ? "error" : "success"}`;
  toast.textContent = message;
  toastContainer.appendChild(toast);

  // Trigger the animation
  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  // Remove the toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove("show");
    // Remove from DOM after transition
    toast.addEventListener("transitionend", () => {
      toast.remove();
    });
  }, 3100);
}

// Initialize the app
renderProjects();
