import {defineStore} from "pinia";
import {ref} from "vue";
import {deviceDao} from "@/dao/device-dao";
import Device from "@/models/device";


export const useDeviceStore = defineStore("device", () => {
    const devices = ref<Device[]>([]);
    const device = ref<Device>(null);

    const getDevices = async () => {
        devices.value = await deviceDao.getDevices();
    };

    const getDeviceById = async (deviceId) => {
        device.value = null;
        device.value = await deviceDao.getDeviceById(deviceId);
    };

    const updateDevice = async (id: number, formDevice : Partial<Device>) => {
        console.log('Données de l\'appareil avant la mise à jour (dans le store) :', formDevice);
        device.value = await deviceDao.updateDevice(id, formDevice);
    };

    return {
        getDevices,
        devices,
        getDeviceById,
        device,
        updateDevice
    };
})