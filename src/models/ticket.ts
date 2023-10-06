export default class Ticket {
    id: number;
    emergency_degree: number;
    status: "open" | "closed" | "in_progress";
    comments: string;
    location: string; // ex: (-157.8117,-69.8013)
    intervention_start: string; // iso date
    intervention_end: string; // iso date
    created_at: string; // iso date
    modified_at: string; // iso date
    code_type: number;
    code_machine: number;
    code_client: number;
    code_technician: number;

    constructor(ticket: Ticket) {
        this.id = ticket.id;
        this.emergency_degree = ticket.emergency_degree;
        this.status = ticket.status;
        this.comments = ticket.comments;
        this.location = ticket.location;
        this.intervention_start = ticket.intervention_start;
        this.intervention_end = ticket.intervention_end;
        this.created_at = ticket.created_at;
        this.modified_at = ticket.modified_at;
        this.code_type = ticket.code_type;
        this.code_machine = ticket.code_machine;
        this.code_client = ticket.code_client;
        this.code_technician = ticket.code_technician
    }
}
