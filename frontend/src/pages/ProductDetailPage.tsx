import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { apiService } from '../services/api';

// Styled Components
const PageWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.background.primary};
  min-height: 100vh;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.text.secondary};
  text-decoration: none;
  font-weight: ${props => props.theme.fonts.weights.medium};
  transition: ${props => props.theme.transitions.all};
  
  &:hover {
    color: ${props => props.theme.colors.primary.main};
  }
`;

const ProductContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.lg};
  }
`;

const LeftSection = styled.div`
  position: relative;
`;

const RightSection = styled.div`
  position: relative;
`;

// Image Gallery Section
const ImageGallery = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const MainImageContainer = styled.div`
  position: relative;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const MainImage = styled(motion.div)<{ bgImage?: string }>`
  height: 500px;
  border-radius: ${props => props.theme.borderRadius.lg};
  background: ${props => props.bgImage ? 
    `url(${props.bgImage})` : 
    `${props.theme.colors.gradients.primary}`
  };
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  box-shadow: ${props => props.theme.shadows.xl};
  border: 1px solid ${props => props.theme.colors.border.light};
  overflow: hidden;
  position: relative;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 100%);
`;

const ProductTypeTag = styled.div`
  position: absolute;
  top: ${props => props.theme.spacing.md};
  left: ${props => props.theme.spacing.md};
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fonts.sizes.sm};
  font-weight: ${props => props.theme.fonts.weights.semibold};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ThumbnailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: ${props => props.theme.spacing.sm};
  max-width: 100%;
`;

const Thumbnail = styled.div<{ bgImage?: string; active?: boolean }>`
  height: 100px;
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => props.bgImage ? 
    `url(${props.bgImage})` : 
    `${props.theme.colors.gradients.secondary}`
  };
  background-size: cover;
  background-position: center;
  cursor: pointer;
  border: 3px solid ${props => props.active ? props.theme.colors.primary.main : props.theme.colors.border.light};
  transition: ${props => props.theme.transitions.all};
  position: relative;
  overflow: hidden;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary.main};
    transform: scale(1.05);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

// Product Info Section
const ProductHeader = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const ProductBadges = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.md};
  flex-wrap: wrap;
`;

const Badge = styled.span<{ type: 'featured' | 'new' | 'sale' | 'popular' }>`
  padding: 0.5rem 1rem;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fonts.sizes.sm};
  font-weight: ${props => props.theme.fonts.weights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  ${props => {
    switch (props.type) {
      case 'featured':
        return `
          background: ${props.theme.colors.warning.main};
          color: ${props.theme.colors.warning.dark};
        `;
      case 'new':
        return `
          background: ${props.theme.colors.success.main};
          color: white;
        `;
      case 'sale':
        return `
          background: ${props.theme.colors.error.main};
          color: white;
        `;
      case 'popular':
        return `
          background: ${props.theme.colors.info.main};
          color: white;
        `;
      default:
        return `
          background: ${props.theme.colors.primary.main};
          color: white;
        `;
    }
  }}
`;

const ProductTitle = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, 3rem);
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
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.md};
`;

const Category = styled.span`
  background: ${props => props.theme.colors.primary.light}20;
  color: ${props => props.theme.colors.primary.main};
  padding: 0.75rem 1.5rem;
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: ${props => props.theme.fonts.weights.semibold};
  border: 2px solid ${props => props.theme.colors.primary.light}40;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const Stars = styled.div`
  display: flex;
  gap: 0.125rem;
`;

const RatingText = styled.span`
  color: ${props => props.theme.colors.text.secondary};
  font-weight: ${props => props.theme.fonts.weights.medium};
`;

const PriceSection = styled(motion.div)`
  background: ${props => props.theme.colors.background.paper};
  border: 2px solid ${props => props.theme.colors.border.light};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.md};
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const CurrentPrice = styled.span`
  font-size: 2.5rem;
  font-weight: ${props => props.theme.fonts.weights.bold};
  color: ${props => props.theme.colors.primary.main};
`;

const OriginalPrice = styled.span`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.text.muted};
  text-decoration: line-through;
`;

const Savings = styled.span`
  background: ${props => props.theme.colors.success.main};
  color: white;
  padding: 0.375rem 0.75rem;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.fonts.sizes.sm};
  font-weight: ${props => props.theme.fonts.weights.semibold};
`;

const PriceNote = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  font-style: italic;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const CustomizationNote = styled.div`
  background: ${props => props.theme.colors.info.light}20;
  border: 2px solid ${props => props.theme.colors.info.light};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.info.dark};
`;

