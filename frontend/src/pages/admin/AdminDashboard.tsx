import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const StatCard = styled(motion.div)`
  background: ${props => props.theme.colors.gradients.primary};
  color: white;
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.lg};
  text-align: center;
  box-shadow: ${props => props.theme.shadows.md};
`;

const StatValue = styled.div`
  font-size: ${props => props.theme.fonts.sizes.h1};
  font-weight: ${props => props.theme.fonts.weights.bold};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const StatLabel = styled.div`
  font-size: ${props => props.theme.fonts.sizes.body};
  opacity: 0.9;
`;

const AdminGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
`;

const AdminCard = styled(motion.div)`
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
  font-size: 2.5rem;
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

const AdminDashboard: React.FC = () => {
  return (
    <PageWrapper>
      <Header>
        <Title>Admin Dashboard</Title>
        <Subtitle>Manage your marketplace and monitor performance</Subtitle>
      </Header>

      <StatsGrid>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <StatValue>0</StatValue>
          <StatLabel>Total Products</StatLabel>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <StatValue>0</StatValue>
          <StatLabel>Total Orders</StatLabel>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <StatValue>0</StatValue>
          <StatLabel>Total Users</StatLabel>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <StatValue>$0</StatValue>
          <StatLabel>Total Revenue</StatLabel>
        </StatCard>
      </StatsGrid>

      <AdminGrid>
        <AdminCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <CardIcon>📦</CardIcon>
          <CardTitle>Products</CardTitle>
          <CardDescription>
            Manage your product catalog, add new items, and update existing ones
          </CardDescription>
          <CardLink to="/admin/products">
            Manage Products →
          </CardLink>
        </AdminCard>

        <AdminCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <CardIcon>🛒</CardIcon>
          <CardTitle>Orders</CardTitle>
          <CardDescription>
            View and manage customer orders, update status and tracking
          </CardDescription>
          <CardLink to="/admin/orders">
            View Orders →
          </CardLink>
        </AdminCard>

        <AdminCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <CardIcon>👥</CardIcon>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            Manage user accounts, roles, and permissions
          </CardDescription>
          <CardLink to="/admin/users">
            Manage Users →
          </CardLink>
        </AdminCard>

        <AdminCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <CardIcon>💬</CardIcon>
          <CardTitle>Messages</CardTitle>
          <CardDescription>
            View and respond to customer inquiries and support requests
          </CardDescription>
          <CardLink to="/admin/messages">
            View Messages →
          </CardLink>
        </AdminCard>
      </AdminGrid>
    </PageWrapper>
  );
};

export default AdminDashboard;