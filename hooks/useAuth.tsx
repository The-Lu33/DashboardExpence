import { AuthContext, AuthContextType } from '@/contexts/auth';
import { useContext } from 'react';

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export default useAuth;