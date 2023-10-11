import {envUtils} from "@/config/env-utils";
import Company from "@/models/company";

/**
 * Company Dao
 */
export const companyDao = {

    getCompanies: async (): Promise<Company[]> => {
        const response = await fetch(`${envUtils.apiUrl}/api/company`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const rawCompanies = await response.json();
        return rawCompanies.map(rawCompany => new Company(rawCompany));
    },

    getCompanyById: async (companyId: number): Promise<Company> => {
        throw new Error("Not implemented");
    }
}