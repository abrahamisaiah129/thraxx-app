import { useEffect } from 'react';
import * as Linking from 'expo-linking';
import { handleIncomingDeepLink } from '@/services/deepLinking';

/**
 * Hook to listen for incoming deep links both on initial cold start
 * and when the app is foregrounded.
 */
export function useDeepLinking() {
  useEffect(() => {
    // 1. Cold start / initial launch from a deep link
    let isMounted = true;

    async function checkInitialUrl() {
      try {
        const initialUrl = await Linking.getInitialURL();
        if (initialUrl && isMounted) {
          handleIncomingDeepLink(initialUrl);
        }
      } catch (err) {
        console.warn('Error reading initial deep link URL:', err);
      }
    }

    checkInitialUrl();

    // 2. Runtime listener when app is open or in background
    const subscription = Linking.addEventListener('url', (event) => {
      if (event.url) {
        handleIncomingDeepLink(event.url);
      }
    });

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, []);
}
