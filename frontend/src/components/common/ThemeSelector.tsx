import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const ThemeSelectorContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const ThemeButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.background.secondary};
  color: ${props => props.theme.colors.text.primary};
  border: 1px solid ${props => props.theme.colors.border.light};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fonts.sizes.sm};
  font-weight: ${props => props.theme.fonts.weights.medium};
  cursor: pointer;
  transition: ${props => props.theme.transitions.all};
  min-width: 140px;

  &:hover {
    background: ${props => props.theme.colors.background.tertiary};
    border-color: ${props => props.theme.colors.primary.main};
    transform: translateY(-1px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary.main}33;
  }
`;

const ThemeIcon = styled.span`
  font-size: 1.2rem;
  line-height: 1;
`;

const ThemeName = styled.span`
  flex: 1;
  text-align: left;
`;

const DropdownIcon = styled(motion.span)`
  font-size: 0.8rem;
  line-height: 1;
  color: ${props => props.theme.colors.text.muted};
`;

const ThemeDropdown = styled(motion.div)`
  position: absolute;
  top: calc(100% + ${props => props.theme.spacing.xs});
  right: 0;
  background: ${props => props.theme.colors.background.primary};
  border: 1px solid ${props => props.theme.colors.border.light};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.lg};
  overflow: hidden;
  z-index: ${props => props.theme.zIndex.dropdown};
  min-width: 200px;
`;

const ThemeOption = styled(motion.button)`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md};
  background: transparent;
  border: none;
  color: ${props => props.theme.colors.text.primary};
  font-size: ${props => props.theme.fonts.sizes.sm};
  font-weight: ${props => props.theme.fonts.weights.medium};
  cursor: pointer;
  transition: ${props => props.theme.transitions.all};

  &:hover {
    background: ${props => props.theme.colors.background.secondary};
  }

  &:focus {
    outline: none;
    background: ${props => props.theme.colors.background.secondary};
  }
`;

const ThemePreview = styled.div<{ themeId: string }>`
  width: 24px;
  height: 24px;
  border-radius: ${props => props.theme.borderRadius.sm};
  display: flex;
  overflow: hidden;
  border: 1px solid ${props => props.theme.colors.border.light};
`;

const ColorStripe = styled.div<{ color: string }>`
  flex: 1;
  background: ${props => props.color};
`;

const CheckIcon = styled.span`
  color: ${props => props.theme.colors.primary.main};
  font-size: 1rem;
  margin-left: auto;
`;

const ThemeSelector: React.FC = () => {
  const { currentTheme, setTheme, availableThemes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const getThemeIcon = (themeId: string) => {
    const icons: Record<string, string> = {
      light: '☀️',
      dark: '🌙',
      blue: '🌊',
      purple: '🔮',
      green: '🌿',
    };
    return icons[themeId] || '🎨';
  };

  const getThemeColors = (themeId: string) => {
    // Return representative colors for the theme preview
    const colors: Record<string, string[]> = {
      light: ['#4f46e5', '#f97316', '#22c55e'],
      dark: ['#6366f1', '#fb7185', '#10b981'],
      blue: ['#3b82f6', '#0ea5e9', '#22c55e'],
      purple: ['#a855f7', '#ec4899', '#22c55e'],
      green: ['#22c55e', '#65a30d', '#16a34a'],
    };
    return colors[themeId] || ['#4f46e5', '#f97316', '#22c55e'];
  };

  const handleThemeSelect = (themeId: string) => {
    setTheme(themeId as any);
    setIsOpen(false);
  };

  const currentThemeData = availableThemes.find(t => t.id === currentTheme);

  return (
    <ThemeSelectorContainer>
      <ThemeButton
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <ThemeIcon>{getThemeIcon(currentTheme)}</ThemeIcon>
        <ThemeName>{currentThemeData?.name}</ThemeName>
        <DropdownIcon
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ▼
        </DropdownIcon>
      </ThemeButton>

      <AnimatePresence>
        {isOpen && (
          <>
            <ThemeDropdown
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {availableThemes.map((theme) => (
                <ThemeOption
                  key={theme.id}
                  onClick={() => handleThemeSelect(theme.id)}
                  whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ThemeIcon>{getThemeIcon(theme.id)}</ThemeIcon>
                  
                  <ThemePreview themeId={theme.id}>
                    {getThemeColors(theme.id).map((color, index) => (
                      <ColorStripe key={index} color={color} />
                    ))}
                  </ThemePreview>
                  
                  <span>{theme.name}</span>
                  
                  {currentTheme === theme.id && (
                    <CheckIcon>✓</CheckIcon>
                  )}
                </ThemeOption>
              ))}
            </ThemeDropdown>
            
            {/* Backdrop to close dropdown */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: -1,
              }}
              onClick={() => setIsOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </ThemeSelectorContainer>
  );
};

export default ThemeSelector;