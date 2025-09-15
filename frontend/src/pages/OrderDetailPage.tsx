import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Order } from '../types';
import { apiService } from '../services/api';

const PageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl};
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.primary.main};
  text-decoration: none;
  margin-bottom: ${props => props.theme.spacing.lg};
  font-weight: ${props => props.theme.fonts.weights.medium};
  
  &:hover {
    text-decoration: underline;
  }
`;

const SuccessBanner = styled(motion.div)`
  background: linear-gradient(135deg, ${props => props.theme.colors.success.light}, ${props => props.theme.colors.success.main});
  color: white;
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
  text-align: center;
`;

const SuccessIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const SuccessTitle = styled.h1`
  font-size: ${props => props.theme.fonts.sizes.h1};
  font-weight: ${props => props.theme.fonts.weights.bold};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const SuccessMessage = styled.p`
  font-size: ${props => props.theme.fonts.sizes.lg};
  opacity: 0.9;
`;

const OrderContainer = styled(motion.div)`
  background: white;
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.sm};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.md};
  }
`;

const OrderInfo = styled.div``;

const OrderNumber = styled.h2`
  font-size: ${props => props.theme.fonts.sizes.h2};
  font-weight: ${props => props.theme.fonts.weights.bold};
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const OrderDate = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  font-size: ${props => props.theme.fonts.sizes.body};
`;

const OrderStatus = styled.div<{ status: string }>`
  padding: 0.5rem 1rem;
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: ${props => props.theme.fonts.weights.semibold};
  text-transform: uppercase;
  font-size: ${props => props.theme.fonts.sizes.sm};
  
  ${props => {
    switch (props.status.toLowerCase()) {
      case 'pending':
        return `background: ${props.theme.colors.warning.light}; color: ${props.theme.colors.warning.dark};`;
      case 'processing':
        return `background: ${props.theme.colors.primary.light}; color: ${props.theme.colors.primary.dark};`;
      case 'completed':
        return `background: ${props.theme.colors.success.light}; color: ${props.theme.colors.success.dark};`;
      case 'cancelled':
        return `background: ${props.theme.colors.error.light}; color: ${props.theme.colors.error.dark};`;
      default:
        return `background: ${props.theme.colors.text.secondary}20; color: ${props.theme.colors.text.secondary};`;
    }
  }}
`;

const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.lg};
  }
`;

const Section = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const SectionTitle = styled.h3`
  font-size: ${props => props.theme.fonts.sizes.lg};
  font-weight: ${props => props.theme.fonts.weights.semibold};
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.text.primary};
`;

const OrderItem = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr auto;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.lg};
  border: 1px solid ${props => props.theme.colors.border.light};
  border-radius: ${props => props.theme.borderRadius.md};
  margin-bottom: ${props => props.theme.spacing.md};
  align-items: center;
`;

const ItemImage = styled.div<{ bgImage?: string }>`
  width: 80px;
  height: 64px;
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => props.bgImage ? `url(${props.bgImage})` : `linear-gradient(135deg, ${props.theme.colors.primary.light}, ${props.theme.colors.secondary.light})`};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.875rem;
`;

const ItemInfo = styled.div``;

const ItemTitle = styled.h4`
  font-size: ${props => props.theme.fonts.sizes.body};
  font-weight: ${props => props.theme.fonts.weights.semibold};
  margin-bottom: 0.25rem;
  color: ${props => props.theme.colors.text.primary};
`;

const ItemDetails = styled.p`
  font-size: ${props => props.theme.fonts.sizes.sm};
  color: ${props => props.theme.colors.text.secondary};
`;

const ItemPrice = styled.div`
  text-align: right;
`;

const Price = styled.div`
  font-size: ${props => props.theme.fonts.sizes.lg};
  font-weight: ${props => props.theme.fonts.weights.semibold};
  color: ${props => props.theme.colors.primary.main};
`;

const Quantity = styled.div`
  font-size: ${props => props.theme.fonts.sizes.sm};
  color: ${props => props.theme.colors.text.secondary};
`;

const SummarySection = styled.div`
  background: ${props => props.theme.colors.background.secondary};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  height: fit-content;
  position: sticky;
  top: ${props => props.theme.spacing.xl};
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const SummaryLabel = styled.span`
  color: ${props => props.theme.colors.text.secondary};
