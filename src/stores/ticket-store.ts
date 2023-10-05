import {defineStore} from "pinia";
import {ref} from "vue";
import {ticketDao} from "@/dao/ticket-dao";
import type User from "@/models/user";
import Ticket from "@/models/ticket";

export const useTicketStore = defineStore("ticket", () => {
    const tickets = ref<Ticket[]>([]);
    const ticket = ref<Ticket>(null);

    const getTickets = async (user: User) => {
        tickets.value = await ticketDao.getTickets(user);
    };

    const getTicketId = async (id: number) => {
        ticket.value = await ticketDao.getTicketId(id);
    };

    return {
        getTickets,
        tickets,
        getTicketId,
        ticket
    };
});
