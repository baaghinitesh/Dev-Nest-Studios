import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// Icons replaced with emojis for compatibility

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;



const HomeWrapper = styled.div`
  width: 100%;
`;

// Hero Section
const HeroSection = styled.section`
  min-height: 100vh;
  background: ${props => props.theme.colors.gradients.hero};
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="%23f0f0f0" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)" opacity="0.3"/></svg>');
    z-index: 1;
  }
`;

const HeroContainer = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing['4xl']};
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing['2xl']};
    text-align: center;
  }
`;

const HeroContent = styled.div``;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: ${props => props.theme.fonts.weights.bold};
  background: linear-gradient(135deg, ${props => props.theme.colors.primary.main}, ${props => props.theme.colors.secondary.main});
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: ${props => props.theme.spacing.lg};
  line-height: 1.1;
`;

const HeroSubtitle = styled(motion.p)`
  font-size: ${props => props.theme.fonts.sizes.xl};
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: ${props => props.theme.spacing['2xl']};
  line-height: ${props => props.theme.fonts.lineHeights.relaxed};
`;

const HeroButtons = styled(motion.div)`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  flex-wrap: wrap;
`;

const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing['2xl']};
  background: ${props => props.theme.colors.primary.main};
  color: white;
  text-decoration: none;
  border-radius: ${props => props.theme.borderRadius.lg};
  font-size: ${props => props.theme.fonts.sizes.lg};
  font-weight: ${props => props.theme.fonts.weights.semibold};
  transition: ${props => props.theme.transitions.all};
  box-shadow: ${props => props.theme.shadows.lg};

  &:hover {
    background: ${props => props.theme.colors.primary.dark};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.xl};
    color: white;
    text-decoration: none;
  }
`;

const SecondaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing['2xl']};
  background: transparent;
  color: ${props => props.theme.colors.primary.main};
  text-decoration: none;
  border: 2px solid ${props => props.theme.colors.primary.main};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-size: ${props => props.theme.fonts.sizes.lg};
  font-weight: ${props => props.theme.fonts.weights.semibold};
  transition: ${props => props.theme.transitions.all};

  &:hover {
    background: ${props => props.theme.colors.primary.main};
    color: white;
    text-decoration: none;
  }
`;

const HeroVisual = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FloatingCard = styled(motion.div)<{ delay?: number }>`
  background: white;
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.xl};
  animation: ${float} 3s ease-in-out infinite;
  animation-delay: ${props => props.delay || 0}s;
`;

// Features Section
const FeaturesSection = styled.section`
  padding: ${props => props.theme.spacing['6xl']} 0;
  background: ${props => props.theme.colors.background.secondary};
`;

const Container = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.fonts.sizes.h2};
  font-weight: ${props => props.theme.fonts.weights.bold};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const SectionSubtitle = styled.p`
  font-size: ${props => props.theme.fonts.sizes.lg};
  color: ${props => props.theme.colors.text.secondary};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing['4xl']};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing['2xl']};
`;

const FeatureCard = styled(motion.div)`
  background: white;
  padding: ${props => props.theme.spacing['2xl']};
  border-radius: ${props => props.theme.borderRadius.xl};
  box-shadow: ${props => props.theme.shadows.md};
  text-align: center;
  transition: ${props => props.theme.transitions.all};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.xl};
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  background: ${props => props.theme.colors.gradients.primary};
  border-radius: ${props => props.theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${props => props.theme.spacing.lg};
  font-size: ${props => props.theme.fonts.sizes['2xl']};
  color: white;
`;

const FeatureTitle = styled.h3`
  font-size: ${props => props.theme.fonts.sizes.xl};
  font-weight: ${props => props.theme.fonts.weights.semibold};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const FeatureDescription = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  line-height: ${props => props.theme.fonts.lineHeights.relaxed};
`;

// Categories Section
const CategoriesSection = styled.section`
  padding: ${props => props.theme.spacing['6xl']} 0;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.xl};
`;

