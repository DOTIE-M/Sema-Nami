// Smooth scrolling for buttons and nav links using data-scroll-to
document.querySelectorAll("[data-scroll-to]").forEach((el) => {
  el.addEventListener("click", (e) => {
    const targetSelector = el.getAttribute("data-scroll-to");
    const target = targetSelector && document.querySelector(targetSelector);
    if (!target) return;
    e.preventDefault();
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    if (prefersReducedMotion) {
      window.scrollTo(0, top);
    } else {
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});

// Mobile nav (simple: toggle header background height class if needed)
const navToggle = document.querySelector(".nav-toggle");
if (navToggle) {
  navToggle.addEventListener("click", () => {
    document.body.classList.toggle("nav-open");
  });
}

// Toast helpers
const toastEl = document.getElementById("toast");
let toastTimeout;

function showToast(message, type = "success") {
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.remove("toast--success", "toast--danger");
  if (type === "success") toastEl.classList.add("toast--success");
  if (type === "danger") toastEl.classList.add("toast--danger");
  toastEl.classList.add("toast--visible");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toastEl.classList.remove("toast--visible");
  }, 4500);
}

// Chatbot link behaviour
const CHATBOT_URL = "https://semanami.gtech-prc.org/"; // TODO: replace with your real chatbot URL

const chatbotButton = document.getElementById("chatbot-link-btn");
if (chatbotButton) {
  chatbotButton.addEventListener("click", () => {
    if (!CHATBOT_URL || CHATBOT_URL === "#") {
      showToast(
        "Chatbot link is not yet configured. Update CHATBOT_URL in script.js.",
        "danger"
      );
      return;
    }
    window.open(CHATBOT_URL, "_blank", "noopener");
  });
}

const bookingSummary = document.getElementById("booking-summary");
const whatsappNotes = document.getElementById("whatsapp-notes");
const whatsappBookingBtn = document.getElementById("whatsapp-booking-btn");

// Therapist WhatsApp number for booking sessions (international format without "+" or spaces)
const WHATSAPP_NUMBER = "254742004353";

if (whatsappBookingBtn && bookingSummary) {
  whatsappBookingBtn.addEventListener("click", () => {
    if (!WHATSAPP_NUMBER || WHATSAPP_NUMBER === "254700000000") {
      showToast(
        "WhatsApp number is not configured. Update WHATSAPP_NUMBER in script.js.",
        "danger"
      );
      return;
    }

    const extraNotes = whatsappNotes?.value.trim();
    const baseMessage =
      "Hello, I would like to request a confidential therapy session via Sema Nami.";
    const fullMessage = extraNotes
      ? `${baseMessage}\n\nHere is a bit more about what I need support with:\n${extraNotes}`
      : baseMessage;

    bookingSummary.innerHTML = `
      <h3>What will be sent</h3>
      <p class="booking-placeholder">${fullMessage.replace(
        /\n/g,
        "<br />"
      )}</p>
    `;

    const encodedMessage = encodeURIComponent(fullMessage);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    showToast("Opening WhatsApp in a new tab or app…", "success");
    window.open(whatsappUrl, "_blank", "noopener");
  });
}

// Quick exit buttons (fixed + inline) navigate to a neutral page
document.querySelectorAll(".quick-exit-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    window.location.href = "https://www.google.com";
  });
});
