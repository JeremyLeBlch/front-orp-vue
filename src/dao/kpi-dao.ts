import Kpi from "@/models/kpi";
import {envUtils} from "@/config/env-utils";
import {daoUtils} from "@/dao/dao-utils";

/**
 * Kpi Dao
 */

export const kpiDao = {

  getKpi: async (): Promise<Kpi[]> => {
    const response = await fetch(`${envUtils.apiUrl}/api/kpi`, {
      method: 'GET',
      headers: daoUtils.getHeaders()
    });
    return await response.json();
  }
}