# Module 1 HTML CSS JS COMBO

## index.html

```bash
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My Portfolio</title>
        <link rel="stylesheet" href="style.css">
        </head>
        <body>
        <header class="padding">
            <h1>My Portfolio</h1>
            <button id="theme-toggle">Toggle Theme</button>
        </header>

        <main>
            <section id="about" class="padding">
            <h2>About Me</h2>
            <p>Hello, I'm a web developer proficient in JavaScript, React.js, and more!</p>
            </section>

            <section id="projects" class="padding">
            <h2>Projects</h2>
            <ul id="project-list"></ul>
            <button id="add-project">Add Project</button>
            </section>

            <section id="contact" class="padding">
            <h2>Contact Me</h2>
            <form id="contact-form">
                <label for="name">Name:</label>
                <input type="text" id="name" required>
                <label for="email">Email:</label>
                <input type="email" id="email" required>
                <button type="submit">Submit</button>
                <div id="form-message"></div>
            </form>
            </section>
        </main>

        <footer class="padding">
            <p>&copy; 2024 My Portfolio</p>
        </footer>

        <!-- Project Modal -->
        <div id="project-modal" class="modal">
            <div class="modal-content">
            <span class="close">&times;</span>
            <h3>Add New Project</h3>
            <form id="project-form">
                <label for="project-title">Project Title:</label>
                <input type="text" id="project-title" required>
                <label for="project-description">Project Description:</label>
                <textarea id="project-description" required></textarea>
                <button type="submit">Add Project</button>
            </form>
            </div>
        </div>

        <!-- Toast Notification -->
        <div id="toast-container"></div>

        <script src="script.js"></script>
        </body>
        </html>

```

## script.js

```bash
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

```

## style.css

