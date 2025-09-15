import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { apiService } from '../services/api';

// Types
interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
  phone?: string;
}

// Styled Components
const PageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl};
`;

const Header = styled(motion.section)`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: ${props => props.theme.fonts.weights.bold};
  background: linear-gradient(135deg, ${props => props.theme.colors.primary.main}, ${props => props.theme.colors.secondary.main});
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Subtitle = styled(motion.p)`
  font-size: ${props => props.theme.fonts.sizes.xl};
  color: ${props => props.theme.colors.text.secondary};
  max-width: 600px;
  margin: 0 auto ${props => props.theme.spacing.xl};
  line-height: 1.6;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.lg};
  }
`;

const ContactInfoSection = styled(motion.div)`
  background: white;
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.sm};
  height: fit-content;
`;

const ContactFormSection = styled(motion.div)`
  background: white;
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.sm};
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.fonts.sizes.h3};
  font-weight: ${props => props.theme.fonts.weights.bold};
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
  padding: ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.background.secondary};
  border-radius: ${props => props.theme.borderRadius.md};
  border-left: 4px solid ${props => props.theme.colors.primary.main};
`;

const ContactIcon = styled.div`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.primary.main};
  margin-top: 0.25rem;
`;

const ContactDetails = styled.div`
  flex: 1;
`;

const ContactLabel = styled.h3`
  font-size: ${props => props.theme.fonts.sizes.body};
  font-weight: ${props => props.theme.fonts.weights.semibold};
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 0.25rem;
`;

const ContactValue = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  margin: 0;
  line-height: 1.5;
`;

const ContactLink = styled.a`
  color: ${props => props.theme.colors.primary.main};
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.md};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  ${props => props.fullWidth && 'grid-column: 1 / -1;'}
`;

const Label = styled.label`
  font-weight: ${props => props.theme.fonts.weights.medium};
  color: ${props => props.theme.colors.text.primary};
  font-size: ${props => props.theme.fonts.sizes.sm};
`;

const Input = styled.input<{ error?: boolean }>`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.error ? props.theme.colors.error.main : props.theme.colors.border.light};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fonts.sizes.body};
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.error ? props.theme.colors.error.main : props.theme.colors.primary.main};
    box-shadow: 0 0 0 3px ${props => props.error ? props.theme.colors.error.main + '20' : props.theme.colors.primary.main + '20'};
  }
`;

const Textarea = styled.textarea<{ error?: boolean }>`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.error ? props.theme.colors.error.main : props.theme.colors.border.light};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fonts.sizes.body};
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.error ? props.theme.colors.error.main : props.theme.colors.primary.main};
    box-shadow: 0 0 0 3px ${props => props.error ? props.theme.colors.error.main + '20' : props.theme.colors.primary.main + '20'};
  }
`;

const ErrorMessage = styled.span`
  color: ${props => props.theme.colors.error.main};
  font-size: ${props => props.theme.fonts.sizes.sm};
`;

const SubmitButton = styled(motion.button)`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.primary.main};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fonts.sizes.lg};
  font-weight: ${props => props.theme.fonts.weights.semibold};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.primary.dark};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled(motion.div)`
  background: ${props => props.theme.colors.success.light}20;
  color: ${props => props.theme.colors.success.main};
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.md};
  border-left: 4px solid ${props => props.theme.colors.success.main};
  margin-bottom: ${props => props.theme.spacing.lg};
  text-align: center;
`;

const OfficeHours = styled.div`
  background: ${props => props.theme.colors.primary.light}10;
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing.lg};
`;

