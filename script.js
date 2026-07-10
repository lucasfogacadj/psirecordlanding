const root = document.documentElement;
const themeButtons = [...document.querySelectorAll("[data-theme-toggle]")];
const themeColor = document.querySelector("[data-theme-color]");
const colorPreference = window.matchMedia("(prefers-color-scheme: dark)");
const storageKey = "psirecord_landing_theme";

function readStoredTheme() {
  try {
    const stored = window.localStorage.getItem(storageKey);
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null;
  }
}

function applyTheme(theme, { persist = true } = {}) {
  const nextTheme = theme === "dark" ? "dark" : "light";
  root.dataset.theme = nextTheme;

  if (persist) {
    try {
      window.localStorage.setItem(storageKey, nextTheme);
    } catch {
      // The theme still works when storage is unavailable.
    }
  }

  themeButtons.forEach((button) => {
    const label = button.querySelector("[data-theme-label]");
    if (label) label.textContent = "Tema escuro";
    button.setAttribute("aria-label", "Tema escuro");
    button.setAttribute("aria-pressed", String(nextTheme === "dark"));
  });

  if (themeColor) {
    themeColor.setAttribute("content", nextTheme === "dark" ? "#0d1210" : "#f7f5f1");
  }
}

applyTheme(root.dataset.theme || (colorPreference.matches ? "dark" : "light"), { persist: false });

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyTheme(root.dataset.theme === "dark" ? "light" : "dark");
  });
});

colorPreference.addEventListener?.("change", (event) => {
  if (!readStoredTheme()) applyTheme(event.matches ? "dark" : "light", { persist: false });
});

const menuButton = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const pageMain = document.querySelector("main");
const pageFooter = document.querySelector("footer");
const skipLink = document.querySelector(".skip-link");

function setMenuOpen(open) {
  if (!menuButton || !mobileMenu) return;
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  mobileMenu.hidden = !open;
  document.body.classList.toggle("nav-open", open);
  if (pageMain) pageMain.inert = open;
  if (pageFooter) pageFooter.inert = open;
  if (skipLink) skipLink.inert = open;
}

menuButton?.addEventListener("click", () => {
  setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
});

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton?.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuButton.focus();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 1020) setMenuOpen(false);
});

document.querySelectorAll("[data-current-year]").forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});
