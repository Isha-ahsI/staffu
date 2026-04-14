function SidebarManager(options = {}) {
  const config = {
    toggleSelector: '#sidebarToggle',
    sidebarSelector: '.left-sidebar',
    offcanvasSelector: '.leftside-offcanvas',
    mobile: 992,
    large: 1600,
    body: document.body,
    ...options,
  };

  const state = {
    sidebarSize: localStorage.getItem('sidebarSize') || 'lg',
    isMobileMenuOpen: false,
    isHoverEnabled: false,
  };

  let toggleBtn = null;
  let sidebar = null;
  let offcanvas = null;
  let bsOffcanvas = null;

  function applyBodyState() {
    const body = config.body;

    if (sidebar) {
      sidebar.style.width = '';
    }

    body.setAttribute('data-sidebar', state.sidebarSize);
    body.classList.toggle('sidebar-hover-enabled', state.isHoverEnabled);
    body.classList.toggle('mobile-menu-open', state.isMobileMenuOpen);

    // Save to localStorage
    localStorage.setItem('sidebarSize', state.sidebarSize);
  }

  function handleResize() {
    const width = window.innerWidth;

    if (width < config.mobile) {
      state.sidebarSize = 'lg';
      state.isMobileMenuOpen = false;
      state.isHoverEnabled = false;

      if (bsOffcanvas && offcanvas.classList.contains('show')) {
        bsOffcanvas.hide();
      }
    }
    else if (width >= config.mobile && width < config.large) {
      state.sidebarSize = 'sm';
      state.isMobileMenuOpen = false;
      state.isHoverEnabled = true;

      if (bsOffcanvas && offcanvas.classList.contains('show')) {
        bsOffcanvas.hide();
      }
    }
    else {
      state.isMobileMenuOpen = false;
      if (state.sidebarSize === 'sm') {
        state.isHoverEnabled = true;
      } else {
        state.isHoverEnabled = false;
      }

      if (bsOffcanvas && offcanvas.classList.contains('show')) {
        bsOffcanvas.hide();
      }
    }

    applyBodyState();

    // Update SidebarLayoutManager UI
    if (typeof SidebarLayoutManager !== 'undefined') {
      SidebarLayoutManager.updateUI();
    }
  }

  function toggle() {
    const width = window.innerWidth;

    if (width < config.mobile) {
      if (bsOffcanvas) {
        bsOffcanvas.toggle();
      }
    }
    else if (width >= config.mobile && width < config.large) {
      state.isHoverEnabled = !state.isHoverEnabled;
      applyBodyState();
    }
    else {
      if (state.sidebarSize === 'lg') {
        state.sidebarSize = 'sm';
        state.isHoverEnabled = true;
      } else {
        state.sidebarSize = 'lg';
        state.isHoverEnabled = false;
      }
      applyBodyState();

      // Update SidebarLayoutManager UI
      if (typeof SidebarLayoutManager !== 'undefined') {
        SidebarLayoutManager.updateUI();
      }
    }
  }

  function initOffcanvas() {
    offcanvas = document.querySelector(config.offcanvasSelector);

    if (offcanvas && typeof bootstrap !== 'undefined' && bootstrap.Offcanvas) {
      bsOffcanvas = new bootstrap.Offcanvas(offcanvas, {
        backdrop: true,
        keyboard: true,
        scroll: false
      });
    }
  }

  function bindEvents() {
    toggleBtn = document.querySelector(config.toggleSelector);
    sidebar = document.querySelector(config.sidebarSelector);

    if (!toggleBtn) {
      console.warn('SidebarManager: Toggle button not found:', config.toggleSelector);
      return;
    }

    toggleBtn.addEventListener('click', toggle);
    window.addEventListener('resize', handleResize);
  }

  function unbindEvents() {
    if (toggleBtn) {
      toggleBtn.removeEventListener('click', toggle);
    }
    window.removeEventListener('resize', handleResize);

    if (bsOffcanvas) {
      bsOffcanvas.dispose();
    }
  }

  function init() {
    initOffcanvas();
    handleResize();
    bindEvents();
  }

  function destroy() {
    unbindEvents();
  }

  function getState() {
    return { ...state };
  }

  return {
    init,
    destroy,
    getState,
  };
}

