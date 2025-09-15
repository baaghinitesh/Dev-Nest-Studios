const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected for Demo Products Seeding'))
  .catch(err => console.log('MongoDB connection error:', err));

const demoProducts = [
  // E-commerce Solutions
  {
    title: "Complete E-commerce Platform",
    description: "Full-featured e-commerce solution with shopping cart, payment integration, inventory management, order tracking, and admin dashboard. Includes Stripe/PayPal integration, email notifications, and SEO optimization.",
    shortDescription: "Complete e-commerce platform with cart, payments, and admin dashboard",
    price: 2999,
    originalPrice: 3999,
    category: "E-commerce",
    features: [
      { title: "Shopping Cart & Checkout", description: "Advanced cart with guest checkout and saved carts", included: true },
      { title: "Payment Integration", description: "Stripe, PayPal, and credit card processing", included: true },
      { title: "Inventory Management", description: "Real-time stock tracking and low-stock alerts", included: true },
      { title: "Order Management", description: "Complete order lifecycle tracking", included: true },
      { title: "Admin Dashboard", description: "Comprehensive admin panel with analytics", included: true },
      { title: "Email Notifications", description: "Automated order and shipping emails", included: true },
      { title: "SEO Optimization", description: "Search engine optimized product pages", included: true }
    ],
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Express", "JWT"],
    images: [{ url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800", alt: "E-commerce Platform", isPrimary: true }],
    isActive: true,
    isFeatured: true,
    deliveryTime: "10-14 business days",
    customizationOptions: {
      available: true,
      description: "Custom themes, additional payment gateways, multi-language support",
      additionalCost: 500
    },
    difficulty: "Advanced",
    supportIncluded: true,
    supportDuration: "90 days",
    sales: 45,
    views: 1250,
    rating: { average: 4.8, count: 52 }
  },

  // AI & Machine Learning
  {
    title: "AI-Powered Recommendation Engine",
    description: "Machine learning recommendation system that analyzes user behavior, preferences, and purchase history to provide personalized product recommendations. Includes real-time analytics and A/B testing capabilities.",
    shortDescription: "ML-based recommendation system with real-time analytics",
    price: 1899,
    category: "Backend APIs",
    features: [
      { title: "Collaborative Filtering", description: "User-based and item-based recommendations", included: true },
      { title: "Real-time Analytics", description: "Live performance tracking and metrics", included: true },
      { title: "A/B Testing", description: "Compare recommendation algorithms", included: true },
      { title: "API Integration", description: "RESTful API for easy integration", included: true },
      { title: "Machine Learning Models", description: "Pre-trained models ready to use", included: true }
    ],
    technologies: ["Python", "TensorFlow", "FastAPI", "PostgreSQL", "Redis", "Docker"],
    images: [{ url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800", alt: "AI Recommendation", isPrimary: true }],
    isActive: true,
    isFeatured: true,
    deliveryTime: "7-10 business days",
    customizationOptions: {
      available: true,
      description: "Custom ML models, additional data sources, advanced analytics",
      additionalCost: 400
    },
    difficulty: "Expert",
    supportIncluded: true,
    supportDuration: "60 days",
    sales: 28,
    views: 892,
    rating: { average: 4.9, count: 31 }
  },

  // Mobile Applications
  {
    title: "Food Delivery Mobile App",
    description: "Complete food delivery application with restaurant listings, menu management, real-time order tracking, payment processing, and delivery driver interface. Includes both customer and restaurant owner apps.",
    shortDescription: "Full food delivery app with tracking and multiple user interfaces",
    price: 3499,
    originalPrice: 4299,
    category: "Mobile Apps",
    features: [
      { title: "Restaurant Discovery", description: "Search and filter restaurants by cuisine, rating, distance", included: true },
      { title: "Menu Management", description: "Dynamic menu with photos and customizations", included: true },
      { title: "Real-time Tracking", description: "Live order and delivery tracking", included: true },
      { title: "Multi-Payment Options", description: "Cards, digital wallets, cash on delivery", included: true },
      { title: "Driver Interface", description: "Dedicated app for delivery drivers", included: true },
      { title: "Restaurant Dashboard", description: "Order management for restaurant owners", included: true },
      { title: "Push Notifications", description: "Real-time updates for all user types", included: true }
    ],
    technologies: ["React Native", "Node.js", "MongoDB", "Socket.io", "Stripe", "Google Maps API"],
    images: [{ url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800", alt: "Food Delivery App", isPrimary: true }],
    isActive: true,
    isFeatured: true,
    deliveryTime: "14-21 business days",
    customizationOptions: {
      available: true,
      description: "Custom branding, additional payment methods, loyalty programs",
      additionalCost: 800
    },
    difficulty: "Expert",
    supportIncluded: true,
    supportDuration: "120 days",
    sales: 67,
    views: 1876,
    rating: { average: 4.7, count: 73 }
  },

  // Web Applications - SaaS
  {
    title: "Project Management SaaS Platform",
    description: "Comprehensive project management platform with team collaboration, task tracking, time logging, file sharing, and advanced reporting. Includes Kanban boards, Gantt charts, and integrations.",
    shortDescription: "Complete project management SaaS with collaboration tools",
    price: 2199,
    category: "Web Applications",
    features: [
      { title: "Kanban Boards", description: "Drag-and-drop task management", included: true },
      { title: "Gantt Charts", description: "Timeline and dependency visualization", included: true },
      { title: "Team Collaboration", description: "Real-time chat and file sharing", included: true },
      { title: "Time Tracking", description: "Built-in time logging and reporting", included: true },
      { title: "Advanced Reports", description: "Detailed analytics and progress reports", included: true },
      { title: "Third-party Integrations", description: "Slack, Google Drive, GitHub integration", included: true }
    ],
    technologies: ["Vue.js", "Node.js", "PostgreSQL", "Socket.io", "Chart.js", "AWS S3"],
    images: [{ url: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800", alt: "Project Management", isPrimary: true }],
    isActive: true,
    isFeatured: false,
    deliveryTime: "12-16 business days",
    customizationOptions: {
      available: true,
      description: "Custom workflows, additional integrations, white-label options",
      additionalCost: 600
    },
    difficulty: "Advanced",
    supportIncluded: true,
    supportDuration: "90 days",
    sales: 89,
    views: 2134,
    rating: { average: 4.6, count: 94 }
  },

  // UI/UX Design
  {
    title: "Complete Design System Library",
    description: "Comprehensive design system with 500+ components, design tokens, style guide, and documentation. Includes Figma files, Sketch files, and coded components for React, Vue, and Angular.",
    shortDescription: "500+ component design system with multi-framework support",
    price: 899,
    originalPrice: 1299,
    category: "UI/UX Design",
    features: [
      { title: "Component Library", description: "500+ pre-designed components", included: true },
      { title: "Design Tokens", description: "Centralized design variables and themes", included: true },
      { title: "Figma & Sketch Files", description: "Editable design files", included: true },
      { title: "Code Components", description: "React, Vue, and Angular implementations", included: true },
      { title: "Documentation", description: "Complete usage guidelines and examples", included: true },
      { title: "Icon Library", description: "1000+ customizable icons", included: true }
    ],
    technologies: ["Figma", "Sketch", "React", "Vue", "Angular", "Storybook"],
    images: [{ url: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800", alt: "Design System", isPrimary: true }],
    isActive: true,
    isFeatured: true,
    deliveryTime: "3-5 business days",
    customizationOptions: {
      available: true,
      description: "Custom color schemes, additional components, brand guidelines",
      additionalCost: 200
    },
    difficulty: "Beginner",
    supportIncluded: true,
    supportDuration: "30 days",
    sales: 156,
    views: 3421,
    rating: { average: 4.9, count: 167 }
  },

  // Backend APIs - Microservices
  {
    title: "Microservices Architecture Template",
    description: "Production-ready microservices architecture with Docker containers, API Gateway, service discovery, distributed logging, monitoring, and CI/CD pipeline setup.",
    shortDescription: "Complete microservices setup with Docker and monitoring",
    price: 1599,
    category: "Backend APIs",
    features: [
      { title: "API Gateway", description: "Centralized routing and rate limiting", included: true },
      { title: "Service Discovery", description: "Automatic service registration and discovery", included: true },
      { title: "Docker Containers", description: "Containerized services with Docker Compose", included: true },
      { title: "Distributed Logging", description: "Centralized logging with ELK stack", included: true },
      { title: "Monitoring & Metrics", description: "Prometheus and Grafana dashboards", included: true },
      { title: "CI/CD Pipeline", description: "Automated deployment with GitHub Actions", included: true }
    ],
    technologies: ["Node.js", "Docker", "Kubernetes", "Nginx", "Redis", "MongoDB", "Prometheus"],
    images: [{ url: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800", alt: "Microservices", isPrimary: true }],
    isActive: true,
    isFeatured: false,
    deliveryTime: "8-12 business days",
    customizationOptions: {
      available: true,
      description: "Additional services, cloud deployment, security enhancements",
      additionalCost: 500
    },
    difficulty: "Expert",
    supportIncluded: true,
    supportDuration: "60 days",
    sales: 34,
    views: 987,
    rating: { average: 4.8, count: 41 }
  },

  // Landing Pages
  {
    title: "High-Converting SaaS Landing Pages",
    description: "Collection of 12 high-converting landing page templates specifically designed for SaaS products. Includes A/B testing variations, mobile-responsive designs, and conversion optimization.",
    shortDescription: "12 SaaS landing page templates with A/B testing variants",
    price: 299,
    originalPrice: 499,
    category: "Landing Pages",
    features: [
      { title: "12 Landing Templates", description: "Diverse designs for different SaaS niches", included: true },
      { title: "A/B Test Variations", description: "Multiple versions for testing", included: true },
      { title: "Mobile Responsive", description: "Perfect mobile optimization", included: true },
      { title: "Conversion Optimized", description: "Based on proven conversion patterns", included: true },
      { title: "Easy Customization", description: "Simple HTML/CSS structure", included: true },
      { title: "Analytics Integration", description: "Google Analytics and tracking setup", included: true }
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "GSAP", "AOS"],
    images: [{ url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800", alt: "Landing Pages", isPrimary: true }],
    isActive: true,
    isFeatured: false,
    deliveryTime: "1-2 business days",
    customizationOptions: {
      available: true,
      description: "Custom branding, additional pages, React/Vue conversion",
      additionalCost: 100
    },
    difficulty: "Beginner",
    supportIncluded: true,
    supportDuration: "14 days",
    sales: 234,
    views: 4567,
    rating: { average: 4.5, count: 198 }
  },

  // Custom Development Services
  {
    title: "Custom CRM Development Service",
    description: "Fully customized Customer Relationship Management system tailored to your business needs. Includes lead management, sales pipeline, customer communications, and detailed analytics.",
    shortDescription: "Fully customized CRM system built for your specific needs",
    price: 4999,
    category: "Custom Development",
    features: [
      { title: "Lead Management", description: "Complete lead capture and nurturing system", included: true },
      { title: "Sales Pipeline", description: "Visual sales process management", included: true },
      { title: "Customer Communications", description: "Email integration and communication history", included: true },
      { title: "Advanced Analytics", description: "Sales reports and customer insights", included: true },
      { title: "Custom Integrations", description: "Connect with your existing tools", included: true },
      { title: "User Management", description: "Role-based access control", included: true }
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "Redis", "Docker", "AWS"],
    images: [{ url: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=800", alt: "CRM System", isPrimary: true }],
    isActive: true,
    isFeatured: true,
    deliveryTime: "21-30 business days",
    customizationOptions: {
      available: true,
      description: "This is a fully custom service - everything is tailored to your needs",
      additionalCost: 0
    },
    difficulty: "Expert",
    supportIncluded: true,
    supportDuration: "180 days",
    sales: 12,
    views: 567,
    rating: { average: 5.0, count: 15 }
  },

  // Consulting Services
  {
    title: "Technical Architecture Consulting",
    description: "Expert consultation on software architecture, technology stack selection, scalability planning, and best practices. Includes system design review, performance optimization recommendations, and implementation roadmap.",
    shortDescription: "Expert technical architecture and scalability consulting",
    price: 1999,
    category: "Consulting",
    features: [
      { title: "Architecture Review", description: "Complete system architecture analysis", included: true },
      { title: "Technology Assessment", description: "Evaluate current and recommended tech stack", included: true },
      { title: "Scalability Planning", description: "Growth and scaling strategies", included: true },
      { title: "Performance Optimization", description: "Identify and fix bottlenecks", included: true },
      { title: "Implementation Roadmap", description: "Step-by-step improvement plan", included: true },
      { title: "Best Practices Guide", description: "Custom guidelines for your team", included: true }
    ],
    technologies: ["System Design", "Cloud Architecture", "Microservices", "Database Design", "DevOps"],
    images: [{ url: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800", alt: "Technical Consulting", isPrimary: true }],
    isActive: true,
    isFeatured: false,
    deliveryTime: "5-7 business days",
    customizationOptions: {
      available: true,
      description: "Additional follow-up sessions, team training, implementation support",
      additionalCost: 500
    },
    difficulty: "Expert",
    supportIncluded: true,
    supportDuration: "30 days",
    sales: 23,
    views: 678,
    rating: { average: 4.9, count: 28 }
  },

  // Web Applications - E-learning
  {
    title: "Online Learning Management System",
    description: "Complete LMS with course creation tools, student management, progress tracking, quizzes, certificates, and payment integration. Includes instructor dashboard and student portal.",
    shortDescription: "Full-featured LMS with courses, quizzes, and certificates",
    price: 2799,
    category: "Web Applications",
    features: [
      { title: "Course Builder", description: "Drag-and-drop course creation interface", included: true },
      { title: "Student Management", description: "Enrollment, progress tracking, grades", included: true },
      { title: "Interactive Quizzes", description: "Multiple question types and auto-grading", included: true },
      { title: "Certificate Generation", description: "Automatic certificate creation and delivery", included: true },
      { title: "Payment Integration", description: "Stripe integration for course purchases", included: true },
      { title: "Discussion Forums", description: "Course-specific community features", included: true },
      { title: "Mobile Learning", description: "Responsive design for mobile learning", included: true }
    ],
    technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Stripe", "AWS S3"],
    images: [{ url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800", alt: "Learning Management System", isPrimary: true }],
    isActive: true,
    isFeatured: true,
    deliveryTime: "16-20 business days",
    customizationOptions: {
      available: true,
      description: "Custom branding, additional integrations, advanced analytics",
      additionalCost: 700
    },
    difficulty: "Advanced",
    supportIncluded: true,
    supportDuration: "90 days",
    sales: 76,
    views: 1892,
    rating: { average: 4.7, count: 82 }
  }
];

// Function to seed demo products
async function seedDemoProducts() {
  try {
    console.log('🌱 Starting demo products seeding...');
    
    // Add created user ID (using the existing admin user)
    const adminUserId = new mongoose.Types.ObjectId("68c7d70b98a2f4a3b2122125");
    
    const productsWithUser = demoProducts.map(product => ({
      ...product,
      createdBy: adminUserId,
      seoMetadata: {
        keywords: product.technologies || []
      }
    }));

    // Insert products
    const insertedProducts = await Product.insertMany(productsWithUser);
    
    console.log(`✅ Successfully seeded ${insertedProducts.length} demo products!`);
    console.log('📊 Products by category:');
    
    // Count products by category
    const categoryCounts = {};
    insertedProducts.forEach(product => {
      categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
    });
    
    Object.entries(categoryCounts).forEach(([category, count]) => {
      console.log(`   ${category}: ${count} products`);
    });
    
    console.log('🎉 Demo seeding completed successfully!');
    console.log(`💰 Price range: $${Math.min(...insertedProducts.map(p => p.price))} - $${Math.max(...insertedProducts.map(p => p.price))}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding demo products:', error);
    process.exit(1);
  }
}

// Check if this script is being run directly
if (require.main === module) {
  seedDemoProducts();
}

module.exports = { seedDemoProducts, demoProducts };