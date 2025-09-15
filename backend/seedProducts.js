const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

// Load env vars
dotenv.config();

const sampleProducts = [
  {
    title: "E-commerce React Application",
    description: "A fully functional e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product management, shopping cart, payment processing with Stripe, order management, and admin dashboard. The application is responsive and includes advanced features like product reviews, wishlist, and real-time notifications.",
    shortDescription: "Complete e-commerce solution with React, Node.js, and payment integration",
    price: 299,
    originalPrice: 399,
    category: "E-commerce",
    tags: ["React", "Node.js", "MongoDB", "Stripe", "E-commerce"],
    technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe", "JWT"],
    features: [
      { title: "User Authentication", description: "JWT-based auth with role management", included: true },
      { title: "Product Management", description: "Full CRUD operations for products", included: true },
      { title: "Shopping Cart", description: "Persistent shopping cart with local storage", included: true },
      { title: "Payment Processing", description: "Stripe integration for payments", included: true },
      { title: "Order Management", description: "Complete order tracking system", included: true },
      { title: "Admin Dashboard", description: "Comprehensive admin panel", included: true },
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800", alt: "E-commerce Dashboard", isPrimary: true },
      { url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800", alt: "Product Listing", isPrimary: false },
    ],
    demoUrl: "https://demo-ecommerce.devneststudios.com",
    githubUrl: "https://github.com/devneststudios/react-ecommerce",
    isActive: true,
    isFeatured: true,
    deliveryTime: "5-7 business days",
    customizationOptions: {
      available: true,
      description: "Custom branding, additional features, and integrations",
      additionalCost: 100
    },
    difficulty: "Intermediate",
    supportIncluded: true,
    supportDuration: "60 days",
  },
  {
    title: "Modern Landing Page Template",
    description: "A stunning, responsive landing page template built with React and Framer Motion. Perfect for startups, SaaS companies, and digital agencies. Includes multiple sections, animations, contact forms, and SEO optimization.",
    shortDescription: "Beautiful responsive landing page with animations and modern design",
    price: 89,
    originalPrice: 129,
    category: "Landing Pages",
    tags: ["React", "Framer Motion", "Responsive", "Modern", "SEO"],
    technologies: ["React", "TypeScript", "Framer Motion", "Styled Components", "React Hook Form"],
    features: [
      { title: "Responsive Design", description: "Works perfectly on all devices", included: true },
      { title: "Smooth Animations", description: "Beautiful Framer Motion animations", included: true },
      { title: "SEO Optimized", description: "Built-in SEO best practices", included: true },
      { title: "Contact Forms", description: "Ready-to-use contact forms", included: true },
      { title: "Performance Optimized", description: "Fast loading and optimized", included: true },
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800", alt: "Landing Page Hero", isPrimary: true },
    ],
    demoUrl: "https://landing-template.devneststudios.com",
    isActive: true,
    isFeatured: false,
    deliveryTime: "2-3 business days",
    customizationOptions: {
      available: true,
      description: "Custom colors, content, and additional sections",
      additionalCost: 50
    },
    difficulty: "Beginner",
    supportIncluded: true,
    supportDuration: "30 days",
  },
  {
    title: "REST API Backend Boilerplate",
    description: "Production-ready Node.js REST API boilerplate with Express, MongoDB, JWT authentication, input validation, error handling, logging, and comprehensive documentation. Includes user management, role-based access control, and API rate limiting.",
    shortDescription: "Complete Node.js REST API boilerplate with authentication and security",
    price: 149,
    category: "Backend APIs",
    tags: ["Node.js", "Express", "MongoDB", "JWT", "API"],
    technologies: ["Node.js", "Express", "MongoDB", "Mongoose", "JWT", "Bcrypt"],
    features: [
      { title: "JWT Authentication", description: "Secure token-based authentication", included: true },
      { title: "Role-based Access", description: "User roles and permissions", included: true },
      { title: "Input Validation", description: "Comprehensive request validation", included: true },
      { title: "Error Handling", description: "Centralized error management", included: true },
      { title: "API Documentation", description: "Complete API documentation", included: true },
      { title: "Rate Limiting", description: "API rate limiting and security", included: true },
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?w=800", alt: "API Code", isPrimary: true },
    ],
    githubUrl: "https://github.com/devneststudios/node-api-boilerplate",
    isActive: true,
    isFeatured: true,
    deliveryTime: "3-5 business days",
    customizationOptions: {
      available: true,
      description: "Custom endpoints, integrations, and database models",
      additionalCost: 75
    },
    difficulty: "Advanced",
    supportIncluded: true,
    supportDuration: "45 days",
  },
  {
    title: "React Native Mobile App",
    description: "Cross-platform mobile application built with React Native and Expo. Features navigation, authentication, push notifications, offline support, and native device integrations. Perfect foundation for any mobile project.",
    shortDescription: "Cross-platform mobile app with React Native and modern features",
    price: 399,
    category: "Mobile Apps",
    tags: ["React Native", "Expo", "Mobile", "Cross-platform", "Push Notifications"],
    technologies: ["React Native", "Expo", "Redux", "AsyncStorage", "Push Notifications"],
    features: [
      { title: "Cross-platform", description: "Works on iOS and Android", included: true },
      { title: "Navigation", description: "React Navigation setup", included: true },
      { title: "Authentication", description: "Mobile-optimized auth flow", included: true },
      { title: "Push Notifications", description: "Firebase push notifications", included: true },
      { title: "Offline Support", description: "Works without internet", included: true },
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800", alt: "Mobile App", isPrimary: true },
    ],
    isActive: true,
    isFeatured: false,
    deliveryTime: "7-10 business days",
    customizationOptions: {
      available: true,
      description: "Custom features, UI/UX, and native integrations",
      additionalCost: 150
    },
    difficulty: "Advanced",
    supportIncluded: true,
    supportDuration: "60 days",
  },
  {
    title: "UI/UX Design System",
    description: "Complete design system with components, color schemes, typography, icons, and usage guidelines. Includes Figma files, React components, and comprehensive documentation for consistent design across your projects.",
    shortDescription: "Professional design system with Figma files and React components",
    price: 199,
    category: "UI/UX Design",
    tags: ["Design System", "Figma", "Components", "Branding", "Guidelines"],
    technologies: ["Figma", "React", "Styled Components", "Storybook"],
    features: [
      { title: "Figma Components", description: "Complete Figma component library", included: true },
      { title: "React Components", description: "Ready-to-use React components", included: true },
      { title: "Color Palette", description: "Professional color schemes", included: true },
      { title: "Typography", description: "Font pairings and scales", included: true },
      { title: "Icon Set", description: "Custom icon collection", included: true },
      { title: "Documentation", description: "Usage guidelines and examples", included: true },
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800", alt: "Design System", isPrimary: true },
    ],
    isActive: true,
    isFeatured: false,
    deliveryTime: "3-4 business days",
    customizationOptions: {
      available: true,
      description: "Custom colors, components, and branding",
      additionalCost: 100
    },
    difficulty: "Intermediate",
    supportIncluded: true,
    supportDuration: "30 days",
  },
  {
    title: "Full-Stack Web Application",
    description: "Complete full-stack web application with modern tech stack. Includes React frontend, Node.js backend, PostgreSQL database, Redis caching, Docker configuration, and CI/CD setup. Production-ready with monitoring and logging.",
    shortDescription: "Enterprise-grade full-stack application with modern architecture",
    price: 599,
    originalPrice: 799,
    category: "Web Applications",
    tags: ["Full-Stack", "React", "Node.js", "PostgreSQL", "Docker", "Enterprise"],
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "Docker", "AWS"],
    features: [
      { title: "Modern Frontend", description: "React with TypeScript and hooks", included: true },
      { title: "Scalable Backend", description: "Node.js with microservices architecture", included: true },
      { title: "Database Design", description: "PostgreSQL with optimized queries", included: true },
      { title: "Caching Layer", description: "Redis for performance optimization", included: true },
      { title: "DevOps Setup", description: "Docker and CI/CD pipelines", included: true },
      { title: "Monitoring", description: "Application monitoring and logging", included: true },
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800", alt: "Full Stack Development", isPrimary: true },
    ],
    demoUrl: "https://fullstack-demo.devneststudios.com",
    githubUrl: "https://github.com/devneststudios/fullstack-app",
    isActive: true,
    isFeatured: true,
    deliveryTime: "10-14 business days",
    customizationOptions: {
      available: true,
      description: "Custom features, integrations, and deployment setup",
      additionalCost: 200
    },
    difficulty: "Expert",
    supportIncluded: true,
    supportDuration: "90 days",
  },
  // Additional Web Development Products
  {
    title: "Next.js E-learning Platform",
    description: "Modern e-learning platform built with Next.js, featuring course management, video streaming, user progress tracking, certificates, and payment integration. Includes student dashboard, instructor panel, and admin management.",
    shortDescription: "Complete e-learning platform with Next.js and video streaming",
    price: 449,
    originalPrice: 599,
    category: "Web Applications",
    tags: ["Next.js", "E-learning", "Video", "Payments", "Certificates"],
    technologies: ["Next.js", "React", "MongoDB", "Stripe", "AWS S3", "JWT"],
    features: [
      { title: "Course Management", description: "Create and manage courses with lessons", included: true },
      { title: "Video Streaming", description: "Secure video hosting and streaming", included: true },
      { title: "Progress Tracking", description: "Student progress and analytics", included: true },
      { title: "Certificates", description: "Automatic certificate generation", included: true },
      { title: "Payment Integration", description: "Course purchases with Stripe", included: true },
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800", alt: "E-learning Platform", isPrimary: true },
    ],
    demoUrl: "https://elearning-demo.devneststudios.com",
    isActive: true,
    isFeatured: true,
    deliveryTime: "8-12 business days",
    customizationOptions: {
      available: true,
      description: "Custom branding, additional features, and integrations",
      additionalCost: 150
    },
    difficulty: "Advanced",
    supportIncluded: true,
    supportDuration: "90 days",
  },
  {
    title: "Vue.js Admin Dashboard",
    description: "Professional admin dashboard built with Vue.js 3 and TypeScript. Features include data visualization, user management, analytics, real-time notifications, and responsive design. Perfect for business applications.",
    shortDescription: "Modern Vue.js admin dashboard with analytics and user management",
    price: 179,
    category: "Web Applications",
    tags: ["Vue.js", "TypeScript", "Admin", "Analytics", "Dashboard"],
    technologies: ["Vue.js 3", "TypeScript", "Pinia", "Chart.js", "Tailwind CSS"],
    features: [
      { title: "Data Visualization", description: "Interactive charts and graphs", included: true },
      { title: "User Management", description: "Complete user administration", included: true },
      { title: "Real-time Updates", description: "Live data updates and notifications", included: true },
      { title: "Responsive Design", description: "Works on all devices", included: true },
      { title: "Dark Mode", description: "Built-in dark/light theme toggle", included: true },
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800", alt: "Admin Dashboard", isPrimary: true },
    ],
    demoUrl: "https://vue-admin.devneststudios.com",
    isActive: true,
    isFeatured: false,
    deliveryTime: "4-6 business days",
    customizationOptions: {
      available: true,
      description: "Custom modules, charts, and integrations",
      additionalCost: 75
    },
    difficulty: "Intermediate",
    supportIncluded: true,
    supportDuration: "45 days",
  },
  {
    title: "WordPress to React Migration Kit",
    description: "Complete toolkit for migrating WordPress sites to React. Includes content extraction tools, component library, SEO preservation, and step-by-step migration guide. Maintain your content while gaining React's benefits.",
    shortDescription: "Seamlessly migrate WordPress sites to React applications",
    price: 249,
    category: "Custom Development",
    tags: ["WordPress", "React", "Migration", "SEO", "Tools"],
    technologies: ["React", "WordPress REST API", "Next.js", "Headless CMS"],
    features: [
      { title: "Content Extraction", description: "Automated WordPress content migration", included: true },
      { title: "Component Library", description: "Pre-built React components", included: true },
      { title: "SEO Preservation", description: "Maintain search rankings during migration", included: true },
      { title: "Media Migration", description: "Transfer images and media files", included: true },
      { title: "Migration Guide", description: "Detailed step-by-step instructions", included: true },
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800", alt: "Migration Process", isPrimary: true },
    ],
    isActive: true,
    isFeatured: false,
    deliveryTime: "3-5 business days",
    customizationOptions: {
      available: true,
      description: "Custom migration scripts and additional components",
      additionalCost: 100
    },
    difficulty: "Intermediate",
    supportIncluded: true,
    supportDuration: "60 days",
  },
  // Mobile App Products
  {
    title: "Flutter E-commerce App",
    description: "Cross-platform e-commerce mobile app built with Flutter. Features include product catalog, cart, payments, order tracking, push notifications, and offline support. Works seamlessly on iOS and Android.",
    shortDescription: "Professional Flutter e-commerce app with payments and offline support",
    price: 379,
    originalPrice: 499,
    category: "Mobile Apps",
    tags: ["Flutter", "E-commerce", "Mobile", "Payments", "Cross-platform"],
    technologies: ["Flutter", "Dart", "Firebase", "Stripe", "SQLite"],
    features: [
      { title: "Product Catalog", description: "Beautiful product browsing experience", included: true },
      { title: "Shopping Cart", description: "Persistent cart with local storage", included: true },
      { title: "Payment Integration", description: "Secure payments with Stripe", included: true },
      { title: "Order Tracking", description: "Real-time order status updates", included: true },
      { title: "Push Notifications", description: "Firebase push notifications", included: true },
      { title: "Offline Support", description: "Works without internet connection", included: true },
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800", alt: "Flutter Mobile App", isPrimary: true },
    ],
    isActive: true,
    isFeatured: true,
    deliveryTime: "10-14 business days",
    customizationOptions: {
      available: true,
      description: "Custom UI, additional features, and third-party integrations",
      additionalCost: 150
    },
    difficulty: "Advanced",
    supportIncluded: true,
    supportDuration: "90 days",
  },
  {
    title: "React Native Fitness Tracker",
    description: "Comprehensive fitness tracking app with workout plans, nutrition tracking, progress analytics, social features, and wearable device integration. Built with React Native for iOS and Android.",
    shortDescription: "Complete fitness tracking app with social features and analytics",
    price: 329,
    category: "Mobile Apps",
    tags: ["React Native", "Fitness", "Health", "Analytics", "Social"],
    technologies: ["React Native", "Redux", "Firebase", "React Navigation", "Chart.js"],
    features: [
      { title: "Workout Plans", description: "Customizable workout routines", included: true },
      { title: "Nutrition Tracking", description: "Food diary and calorie counting", included: true },
      { title: "Progress Analytics", description: "Detailed progress charts and statistics", included: true },
      { title: "Social Features", description: "Share achievements and compete with friends", included: true },
      { title: "Wearable Integration", description: "Connect with fitness trackers", included: true },
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800", alt: "Fitness App", isPrimary: true },
    ],
    isActive: true,
    isFeatured: false,
    deliveryTime: "8-12 business days",
    customizationOptions: {
      available: true,
      description: "Custom workout types, additional integrations",
      additionalCost: 125
    },
    difficulty: "Advanced",
    supportIncluded: true,
    supportDuration: "75 days",
  },
  {
    title: "iOS SwiftUI Finance App",
    description: "Native iOS finance management app built with SwiftUI. Features expense tracking, budget management, investment portfolio, bill reminders, and financial insights with beautiful charts and widgets.",
    shortDescription: "Native iOS finance app with SwiftUI and advanced financial features",
    price: 289,
    category: "Mobile Apps",
    tags: ["SwiftUI", "iOS", "Finance", "Native", "Widgets"],
    technologies: ["SwiftUI", "Core Data", "WidgetKit", "Charts", "CloudKit"],
    features: [
      { title: "Expense Tracking", description: "Categorize and track all expenses", included: true },
      { title: "Budget Management", description: "Set and monitor budgets", included: true },
      { title: "Investment Portfolio", description: "Track investments and returns", included: true },
      { title: "Bill Reminders", description: "Never miss a payment", included: true },
      { title: "iOS Widgets", description: "Home screen widgets for quick access", included: true },
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800", alt: "Finance App", isPrimary: true },
    ],
    isActive: true,
    isFeatured: false,
    deliveryTime: "6-10 business days",
    customizationOptions: {
      available: true,
      description: "Custom categories, additional widgets, bank integrations",
      additionalCost: 100
    },
    difficulty: "Advanced",
    supportIncluded: true,
    supportDuration: "60 days",
  },
  // UI/UX Design Products
  {
    title: "Complete Mobile UI Kit",
    description: "Comprehensive mobile UI kit with 200+ screens across 15+ app categories. Includes components, icons, illustrations, and design tokens. Available in Figma, Sketch, and Adobe XD formats.",
    shortDescription: "200+ mobile UI screens with components and design system",
    price: 159,
    originalPrice: 229,
    category: "UI/UX Design",
    tags: ["Mobile UI", "Figma", "Components", "Screens", "Design System"],
    technologies: ["Figma", "Sketch", "Adobe XD", "Principle"],
    features: [
      { title: "200+ Screens", description: "Ready-to-use mobile app screens", included: true },
      { title: "Component Library", description: "Reusable UI components", included: true },
      { title: "Icon Collection", description: "500+ custom icons included", included: true },
      { title: "Design Tokens", description: "Consistent design system tokens", included: true },
      { title: "Multiple Formats", description: "Figma, Sketch, and XD files", included: true },
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800", alt: "Mobile UI Kit", isPrimary: true },
    ],
    isActive: true,
    isFeatured: true,
    deliveryTime: "1-2 business days",
    customizationOptions: {
      available: true,
      description: "Custom colors, additional screens, brand integration",
      additionalCost: 75
    },
    difficulty: "Beginner",
    supportIncluded: true,
    supportDuration: "30 days",
  },
  {
    title: "SaaS Dashboard Design Templates",
    description: "Professional SaaS dashboard designs with 50+ unique layouts. Includes analytics dashboards, user management interfaces, billing pages, and settings screens. Optimized for web applications.",
    shortDescription: "50+ SaaS dashboard templates with analytics and user management",
    price: 139,
    category: "UI/UX Design",
    tags: ["SaaS", "Dashboard", "Analytics", "Web Design", "Templates"],
    technologies: ["Figma", "React Components", "Styled Components"],
    features: [
      { title: "50+ Layouts", description: "Diverse dashboard designs", included: true },
      { title: "Analytics Views", description: "Data visualization interfaces", included: true },
      { title: "User Management", description: "Admin and user interface designs", included: true },
      { title: "React Components", description: "Coded React components included", included: true },
      { title: "Responsive Design", description: "Mobile and desktop layouts", included: true },
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800", alt: "Dashboard Design", isPrimary: true },
    ],
    isActive: true,
    isFeatured: false,
    deliveryTime: "2-3 business days",
    customizationOptions: {
      available: true,
      description: "Custom layouts, color schemes, and components",
      additionalCost: 60
    },
    difficulty: "Intermediate",
    supportIncluded: true,
    supportDuration: "45 days",
  },
  {
    title: "E-commerce Website Design Pack",
    description: "Complete e-commerce website design package with homepage, product pages, checkout flow, user account pages, and mobile responsive designs. Includes wireframes and user flow documentation.",
    shortDescription: "Complete e-commerce website design with checkout flow and mobile layouts",
    price: 199,
    category: "UI/UX Design",
    tags: ["E-commerce", "Website Design", "Checkout", "Mobile", "UX"],
    technologies: ["Figma", "Adobe XD", "Wireframing Tools"],
    features: [
      { title: "Complete Page Set", description: "All essential e-commerce pages", included: true },
      { title: "Checkout Flow", description: "Optimized checkout process design", included: true },
      { title: "Mobile Responsive", description: "Mobile-first design approach", included: true },
      { title: "Wireframes", description: "Low-fi wireframes included", included: true },
      { title: "User Flow", description: "Detailed user journey documentation", included: true },
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800", alt: "E-commerce Design", isPrimary: true },
    ],
    isActive: true,
    isFeatured: false,
    deliveryTime: "3-5 business days",
    customizationOptions: {
      available: true,
      description: "Custom branding, additional pages, and user flows",
      additionalCost: 80
    },
    difficulty: "Intermediate",
    supportIncluded: true,
    supportDuration: "30 days",
  },
  // Backend Services Products
  {
    title: "Microservices Architecture Template",
    description: "Production-ready microservices architecture with Docker, Kubernetes, API Gateway, service discovery, monitoring, and CI/CD pipelines. Built with Node.js and includes comprehensive documentation.",
    shortDescription: "Complete microservices setup with Docker, Kubernetes, and monitoring",
    price: 399,
    originalPrice: 549,
    category: "Backend APIs",
    tags: ["Microservices", "Docker", "Kubernetes", "API Gateway", "DevOps"],
    technologies: ["Node.js", "Docker", "Kubernetes", "Redis", "PostgreSQL", "Nginx"],
    features: [
      { title: "Service Architecture", description: "Well-designed microservices structure", included: true },
      { title: "Container Orchestration", description: "Docker and Kubernetes setup", included: true },
      { title: "API Gateway", description: "Centralized API management", included: true },
      { title: "Service Discovery", description: "Automatic service registration", included: true },
      { title: "Monitoring Stack", description: "Prometheus, Grafana, and logging", included: true },
      { title: "CI/CD Pipelines", description: "Automated deployment workflows", included: true },
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800", alt: "Microservices Architecture", isPrimary: true },
    ],
    githubUrl: "https://github.com/devneststudios/microservices-template",
    isActive: true,
    isFeatured: true,
    deliveryTime: "7-10 business days",
    customizationOptions: {
      available: true,
      description: "Custom services, cloud provider setup, additional monitoring",
      additionalCost: 200
    },
    difficulty: "Expert",
    supportIncluded: true,
    supportDuration: "90 days",
  },
  {
    title: "GraphQL API Server",
    description: "Modern GraphQL API server with Apollo Server, TypeScript, authentication, real-time subscriptions, caching, and comprehensive testing. Includes schema design best practices and documentation.",
    shortDescription: "Modern GraphQL server with TypeScript, subscriptions, and caching",
    price: 229,
    category: "Backend APIs",
    tags: ["GraphQL", "Apollo", "TypeScript", "Subscriptions", "API"],
    technologies: ["GraphQL", "Apollo Server", "TypeScript", "Redis", "PostgreSQL"],
    features: [
      { title: "GraphQL Schema", description: "Well-designed GraphQL schema", included: true },
      { title: "Real-time Subscriptions", description: "WebSocket-based subscriptions", included: true },
      { title: "Authentication", description: "JWT and OAuth integration", included: true },
      { title: "Caching Layer", description: "Redis caching for performance", included: true },
      { title: "Testing Suite", description: "Comprehensive test coverage", included: true },
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800", alt: "GraphQL Server", isPrimary: true },
    ],
    githubUrl: "https://github.com/devneststudios/graphql-server",
    isActive: true,
    isFeatured: false,
    deliveryTime: "5-7 business days",
    customizationOptions: {
      available: true,
      description: "Custom schema, resolvers, and integrations",
      additionalCost: 100
    },
    difficulty: "Advanced",
    supportIncluded: true,
    supportDuration: "60 days",
  },
  {
    title: "Real-time Chat System",
    description: "Scalable real-time chat system with Socket.io, Redis, message history, file sharing, typing indicators, online presence, and room management. Supports both one-on-one and group chats.",
    shortDescription: "Scalable chat system with Socket.io, file sharing, and group chats",
    price: 279,
    category: "Backend APIs",
    tags: ["Chat", "Socket.io", "Real-time", "Redis", "File Sharing"],
    technologies: ["Socket.io", "Node.js", "Redis", "MongoDB", "AWS S3"],
    features: [
      { title: "Real-time Messaging", description: "Instant message delivery", included: true },
      { title: "File Sharing", description: "Upload and share files securely", included: true },
      { title: "Group Chats", description: "Multi-user chat rooms", included: true },
      { title: "Typing Indicators", description: "Real-time typing notifications", included: true },
      { title: "Online Presence", description: "User online/offline status", included: true },
      { title: "Message History", description: "Persistent message storage", included: true },
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800", alt: "Chat System", isPrimary: true },
    ],
    githubUrl: "https://github.com/devneststudios/realtime-chat",
    isActive: true,
    isFeatured: false,
    deliveryTime: "6-9 business days",
    customizationOptions: {
      available: true,
      description: "Custom features, integrations, and scaling options",
      additionalCost: 120
    },
    difficulty: "Advanced",
    supportIncluded: true,
    supportDuration: "75 days",
  },
  // Full-Stack Solutions
  {
    title: "Social Media Platform",
    description: "Complete social media platform with user profiles, posts, comments, likes, following system, real-time notifications, and content moderation. Built with React, Node.js, and real-time features.",
    shortDescription: "Full-featured social media platform with real-time interactions",
    price: 699,
    originalPrice: 899,
    category: "Web Applications",
    tags: ["Social Media", "Real-time", "Full-Stack", "React", "Community"],
    technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Redis", "AWS"],
    features: [
      { title: "User Profiles", description: "Customizable user profiles and settings", included: true },
      { title: "Post Creation", description: "Text, image, and video posts", included: true },
      { title: "Social Interactions", description: "Likes, comments, shares, and follows", included: true },
      { title: "Real-time Notifications", description: "Instant notification system", included: true },
      { title: "Content Moderation", description: "Automated and manual moderation tools", included: true },
      { title: "Advanced Search", description: "Search users, posts, and hashtags", included: true },
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800", alt: "Social Media Platform", isPrimary: true },
    ],
    demoUrl: "https://social-demo.devneststudios.com",
    isActive: true,
    isFeatured: true,
    deliveryTime: "14-21 business days",
    customizationOptions: {
      available: true,
      description: "Custom features, branding, and advanced integrations",
      additionalCost: 300
    },
    difficulty: "Expert",
    supportIncluded: true,
    supportDuration: "120 days",
  },
  {
    title: "Task Management Application",
    description: "Comprehensive project and task management application with team collaboration, time tracking, file attachments, kanban boards, calendar integration, and detailed reporting. Perfect for teams of any size.",
    shortDescription: "Complete task management app with team collaboration and time tracking",
    price: 449,
    category: "Web Applications",
    tags: ["Task Management", "Collaboration", "Time Tracking", "Kanban", "Teams"],
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis"],
    features: [
      { title: "Project Management", description: "Create and manage projects and tasks", included: true },
      { title: "Team Collaboration", description: "Team workspaces and permissions", included: true },
      { title: "Time Tracking", description: "Built-in time tracking and reporting", included: true },
      { title: "Kanban Boards", description: "Visual project management boards", included: true },
      { title: "Calendar Integration", description: "Calendar view and scheduling", included: true },
      { title: "File Attachments", description: "Attach files to tasks and projects", included: true },
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800", alt: "Task Management", isPrimary: true },
    ],
    demoUrl: "https://tasks-demo.devneststudios.com",
    isActive: true,
    isFeatured: false,
    deliveryTime: "10-14 business days",
    customizationOptions: {
      available: true,
      description: "Custom workflows, integrations, and advanced features",
      additionalCost: 180
    },
    difficulty: "Advanced",
    supportIncluded: true,
    supportDuration: "90 days",
  },
  {
    title: "Multi-vendor Marketplace",
    description: "Complete multi-vendor e-commerce marketplace with vendor registration, product management, commission system, order fulfillment, reviews, and comprehensive admin panel. Built for scalability.",
    shortDescription: "Multi-vendor marketplace with commission system and vendor management",
    price: 799,
    originalPrice: 1099,
    category: "E-commerce",
    tags: ["Marketplace", "Multi-vendor", "E-commerce", "Commission", "Scalable"],
    technologies: ["React", "Node.js", "MongoDB", "Stripe Connect", "AWS"],
    features: [
      { title: "Vendor Management", description: "Vendor registration and dashboard", included: true },
      { title: "Product Catalog", description: "Multi-vendor product management", included: true },
      { title: "Commission System", description: "Automated commission calculations", included: true },
      { title: "Order Management", description: "Split orders and fulfillment", included: true },
      { title: "Review System", description: "Product and vendor reviews", included: true },
      { title: "Analytics Dashboard", description: "Sales and performance analytics", included: true },
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800", alt: "Marketplace Platform", isPrimary: true },
    ],
    demoUrl: "https://marketplace-demo.devneststudios.com",
    isActive: true,
    isFeatured: true,
    deliveryTime: "18-25 business days",
    customizationOptions: {
      available: true,
      description: "Custom features, payment gateways, and vendor tools",
      additionalCost: 400
    },
    difficulty: "Expert",
    supportIncluded: true,
    supportDuration: "120 days",
  },
];

async function seedProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Find or create an admin user
    let adminUser = await User.findOne({ role: 'admin' });
    
    if (!adminUser) {
      adminUser = await User.create({
        name: 'DevNest Admin',
        email: 'admin@devneststudios.com',
        password: 'admin123',
        role: 'admin',
        isVerified: true,
      });
      console.log('Created admin user');
    }

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Add createdBy field to all products
    const productsWithCreator = sampleProducts.map(product => ({
      ...product,
      createdBy: adminUser._id,
      // Add some random ratings and views for realism
      rating: {
        average: Math.random() * 2 + 3, // Random rating between 3-5
        count: Math.floor(Math.random() * 100) + 10, // Random count between 10-110
      },
      views: Math.floor(Math.random() * 1000) + 50,
      sales: Math.floor(Math.random() * 50) + 5,
    }));

    // Create products
    const createdProducts = await Product.insertMany(productsWithCreator);
    console.log(`Created ${createdProducts.length} products`);

    console.log('Sample products seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();