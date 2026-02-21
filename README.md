# Nagomi Stay Osaka (Astro Site)

This is a static website for the Nagomi Stay Osaka Airbnb listing, generated using [Astro](https://astro.build). Designed specifically to be lightweight, SEO-friendly, and to provide detailed AI-Overview (AIO) data using structured JSON-LD.

## Project Structure

```
├── public/                 # Static assets (images, robots.txt)
│   ├── photos/             # Place your full-size photos here
│   │   ├── 00_Hero/        # (e.g., Hero_01.jpg)
│   │   ├── 02_Living/      # (e.g., Living_01.jpg)
│   │   └── ...
│   └── robots.txt
├── src/
│   ├── components/         # Reusable Astro components (Header, Footer, CTA)
│   ├── layouts/            # Global layouts including SEO meta tags
│   ├── pages/              # Site pages (index, rooms, amenities, access, rules-faq, facts)
│   └── styles/             # Global CSS variables
├── astro.config.mjs        # Astro configuration with sitemap integration
├── package.json            # Node.js dependencies
└── README.md               # This documentation
```

## Adding Photos

To display real photos on the website, simply copy your Drive folders into the `public/photos/` directory:
- `public/photos/00_Hero/Hero_01.jpg`
- `public/photos/02_Living/Living_01.jpg`
- `public/photos/03_Bedroom1/Bedroom1_01.jpg`
- `public/photos/04_Bedroom2/Bedroom2_01.jpg`

*Note: If a photo is missing, the site will still build successfully and display a gray placeholder.*

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Cloudflare Pages Deployment Guide

This project is configured to deploy for **free** on Cloudflare Pages. It generates a pure static site (SSG) with no server-side rendering or database requirements.

### Steps to Deploy:

1. **Push to GitHub**
   Create a new GitHub repository and push this code to the `main` branch.

2. **Connect Cloudflare Pages**
   - Log into your [Cloudflare Dashboard](https://dash.cloudflare.com/).
   - Go to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
   - Select your newly created GitHub repository.

3. **Configure Build Settings**
   Use the following exact settings in the "Set up builds and deployments" section:
   - **Framework preset**: `Astro`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   
   *(Cloudflare Pages will automatically detect the `.node-version` file and use Node.js v22 for building.)*

4. **Deploy Options**
   - Click **Save and Deploy**.
   - Cloudflare will build your site and provide a `.pages.dev` URL.
   
*Note: If you connect a custom domain later, update the `site` property inside `astro.config.mjs` to match the new domain to keep `sitemap.xml` fully accurate.*
