import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HireContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.secondary} 100%);
  color: white;
  padding: ${props => props.theme.spacing.xl} 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xxl};
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  margin-bottom: ${props => props.theme.spacing.md};
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.25rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.xxl};
  margin-bottom: ${props => props.theme.spacing.xxl};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.xl};
  }
`;

const ServicesSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: ${props => props.theme.spacing.lg};
  color: white;
`;

const ServiceCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.md};
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
`;

const ServiceName = styled.h3`
  font-size: 1.25rem;
  margin-bottom: ${props => props.theme.spacing.sm};
  color: #fff;
`;

const ServiceDescription = styled.p`
  opacity: 0.9;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const ServicePrice = styled.div`
  font-weight: bold;
  color: ${props => props.theme.colors.primary.main};
  font-size: 1.1rem;
`;

const FormSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: ${props => props.theme.spacing.xs};
  font-weight: 500;
  color: white;
`;

const Input = styled.input`
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: ${props => props.theme.borderRadius.sm};
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary.main};
    background: rgba(255, 255, 255, 0.15);
  }
`;

const Select = styled.select`
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: ${props => props.theme.borderRadius.sm};
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary.main};
    background: rgba(255, 255, 255, 0.15);
  }

  option {
    background: ${props => props.theme.colors.primary};
    color: white;
  }
`;

const Textarea = styled.textarea`
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: ${props => props.theme.borderRadius.sm};
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary.main};
    background: rgba(255, 255, 255, 0.15);
  }
`;

const SubmitButton = styled(motion.button)`
  background: ${props => props.theme.colors.primary.main};
  color: white;
  border: none;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primary.dark};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ProcessSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  margin-top: ${props => props.theme.spacing.xxl};
`;

const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing.lg};
`;

const ProcessStep = styled(motion.div)`
  text-align: center;
  padding: ${props => props.theme.spacing.lg};
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${props => props.theme.borderRadius.md};
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const StepNumber = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => props.theme.colors.primary.main};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 auto ${props => props.theme.spacing.md};
`;

const StepTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: ${props => props.theme.spacing.sm};
  color: white;
`;

const StepDescription = styled.p`
  opacity: 0.9;
`;

const HirePage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    budget: '',
    timeline: '',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = [
    {
      name: 'Web Development',
      description: 'Custom websites and web applications using modern technologies like React, Node.js, and more.',
      price: 'Starting from $2,500'
    },
    {
      name: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android.',
      price: 'Starting from $5,000'
    },
    {
      name: 'E-commerce Solutions',
      description: 'Complete online stores with payment processing, inventory management, and admin panels.',
      price: 'Starting from $3,500'
    },
    {
      name: 'UI/UX Design',
      description: 'User-centered design solutions that enhance user experience and drive conversions.',
      price: 'Starting from $1,500'
    },
    {
      name: 'API Development',
      description: 'RESTful APIs and backend services with proper documentation and testing.',
      price: 'Starting from $2,000'
    },
    {
      name: 'Consultation',
      description: 'Technical consultation and project planning to help you make informed decisions.',
      price: 'Starting from $150/hour'
    }
  ];

  const processSteps = [
    {
      title: 'Initial Consultation',
      description: 'We discuss your project requirements, goals, and timeline to understand your needs.'
    },
    {
      title: 'Project Planning',
      description: 'We create a detailed project plan with milestones, deliverables, and timelines.'
    },
    {
      title: 'Design & Development',
      description: 'Our team works on your project with regular updates and feedback sessions.'
    },
    {
      title: 'Testing & Launch',
      description: 'Thorough testing followed by deployment and post-launch support.'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would typically send the form data to your backend
      console.log('Form submitted:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Thank you for your inquiry! We\'ll get back to you within 24 hours.');
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        service: '',
        budget: '',
        timeline: '',
        description: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <HireContainer>
      <Container>
        <Header>
          <Title
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Hire DevNestStudios
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Ready to bring your digital vision to life? Let's collaborate and create something amazing together.
          </Subtitle>
        </Header>

        <ContentGrid>
          <ServicesSection>
            <SectionTitle>Our Services</SectionTitle>
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ServiceName>{service.name}</ServiceName>
                <ServiceDescription>{service.description}</ServiceDescription>
                <ServicePrice>{service.price}</ServicePrice>
              </ServiceCard>
            ))}
          </ServicesSection>

          <FormSection>
            <SectionTitle>Get Started</SectionTitle>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Your full name"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your.email@example.com"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="company">Company/Organization</Label>
                <Input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Your company name"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="service">Service Needed *</Label>
                <Select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a service</option>
                  <option value="web-development">Web Development</option>
                  <option value="mobile-app">Mobile App Development</option>
                  <option value="ecommerce">E-commerce Solutions</option>
                  <option value="ui-ux">UI/UX Design</option>
                  <option value="api-development">API Development</option>
                  <option value="consultation">Consultation</option>
                  <option value="other">Other</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="budget">Project Budget</Label>
                <Select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                >
                  <option value="">Select budget range</option>
                  <option value="under-5k">Under $5,000</option>
                  <option value="5k-15k">$5,000 - $15,000</option>
                  <option value="15k-30k">$15,000 - $30,000</option>
                  <option value="30k-50k">$30,000 - $50,000</option>
                  <option value="over-50k">Over $50,000</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="timeline">Desired Timeline</Label>
                <Select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                >
                  <option value="">Select timeline</option>
                  <option value="asap">ASAP (Rush job)</option>
                  <option value="1-month">1 Month</option>
                  <option value="2-3-months">2-3 Months</option>
                  <option value="3-6-months">3-6 Months</option>
                  <option value="flexible">Flexible</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="description">Project Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  placeholder="Please describe your project requirements, goals, and any specific features you need..."
                />
              </FormGroup>

              <SubmitButton
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Project Request'}
              </SubmitButton>
            </Form>
          </FormSection>
        </ContentGrid>

        <ProcessSection>
          <SectionTitle style={{ textAlign: 'center' }}>Our Process</SectionTitle>
          <ProcessGrid>
            {processSteps.map((step, index) => (
              <ProcessStep
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <StepNumber>{index + 1}</StepNumber>
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </ProcessStep>
            ))}
          </ProcessGrid>
        </ProcessSection>
      </Container>
    </HireContainer>
  );
};

export default HirePage;