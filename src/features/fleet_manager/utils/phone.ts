import { parsePhoneNumberFromString } from 'libphonenumber-js';

/**
 * Validates a Nigerian phone number and returns the canonical +234 form.
 * The parser handles local 080... input and already-normalized +234... input.
 */
export function normalizeNigerianPhone(value: string): string | null {
  const phone = parsePhoneNumberFromString(value.trim(), 'NG');
  return phone?.isValid() && phone.country === 'NG' ? phone.number : null;
}
