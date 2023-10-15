export default class Kpi {
    id: number;
    year: number;
    month: number;
    day: number;
    week: number;
    ticket_count: bigint;
    typology: string;
    company_name: string;
    engine_name: string;

    constructor(kpi: Kpi) {
        this.id = kpi.id;
        this.year = kpi.year;
        this.month = kpi.month;
        this.day = kpi.day;
        this.week = kpi.week;
        this.ticket_count = kpi.ticket_count;
        this.typology = kpi.typology;
        this.company_name = kpi.company_name;
        this.engine_name = kpi.engine_name
    }
}