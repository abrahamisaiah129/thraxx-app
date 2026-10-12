import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import { fleetManagerData } from '@/data/fleetManagerData';

export const APP_SCHEME = 'traxxapp';

/**
 * Creates deep link URLs for different resources in the app
 */
export function getAssignmentDeepLink(assignmentId: string): string {
  return Linking.createURL(`fleet_manager/assignment/${assignmentId}`, { scheme: APP_SCHEME });
}

export function getRiderDeepLink(riderId: string): string {
  return Linking.createURL(`fleet_manager/rider/${riderId}`, { scheme: APP_SCHEME });
}

export function getTrackingDeepLink(waybillNumber: string): string {
  return Linking.createURL(`track/${waybillNumber}`, { scheme: APP_SCHEME });
}

export function getBookingDeepLink(): string {
  return Linking.createURL('fleet_manager/booking', { scheme: APP_SCHEME });
}

/**
 * Resolves an incoming deep link URL and navigates to the matching screen.
 * Handles custom schemes (traxxapp://), Expo URLs (exp://), and web URLs.
 */
export function handleIncomingDeepLink(url: string | null): boolean {
  if (!url) return false;

  try {
    const parsed = Linking.parse(url);
    const path = parsed.path || '';
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    const segments = cleanPath.split('/').filter(Boolean);

    if (segments.length === 0) {
      return false;
    }

    // 1. Assignment detail:
    // traxxapp://fleet_manager/assignment/assignment_001
    // or traxxapp://assignment/assignment_001
    if (
      (segments[0] === 'fleet_manager' && segments[1] === 'assignment' && segments[2]) ||
      (segments[0] === 'assignment' && segments[1])
    ) {
      const assignmentId = segments[0] === 'assignment' ? segments[1] : segments[2];
      router.push(`/fleet_manager/assignment/${assignmentId}` as any);
      return true;
    }

    // 2. Rider / Driver detail:
    // traxxapp://fleet_manager/rider/user_003
    // or traxxapp://rider/user_003 or traxxapp://driver/user_003
    if (
      (segments[0] === 'fleet_manager' && segments[1] === 'rider' && segments[2]) ||
      ((segments[0] === 'rider' || segments[0] === 'driver') && segments[1])
    ) {
      const riderId = segments[0] === 'fleet_manager' ? segments[2] : segments[1];
      router.push(`/fleet_manager/rider/${riderId}` as any);
      return true;
    }

    // 3. Tracking code lookup:
    // traxxapp://track/TRX-100001 or query param ?number=TRX-100001
    if (segments[0] === 'track') {
      const trackingNumber = segments[1] || (parsed.queryParams?.number as string);
      if (trackingNumber) {
        const found = fleetManagerData.Assignments.find(
          (a) => a.waybillTrackingNumber.toLowerCase() === trackingNumber.toLowerCase(),
        );
        if (found) {
          router.push(`/fleet_manager/assignment/${found.assignmentId}` as any);
          return true;
        }
      }
      router.push('/fleet_manager/assignments');
      return true;
    }

    // 4. Booking screen:
    // traxxapp://booking or traxxapp://fleet_manager/booking
    if (segments[0] === 'booking' || (segments[0] === 'fleet_manager' && segments[1] === 'booking')) {
      router.push('/fleet_manager/booking');
      return true;
    }

    // 5. Riders list:
    if (segments[0] === 'riders' || (segments[0] === 'fleet_manager' && segments[1] === 'riders')) {
      router.push('/fleet_manager/riders');
      return true;
    }

    // 6. Assignments list:
    if (segments[0] === 'assignments' || (segments[0] === 'fleet_manager' && segments[1] === 'assignments')) {
      router.push('/fleet_manager/assignments');
      return true;
    }

    // 7. Live Map:
    if (segments[0] === 'map' || (segments[0] === 'fleet_manager' && segments[1] === 'map')) {
      router.push('/fleet_manager/map');
      return true;
    }

    // 8. Shifts:
    if (segments[0] === 'shifts' || (segments[0] === 'fleet_manager' && segments[1] === 'shifts')) {
      router.push('/fleet_manager/shifts');
      return true;
    }

    return false;
  } catch (error) {
    console.warn('Failed to handle deep link:', url, error);
    return false;
  }
}
