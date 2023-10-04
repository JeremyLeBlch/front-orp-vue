import {envUtils} from "@/config/env-utils";
import type User from "@/models/user";

/**
 * Ticket Dao
 */
export const ticketDao = {

    getTickets: async (user: User): Promise<any[]> => {
        let url = "";
        if (user.isPlanning()){
            url = `/api/tickets`;
        } else if (user.isUser()){
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

        const data: any[] = await response.json();
        return data ?? []; // on retourne data, si null un tableau vide
    }
};
