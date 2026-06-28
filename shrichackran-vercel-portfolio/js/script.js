const EMAILJS_SERVICE_ID = "service_ktcd4zp";
const EMAILJS_TEMPLATE_ID = "template_yh79qbj";
const EMAILJS_PUBLIC_KEY = "x2P2JRv4AFlRKMJ8i";

const assetLibrary = {
  store: {
    title: "Store Intelligence API",
    assets: [
      ["assets/projects/store-intelligence/store1-docker-api-running.png", "Docker and FastAPI server running"],
      ["assets/projects/store-intelligence/store2-dashboard-output.png", "Dashboard output for store analytics"],
      ["assets/projects/store-intelligence/store3-api-terminal.jpg", "API terminal output"],
      ["assets/projects/store-intelligence/store4-metrics-json.jpg", "Metrics JSON response"],
      ["assets/projects/store-intelligence/store5-cctv-extraction.jpg", "CCTV extraction frame"],
      ["assets/projects/store-intelligence/store6-billing-camera.jpg", "Billing camera analytics frame"],
      ["assets/projects/store-intelligence/store7-test-coverage.jpg", "pytest coverage results"],
      ["assets/projects/store-intelligence/store8-presentation-cover.png", "Presentation cover"]
    ]
  },
  lifelink: {
    title: "LifeLink – Smart Blood Donation Platform",
    assets: [
      ["assets/projects/lifelink/life1.png", "LifeLink home screen"],
      ["assets/projects/lifelink/life2.png", "LifeLink donor matching interface"],
      ["assets/projects/lifelink/life3.jpg", "LifeLink project asset"],
      ["assets/projects/lifelink/life4.jpg", "LifeLink project asset"],
      ["assets/projects/lifelink/life5.jpg", "LifeLink project asset"],
      ["assets/projects/lifelink/life6.jpg", "LifeLink project asset"],
      ["assets/projects/lifelink/life7.jpg", "LifeLink project asset"],
      ["assets/projects/lifelink/life8.jpg", "LifeLink project asset"]
    ]
  },
  speech: {
    title: "Speech Denoising and Recognition System",
    assets: [
      ["assets/projects/speech/speech1.png", "Speech project asset"],
      ["assets/projects/speech/speech2.png", "Speech project asset"],
      ["assets/projects/speech/speech3.png", "Speech model output screenshot"],
      ["assets/projects/speech/speech4.png", "Speech pipeline screenshot"],
      ["assets/projects/speech/speech5.png", "Speech project asset"],
      ["assets/projects/speech/speech6.png", "Speech project asset"]
    ]
  },
  jobbzz: {
    title: "JoBzz – Agentic Job Alert System",
    assets: [
      ["assets/projects/jobbzz/job1.png", "JoBzz automation workflow screenshot"],
      ["assets/projects/jobbzz/job2.png", "JoBzz job alert workflow screenshot"],
      ["assets/projects/jobbzz/job3.png", "JoBzz project asset"],
      ["assets/projects/jobbzz/job4.png", "JoBzz project asset"],
      ["assets/projects/jobbzz/job5.png", "JoBzz project asset"]
    ]
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) root.setAttribute("data-theme", savedTheme);

  const themeToggle = document.querySelector(".theme-toggle");
  themeToggle?.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  navToggle?.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu?.classList.remove("open");
      navToggle?.setAttribute("aria-expanded", "false");
    });
  });

  const sections = [...document.querySelectorAll("main section[id]")];
  const navLinks = [...document.querySelectorAll(".nav-menu a")];
  const setActive = () => {
    const y = window.scrollY + 120;
    let current = sections[0]?.id;
    sections.forEach((section) => {
      if (section.offsetTop <= y) current = section.id;
    });
    navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${current}`));
  };
  window.addEventListener("scroll", setActive, { passive: true });
  setActive();

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  document.getElementById("year").textContent = new Date().getFullYear();

  setupAssetModal();
  setupEmailForm();
});

function setupAssetModal() {
  const modal = document.getElementById("asset-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalBody = document.getElementById("modal-body");
  let lastFocused = null;

  const closeModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    modalBody.innerHTML = "";
    if (lastFocused) lastFocused.focus();
  };

  document.querySelectorAll("[data-gallery]").forEach((button) => {
    button.addEventListener("click", () => {
      const gallery = assetLibrary[button.dataset.gallery];
      if (!gallery) return;
      lastFocused = button;
      modalTitle.textContent = gallery.title;
      modalBody.innerHTML = `<div class="asset-grid">${gallery.assets.map(([src, alt], index) => `
        <figure class="asset-card">
          <img src="${src}" alt="${alt}" loading="lazy" onerror="this.closest('figure').style.display='none'" />
          <a href="${src}" target="_blank" rel="noopener noreferrer">Open asset ${index + 1}</a>
        </figure>`).join("")}</div>`;
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
      modal.querySelector(".modal-close").focus();
    });
  });

  document.querySelectorAll("[data-close-modal]").forEach((el) => el.addEventListener("click", closeModal));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("open")) closeModal();
  });
}

function setupEmailForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  const submitButton = form?.querySelector(".form-submit");

  if (!form) return;

  const initEmail = () => {
    if (window.emailjs?.init) {
      window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
      return true;
    }
    return false;
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.textContent = "Sending message...";
    status.className = "form-status";
    submitButton.disabled = true;

    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const title = String(data.get("title") || "Portfolio contact").trim();
    const message = String(data.get("message") || "").trim();

    const templateParams = {
      name,
      user_name: name,
      from_name: name,
      email,
      user_email: email,
      from_email: email,
      reply_to: email,
      title,
      subject: title,
      message,
      user_message: message,
      to_name: "Shrichackran K M",
      time: new Date().toLocaleString()
    };

    try {
      if (!initEmail()) throw new Error("EmailJS SDK did not load. Check your internet connection or CDN access.");
      await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, { publicKey: EMAILJS_PUBLIC_KEY });
      status.textContent = "Message sent successfully. I’ll get back to you soon.";
      status.classList.add("success");
      form.reset();
    } catch (error) {
      console.error(error);
      status.textContent = "Message could not be sent. Please email me directly at shrichackran@gmail.com.";
      status.classList.add("error");
    } finally {
      submitButton.disabled = false;
    }
  });
}
