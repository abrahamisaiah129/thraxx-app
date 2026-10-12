import React from 'react';
import { FeatureScreen } from '@/components/feature-screen';

export default function AnalyticsDashboard() {
  return <FeatureScreen title="Analytics & intelligence" description="Turn fleet activity into practical actions with reports and Traxx AI." filters={['Overview', 'Reports', 'AI']} summary={[{ label: 'Trips today', value: '38' }, { label: 'On-time rate', value: '96%' }, { label: 'Open flags', value: '2' }]} rows={[
    { title: 'Reports', subtitle: '3 report views available', status: 'Open', detail: 'Flag log, scorecards, GPS replay, and daily report.' },
    { title: 'Traxx AI', subtitle: 'Fleet intelligence assistant', status: 'Open', detail: 'Ask about rider performance or delayed deliveries.' },
  ]} />;
}
