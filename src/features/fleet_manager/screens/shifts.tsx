import React from 'react';
import { FeatureScreen } from '@/components/feature-screen';

export default function ShiftsPage() {
  return <FeatureScreen title="Shifts" description="Review attendance, shift activity, and sign-off history in one place." actionLabel="Export log" filters={['All', 'On shift', 'Pending sign-off', 'Complete']} summary={[{ label: 'On shift today', value: '18' }, { label: 'Pending sign-offs', value: '3' }, { label: 'Avg. shift', value: '7.4h' }]} rows={[
    { title: 'John Doe', subtitle: 'Clocked in 08:02 · 6.5 hours', status: 'On shift', value: '4 trips' },
    { title: 'Jane Smith', subtitle: 'Clocked out 13:45 · 5.7 hours', status: 'Pending sign-off', value: '3 trips' },
    { title: 'Tunde Bakare', subtitle: 'Clocked out 16:10 · 8.1 hours', status: 'Complete', value: '7 trips' },
  ]} />;
}
