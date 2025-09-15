import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/api';

// Types
interface BillingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface PaymentInfo {
  method: 'card' | 'paypal';
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  nameOnCard: string;
}

// Styled Components
const PageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl};
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Title = styled(motion.h1)`
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: ${props => props.theme.fonts.weights.bold};
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  font-size: ${props => props.theme.fonts.sizes.lg};
`;

const CheckoutContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.lg};
  }
`;

const CheckoutForm = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xl};
`;

const Section = styled.div`
  background: white;
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  padding: ${props => props.theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.fonts.sizes.xl};
  font-weight: ${props => props.theme.fonts.weights.semibold};
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

const Select = styled.select<{ error?: boolean }>`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.error ? props.theme.colors.error.main : props.theme.colors.border.light};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fonts.sizes.body};
  background: white;
  cursor: pointer;
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

const PaymentMethods = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const PaymentMethod = styled.label<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.selected ? props.theme.colors.primary.main : props.theme.colors.border.light};
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary.main};
  }
`;

const OrderSummary = styled(motion.div)`
  background: white;
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  padding: ${props => props.theme.spacing.xl};
  height: fit-content;
  position: sticky;
  top: ${props => props.theme.spacing.xl};
`;

const SummaryTitle = styled.h2`
  font-size: ${props => props.theme.fonts.sizes.xl};
  font-weight: ${props => props.theme.fonts.weights.semibold};
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.text.primary};
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.sm} 0;
  border-bottom: 1px solid ${props => props.theme.colors.border.light};
`;

const ItemInfo = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const ItemImage = styled.div<{ bgImage?: string }>`
  width: 40px;
  height: 32px;
  border-radius: ${props => props.theme.borderRadius.sm};
  background: ${props => props.bgImage ? `url(${props.bgImage})` : `linear-gradient(135deg, ${props.theme.colors.primary.light}, ${props.theme.colors.secondary.light})`};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.75rem;
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemName = styled.div`
  font-weight: ${props => props.theme.fonts.weights.medium};
  font-size: ${props => props.theme.fonts.sizes.sm};
  color: ${props => props.theme.colors.text.primary};
`;

const ItemQuantity = styled.div`
  font-size: ${props => props.theme.fonts.sizes.xs};
  color: ${props => props.theme.colors.text.secondary};
`;

const ItemPrice = styled.div`
  font-weight: ${props => props.theme.fonts.weights.semibold};
  color: ${props => props.theme.colors.text.primary};
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: ${props => props.theme.spacing.md} 0;
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

const PlaceOrderButton = styled(motion.button)`
  width: 100%;
  padding: ${props => props.theme.spacing.lg};
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

const SecurityBadges = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: ${props => props.theme.spacing.lg};
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.background.secondary};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fonts.sizes.xs};
  color: ${props => props.theme.colors.text.secondary};
  text-align: center;
