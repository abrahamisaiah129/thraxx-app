import React from 'react';
import { FeatureScreen } from '@/components/feature-screen';

export default function AiPage() {
  return <FeatureScreen title="Traxx AI" description="Ask questions about delivery volume, rider performance, and delayed assignments." searchPlaceholder="Ask Traxx AI about your fleet" filters={['Suggested', 'Recent']} rows={[
    { title: 'Why is Rider 2 delayed?', subtitle: 'Suggested prompt', status: 'Try prompt', detail: 'Review late assignments and route conditions.' },
    { title: 'Summarize today’s fleet health', subtitle: 'Suggested prompt', status: 'Try prompt', detail: 'Get a concise view of trips, flags, and idle time.' },
    { title: 'Show delivery volume trends', subtitle: 'Recent question', status: 'Mock answer', detail: 'Delivery volume is up 12% compared with last Tuesday.' },
  ]} />;
}