// Action Buttons
const ActionButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const ActionButton = styled(motion.button)<{ variant?: 'primary' | 'secondary' }>`
  padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.xl};
  border: none;
  border-radius: ${props => props.theme.borderRadius.lg};
  font-size: ${props => props.theme.fonts.sizes.lg};
  font-weight: ${props => props.theme.fonts.weights.semibold};
  cursor: pointer;
  transition: ${props => props.theme.transitions.all};
  position: relative;
  overflow: hidden;
  
  ${props => props.variant === 'primary' ? `
    background: ${props.theme.colors.primary.main};
    color: white;
    box-shadow: ${props.theme.shadows.lg};
    
    &:hover {
      background: ${props.theme.colors.primary.dark};
      transform: translateY(-3px);
      box-shadow: ${props.theme.shadows.xl};
    }
  ` : `
    background: ${props.theme.colors.primary.main};
    color: white;
    box-shadow: ${props.theme.shadows.md};
    
    &:hover {
      background: ${props.theme.colors.primary.dark};
      transform: translateY(-2px);
    }
  `}
`;

const DemoButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.background.paper};
  border: 2px solid ${props => props.theme.colors.border.main};
  color: ${props => props.theme.colors.text.primary};
  text-decoration: none;
  border-radius: ${props => props.theme.borderRadius.lg};
  font-weight: ${props => props.theme.fonts.weights.semibold};
  transition: ${props => props.theme.transitions.all};
  width: 100%;
  margin-bottom: ${props => props.theme.spacing.lg};
  
  &:hover {
    border-color: ${props => props.theme.colors.primary.main};
    background: ${props => props.theme.colors.primary.light}10;
    transform: translateY(-2px);
  }
`;

// Description Section
const DescriptionSection = styled.div`
  background: ${props => props.theme.colors.background.paper};
  border: 1px solid ${props => props.theme.colors.border.light};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.fonts.sizes['2xl']};
  font-weight: ${props => props.theme.fonts.weights.bold};
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.lg};
  border-bottom: 2px solid ${props => props.theme.colors.border.light};
  padding-bottom: ${props => props.theme.spacing.md};
`;

const DescriptionText = styled.div`
  color: ${props => props.theme.colors.text.primary};
  line-height: 1.7;
  font-size: ${props => props.theme.fonts.sizes.lg};
  
  p {
    margin-bottom: ${props => props.theme.spacing.md};
  }
  
  ul {
    margin-left: ${props => props.theme.spacing.lg};
    margin-bottom: ${props => props.theme.spacing.md};
  }
  
  li {
    margin-bottom: ${props => props.theme.spacing.sm};
  }
`;

// Features & Technologies
const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background: ${props => props.theme.colors.background.paper};
  border: 1px solid ${props => props.theme.colors.border.light};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text.primary};
  
  &:before {
    content: '✅';
    font-size: 1.2rem;
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.sm};
`;

const TechTag = styled.span`
  background: ${props => props.theme.colors.background.secondary};
  color: ${props => props.theme.colors.text.primary};
  border: 1px solid ${props => props.theme.colors.border.light};
  padding: 0.5rem 1rem;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fonts.sizes.sm};
  font-weight: ${props => props.theme.fonts.weights.medium};
`;

// Loading States
const LoadingSpinner = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  font-size: ${props => props.theme.fonts.sizes.xl};
  color: ${props => props.theme.colors.text.secondary};
`;

const ErrorMessage = styled(motion.div)`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.error.main};
  background: ${props => props.theme.colors.error.light};
  border-radius: ${props => props.theme.borderRadius.lg};
  margin: ${props => props.theme.spacing.xl} 0;