const CategoryCard = styled(motion.div)`
  background: white;
  border-radius: ${props => props.theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.md};
  transition: ${props => props.theme.transitions.all};
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.xl};
  }
`;

const CategoryImage = styled.div<{ bgColor: string }>`
  height: 150px;
  background: ${props => props.bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.fonts.sizes['4xl']};
  color: white;
`;

const CategoryContent = styled.div`
  padding: ${props => props.theme.spacing.xl};
`;

const CategoryTitle = styled.h3`
  font-size: ${props => props.theme.fonts.sizes.lg};
  font-weight: ${props => props.theme.fonts.weights.semibold};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const CategoryDescription = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  font-size: ${props => props.theme.fonts.sizes.sm};
`;

// Testimonials Section
const TestimonialsSection = styled.section`
  padding: ${props => props.theme.spacing['6xl']} 0;
  background: ${props => props.theme.colors.background.secondary};
`;

const TestimonialsContainer = styled.div`
  overflow: hidden;
  position: relative;
`;

const TestimonialsTrack = styled(motion.div)`
  display: flex;
  gap: ${props => props.theme.spacing.xl};
`;

const TestimonialCard = styled.div`
  background: white;
  padding: ${props => props.theme.spacing['2xl']};
  border-radius: ${props => props.theme.borderRadius.xl};
  box-shadow: ${props => props.theme.shadows.md};
  min-width: 400px;
  flex-shrink: 0;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    min-width: 300px;
  }
`;

