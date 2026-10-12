export type DeliveryStatus = 'pending' | 'in_progress' | 'completed' | 'failed' | 'cancelled';

export type AssignmentView = 'live' | 'idle' | 'flagged';

export type FlagType =
  'delay' | 'rider_unresponsive' | 'route_deviation' | 'customer_issue' | 'other';

export type FlagSeverity = 'low' | 'medium' | 'high';
export type Subscription = 'Freemium' | 'Growth' | 'Enterprise';

export const RIDER_LIMIT_BY_PLAN: Record<Subscription, number> = {
  Freemium: 5,
  Growth: 20,
  Enterprise: Infinity,
};

export const SUBSCRIPTION_OPTIONS: Array<{
  name: Subscription;
  riderLimit: number;
  description: string;
}> = [
  { name: 'Freemium', riderLimit: 5, description: 'For small fleets getting started.' },
  { name: 'Growth', riderLimit: 20, description: 'For growing B2B delivery operations.' },
  { name: 'Enterprise', riderLimit: Infinity, description: 'Custom fleet size and support.' },
];

const CURRENT_PLAN: Subscription = 'Freemium';

export type Assignment = {
  assignmentId: string;
  companyId: string;
  waybillTrackingNumber: string;
  customerName: string;
  customerPhone?: string;
  pickupAddress: string;
  deliveryAddress: string;
  assignedRiderId: string;
  assignedVehicleId: string;
  startCoordinates: { latitude: number; longitude: number };
  finishCoordinates: { latitude: number; longitude: number };
  deliveryStatus: DeliveryStatus;
  startedAtTimestamp?: string;
  completedAtTimestamp?: string;
  lastActivityAtTimestamp?: string;
  openFlagCount: number;
  createdAtTimestamp: string;
  updatedAtTimestamp: string;
};

export type Flag = {
  flagId: string;
  companyId: string;
  assignmentId: string;
  type: FlagType;
  severity: FlagSeverity;
  reason: string;
  raisedBy: 'system' | string;
  raisedAtTimestamp: string;
  resolvedAtTimestamp?: string;
  resolvedBy?: string;
  resolutionNote?: string;
};

export const IDLE_THRESHOLD_MINUTES = 10;

export const MOCK_NOW_MS = Date.parse('2026-10-05T10:20:00.000Z');

