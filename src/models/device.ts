export default class Device {
    id: number;
    engine_type: string;
    brand: string;
    model: string;
    serial_number: string;
    client_reference_number: string;
    code_owner: number;
    code_creator: number;

    constructor(device: Device) {
        this.id = device.id;
        this.engine_type = device.engine_type;
        this.brand = device.brand;
        this.model = device.model;
        this.serial_number = device.serial_number;
        this.client_reference_number = device.client_reference_number;
        this.code_owner = device.code_owner;
        this.code_creator = device.code_creator
    }
}
