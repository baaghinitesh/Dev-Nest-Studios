import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const PageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl};
`;

const Header = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: ${props => props.theme.fonts.sizes.h1};
  font-weight: ${props => props.theme.fonts.weights.bold};
  margin-bottom: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.text.primary};
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  font-size: ${props => props.theme.fonts.sizes.lg};
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const DashboardCard = styled(motion.div)`
  background: ${props => props.theme.colors.background.paper};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  transition: box-shadow 0.3s ease;
  
  &:hover {
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const CardIcon = styled.div`
  font-size: 2rem;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const CardTitle = styled.h3`
  font-size: ${props => props.theme.fonts.sizes.h4};
  font-weight: ${props => props.theme.fonts.weights.semibold};
  margin-bottom: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.text.primary};
`;

const CardDescription = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const CardLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.primary.main};
  text-decoration: none;
  font-weight: ${props => props.theme.fonts.weights.medium};
  
  &:hover {
    text-decoration: underline;
  }
`;

const QuickStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const StatCard = styled.div`
  background: ${props => props.theme.colors.gradients.primary};
  color: white;
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.lg};
  text-align: center;
`;

const StatValue = styled.div`
  font-size: ${props => props.theme.fonts.sizes.h2};
  font-weight: ${props => props.theme.fonts.weights.bold};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const StatLabel = styled.div`
  font-size: ${props => props.theme.fonts.sizes.sm};
  opacity: 0.9;
`;

const RecentSection = styled.div`
  background: ${props => props.theme.colors.background.paper};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.sm};
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.fonts.sizes.h3};
  font-weight: ${props => props.theme.fonts.weights.semibold};
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text.primary};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.text.secondary};
`;

const DashboardPage: React.FC = () => {
  const { authState } = useAuth();

  return (
    <PageWrapper>
      <Header>
        <Title>Welcome back, {authState.user?.name}!</Title>
        <Subtitle>Manage your account and track your orders</Subtitle>
      </Header>

      <QuickStats>
        <StatCard>
          <StatValue>0</StatValue>
          <StatLabel>Total Orders</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>$0.00</StatValue>
          <StatLabel>Total Spent</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>0</StatValue>
          <StatLabel>Wishlist Items</StatLabel>
        </StatCard>
      </QuickStats>

      <DashboardGrid>
        <DashboardCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <CardIcon>📦</CardIcon>
          <CardTitle>My Orders</CardTitle>
          <CardDescription>
            View and track your order history and status
          </CardDescription>
          <CardLink to="/orders">
            View Orders →
          </CardLink>
        </DashboardCard>

        <DashboardCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CardIcon>👤</CardIcon>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>
            Update your personal information and preferences
          </CardDescription>
          <CardLink to="/profile">
            Edit Profile →
          </CardLink>
        </DashboardCard>

        <DashboardCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <CardIcon>🛍️</CardIcon>
          <CardTitle>Shopping Cart</CardTitle>
          <CardDescription>
            Review items in your cart and proceed to checkout
          </CardDescription>
          <CardLink to="/cart">
            View Cart →
          </CardLink>
        </DashboardCard>

        <DashboardCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <CardIcon>🛒</CardIcon>
          <CardTitle>Continue Shopping</CardTitle>
          <CardDescription>
            Explore our marketplace and discover new products
          </CardDescription>
          <CardLink to="/products">
            Browse Products →
          </CardLink>
        </DashboardCard>
      </DashboardGrid>

      <RecentSection>
        <SectionTitle>Recent Orders</SectionTitle>
        <EmptyState>
          <p>You haven't placed any orders yet.</p>
          <CardLink to="/products">Start Shopping →</CardLink>
        </EmptyState>
      </RecentSection>
    </PageWrapper>
  );
};

export default DashboardPage;