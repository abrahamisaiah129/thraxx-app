export const mockRiders = [
  {
    id: 'R001',
    name: 'John Doe',
    plate: 'LAG-123-XY',
    status: 'Active',
    kyc: 'Verified',
    trips: 45,
    onTimeRate: '98%',
    flags: 0,
  },
  {
    id: 'R002',
    name: 'Jane Smith',
    plate: 'LAG-456-XY',
    status: 'Idle',
    kyc: 'Verified',
    trips: 30,
    onTimeRate: '95%',
    flags: 1,
  },
];

export const mockAssignments = [
  {
    id: 'A100',
    rider: 'John Doe',
    type: 'Delivery',
    status: 'In Transit',
    pickup: 'Ikeja',
    delivery: 'Lekki',
    eta: '14:30',
  },
  {
    id: 'A101',
    rider: 'Jane Smith',
    type: 'Pickup',
    status: 'Pending',
    pickup: 'Surulere',
    delivery: 'Yaba',
    eta: '15:00',
  },
];

export const dashboardData = {
  metrics: {
    activeRiders: 24,
    liveAssignments: 15,
    flaggedEvents: 2,
    idleRiders: 8,
  },
  onboarding: {
    isFirstRiderAdded: false, // Triggers the "Add First Rider" NIN banner
    bookingPageUrl: 'https://traxx.app/book/company-id-123',
  },
  recentAlerts: [
    {
      id: 'ALT-1',
      type: 'Route Deviation',
      message: 'Rider R001 deviated from assigned route',
      time: '10 mins ago',
      status: 'flagged',
    },
    {
      id: 'ALT-2',
      type: 'Idle Warning',
      message: 'Rider R002 has been idle for > 45 mins',
      time: '1 hour ago',
      status: 'idle',
    },
  ],
  todayAssignmentsOverview: [
    {
      id: 'T-100',
      rider: 'John Doe',
      task: 'Delivery to Lekki',
      status: 'In Transit',
      time: '2:30 PM',
    },
    {
      id: 'T-101',
      rider: 'Jane Smith',
      task: 'Pickup in Yaba',
      status: 'Pending',
      time: '3:00 PM',
    },
    {
      id: 'T-102',
      rider: 'Tunde Bakare',
      task: 'Delivery to Ikeja',
      status: 'Completed',
      time: '11:15 AM',
    },
  ],
  fleetStatus: {
    onTrip: 18,
    idle: 6,
    flagged: 2,
    offline: 10,
  },
};
