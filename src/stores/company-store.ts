import {ref} from "vue";
import {defineStore} from "pinia";
import {companyDao} from "@/dao/company-dao";
import type Company from "@/models/company";

export const useCompanyStore = defineStore("company", () => {
    const companies = ref<Company[]>([]);

    const getCompanies = async () => {
        companies.value = await companyDao.getCompanies();
    };

    return {
        getCompanies,
        companies
    };
});
