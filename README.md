# Portfolio Website

A modern, professional portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features a premium design with smooth animations, dark mode support, and easy content management.

## Features

- **Modern Premium Design**: Clean, professional UI with smooth animations
- **Dark Mode Support**: Toggle between light and dark themes
- **Easy Content Management**: All content separated in `data/content.ts`
- **Multiple Project Images**: Carousel with navigation for project screenshots
- **Responsive Design**: Works perfectly on all devices
- **Contact Form**: Powered by Resend API
- **SEO Optimized**: Built with Next.js for optimal performance

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd mern-portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your Resend API key:
```
RESEND_API_KEY=your_resend_api_key_here
CONTACT_EMAIL=your_email@example.com
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Content Management

All portfolio content is managed in `data/content.ts`. Simply edit this file to update:

- Personal information (name, role, description)
- Social links (GitHub, LinkedIn, Email)
- About section and skills
- Work experience
- Featured projects
- Other projects
- Contact information

### Adding New Projects

1. Create a folder in `public/projects/[project-name]/`
2. Add your project screenshots to that folder
3. Add project details in `data/content.ts` under `featuredProjects`:

```typescript
{
  title: "Your Project Name",
  description: "Project description...",
  technologies: ["React", "Next.js", "TypeScript"],
  github: "https://github.com/yourusername/project",
  external: "https://your-project-url.com",
  images: [
    "screenshot-1.png",
    "screenshot-2.png",
    // Add more images as needed
  ],
}
```

### Using External Images

You can also use external image URLs (e.g., from Unsplash) instead of local files:

```typescript
images: [
  "https://images.unsplash.com/photo-xxx?w=800&h=450&fit=crop",
  // More URLs...
]
```

## Deployment

### Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `RESEND_API_KEY`: Your Resend API key
   - `CONTACT_EMAIL`: Your contact email (optional)
4. Deploy!

### Other Platforms

This project can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Render
- AWS Amplify

## Project Structure

```
mern-portfolio/
├── app/
│   ├── api/contact/      # Contact form API route
│   ├── globals.css       # Global styles and theme
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/
│   ├── portfolio/        # Portfolio components
│   │   ├── about.tsx
│   │   ├── contact.tsx
│   │   ├── experience.tsx
│   │   ├── footer.tsx
│   │   ├── hero.tsx
│   │   ├── navbar.tsx
│   │   ├── projects.tsx
│   │   └── social-sidebar.tsx
│   └── ui/               # Reusable UI components
├── data/
│   └── content.ts        # All portfolio content
├── lib/
│   ├── constants.ts      # (Legacy - use data/content.ts)
│   └── utils.ts          # Utility functions
├── public/
│   ├── projects/         # Project images
│   │   ├── arktastic/
│   │   └── expense-tracker/
│   └── resume.pdf        # Your resume
└── package.json
```

## Customization

### Theme Colors

Edit the color variables in `app/globals.css` to customize the theme:

```css
:root {
  --primary: oklch(0.58 0.22 190);
  --background: oklch(0.99 0.001 240);
  /* ... other colors */
}
```

### Fonts

The project uses Geist Sans and Geist Mono fonts. You can change these in `app/globals.css`.

## Technologies Used

- **Next.js 16**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS 4**: Utility-first CSS framework
- **Framer Motion**: Smooth animations
- **Radix UI**: Accessible UI components
- **Resend**: Email service for contact form
- **Lucide React**: Icon library

## License

MIT License - feel free to use this for your own portfolio!

## Support

If you have any questions or need help, feel free to open an issue or contact me.

