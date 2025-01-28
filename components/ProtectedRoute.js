// components/ProtectedRoute.js

import { useEffect, useState } from 'react';
import { isAuthenticated } from '../utils/auth';
import { useRouter } from 'next/router';

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && !isAuthenticated()) {
      // If user is not authenticated, redirect to login page
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
