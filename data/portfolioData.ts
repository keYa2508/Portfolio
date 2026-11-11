export interface Project {
  id: string;
  title: string;
  category: "Trading & Real-Time" | "Enterprise & ERP" | "Mobile (React Native)" | "AI & RAG";
  role: string;
  period: string;
  description: string;
  highlight: string;
  tags: string[];
  features: string[];
  architecture: string[];
  metrics: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  type: string;
  description: string;
  achievements: string[];
  technologies: string[];
  featuredProject?: string;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: { name: string; level: number; featured?: boolean; tag: string }[];
}

export const personalInfo = {
  name: "Karthikeyan Manikandan",
  shortName: "Karthik",
  title: "Full Stack & Mobile Developer",
  roleSubtitle: "Specializing in High-Performance Web, React Native Apps & Real-Time Trading Engines",
  bio: "Full Stack Developer with 3+ years of experience in developing responsive web and cross-platform mobile applications using React.js, React Native, JavaScript, TypeScript, and Next.js. Experienced in building enterprise ERP systems, marketing automation platforms, Indian stock trading applications, cryptocurrency trading platforms, and school management solutions.",
  extendedBio: "Skilled in REST API integration, Redux Toolkit, state management, Socket.IO, real-time data communication, third-party API integrations, and application performance optimization. Familiar with backend technologies, databases, and AI-powered applications using Retrieval-Augmented Generation (RAG). Focused on building scalable, maintainable, and user-friendly software solutions.",
  email: "karthi25082000@gmail.com",
  phone: "+918072647772",
  phoneFormatted: "+91 80726 47772",
  location: "Chennai, Tamil Nadu, India",
  github: "https://github.com/keYa2508",
  livePortfolio: "https://karthikeyan-manikandan.vercel.app",
  status: "Available for Full-time Roles & High-Impact Projects",
  yearsExperience: "3+",
  shippedProjectsCount: "4+",
  keyDomains: ["Fintech & Trading", "Enterprise ERP", "Cross-Platform Mobile", "AI RAG Chatbots"],
};

export const stats = [
  { label: "Years Experience", value: "3+", subtext: "Full Stack & Mobile" },
  { label: "Production Platforms", value: "4+", subtext: "Fintech, ERP & Mobile" },
  { label: "Real-Time Events", value: "100k+", subtext: "Socket.IO & WebSockets" },
  { label: "API Integrations", value: "15+", subtext: "Payment, Ads, CRM & AI" },
];

