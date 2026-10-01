// ============================================
// PORTFOLIO CONTENT FILE
// ============================================
// This file contains all the content for your portfolio.
// Update this file to change the content without touching the code.
// ============================================

// Type definitions
export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  role: string;
  year: string;
  category: string;
  technologies: string[];
  github: string;
  external: string;
  images: string[];
  folder?: string; // Folder name in public/projects/
  video?: string; // Optional short looping preview (mp4/webm) in public/projects/[folder]/
  status?: "completed" | "ongoing" | "planned";
  progress?: number; // 0-100 for ongoing projects
  metrics?: ProjectMetric[];
  caseStudy?: {
    problem?: string;
    contribution?: string;
    approach?: string;
    outcome?: string;
    architecture?: string[];
  };
}

export interface SkillGroup {
  title: string;
  description: string;
  skills: string[];
}

export interface OpenSourceItem {
  title: string;
  description: string;
  href: string;
  tags: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
  technologies: string[];
}

export const portfolioContent = {
  // ============================================
  // PERSONAL INFORMATION
  // ============================================
  personal: {
    name: "Narinder Kumar",
    role: "Full-Stack Developer",
    description: "I build things for the web.",
    headline: "I build fast, accessible web products — from polished React interfaces to the Node APIs behind them.",
    availability: "Available for new opportunities",
    roleDescription:
      "I'm a full-stack developer specializing in the MERN stack. Currently focused on building accessible, performant web applications that solve real-world problems.",
  },

  // ============================================
  // SOCIAL LINKS
  // ============================================
  social: {
    github: "https://github.com/3narinder",
    linkedin: "https://www.linkedin.com/in/narinder-kumar-3216a9153/",
    email: "mailto:narinderd9@gmail.com",
  },

  // ============================================
  // ABOUT SECTION
  // ============================================
  about: {
    description:
      "Hello! I'm Narinder, a passionate full-stack developer based in San Francisco. I enjoy creating things that live on the internet, whether that be websites, applications, or anything in between.",
    journey:
      "My journey into web development started back in 2018 when I decided to try building custom websites — turns out hacking together a custom blog taught me a lot about HTML, CSS, and JavaScript.",
    fastForward:
      "Fast-forward to today, and I've had the privilege of working at a start-up, a large corporation, and as a freelancer. My main focus these days is building accessible, inclusive products and digital experiences using the MERN stack.",
    skills: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
      "JavaScript",
      "Redux",
      "Tanstack Query",
      "Node.js",
      "MongoDB",
      "Express.js",
      "GraphQL",
      "Git",
    ],
    skillGroups: [
      {
        title: "Frontend",
        description: "Interfaces that feel fast and stay accessible.",
        skills: ["React", "Next.js", "TypeScript", "JavaScript", "Redux", "TanStack Query", "Tailwind CSS"],
      },
      {
        title: "Backend",
        description: "Typed, validated APIs with clean data models.",
        skills: ["Node.js", "Express.js", "MongoDB", "Mongoose", "GraphQL", "REST APIs"],
      },
      {
        title: "Quality & Delivery",
        description: "Shipping with confidence, not hope.",
        skills: ["Vitest", "Supertest", "Git", "Vite", "Vercel", "Render"],
      },
    ] as SkillGroup[],
  },

  // ============================================
  // WORK EXPERIENCE
  // ============================================
  experiences: [
    {
      company: "Creative I Technology",
      role: "Frontend Developer (MERN)",
      period: "09/2024 – 03/2025",
      description: [
        "Designed, developed, and deployed interactive, responsive full-stack web applications using MERN Stack (MongoDB, Express.js, React.js, Next.js), achieving fast load times and full scalability across all devices.",
        "Architected and implemented microservices infrastructure with MongoDB and Express, improving system scalability by 40%",
        "Collaborated with clients and cross-functional teams to deliver custom MERN solutions and reusable component libraries for diverse projects.",
        "Optimized application performance, code quality, and UI/UX while implementing modern responsive designs and best development practices",
      ],
      technologies: [
        "React",
        "Next.js",
        "Node.js",
        "Redux",
        "React Query",
        "MongoDB",
        "TypeScript",
        "Tailwind CSS",
      ],
    },
    {
      company: "Digimantra Labs",
      role: "React.js Developer",
      period: "04/2024 – 09/2024",
      description: [
        "Built scalable React.js applications with Redux for state management and Styled Components for clean, modular interfaces.",
        "Collaborated on new feature development, troubleshooting, and improvements to ensure a seamless user experience.",
        "Implemented responsive designs, reduced load times, and took part in code reviews to maintain high standards.",
      ],
      technologies: [
        "React",
        "Express.js",
        "MongoDB",
        "Redux",
        "GraphQL",
        "Tailwind CSS",
        "Styled Components",
      ],
    },
    {
      company: "ARKTASTIC Pvt. Ltd.",
      role: "Frontend Developer",
      period: "05/2022 – 04/2024",
      description: [
        "Developed responsive web applications using React.js, Redux, and Next.js with MERN stack practices, always prioritizing performance optimization and faster load times.",
        "Integrated email services and managed user communications to boost engagement and improve overall experience.",
        "Partnered with design and backend teams for smooth integration of features and enhancements.",
      ],
      technologies: [
        "JavaScript",
        "TypeScript",
        "Next.js",
        "React",
        "tailwind CSS",
        "Redux",
        "Node.js",
        "Express.js",
        "MongoDB",
        "CSS",
        "HTML",
        "Git",
      ],
    },
    {
      company: "Roombuddy",
      role: "Junior Frontend Developer",
      period: "02/2022 – 05/2022",
      description: [
        "Integrated frontend libraries to speed up development and create reusable components.",
        "Built complex responsive layouts that worked beautifully across different devices and screen sizes.",
        "Applied strong debugging skills to deliver clean, reliable, and user-friendly interfaces.",
      ],
      technologies: ["JavaScript", "React", "CSS", "HTML", "Git"],
    },
  ] as Experience[],

  // ============================================
  // FEATURED PROJECTS
  // ============================================
  // To add a new project:
  // 1. Create a folder in public/projects/[project-name]/
  // 2. Add your images to that folder
  // 3. Add the project details here
  // ============================================
  featuredProjects: [
    {
      slug: "arktastic",
      title: "Arktastic E-commerce Platform",
      tagline: "Multi-vendor commerce with a fast catalog and a real admin.",
      description:
        "A full-featured e-commerce platform with Multi-vendor support, product management, shopping cart, user authentication, and Stripe payment integration. Includes admin dashboard for inventory management and order tracking.",
      role: "Frontend Developer",
      year: "2022 – 2024",
      category: "E-commerce · Client work",
      technologies: [
        "Next.js",
        "React",
        "Node.js",
        "Tailwind CSS",
        "MongoDB",
        "Express",
        "Stripe",
        "Redux",
      ],
      github: "",
      external: "https://www.arktastic.com/",
      folder: "arktastic",
      images: [
        "ark-1.webp",
        "ark-2.webp",
        "ark-3.webp",
        "ark-4.webp",
        "ark-5.webp",
        "ark-6.webp",
      ],
      status: "completed",
      metrics: [
        { value: "35%", label: "faster page loads" },
        { value: "Multi", label: "vendor marketplace" },
        { value: "Stripe", label: "checkout & payments" },
      ],
      caseStudy: {
        problem:
          "The client needed a multi-vendor e-commerce platform with robust admin and inventory management, and fast catalog performance for thousands of SKUs.",
        contribution:
          "Owned the storefront and admin UI: responsive React/Next.js pages, Redux state, email integrations, and close collaboration with design and backend on every feature.",
        approach:
          "Built on Next.js and MongoDB with paginated product APIs, server-side rendering for key pages, and a lightweight React-based admin dashboard. Implemented Stripe for payments and role-based access control for vendors.",
        outcome:
          "Reduced page load times by 35% and enabled seamless vendor onboarding; the platform supported the company's launch with minimal scaling incidents.",
        architecture: [
          "SSR for catalog and product pages, client-side admin",
          "Paginated product APIs backed by MongoDB",
          "Role-based access for vendors and admins",
        ],
      },
    },
    {
      slug: "lead-flow",
      title: "LeadFlow",
      tagline: "A typed, tested lead pipeline for small sales teams.",
      description:
        "A full-stack lead management app for tracking prospects through a sales pipeline — create, search, filter, sort, paginate, and update leads in real time.",
      role: "Full-Stack Developer · Solo",
      year: "2026",
      category: "SaaS · Full-stack",
      technologies: [
        "React 19",
        "TypeScript",
        "TanStack Query",
        "React Hook Form",
        "Tailwind CSS",
        "Node.js",
        "Express",
        "MongoDB",
        "Vitest",
      ],
      github: "https://github.com/3narinder/lead-flow",
      external: "https://lead-flow-sandy-eight.vercel.app/",
      folder: "lead-flow",
      images: ["lead-1.webp", "lead-2.webp", "lead-3.webp", "lead-4.webp"],
      status: "completed",
      metrics: [
        { value: "4", label: "validated REST endpoints" },
        { value: "4", label: "pipeline stages" },
        { value: "0", label: "any types — strict TS" },
      ],
      caseStudy: {
        problem:
          "Small teams track leads in spreadsheets that break down once a pipeline grows: no validation, no shared status, and no fast way to find a contact.",
        contribution:
          "Designed and built the whole product end to end — API, data model, validation, UI, tests, and deployment.",
        approach:
          "A layered Express API (routes → validators → controllers → models) with centralized error handling, and a React client split into UI, hooks, and service layers and TanStack Query managing server state.",
        outcome:
          "A deployed, documented app with server-side search, status filters, sorting, and pagination, covered by a Vitest + Supertest API suite.",
        architecture: [
          "Vercel (client) · Render (API) · MongoDB Atlas",
          "express-validator on every endpoint, AppError + asyncHandler",
          "Vitest + Supertest suite covering CRUD and health checks",
        ],
      },
    },
  ] as Project[],


  // ============================================
  // OTHER PROJECTS (OPTIONAL)
  // ============================================
  // Uncomment and add projects to show smaller projects
  // ============================================
  otherProjects: [] as Project[],

  // ============================================
  // OPEN SOURCE & NOTES
  // ============================================
  openSource: [
    {
      title: "LeadFlow API Guide",
      description:
        "Request/response contracts, validation rules, and architecture notes for the LeadFlow REST API.",
      href: "https://github.com/3narinder/lead-flow/blob/main/API_Guide.md",
      tags: ["Docs", "REST", "Express"],
    },
    {
      title: "DSA-js",
      description:
        "Data structures and algorithms in JavaScript — fundamentals, complexity, arrays, linked lists, and NeetCode 150 solutions.",
      href: "https://github.com/3narinder/DSA-js",
      tags: ["JavaScript", "Algorithms"],
    },
    {
      title: "todo-mobile",
      description:
        "A cross-platform task app built with Expo and React Native using file-based routing.",
      href: "https://github.com/3narinder/todo-mobile",
      tags: ["Expo", "React Native", "TypeScript"],
    },
  ] as OpenSourceItem[],
  // Example projects (uncomment to use):
  // {
  //   title: "Weather App",
  //   description:
  //     "A weather application with location-based forecasts, 7-day predictions, and interactive maps.",
  //   technologies: ["React", "OpenWeather API", "Mapbox"],
  //   github: "https://github.com",
  //   external: "https://example.com",
  // },

  // ============================================
  // CONTACT SECTION
  // ============================================
  contact: {
    email: "narinderd9@gmail.com",
    // This email will receive contact form messages
    // Make sure to set CONTACT_EMAIL in your environment variables
  },
};

// Export individual sections for convenience
export const personal = portfolioContent.personal;
export const social = portfolioContent.social;
export const about = portfolioContent.about;
export const experiences = portfolioContent.experiences;
export const featuredProjects = portfolioContent.featuredProjects;
export const otherProjects = portfolioContent.otherProjects;
export const openSource = portfolioContent.openSource;
export const contact = portfolioContent.contact;
