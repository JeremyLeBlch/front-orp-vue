import Device from "@/models/device";
import {envUtils} from "@/config/env-utils";
import Ticket from "@/models/ticket";
import User from "@/models/user";

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

    deleteDevice: async (deviceId: number): Promise<Device> => {
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
    },

    createDevice: async (formDevice: Partial<Device>): Promise<Device> =>{
        const response = await fetch(envUtils.apiUrl + 'api/device', {
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