`;

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { state: authState } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const [billingInfo, setBillingInfo] = useState<BillingInfo>({
    firstName: '',
    lastName: '',
    email: authState.user?.email || '',
    phone: '',
    company: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    method: 'card',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    nameOnCard: '',
  });

  useEffect(() => {
    if (cart.items.length === 0) {
      navigate('/cart');
    }
  }, [cart.items.length, navigate]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    // Billing validation
    if (!billingInfo.firstName) newErrors.firstName = 'First name is required';
    if (!billingInfo.lastName) newErrors.lastName = 'Last name is required';
    if (!billingInfo.email) newErrors.email = 'Email is required';
    if (!billingInfo.phone) newErrors.phone = 'Phone is required';
    if (!billingInfo.address) newErrors.address = 'Address is required';
    if (!billingInfo.city) newErrors.city = 'City is required';
    if (!billingInfo.state) newErrors.state = 'State is required';
    if (!billingInfo.zipCode) newErrors.zipCode = 'ZIP code is required';

    // Payment validation (for card payments)
    if (paymentInfo.method === 'card') {
      if (!paymentInfo.cardNumber) newErrors.cardNumber = 'Card number is required';
      if (!paymentInfo.expiryMonth) newErrors.expiryMonth = 'Expiry month is required';
      if (!paymentInfo.expiryYear) newErrors.expiryYear = 'Expiry year is required';
      if (!paymentInfo.cvv) newErrors.cvv = 'CVV is required';
      if (!paymentInfo.nameOnCard) newErrors.nameOnCard = 'Name on card is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBillingChange = (field: keyof BillingInfo, value: string) => {
    setBillingInfo(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePaymentChange = (field: keyof PaymentInfo, value: string) => {
    setPaymentInfo(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        items: cart.items.map(item => ({
          product: item.product._id || item.product.id,
          quantity: item.quantity,
          price: item.product.price,
          customizationRequests: item.customizationRequests,
        })),
        billingAddress: billingInfo,
        paymentMethod: paymentInfo.method,
        // In a real implementation, you'd tokenize payment details
        paymentDetails: {
          // Don't send actual card details to backend
          last4: paymentInfo.cardNumber.slice(-4),
          brand: 'visa', // You'd detect this
          method: paymentInfo.method,
        },
        subtotal: cart.subtotal,
        shipping: 0, // Free shipping for digital products
        tax: 0, // Calculate based on location
        total: cart.subtotal,
      };

      const response = await apiService.orders.create(orderData);
      
      if (response.data.success) {
        clearCart();
        navigate(`/orders/${response.data.data._id}`, { 
          state: { orderCreated: true } 
        });
      } else {
        throw new Error(response.data.message || 'Failed to create order');
      }
    } catch (error) {
      console.error('Order creation error:', error);
      // Show error message to user
      setErrors({ submit: 'Failed to process order. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const calculateTax = () => {
    // In a real app, calculate based on billing address
    return cart.subtotal * 0.08; // 8% tax
  };

  const total = cart.subtotal + calculateTax();

  if (cart.items.length === 0) {
    return null; // Will redirect to cart
  }

  return (
    <PageWrapper>
      <Header>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🛒 Checkout
        </Title>
        <Subtitle>
          Complete your order for {cart.itemCount} {cart.itemCount === 1 ? 'item' : 'items'}
        </Subtitle>
      </Header>

      <form onSubmit={handleSubmit}>
        <CheckoutContainer>
          <CheckoutForm
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Billing Information */}
            <Section>
              <SectionTitle>
                📋 Billing Information
              </SectionTitle>
              
              <FormGrid>
                <FormGroup>
                  <Label>First Name *</Label>
                  <Input
                    type="text"
                    value={billingInfo.firstName}
                    onChange={(e) => handleBillingChange('firstName', e.target.value)}
                    error={!!errors.firstName}
                  />
                  {errors.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                  <Label>Last Name *</Label>
                  <Input
                    type="text"
                    value={billingInfo.lastName}
                    onChange={(e) => handleBillingChange('lastName', e.target.value)}
                    error={!!errors.lastName}
                  />
                  {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                  <Label>Email *</Label>
                  <Input
                    type="email"
                    value={billingInfo.email}
                    onChange={(e) => handleBillingChange('email', e.target.value)}
                    error={!!errors.email}
                  />
                  {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                  <Label>Phone *</Label>
                  <Input
                    type="tel"
                    value={billingInfo.phone}
                    onChange={(e) => handleBillingChange('phone', e.target.value)}
                    error={!!errors.phone}
                  />
                  {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
                </FormGroup>

                <FormGroup fullWidth>
                  <Label>Company (Optional)</Label>
                  <Input
                    type="text"
                    value={billingInfo.company}
                    onChange={(e) => handleBillingChange('company', e.target.value)}
                  />
                </FormGroup>

                <FormGroup fullWidth>
                  <Label>Address *</Label>
                  <Input
                    type="text"
                    value={billingInfo.address}
                    onChange={(e) => handleBillingChange('address', e.target.value)}
                    error={!!errors.address}
                  />
                  {errors.address && <ErrorMessage>{errors.address}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                  <Label>City *</Label>
                  <Input
                    type="text"
                    value={billingInfo.city}
                    onChange={(e) => handleBillingChange('city', e.target.value)}
                    error={!!errors.city}
                  />
                  {errors.city && <ErrorMessage>{errors.city}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                  <Label>State *</Label>
                  <Input
                    type="text"
                    value={billingInfo.state}
                    onChange={(e) => handleBillingChange('state', e.target.value)}
                    error={!!errors.state}
                  />
                  {errors.state && <ErrorMessage>{errors.state}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                  <Label>ZIP Code *</Label>
                  <Input
                    type="text"
                    value={billingInfo.zipCode}
                    onChange={(e) => handleBillingChange('zipCode', e.target.value)}
                    error={!!errors.zipCode}
                  />
                  {errors.zipCode && <ErrorMessage>{errors.zipCode}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                  <Label>Country *</Label>
                  <Select
                    value={billingInfo.country}
                    onChange={(e) => handleBillingChange('country', e.target.value)}
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                  </Select>
                </FormGroup>
              </FormGrid>
            </Section>

            {/* Payment Information */}
            <Section>
              <SectionTitle>
                💳 Payment Information
              </SectionTitle>

              <PaymentMethods>
                <PaymentMethod selected={paymentInfo.method === 'card'}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentInfo.method === 'card'}
                    onChange={(e) => handlePaymentChange('method', e.target.value as any)}
                  />
                  💳 Credit Card
                </PaymentMethod>
                <PaymentMethod selected={paymentInfo.method === 'paypal'}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentInfo.method === 'paypal'}
                    onChange={(e) => handlePaymentChange('method', e.target.value as any)}
                  />
                  🎯 PayPal
                </PaymentMethod>
              </PaymentMethods>

              {paymentInfo.method === 'card' && (
                <FormGrid>
                  <FormGroup fullWidth>
                    <Label>Name on Card *</Label>
                    <Input
                      type="text"
                      value={paymentInfo.nameOnCard}
                      onChange={(e) => handlePaymentChange('nameOnCard', e.target.value)}
                      error={!!errors.nameOnCard}
                    />
                    {errors.nameOnCard && <ErrorMessage>{errors.nameOnCard}</ErrorMessage>}
                  </FormGroup>

                  <FormGroup fullWidth>
                    <Label>Card Number *</Label>
                    <Input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => handlePaymentChange('cardNumber', e.target.value)}
                      error={!!errors.cardNumber}
                    />
                    {errors.cardNumber && <ErrorMessage>{errors.cardNumber}</ErrorMessage>}
                  </FormGroup>

                  <FormGroup>
                    <Label>Expiry Month *</Label>
                    <Select
                      value={paymentInfo.expiryMonth}
                      onChange={(e) => handlePaymentChange('expiryMonth', e.target.value)}
                      error={!!errors.expiryMonth}
                    >
                      <option value="">Month</option>
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                          {String(i + 1).padStart(2, '0')}
                        </option>
                      ))}
                    </Select>
                    {errors.expiryMonth && <ErrorMessage>{errors.expiryMonth}</ErrorMessage>}
                  </FormGroup>

                  <FormGroup>
                    <Label>Expiry Year *</Label>
                    <Select
                      value={paymentInfo.expiryYear}
                      onChange={(e) => handlePaymentChange('expiryYear', e.target.value)}
                      error={!!errors.expiryYear}
                    >
                      <option value="">Year</option>
                      {Array.from({ length: 10 }, (_, i) => {
                        const year = new Date().getFullYear() + i;
                        return (
                          <option key={year} value={String(year)}>
                            {year}
                          </option>
                        );
                      })}
                    </Select>
                    {errors.expiryYear && <ErrorMessage>{errors.expiryYear}</ErrorMessage>}
                  </FormGroup>

                  <FormGroup>
                    <Label>CVV *</Label>
                    <Input
                      type="text"
                      placeholder="123"
                      maxLength={4}
                      value={paymentInfo.cvv}
                      onChange={(e) => handlePaymentChange('cvv', e.target.value)}
                      error={!!errors.cvv}
                    />
                    {errors.cvv && <ErrorMessage>{errors.cvv}</ErrorMessage>}
                  </FormGroup>
                </FormGrid>
              )}

              {paymentInfo.method === 'paypal' && (
                <div style={{ padding: '2rem', textAlign: 'center', background: '#f8f9fa', borderRadius: '8px' }}>
                  <p>You will be redirected to PayPal to complete your payment securely.</p>
                </div>
              )}
            </Section>

            {errors.submit && (
              <Section>
                <ErrorMessage style={{ fontSize: '1rem' }}>{errors.submit}</ErrorMessage>
              </Section>
            )}
          </CheckoutForm>

          <OrderSummary
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <SummaryTitle>Order Summary</SummaryTitle>
            
            {cart.items.map((item) => (
              <SummaryItem key={item.product._id || item.product.id}>
                <ItemInfo>
                  <ItemImage bgImage={item.product.images?.[0]?.url}>
                    {!item.product.images?.[0]?.url && '📦'}
                  </ItemImage>
                  <ItemDetails>
                    <ItemName>{item.product.title}</ItemName>
                    <ItemQuantity>Qty: {item.quantity}</ItemQuantity>
                  </ItemDetails>
                </ItemInfo>
                <ItemPrice>{formatPrice(item.product.price * item.quantity)}</ItemPrice>
              </SummaryItem>
            ))}

            <Divider />

            <SummaryRow>
              <SummaryLabel>Subtotal</SummaryLabel>
              <SummaryValue>{formatPrice(cart.subtotal)}</SummaryValue>
            </SummaryRow>

            <SummaryRow>
              <SummaryLabel>Shipping</SummaryLabel>
              <SummaryValue>Free</SummaryValue>
            </SummaryRow>

            <SummaryRow>
              <SummaryLabel>Tax</SummaryLabel>
              <SummaryValue>{formatPrice(calculateTax())}</SummaryValue>
            </SummaryRow>

            <Divider />

            <SummaryRow>
              <SummaryLabel>Total</SummaryLabel>
              <SummaryValue highlight>{formatPrice(total)}</SummaryValue>
            </SummaryRow>

            <PlaceOrderButton
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? 'Processing...' : `Place Order ${formatPrice(total)}`}
            </PlaceOrderButton>

            <SecurityBadges>
              <div>🔒<br/>SSL Secured</div>
              <div>💳<br/>PCI Compliant</div>
              <div>🛡️<br/>256-bit Encryption</div>
            </SecurityBadges>
          </OrderSummary>
        </CheckoutContainer>
      </form>
    </PageWrapper>
  );
};

export default CheckoutPage;