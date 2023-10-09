import User from "@/models/user";
import {envUtils} from "@/config/env-utils";

export const userDao = {

    getUsers: async (user: User): Promise<any[]> => {
        let url = "";
        if (user.isAdmin()) {
            url = `/api/user`;
        }else {
            return [];
        }

        const response = await fetch(envUtils.apiUrl + url, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json'
            }
        });

        const jsonData: User[] = await response.json();
        const tabUsers = [];
        for (const user of jsonData){
            tabUsers.push(new User(user))
        }
        return tabUsers;
    },

    getUserById: async (userId: number): Promise<User> => {
        const response = await fetch(`${envUtils.apiUrl}/api/user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    }
}