// Initialize sidebar manager
const sidebarManager = SidebarManager({
  toggleSelector: '#sidebarToggle',
  offcanvasSelector: '.leftside-offcanvas'
});
sidebarManager.init();

// Icon toggle functionality
const toggleBtn = document.querySelector('#sidebarToggle');
const icon = toggleBtn?.querySelector('i');

function updateSidebarIcon() {
  if (!icon) return;

  const body = document.body;
  const sidebarSize = body.getAttribute('data-sidebar');
  const windowWidth = window.innerWidth;

  let isCollapsed = false;

  if (windowWidth < 992) {
    isCollapsed = false;
  } else if (windowWidth >= 992 && windowWidth < 1600) {
    isCollapsed = !body.classList.contains('sidebar-hover-enabled');
  } else {
    isCollapsed = sidebarSize === 'sm';
  }

  icon.classList.toggle('ri-menu-unfold-4-fill', !isCollapsed);
  icon.classList.toggle('ri-menu-fold-3-fill', isCollapsed);
}

updateSidebarIcon();

const observer = new MutationObserver(() => {
  updateSidebarIcon();
});

observer.observe(document.body, {
  attributes: true,
  attributeFilter: ['data-sidebar', 'class']
});

window.addEventListener('resize', updateSidebarIcon);

// Apply theme immediately to prevent flash
(function () {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = savedTheme || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-bs-theme', theme);
})();


// ========================================
// TOPBAR MANAGER
// ========================================

const TopbarManager = (() => {
    // Toggle fullscreen
    const toggleFullscreen = () => {
        const elem = document.documentElement;
        const icon = document.getElementById('fullscreen-icon');

        if (!document.fullscreenElement) {
            elem.requestFullscreen().catch(err => {
            });
            if (icon) {
                icon.classList.remove('ri-fullscreen-line');
                icon.classList.add('ri-fullscreen-exit-line');
            }
        } else {
            document.exitFullscreen();
            if (icon) {
                icon.classList.remove('ri-fullscreen-exit-line');
                icon.classList.add('ri-fullscreen-line');
            }
        }
    };

    // Initialize
    const init = () => {
        document.addEventListener('fullscreenchange', () => {
            const icon = document.getElementById('fullscreen-icon');
            if (icon) {
                if (document.fullscreenElement) {
                    icon.classList.remove('ri-fullscreen-line');
                    icon.classList.add('ri-fullscreen-exit-line');
                } else {
                    icon.classList.remove('ri-fullscreen-exit-line');
                    icon.classList.add('ri-fullscreen-line');
                }
            }
        });
    };

    return {
        init,
        toggleFullscreen
    };
})();

// ========================================
// THEME MANAGER (Dark/Light Mode)
// ========================================

