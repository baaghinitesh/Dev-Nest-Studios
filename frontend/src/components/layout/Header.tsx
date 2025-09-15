import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// Icons replaced with emojis for compatibility
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import ThemeSelector from '../common/ThemeSelector';

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: ${props => props.theme.colors.background.primary};
  border-bottom: 1px solid ${props => props.theme.colors.border.light};
  z-index: ${props => props.theme.zIndex.sticky};
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
`;

const Container = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${props => props.theme.components.navbar.height};
`;

const Logo = styled(Link)`
  font-size: ${props => props.theme.fonts.sizes.xl};
  font-weight: ${props => props.theme.fonts.weights.bold};
  color: ${props => props.theme.colors.primary.main};
  text-decoration: none;
  
  &:hover {
    text-decoration: none;
    color: ${props => props.theme.colors.primary.dark};
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.text.secondary};
  font-weight: ${props => props.theme.fonts.weights.medium};
  transition: ${props => props.theme.transitions.all};

  &:hover {
    color: ${props => props.theme.colors.primary.main};
    text-decoration: none;
  }
`;

const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const CartButton = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text.secondary};
  border: 1px solid ${props => props.theme.colors.border.light};
  border-radius: ${props => props.theme.borderRadius.md};
  transition: ${props => props.theme.transitions.all};

  &:hover {
    color: ${props => props.theme.colors.primary.main};
    border-color: ${props => props.theme.colors.primary.main};
    text-decoration: none;
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: ${props => props.theme.colors.error.main};
  color: white;
  font-size: ${props => props.theme.fonts.sizes.xs};
  font-weight: ${props => props.theme.fonts.weights.bold};
  padding: 2px 6px;
  border-radius: ${props => props.theme.borderRadius.full};
  min-width: 18px;
  text-align: center;
`;

const AuthButton = styled(Link)`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.primary.main};
  color: white;
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: ${props => props.theme.fonts.weights.medium};
  transition: ${props => props.theme.transitions.all};

  &:hover {
    background: ${props => props.theme.colors.primary.dark};
    text-decoration: none;
    color: white;
  }
`;

const UserDropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background: transparent;
  color: ${props => props.theme.colors.text.secondary};
  border: 1px solid ${props => props.theme.colors.border.light};
  border-radius: ${props => props.theme.borderRadius.md};
  transition: ${props => props.theme.transitions.all};

  &:hover {
    color: ${props => props.theme.colors.primary.main};
    border-color: ${props => props.theme.colors.primary.main};
  }
`;

const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: calc(100% + ${props => props.theme.spacing.xs});
  right: 0;
  background: ${props => props.theme.colors.background.primary};
  border: 1px solid ${props => props.theme.colors.border.light};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.shadows.lg};
  min-width: 200px;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transform: translateY(${props => props.isOpen ? '0' : '-10px'});
  transition: all 0.2s ease;
  z-index: ${props => props.theme.zIndex.dropdown};
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text.secondary};
  border-bottom: 1px solid ${props => props.theme.colors.border.light};
  transition: ${props => props.theme.transitions.all};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${props => props.theme.colors.background.secondary};
    color: ${props => props.theme.colors.primary.main};
    text-decoration: none;
  }
`;

const LogoutButton = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.error.main};
  background: transparent;
  border: none;
  transition: ${props => props.theme.transitions.all};

  &:hover {
    background: ${props => props.theme.colors.background.secondary};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: ${props => props.theme.colors.text.secondary};
  font-size: ${props => props.theme.fonts.sizes.xl};

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: block;
  }
`;

const Header: React.FC = () => {
  const { state: authState, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <HeaderWrapper>
      <Container>
        <Nav>
          <Logo to="/">DevNestStudios</Logo>
          
          <NavLinks>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <NavLink to="/hire">Hire Us</NavLink>
          </NavLinks>

          <UserActions>
            <ThemeSelector />
            
            <CartButton to="/cart">
              🛍️
              <span className="hide-mobile">Cart</span>
              {cart.itemCount > 0 && <CartCount>{cart.itemCount}</CartCount>}
            </CartButton>

            {authState.isAuthenticated ? (
              <UserDropdown>
                <DropdownButton 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  onBlur={() => setTimeout(() => setIsUserMenuOpen(false), 150)}
                >
                  👤
                  <span className="hide-mobile">{authState.user?.name}</span>
                </DropdownButton>
                
                <DropdownMenu isOpen={isUserMenuOpen}>
                  <DropdownItem to="/dashboard">Dashboard</DropdownItem>
                  <DropdownItem to="/orders">My Orders</DropdownItem>
                  <DropdownItem to="/profile">Profile</DropdownItem>
                  {authState.user?.role === 'admin' && (
                    <DropdownItem to="/admin">Admin Panel</DropdownItem>
                  )}
                  <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
                </DropdownMenu>
              </UserDropdown>
            ) : (
              <AuthButton to="/login">Login</AuthButton>
            )}

            <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? '✖️' : '☰'}
            </MobileMenuButton>
          </UserActions>
        </Nav>
      </Container>
    </HeaderWrapper>
  );
};

export default Header;