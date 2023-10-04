import {defineStore} from "pinia";
import {ref} from "vue";
import {ticketDao} from "@/dao/ticket-dao";
import type User from "@/models/user";

export const useTicketStore = defineStore("ticket", () => {
    const tickets = ref<any[]>([]);

    const getTickets = async (user: User) => {
        tickets.value = await ticketDao.getTickets(user);
    };

    return {
       getTickets,
       tickets
    };
});
