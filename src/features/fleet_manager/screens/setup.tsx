import React from 'react';
import { FeatureScreen } from '@/components/feature-screen';

export default function SetupDashboard() {
  return <FeatureScreen title="Setup & configuration" description="Set up the public booking experience, pricing, zones, and payment preferences." filters={['Overview', 'Booking page', 'Pricing']} rows={[
    { title: 'Booking page', subtitle: 'Public page is enabled', status: 'Ready', detail: 'Link, QR code, integrations, and customer messaging.' },
    { title: 'Pricing & zones', subtitle: '6 active zones · ₦2,500/km fallback', status: 'Ready', detail: 'Configure rates and preview a quote.' },
    { title: 'Payment settings', subtitle: 'Cash on delivery', status: 'Review', detail: 'Add bank details and customer payment notes.' },
  ]} />;
}