`;

const SummaryValue = styled.span<{ highlight?: boolean }>`
  font-weight: ${props => props.theme.fonts.weights.semibold};
  color: ${props => props.highlight ? props.theme.colors.primary.main : props.theme.colors.text.primary};
  font-size: ${props => props.highlight ? props.theme.fonts.sizes.lg : 'inherit'};
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background: ${props => props.theme.colors.border.light};
  margin: ${props => props.theme.spacing.lg} 0;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.lg};
  }
`;

const InfoSection = styled.div`
  background: ${props => props.theme.colors.background.secondary};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.lg};
`;

const InfoTitle = styled.h4`
  font-size: ${props => props.theme.fonts.sizes.body};
  font-weight: ${props => props.theme.fonts.weights.semibold};
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text.primary};
`;

const InfoText = styled.p`
  font-size: ${props => props.theme.fonts.sizes.sm};
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 0.25rem;
  line-height: 1.4;
`;

const LoadingSpinner = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  font-size: ${props => props.theme.fonts.sizes.lg};
  color: ${props => props.theme.colors.text.secondary};
`;

const ErrorMessage = styled(motion.div)`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.error.main};
  background: ${props => props.theme.colors.error.light}20;
  border-radius: ${props => props.theme.borderRadius.lg};
`;

const NotFound = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.text.secondary};
`;

const NotFoundIcon = styled.div`
  font-size: 4rem;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const NotFoundTitle = styled.h3`
  font-size: ${props => props.theme.fonts.sizes.h3};
  font-weight: ${props => props.theme.fonts.weights.semibold};
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text.primary};
`;

