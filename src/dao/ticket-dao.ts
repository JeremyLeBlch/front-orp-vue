import {envUtils} from "@/config/env-utils";
import type User from "@/models/user";
import Ticket from "@/models/ticket";

/**
 * Ticket Dao
 */
export const ticketDao = {

    getTickets: async (user: User): Promise<any[]> => {
        let url = "";
        if (user.isPlanning()) {
            url = `/api/tickets`;
        } else if (user.isUser() || user.isTechnician()) {
            url = `/api/user/tickets/${user.id}`;
        } else {
            return [];
        }

        const response = await fetch(envUtils.apiUrl + url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const jsonData: Ticket[] = await response.json();
        const tabTickets = [];
        for (const ticket of jsonData){
            tabTickets.push(new Ticket(ticket))
        }

        return tabTickets;
    },

    getTicketId: async (ticketId : number): Promise<Ticket> => {
        const response = await fetch(`${envUtils.apiUrl}/api/tickets/${ticketId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const jsonData = await response.json();
        return new Ticket(jsonData);
    },
    updateTicket: async (ticketId: number, updatedData: Partial<Ticket>): Promise<Ticket> => {
        const response = await fetch(`${envUtils.apiUrl}/api/tickets/${ticketId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });
        return await response.json();
    },
    deleteTicket: async (ticketId: number) => {
        const response = await fetch(`${envUtils.apiUrl}/api/tickets/${ticketId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
    }

};

