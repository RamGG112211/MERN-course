const categoryFilter = document.getElementById("category-filter")
const projectCategoryInput = document.getElementById("project-category");

// Categories Array
const categories = [
  "Web development",
  "Mobile app development",
  "Desktop app development",
  "UI/UX design",
  "Graphics design",
];


categoryFilter.addEventListener("click", (e)=>{
    const selectedValue = e.target.value;
    const filteredProjects = selectedValue != "all"?projects.filter((project)=>{
        return project.category == selectedValue;
    })

    renderProjects(filteredProjects)
}) 

function populateCategoryDropdowns(){
  categoryFilter.innerHTML = `<option value="all">All</option>`;
  categories.forEach((category)=>{
        const option = document.createElement("option");
        option.textContent = category;
        option.value = category;
        categoryFilter.appendChild(option);

  });
  projectCategoryInput.innerHTML = '';
   categories.forEach((category)=>{
        const option = document.createElement("option");
        option.textContent = category;
        option.value = category;
        projectCategoryInput.appendChild(option);

  });
}

populateCategoryDropdowns()