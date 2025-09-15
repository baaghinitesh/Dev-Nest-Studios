import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${props => props.theme.colors.text.primary};
    background-color: ${props => props.theme.colors.background.primary};
    line-height: 1.6;
  }

  code {
    font-family: 'Fira Code', 'Monaco', 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-weight: ${props => props.theme.fonts.weights.bold};
    line-height: 1.2;
    color: ${props => props.theme.colors.text.primary};
    margin-bottom: 0.5em;
  }

  h1 {
    font-size: ${props => props.theme.fonts.sizes.h1};
  }

  h2 {
    font-size: ${props => props.theme.fonts.sizes.h2};
  }

  h3 {
    font-size: ${props => props.theme.fonts.sizes.h3};
  }

  h4 {
    font-size: ${props => props.theme.fonts.sizes.h4};
  }

  h5 {
    font-size: ${props => props.theme.fonts.sizes.h5};
  }

  h6 {
    font-size: ${props => props.theme.fonts.sizes.h6};
  }

  p {
    margin-bottom: 1em;
    color: ${props => props.theme.colors.text.secondary};
  }

  /* Links */
  a {
    color: ${props => props.theme.colors.primary.main};
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
      color: ${props => props.theme.colors.primary.dark};
      text-decoration: underline;
    }

    &:focus {
      outline: 2px solid ${props => props.theme.colors.primary.main};
      outline-offset: 2px;
      border-radius: 4px;
    }
  }

  /* Buttons */
  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    border-radius: ${props => props.theme.borderRadius.md};
    transition: all 0.2s ease;

    &:focus {
      outline: 2px solid ${props => props.theme.colors.primary.main};
      outline-offset: 2px;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  /* Form elements */
  input, textarea, select {
    font-family: inherit;
    border: 1px solid ${props => props.theme.colors.border.light};
    border-radius: ${props => props.theme.borderRadius.md};
    padding: ${props => props.theme.spacing.sm};
    font-size: ${props => props.theme.fonts.sizes.body};
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary.main};
      box-shadow: 0 0 0 3px ${props => props.theme.colors.primary.main}20;
    }

    &::placeholder {
      color: ${props => props.theme.colors.text.muted};
    }
  }

  /* Images */
  img {
    max-width: 100%;
    height: auto;
  }

  /* Lists */
  ul, ol {
    padding-left: 1.5em;
  }

  li {
    margin-bottom: 0.25em;
  }

  /* Scrollbars */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.background.secondary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.border.main};
    border-radius: 4px;

    &:hover {
      background: ${props => props.theme.colors.border.dark};
    }
  }

  /* Selection */
  ::selection {
    background-color: ${props => props.theme.colors.primary.main};
    color: white;
  }

  /* Animations */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fadeInUp {
    from { 
      opacity: 0; 
      transform: translateY(20px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }

  @keyframes slideInLeft {
    from { 
      opacity: 0; 
      transform: translateX(-20px); 
    }
    to { 
      opacity: 1; 
      transform: translateX(0); 
    }
  }

  @keyframes slideInRight {
    from { 
      opacity: 0; 
      transform: translateX(20px); 
    }
    to { 
      opacity: 1; 
      transform: translateX(0); 
    }
  }

  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
      transform: translate3d(0, 0, 0);
    }
    40%, 43% {
      transform: translate3d(0, -8px, 0);
    }
    70% {
      transform: translate3d(0, -4px, 0);
    }
    90% {
      transform: translate3d(0, -2px, 0);
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  /* Utility classes */
  .fade-in {
    animation: fadeIn 0.5s ease-out;
  }

  .fade-in-up {
    animation: fadeInUp 0.6s ease-out;
  }

  .slide-in-left {
    animation: slideInLeft 0.5s ease-out;
  }

  .slide-in-right {
    animation: slideInRight 0.5s ease-out;
  }

  .bounce {
    animation: bounce 1s ease-in-out;
  }

  .pulse {
    animation: pulse 2s infinite ease-in-out;
  }

  .spin {
    animation: spin 1s linear infinite;
  }

  /* Responsive utilities */
  .hide-mobile {
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      display: none !important;
    }
  }

  .hide-desktop {
    @media (min-width: calc(${props => props.theme.breakpoints.md} + 1px)) {
      display: none !important;
    }
  }

  .show-mobile {
    display: none;
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      display: block !important;
    }
  }

  .show-desktop {
    display: none;
    @media (min-width: calc(${props => props.theme.breakpoints.md} + 1px)) {
      display: block !important;
    }
  }

  /* Text utilities */
  .text-center {
    text-align: center;
  }

  .text-left {
    text-align: left;
  }

  .text-right {
    text-align: right;
  }

  .text-uppercase {
    text-transform: uppercase;
  }

  .text-lowercase {
    text-transform: lowercase;
  }

  .text-capitalize {
    text-transform: capitalize;
  }

  /* Spacing utilities */
  .m-0 { margin: 0 !important; }
  .mt-0 { margin-top: 0 !important; }
  .mb-0 { margin-bottom: 0 !important; }
  .ml-0 { margin-left: 0 !important; }
  .mr-0 { margin-right: 0 !important; }

  .p-0 { padding: 0 !important; }
  .pt-0 { padding-top: 0 !important; }
  .pb-0 { padding-bottom: 0 !important; }
  .pl-0 { padding-left: 0 !important; }
  .pr-0 { padding-right: 0 !important; }

  /* Loading spinner */
  .loading-spinner {
    border: 2px solid ${props => props.theme.colors.border.light};
    border-top: 2px solid ${props => props.theme.colors.primary.main};
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 1s linear infinite;
  }

  /* Container max-width */
  .container {
    max-width: ${props => props.theme.maxWidth};
    margin: 0 auto;
    padding: 0 ${props => props.theme.spacing.md};
  }

  /* Print styles */
  @media print {
    * {
      background: transparent !important;
      color: black !important;
      box-shadow: none !important;
      text-shadow: none !important;
    }

    a {
      text-decoration: underline;
    }

    a[href]:after {
      content: " (" attr(href) ")";
    }

    img {
      max-width: 100% !important;
    }

    @page {
      margin: 0.5in;
    }

    p, h2, h3 {
      orphans: 3;
      widows: 3;
    }

    h2, h3 {
      page-break-after: avoid;
    }
  }
`;

export default GlobalStyles;