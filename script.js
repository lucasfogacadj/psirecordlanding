const root = document.documentElement;
const toggleButton = document.querySelector("[data-theme-toggle]");
const storedTheme = window.localStorage.getItem("psirecord_landing_theme");

function applyTheme(theme) {
  const nextTheme = theme === "dark" ? "dark" : "light";
  root.dataset.theme = nextTheme;
  window.localStorage.setItem("psirecord_landing_theme", nextTheme);
  if (toggleButton) {
    toggleButton.textContent = nextTheme === "dark" ? "Tema claro" : "Tema escuro";
  }
}

applyTheme(storedTheme || "dark");

toggleButton?.addEventListener("click", () => {
  applyTheme(root.dataset.theme === "dark" ? "light" : "dark");
});
