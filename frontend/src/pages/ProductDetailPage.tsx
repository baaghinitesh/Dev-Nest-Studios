import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { apiService } from '../services/api';
import { useCart } from '../context/CartContext';

// Styled Components
const PageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl};
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.text.secondary};
  text-decoration: none;
  font-weight: ${props => props.theme.fonts.weights.medium};
  transition: all 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary.main};
  }
`;

const ProductContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.lg};
  }
`;

const ImageSection = styled.div`
  position: relative;
`;

const MainImage = styled(motion.div)<{ bgImage?: string }>`
  height: 400px;
  border-radius: ${props => props.theme.borderRadius.lg};
  background: ${props => props.bgImage ? `url(${props.bgImage})` : `linear-gradient(135deg, ${props.theme.colors.primary.light}, ${props.theme.colors.secondary.light})`};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  box-shadow: ${props => props.theme.shadows.lg};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ThumbnailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: ${props => props.theme.spacing.sm};
`;

const Thumbnail = styled.div<{ bgImage?: string; active?: boolean }>`
  height: 80px;
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => props.bgImage ? `url(${props.bgImage})` : `linear-gradient(135deg, ${props.theme.colors.primary.light}, ${props.theme.colors.secondary.light})`};
  background-size: cover;
  background-position: center;
  cursor: pointer;
  border: 2px solid ${props => props.active ? props.theme.colors.primary.main : 'transparent'};
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary.main};
    transform: scale(1.05);
  }
`;

const ProductInfo = styled.div`
  position: relative;
`;

const ProductBadges = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Badge = styled.span<{ type: 'featured' | 'new' | 'sale' }>`
  padding: 0.375rem 0.75rem;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: 0.875rem;
  font-weight: ${props => props.theme.fonts.weights.medium};
  text-transform: uppercase;
  
  ${props => {
    switch (props.type) {
      case 'featured':
        return `background: ${props.theme.colors.warning.main}; color: ${props.theme.colors.warning.dark};`;
      case 'new':
        return `background: ${props.theme.colors.success.main}; color: white;`;
      case 'sale':
        return `background: ${props.theme.colors.error.main}; color: white;`;
      default:
        return `background: ${props.theme.colors.primary.main}; color: white;`;
    }
  }}
`;

const ProductTitle = styled(motion.h1)`
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: ${props => props.theme.fonts.weights.bold};
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.md};
  line-height: 1.2;
`;

const ProductMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Category = styled.span`
  background: ${props => props.theme.colors.primary.light}20;
  color: ${props => props.theme.colors.primary.main};
  padding: 0.5rem 1rem;
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: ${props => props.theme.fonts.weights.medium};
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Stars = styled.div`
  display: flex;
  gap: 0.125rem;
`;

const RatingText = styled.span`
  color: ${props => props.theme.colors.text.secondary};
  font-size: ${props => props.theme.fonts.sizes.sm};
`;

const PriceSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const CurrentPrice = styled.div`
  font-size: 2.5rem;
  font-weight: ${props => props.theme.fonts.weights.bold};
  color: ${props => props.theme.colors.primary.main};
`;

const PriceRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${props => props.theme.spacing.md};
`;

const OriginalPrice = styled.span`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.text.secondary};
  text-decoration: line-through;
`;

const Discount = styled.span`
  background: ${props => props.theme.colors.error.main};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: 0.875rem;
  font-weight: ${props => props.theme.fonts.weights.medium};
`;

const Description = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ShortDescription = styled.p`
  font-size: ${props => props.theme.fonts.sizes.lg};
  color: ${props => props.theme.colors.text.primary};
  font-weight: ${props => props.theme.fonts.weights.medium};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const FullDescription = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  line-height: 1.6;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const AddToCartButton = styled(motion.button)`
  flex: 2;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
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
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SecondaryButton = styled(motion.button)`
  flex: 1;
  padding: ${props => props.theme.spacing.md};
  background: transparent;
  color: ${props => props.theme.colors.text.primary};
  border: 2px solid ${props => props.theme.colors.border.main};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fonts.sizes.body};
  font-weight: ${props => props.theme.fonts.weights.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.background.secondary};
    transform: translateY(-2px);
  }
`;

const QuickInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.background.secondary};
  border-radius: ${props => props.theme.borderRadius.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const InfoItem = styled.div`
  text-align: center;
`;

const InfoLabel = styled.div`
  font-size: ${props => props.theme.fonts.sizes.sm};
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 0.25rem;
`;

const InfoValue = styled.div`
  font-weight: ${props => props.theme.fonts.weights.semibold};
  color: ${props => props.theme.colors.text.primary};
`;

const TabsSection = styled.div`
  margin-top: ${props => props.theme.spacing.xl};
`;

const TabsList = styled.div`
  display: flex;
  border-bottom: 2px solid ${props => props.theme.colors.border.light};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Tab = styled.button<{ active?: boolean }>`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  background: transparent;
  border: none;
  border-bottom: 2px solid ${props => props.active ? props.theme.colors.primary.main : 'transparent'};
  color: ${props => props.active ? props.theme.colors.primary.main : props.theme.colors.text.secondary};
  font-weight: ${props => props.theme.fonts.weights.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary.main};
  }
`;

const TabContent = styled(motion.div)`
  min-height: 200px;
`;

const FeaturesList = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing.md};
`;

const FeatureItem = styled.div<{ included?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => props.included ? props.theme.colors.success.light + '20' : props.theme.colors.background.secondary};
  opacity: ${props => props.included ? 1 : 0.6};
`;

const FeatureIcon = styled.div<{ included?: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${props => props.included ? props.theme.colors.success.main : props.theme.colors.text.secondary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
`;

const TechTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TechTag = styled.span`
  background: ${props => props.theme.colors.primary.light}20;
  color: ${props => props.theme.colors.primary.main};
  padding: 0.5rem 1rem;
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: ${props => props.theme.fonts.weights.medium};
  border: 1px solid ${props => props.theme.colors.primary.light};
`;

const LoadingSpinner = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  font-size: ${props => props.theme.fonts.sizes.lg};
  color: ${props => props.theme.colors.text.secondary};
