import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Product, ProductFilters } from '../types';
import { apiService } from '../services/api';

// Styled Components
const PageWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl};
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: ${props => props.theme.fonts.weights.bold};
  margin-bottom: ${props => props.theme.spacing.md};
  background: linear-gradient(135deg, ${props => props.theme.colors.primary.main}, ${props => props.theme.colors.secondary.main});
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  font-size: ${props => props.theme.fonts.sizes.lg};
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const FilterSection = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.xl};
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.sm};
  }
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  padding-left: 3rem;
  border: 2px solid ${props => props.theme.colors.border.light};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-size: ${props => props.theme.fonts.sizes.body};
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary.main};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary.main}20;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: ${props => props.theme.spacing.sm};
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.text.secondary};
  font-size: 1.2rem;
`;

const FilterDropdown = styled.select`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.theme.colors.border.light};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fonts.sizes.body};
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary.main};
  }
`;

const SortDropdown = styled(FilterDropdown)`
  min-width: 200px;
`;

const ResultsInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.text.secondary};
`;

const ProductGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const ProductCard = styled(motion.div)`
  background: white;
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const ProductImage = styled.div<{ bgImage?: string }>`
  height: 200px;
  background: ${props => props.bgImage ? `url(${props.bgImage})` : `linear-gradient(135deg, ${props.theme.colors.primary.light}, ${props.theme.colors.secondary.light})`};
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
`;

const ProductBadge = styled.div<{ type: 'featured' | 'new' | 'sale' }>`
  position: absolute;
  top: ${props => props.theme.spacing.sm};
  right: ${props => props.theme.spacing.sm};
  padding: 0.25rem 0.5rem;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: 0.75rem;
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

const ProductInfo = styled.div`
  padding: ${props => props.theme.spacing.lg};
`;

const ProductTitle = styled.h3`
  font-size: ${props => props.theme.fonts.sizes.lg};
  font-weight: ${props => props.theme.fonts.weights.semibold};
  margin-bottom: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.text.primary};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProductDescription = styled.p`
  font-size: ${props => props.theme.fonts.sizes.sm};
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: ${props => props.theme.spacing.md};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
`;

const ProductMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ProductCategory = styled.span`
  font-size: ${props => props.theme.fonts.sizes.sm};
  color: ${props => props.theme.colors.primary.main};
  background: ${props => props.theme.colors.primary.light}20;
  padding: 0.25rem 0.5rem;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-weight: ${props => props.theme.fonts.weights.medium};
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: ${props => props.theme.fonts.sizes.sm};
  color: ${props => props.theme.colors.text.secondary};
`;

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const CurrentPrice = styled.span`
  font-size: ${props => props.theme.fonts.sizes.xl};
  font-weight: ${props => props.theme.fonts.weights.bold};
  color: ${props => props.theme.colors.primary.main};
`;

const OriginalPrice = styled.span`
  font-size: ${props => props.theme.fonts.sizes.body};
  color: ${props => props.theme.colors.text.secondary};
  text-decoration: line-through;
`;

const ProductTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Tag = styled.span`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.text.secondary};
  background: ${props => props.theme.colors.background.secondary};
  padding: 0.125rem 0.375rem;
  border-radius: ${props => props.theme.borderRadius.sm};
`;

const ViewButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: ${props => props.theme.spacing.sm};
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

const LoadingSpinner = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  font-size: ${props => props.theme.fonts.sizes.lg};
  color: ${props => props.theme.colors.text.secondary};
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.text.secondary};
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.xl};
`;

