import * as THREE from 'https://unpkg.com/three@0.161.0/build/three.module.js';

const EMAILJS_SERVICE_ID = 'service_ktcd4zp';
const EMAILJS_TEMPLATE_ID = 'template_yh79qbj';
const EMAILJS_PUBLIC_KEY = 'x2P2JRv4AFlRKMJ8i';

const galleries = {
  store: {
    kicker: 'Store Intelligence API',
    title: 'CCTV Retail Analytics Assets',
    description: 'Docker/API run, dashboard output, API metrics, CCTV extraction, test coverage, and presentation asset from the Store Intelligence challenge.',
    assets: [
      { type: 'image', src: 'assets/projects/store-intelligence/store1-docker-api-running.png', label: 'Docker API' },
      { type: 'image', src: 'assets/projects/store-intelligence/store2-dashboard-output.png', label: 'Dashboard' },
      { type: 'image', src: 'assets/projects/store-intelligence/store3-api-terminal.jpg', label: 'Terminal' },
      { type: 'image', src: 'assets/projects/store-intelligence/store4-metrics-json.jpg', label: 'Metrics' },
      { type: 'image', src: 'assets/projects/store-intelligence/store5-cctv-extraction.jpg', label: 'CCTV Extraction' },
      { type: 'image', src: 'assets/projects/store-intelligence/store6-billing-camera.jpg', label: 'Billing Camera' },
      { type: 'image', src: 'assets/projects/store-intelligence/store7-test-coverage.jpg', label: 'Test Coverage' },
      { type: 'image', src: 'assets/projects/store-intelligence/store8-presentation-cover.png', label: 'Presentation' },
      { type: 'pdf', src: 'assets/projects/store-intelligence/store-intelligence-presentation.pdf', label: 'PDF Deck' }
    ]
  },
  lifelink: {
    kicker: 'LifeLink', title: 'Smart Blood Donation Platform Assets', description: 'Screens and workflow assets for the donor matching platform.',
    assets: ['life1.png','life2.png','life3.jpg','life4.jpg','life5.jpg','life6.jpg','life7.jpg','life8.jpg'].map((f,i)=>({type:'image',src:`assets/projects/lifelink/${f}`,label:`LifeLink ${i+1}`}))
  },
  speech: {
    kicker: 'Speech AI', title: 'Speech Denoising and Recognition Assets', description: 'Screens and pipeline visuals for denoising, recognition, and LLM-assisted processing.',
    assets: ['speech1.png','speech2.png','speech3.png','speech4.png','speech5.png','speech6.png'].map((f,i)=>({type:'image',src:`assets/projects/speech/${f}`,label:`Speech ${i+1}`}))
  },
  jobbzz: {
    kicker: 'JoBzz', title: 'Agentic Job Alert Automation Assets', description: 'Workflow assets for the n8n automation pipeline and job alert system.',
    assets: ['job1.png','job2.png','job3.png','job4.png','job5.png'].map((f,i)=>({type:'image',src:`assets/projects/jobbzz/${f}`,label:`JoBzz ${i+1}`}))
  }
};

const body = document.body;
body.classList.add('loading');
const percent = document.getElementById('loaderPercent');
const bar = document.getElementById('loaderBar');
let progress = 0;
const loaderTimer = setInterval(() => {
  progress += Math.floor(Math.random() * 8) + 5;
  if (progress >= 100) progress = 100;
  percent.textContent = progress;
  bar.style.width = `${progress}%`;
  if (progress === 100) {
    clearInterval(loaderTimer);
    setTimeout(() => {
      document.getElementById('loader').classList.add('hidden');
      body.classList.remove('loading');
    }, 520);
  }
}, 80);

