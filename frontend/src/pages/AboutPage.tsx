import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Styled Components
const PageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl};
`;

const Hero = styled(motion.section)`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  padding: ${props => props.theme.spacing.xl} 0;
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: ${props => props.theme.fonts.weights.bold};
  background: linear-gradient(135deg, ${props => props.theme.colors.primary.main}, ${props => props.theme.colors.secondary.main});
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const HeroSubtitle = styled(motion.p)`
  font-size: ${props => props.theme.fonts.sizes.xl};
  color: ${props => props.theme.colors.text.secondary};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Section = styled(motion.section)`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.fonts.sizes.h2};
  font-weight: ${props => props.theme.fonts.weights.bold};
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.lg};
  text-align: center;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.lg};
  }
`;

const ContentCard = styled(motion.div)`
  background: white;
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  text-align: center;
`;

const CardIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const CardTitle = styled.h3`
  font-size: ${props => props.theme.fonts.sizes.lg};
  font-weight: ${props => props.theme.fonts.weights.semibold};
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const CardText = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  line-height: 1.6;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin: ${props => props.theme.spacing.xl} 0;
`;

const StatCard = styled(motion.div)`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary.main}, ${props => props.theme.colors.secondary.main});
  color: white;
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: ${props => props.theme.fonts.weights.bold};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const StatLabel = styled.div`
  font-size: ${props => props.theme.fonts.sizes.body};
  opacity: 0.9;
`;

const TeamSection = styled.div`
  text-align: center;
  background: ${props => props.theme.colors.background.secondary};
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  margin: ${props => props.theme.spacing.xl} 0;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing.lg};
`;

const TeamMember = styled(motion.div)`
  background: white;
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.lg};
  text-align: center;
  box-shadow: ${props => props.theme.shadows.sm};
`;

const MemberAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary.light}, ${props => props.theme.colors.secondary.light});
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin: 0 auto ${props => props.theme.spacing.md};
`;

const MemberName = styled.h4`
  font-size: ${props => props.theme.fonts.sizes.lg};
  font-weight: ${props => props.theme.fonts.weights.semibold};
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 0.25rem;
`;

const MemberRole = styled.p`
  color: ${props => props.theme.colors.primary.main};
  font-weight: ${props => props.theme.fonts.weights.medium};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const MemberBio = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  font-size: ${props => props.theme.fonts.sizes.sm};
  line-height: 1.5;
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing.lg};
`;

const ValueCard = styled(motion.div)`
  background: white;
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  border-left: 4px solid ${props => props.theme.colors.primary.main};
  box-shadow: ${props => props.theme.shadows.sm};
`;

const ValueTitle = styled.h4`
  font-size: ${props => props.theme.fonts.sizes.lg};
  font-weight: ${props => props.theme.fonts.weights.semibold};
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.md};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ValueText = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  line-height: 1.6;
`;

const CTASection = styled(motion.div)`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary.main}, ${props => props.theme.colors.secondary.main});
  color: white;
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  text-align: center;
  margin-top: ${props => props.theme.spacing.xl};
`;

const CTATitle = styled.h3`
  font-size: ${props => props.theme.fonts.sizes.h3};
  font-weight: ${props => props.theme.fonts.weights.bold};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const CTAText = styled.p`
  font-size: ${props => props.theme.fonts.sizes.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
  opacity: 0.9;
`;

const CTAButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  background: white;
  color: ${props => props.theme.colors.primary.main};
  text-decoration: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: ${props => props.theme.fonts.weights.semibold};
  font-size: ${props => props.theme.fonts.sizes.lg};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const AboutPage: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <PageWrapper>
      <Hero
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <HeroTitle variants={itemVariants}>
          🚀 About DevNestStudios
        </HeroTitle>
        <HeroSubtitle variants={itemVariants}>
          We're a passionate team of developers, designers, and innovators dedicated to creating 
          exceptional digital experiences that drive business growth and user satisfaction.
        </HeroSubtitle>
      </Hero>

      <StatsGrid>
        <StatCard
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          <StatNumber>500+</StatNumber>
          <StatLabel>Projects Completed</StatLabel>
        </StatCard>
        <StatCard
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
        >
          <StatNumber>200+</StatNumber>
          <StatLabel>Happy Clients</StatLabel>
        </StatCard>
        <StatCard
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
        >
          <StatNumber>5+</StatNumber>
          <StatLabel>Years Experience</StatLabel>
        </StatCard>
        <StatCard
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
        >
          <StatNumber>24/7</StatNumber>
          <StatLabel>Support</StatLabel>
        </StatCard>
      </StatsGrid>

      <Section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <SectionTitle>💡 What We Do</SectionTitle>
        <ContentGrid>
          <ContentCard
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ y: -5 }}
          >
            <CardIcon>🌐</CardIcon>
            <CardTitle>Web Development</CardTitle>
            <CardText>
              We create stunning, responsive websites and web applications using the latest 
              technologies like React, Node.js, and modern frameworks that deliver exceptional 
              user experiences.
            </CardText>
          </ContentCard>
          <ContentCard
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{ y: -5 }}
          >
            <CardIcon>📱</CardIcon>
            <CardTitle>Mobile Applications</CardTitle>
            <CardText>
              Our mobile development expertise spans across iOS and Android platforms, 
              creating native and cross-platform apps that engage users and drive business success.
            </CardText>
          </ContentCard>
          <ContentCard
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            whileHover={{ y: -5 }}
          >
            <CardIcon>🎨</CardIcon>
            <CardTitle>UI/UX Design</CardTitle>
            <CardText>
              We design intuitive and beautiful user interfaces that not only look great but 
              provide seamless user experiences that convert visitors into loyal customers.
            </CardText>
          </ContentCard>
          <ContentCard
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            whileHover={{ y: -5 }}
          >
            <CardIcon>🛒</CardIcon>
            <CardTitle>E-commerce Solutions</CardTitle>
            <CardText>
              From concept to launch, we build comprehensive e-commerce platforms that help 
              businesses sell online effectively with secure payment processing and inventory management.
            </CardText>
          </ContentCard>
        </ContentGrid>
      </Section>

      <Section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <SectionTitle>🎯 Our Values</SectionTitle>
        <ValuesGrid>
          <ValueCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{ scale: 1.02 }}
          >
            <ValueTitle>🚀 Innovation</ValueTitle>
            <ValueText>
              We stay ahead of the curve by embracing new technologies and methodologies, 
              ensuring our clients always receive cutting-edge solutions.
            </ValueText>
          </ValueCard>
          <ValueCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            whileHover={{ scale: 1.02 }}
          >
            <ValueTitle>💎 Quality</ValueTitle>
            <ValueText>
              Every project we deliver meets the highest standards of code quality, design excellence, 
              and performance optimization.
            </ValueText>
          </ValueCard>
          <ValueCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <ValueTitle>🤝 Collaboration</ValueTitle>
            <ValueText>
              We believe in working closely with our clients as partners, ensuring transparent 
              communication and shared success throughout the project lifecycle.
            </ValueText>
          </ValueCard>
        </ValuesGrid>
      </Section>

      <TeamSection>
        <SectionTitle>👥 Meet Our Team</SectionTitle>
        <TeamGrid>
          <TeamMember
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            whileHover={{ y: -5 }}
          >
            <MemberAvatar>👨‍💻</MemberAvatar>
            <MemberName>Alex Johnson</MemberName>
            <MemberRole>Lead Developer</MemberRole>
            <MemberBio>
              Full-stack developer with 8+ years of experience in React, Node.js, and cloud technologies. 
              Passionate about creating scalable and efficient solutions.
            </MemberBio>
          </TeamMember>
          <TeamMember
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            whileHover={{ y: -5 }}
          >
            <MemberAvatar>👩‍🎨</MemberAvatar>
            <MemberName>Sarah Chen</MemberName>
            <MemberRole>UI/UX Designer</MemberRole>
            <MemberBio>
              Creative designer specializing in user experience and interface design. Expert in 
              creating beautiful, functional designs that users love.
            </MemberBio>
          </TeamMember>
          <TeamMember
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            whileHover={{ y: -5 }}
          >
            <MemberAvatar>👨‍💼</MemberAvatar>
            <MemberName>Mike Rodriguez</MemberName>
            <MemberRole>Project Manager</MemberRole>
            <MemberBio>
              Experienced project manager ensuring smooth delivery of projects on time and within budget. 
              Excellent at client communication and team coordination.
            </MemberBio>
          </TeamMember>
        </TeamGrid>
      </TeamSection>

      <CTASection
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
      >
        <CTATitle>Ready to Start Your Project?</CTATitle>
        <CTAText>
          Let's turn your ideas into reality. Get in touch with us today and let's build something amazing together!
        </CTAText>
        <CTAButton
          href="/contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started 🚀
        </CTAButton>
      </CTASection>
    </PageWrapper>
  );
};

export default AboutPage;