import React from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: ${props => props.theme.fonts.sizes.h1};
  font-weight: ${props => props.theme.fonts.weights.bold};
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.text.primary};
`;

const AdminProductForm: React.FC = () => {
  return (
    <PageWrapper>
      <Title>Product Form</Title>
      <p>Product creation/editing form coming soon...</p>
    </PageWrapper>
  );
};

export default AdminProductForm;