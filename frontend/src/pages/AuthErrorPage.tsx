import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PageWrapper = styled.div`
  min-height: calc(100vh - 160px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.background.light};
`;

const ErrorCard = styled(motion.div)`
  background: ${props => props.theme.colors.background.paper};
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.lg};
  text-align: center;
  max-width: 400px;
`;

const Icon = styled.div`
  font-size: 4rem;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Title = styled.h1`
  font-size: ${props => props.theme.fonts.sizes.h2};
  font-weight: ${props => props.theme.fonts.weights.bold};
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.error.main};
`;

const Message = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  justify-content: center;
`;

const Button = styled.button`
  background: ${props => props.theme.colors.gradients.primary};
  color: white;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fonts.sizes.body};
  font-weight: ${props => props.theme.fonts.weights.medium};
  cursor: pointer;
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

const AuthErrorPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const error = searchParams.get('error') || 'Authentication failed';

  return (
    <PageWrapper>
      <ErrorCard
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Icon>❌</Icon>
        <Title>Authentication Failed</Title>
        <Message>
          {error}. Please try logging in again.
        </Message>
        <ButtonGroup>
          <Button onClick={() => navigate('/login')}>
            Try Again
          </Button>
          <SecondaryButton onClick={() => navigate('/')}>
            Go Home
          </SecondaryButton>
        </ButtonGroup>
      </ErrorCard>
    </PageWrapper>
  );
};

export default AuthErrorPage;