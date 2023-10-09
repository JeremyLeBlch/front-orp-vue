import {defineStore} from "pinia";
import {ref} from "vue";
import {userDao} from "@/dao/user-dao";
import type User from "@/models/user";


export const useUserStore = defineStore("user", () => {
    const users = ref<User[]>([]);
    const user = ref<User>(null);
    const userRoles = ref<string[]>([]);

    const getUsers = async (user: User) => {
        users.value = await userDao.getUsers(user);
        userRoles.value = users.value.map((u) => u.user_role);
    };

    const getUserById = async (id: number) => {
        user.value = null;
        user.value = await userDao.getUserById(id);
    };

    return {
        getUsers,
        users,
        userRoles,
        getUserById,
        user
    };
});