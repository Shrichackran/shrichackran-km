# Shrichackran K M — Static Portfolio

A production-ready personal portfolio website built with **HTML, CSS, and vanilla JavaScript**. It is designed for GitHub Pages deployment and recruiter-friendly scanning.

## What is included

- Semantic HTML structure: `header`, `nav`, `main`, `section`, `footer`
- Responsive clean layout for mobile, tablet, and desktop
- Light/dark mode toggle with local storage
- Recruiter-friendly project, skills, experience, education, and contact sections
- Project asset gallery modal
- EmailJS contact form integration
- Downloadable resume PDF
- SEO basics: meta title, description, Open Graph tags, favicon

## Folder structure

```text
.
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── img/
│   │   ├── favicon.svg
│   │   ├── og-card.svg
│   │   └── profile.png
│   ├── projects/
│   │   ├── store-intelligence/
│   │   ├── lifelink/
│   │   ├── speech/
│   │   └── jobbzz/
│   └── resume/
│       └── Shrichackran_KM_Resume.pdf
└── README.md
```

## Run locally

Because this is a static site, you can open `index.html` directly in your browser.

Recommended local server:

```bash
python -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

## EmailJS setup

The contact form is already wired in `js/script.js` with:

```js
service_ktcd4zp
template_yh79qbj
x2P2JRv4AFlRKMJ8i
```

In your EmailJS template, use any of these variables:

```text
{{name}}
{{user_name}}
{{from_name}}
{{email}}
{{user_email}}
{{from_email}}
{{reply_to}}
{{title}}
{{subject}}
{{message}}
{{user_message}}
{{to_name}}
{{time}}
```

Recommended template body:

```text
New portfolio message

Name: {{name}}
Email: {{reply_to}}
Subject: {{title}}

Message:
{{message}}

Sent at: {{time}}
```

Make sure your EmailJS template recipient is your correct inbox.

## Deploy on GitHub Pages

1. Create a new GitHub repository.
2. Upload all files from this folder to the repository root.
3. Commit the files.
4. Go to repository **Settings**.
5. Open **Pages**.
6. Under **Build and deployment**, choose:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
7. Save.
8. Wait for GitHub Pages to publish the site.
9. Open the generated GitHub Pages URL.

## Update resume

Replace this file:

```text
assets/resume/Shrichackran_KM_Resume.pdf
```

Keep the same filename so the resume download button continues to work.

## Notes

- Exact certification details were not added because the uploaded resume did not include a certification title/date.
- Live demo links were only included where clearly available.
