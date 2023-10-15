import {defineStore} from "pinia";
import {ref} from "vue";
import {kpiDao} from "@/dao/kpi-dao";
import Kpi from "@/models/kpi";


export const useKpiStore = defineStore("kpi", () => {
    const kpis = ref<Kpi[]>([]);

    const getKpis = async () => {
        kpis.value = await kpiDao.getKpi();
    }

    return {
        getKpis,
        kpis,

    }
})