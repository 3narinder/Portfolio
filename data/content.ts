// ============================================
// PORTFOLIO CONTENT FILE
// ============================================
// This file contains all the content for your portfolio.
// Update this file to change the content without touching the code.
// ============================================

// Type definitions
export interface Project {
  title: string;
  description: string;
  technologies: string[];
  github: string;
  external: string;
  images: string[];
  folder?: string; // Folder name in public/projects/
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
      title: "Arktastic E-commerce Platform",
      description:
        "A full-featured e-commerce platform with Multi-vendor support, product management, shopping cart, user authentication, and Stripe payment integration. Includes admin dashboard for inventory management and order tracking.",
      technologies: [
        "next.js",
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
        "ark-1.png",
        "ark-2.png",
        "ark-3.png",
        "ark-4.png",
        "ark-5.png",
        "ark-6.png",
      ],
    },
    {
      title: "ExpenseAI Expense Tracker",
      description:
        "An AI-powered personal finance app for tracking income and expenses, managing multi-currency accounts, and setting weekly/monthly/quarterly budgets per category. Includes AI-generated monthly summaries with a financial health score, personalized savings tips via Groq (Llama), transaction search/filtering with bulk delete and CSV export, and a full analytics dashboard with spending trends and category breakdowns.",
      technologies: [
        "React",
        "Vite",
        "Node.js",
        "Express",
        "Tailwind CSS",
        "MongoDB",
        "Mongoose",
        "JWT",
        "Groq SDK",
        "TanStack Query",
        "Recharts",
      ],
      github: "https://github.com/3narinder/expense-tracker",
      external: "https://expense-tracker-ten-amber-28.vercel.app",
      folder: "expense-tracker",
      images: [
        "exp-1.png",
        "exp-2.png",
        "exp-3.png",
        "exp-4.png",
        "exp-5.png",
        "exp-6.png",
        "exp-7.png",
        "exp-8.png",
        "exp-9.png",
        "exp-10.png",
        "exp-11.png",
        "exp-12.png",
        "exp-13.png",
      ],
    },
  ] as Project[],

  // ============================================
  // OTHER PROJECTS (OPTIONAL)
  // ============================================
  // Uncomment and add projects to show smaller projects
  // ============================================
  otherProjects: [] as Project[],
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
export const contact = portfolioContent.contact;