export const fleetManagerData = {
  Company: {
    companyId: 'company_001',
    legalName: 'Example Logistics Ltd',
    emailAddress: 'admin@examplelogistics.com',
    role: 'fleet_manager',
    phoneNumber: '+234 800 111 1111',
    Address: 'Lagos, Nigeria',
    subscription: CURRENT_PLAN,
    assignedRidersMaxCount: RIDER_LIMIT_BY_PLAN[CURRENT_PLAN],
    logoImageUrl: '/images/company-logo.png',
    operationalStatus: 'active',
  },

  Assignments: [
    {
      assignmentId: 'assignment_001',
      companyId: 'company_001',
      waybillTrackingNumber: 'TRX-100001',
      customerName: 'Jane Smith',
      customerPhone: '+2348030000001',
      pickupAddress: 'Ikeja, Lagos',
      deliveryAddress: 'Victoria Island, Lagos',
      assignedRiderId: 'user_003',
      assignedVehicleId: 'vehicle_001',
      startCoordinates: { latitude: 6.6018, longitude: 3.3515 },
      finishCoordinates: { latitude: 6.4281, longitude: 3.4219 },
      deliveryStatus: 'in_progress',
      startedAtTimestamp: '2026-10-05T08:45:00.000Z',
      lastActivityAtTimestamp: '2026-10-05T10:15:00.000Z',
      openFlagCount: 0,
      createdAtTimestamp: '2026-10-05T08:30:00.000Z',
      updatedAtTimestamp: '2026-10-05T10:15:00.000Z',
    },
    {
      assignmentId: 'assignment_002',
      companyId: 'company_001',
      waybillTrackingNumber: 'TRX-100002',
      customerName: 'David Williams',
      customerPhone: '+2348030000002',
      pickupAddress: 'Yaba, Lagos',
      deliveryAddress: 'Lekki, Lagos',
      assignedRiderId: 'user_004',
      assignedVehicleId: 'vehicle_002',
      startCoordinates: { latitude: 6.5095, longitude: 3.3711 },
      finishCoordinates: { latitude: 6.4474, longitude: 3.4723 },
      deliveryStatus: 'completed',
      startedAtTimestamp: '2026-10-05T07:30:00.000Z',
      completedAtTimestamp: '2026-10-05T09:05:00.000Z',
      lastActivityAtTimestamp: '2026-10-05T09:05:00.000Z',
      openFlagCount: 0,
      createdAtTimestamp: '2026-10-05T07:15:00.000Z',
      updatedAtTimestamp: '2026-10-05T09:05:00.000Z',
    },
    {
      assignmentId: 'assignment_003',
      companyId: 'company_001',
      waybillTrackingNumber: 'TRX-100003',
      customerName: 'Grace Adeyemi',
      customerPhone: '+2348030000003',
      pickupAddress: 'Surulere, Lagos',
      deliveryAddress: 'Ajah, Lagos',
      assignedRiderId: 'user_006',
      assignedVehicleId: 'vehicle_003',
      startCoordinates: { latitude: 6.501, longitude: 3.3569 },
      finishCoordinates: { latitude: 6.4698, longitude: 3.5852 },
      deliveryStatus: 'in_progress',
      startedAtTimestamp: '2026-10-05T09:10:00.000Z',
      lastActivityAtTimestamp: '2026-10-05T09:35:00.000Z',
      openFlagCount: 0,
      createdAtTimestamp: '2026-10-05T09:00:00.000Z',
      updatedAtTimestamp: '2026-10-05T09:35:00.000Z',
    },
    {
      assignmentId: 'assignment_004',
      companyId: 'company_001',
      waybillTrackingNumber: 'TRX-100004',
      customerName: 'Tunde Bakare',
      customerPhone: '+2348030000004',
      pickupAddress: 'Maryland, Lagos',
      deliveryAddress: 'Ikoyi, Lagos',
      assignedRiderId: 'user_007',
      assignedVehicleId: 'vehicle_004',
      startCoordinates: { latitude: 6.5667, longitude: 3.3637 },
      finishCoordinates: { latitude: 6.4549, longitude: 3.4246 },
      deliveryStatus: 'in_progress',
      startedAtTimestamp: '2026-10-05T09:40:00.000Z',
      lastActivityAtTimestamp: '2026-10-05T10:18:00.000Z',
      openFlagCount: 1,
      createdAtTimestamp: '2026-10-05T09:30:00.000Z',
      updatedAtTimestamp: '2026-10-05T10:18:00.000Z',
    },
    {
      assignmentId: 'assignment_005',
      companyId: 'company_001',
      waybillTrackingNumber: 'TRX-100005',
      customerName: 'Ngozi Eze',
      customerPhone: '+2348030000005',
      pickupAddress: 'Oshodi, Lagos',
      deliveryAddress: 'Gbagada, Lagos',
      assignedRiderId: 'user_005',
      assignedVehicleId: 'vehicle_005',
      startCoordinates: { latitude: 6.557, longitude: 3.349 },
      finishCoordinates: { latitude: 6.5535, longitude: 3.391 },
      deliveryStatus: 'pending',
      openFlagCount: 1,
      createdAtTimestamp: '2026-10-05T09:45:00.000Z',
      updatedAtTimestamp: '2026-10-05T09:50:00.000Z',
    },
    {
      assignmentId: 'assignment_006',
      companyId: 'company_001',
      waybillTrackingNumber: 'TRX-100006',
      customerName: 'Kelechi Obi',
      customerPhone: '+2348030000006',
      pickupAddress: 'Apapa, Lagos',
      deliveryAddress: 'Magodo, Lagos',
      assignedRiderId: 'user_004',
      assignedVehicleId: 'vehicle_002',
      startCoordinates: { latitude: 6.4489, longitude: 3.3594 },
      finishCoordinates: { latitude: 6.6145, longitude: 3.395 },
      deliveryStatus: 'failed',
      startedAtTimestamp: '2026-10-05T06:55:00.000Z',
      completedAtTimestamp: '2026-10-05T07:50:00.000Z',
      lastActivityAtTimestamp: '2026-10-05T07:50:00.000Z',
      openFlagCount: 0,
      createdAtTimestamp: '2026-10-05T06:40:00.000Z',
      updatedAtTimestamp: '2026-10-05T07:50:00.000Z',
    },
  ] as Assignment[],

  flags: [
    {
      flagId: 'flag_001',
      companyId: 'company_001',
      assignmentId: 'assignment_004',
      type: 'route_deviation',
      severity: 'medium',
      reason: 'Rider is more than 1.5 km away from the planned route',
      raisedBy: 'system',
      raisedAtTimestamp: '2026-10-05T10:05:00.000Z',
    },
    {
      flagId: 'flag_002',
      companyId: 'company_001',
      assignmentId: 'assignment_005',
      type: 'rider_unresponsive',
      severity: 'high',
      reason: 'Rider has not acknowledged the assignment',
      raisedBy: 'system',
      raisedAtTimestamp: '2026-10-05T09:50:00.000Z',
    },
    {
      flagId: 'flag_003',
      companyId: 'company_001',
      assignmentId: 'assignment_006',
      type: 'customer_issue',
      severity: 'low',
      reason: 'Customer unreachable at delivery address',
      raisedBy: 'user_004',
      raisedAtTimestamp: '2026-10-05T07:30:00.000Z',
      resolvedAtTimestamp: '2026-10-05T07:45:00.000Z',
      resolvedBy: 'company_001',
      resolutionNote: 'Customer could not be reached after three attempts; marked failed',
    },
  ] as Flag[],

  activeVehicles: [
    {
      vehicleId: 'vehicle_001',
      companyId: 'company_001',
      licensePlateNumber: 'LG-456-XY',
      vehicleCategory: 'Motorcycle',
      currentRiderId: 'user_003',
      telemetryStatus: 'moving',
      gpsCoordinates: { latitude: 6.5244, longitude: 3.3792 },
      currentSpeedKph: 38,
      telemetryLastUpdatedAt: '2026-10-05T10:15:00.000Z',
    },
    {
      vehicleId: 'vehicle_002',
      companyId: 'company_001',
      licensePlateNumber: 'LG-789-AB',
      vehicleCategory: 'Motorcycle',
      currentRiderId: 'user_004',
      telemetryStatus: 'idle',
      gpsCoordinates: { latitude: 6.4281, longitude: 3.4219 },
      currentSpeedKph: 0,
      telemetryLastUpdatedAt: '2026-10-05T10:15:00.000Z',
    },
    {
      vehicleId: 'vehicle_003',
      companyId: 'company_001',
      licensePlateNumber: 'LG-321-CD',
      vehicleCategory: 'Motorcycle',
      currentRiderId: 'user_006',
      telemetryStatus: 'idle',
      gpsCoordinates: { latitude: 6.4698, longitude: 3.3515 },
      currentSpeedKph: 0,
      telemetryLastUpdatedAt: '2026-10-05T09:35:00.000Z',
    },
    {
      vehicleId: 'vehicle_004',
      companyId: 'company_001',
      licensePlateNumber: 'LG-654-EF',
      vehicleCategory: 'Van',
      currentRiderId: 'user_007',
      telemetryStatus: 'moving',
      gpsCoordinates: { latitude: 6.5833, longitude: 3.3601 },
      currentSpeedKph: 27,
      telemetryLastUpdatedAt: '2026-10-05T10:18:00.000Z',
    },
    {
      vehicleId: 'vehicle_005',
      companyId: 'company_001',
      licensePlateNumber: 'LG-987-GH',
      vehicleCategory: 'Motorcycle',
      currentRiderId: 'user_005',
      telemetryStatus: 'offline',
      gpsCoordinates: { latitude: 6.5355, longitude: 3.3087 },
      currentSpeedKph: 0,
      telemetryLastUpdatedAt: '2026-10-05T08:50:00.000Z',
    },
  ],

  riders: [
    {
      id: 'user_003',
      companyId: 'company_001',
      name: 'Michael Johnson',
      riderCode: 'RDR-001',
      status: 'assigned',
      phone: '+234800',
      rating: 4.8,
      completedDeliveries: 124,
    },
    {
      id: 'user_004',
      companyId: 'company_001',
      name: 'Daniel Okafor',
      riderCode: 'RDR-002',
      status: 'available',
      phone: '+234801',
      rating: 4.6,
      completedDeliveries: 98,
    },
    {
      id: 'user_005',
      companyId: 'company_001',
      name: 'Amina Bello',
      riderCode: 'RDR-003',
      status: 'offline',
      phone: '+234802',
      rating: 4.7,
      completedDeliveries: 76,
    },
    {
      id: 'user_006',
      companyId: 'company_001',
      name: 'Chinedu Eze',
      riderCode: 'RDR-004',
      status: 'assigned',
      phone: '+234803',
      rating: 4.5,
      completedDeliveries: 61,
    },
    {
      id: 'user_007',
      companyId: 'company_001',
      name: 'Fatima Musa',
      riderCode: 'RDR-005',
      status: 'assigned',
      phone: '+234804',
      rating: 4.9,
      completedDeliveries: 143,
    },
  ],

  notifications: [
    {
      id: 'notif_1',
      companyId: 'company_001',
      type: 'warning',
      title: 'Route Deviation',
      message: 'Rider went off route',
      relatedAssignmentId: 'assignment_004',
      createdAt: new Date().toISOString(),
      read: false,
    },
    {
      id: 'notif_2',
      companyId: 'company_001',
      type: 'info',
      title: 'Delivery Completed',
      message: 'Order TRX-100002 delivered',
      relatedAssignmentId: 'assignment_002',
      createdAt: new Date().toISOString(),
      read: true,
    },
  ],

  supportTickets: [
    {
      id: 'tix_1',
      companyId: 'company_001',
      ticketNumber: 'TKT-001',
      priority: 'high',
      subject: 'Vehicle Breakdown',
      message: 'Flat tire',
      createdAt: new Date().toISOString(),
      status: 'open',
    },
  ],

  settings: { theme: 'system' },
};

