import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  padding: ${props => props.theme.spacing.xl};
`;

const Spinner = styled.div<{ size?: string; color?: string }>`
  border: 3px solid ${props => props.theme.colors.border.light};
  border-top: 3px solid ${props => props.color || props.theme.colors.primary.main};
  border-radius: 50%;
  width: ${props => props.size || '40px'};
  height: ${props => props.size || '40px'};
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  margin-top: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text.secondary};
  text-align: center;
`;

interface LoadingSpinnerProps {
  size?: string;
  color?: string;
  text?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size, 
  color, 
  text, 
  fullScreen = false 
}) => {
  if (fullScreen) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        zIndex: 9999
      }}>
        <Spinner size={size} color={color} />
        {text && <LoadingText>{text}</LoadingText>}
      </div>
    );
  }

  return (
    <SpinnerWrapper>
      <div style={{ textAlign: 'center' }}>
        <Spinner size={size} color={color} />
        {text && <LoadingText>{text}</LoadingText>}
      </div>
    </SpinnerWrapper>
  );
};

export default LoadingSpinner;