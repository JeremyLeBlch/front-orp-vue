import Device from "@/models/device";
import {envUtils} from "@/config/env-utils";
import Ticket from "@/models/ticket";

/**
 * Device Dao
 */

export const deviceDao = {

    getDevices: async (): Promise<Device[]> => {
        const response = await fetch(`${envUtils.apiUrl}/api/device`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    },

    getDeviceById: async (deviceId: number): Promise<Device> => {
        const response = await fetch(`${envUtils.apiUrl}/api/device/${deviceId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    },
    updateDevice: async (deviceId: number, updatedData: Partial<Device>): Promise<Device> => {
        const response = await fetch(`${envUtils.apiUrl}/api/device/${deviceId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });
        return await response.json();
    }
};