export const projectsData: Project[] = [
  {
    id: "crypto-trading-app",
    title: "Cryptocurrency Trading Platform",
    category: "Trading & Real-Time",
    role: "Mobile App Developer @ Pibase Solutions",
    period: "Nov 2023 – Jul 2024",
    description:
      "A high-frequency cross-platform cryptocurrency trading mobile application built with React Native. Engineered for low-latency market updates, real-time order books, and dynamic white-label multi-tenant branding.",
    highlight: "Low-latency market streaming with Socket.IO & sub-second order book updates",
    tags: ["React Native", "Socket.IO", "Redux Thunk", "Mitt Event Bus", "Context API", "REST APIs"],
    features: [
      "Real-time ticker and order book streaming using WebSocket & Socket.IO",
      "Event-driven architecture with Mitt Event Bus for decoupled cross-component updates",
      "Dynamic white-labeling configurations and customizable multi-tenant themes",
      "Robust offline network connectivity handling and state synchronization",
      "Asynchronous state management with Redux Thunk and Context API",
    ],
    architecture: [
      "React Native Client <-> Socket.IO Client for bidirectional low-latency data stream",
      "Mitt Event Bus for global telemetry and inter-module event propagation",
      "Modular flavor configurations for custom white-label client distribution",
    ],
    metrics: ["100k+ real-time tick events/min", "60 FPS smooth chart animations", "Sub-100ms order feedback"],
    liveUrl: "https://karthikeyan-manikandan.vercel.app",
    githubUrl: "https://github.com/keYa2508",
    featured: true,
  },
  {
    id: "indian-stock-trading",
    title: "Indian Stock Trading Platform",
    category: "Trading & Real-Time",
    role: "Frontend Developer @ Iouring Private Limited",
    period: "Mar 2026 – Sep 2026",
    description:
      "Responsive web and mobile application interfaces for an Indian stock trading platform. Designed for fast trade execution, multi-exchange watchlists, and real-time market data handling with reusable UI components.",
    highlight: "Interactive multi-exchange watchlists and instant trade execution UI",
    tags: ["React.js", "React Native", "TypeScript", "RESTful APIs", "State Management", "Tailwind CSS"],
    features: [
      "Responsive multi-screen interface across mobile and web for stock traders",
      "Real-time stock price streaming, watchlist grouping, and market depth cards",
      "Optimized rendering pipeline to prevent unnecessary re-renders during rapid price fluctuations",
      "Strict type safety and robust API error boundaries using TypeScript",
      "Comprehensive trade review and order submission workflows",
    ],
    architecture: [
      "React.js / React Native with unified component design system",
      "Optimized Virtual DOM reconciliation for high-frequency tick updates",
      "RESTful API endpoints for authenticated portfolio & trade order execution",
    ],
    metrics: ["Sub-50ms render overhead on tick updates", "Zero UI freezing during high volatility", "Unified cross-platform UI"],
    liveUrl: "https://karthikeyan-manikandan.vercel.app",
    githubUrl: "https://github.com/keYa2508",
    featured: true,
  },
  {
    id: "erp-marketing-automation",
    title: "Enterprise ERP & Marketing Automation System",
    category: "Enterprise & ERP",
    role: "Full Stack Developer @ Micromen Software Solutions",
    period: "Aug 2024 – Feb 2026",
    description:
      "Enterprise-grade web and mobile applications enabling live field tracking, automated multi-channel lead acquisition (WhatsApp, Instagram, Meta Ads), integrated VoIP calling, and automated reporting.",
    highlight: "Live field location tracking, in-app VoIP dialer, and Meta Ads & WhatsApp API pipelines",
    tags: ["React.js", "React Native", "ASP.NET", "WhatsApp API", "Meta Ads API", "Instagram API", "Zoom API"],
    features: [
      "Live field agent location tracking with real-time route plotting and geofencing",
      "Built-in in-app dialer with call recording and voice-enabled smart search",
      "Automated lead capture integrating Meta Ads API, Instagram Graph API, and WhatsApp Business API",
      "Two-way email communication, automated push notifications, and Zoom meeting scheduling",
      "Automated high-fidelity PDF and Excel report generation engine",
    ],
    architecture: [
      "Frontend: React.js Web Portal + React Native Field Agent Mobile App",
      "Backend: ASP.NET Core RESTful APIs & Webhook receivers for Meta & WhatsApp",
      "Integrations: Exotel VoIP, WhatsApp Cloud API, Instagram Graph, Zoom API",
    ],
    metrics: ["40% boost in lead response times", "5,000+ daily automated notifications", "100% automated Excel/PDF exports"],
    liveUrl: "https://karthikeyan-manikandan.vercel.app",
    githubUrl: "https://github.com/keYa2508",
    featured: true,
  },
  {
    id: "ai-rag-chatbot",
    title: "AI-Powered RAG Knowledge Chatbot",
    category: "AI & RAG",
    role: "Full Stack AI Engineer",
    period: "2025 – 2026",
    description:
      "Intelligent Retrieval-Augmented Generation (RAG) assistant designed to ingest enterprise documents, perform semantic chunking, and generate precise, hallucination-free answers with vector retrieval.",
    highlight: "Semantic vector retrieval, chunking pipeline & streaming LLM inference",
    tags: ["Python", "FastAPI", "React.js", "RAG", "Embeddings", "Vector Search", "LLM APIs"],
    features: [
      "Document ingestion pipeline handling PDFs, DOCX, and text datasets",
      "Recursive character chunking and high-dimensional semantic embeddings",
      "Fast similarity search using vector index retrieval",
      "Real-time streaming responses with citation source attribution in React.js UI",
      "FastAPI asynchronous backend with robust rate limiting and caching",
    ],
    architecture: [
      "React.js chat frontend with token-by-token streaming UI",
      "FastAPI asynchronous gateway with embedding model pipeline",
      "Vector search engine retrieving top-K semantic context chunks for prompt synthesis",
    ],
    metrics: ["<800ms context retrieval time", "Accurate source attribution", "Zero hallucination guarantee on parsed docs"],
    liveUrl: "https://karthikeyan-manikandan.vercel.app",
    githubUrl: "https://github.com/keYa2508",
    featured: true,
  },
  {
    id: "school-management-system",
    title: "School Management & Digital Learning App",
    category: "Mobile (React Native)",
    role: "Mobile App Developer",
    period: "2024",
    description:
      "Cross-platform React Native school management app featuring student attendance, digital book libraries, examination management, and offline educational material downloads.",
    highlight: "Offline digital learning material cache & comprehensive student tracking",
    tags: ["React Native", "Redux", "React Native FS", "WebView", "Axios", "REST APIs"],
    features: [
      "Student and staff attendance tracking with real-time synchronization",
      "Examination timetables, grade calculation, and report card publishing",
      "In-app digital library with PDF viewer and offline file management using React Native FS",
      "Centralized state management with Redux and Axios request interceptors",
      "Push notifications for school announcements, emergency alerts, and fee reminders",
    ],
    architecture: [
      "React Native mobile client with local filesystem caching (RN-FS)",
      "Secure REST API communication with JWT authentication",
      "Responsive WebView rendering for complex educational posters and documents",
    ],
    metrics: ["Offline document access", "Multi-school multi-role access control", "Instant exam score updates"],
    liveUrl: "https://karthikeyan-manikandan.vercel.app",
    githubUrl: "https://github.com/keYa2508",
    featured: false,
  },
];

