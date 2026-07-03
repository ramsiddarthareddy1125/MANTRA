# MANTRA 2026 Summer School Assignment 1: Nomad Horizon Travels

This project is a premium static website designed and developed for **MANTRA 2026 Summer School Assignment 1: Frontend Website Design, SEO, Responsiveness & Netlify Hosting**.

---

## 📝 Student Submission Details
- **Student Name**: `[Your Name]`
- **Registration / Roll Number**: `[Your Roll Number]`
- **Selected Website Topic**: **Travel Website**
- **Submission Date**: 2nd July 2026
- **Netlify Live URL**: `[Your Live Netlify URL after deployment]`
- **GitHub Repository**: `[Your GitHub Repository Link]`

---

## ✈️ Website Overview & Design Concept
**Nomad Horizon Travels** is a boutique travel agency website specializing in slow travel and tailored expeditions. The user experience is crafted to feel luxury, featuring:
- **Elegant Typography**: Headings in luxurious *Playfair Display* serif, and body text in clean, modern *Plus Jakarta Sans* geometric sans-serif.
- **Consistent Color Theme**: Deep slate blue (`#0F172A`) for depth, warm golden amber (`#D97706`) for sunset accents, and warm off-whites (`#FCFBF7` & `#F8FAFC`) for readability.
- **Micro-Animations & Transitions**: Delicate fade-in-up animations, button translations, card lifts, and image hover-zooms.
- **No Third-Party Asset Dependencies**: Custom SVGs are embedded inline for all icons (pins, compasses, social badges, etc.) to ensure instant page load speeds and complete offline compatibility.

---

## 📂 Project Directory Structure
```
hotels/
├── index.html          # Home Page (Hero, welcome story, highlights, and reviews slider)
├── about.html          # About Page (Narrative, core values, expert guides, FAQ accordion)
├── destinations.html   # Destinations Page (Curated expeditions, client-side category filters)
├── gallery.html        # Gallery Page (Grid view of visuals with Lightbox modal popup)
├── booking.html        # Booking & Contact Page (Contact form, maps, custom JS validator)
├── README.md           # Documentation guide
├── css/
│   └── style.css       # Core design system, variables, layouts, and media queries
├── js/
│   └── main.js         # JavaScript interactivity features
└── assets/             # Curated travel photography
    ├── hero.jpg        # Tropical sunset hero
    ├── kyoto.jpg       # Kyoto temple pagoda
    ├── santorini.jpg   # Santorini blue dome churches
    ├── alps.jpg        # Swiss Alps valleys
    ├── borabora.jpg    # Bora Bora overwater bungalows
    └── amalfi.jpg      # Positano cliffside houses
```

---

## ⚡ Interactive JavaScript Features
The project implements six functional JavaScript components within [js/main.js](js/main.js):
1. **Responsive Navbar Menu Drawer**: Toggles a drawer navigation overlay on mobile screens, and updates the header color dynamically when the user scrolls down.
2. **Auto-Rotating Testimonial Carousel** (Home Page): A smooth auto-scrolling testimonial slider with manual indicator dot controllers.
3. **FAQ Accordion** (About Page): Expandable/collapsible FAQ cards that animate height dynamically upon click.
4. **Dynamic Expedition Filters** (Destinations Page): Filters tour cards (All, Culture, Luxury, Adventure) client-side using DOM manipulation based on data attributes.
5. **Visual Lightbox Viewer** (Gallery Page): Clicking a gallery image displays a dark glassmorphism modal showing the image at full size with captions and escape-key dismissal.
6. **Booking Date Boundary & Email Validator** (Booking Page):
   - Sets the minimum departure date dynamically to the current calendar date.
   - Validates email formats using Regular Expressions.
   - Validates character count on names and traveler counts.
   - Shows a customized inquiry summary confirmation modal popup upon validation, preventing page reload.
   - Supports pre-populating the package select drop-down based on search parameters (e.g. `booking.html?package=kyoto`).

---

## 🔍 SEO Compliance Checklist
The project has been fully configured for basic Search Engine Optimization (SEO):
- [x] **Page Titles**: Unique, descriptive titles matching keywords on every page.
- [x] **Meta Descriptions & Keywords**: Fully customized metadata describing the content and context of each specific page.
- [x] **Heading Hierarchy**: Exactly one single `<h1>` tag per page for main branding, with section structures built using `<h2>` and `<h3>`.
- [x] **Accessibility Alt Texts**: Explicit, meaningful descriptive texts on all images for screen-reader compatibility.
- [x] **Internal Linking**: Seamless navigation links that point correctly using clean file names (`index.html`, `about.html`, etc.).

---

## 🌐 How to Deploy to Netlify
To publish this website online:

### Option 1: Drag & Drop (Easiest)
1. Navigate to [Netlify App](https://app.netlify.com/).
2. Log in or sign up for a free account.
3. Zip the project workspace folder (`hotels/`) OR open the Netlify Dashboard.
4. Go to **Sites** and scroll down to the drag-and-drop zone.
5. Drag the entire project folder (containing the HTML files, `css/`, `js/`, and `assets/` folders) directly into the browser.
6. Your site is instantly live! Copy the generated Netlify link and paste it into your submission report.

### Option 2: Continuous Deployment via GitHub
1. Create a new repository on your GitHub account (e.g., `MANTRA-2026-Travel`).
2. Initialize git locally in the `hotels/` folder, commit all files, and push them to your repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Nomad Horizon Travels website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/MANTRA-2026-Travel.git
   git push -u origin main
   ```
3. Log in to Netlify, click **Add new site**, and select **Import an existing project**.
4. Choose **GitHub**, authenticate your account, and select the repository.
5. Leave build settings blank (since this is a static site with no compiler), and click **Deploy Site**.
6. Netlify will publish your site and automatically re-deploy every time you push edits to GitHub.