`;

// Main Component
const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  // const { addItem } = useCart(); // Will be implemented later
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (productId: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.products.getById(productId);
      if (response.data.success) {
        setProduct(response.data.data);
      } else {
        setError('Product not found');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    
    try {
      setIsAddingToCart(true);
      // Add to cart implementation will be added later
      console.log('Adding to cart:', product._id);
      // Could show success notification here
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: i < rating ? '#ffd700' : '#ddd', fontSize: '1.5rem' }}>★</span>
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

  const getProductTypeTag = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'Web Applications': '🌐 Website',
      'Mobile Apps': '📱 App',
      'E-commerce': '🛒 Store',
      'Landing Pages': '📄 Landing',
      'Backend APIs': '⚡ API',
      'UI/UX Design': '🎨 Design',
      'Custom Development': '⚙️ Service',
      'Consulting': '💡 Service',
      'AI Agent': '🤖 AI Agent',
    };
    return categoryMap[category] || '📦 Product';
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
          <h2>Oops! {error || 'Product not found'}</h2>
          <p>The product you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate('/products')}
            style={{ 
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              background: 'var(--primary-color)',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer'
            }}
          >
            ← Back to Products
          </button>
        </ErrorMessage>
      </PageWrapper>
    );
  }

  const productImages = product.images && product.images.length > 0 ? product.images : [{ url: '', alt: product.title }];

  return (
    <PageWrapper>
      <BackButton to="/products">
        ← Back to Marketplace
      </BackButton>

      <ProductContainer
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <LeftSection>
          <ImageGallery>
            <MainImageContainer>
              <MainImage 
                bgImage={productImages[selectedImageIndex]?.url}
                key={selectedImageIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ImageOverlay />
                <ProductTypeTag>
                  {getProductTypeTag(product.category)}
                </ProductTypeTag>
                {!productImages[selectedImageIndex]?.url && (
                  <span>📦 {product.title}</span>
                )}
              </MainImage>
            </MainImageContainer>
            
            {productImages.length > 1 && (
              <ThumbnailGrid>
                {productImages.map((image, index) => (
                  <Thumbnail
                    key={index}
                    bgImage={image.url}
                    active={selectedImageIndex === index}
                    onClick={() => setSelectedImageIndex(index)}
                  />
                ))}
              </ThumbnailGrid>
            )}
          </ImageGallery>

          {product.demoUrl && (
            <DemoButton
              href={product.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              🌐 View Live Demo
            </DemoButton>
          )}
        </LeftSection>

        <RightSection>
          <ProductHeader>
            <ProductBadges>
              {product.isFeatured && <Badge type="featured">Featured</Badge>}
              {isNew(product.createdAt) && <Badge type="new">New</Badge>}
              {hasDiscount(product) && <Badge type="sale">Sale</Badge>}
              {(product.rating?.count || 0) > 50 && <Badge type="popular">Popular</Badge>}
            </ProductBadges>

            <ProductTitle
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {product.title}
            </ProductTitle>

            <ProductMeta>
              <Category>{product.category}</Category>
              <Rating>
                <Stars>
                  {renderStars(Math.floor(product.rating?.average || 0))}
                </Stars>
                <RatingText>
                  {product.rating?.average?.toFixed(1) || '0.0'} ({product.rating?.count || 0} reviews)
                </RatingText>
              </Rating>
            </ProductMeta>
          </ProductHeader>

          <PriceSection
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <PriceContainer>
              <CurrentPrice>{formatPrice(product.price)}</CurrentPrice>
              {hasDiscount(product) && (
                <>
                  <OriginalPrice>{formatPrice(product.originalPrice!)}</OriginalPrice>
                  <Savings>
                    Save ${(product.originalPrice! - product.price).toFixed(2)}
                  </Savings>
                </>
              )}
            </PriceContainer>
            <PriceNote>{product.price === 0 ? 'Free Product' : 'One-time purchase'}</PriceNote>
            <CustomizationNote>
              💡 <strong>Fully Customizable</strong> – Our team can customize this solution to meet your specific needs and requirements.
            </CustomizationNote>
          </PriceSection>

          <ActionButtonsContainer>
            <ActionButton
              variant="primary"
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isAddingToCart ? '⏳ Adding...' : '🛒 Add to Cart'}
            </ActionButton>
            <ActionButton
              variant="secondary"
              onClick={() => {
                // Contact logic will be implemented
                window.location.href = '/hire';
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              💬 Contact Us
            </ActionButton>
          </ActionButtonsContainer>
        </RightSection>
      </ProductContainer>

      <DescriptionSection>
        <SectionTitle>📝 Product Description</SectionTitle>
        <DescriptionText
          dangerouslySetInnerHTML={{ 
            __html: product.description || product.shortDescription || 'No description available.' 
          }}
        />
      </DescriptionSection>

      <FeaturesGrid>
        <FeatureCard>
          <SectionTitle>✨ Key Features</SectionTitle>
          <FeatureList>
            {product.features && product.features.length > 0 ? (
              product.features.map((feature, index) => (
                <FeatureItem key={index}>{String(feature)}</FeatureItem>
              ))
            ) : (
              <>
                <FeatureItem>Modern and responsive design</FeatureItem>
                <FeatureItem>Cross-platform compatibility</FeatureItem>
                <FeatureItem>Professional code quality</FeatureItem>
                <FeatureItem>Full documentation included</FeatureItem>
                <FeatureItem>Free support and updates</FeatureItem>
              </>
            )}
          </FeatureList>
        </FeatureCard>

        <FeatureCard>
          <SectionTitle>⚙️ Technologies Used</SectionTitle>
          <TechStack>
            {product.technologies && product.technologies.length > 0 ? (
              product.technologies.map((tech, index) => (
                <TechTag key={index}>{tech}</TechTag>
              ))
            ) : (
              <>
                <TechTag>React</TechTag>
                <TechTag>TypeScript</TechTag>
                <TechTag>Node.js</TechTag>
                <TechTag>MongoDB</TechTag>
                <TechTag>Express.js</TechTag>
              </>
            )}
          </TechStack>
        </FeatureCard>
      </FeaturesGrid>
    </PageWrapper>
  );
};

export default ProductDetailPage;