export const experienceData: ExperienceItem[] = [
  {
    id: "iouring",
    company: "Iouring Private Limited",
    role: "Frontend Developer",
    location: "Chennai, India",
    period: "Mar 2026 – Sep 2026",
    type: "Full-time",
    description:
      "Developed responsive web and mobile application interfaces for an Indian stock trading platform using React.js and React Native. Engineered low-latency trading features and reusable UI components.",
    achievements: [
      "Developed responsive web and mobile application interfaces for an Indian stock trading platform using React.js and React Native.",
      "Engineered real-time trading features, REST API integrations, and robust state management for low-latency market data handling.",
      "Designed and implemented reusable UI component libraries to deliver a seamless, intuitive trading experience across multiple device viewports.",
      "Optimized rendering cycles to handle high-frequency price feed changes without dropped frames.",
    ],
    technologies: ["React.js", "React Native", "TypeScript", "REST APIs", "Socket.IO", "Tailwind CSS"],
    featuredProject: "indian-stock-trading",
  },
  {
    id: "micromen",
    company: "Micromen Software Solutions Private Limited",
    role: "Full Stack Developer",
    location: "Chennai, India",
    period: "Aug 2024 – Feb 2026",
    type: "Full-time",
    description:
      "Built web and mobile features for an enterprise ERP and marketing management platform using React.js, React Native, and ASP.NET. Handled complex third-party integrations and real-time tracking.",
    achievements: [
      "Implemented live location tracking, an in-app VoIP dialer, call recording, and voice-enabled search for field sales teams.",
      "Integrated Facebook Ads, Instagram Graph API, and WhatsApp Business API for automated lead capture and real-time customer engagement.",
      "Engineered two-way email communication, automated reminders, push notifications, and Zoom meeting scheduling.",
      "Developed automated high-fidelity PDF and Excel report export engines and integrated ASP.NET backend microservices.",
    ],
    technologies: ["React.js", "React Native", "ASP.NET", "WhatsApp API", "Meta Ads API", "Instagram API", "Zoom API", "Exotel"],
    featuredProject: "erp-marketing-automation",
  },
  {
    id: "pibase",
    company: "Pibase Solutions Private Limited",
    role: "Mobile App Developer",
    location: "Chennai, India",
    period: "Nov 2023 – Jul 2024",
    type: "Full-time",
    description:
      "Engineered cryptocurrency trading application features using React Native. Managed real-time socket-stream communication and implemented white-label configurations.",
    achievements: [
      "Developed cryptocurrency trading application features using React Native with sub-second order book updates.",
      "Integrated REST APIs and managed complex asynchronous application state using Redux Thunk and Context API.",
      "Implemented Socket.IO and Mitt Event Bus for real-time market updates and decoupled event-driven data streaming.",
      "Implemented application flavors, white-labeling configurations, customizable themes, and high-performance native bridge integrations.",
    ],
    technologies: ["React Native", "Socket.IO", "Redux Thunk", "Mitt Event Bus", "Context API", "REST APIs"],
    featuredProject: "crypto-trading-app",
  },
  {
    id: "kpost",
    company: "KPOST Software Private Limited",
    role: "React & React Native Intern",
    location: "Chennai, India",
    period: "Jul 2023 – Oct 2023",
    type: "Internship",
    description:
      "Contributed to the development of web and mobile applications using React.js and React Native. Built reusable UI components and gained practical frontend engineering experience.",
    achievements: [
      "Contributed to the development of web and mobile applications using React.js and React Native.",
      "Constructed modular, reusable UI components and integrated RESTful APIs with modern asynchronous patterns.",
      "Participated in frontend debugging, cross-browser compatibility testing, and responsive UI optimization.",
    ],
    technologies: ["React.js", "React Native", "JavaScript (ES6+)", "CSS3", "REST APIs"],
  },
  {
    id: "tata-comm",
    company: "Tata Communications",
    role: "Field Engineer",
    location: "Chennai, India",
    period: "Sep 2022 – Jun 2023",
    type: "Full-time",
    description:
      "Worked as a Network Field Engineer in the ISP team, handling network installation, configuration, troubleshooting, and enterprise network reliability.",
    achievements: [
      "Handled enterprise network installation, configuration, troubleshooting, and preventive maintenance across ISP client sites.",
      "Resolved mission-critical network connectivity issues and hardware support, ensuring high uptime and reliable internet infrastructure.",
      "Developed deep foundational knowledge of TCP/IP networking, routing, and low-latency packet transmission.",
    ],
    technologies: ["Networking", "TCP/IP", "ISP Infrastructure", "Hardware Configuration", "Troubleshooting"],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Development",
    iconName: "Layout",
    skills: [
      { name: "React.js", level: 95, featured: true, tag: "Core" },
      { name: "Next.js", level: 90, featured: true, tag: "SSR & App Router" },
      { name: "TypeScript", level: 92, featured: true, tag: "Type Safety" },
      { name: "JavaScript (ES6+)", level: 95, featured: true, tag: "Language" },
      { name: "Tailwind CSS", level: 94, featured: true, tag: "Styling" },
      { name: "HTML5 / CSS3", level: 95, featured: false, tag: "Markup" },
      { name: "Responsive UI", level: 96, featured: false, tag: "Design" },
      { name: "Redux Toolkit / Thunk", level: 90, featured: true, tag: "State" },
    ],
  },
  {
    title: "Mobile App Development",
    iconName: "Smartphone",
    skills: [
      { name: "React Native", level: 94, featured: true, tag: "Cross-Platform" },
      { name: "React Navigation", level: 92, featured: true, tag: "Routing" },
      { name: "Code Push", level: 85, featured: false, tag: "OTA Updates" },
      { name: "Push Notifications (FCM)", level: 90, featured: true, tag: "Alerts" },
      { name: "Turbo Modules", level: 84, featured: false, tag: "New Arch" },
      { name: "Native Bridging", level: 86, featured: true, tag: "iOS/Android" },
      { name: "React Native FS", level: 88, featured: false, tag: "File Cache" },
      { name: "White-Labeling", level: 92, featured: true, tag: "Theming" },
    ],
  },
  {
    title: "Backend & Databases",
    iconName: "Server",
    skills: [
      { name: "Node.js", level: 88, featured: true, tag: "Runtime" },
      { name: "Express.js", level: 88, featured: true, tag: "REST APIs" },
      { name: "Nest.js", level: 82, featured: false, tag: "Enterprise Backend" },
      { name: "MongoDB", level: 86, featured: true, tag: "NoSQL" },
      { name: "PostgreSQL / SQL", level: 85, featured: true, tag: "Relational DB" },
      { name: "Redis", level: 84, featured: false, tag: "Cache & PubSub" },
      { name: "Python / FastAPI", level: 80, featured: true, tag: "AI Services" },
    ],
  },
  {
    title: "Real-Time & Protocols",
    iconName: "Zap",
    skills: [
      { name: "Socket.IO", level: 95, featured: true, tag: "WebSocket" },
      { name: "WebSocket Protocol", level: 92, featured: true, tag: "Low Latency" },
      { name: "Mitt Event Bus", level: 90, featured: false, tag: "Pub/Sub" },
      { name: "Real-Time Data Streaming", level: 92, featured: true, tag: "Trading Feeds" },
      { name: "RESTful APIs / Axios", level: 95, featured: false, tag: "Networking" },
    ],
  },
  {
    title: "APIs & Third-Party Integrations",
    iconName: "Globe",
    skills: [
      { name: "WhatsApp Business API", level: 90, featured: true, tag: "Messaging" },
      { name: "Meta Ads API", level: 88, featured: true, tag: "Lead Gen" },
      { name: "Instagram Graph API", level: 86, featured: false, tag: "Social" },
      { name: "Zoom Integration", level: 85, featured: false, tag: "Video" },
      { name: "Razorpay Integration", level: 90, featured: true, tag: "Fintech Payments" },
      { name: "Exotel VoIP Integration", level: 85, featured: false, tag: "Telephony" },
      { name: "Firebase API", level: 92, featured: true, tag: "BaaS & Auth" },
      { name: "AI RAG & Vector Embeddings", level: 85, featured: true, tag: "GenAI" },
    ],
  },
  {
    title: "Tools, Platforms & Workflow",
    iconName: "Terminal",
    skills: [
      { name: "Git & GitHub", level: 95, featured: true, tag: "VCS" },
      { name: "VS Code", level: 95, featured: false, tag: "IDE" },
      { name: "Antigravity", level: 92, featured: true, tag: "AI Engineering" },
      { name: "Android Studio", level: 86, featured: false, tag: "Mobile Build" },
      { name: "Xcode", level: 85, featured: false, tag: "iOS Build" },
      { name: "Sentry", level: 88, featured: false, tag: "Monitoring" },
      { name: "WebEngage", level: 84, featured: false, tag: "Analytics" },
      { name: "Performance Optimization", level: 92, featured: true, tag: "Profiling" },
    ],
  },
];