```bash
       /* Reset & Base Styles */
        * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        }

        body {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        background-color: #f9f9f9;
        color: #333;
        transition: background-color 0.3s, color 0.3s;
        }

        .container {
        width: 90%;
        max-width: 1200px;
        margin: auto;
        padding: 20px 0;
        }

        .padding {
        padding-left: 32px;
        padding-right: 32px;
        }

        /* Header */
        header {
        background-color: #007bff;
        color: #fff;
        padding: 20px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        }

        header .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        }

        header h1 {
        font-size: 1.8rem;
        }

        #theme-toggle {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #fff;
        transition: transform 0.3s;
        }

        #theme-toggle:hover {
        transform: rotate(20deg);
        }

        /* Main Content */
        main {
        padding: 20px 0;
        }

        section {
        margin-bottom: 40px;
        }

        h2 {
        font-size: 1.6rem;
        margin-bottom: 15px;
        border-bottom: 2px solid #007bff;
        display: inline-block;
        }

        #projects ul {
        list-style-type: none;
        display: grid;
        grid-template-columns: 1fr;
        gap: 20px;
        }

        #projects li {
        background-color: #fff;
        padding: 15px;
        border: 1px solid #ddd;
        border-radius: 8px;
        position: relative;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s, box-shadow 0.3s;
        }

        #projects li:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        #projects li button {
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: #dc3545;
        border: none;
        color: #fff;
        padding: 5px 8px;
        border-radius: 3px;
        cursor: pointer;
        font-size: 0.8rem;
        transition: background-color 0.3s;
        }

        #projects li button:hover {
        background-color: #c82333;
        }

        button#add-project {
        background: linear-gradient(135deg, #007bff, #0056b3);
        color: white;
        padding: 8px 16px;
        font-size: 14px;
        font-weight: bold;
        border: none;
        border-radius: 5px; /* Smaller, rounded corners */
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
        position: relative;
        overflow: hidden;
        }

        button#add-project::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 300%;
        height: 300%;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0);
        transition: all 0.4s ease-out;
        }

        button#add-project:hover::before {
        transform: translate(-50%, -50%) scale(1);
        }

        button#add-project:hover {
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
        transform: translateY(-1px);
        }

        button#add-project:active {
        transform: translateY(1px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        button#add-project:hover::before {
        transform: translate(-50%, -50%) scale(1);
        }

        button#add-project:hover {
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        transform: translateY(-2px);
        }

        button#add-project:active {
        transform: translateY(2px);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        /* Contact Form */
        form {
        display: flex;
        flex-direction: column;
        align-items: start;
        }

        .form-group {
        margin-bottom: 15px;
        }

        label {
        margin-bottom: 5px;
        font-weight: bold;
        }

        /* Default light mode styles for input fields */
        input,
        textarea {
        background-color: #fff;
        color: #000;
        border: 1px solid #ccc;
        padding: 8px;
        border-radius: 5px;
        width: 100%;
        box-sizing: border-box;
        transition: all 0.3s ease;
        }

        button[type="submit"] {
        background-color: #007bff;
        color: #fff;
        border: none;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1rem;
        transition: background-color 0.3s;
        }

        button[type="submit"]:hover {
        background-color: #0056b3;
        }

        #form-message {
        margin-top: 10px;
        font-weight: bold;
        }

        #form-message.success {
        color: #28a745;
        }

        #form-message.error {
        color: #dc3545;
        }

        /* Footer */
        footer {
        background-color: #f1f1f1;
        padding: 15px 0;
        text-align: center;
        font-size: 0.9rem;
        }

        /* Modal Styles */
        .modal {
        display: none; /* Hidden by default */
        position: fixed;
        z-index: 1000; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto; /* Enable scroll if needed */
        background-color: rgba(0, 0, 0, 0.5); /* Black w/ opacity */
        }

        .modal-content {
        background-color: #fff;
        margin: 10% auto; /* 10% from the top and centered */
        padding: 20px;
        border-radius: 8px;
        width: 90%;
        max-width: 500px;
        position: relative;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }

        .close {
        color: #aaa;
        position: absolute;
        top: 15px;
        right: 20px;
        font-size: 1.5rem;
        font-weight: bold;
        cursor: pointer;
        transition: color 0.3s;
        }

        .close:hover,
        .close:focus {
        color: #000;
        }

        button#submit {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
        transition: all 0.3s ease-in-out;
        }

        .modal-content h3 {
        margin-bottom: 20px;
        }

        .modal-content .form-group {
        margin-bottom: 15px;
        }

        .dark-theme .modal {
        color: #f5f5f5; /* Light text color */
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4); /* Slightly darker shadow */
        }

        /* Submit button hover effect in dark mode */
        .dark-theme #submit:hover {
        background-color: #004080; /* Darker blue on hover */
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Add shadow for depth */
        }

        /* Toast Notification Styles */
        #toast-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1001;
        }

        .toast {
        display: flex;
        align-items: center;
        background-color: #28a745;
        color: #fff;
        padding: 12px 20px;
        border-radius: 5px;
        margin-top: 10px;
        opacity: 0;
        transform: translateX(100%);
        transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .toast.show {
        opacity: 1;
        transform: translateX(0);
        }

        .toast.error {
        background-color: #dc3545;
        }

        /* Dark Theme Styles */
        .dark-theme {
        background-color: #121212;
        color: #e0e0e0;
        }

        .dark-theme .modal-content {
        background-color: #121212;
        color: #e0e0e0;
        }

        .dark-theme header {
        background-color: #1f1f1f;
        }

        #projects {
        display: flex;
        flex-direction: column;
        gap: 10px;
        justify-items: start;
        align-items: start;
        width: 100%;
        }

        ul#project-list {
        width: 100%;
        }

        #project-form button,
        #contact-form button {
        margin-top: 8px;
        }

        .dark-theme #projects li {
        background-color: #1f1f1f;
        border: 1px solid #333;
        width: 100%;
        }

        .dark-theme button {
        color: #fff;
        }

        .dark-theme #theme-toggle {
        color: #fff;
        }

        .dark-theme footer {
        background-color: #1f1f1f;
        }

        .dark-theme input,
        .dark-theme textarea {
        background-color: #333; /* Dark background */
        color: #fff; /* White text */
        border: 1px solid #555; /* Lighter border */
        }

        /* Placeholder color in dark mode */
        .dark-theme ::placeholder,
        .dark-theme ::placeholder {
        color: #aaa;
        }

        /* Responsive Styles */
        @media (max-width: 768px) {
        header .container {
            flex-direction: column;
            align-items: flex-start;
        }

        header h1 {
            margin-bottom: 10px;
            font-size: 1.5rem;
        }
        }

        @media (max-width: 480px) {
        header h1 {
            font-size: 1.2rem;
        }

        #theme-toggle {
            font-size: 1.2rem;
        }

        h2 {
            font-size: 1.4rem;
        }

        button {
            padding: 8px 12px;
            font-size: 0.9rem;
        }

        .modal-content {
            margin: 20% auto;
        }
        }

        /* Medium screens: 2 columns */
        @media (min-width: 600px) {
        #projects ul {
            grid-template-columns: repeat(2, 1fr);
        }
        }

        /* Large screens: 3 columns */
        @media (min-width: 900px) {
        #projects ul {
            grid-template-columns: repeat(3, 1fr);
        }
        }

        /* Extra large screens: 4 columns */
        @media (min-width: 1200px) {
        #projects ul {
            grid-template-columns: repeat(4, 1fr);
        }
        }

```
