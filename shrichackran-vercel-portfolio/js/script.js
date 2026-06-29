/* =========================
   EmailJS Contact Form Fix
   ========================= */

(function () {
  const EMAILJS_SERVICE_ID = "service_ktcd4zp";
  const EMAILJS_TEMPLATE_ID = "template_yh79qbj";
  const EMAILJS_PUBLIC_KEY = "x2P2JRv4AFlRKMJ8i";
  const OWNER_EMAIL = "shrichackran@gmail.com";

  function loadEmailJS() {
    return new Promise((resolve, reject) => {
      if (window.emailjs) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
      script.async = true;

      script.onload = () => resolve();
      script.onerror = () => reject(new Error("EmailJS SDK failed to load"));

      document.head.appendChild(script);
    });
  }

  function setupContactForm() {
    const existingForm =
      document.querySelector("#contact-form") ||
      document.querySelector(".contact-form") ||
      document.querySelector("form");

    if (!existingForm) return;

    const form = existingForm.cloneNode(true);
    existingForm.parentNode.replaceChild(form, existingForm);
    form.setAttribute("id", "contact-form");

    let statusEl =
      document.querySelector("#form-status") ||
      document.querySelector(".form-status") ||
      document.querySelector(".contact-status");

    if (!statusEl) {
      statusEl = document.createElement("p");
      statusEl.id = "form-status";
      statusEl.style.marginTop = "16px";
      statusEl.style.fontWeight = "700";
      form.appendChild(statusEl);
    }

    const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');

    function getField(selectors) {
      for (const selector of selectors) {
        const field = form.querySelector(selector);
        if (field && field.value) return field.value.trim();
      }
      return "";
    }

    function setStatus(message, type) {
      statusEl.textContent = message;
      statusEl.style.color = type === "success" ? "#34d399" : "#ff6b6b";
    }

    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      const senderName = getField([
        'input[name="name"]',
        'input[name="user_name"]',
        'input[name="from_name"]',
        "#name"
      ]);

      const senderEmail = getField([
        'input[name="email"]',
        'input[name="user_email"]',
        'input[name="from_email"]',
        'input[name="reply_to"]',
        "#email"
      ]);

      const subject = getField([
        'input[name="subject"]',
        'input[name="title"]',
        "#subject"
      ]);

      const message = getField([
        'textarea[name="message"]',
        'textarea[name="user_message"]',
        "#message"
      ]);

      if (!senderName || !senderEmail || !subject || !message) {
        setStatus("Please fill all fields before sending.", "error");
        return;
      }

      const templateParams = {
        name: senderName,
        user_name: senderName,
        from_name: senderName,

        email: senderEmail,
        user_email: senderEmail,
        from_email: senderEmail,
        reply_to: senderEmail,

        subject: subject,
        title: subject,

        message: message,
        user_message: message,

        to_name: "Shrichackran K M",
        to_email: OWNER_EMAIL,
        email_to: OWNER_EMAIL,
        recipient_email: OWNER_EMAIL,

        time: new Date().toLocaleString()
      };

      try {
        setStatus("Sending message...", "success");

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.dataset.originalText = submitBtn.textContent;
          submitBtn.textContent = "Sending...";
        }

        await loadEmailJS();

        window.emailjs.init({
          publicKey: EMAILJS_PUBLIC_KEY
        });

        await window.emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams,
          {
            publicKey: EMAILJS_PUBLIC_KEY
          }
        );

        setStatus("Message sent successfully. I’ll get back to you soon.", "success");
        form.reset();
      } catch (error) {
        console.error("EmailJS sending failed:", error);
        setStatus(
          "Message could not be sent. Please email me directly at shrichackran@gmail.com.",
          "error"
        );
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = submitBtn.dataset.originalText || "Send Message";
        }
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupContactForm);
  } else {
    setupContactForm();
  }
})();