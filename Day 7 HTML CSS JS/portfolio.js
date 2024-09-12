// Select DOM elements
const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");
const menuItems = document.querySelectorAll(".menu-item a");
const header = document.getElementById("header");
const menu_container = document.getElementById("menu-container");
console.log("menu container", menu_container);

// Toggle menu visibility on smaller screens
menuBtn.addEventListener("click", () => {
  let isMenuOpen = false;
  if (isMenuOpen == false) {
    menu_container.classList.toggle("grid-rows-[0fr]");
    menu_container.classList.toggle("pb-0");

    isMenuOpen = true;
  } else if (isMenuOpen) {
    menu_container.classList.toggle("grid-rows-[1fr]");
    menu_container.classList.toggle("pb-3");
    menu_container.classList.toggle("md:pb-5");

    isMenuOpen = false;
  }
});

// Detect which section is active on scroll
window.addEventListener("scroll", () => {
  let currentSection = " ";

  document.querySelectorAll("section").forEach((section) => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 50) {
      currentSection = section.getAttribute("id");
    }
  });

  // Highlight the current menu item
  menuItems.forEach((item) => {
    item.classList.remove("text-orange-500"); // Remove active color
    if (item.getAttribute("href").includes(currentSection)) {
      item.classList.add("text-orange-500"); // Add orange color to active item
    }
  });
});

// Listen for the scroll event
window.addEventListener("scroll", () => {
  // Get the scroll position
  const scrollPosition = window.scrollY;

  // Check if the scroll position is greater than or equal to 200px
  if (scrollPosition >= 200) {
    // Add a white background and other styles
    header.classList.add("bg-white", "shadow-lg");
    header.classList.remove("bg-transparent");
  } else {
    // Remove the white background when scrolling back up
    header.classList.remove("bg-white", "shadow-lg");
    header.classList.add("bg-transparent");
  }
});
