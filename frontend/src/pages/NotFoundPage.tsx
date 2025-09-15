import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PageWrapper = styled.div`
  min-height: calc(100vh - 160px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.background.light};
`;

const NotFoundCard = styled(motion.div)`
  background: ${props => props.theme.colors.background.paper};
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.lg};
  text-align: center;
  max-width: 500px;
`;

const Icon = styled.div`
  font-size: 6rem;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Title = styled.h1`
  font-size: ${props => props.theme.fonts.sizes.h1};
  font-weight: ${props => props.theme.fonts.weights.bold};
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text.primary};
`;

const Message = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  font-size: ${props => props.theme.fonts.sizes.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  justify-content: center;
  flex-wrap: wrap;
`;

const Button = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  background: ${props => props.theme.colors.gradients.primary};
  color: white;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.md};
  text-decoration: none;
  font-weight: ${props => props.theme.fonts.weights.medium};
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-1px);
  }
`;

const SecondaryButton = styled(Button)`
  background: transparent;
  color: ${props => props.theme.colors.text.primary};
  border: 1px solid ${props => props.theme.colors.border.primary};
`;

const NotFoundPage: React.FC = () => {
  return (
    <PageWrapper>
      <NotFoundCard
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Icon>🔍</Icon>
        <Title>404 - Page Not Found</Title>
        <Message>
          Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
        </Message>
        <ButtonGroup>
          <Button to="/">
            🏠 Go Home
          </Button>
          <SecondaryButton to="/products">
            🛒 Browse Products
          </SecondaryButton>
        </ButtonGroup>
      </NotFoundCard>
    </PageWrapper>
  );
};

export default NotFoundPage;