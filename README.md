# Synapse.core - AI Developer Portfolio Website

A world-class, futuristic, premium developer portfolio website designed for a Computer Science Engineering (CSE) student specializing in AI Development, Full-Stack SaaS, Operations Automation, and Growth Marketing. 

Designed with high-end SaaS aesthetics inspired by Vercel, Linear, Stripe, and OpenAI, this website features immersive WebGL 3D effects, interactive nodes networks, and deep developer modes.

---

## 🚀 Tech Stack

- **Core Framework:** Next.js 15+ (App Router)
- **Programming Language:** TypeScript
- **Styling:** Tailwind CSS v4 & Vanilla CSS Custom Animations
- **2D/3D Animations:** Framer Motion, GSAP, Three.js, React Three Fiber (R3F), `@react-three/drei`
- **Iconography:** Lucide React
- **Smooth Scroll:** Lenis

---

## 🛠️ Folder Structure

```
src/
├── app/                  # App Router paths
│   ├── layout.tsx        # Global html template
│   ├── page.tsx          # Initial loading screens & dashboard sections
│   ├── about/            # Redirection path
│   ├── projects/         # Standing project management dashboard
│   ├── skills/           # Redirection path
│   ├── services/         # Redirection path
│   ├── achievements/     # Redirection path
│   ├── blog/             # Standalone article list & readers
│   ├── contact/          # Redirection path
│   ├── resume/           # Interactive printable CV layout
│   ├── sitemap.ts        # Dynamic sitemaps
│   └── robots.ts         # Robots crawler permissions
│
├── components/           
│   ├── layout/           # Sticky Navbar, Footer, MobileMenu drawer
│   ├── sections/         # Hero, About, Skills, Projects, Experience, Services, Achievements, Testimonials, Blog, Contact
│   ├── ui/               # Reusable Button, Card, Modal, Input, Badge
│   ├── effects/          # NeuralNetwork canvas, FloatingOrb, AICursor, ScrollBeam, DataStreams code matrix
│   └── three/            # WebGL TechSphere, Scene, CanvasWrapper SSR loader
│
├── data/                 # Decoupled mock database arrays
├── hooks/                # Mouse tracker, Scroll metrics, Magnetic pulls hooks
├── lib/                  # Centralized Framer presets, tailwind merger cn(), SEO defaults
├── types/                # Strict TypeScript interface declarations
└── styles/               # Consolidated CSS keyframes, utilities, and Tailwind imports
```

---

## 💻 Installation & Local Development

### 1. Clone & Setup Directory
Initialize or clone the repository and navigate into it:
```bash
git clone <your-repository-url>
cd "my future"
```

### 2. Install Packages
Use npm to download dependencies (with legacy-peer-deps to support React 19/Next 15 combinations):
```bash
npm install --legacy-peer-deps
```

### 3. Setup Environment File
Create a `.env.local` file by copying the example template:
```bash
cp .env.example .env.local
```
Fill out the variables with your website URL, contact paths, and optionally your EmailJS credentials to route the contact form:
```env
NEXT_PUBLIC_SITE_URL=https://your-domain.dev
NEXT_PUBLIC_GITHUB=https://github.com/your-username
NEXT_PUBLIC_LINKEDIN=https://linkedin.com/in/your-username
NEXT_PUBLIC_EMAIL=your-email@gmail.com

# EmailJS credentials (to receive contact form emails at mrdineshcse@gmail.com)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### 4. Run Development Server
Boot the server locally:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the interface.

---

## ⚡ Interactive Controls & Developer Mode

This portfolio includes advanced keystroke controls:
- **`CTRL + K`** or **`CTRL + SHIFT + D`**: Opens the floating **Developer Terminal**.
- **Interactive Terminal Commands**:
  - `help`     - View operations index list.
  - `about`    - Output narrative biography.
  - `skills`   - Print ASCII grid skills planet coordinates.
  - `projects` - Print list of repository paths.
  - `contact`  - Print active communication uplinks.
  - `resume`   - Output operational CV milestones.
  - `clear`    - Clear terminal logs.
  - `exit`     - Shut down secure terminal window.
- **`window.print()`**: Clicking "Print / Save PDF" on the `/resume` route automatically activates CSS media print overrides to render a clean, standard black-and-white CV grid, perfect for physical resume handouts.

---

## 🌐 Production Build & Deployment

### Build Verification
Verify compiling correctness locally:
```bash
npm run build
```

### Deploying to Vercel
Push your code to GitHub and import it on Vercel:
1. Connect your repository to Vercel.
2. In the project settings, add the environment variables defined in `.env.example`.
3. Vercel automatically detects Next.js configurations, installs packages, and deploys the production bundle.
