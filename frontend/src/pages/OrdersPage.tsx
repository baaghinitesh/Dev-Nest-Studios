import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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

const OrdersContainer = styled.div`
  background: ${props => props.theme.colors.background.paper};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  overflow: hidden;
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  padding: ${props => props.theme.spacing.xxl};
  color: ${props => props.theme.colors.text.secondary};
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const EmptyTitle = styled.h3`
  font-size: ${props => props.theme.fonts.sizes.h3};
  font-weight: ${props => props.theme.fonts.weights.semibold};
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text.primary};
`;

const EmptyMessage = styled.p`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ShopButton = styled(Link)`
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

const OrdersPage: React.FC = () => {
  // TODO: Fetch orders from API
  const orders: any[] = [];

  return (
    <PageWrapper>
      <Header>
        <Title>My Orders</Title>
        <Subtitle>Track and manage your order history</Subtitle>
      </Header>

      <OrdersContainer>
        {orders.length === 0 ? (
          <EmptyState
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <EmptyIcon>📦</EmptyIcon>
            <EmptyTitle>No orders yet</EmptyTitle>
            <EmptyMessage>
              You haven't placed any orders yet. Start shopping to see your orders here.
            </EmptyMessage>
            <ShopButton to="/products">
              Start Shopping →
            </ShopButton>
          </EmptyState>
        ) : (
          <div>
            {/* TODO: Add order list component */}
          </div>
        )}
      </OrdersContainer>
    </PageWrapper>
  );
};

export default OrdersPage;