import {defineStore} from "pinia";
import {ref} from "vue";
import {userDao} from "@/dao/user-dao";
import type User from "@/models/user";


export const useUserStore = defineStore("user", () => {
    const users = ref<User[]>([]);
    const user = ref<User>(null);
    const userRoles = ref<string[]>([]);
    const technicians = ref<User[]>([]);

    const getUsers = async (user: User) => {
        users.value = await userDao.getUsers(user);
        userRoles.value = users.value.map(u => u.user_role);
    };

    const getUserById = async (id: number) => {
        user.value = null;
        user.value = await userDao.getUserById(id);
    };

    const getAllTechnicians = async () => {
        technicians.value = await userDao.getAllTechnicians();
    };

    const createUser = async () => {

    }

    const saveUser = async (user: User) => {

    }

    return {
        getUsers,
        users,
        userRoles,
        getUserById,
        user,
        getAllTechnicians,
        technicians,
        saveUser
    };
});