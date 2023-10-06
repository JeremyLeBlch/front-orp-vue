import User from "@/models/user";
import {envUtils} from "@/config/env-utils";

export const userDao = {
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