export const educationData = [
  {
    degree: "Bachelor of Engineering (B.E.) in Electrical & Electronics Engineering",
    institution: "Kongunadu College of Engineering & Technology",
    period: "2017 – 2021",
    score: "74.9%",
    highlight: "Graduated with First Class distinction. Focus on embedded logic, circuit analysis, and programming foundations.",
  },
  {
    degree: "Higher Secondary Certificate (HSC) — Science & Mathematics",
    institution: "Devanger Higher Secondary School",
    period: "2015 – 2017",
    score: "65.08%",
    highlight: "Physics, Chemistry, Mathematics & Biology.",
  },
  {
    degree: "Secondary School Leaving Certificate (SSLC) — General Education",
    institution: "Devanger Higher Secondary School",
    period: "2014 – 2015",
    score: "92.2%",
    highlight: "Outstanding academic performance with 92.2% aggregate score.",
  },
];

export const coreCompetencies = [
  "Reusable Component Architecture",
  "Performance Profiling & Optimization",
  "Centralized State Management (Redux/Context)",
  "Low-Latency Real-Time Data Handling (Socket.IO)",
  "Cross-Platform Mobile Engineering (React Native)",
  "Third-Party Ecosystem & Payment Integration",
  "Automated Lead Capture & Marketing Pipelines",
  "Retrieval-Augmented Generation (AI RAG Chatbots)",
];

