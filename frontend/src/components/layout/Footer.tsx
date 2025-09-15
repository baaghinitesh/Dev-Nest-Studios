import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// Icons replaced with emojis for compatibility

const FooterWrapper = styled.footer`
  background: ${props => props.theme.colors.background.dark};
  color: ${props => props.theme.colors.text.inverse};
  padding: ${props => props.theme.spacing['3xl']} 0 ${props => props.theme.spacing.xl};
  margin-top: auto;
`;

const Container = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing['2xl']};
  margin-bottom: ${props => props.theme.spacing['2xl']};
`;

const FooterSection = styled.div`
  h3 {
    color: ${props => props.theme.colors.text.inverse};
    font-size: ${props => props.theme.fonts.sizes.lg};
    font-weight: ${props => props.theme.fonts.weights.semibold};
    margin-bottom: ${props => props.theme.spacing.lg};
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    line-height: ${props => props.theme.fonts.lineHeights.relaxed};
    margin-bottom: ${props => props.theme.spacing.md};
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: ${props => props.theme.transitions.colors};

  &:hover {
    color: ${props => props.theme.colors.primary.light};
    text-decoration: none;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  color: rgba(255, 255, 255, 0.8);

  svg {
    color: ${props => props.theme.colors.primary.light};
    flex-shrink: 0;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.lg};
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  border-radius: ${props => props.theme.borderRadius.md};
  text-decoration: none;
  transition: ${props => props.theme.transitions.all};

  &:hover {
    background: ${props => props.theme.colors.primary.main};
    color: white;
    transform: translateY(-2px);
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: ${props => props.theme.spacing.xl};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.fonts.sizes.sm};
  color: rgba(255, 255, 255, 0.6);

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  margin: 0;
`;

const LegalLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};

  a {
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    transition: ${props => props.theme.transitions.colors};

    &:hover {
      color: ${props => props.theme.colors.primary.light};
    }
  }
`;

const Newsletter = styled.div`
  h4 {
    color: ${props => props.theme.colors.text.inverse};
    font-size: ${props => props.theme.fonts.sizes.base};
    font-weight: ${props => props.theme.fonts.weights.medium};
    margin-bottom: ${props => props.theme.spacing.sm};
  }

  p {
    font-size: ${props => props.theme.fonts.sizes.sm};
    margin-bottom: ${props => props.theme.spacing.md};
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  gap: ${props => props.theme.spacing.sm};

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${props => props.theme.borderRadius.md};
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: ${props => props.theme.fonts.sizes.sm};

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary.light};
    background: rgba(255, 255, 255, 0.15);
  }
`;

const NewsletterButton = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.primary.main};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fonts.sizes.sm};
  font-weight: ${props => props.theme.fonts.weights.medium};
  cursor: pointer;
  transition: ${props => props.theme.transitions.all};

  &:hover {
    background: ${props => props.theme.colors.primary.dark};
  }
`;

const Footer: React.FC = () => {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription');
  };

  return (
    <FooterWrapper>
      <Container>
        <FooterContent>
          <FooterSection>
            <h3>DevNestStudios</h3>
            <p>
              We create innovative digital solutions that help businesses thrive in the modern world. 
              From web applications to mobile apps, we deliver quality products that exceed expectations.
            </p>
            <SocialLinks>
              <SocialLink href="https://github.com" target="_blank" rel="noopener noreferrer">
                🐙
              </SocialLink>
              <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                💼
              </SocialLink>
              <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                🐦
              </SocialLink>
              <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                📷
              </SocialLink>
            </SocialLinks>
          </FooterSection>

          <FooterSection>
            <h3>Quick Links</h3>
            <FooterLinks>
              <FooterLink to="/products">Products</FooterLink>
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
              <FooterLink to="/hire">Hire Us</FooterLink>
              <FooterLink to="/dashboard">Dashboard</FooterLink>
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <h3>Services</h3>
            <FooterLinks>
              <FooterLink to="/products?category=Web+Applications">Web Development</FooterLink>
              <FooterLink to="/products?category=Mobile+Apps">Mobile Apps</FooterLink>
              <FooterLink to="/products?category=E-commerce">E-commerce</FooterLink>
              <FooterLink to="/products?category=UI/UX+Design">UI/UX Design</FooterLink>
              <FooterLink to="/products?category=Custom+Development">Custom Development</FooterLink>
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <h3>Contact Info</h3>
            <ContactInfo>
              <ContactItem>
                ✉️
                <span>hello@devneststudios.com</span>
              </ContactItem>
              <ContactItem>
                📞
                <span>+1 (555) 123-4567</span>
              </ContactItem>
              <ContactItem>
                📍
                <span>123 Innovation Street<br />Tech City, TC 12345</span>
              </ContactItem>
            </ContactInfo>

            <Newsletter>
              <h4>Stay Updated</h4>
              <p>Subscribe to our newsletter for the latest updates and offers.</p>
              <NewsletterForm onSubmit={handleNewsletterSubmit}>
                <NewsletterInput
                  type="email"
                  placeholder="Enter your email"
                  required
                />
                <NewsletterButton type="submit">Subscribe</NewsletterButton>
              </NewsletterForm>
            </Newsletter>
          </FooterSection>
        </FooterContent>

        <FooterBottom>
          <Copyright>
            © {new Date().getFullYear()} DevNestStudios. All rights reserved.
          </Copyright>
          <LegalLinks>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </LegalLinks>
        </FooterBottom>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;