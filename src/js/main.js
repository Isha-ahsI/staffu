const setActiveStates = () => {
  const pathName = window.location.pathname;
  const segments = pathName.split("/").filter(Boolean);
  const currentPage = segments.length ? segments[segments.length - 1] : "index.html";

  const currentKey = currentPage
    .split(/[?#]/)[0]
    .replace(/\.html?$/i, "")
    .toLowerCase();

  document.querySelectorAll(".nav-link").forEach(link => {
    const href = link.getAttribute("href") || "";
    const linkFile = href.split("/").pop()?.split(/[?#]/)[0] || "";
    const linkKey = linkFile.replace(/\.html?$/i, "").toLowerCase();

    if (linkKey === currentKey) {
      // Active child link
      link.classList.add("active");

      const icon = link.querySelector(".menu-icon i[data-icon-active]");
      if (icon) {
        icon.classList.remove(icon.dataset.iconDefault); 
        icon.classList.add(icon.dataset.iconActive);     
      }

      const subMenu = link.closest(".sub-menu");
      if (subMenu) {
        // Open submenu
        subMenu.classList.add("show");

        //  Activate dropdown button (FIX)
        const dropdownBtn = subMenu.previousElementSibling;
        if (dropdownBtn && dropdownBtn.classList.contains("menu-drop-btn")) {
          dropdownBtn.classList.add("active");
          dropdownBtn.setAttribute("aria-expanded", "true");
        }
      }
    }
  });
};

document.addEventListener("DOMContentLoaded", setActiveStates);