const themeToggle = document.getElementById('themeToggle');
const storedTheme = localStorage.getItem('portfolio-theme');
if (storedTheme) document.documentElement.setAttribute('data-theme', storedTheme);
themeToggle.addEventListener('click', () => {
  const nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', nextTheme);
  localStorage.setItem('portfolio-theme', nextTheme);
});

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { navLinks.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); }));
document.getElementById('year').textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
  });
}, { threshold: 0.14 });
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

const canHover = window.matchMedia('(hover: hover)').matches;
if (canHover) {
  document.querySelectorAll('.tilt').forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left; const y = event.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 9;
      const rotateX = -((y / rect.height) - 0.5) * 9;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateY(0)'; });
  });
}

const galleryModal = document.getElementById('galleryModal');
const galleryKicker = document.getElementById('galleryKicker');
const galleryTitle = document.getElementById('galleryTitle');
const galleryDescription = document.getElementById('galleryDescription');
const galleryStage = document.getElementById('galleryStage');
const galleryThumbs = document.getElementById('galleryThumbs');
let currentGallery = null;
let currentIndex = 0;
function renderGalleryItem(index) {
  if (!currentGallery) return;
  currentIndex = index;
  const asset = currentGallery.assets[index];
  galleryStage.innerHTML = '';
  if (asset.type === 'pdf') {
    const pdf = document.createElement('div');
    pdf.className = 'pdf-card';
    pdf.innerHTML = `<h3>${asset.label}</h3><p>Open the project presentation PDF in a new tab.</p><a href="${asset.src}" target="_blank" rel="noreferrer">Open PDF</a>`;
    galleryStage.appendChild(pdf);
  } else {
    const img = document.createElement('img');
    img.src = asset.src;
    img.alt = asset.label;
    galleryStage.appendChild(img);
  }
  galleryThumbs.querySelectorAll('button').forEach((btn, i) => btn.classList.toggle('active', i === index));
}
function openGallery(key) {
  currentGallery = galleries[key];
  if (!currentGallery) return;
  galleryKicker.textContent = currentGallery.kicker;
  galleryTitle.textContent = currentGallery.title;
  galleryDescription.textContent = currentGallery.description;
  galleryThumbs.innerHTML = '';
  currentGallery.assets.forEach((asset, index) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('aria-label', `Open ${asset.label}`);
    if (asset.type === 'pdf') btn.innerHTML = '<span class="pdf-thumb">PDF</span>';
    else btn.innerHTML = `<img src="${asset.src}" alt="${asset.label} thumbnail" />`;
    btn.addEventListener('click', () => renderGalleryItem(index));
    galleryThumbs.appendChild(btn);
  });
  galleryModal.classList.add('open');
  galleryModal.setAttribute('aria-hidden', 'false');
  body.classList.add('loading');
  renderGalleryItem(0);
}
function closeGallery() {
  galleryModal.classList.remove('open');
  galleryModal.setAttribute('aria-hidden', 'true');
  body.classList.remove('loading');
  currentGallery = null;
}
document.querySelectorAll('[data-open-gallery]').forEach((button) => button.addEventListener('click', () => openGallery(button.dataset.openGallery)));
document.querySelectorAll('[data-close-gallery]').forEach((button) => button.addEventListener('click', closeGallery));
document.addEventListener('keydown', (event) => {
  if (!currentGallery) return;
  if (event.key === 'Escape') closeGallery();
  if (event.key === 'ArrowRight') renderGalleryItem((currentIndex + 1) % currentGallery.assets.length);
  if (event.key === 'ArrowLeft') renderGalleryItem((currentIndex - 1 + currentGallery.assets.length) % currentGallery.assets.length);
});