export function isIdle(a: Assignment, now: number = MOCK_NOW_MS): boolean {
  if (a.deliveryStatus !== 'in_progress' || !a.lastActivityAtTimestamp) return false;
  return now - Date.parse(a.lastActivityAtTimestamp) > IDLE_THRESHOLD_MINUTES * 60_000;
}

export function isLive(a: Assignment, now: number = MOCK_NOW_MS): boolean {
  return a.deliveryStatus === 'in_progress' && !isIdle(a, now);
}

export function isFlagged(a: Assignment): boolean {
  return a.openFlagCount > 0;
}

export function matchesView(
  a: Assignment,
  view: AssignmentView,
  now: number = MOCK_NOW_MS,
): boolean {
  if (view === 'live') return isLive(a, now);
  if (view === 'idle') return isIdle(a, now);
  return isFlagged(a);
}

export function getAssignmentCounts(
  assignments: Assignment[] = fleetManagerData.Assignments,
  now: number = MOCK_NOW_MS,
): Record<AssignmentView, number> {
  return {
    live: assignments.filter((a) => isLive(a, now)).length,
    idle: assignments.filter((a) => isIdle(a, now)).length,
    flagged: assignments.filter(isFlagged).length,
  };
}

export function getAssignmentRows(view: AssignmentView, now: number = MOCK_NOW_MS) {
  return fleetManagerData.Assignments.filter((a) => matchesView(a, view, now)).map((a) => ({
    ...a,
    riderName:
      fleetManagerData.riders.find((r) => r.id === a.assignedRiderId)?.name ?? 'Unassigned',
    licensePlateNumber:
      fleetManagerData.activeVehicles.find((v) => v.vehicleId === a.assignedVehicleId)
        ?.licensePlateNumber ?? '-',
    openFlags: fleetManagerData.flags.filter(
      (f) => f.assignmentId === a.assignmentId && !f.resolvedAtTimestamp,
    ),
  }));
}