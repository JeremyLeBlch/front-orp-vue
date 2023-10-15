import Kpi from "@/models/kpi";
import {envUtils} from "@/config/env-utils";

/**
 * Kpi Dao
 */

export const kpiDao = {

    getKpi: async (): Promise<Kpi[]> => {
        const response = await fetch(`${envUtils.apiUrl}/api/kpi`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    }
}