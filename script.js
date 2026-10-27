const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navigation");
function closeMenu() {
  navigation.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menu");
}
menuButton.addEventListener("click", () => {
  const open = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
});
navigation
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navigation.classList.contains("open")) {
    closeMenu();
    menuButton.focus();
  }
});
window.matchMedia("(min-width: 761px)").addEventListener("change", closeMenu);
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelectorAll("[data-product]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector("#interest").value = button.dataset.product;
    document
      .querySelector("#contato")
      .scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    document.querySelector("#name").focus({ preventScroll: true });
  });
});
const form = document.querySelector("#contact-form");
const status = document.querySelector("#form-status");
const preparedMessage = document.querySelector("#prepared-message");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = String(data.get("name")).trim();
  const message = String(data.get("message")).trim();
  if (!name || !message) {
    status.textContent =
      "Preencha seu nome e sua mensagem para preparar a consulta.";
    return;
  }
  preparedMessage.value = `Olá, equipe Camarão do Norte! Meu nome é ${name}.\nInteresse: ${data.get("interest")}.\n\n${message}`;
  document.querySelector("#prepared").hidden = false;
  status.textContent =
    "Consulta preparada. Nada foi enviado. Copie a mensagem para usar quando o canal oficial estiver disponível.";
});
document.querySelector("#copy-message").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(preparedMessage.value);
    status.textContent = "Mensagem copiada. Nada foi enviado.";
  } catch {
    preparedMessage.focus();
    preparedMessage.select();
    status.textContent =
      "Selecione a mensagem acima e use a opção copiar do seu dispositivo.";
  }
});
