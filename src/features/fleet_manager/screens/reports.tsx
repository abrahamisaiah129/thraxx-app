import React from 'react';
import { FeatureScreen } from '@/components/feature-screen';

export default function ReportsPage() {
  return <FeatureScreen title="Reports" description="Review operational alerts and keep a permanent, searchable flag log." actionLabel="Resolve all" filters={['All', 'Route deviation', 'Idle warning', 'Resolved']} rows={[
    { title: 'Route deviation', subtitle: 'John Doe · 10 minutes ago', status: 'Open', detail: 'Rider moved 1.2km outside the assigned route.' },
    { title: 'Idle warning', subtitle: 'Jane Smith · 1 hour ago', status: 'Open', detail: 'Rider has been idle for more than 45 minutes.' },
    { title: 'Speeding', subtitle: 'Tunde Bakare · Yesterday', status: 'Resolved', detail: 'Speed exceeded the configured limit near Ikeja.' },
  ]} />;
}