export const sampleQA = [
  {
    q: "What is Karthik's primary tech stack and experience level?",
    a: "Karthik has 3+ years of professional experience specializing in React.js, React Native, Next.js, TypeScript, Node.js, and Socket.IO. He builds scalable full-stack web platforms and high-performance cross-platform iOS & Android mobile applications.",
  },
  {
    q: "Tell me about his real-time trading application experience.",
    a: "Karthik has built both cryptocurrency and Indian stock trading interfaces. At Pibase Solutions, he built a cross-platform React Native crypto trading app using Socket.IO, Redux Thunk, and Mitt Event Bus for sub-second order book updates. At Iouring, he developed responsive stock trading interfaces with high-frequency tick streaming and zero UI freezing.",
  },
  {
    q: "What enterprise ERP and automation systems has he worked on?",
    a: "At Micromen Software Solutions, Karthik developed an ERP and Marketing Automation platform. Key features included live field location tracking, an in-app VoIP dialer with call recording, automated Meta Ads and WhatsApp Business API lead capture, Zoom meeting automation, and PDF/Excel report engines.",
  },
  {
    q: "Does Karthik have experience with Artificial Intelligence / GenAI?",
    a: "Yes! Karthik engineered an AI-powered Retrieval-Augmented Generation (RAG) chatbot using Python, FastAPI, and React.js. It features automated document ingestion, semantic chunking, high-dimensional vector embeddings, and real-time streaming LLM responses with source citations.",
  },
  {
    q: "How can I contact Karthik for an interview or project?",
    a: "You can reach Karthik via email at karthi25082000@gmail.com, call/WhatsApp at +91 80726 47772, explore his GitHub at github.com/keYa2508, or send a direct message using the interactive contact form on this portfolio!",
  },
];

