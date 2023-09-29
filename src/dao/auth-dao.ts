import {envUtils} from "@/config/env-utils";

/**
 * Auth Dao
 */
export const authDao = {

    /**
     * Login user
     */
    login: async (email: string, password : string): Promise<string> => {
        const response = await fetch(envUtils.apiUrl + "/api/user/login", {
            method: 'POST',
            body: JSON.stringify({email: email, password: password}),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data: { token: string } = await response.json();
        if (!data.token) {
            throw new Error("error.authentication");
        }

        return data.token;
    }
};
