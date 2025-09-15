import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// Styled Components
const PageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.md};
  }
`;

const Title = styled(motion.h1)`
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: ${props => props.theme.fonts.weights.bold};
  color: ${props => props.theme.colors.text.primary};
`;

const ItemCount = styled.span`
  color: ${props => props.theme.colors.text.secondary};
  font-size: ${props => props.theme.fonts.sizes.lg};
`;

const ContinueShoppingLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.primary.main};
  text-decoration: none;
  font-weight: ${props => props.theme.fonts.weights.medium};
  transition: all 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary.dark};
  }
`;

const CartContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.lg};
  }
`;

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const CartItem = styled(motion.div)`
  display: grid;
  grid-template-columns: 100px 1fr auto auto;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.lg};
  background: white;
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 80px 1fr;
    grid-template-rows: auto auto auto;
    gap: ${props => props.theme.spacing.sm};
  }
`;

const ItemImage = styled.div<{ bgImage?: string }>`
  width: 100px;
  height: 80px;
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => props.bgImage ? `url(${props.bgImage})` : `linear-gradient(135deg, ${props.theme.colors.primary.light}, ${props.theme.colors.secondary.light})`};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.875rem;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 80px;
    height: 60px;
    grid-row: 1 / 3;
  }
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ItemTitle = styled.h3`
  font-size: ${props => props.theme.fonts.sizes.lg};
  font-weight: ${props => props.theme.fonts.weights.semibold};
  color: ${props => props.theme.colors.text.primary};
  margin: 0;
`;

const ItemPrice = styled.div`
  font-size: ${props => props.theme.fonts.sizes.xl};
  font-weight: ${props => props.theme.fonts.weights.bold};
  color: ${props => props.theme.colors.primary.main};
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-column: 1 / -1;
    justify-self: start;
  }
`;

const QuantityButton = styled.button`
  width: 32px;
  height: 32px;
  border: 1px solid ${props => props.theme.colors.border.main};
  background: white;
  border-radius: ${props => props.theme.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.background.secondary};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityDisplay = styled.span`
  min-width: 40px;
  text-align: center;
  font-weight: ${props => props.theme.fonts.weights.medium};
`;

const RemoveButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  background: ${props => props.theme.colors.error.light};
  color: ${props => props.theme.colors.error.main};
  border-radius: ${props => props.theme.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.error.main};
    color: white;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-column: 2;
    grid-row: 3;
    justify-self: end;
  }
`;

const CartSummary = styled(motion.div)`
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
  font-size: ${props => props.highlight ? props.theme.fonts.sizes.xl : 'inherit'};
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background: ${props => props.theme.colors.border.light};
  margin: ${props => props.theme.spacing.lg} 0;
`;

const CheckoutButton = styled(motion.button)`
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
  
  &:hover {
    background: ${props => props.theme.colors.primary.dark};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SecondaryButton = styled(motion.button)`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  background: transparent;
  color: ${props => props.theme.colors.text.primary};
  border: 1px solid ${props => props.theme.colors.border.main};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fonts.sizes.body};
  font-weight: ${props => props.theme.fonts.weights.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: ${props => props.theme.spacing.md};
  
  &:hover {
    background: ${props => props.theme.colors.background.secondary};
  }
`;

const EmptyCart = styled(motion.div)`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  background: white;
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
`;

const EmptyCartIcon = styled.div`
  font-size: 4rem;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const EmptyCartTitle = styled.h2`
  font-size: ${props => props.theme.fonts.sizes.xl};
  font-weight: ${props => props.theme.fonts.weights.semibold};
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text.primary};
`;

const EmptyCartMessage = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ShopNowButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.primary.main};
  color: white;
  text-decoration: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: ${props => props.theme.fonts.weights.medium};
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.primary.dark};
    transform: translateY(-2px);
  }
`;

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeItem, clearCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cart.items.length === 0) {
    return (
      <PageWrapper>
        <Header>
          <Title
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            🛒 Shopping Cart
          </Title>
        </Header>

        <EmptyCart
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <EmptyCartIcon>🛒</EmptyCartIcon>
          <EmptyCartTitle>Your cart is empty</EmptyCartTitle>
          <EmptyCartMessage>
            Looks like you haven't added any amazing products to your cart yet.
            Explore our marketplace to find something perfect for your next project!
          </EmptyCartMessage>
          <ShopNowButton to="/products">
            🚀 Start Shopping
          </ShopNowButton>
        </EmptyCart>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Header>
        <div>
          <Title
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            🛒 Shopping Cart
          </Title>
          <ItemCount>
            {cart.itemCount} {cart.itemCount === 1 ? 'item' : 'items'} in your cart
          </ItemCount>
        </div>
        <ContinueShoppingLink to="/products">
          ← Continue Shopping
        </ContinueShoppingLink>
      </Header>

      <CartContainer>
        <CartItems>
          <AnimatePresence mode="popLayout">
            {cart.items.map((item, index) => (
              <CartItem
                key={item.product._id || item.product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                layout
              >
                <ItemImage bgImage={item.product.images?.[0]?.url}>
                  {!item.product.images?.[0]?.url && '📦'}
                </ItemImage>

                <ItemInfo>
                  <ItemTitle>{item.product.title}</ItemTitle>
                  <ItemPrice>{formatPrice(item.product.price)}</ItemPrice>
                </ItemInfo>

                <QuantityControls>
                  <QuantityButton
                    onClick={() => handleQuantityChange(item.product._id || item.product.id || '', item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </QuantityButton>
                  <QuantityDisplay>{item.quantity}</QuantityDisplay>
                  <QuantityButton
                    onClick={() => handleQuantityChange(item.product._id || item.product.id || '', item.quantity + 1)}
                  >
                    +
                  </QuantityButton>
                </QuantityControls>

                <RemoveButton
                  onClick={() => removeItem(item.product._id || item.product.id || '')}
                  title="Remove item"
                >
                  🗑️
                </RemoveButton>
              </CartItem>
            ))}
          </AnimatePresence>
        </CartItems>

        <CartSummary
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <SummaryTitle>Order Summary</SummaryTitle>
          
          <SummaryRow>
            <SummaryLabel>Subtotal ({cart.itemCount} items)</SummaryLabel>
            <SummaryValue>{formatPrice(cart.subtotal)}</SummaryValue>
          </SummaryRow>

          <SummaryRow>
            <SummaryLabel>Shipping</SummaryLabel>
            <SummaryValue>Free</SummaryValue>
          </SummaryRow>

          <SummaryRow>
            <SummaryLabel>Tax</SummaryLabel>
            <SummaryValue>Calculated at checkout</SummaryValue>
          </SummaryRow>

          <Divider />

          <SummaryRow>
            <SummaryLabel>Total</SummaryLabel>
            <SummaryValue highlight>{formatPrice(cart.subtotal)}</SummaryValue>
          </SummaryRow>

          <CheckoutButton
            onClick={handleCheckout}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Proceed to Checkout 🚀
          </CheckoutButton>

          <SecondaryButton
            onClick={clearCart}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            Clear Cart
          </SecondaryButton>

          <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px', fontSize: '0.875rem', color: '#6c757d' }}>
            <div style={{ marginBottom: '0.5rem' }}>✅ Free shipping on all digital products</div>
            <div style={{ marginBottom: '0.5rem' }}>💫 Instant download after payment</div>
            <div>🔒 Secure checkout with SSL encryption</div>
          </div>
        </CartSummary>
      </CartContainer>
    </PageWrapper>
  );
};

export default CartPage;