`;

const ErrorMessage = styled(motion.div)`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.error.main};
`;

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('features');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (productId: string) => {
    try {
      setLoading(true);
      const response = await apiService.products.getById(productId);
      if (response.data.success) {
        setProduct(response.data.data);
      } else {
        setError('Product not found');
      }
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product._id,
        title: product.title,
        price: product.price,
        image: product.images?.[0]?.url,
        quantity: 1,
      });
      // You could show a success message here
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: i < rating ? '#ffd700' : '#ddd', fontSize: '1.2rem' }}>★</span>
    ));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const isNew = (createdAt: string | Date) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffDays = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  const hasDiscount = (product: Product) => {
    return product.originalPrice && product.originalPrice > product.price;
  };

  const getDiscountPercentage = (product: Product) => {
    if (!hasDiscount(product)) return 0;
    return Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100);
  };

  if (loading) {
    return (
      <PageWrapper>
        <LoadingSpinner
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Loading product details... ⏳
        </LoadingSpinner>
      </PageWrapper>
    );
  }

  if (error || !product) {
    return (
      <PageWrapper>
        <ErrorMessage
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h2>Product Not Found</h2>
          <p>{error || 'The product you are looking for does not exist.'}</p>
          <SecondaryButton onClick={() => navigate('/products')}>
            ← Back to Products
          </SecondaryButton>
        </ErrorMessage>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <BackButton to="/products">
        ← Back to Products
      </BackButton>

      <ProductContainer
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <ImageSection>
          <MainImage
            bgImage={product.images?.[selectedImageIndex]?.url}
            key={selectedImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {!product.images?.[selectedImageIndex]?.url && (
              <span>📦 {product.title}</span>
            )}
          </MainImage>
          
          {product.images && product.images.length > 1 && (
            <ThumbnailGrid>
              {product.images.map((image, index) => (
                <Thumbnail
                  key={index}
                  bgImage={image.url}
                  active={index === selectedImageIndex}
                  onClick={() => setSelectedImageIndex(index)}
                />
              ))}
            </ThumbnailGrid>
          )}
        </ImageSection>

        <ProductInfo>
          <ProductBadges>
            {product.isFeatured && <Badge type="featured">Featured</Badge>}
            {isNew(product.createdAt) && !product.isFeatured && <Badge type="new">New</Badge>}
            {hasDiscount(product) && <Badge type="sale">{getDiscountPercentage(product)}% Off</Badge>}
          </ProductBadges>

          <ProductTitle
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {product.title}
          </ProductTitle>

          <ProductMeta>
            <Category>{product.category}</Category>
            <Rating>
              <Stars>{renderStars(Math.floor(product.rating?.average || 0))}</Stars>
              <RatingText>
                {product.rating?.average?.toFixed(1)} ({product.rating?.count} reviews)
              </RatingText>
            </Rating>
          </ProductMeta>

          <PriceSection>
            <PriceRow>
              <CurrentPrice>{formatPrice(product.price)}</CurrentPrice>
              {hasDiscount(product) && (
                <>
                  <OriginalPrice>{formatPrice(product.originalPrice!)}</OriginalPrice>
                  <Discount>Save {getDiscountPercentage(product)}%</Discount>
                </>
              )}
            </PriceRow>
          </PriceSection>

          <Description>
            <ShortDescription>{product.shortDescription}</ShortDescription>
          </Description>

          <ActionButtons>
            <AddToCartButton
              onClick={handleAddToCart}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              🛒 Add to Cart
            </AddToCartButton>
            {product.demoUrl && (
              <SecondaryButton
                as="a"
                href={product.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                👀 View Demo
              </SecondaryButton>
            )}
          </ActionButtons>

          <QuickInfo>
            <InfoItem>
              <InfoLabel>Delivery Time</InfoLabel>
              <InfoValue>{product.deliveryTime}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Support Duration</InfoLabel>
              <InfoValue>{product.supportDuration}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Difficulty Level</InfoLabel>
              <InfoValue>{product.difficulty}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Total Sales</InfoLabel>
              <InfoValue>{product.sales}+ sold</InfoValue>
            </InfoItem>
          </QuickInfo>
        </ProductInfo>
      </ProductContainer>

      <TabsSection>
        <TabsList>
          <Tab
            active={activeTab === 'features'}
            onClick={() => setActiveTab('features')}
          >
            Features
          </Tab>
          <Tab
            active={activeTab === 'description'}
            onClick={() => setActiveTab('description')}
          >
            Description
          </Tab>
          <Tab
            active={activeTab === 'technologies'}
            onClick={() => setActiveTab('technologies')}
          >
            Technologies
          </Tab>
          {product.customizationOptions?.available && (
            <Tab
              active={activeTab === 'customization'}
              onClick={() => setActiveTab('customization')}
            >
              Customization
            </Tab>
          )}
        </TabsList>

        <AnimatePresence mode="wait">
          <TabContent
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'features' && (
              <FeaturesList>
                {product.features?.map((feature, index) => (
                  <FeatureItem key={index} included={feature.included}>
                    <FeatureIcon included={feature.included}>
                      {feature.included ? '✓' : '✗'}
                    </FeatureIcon>
                    <div>
                      <h4>{feature.title}</h4>
                      {feature.description && <p>{feature.description}</p>}
                    </div>
                  </FeatureItem>
                ))}
              </FeaturesList>
            )}

            {activeTab === 'description' && (
              <FullDescription>{product.description}</FullDescription>
            )}

            {activeTab === 'technologies' && (
              <TechTags>
                {product.technologies?.map((tech, index) => (
                  <TechTag key={index}>{tech}</TechTag>
                ))}
              </TechTags>
            )}

            {activeTab === 'customization' && product.customizationOptions?.available && (
              <div>
                <h3>Customization Options</h3>
                <p>{product.customizationOptions.description}</p>
                {product.customizationOptions.additionalCost > 0 && (
                  <p>
                    <strong>Additional Cost:</strong> {formatPrice(product.customizationOptions.additionalCost)}
                  </p>
                )}
              </div>
            )}
          </TabContent>
        </AnimatePresence>
      </TabsSection>
    </PageWrapper>
  );
};

export default ProductDetailPage;