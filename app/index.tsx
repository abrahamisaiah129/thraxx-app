import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { AppSplashScreen } from '@/components/AppSplashScreen';
import { useAuthStore } from '@/store/useAuthStore';

export default function Index() {
  const [showSplash, setShowSplash] = useState(true);
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 800);
    return () => clearTimeout(timer);
  }, []);
  if (showSplash) {
    return <AppSplashScreen />;
  }
  if (!isAuthenticated || !user?.role) {
    return <Redirect href="/auth/login" />;
  }
  if (user.role === 'admin') {
    return <Redirect href="/admin" />;
  }
  if (user.role === 'rider') {
    return <Redirect href="/rider" />;
  }
  if (user.role === 'fleet_manager') {
    return <Redirect href="/fleet_manager" />;
  }
  return <Redirect href="/auth/login" />;
}
