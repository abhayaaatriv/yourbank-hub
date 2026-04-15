import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface MockUser {
  id: string;
  email: string;
  fullName: string;
  phone: string;
}

interface AuthContextType {
  user: MockUser | null;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName: string, phone: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for stored user in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // Mock validation - accept any email/password combination for demo
      if (!email || !password) {
        return { error: { message: 'Email and password are required' } };
      }

      // Create mock user
      const mockUser: MockUser = {
        id: `user_${Date.now()}`,
        email,
        fullName: email.split('@')[0],
        phone: '+1 234 567 8900',
      };

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      // Navigate after state update
      setTimeout(() => navigate('/'), 0);
      
      return { error: null };
    } catch (error) {
      return { error: { message: 'Sign in failed' } };
    }
  };

  const signUp = async (email: string, password: string, fullName: string, phone: string) => {
    try {
      if (!email || !password || !fullName || !phone) {
        return { error: { message: 'All fields are required' } };
      }

      // Create mock user
      const mockUser: MockUser = {
        id: `user_${Date.now()}`,
        email,
        fullName,
        phone,
      };

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      // Navigate after state update
      setTimeout(() => navigate('/'), 0);
      
      return { error: null };
    } catch (error) {
      return { error: { message: 'Sign up failed' } };
    }
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/auth');
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
