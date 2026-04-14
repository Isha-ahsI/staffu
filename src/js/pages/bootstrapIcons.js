document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("iconContainer");
  const searchInput = document.getElementById("iconSearch");

  let allIcons = [];

  try {
    const response = await fetch(
      "https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.json"
    );
    const data = await response.json();
    allIcons = Object.keys(data);

    renderIcons(allIcons);
  } catch (error) {
    console.error(error);
    container.innerHTML =
      "<p class='text-danger'>Failed to load icons.</p>";
  }

  function renderIcons(iconList) {
    container.innerHTML = "";

    if (iconList.length === 0) {
      container.innerHTML =
        "<p class='text-muted'>No icons found</p>";
      return;
    }

    iconList.forEach(icon => {
      const col = document.createElement("div");
      col.className = "col-6 col-sm-4 col-md-3 col-xl-2 mb-4";

      col.innerHTML = `
        <div class="card h-100 mb-0 icon-card">
          <div class="text-center card-body icon-box">
            <span class="icon-box-icon"><i class="bi bi-${icon} fs-26"></i></span>  
            <h6 class="mt-2 mb-0 icon-box-text">${icon}</h6>
          </div>
        </div>
      `;

      container.appendChild(col);
    });
  }

  // 🔍 Search filter
  searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase().trim();

    const filtered = allIcons.filter(icon =>
      icon.includes(value)
    );

    renderIcons(filtered);
  });
});
