import Device from "@/models/device";
import {envUtils} from "@/config/env-utils";

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
    }
}