if (window.emailjs) window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
contactForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  formStatus.className = 'form-status';
  formStatus.textContent = 'Sending message...';
  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const subject = formData.get('subject');
  const message = formData.get('message');
  const templateParams = { name, user_name:name, from_name:name, email, user_email:email, from_email:email, reply_to:email, title:subject, subject, message, user_message:message, to_name:'Shrichackran K M', to_email:'shrichackran@gmail.com', time:new Date().toLocaleString() };
  try {
    if (!window.emailjs) throw new Error('EmailJS SDK unavailable');
    await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);
    formStatus.textContent = 'Message sent successfully. I will get back to you soon.';
    formStatus.classList.add('success');
    contactForm.reset();
  } catch (error) {
    formStatus.textContent = 'Message could not be sent. Please email me directly at shrichackran@gmail.com.';
    formStatus.classList.add('error');
    console.error(error);
  }
});

const canvas = document.getElementById('space-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
renderer.setSize(window.innerWidth, window.innerHeight);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 9;
scene.add(new THREE.AmbientLight(0xffffff, 0.72));
const keyLight = new THREE.PointLight(0x55d6ff, 24, 40); keyLight.position.set(3,5,7); scene.add(keyLight);
const violetLight = new THREE.PointLight(0x9d7cff, 18, 36); violetLight.position.set(-4,-2,4); scene.add(violetLight);
const group = new THREE.Group(); scene.add(group);
const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.75, 1), new THREE.MeshStandardMaterial({ color:0x55d6ff, emissive:0x102a55, metalness:.36, roughness:.25, wireframe:true })); group.add(core);
const ringMat = new THREE.MeshBasicMaterial({ color:0x9d7cff, transparent:true, opacity:.62 });
const torus = new THREE.Mesh(new THREE.TorusGeometry(2.65,.012,16,120), ringMat); torus.rotation.x = Math.PI/2.6; group.add(torus);
const torusTwo = new THREE.Mesh(new THREE.TorusGeometry(3.35,.01,16,120), new THREE.MeshBasicMaterial({ color:0x38ffc0, transparent:true, opacity:.4 })); torusTwo.rotation.y = Math.PI/2.2; group.add(torusTwo);
const nodeMaterial = new THREE.MeshStandardMaterial({ color:0x9d7cff, emissive:0x281a56, metalness:.2, roughness:.35 });
const nodeCount = window.innerWidth < 760 ? 8 : 14;
for (let i=0;i<nodeCount;i+=1){ const angle=(i/nodeCount)*Math.PI*2; const radius=3.1+(i%3)*.55; const node=new THREE.Mesh(new THREE.SphereGeometry(.07+(i%2)*.025,16,16),nodeMaterial); node.position.set(Math.cos(angle)*radius,Math.sin(angle*1.7)*.72,Math.sin(angle)*radius*.36); group.add(node); }
const particleCount = window.innerWidth < 760 ? 240 : 720;
const particlePositions = new Float32Array(particleCount*3);
for (let i=0;i<particleCount*3;i+=3){ particlePositions[i]=(Math.random()-.5)*28; particlePositions[i+1]=(Math.random()-.5)*18; particlePositions[i+2]=(Math.random()-.5)*18; }
const particleGeometry = new THREE.BufferGeometry(); particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions,3));
const particles = new THREE.Points(particleGeometry, new THREE.PointsMaterial({ color:0x9dbdff, size:.018, transparent:true, opacity:.75 })); scene.add(particles);
let mouseX=0, mouseY=0;
window.addEventListener('pointermove', (event)=>{ mouseX=(event.clientX/window.innerWidth-.5)*2; mouseY=(event.clientY/window.innerHeight-.5)*2; });
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function animate(){ if(!prefersReduced){ group.rotation.y+=.0035; group.rotation.x+=.0012; torus.rotation.z+=.003; torusTwo.rotation.x+=.002; particles.rotation.y+=.0009; camera.position.x+=(mouseX*.65-camera.position.x)*.035; camera.position.y+=(-mouseY*.45-camera.position.y)*.035; camera.lookAt(0,0,0); } renderer.render(scene,camera); requestAnimationFrame(animate); }
animate();
window.addEventListener('resize',()=>{ camera.aspect=window.innerWidth/window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth,window.innerHeight); });



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