const TestimonialContent = styled.p`
  font-style: italic;
  margin-bottom: ${props => props.theme.spacing.lg};
  line-height: ${props => props.theme.fonts.lineHeights.relaxed};
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const AuthorAvatar = styled.div`
  width: 50px;
  height: 50px;
  background: ${props => props.theme.colors.gradients.primary};
  border-radius: ${props => props.theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: ${props => props.theme.fonts.weights.bold};
`;

const AuthorInfo = styled.div``;

const AuthorName = styled.div`
  font-weight: ${props => props.theme.fonts.weights.semibold};
`;

const AuthorRole = styled.div`
  font-size: ${props => props.theme.fonts.sizes.sm};
  color: ${props => props.theme.colors.text.secondary};
`;

const Stars = styled.div`
  display: flex;
  gap: 2px;
  margin-bottom: ${props => props.theme.spacing.sm};
  color: #ffd700;
`;

const HomePage: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const features = [
    {
      icon: '💻',
      title: "Web Development",
      description: "Custom web applications built with modern technologies and best practices."
    },
    {
      icon: '📱',
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications for iOS and Android."
    },
    {
      icon: '🛒',
      title: "E-commerce Solutions",
      description: "Complete online stores with payment integration and inventory management."
    },
    {
      icon: '🎨',
      title: "UI/UX Design",
      description: "Beautiful and intuitive user interfaces that enhance user experience."
    },
    {
      icon: '🚀',
      title: "Digital Marketing",
      description: "SEO optimization and digital marketing strategies to grow your business."
    },
    {
      icon: '⭐',
      title: "Premium Support",
      description: "24/7 support and maintenance to keep your applications running smoothly."
    }
  ];

  const categories = [
    {
      title: "Web Applications",
      description: "Full-stack web solutions",
      color: "#667eea",
      icon: "💻"
    },
    {
      title: "Mobile Apps",
      description: "iOS & Android applications",
      color: "#f093fb",
      icon: "📱"
    },
    {
      title: "E-commerce",
      description: "Online store solutions",
      color: "#4facfe",
      icon: "🛒"
    },
    {
      title: "UI/UX Design",
      description: "Beautiful user interfaces",
      color: "#43e97b",
      icon: "🎨"
    }
  ];

  const testimonials = [
    {
      content: "DevNestStudios delivered an amazing e-commerce platform that exceeded our expectations. The team was professional, responsive, and delivered on time.",
      author: "Sarah Johnson",
      role: "CEO, TechStart Inc.",
      rating: 5
    },
    {
      content: "The mobile app they developed for us has been a game-changer. User engagement increased by 200% after launch. Highly recommended!",
      author: "Mike Chen",
      role: "Product Manager, InnovateCorp",
      rating: 5
    },
    {
      content: "Outstanding work on our company website. The design is modern, responsive, and our customers love the user experience.",
      author: "Emily Davis",
      role: "Marketing Director, GrowthLab",
      rating: 5
    }
  ];

  // Auto-scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <HomeWrapper>
      {/* Hero Section */}
      <HeroSection>
        <HeroContainer>
          <HeroContent>
            <HeroTitle
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Build Your Digital Future
            </HeroTitle>
            <HeroSubtitle
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We create innovative digital solutions that help businesses thrive. 
              From web applications to mobile apps, we turn your ideas into reality.
            </HeroSubtitle>
            <HeroButtons
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <PrimaryButton to="/products">
                Explore Products →
              </PrimaryButton>
              <SecondaryButton to="/hire">
                ▶ Hire Us
              </SecondaryButton>
            </HeroButtons>
          </HeroContent>

          <HeroVisual
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div style={{ position: 'relative' }}>
              <FloatingCard delay={0}>
                <span style={{fontSize: '40px'}}>💻</span>
              </FloatingCard>
              <FloatingCard delay={1} style={{ position: 'absolute', top: '50px', left: '100px' }}>
                <span style={{fontSize: '40px'}}>📱</span>
              </FloatingCard>
              <FloatingCard delay={2} style={{ position: 'absolute', top: '100px', left: '-50px' }}>
                <span style={{fontSize: '40px'}}>🛒</span>
              </FloatingCard>
            </div>
          </HeroVisual>
        </HeroContainer>
      </HeroSection>

      {/* Features Section */}
      <FeaturesSection>
        <Container>
          <SectionTitle>Why Choose DevNestStudios?</SectionTitle>
          <SectionSubtitle>
            We combine technical expertise with creative innovation to deliver 
            exceptional digital solutions that drive business growth.
          </SectionSubtitle>
          
          <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <FeatureIcon><span style={{fontSize: '2rem'}}>{feature.icon}</span></FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </Container>
      </FeaturesSection>

      {/* Categories Section */}
      <CategoriesSection>
        <Container>
          <SectionTitle>Our Product Categories</SectionTitle>
          <SectionSubtitle>
            Discover our range of digital products and services tailored to meet your business needs.
          </SectionSubtitle>
          
          <CategoriesGrid>
            {categories.map((category, index) => (
              <CategoryCard
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <CategoryImage bgColor={category.color}>
                  {category.icon}
                </CategoryImage>
                <CategoryContent>
                  <CategoryTitle>{category.title}</CategoryTitle>
                  <CategoryDescription>{category.description}</CategoryDescription>
                </CategoryContent>
              </CategoryCard>
            ))}
          </CategoriesGrid>
        </Container>
      </CategoriesSection>

      {/* Testimonials Section */}
      <TestimonialsSection>
        <Container>
          <SectionTitle>What Our Clients Say</SectionTitle>
          <SectionSubtitle>
            Don't just take our word for it. Here's what our satisfied clients have to say about our work.
          </SectionSubtitle>
          
          <TestimonialsContainer>
            <TestimonialsTrack
              animate={{ x: -currentTestimonial * 420 }}
              transition={{ duration: 0.5 }}
            >
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index}>
                  <Stars>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} style={{color: '#ffd700'}}>★</span>
                    ))}
                  </Stars>
                  <TestimonialContent>
                    "{testimonial.content}"
                  </TestimonialContent>
                  <TestimonialAuthor>
                    <AuthorAvatar>
                      {testimonial.author.charAt(0)}
                    </AuthorAvatar>
                    <AuthorInfo>
                      <AuthorName>{testimonial.author}</AuthorName>
                      <AuthorRole>{testimonial.role}</AuthorRole>
                    </AuthorInfo>
                  </TestimonialAuthor>
                </TestimonialCard>
              ))}
            </TestimonialsTrack>
          </TestimonialsContainer>
        </Container>
      </TestimonialsSection>
    </HomeWrapper>
  );
};

export default HomePage;