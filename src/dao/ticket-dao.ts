import {envUtils} from "@/config/env-utils";
import type User from "@/models/user";
import Ticket from "@/models/ticket";
import {daoUtils} from "@/dao/dao-utils";

/**
 * Ticket Dao
 */
export const ticketDao = {

  getTickets: async (user: User): Promise<any[]> => {
    let url = "";
    if (user.isPlanning()) {
      url = `/api/tickets`;
    } else if (user.isUser() || user.isTechnician()) {
      url = `/api/user/ticket/${user.id}`;
    } else {
      return [];
    }

    const response = await fetch(envUtils.apiUrl + url, {
      method: 'GET',
      headers: daoUtils.getHeaders()
    });

    const jsonData: Ticket[] = await response.json();
    const tabTickets = [];
    for (const ticket of jsonData) {
      tabTickets.push(new Ticket(ticket))
    }

    return tabTickets;
  },

  getTicketId: async (ticketId: number): Promise<Ticket> => {
    const response = await fetch(`${envUtils.apiUrl}/api/tickets/${ticketId}`, {
      method: 'GET',
      headers: daoUtils.getHeaders()
    });

    const jsonData = await response.json();
    return new Ticket(jsonData);
  },
  updateTicket: async (ticketId: number, updatedData: Partial<Ticket>): Promise<Ticket> => {
    const response = await fetch(`${envUtils.apiUrl}/api/tickets/${ticketId}`, {
      method: 'PATCH',
      headers: daoUtils.getHeaders(),
      body: JSON.stringify(updatedData)
    });
    return await response.json();
  },
  createTicket: async (formTicket: Partial<Ticket>): Promise<Ticket> => {
    const response = await fetch(`${envUtils.apiUrl}/api/tickets`, {
      method: 'POST',
      headers: daoUtils.getHeaders(),
      body: JSON.stringify(formTicket)
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la création du ticket');
    }

    return new Ticket(await response.json());
  },
};