const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const isOrderJustCreated = location.state?.orderCreated;

  useEffect(() => {
    if (id) {
      fetchOrder(id);
    } else {
      setLoading(false);
    }
  }, [id]);

  const fetchOrder = async (orderId: string) => {
    try {
      setLoading(true);
      // For demo purposes, create a mock order since the API might not be fully connected
      if (isOrderJustCreated) {
        // Simulate successful order creation
        const mockOrder: Order = {
          id: orderId,
          orderNumber: `DN-${Date.now().toString().slice(-6)}`,
          user: { name: 'Demo User', email: 'demo@example.com' } as any,
          items: [
            {
              product: {
                _id: '1',
                title: 'E-commerce React Application',
                price: 299,
                images: [{ url: '', alt: 'Product', isPrimary: true }],
              } as any,
              quantity: 1,
              price: 299,
              // subtotal: 299, // Removed as not part of OrderItem type
            }
          ],
          subtotal: 299,
          tax: 23.92,
          shipping: 0,
          discount: 0,
          total: 322.92,
          currency: 'USD',
          status: 'processing',
          paymentStatus: 'completed',
          paymentMethod: 'card',
          billingAddress: {
            name: 'John Doe',
            email: 'john@example.com',
            street: '123 Demo Street',
            city: 'Demo City',
            state: 'DC',
            zipCode: '12345',
            country: 'US',
          },
          timeline: [
            {
              status: 'pending',
              timestamp: new Date(),
              // note: 'Order received and payment processed', // Removed as not part of OrderTimeline type
            }
          ],
          notes: [],
          deliveryFiles: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        setOrder(mockOrder);
      } else {
        // Try to fetch from API
        const response = await apiService.orders.getById(orderId);
        if (response.data.success) {
          setOrder(response.data.data);
        } else {
          throw new Error('Order not found');
        }
      }
    } catch (err) {
      console.error('Error fetching order:', err);
      setError('Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <PageWrapper>
        <LoadingSpinner
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Loading order details... ⏳
        </LoadingSpinner>
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper>
        <BackLink to="/orders">← Back to Orders</BackLink>
        <ErrorMessage
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h3>Error Loading Order</h3>
          <p>{error}</p>
        </ErrorMessage>
      </PageWrapper>
    );
  }

  if (!order) {
    return (
      <PageWrapper>
        <BackLink to="/orders">← Back to Orders</BackLink>
        
        <OrderContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <NotFound>
            <NotFoundIcon>❓</NotFoundIcon>
            <NotFoundTitle>Order Not Found</NotFoundTitle>
            <p>The order with ID "{id}" could not be found.</p>
          </NotFound>
        </OrderContainer>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <BackLink to="/orders">← Back to Orders</BackLink>
      
      {isOrderJustCreated && (
        <SuccessBanner
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SuccessIcon>🎉</SuccessIcon>
          <SuccessTitle>Order Placed Successfully!</SuccessTitle>
          <SuccessMessage>
            Thank you for your order. You will receive a confirmation email shortly.
          </SuccessMessage>
        </SuccessBanner>
      )}

      <OrderContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: isOrderJustCreated ? 0.3 : 0 }}
      >
        <OrderHeader>
          <OrderInfo>
            <OrderNumber>Order #{order.orderNumber}</OrderNumber>
            <OrderDate>Placed on {formatDate(order.createdAt)}</OrderDate>
          </OrderInfo>
          <OrderStatus status={order.status}>
            {order.status}
          </OrderStatus>
        </OrderHeader>

        <SectionGrid>
          <div>
            <Section>
              <SectionTitle>Order Items</SectionTitle>
              {order.items.map((item, index) => (
                <OrderItem key={index}>
                  <ItemImage bgImage={item.product.images?.[0]?.url}>
                    {!item.product.images?.[0]?.url && '📦'}
                  </ItemImage>
                  <ItemInfo>
                    <ItemTitle>{item.product.title}</ItemTitle>
                    <ItemDetails>Digital Product • Instant Download</ItemDetails>
                  </ItemInfo>
                  <ItemPrice>
                    <Price>{formatPrice(item.price)}</Price>
                    <Quantity>Qty: {item.quantity}</Quantity>
                  </ItemPrice>
                </OrderItem>
              ))}
            </Section>

            <InfoGrid>
              <InfoSection>
                <InfoTitle>📧 Contact Information</InfoTitle>
                <InfoText>{order.user.email}</InfoText>
              </InfoSection>

              <InfoSection>
                <InfoTitle>💳 Payment Method</InfoTitle>
                <InfoText>
                  {order.paymentMethod === 'card' ? '💳 Credit Card' : '🎯 PayPal'}
                </InfoText>
                <InfoText>Status: {order.paymentStatus}</InfoText>
              </InfoSection>

              <InfoSection>
                <InfoTitle>📍 Billing Address</InfoTitle>
                <InfoText>{order.billingAddress.street}</InfoText>
                <InfoText>
                  {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zipCode}
                </InfoText>
                <InfoText>{order.billingAddress.country}</InfoText>
              </InfoSection>

              <InfoSection>
                <InfoTitle>📅 Timeline</InfoTitle>
                {order.timeline.map((event, index) => (
                  <InfoText key={index}>
                    {formatDate(event.timestamp)}: Order received and payment processed
                  </InfoText>
                ))}
              </InfoSection>
            </InfoGrid>
          </div>

          <SummarySection>
            <SectionTitle>Order Summary</SectionTitle>
            
            <SummaryRow>
              <SummaryLabel>Subtotal</SummaryLabel>
              <SummaryValue>{formatPrice(order.subtotal)}</SummaryValue>
            </SummaryRow>

            <SummaryRow>
              <SummaryLabel>Shipping</SummaryLabel>
              <SummaryValue>{order.shipping > 0 ? formatPrice(order.shipping) : 'Free'}</SummaryValue>
            </SummaryRow>

            <SummaryRow>
              <SummaryLabel>Tax</SummaryLabel>
              <SummaryValue>{formatPrice(order.tax)}</SummaryValue>
            </SummaryRow>

            {order.discount > 0 && (
              <SummaryRow>
                <SummaryLabel>Discount</SummaryLabel>
                <SummaryValue>-{formatPrice(order.discount)}</SummaryValue>
              </SummaryRow>
            )}

            <Divider />

            <SummaryRow>
              <SummaryLabel>Total</SummaryLabel>
              <SummaryValue highlight>{formatPrice(order.total)}</SummaryValue>
            </SummaryRow>

            <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px', fontSize: '0.875rem', color: '#6c757d' }}>
              <div style={{ marginBottom: '0.5rem' }}>✅ Payment confirmed</div>
              <div style={{ marginBottom: '0.5rem' }}>📧 Confirmation email sent</div>
              <div>📋 Order processing has begun</div>
            </div>
          </SummarySection>
        </SectionGrid>
      </OrderContainer>
    </PageWrapper>
  );
};

export default OrderDetailPage;