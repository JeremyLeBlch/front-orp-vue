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

        const tabDevices = await response.json();
        return tabDevices.map(data => new Device(data));
    },

    getDevicesByClient: async (userId: number): Promise<Device[]> =>{
        const response = await fetch(`${envUtils.apiUrl}/api/user/device/${userId}` , {
            method: 'GET',
            headers: {'Content-Type' : 'application/json'}
        });

        const tabDevices = await response.json();
        return tabDevices.map(data => new Device(data));
    },

    deleteDevice: async (deviceId: number): Promise<void> => {
        console.log('Début de la suppression de l\'appareil avec l\'ID :', deviceId);
        const response = await fetch(`${envUtils.apiUrl}/api/device/${deviceId}`, {
            method: 'DELETE',
            headers: {'Content-Type' : 'application/json'}
        });

        if (response.ok) {
            console.log('La suppression de l\'appareil a réussi.');
        } else {
            console.error('La suppression de l\'appareil a échoué. Statut de réponse :', response.status);
        }
    },

    getDeviceById: async (deviceId: number): Promise<Device> => {
        const response = await fetch(`${envUtils.apiUrl}/api/device/${deviceId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return new Device(data);
    },
    updateDevice: async (deviceId: number, updatedData: Partial<Device>): Promise<Device> => {
        const response = await fetch(`${envUtils.apiUrl}/api/device/${deviceId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });

        const data = await response.json();
        return new Device(data);
    },

    createDevice: async (formDevice: Partial<Device>): Promise<Device> =>{
        const response = await fetch(`${envUtils.apiUrl}/api/device`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDevice),
        });
        if (!response.ok) {
            throw new Error('Erreur lors de la création de la machine');
        }

        return new Device(await response.json());
    }
};