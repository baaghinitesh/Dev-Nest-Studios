// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  isVerified: boolean;
  avatar?: string;
  phone?: string;
  address?: Address;
  preferences?: UserPreferences;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

export interface UserPreferences {
  newsletter: boolean;
  notifications: boolean;
}

// Product types
export interface Product {
  _id: string;
  id?: string; // For backward compatibility
  title: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  tags: string[];
  features: ProductFeature[];
  technologies: string[];
  images: ProductImage[];
  demoUrl?: string;
  githubUrl?: string;
  downloadUrl?: string;
  isActive: boolean;
  isFeatured: boolean;
  stock?: number;
  deliveryTime: string;
  customizationOptions: CustomizationOptions;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  supportIncluded: boolean;
  supportDuration: string;
  createdBy: User;
  sales: number;
  views: number;
  rating: Rating;
  reviews: Review[];
  seoMetadata?: SEOMetadata;
  createdAt: Date;
  updatedAt: Date;
  // Virtual fields
  discountPercentage?: number;
  isOnSale?: boolean;
}

export type ProductCategory = 
  | 'Web Applications'
  | 'Mobile Apps'
  | 'E-commerce'
  | 'Landing Pages'
  | 'Backend APIs'
  | 'UI/UX Design'
  | 'Custom Development'
  | 'Consulting'
  | 'Other';

export interface ProductFeature {
  title: string;
  description?: string;
  included: boolean;
}

export interface ProductImage {
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface CustomizationOptions {
  available: boolean;
  description?: string;
  additionalCost: number;
}

export interface Rating {
  average: number;
  count: number;
}

export interface Review {
  id: string;
  user: User;
  rating: number;
  comment?: string;
  createdAt: Date;
}

export interface SEOMetadata {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
}

// Product filtering and search types
export interface ProductFilters {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  tags?: string;
  technologies?: string;
  sort?: 'newest' | 'price_low' | 'price_high' | 'rating' | 'popular';
  page?: number;
  limit?: number;
  featured?: boolean;
}

// Order types
export interface Order {
  id: string;
  orderNumber: string;
  user: User;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  currency: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  paymentDetails?: PaymentDetails;
  billingAddress: BillingAddress;
  deliveryAddress?: BillingAddress;
  timeline: OrderTimeline[];
  notes: OrderNote[];
  estimatedDelivery?: Date;
  actualDelivery?: Date;
  deliveryFiles: DeliveryFile[];
  feedback?: OrderFeedback;
  refundDetails?: RefundDetails;
  metadata?: OrderMetadata;
  createdAt: Date;
  updatedAt: Date;
  // Virtual fields
  orderAge?: number;
  isOverdue?: boolean;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
  customizationRequests?: string;
  deliveryPreferences?: string;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'in_development'
  | 'testing'
  | 'completed'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type PaymentStatus = 
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'refunded';

export type PaymentMethod = 
  | 'card'
  | 'paypal'
  | 'bank_transfer'
  | 'crypto'
  | 'other';

export interface PaymentDetails {
  transactionId?: string;
  paymentIntentId?: string;
  last4?: string;
  brand?: string;
}

export interface BillingAddress {
  name: string;
  email: string;
  phone?: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface OrderTimeline {
  status: string;
  description?: string;
  timestamp: Date;
  updatedBy?: User;
}

export interface OrderNote {
  content: string;
  author: User;
  isInternal: boolean;
  createdAt: Date;
}

export interface DeliveryFile {
  name: string;
  url: string;
  size?: number;
  type?: string;
  uploadedAt: Date;
}

export interface OrderFeedback {
  rating: number;
  comment?: string;
  submittedAt: Date;
}

export interface RefundDetails {
  reason?: string;
  amount?: number;
  processedAt?: Date;
  refundId?: string;
}

export interface OrderMetadata {
  source?: string;
  userAgent?: string;
  ipAddress?: string;
  referrer?: string;
}

// Message types
export interface Message {
  id: string;
  type: MessageType;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  priority: Priority;
  status: MessageStatus;
  assignedTo?: User;
  projectDetails?: ProjectDetails;
  supportDetails?: SupportDetails;
  tags: string[];
  responses: MessageResponse[];
  metadata?: MessageMetadata;
  readAt?: Date;
  respondedAt?: Date;
  resolvedAt?: Date;
  rating?: MessageRating;
  createdAt: Date;
  updatedAt: Date;
  // Virtual fields
  responseTime?: number;
  resolutionTime?: number;
  ageInHours?: number;
}

export type MessageType = 
  | 'contact'
  | 'hire'
  | 'support'
  | 'feedback'
  | 'consultation';

export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export type MessageStatus = 
  | 'new'
  | 'read'
  | 'in_progress'
  | 'responded'
  | 'resolved'
  | 'closed';

export interface ProjectDetails {
  budget?: {
    min?: number;
    max?: number;
    currency: string;
  };
  timeline?: string;
  projectType?: string;
  requirements?: string;
  technologies?: string[];
  features?: string[];
  deliverables?: string[];
  attachments?: Attachment[];
}

export interface SupportDetails {
  orderNumber?: string;
  productId?: string;
  issueType?: string;
  urgency?: Priority;
}

export interface MessageResponse {
  content: string;
  author: User;
  isInternal: boolean;
  timestamp: Date;
  attachments?: Attachment[];
}

export interface Attachment {
  name: string;
  url: string;
  size?: number;
  type?: string;
}

export interface MessageMetadata {
  source?: string;
  userAgent?: string;
  ipAddress?: string;
  referrer?: string;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
  };
}

export interface MessageRating {
  score: number;
  comment?: string;
  submittedAt: Date;
}

// Cart types
export interface CartItem {
  product: Product;
  quantity: number;
  customizationRequests?: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  itemCount: number;
}

// Authentication types
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// Form types
export interface ContactFormData {
  type: MessageType;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
}

export interface HireFormData extends ContactFormData {
  projectDetails: {
    budget?: {
      min?: number;
      max?: number;
    };
    timeline?: string;
    projectType?: string;
    requirements?: string;
    technologies?: string[];
    features?: string[];
  };
}

// API types
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalProducts?: number;
  totalOrders?: number;
  totalUsers?: number;
  totalMessages?: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface FilterOptions {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  tags?: string;
  technologies?: string;
  search?: string;
  featured?: boolean;
  sort?: 'price_low' | 'price_high' | 'rating' | 'popular' | 'newest';
  page?: number;
  limit?: number;
}

// Statistics types
export interface DashboardStats {
  totalProducts?: number;
  totalOrders?: number;
  totalUsers?: number;
  totalMessages?: number;
  totalRevenue?: number;
  pendingOrders?: number;
  completedOrders?: number;
  newMessages?: number;
  recentOrders?: Order[];
  recentMessages?: Message[];
  registrationTrend?: Array<{ _id: string; count: number }>;
  topCustomers?: Array<{ name: string; email: string; totalSpent: number; orderCount: number }>;
}