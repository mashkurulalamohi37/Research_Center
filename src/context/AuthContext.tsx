import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '../types';

interface AuthContextType {
  user: User | null;
  role: Role;
  login: (email: string, role?: Role) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: Role) => void;
  isAuthenticated: boolean;
}

const mockUsers: Record<Role, User> = {
  admin: {
    id: 'usr-admin-01',
    name: 'Prof. Dr. Sarah Lin',
    email: 'director@airc.research.edu',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    title: 'Founding Director & Chief Scientist',
    department: 'School of Computer Science & AI',
  },
  researcher: {
    id: 'usr-researcher-02',
    name: 'Dr. Marcus Vance',
    email: 'm.vance@airc.research.edu',
    role: 'researcher',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    title: 'Lead Investigator, Visual Intelligence',
    department: 'Department of Electrical & Computer Engineering',
  },
  guest: {
    id: 'usr-guest-00',
    name: 'Guest Visitor',
    email: 'guest@airc.org',
    role: 'guest',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role>(() => {
    const saved = localStorage.getItem('airc-auth-role') as Role;
    return saved && ['admin', 'researcher', 'guest'].includes(saved) ? saved : 'guest';
  });

  const [user, setUser] = useState<User | null>(() => {
    const savedRole = (localStorage.getItem('airc-auth-role') as Role) || 'guest';
    return savedRole === 'guest' ? null : mockUsers[savedRole];
  });

  useEffect(() => {
    localStorage.setItem('airc-auth-role', role);
    if (role === 'guest') {
      setUser(null);
    } else {
      setUser(mockUsers[role]);
    }
  }, [role]);

  const login = async (email: string, targetRole: Role = 'researcher'): Promise<boolean> => {
    // In mock mode, if email contains 'admin', treat as admin
    const resolvedRole: Role = email.toLowerCase().includes('admin') ? 'admin' : targetRole;
    setRole(resolvedRole);
    setUser(mockUsers[resolvedRole]);
    return true;
  };

  const logout = () => {
    setRole('guest');
    setUser(null);
  };

  const switchRole = (newRole: Role) => {
    setRole(newRole);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        login,
        logout,
        switchRole,
        isAuthenticated: role !== 'guest',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
