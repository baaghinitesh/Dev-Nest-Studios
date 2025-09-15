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