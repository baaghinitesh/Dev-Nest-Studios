import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const PageWrapper = styled.div`
  min-height: calc(100vh - 160px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.background.light};
`;

const SuccessCard = styled(motion.div)`
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
  color: ${props => props.theme.colors.success.main};
`;

const Message = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: ${props => props.theme.spacing.lg};
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

const AuthSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setAuthState } = useAuth();
  
  useEffect(() => {
    // Get token from URL params
    const token = searchParams.get('token');
    const user = searchParams.get('user');
    
    if (token && user) {
      try {
        const userData = JSON.parse(decodeURIComponent(user));
        
        // Store token in localStorage
        localStorage.setItem('token', token);
        
        // Update auth context
        setAuthState({
          isAuthenticated: true,
          user: userData,
          token,
          loading: false
        });
        
        // Redirect after 2 seconds
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } catch (error) {
        console.error('Error parsing user data:', error);
        navigate('/auth/error');
      }
    } else {
      navigate('/auth/error');
    }
  }, [searchParams, setAuthState, navigate]);

  return (
    <PageWrapper>
      <SuccessCard
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Icon>✅</Icon>
        <Title>Login Successful!</Title>
        <Message>
          You have been successfully authenticated. Redirecting you to the home page...
        </Message>
        <Button onClick={() => navigate('/')}>
          Continue to Home
        </Button>
      </SuccessCard>
    </PageWrapper>
  );
};

export default AuthSuccessPage;