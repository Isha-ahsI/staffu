document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("iconContainer");
  const searchInput = document.getElementById("iconSearch");

  let allIcons = [];

  fetch("data/remix-icons.json")
    .then(res => res.json())
    .then(data => {
      // 🔥 Flatten all categories into one array
      allIcons = Object.values(data).flat();

      renderIcons(allIcons);
    })
    .catch(err => console.error("Error loading icons:", err));

  function renderIcons(iconList = []) {
    container.innerHTML = "";

    if (iconList.length === 0) {
      container.innerHTML = `
        <div class="col-12 text-center text-muted py-5">
          No icons found
        </div>`;
      return;
    }

    iconList.forEach(icon => {
      const col = document.createElement("div");
      col.className = "mb-4 col-6 col-sm-4 col-md-3 col-xl-2";

      col.innerHTML = `
        <div class="card h-100 mb-0 icon-card">
          <div class="card-body text-center icon-box">
            <span class="icon-box-icon lh-1"><i class="ri-${icon} fs-26"></i></span> 
            <h6 class="icon-box-text mt-2 mb-0">${icon}</h6>
          </div>
        </div>`;
      container.appendChild(col);
    });
  }

  // 🔍 Global search (ALL categories)
  searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase().trim();

    const filteredIcons = allIcons.filter(icon =>
      icon.toLowerCase().includes(value)
    );

    renderIcons(filteredIcons);
  });
});
