export default class Company {
    id: number;
    name: string;
    siret: string;
    address: string;
    legal_status:string;

    constructor(company: Company) {
        this.id = company.id;
        this.name = company.name;
        this.siret = company.siret;
        this.address = company.address;
        this.legal_status = company.legal_status;
    }
}