const HoursTitle = styled.h4`
  font-size: ${props => props.theme.fonts.sizes.body};
  font-weight: ${props => props.theme.fonts.weights.semibold};
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const HoursItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.text.secondary};
  font-size: ${props => props.theme.fonts.sizes.sm};
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
  background: ${props => props.theme.colors.primary.main};
  color: white;
  border-radius: 50%;
  text-decoration: none;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.primary.dark};
    transform: translateY(-2px);
  }
`;

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
    company: '',
    phone: '',
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (field: keyof ContactForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      
      const messageData = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        company: formData.company,
        phone: formData.phone,
        type: 'contact',
        priority: 'medium',
      };

      await apiService.messages.create(messageData);
      
      setShowSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        company: '',
        phone: '',
      });

      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error('Contact form submission error:', error);
      setErrors({ submit: 'Failed to send message. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <Header
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title>📞 Contact Us</Title>
        <Subtitle>
          Have a question, project idea, or just want to say hello? 
          We'd love to hear from you! Get in touch and let's start a conversation.
        </Subtitle>
      </Header>

      <ContentGrid>
        <ContactInfoSection
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SectionTitle>💬 Get in Touch</SectionTitle>
          
          <ContactItem>
            <ContactIcon>📧</ContactIcon>
            <ContactDetails>
              <ContactLabel>Email</ContactLabel>
              <ContactValue>
                <ContactLink href="mailto:hello@devneststudios.com">
                  hello@devneststudios.com
                </ContactLink>
              </ContactValue>
            </ContactDetails>
          </ContactItem>

          <ContactItem>
            <ContactIcon>📱</ContactIcon>
            <ContactDetails>
              <ContactLabel>Phone</ContactLabel>
              <ContactValue>
                <ContactLink href="tel:+1234567890">
                  +1 (234) 567-8900
                </ContactLink>
              </ContactValue>
            </ContactDetails>
          </ContactItem>

          <ContactItem>
            <ContactIcon>📍</ContactIcon>
            <ContactDetails>
              <ContactLabel>Office</ContactLabel>
              <ContactValue>
                123 Tech Street<br />
                Innovation District<br />
                San Francisco, CA 94105
              </ContactValue>
            </ContactDetails>
          </ContactItem>

          <ContactItem>
            <ContactIcon>🌍</ContactIcon>
            <ContactDetails>
              <ContactLabel>Remote Support</ContactLabel>
              <ContactValue>
                We work with clients worldwide and offer<br />
                remote consultation and development services.
              </ContactValue>
            </ContactDetails>
          </ContactItem>

          <OfficeHours>
            <HoursTitle>🕐 Office Hours</HoursTitle>
            <HoursItem>
              <span>Monday - Friday</span>
              <span>9:00 AM - 6:00 PM PST</span>
            </HoursItem>
            <HoursItem>
              <span>Saturday</span>
              <span>10:00 AM - 4:00 PM PST</span>
            </HoursItem>
            <HoursItem>
              <span>Sunday</span>
              <span>Closed</span>
            </HoursItem>
          </OfficeHours>

          <SocialLinks>
            <SocialLink href="#" target="_blank" rel="noopener noreferrer">
              💼
            </SocialLink>
            <SocialLink href="#" target="_blank" rel="noopener noreferrer">
              🐦
            </SocialLink>
            <SocialLink href="#" target="_blank" rel="noopener noreferrer">
              📘
            </SocialLink>
            <SocialLink href="#" target="_blank" rel="noopener noreferrer">
              📷
            </SocialLink>
          </SocialLinks>
        </ContactInfoSection>

        <ContactFormSection
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <SectionTitle>✉️ Send us a Message</SectionTitle>
          
          {showSuccess && (
            <SuccessMessage
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              🎉 Thank you for your message! We'll get back to you within 24 hours.
            </SuccessMessage>
          )}

          <Form onSubmit={handleSubmit}>
            <FormGrid>
              <FormGroup>
                <Label>Name *</Label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  error={!!errors.name}
                  placeholder="Your full name"
                />
                {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label>Email *</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  error={!!errors.email}
                  placeholder="your@email.com"
                />
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label>Company</Label>
                <Input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  placeholder="Your company (optional)"
                />
              </FormGroup>

              <FormGroup>
                <Label>Phone</Label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="(123) 456-7890"
                />
              </FormGroup>

              <FormGroup fullWidth>
                <Label>Subject *</Label>
                <Input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                  error={!!errors.subject}
                  placeholder="What's this about?"
                />
                {errors.subject && <ErrorMessage>{errors.subject}</ErrorMessage>}
              </FormGroup>

              <FormGroup fullWidth>
                <Label>Message *</Label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  error={!!errors.message}
                  placeholder="Tell us about your project, question, or how we can help you..."
                />
                {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
              </FormGroup>
            </FormGrid>

            {errors.submit && (
              <ErrorMessage style={{ textAlign: 'center', fontSize: '1rem' }}>
                {errors.submit}
              </ErrorMessage>
            )}

            <SubmitButton
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? 'Sending...' : 'Send Message 🚀'}
            </SubmitButton>
          </Form>
        </ContactFormSection>
      </ContentGrid>
    </PageWrapper>
  );
};

export default ContactPage;