const PageButton = styled.button<{ active?: boolean }>`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.border.light};
  background: ${props => props.active ? props.theme.colors.primary.main : 'white'};
  color: ${props => props.active ? 'white' : props.theme.colors.text.primary};
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? props.theme.colors.primary.dark : props.theme.colors.background.secondary};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Main Component
const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ProductFilters>({
    search: '',
    category: '',
    sort: 'newest',
    page: 1,
    limit: 12,
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const categories = [
    'All',
    'Web Applications',
    'Mobile Apps',
    'E-commerce',
    'Landing Pages',
    'Backend APIs',
    'UI/UX Design',
    'Custom Development',
    'Consulting',
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'popular', label: 'Most Popular' },
  ];

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value && key !== 'category') {
          params.append(key, value.toString());
        }
      });
      
      if (filters.category && filters.category !== 'All') {
        params.append('category', filters.category);
      }

      const response = await apiService.products.getAll(params.toString() ? Object.fromEntries(params.entries()) : {});
      if (response.data.success) {
        setProducts(response.data.data.products);
        setPagination(response.data.data.pagination);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: keyof ProductFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: key !== 'page' ? 1 : value, // Reset page when other filters change
    }));
  };

  const handlePageChange = (page: number) => {
    handleFilterChange('page', page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: i < rating ? '#ffd700' : '#ddd' }}>★</span>
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

  return (
    <PageWrapper>
      <Header>
        <Title
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🛍️ Marketplace
        </Title>
        <Subtitle>
          Discover premium development solutions crafted by DevNestStudios
        </Subtitle>
      </Header>

      <FilterSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <SearchContainer>
          <SearchIcon>🔍</SearchIcon>
          <SearchInput
            type="text"
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </SearchContainer>

        <FilterDropdown
          value={filters.category || 'All'}
          onChange={(e) => handleFilterChange('category', e.target.value === 'All' ? '' : e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </FilterDropdown>

        <SortDropdown
          value={filters.sort}
          onChange={(e) => handleFilterChange('sort', e.target.value)}
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SortDropdown>
      </FilterSection>

      <ResultsInfo>
        <span>
          {pagination.totalProducts} products found
          {filters.category && filters.category !== 'All' && ` in ${filters.category}`}
        </span>
        <span>
          Page {pagination.currentPage} of {pagination.totalPages}
        </span>
      </ResultsInfo>

      {loading ? (
        <LoadingSpinner
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Loading amazing products... ⏳
        </LoadingSpinner>
      ) : products.length === 0 ? (
        <EmptyState
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h3>No products found</h3>
          <p>Try adjusting your search or filters to find what you're looking for.</p>
        </EmptyState>
      ) : (
        <>
          <ProductGrid
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <AnimatePresence mode="wait">
              {products.map((product, index) => (
                <ProductCard
                  key={product._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ 
                    duration: 0.4,
                    delay: index * 0.1,
                  }}
                  whileHover={{ y: -8 }}
                >
                  <ProductImage bgImage={product.images?.[0]?.url}>
                    {!product.images?.[0]?.url && (
                      <span>📦 {product.title}</span>
                    )}
                    {product.isFeatured && <ProductBadge type="featured">Featured</ProductBadge>}
                    {isNew(product.createdAt) && !product.isFeatured && <ProductBadge type="new">New</ProductBadge>}
                    {hasDiscount(product) && !product.isFeatured && !isNew(product.createdAt) && (
                      <ProductBadge type="sale">Sale</ProductBadge>
                    )}
                  </ProductImage>

                  <ProductInfo>
                    <ProductTitle>{product.title}</ProductTitle>
                    <ProductDescription>{product.shortDescription}</ProductDescription>
                    
                    <ProductMeta>
                      <ProductCategory>{product.category}</ProductCategory>
                      <ProductRating>
                        {renderStars(Math.floor(product.rating?.average || 0))}
                        <span>({product.rating?.count || 0})</span>
                      </ProductRating>
                    </ProductMeta>

                    <ProductPrice>
                      <CurrentPrice>{formatPrice(product.price)}</CurrentPrice>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <OriginalPrice>{formatPrice(product.originalPrice)}</OriginalPrice>
                      )}
                    </ProductPrice>

                    {product.tags && product.tags.length > 0 && (
                      <ProductTags>
                        {product.tags.slice(0, 3).map((tag, i) => (
                          <Tag key={i}>{tag}</Tag>
                        ))}
                        {product.tags.length > 3 && <Tag>+{product.tags.length - 3} more</Tag>}
                      </ProductTags>
                    )}

                    <ViewButton to={`/products/${product._id}`}>
                      View Details →
                    </ViewButton>
                  </ProductInfo>
                </ProductCard>
              ))}
            </AnimatePresence>
          </ProductGrid>

          {pagination.totalPages > 1 && (
            <Pagination>
              <PageButton
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={!pagination.hasPrevPage}
              >
                ← Previous
              </PageButton>
              
              {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                const page = Math.max(1, pagination.currentPage - 2) + i;
                if (page <= pagination.totalPages) {
                  return (
                    <PageButton
                      key={page}
                      active={page === pagination.currentPage}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </PageButton>
                  );
                }
                return null;
              })}
              
              <PageButton
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={!pagination.hasNextPage}
              >
                Next →
              </PageButton>
            </Pagination>
          )}
        </>
      )}
    </PageWrapper>
  );
};

export default ProductsPage;