const ThemeManager = {
  styleId: "theme-transition-styles",
  currentTheme: null,

  init() {
    const savedTheme = localStorage.getItem('theme');
    const documentTheme = document.documentElement.getAttribute('data-bs-theme');
    this.currentTheme = savedTheme || documentTheme || 'light';

    document.documentElement.setAttribute('data-bs-theme', this.currentTheme);
    localStorage.setItem('theme', this.currentTheme);

    this.updateIcon();
  },

  getPositionCoords(position) {
    const positions = {
      "top-left": { cx: "0", cy: "0" },
      "top-right": { cx: "40", cy: "0" },
      "bottom-left": { cx: "0", cy: "40" },
      "bottom-right": { cx: "40", cy: "40" }
    };
    return positions[position] || null;
  },

  generateSVG(variant, start) {
    if (start === "center") return "";

    if (variant === "rectangle-left") {
      return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="grad-left" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:black;stop-opacity:1" /><stop offset="100%" style="stop-color:black;stop-opacity:1" /></linearGradient></defs><rect x="0" y="0" width="100" height="100" fill="url(%23grad-left)"/></svg>`;
    }
    if (variant === "rectangle-right") {
      return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="grad-right" x1="100%" y1="0%" x2="0%" y2="0%"><stop offset="0%" style="stop-color:black;stop-opacity:1" /><stop offset="100%" style="stop-color:black;stop-opacity:1" /></linearGradient></defs><rect x="0" y="0" width="100" height="100" fill="url(%23grad-right)"/></svg>`;
    }

    const pos = this.getPositionCoords(start);
    if (!pos) return "";
    const { cx, cy } = pos;

    if (variant === "circle") {
      return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="${cx}" cy="${cy}" r="20" fill="black"/></svg>`;
    }
    if (variant === "circle-blur") {
      return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><filter id="blur"><feGaussianBlur stdDeviation="2"/></filter></defs><circle cx="${cx}" cy="${cy}" r="18" fill="black" filter="url(%23blur)"/></svg>`;
    }
    return "";
  },

  getTransformOrigin(start) {
    const origins = {
      "top-left": "top left",
      "top-right": "top right",
      "bottom-left": "bottom left",
      "bottom-right": "bottom right"
    };
    return origins[start] || "center";
  },

  createAnimation(variant, start) {
    const svg = this.generateSVG(variant, start);

    if (variant === "rectangle-left") {
      return `
                ::view-transition-group(root) {
                    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                }
                ::view-transition-new(root) {
                    mask: linear-gradient(to right, black 0%, black 100%);
                    mask-size: 0% 100%;
                    mask-position: left center;
                    mask-repeat: no-repeat;
                    animation: slideFromLeft 0.6s ease-out both;
                }
                ::view-transition-old(root) {
                    animation: slideFromLeft 0.6s ease-out both;
                    z-index: -1;
                }
                @keyframes slideFromLeft {
                    from { mask-size: 0% 100%; }
                    to { mask-size: 100% 100%; }
                }
            `;
    }

    if (variant === "rectangle-right") {
      return `
                ::view-transition-group(root) {
                    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                }
                ::view-transition-new(root) {
                    mask: linear-gradient(to left, black 0%, black 100%);
                    mask-size: 0% 100%;
                    mask-position: right center;
                    mask-repeat: no-repeat;
                    animation: slideFromRight 0.6s ease-out both;
                }
                ::view-transition-old(root) {
                    animation: slideFromRight 0.6s ease-out both;
                    z-index: -1;
                }
                @keyframes slideFromRight {
                    from { mask-size: 0% 100%; }
                    to { mask-size: 100% 100%; }
                }
            `;
    }

    const transformOrigin = this.getTransformOrigin(start);
    return `
            ::view-transition-group(root) {
                animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
            }
            ::view-transition-new(root) {
                mask: url('${svg}') ${start.replace("-", " ")} / 0 no-repeat;
                animation: scale-${start} 1.2s both;
                transform-origin: ${transformOrigin};
            }
            ::view-transition-old(root) {
                animation: scale-${start} 1.2s both;
                transform-origin: ${transformOrigin};
                z-index: -1;
            }
            @keyframes scale-${start} {
                from { mask-size: 0; }
                to { mask-size: 350vmax; }
            }
        `;
  },

  updateStyles(css) {
    let styleElement = document.getElementById(this.styleId);
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = this.styleId;
      document.head.appendChild(styleElement);
    }
    styleElement.textContent = css;
  },

  updateIcon() {
    const icon = document.querySelectorAll("#theme-toggle-icon,#theme-toggle-icon-small");
    icon.forEach(icon => {
      if (icon) {
        icon.className = this.currentTheme === 'dark'
          ? 'bi bi-brightness-high avatar avatar-sm cursor fs-5'
          : 'ri-moon-line avatar avatar-sm cursor fs-5';
      }
    })
  },

  toggle(variant = "circle-blur", start = null) {
    if (!start) {
      start = this.currentTheme === 'dark' ? 'top-left' : 'top-right';
    }

    const animationCSS = this.createAnimation(variant, start);
    this.updateStyles(animationCSS);

    const switchTheme = () => {
      this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', this.currentTheme);
      document.documentElement.setAttribute('data-bs-theme', this.currentTheme);
      this.updateIcon();
    };

    if (!document.startViewTransition) {
      switchTheme();
      return;
    }

    document.startViewTransition(switchTheme);
  }
};

// ========================================
// SIDEBAR LAYOUT MANAGER (Compact/Expanded)
// ========================================

const SidebarLayoutManager = {
  currentSize: null,

  init() {
    const savedSize = localStorage.getItem('sidebarSize');
    const bodySize = document.body.getAttribute('data-sidebar');
    this.currentSize = savedSize || bodySize || 'lg';

    document.body.setAttribute('data-sidebar', this.currentSize);
    localStorage.setItem('sidebarSize', this.currentSize);

    this.updateUI();
    this.initEventListeners();
  },

  setSidebarSize(size) {
    if (size !== 'sm' && size !== 'lg') return;

    this.currentSize = size;
    document.body.setAttribute('data-sidebar', size);
    localStorage.setItem('sidebarSize', size);
    this.updateUI();
  },

  updateUI() {
    // Use specific selector for sidebar overlay
    const overlay = document.querySelector('.toggle-overlay-sidebar');
    if (overlay) {
      overlay.className = `toggle-overlay toggle-overlay-sidebar ${this.currentSize}`;
    }

    const smRadio = document.getElementById('sidebar-sm');
    const lgRadio = document.getElementById('sidebar-lg');
    const smLabel = document.querySelector('label[for="sidebar-sm"]');
    const lgLabel = document.querySelector('label[for="sidebar-lg"]');

    if (this.currentSize === 'sm') {
      if (smRadio) smRadio.checked = true;
      if (lgRadio) lgRadio.checked = false;
      if (smLabel) smLabel.classList.add('active');
      if (lgLabel) lgLabel.classList.remove('active');
    } else {
      if (lgRadio) lgRadio.checked = true;
      if (smRadio) smRadio.checked = false;
      if (lgLabel) lgLabel.classList.add('active');
      if (smLabel) smLabel.classList.remove('active');
    }
  },

  initEventListeners() {
    const smRadio = document.getElementById('sidebar-sm');
    const lgRadio = document.getElementById('sidebar-lg');
    const smLabel = document.querySelector('label[for="sidebar-sm"]');
    const lgLabel = document.querySelector('label[for="sidebar-lg"]');

    if (smRadio) {
      smRadio.addEventListener('change', () => {
        if (smRadio.checked) this.setSidebarSize('sm');
      });
    }

    if (lgRadio) {
      lgRadio.addEventListener('change', () => {
        if (lgRadio.checked) this.setSidebarSize('lg');
      });
    }

    if (smLabel) {
      smLabel.addEventListener('click', () => this.setSidebarSize('sm'));
    }

    if (lgLabel) {
      lgLabel.addEventListener('click', () => this.setSidebarSize('lg'));
    }
  }
};

// ========================================
// DIRECTION MANAGER (RTL/LTR)
// ========================================

const DirectionManager = {
  currentDir: null,

  init() {
    const urlParams = new URLSearchParams(window.location.search);
    const urlDir = urlParams.get('dir');
    const savedDir = localStorage.getItem('dir');
    const documentDir = document.documentElement.getAttribute('dir');

    this.currentDir = urlDir || savedDir || documentDir || 'ltr';

    document.documentElement.setAttribute('dir', this.currentDir);
    localStorage.setItem('dir', this.currentDir);

    this.updateStylesheet();
    this.updateIcon();
    this.updateUI();
    this.initEventListeners();
  },

  setDirection(dir) {
    if (dir !== 'ltr' && dir !== 'rtl') return;

    this.currentDir = dir;
    localStorage.setItem('dir', dir);
    document.documentElement.setAttribute('dir', dir);

    this.updateStylesheet();
    this.updateIcon();
    this.updateUI();

    const url = new URL(window.location);
    url.searchParams.set('dir', dir);
    window.history.replaceState({}, '', url);
  },

  updateStylesheet() {
    const mainStyle = document.getElementById('main-style');
    if (mainStyle) {
      mainStyle.href = this.currentDir === 'rtl'
        ? 'css/style.rtl.min.css'
        : 'css/style.min.css';
    }
  },

  updateIcon() {
    const icon = document.getElementById('direction-toggle-icon');
    if (icon) {
      icon.className = this.currentDir === 'rtl'
        ? 'ri-text-direction-l avatar avatar-sm cursor fs-5'
        : 'ri-text-direction-r avatar avatar-sm cursor fs-5';
    }
  },

  updateUI() {
    const ltrRadio = document.getElementById('direction-ltr');
    const rtlRadio = document.getElementById('direction-rtl');
    const ltrLabel = document.querySelector('label[for="direction-ltr"]');
    const rtlLabel = document.querySelector('label[for="direction-rtl"]');
    // Use specific selector for direction overlay
    const overlay = document.querySelector('.toggle-overlay-direction');

    if (this.currentDir === 'rtl') {
      if (rtlRadio) rtlRadio.checked = true;
      if (ltrRadio) ltrRadio.checked = false;
      if (ltrLabel) ltrLabel.classList.remove('active');
      if (rtlLabel) rtlLabel.classList.add('active');
      if (overlay) {
        overlay.classList.remove('ltr');
        overlay.classList.add('rtl');
      }
    } else {
      if (ltrRadio) ltrRadio.checked = true;
      if (rtlRadio) rtlRadio.checked = false;
      if (rtlLabel) rtlLabel.classList.remove('active');
      if (ltrLabel) ltrLabel.classList.add('active');
      if (overlay) {
        overlay.classList.remove('rtl');
        overlay.classList.add('ltr');
      }
    }
  },

  initEventListeners() {
    const ltrRadio = document.getElementById('direction-ltr');
    const rtlRadio = document.getElementById('direction-rtl');
    const ltrLabel = document.querySelector('label[for="direction-ltr"]');
    const rtlLabel = document.querySelector('label[for="direction-rtl"]');

    if (ltrRadio) {
      ltrRadio.addEventListener('change', () => {
        if (ltrRadio.checked) this.setDirection('ltr');
      });
    }

    if (rtlRadio) {
      rtlRadio.addEventListener('change', () => {
        if (rtlRadio.checked) this.setDirection('rtl');
      });
    }

    if (ltrLabel) {
      ltrLabel.addEventListener('click', () => this.setDirection('ltr'));
    }

    if (rtlLabel) {
      rtlLabel.addEventListener('click', () => this.setDirection('rtl'));
    }
  }
};

// ========================================
// SIDEBAR COLOR MANAGER
// ========================================

const SidebarColorManager = {
  currentSidebarColor: null,

  init() {
    const savedSidebarColor = localStorage.getItem('sidebarColor');
    const bodySidebarColor = document.body.getAttribute('data-sidebar-color');
    this.currentSidebarColor = savedSidebarColor || bodySidebarColor || 'default';

    document.body.setAttribute('data-sidebar-color', this.currentSidebarColor);
    localStorage.setItem('sidebarColor', this.currentSidebarColor);

    this.updateUI();
    this.initEventListeners();
    this.monitorThemeChanges();
  },

  setSidebarColor(color) {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme') || 'light';
    if (currentTheme === 'dark' && color === 'default') {
      return;
    }

    this.currentSidebarColor = color;
    document.body.setAttribute('data-sidebar-color', color);
    localStorage.setItem('sidebarColor', color);
    this.updateUI();
  },

  isColorDisabled(color) {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme') || 'light';
    return currentTheme === 'dark' && color === 'default';
  },

  createDisabledOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-25 color-disabled-overlay';
    overlay.style.zIndex = '10';

    const circle = document.createElement('div');
    circle.className = 'bg-white rounded-circle p-2';

    const icon = document.createElement('i');
    icon.className = 'bi bi-slash-circle text-danger fs-5';

    circle.appendChild(icon);
    overlay.appendChild(circle);

    return overlay;
  },

  updateUI() {
    const colors = ['default', 'dark', 'primary', 'gradient'];

    colors.forEach(color => {
      const swatch = document.querySelector(`[data-sidebar-color="${color}"]`);
      if (!swatch) return;

      const disabled = this.isColorDisabled(color);
      const isSelected = this.currentSidebarColor === color;

      // FIX: Ensure parent element has position-relative for proper overlay positioning
      if (!swatch.classList.contains('position-relative')) {
        swatch.classList.add('position-relative');
      }

      if (disabled) {
        swatch.classList.add('opacity-50', 'pe-none');
      } else {
        swatch.classList.remove('opacity-50', 'pe-none');
      }

      if (isSelected && !disabled) {
        swatch.classList.add('border-2', 'border-primary');
        swatch.classList.remove('border');
      } else {
        swatch.classList.remove('border-2', 'border-primary');
        swatch.classList.add('border');
      }

      let disabledIcon = swatch.querySelector('.color-disabled-overlay');

      if (disabled) {
        if (!disabledIcon) {
          disabledIcon = this.createDisabledOverlay();
          swatch.appendChild(disabledIcon);
        }
      } else {
        if (disabledIcon) {
          disabledIcon.remove();
        }
      }
    });
  },

  monitorThemeChanges() {
    const observer = new MutationObserver(() => {
      const currentTheme = document.documentElement.getAttribute('data-bs-theme') || 'light';

      if (currentTheme === 'light' && this.currentSidebarColor === 'dark') {
        // When switching to light mode, reset to default if current color is dark
        this.setSidebarColor('default');
      } else if (this.isColorDisabled(this.currentSidebarColor)) {
        // If current color is disabled in the new theme, switch to appropriate color
        this.setSidebarColor(currentTheme === 'dark' ? 'dark' : 'default');
      } else {
        this.updateUI();
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-bs-theme']
    });
  },

  initEventListeners() {
    document.querySelectorAll('[data-sidebar-color]').forEach(swatch => {
      swatch.addEventListener('click', () => {
        const color = swatch.getAttribute('data-sidebar-color');
        this.setSidebarColor(color);
      });
    });
  }
};

// ========================================
// HEADER COLOR MANAGER
// ========================================

const HeaderColorManager = {
  currentHeaderColor: null,

  init() {
    const savedHeaderColor = localStorage.getItem('headerColor');
    const bodyHeaderColor = document.body.getAttribute('data-header-color');
    this.currentHeaderColor = savedHeaderColor || bodyHeaderColor || 'primary';

    document.body.setAttribute('data-header-color', this.currentHeaderColor);
    localStorage.setItem('headerColor', this.currentHeaderColor);

    this.updateUI();
    this.initEventListeners();
    this.monitorThemeChanges();
  },

  setHeaderColor(color) {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme') || 'light';
    if (currentTheme === 'dark' && color === 'default') {
      return;
    }

    this.currentHeaderColor = color;
    document.body.setAttribute('data-header-color', color);
    localStorage.setItem('headerColor', color);
    this.updateUI();
  },

  isColorDisabled(color) {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme') || 'light';
    return currentTheme === 'dark' && color === 'default';
  },

  createDisabledOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-25 color-disabled-overlay';
    overlay.style.zIndex = '10';

    const circle = document.createElement('div');
    circle.className = 'bg-white rounded-circle p-2';

    const icon = document.createElement('i');
    icon.className = 'bi bi-slash-circle text-danger fs-5';

    circle.appendChild(icon);
    overlay.appendChild(circle);

    return overlay;
  },

  updateUI() {
    const colors = ['default', 'dark', 'primary', 'gradient'];

    colors.forEach(color => {
      const swatch = document.querySelector(`[data-header-color="${color}"]`);
      if (!swatch) return;

      const disabled = this.isColorDisabled(color);
      const isSelected = this.currentHeaderColor === color;

      // FIX: Ensure parent element has position-relative for proper overlay positioning
      if (!swatch.classList.contains('position-relative')) {
        swatch.classList.add('position-relative');
      }

      if (disabled) {
        swatch.classList.add('opacity-50', 'pe-none');
      } else {
        swatch.classList.remove('opacity-50', 'pe-none');
      }

      if (isSelected && !disabled) {
        swatch.classList.add('border-2', 'border-primary');
        swatch.classList.remove('border');
      } else {
        swatch.classList.remove('border-2', 'border-primary');
        swatch.classList.add('border');
      }

      let disabledIcon = swatch.querySelector('.color-disabled-overlay');

      if (disabled) {
        if (!disabledIcon) {
          disabledIcon = this.createDisabledOverlay();
          swatch.appendChild(disabledIcon);
        }
      } else {
        if (disabledIcon) {
          disabledIcon.remove();
        }
      }
    });
  },

  monitorThemeChanges() {
    const observer = new MutationObserver(() => {
      const currentTheme = document.documentElement.getAttribute('data-bs-theme') || 'light';

      if (currentTheme === 'light' && this.currentHeaderColor === 'dark') {
        // When switching to light mode, reset to default if current color is dark
        this.setHeaderColor('default');
      } else if (this.isColorDisabled(this.currentHeaderColor)) {
        // If current color is disabled in the new theme, switch to appropriate color
        this.setHeaderColor(currentTheme === 'dark' ? 'dark' : 'default');
      } else {
        this.updateUI();
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-bs-theme']
    });
  },

  initEventListeners() {
    document.querySelectorAll('[data-header-color]').forEach(swatch => {
      swatch.addEventListener('click', () => {
        const color = swatch.getAttribute('data-header-color');
        this.setHeaderColor(color);
      });
    });
  }
};

// ========================================
// UI THEME COLOR MANAGER
// ========================================

const UIThemeManager = {
  currentThemeColor: null,

  init() {
    // Get current theme color from localStorage or body attribute
    const savedThemeColor = localStorage.getItem('themeColor');
    const bodyThemeColor = document.body.getAttribute('data-theme-colors');
    this.currentThemeColor = savedThemeColor || bodyThemeColor || 'default';

    // Ensure theme color is applied and saved
    document.body.setAttribute('data-theme-colors', this.currentThemeColor);
    localStorage.setItem('themeColor', this.currentThemeColor);

    this.updateUI();
    this.initEventListeners();
  },

  setThemeColor(color) {
    this.currentThemeColor = color;
    document.body.setAttribute('data-theme-colors', color);
    localStorage.setItem('themeColor', color);
    this.updateUI();
  },

  getThemeColor() {
    return this.currentThemeColor;
  },

  updateUI() {
    // Update all theme color buttons
    document.querySelectorAll('.theme-color-btn').forEach(btn => {
      const btnColor = btn.getAttribute('data-theme-color');
      const checkIcon = btn.querySelector('.theme-check-icon');
      const dropletIcon = btn.querySelector('.bi-droplet-fill');
      const color = btn.getAttribute('data-color');

      if (btnColor === this.currentThemeColor) {
        btn.classList.remove('btn-outline-secondary');
        btn.classList.add('btn-primary');
        btn.style.borderColor = color;
        btn.style.backgroundColor = color;
        btn.style.color = 'dark';
        if (dropletIcon) dropletIcon.style.color = 'white';
        if (checkIcon) checkIcon.style.display = 'inline';
      } else {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-outline-secondary');
        btn.style.borderColor = '';
        btn.style.backgroundColor = '';
        if (dropletIcon) dropletIcon.style.color = color;
        if (checkIcon) checkIcon.style.display = 'none';
      }
    });
  },

  initEventListeners() {
    document.querySelectorAll('.theme-color-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const color = btn.getAttribute('data-theme-color');
        this.setThemeColor(color);
      });
    });
  }
};

// ========================================
// UI LAYOUT MANAGER
// ========================================
const UILayoutManager = {
  currentLayout: 'default',

  init() {
    const savedLayout = localStorage.getItem('layoutMode');
    this.currentLayout = savedLayout || 'default';

    document.body.setAttribute('data-layout', this.currentLayout);
    localStorage.setItem('layoutMode', this.currentLayout);

    this.syncUI();
    this.initEventListeners();
  },

  setLayout(layout) {
    if (!['default', 'boxed'].includes(layout)) return;

    this.currentLayout = layout;
    document.body.setAttribute('data-layout', layout);
    localStorage.setItem('layoutMode', layout);

    this.syncUI();
  },

  syncUI() {
    // Use specific selector for layout overlay
    const overlay = document.querySelector('.toggle-overlay-layout');

    document.querySelectorAll('input[name="layoutMode"]').forEach(input => {
      const label = document.querySelector(`label[for="${input.id}"]`);

      if (input.dataset.layout === this.currentLayout) {
        input.checked = true;
        label.classList.add('active');
      } else {
        label.classList.remove('active');
      }
    });

    // MOVE BACKGROUND
    if (overlay) {
      overlay.classList.remove('default', 'boxed');
      overlay.classList.add(this.currentLayout);
    }
  },

  initEventListeners() {
    document.querySelectorAll('input[name="layoutMode"]').forEach(input => {
      input.addEventListener('change', () => {
        this.setLayout(input.dataset.layout);
      });
    });
  }
};



// ========================================
// INITIALIZE ALL MANAGERS
// ========================================

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    SidebarLayoutManager.init();
    DirectionManager.init();
    SidebarColorManager.init();
    HeaderColorManager.init();
    UIThemeManager.init();
    UILayoutManager.init();
  });
} else {
  SidebarLayoutManager.init();
  DirectionManager.init();
  SidebarColorManager.init();
  HeaderColorManager.init();
  UIThemeManager.init();
  UILayoutManager.init();
}


// tooltip js
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
tooltipTriggerList.forEach(el => {
  new bootstrap.Tooltip(el);
});