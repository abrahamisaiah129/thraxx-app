import { useEffect, useState } from 'react';
import { fleetManagerData } from '@/data/fleetManagerData';

type Coordinates = { latitude: number; longitude: number };

export type LiveVehicle = (typeof fleetManagerData.activeVehicles)[number] & {
  gpsCoordinates: Coordinates;
};

type FleetSocketMessage = {
  vehicleId: string;
  gpsCoordinates: Coordinates;
  currentSpeedKph?: number;
  telemetryStatus?: string;
  telemetryLastUpdatedAt?: string;
};

const websocketUrl = process.env.EXPO_PUBLIC_FLEET_WS_URL;

/**
 * Subscribes to fleet coordinate updates and keeps the last known positions in local state.
 * The WebSocket is optional so the map remains usable with the local data set during development.
 */
export function useLiveFleet() {
  const [vehicles, setVehicles] = useState<LiveVehicle[]>(fleetManagerData.activeVehicles);

  useEffect(() => {
    if (!websocketUrl) return undefined;

    const socket = new WebSocket(websocketUrl);

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data) as FleetSocketMessage;
      setVehicles((currentVehicles) =>
        currentVehicles.map((vehicle) =>
          vehicle.vehicleId === message.vehicleId
            ? {
                ...vehicle,
                gpsCoordinates: message.gpsCoordinates,
                currentSpeedKph: message.currentSpeedKph ?? vehicle.currentSpeedKph,
                telemetryStatus: message.telemetryStatus ?? vehicle.telemetryStatus,
                telemetryLastUpdatedAt:
                  message.telemetryLastUpdatedAt ?? new Date().toISOString(),
              }
            : vehicle,
        ),
      );
    };

    return () => socket.close();
  }, []);

  return vehicles;
}
