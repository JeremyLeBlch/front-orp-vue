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
}
