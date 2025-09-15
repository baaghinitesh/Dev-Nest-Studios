import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, AuthState } from '../types';
import { apiService } from '../services/api';

// Action types
type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'AUTH_FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: User };

// Initial state
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: localStorage.getItem('token'),
  loading: true,
};

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        loading: true,
      };
    
    case 'AUTH_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      };
    
    case 'AUTH_FAILURE':
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
      };
    
    case 'LOGOUT':
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
      };
    
    case 'UPDATE_USER':
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
      };
    
    default:
      return state;
  }
};

// Context type
interface AuthContextType {
  state: AuthState;
  authState: AuthState;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
  checkAuth: () => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check authentication on app load
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      dispatch({ type: 'AUTH_FAILURE' });
      return;
    }

    try {
      dispatch({ type: 'AUTH_START' });
      const response = await apiService.auth.getMe();
      
      if (response.data.success && response.data.data?.user) {
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: {
            user: response.data.data.user,
            token,
          },
        });
      } else {
        dispatch({ type: 'AUTH_FAILURE' });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      dispatch({ type: 'AUTH_FAILURE' });
    }
  };

  const login = async (email: string, password: string) => {
    try {
      dispatch({ type: 'AUTH_START' });
      
      const response = await apiService.auth.login({ email, password });
      
      if (response.data.success && response.data.data) {
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: {
            user: response.data.data.user,
            token: response.data.data.token,
          },
        });
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error: any) {
      dispatch({ type: 'AUTH_FAILURE' });
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      dispatch({ type: 'AUTH_START' });
      
      const response = await apiService.auth.register({ name, email, password });
      
      if (response.data.success && response.data.data) {
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: {
            user: response.data.data.user,
            token: response.data.data.token,
          },
        });
      } else {
        throw new Error(response.data.message || 'Registration failed');
      }
    } catch (error: any) {
      dispatch({ type: 'AUTH_FAILURE' });
      throw error;
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (user: User) => {
    dispatch({ type: 'UPDATE_USER', payload: user });
  };

  const setAuthState = (newState: React.SetStateAction<AuthState>) => {
    if (typeof newState === 'function') {
      const updatedState = newState(state);
      if (updatedState.isAuthenticated && updatedState.user && updatedState.token) {
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: {
            user: updatedState.user,
            token: updatedState.token,
          },
        });
      } else {
        dispatch({ type: 'AUTH_FAILURE' });
      }
    }
  };

  const value: AuthContextType = {
    state,
    authState: state,
    setAuthState,
    login,
    register,
    logout,
    updateUser,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};