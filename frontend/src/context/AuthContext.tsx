import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the user object and context
interface User {
  // Define the properties of your user object
  // Example:
  id?: number;
  username: string;
  email: string;
  // Add other relevant user fields
}

interface AuthContextType {
  user: User | null;
  login: (email?: string, password?: string) => Promise<void>; // Keep async for potential future use, but logic is sync
  logout: () => void;
  // Add other auth functions if needed (e.g., register)
}

// Create the context with a default value (can be null or undefined)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the mock user data
const mockUser: User = {
  id: 999,
  username: 'mockuser',
  email: 'mock@example.com',
  // Add other fields as needed
};

// Define props for the provider
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  // Initialize the user state directly with the mockUser
  const [user, setUser] = useState<User | null>(mockUser);
  console.log('AuthProvider Initialized. User:', user); // Add this log

  // Mock Login Function (can remain for potential future use or be commented out)
  // Update the login function in AuthContext.tsx
  const login = async (email: string, password: string, token?: string, userData?: any) => {
    try {
      // If token and userData are provided, use them directly
      if (token && userData) {
        // Store token in localStorage
        localStorage.setItem('token', token);
        
        // Set user state
        setUser(userData);
        setIsAuthenticated(true);
        
        return;
      }
      
      // Otherwise, make the API call (this part can remain commented if needed)
      /* 
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      // Store token in localStorage
      localStorage.setItem('token', token);
      
      // Set user state
      setUser(user);
      setIsAuthenticated(true);
      */
      
      // For now, use mock login if no token/userData provided
      console.log('Using mock login as fallback');
      const mockUser = { id: 1, username: 'user', email };
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('token', 'mock-token');
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Logout Function
  const logout = () => {
    console.log("Logging out.");
    setUser(null);
  };

  // Value provided by the context
  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Export the context itself if needed elsewhere (though useAuth is preferred)
export default AuthContext;
