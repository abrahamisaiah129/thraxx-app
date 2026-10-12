import React from 'react';
import { FeatureScreen } from '@/components/feature-screen';

export default function VendorsPage() {
  return <FeatureScreen title="Vendors" description="Keep partners and suppliers connected to the assignments they support." actionLabel="Add vendor" searchPlaceholder="Search vendors" rows={[
    { title: 'Swift Logistics', subtitle: 'Delivery partner · Lagos', status: 'Active', detail: 'Linked to 18 assignments' },
    { title: 'PackRight Supplies', subtitle: 'Packaging supplier · Ikeja', status: 'Active', detail: 'Last order 2 days ago' },
    { title: 'City Couriers', subtitle: 'Delivery partner · Lekki', status: 'Pending', detail: 'Awaiting review' },
  ]} />;
}
