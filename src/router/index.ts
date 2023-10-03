import {createRouter, createWebHistory} from 'vue-router';
import PublicLayout from '@/views/public/PublicLayout.vue';
import HomePage from '@/views/public/HomePage.vue';
import LoginPage from '@/views/public/LoginPage.vue';
import DashboardLayout from '@/views/dashboard/DashboardLayout.vue';
import DashboardHome from '@/views/dashboard/DashboardHome.vue';
import HomeAdmin from '@/views/dashboard/HomeAdmin.vue';
import HomeClient from "@/views/dashboard/HomeClient.vue";
import HomeTechnician from '@/views/dashboard/HomeTechnician.vue';
import HomePlanning from "@/views/dashboard/HomePlanning.vue";

export enum RouteName {
    home = "home",
    login = "login",

    dashboard = "dashboard",
    dashboardAdmin = "dashboardAdmin",
    dashboardClient = "dashboardClient",
    dashboardTechnician = "dashboardTechnician",
    dashboardPlanning = "dashboardPlanning",
    kpi = "kpi",
    manageUser = "manageUser",
    manageParc = "manageParc",
    newTicket = "newTicket",
    customerHistory = "customerHistory",
    customerParc = "customerParc",
    customerReview = "customerReview",
    messaging = "messaging",
    planning = "planning",
    allTickets = "allTickets",
    allParc = "allParc",
    ticketsByTechnicians ="ticketsByTechnicians"
}

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: PublicLayout,
            children: [
                {
                    path: "",
                    name: RouteName.home,
                    component: HomePage
                },
                {
                    path: "login",
                    name: RouteName.login,
                    component: LoginPage
                },
            ]
        },
        {
            path: "/dashboard",
            component: DashboardLayout,
            children: [
                {
                    path: "",
                    name: RouteName.dashboard,
                    component: DashboardHome
                },
                {
                    path: "admin",
                    name: RouteName.dashboardAdmin,
                    component: HomeAdmin
                },
                {
                    path: "client",
                    name: RouteName.dashboardClient,
                    component: HomeClient
                },
                {
                    path: "technician",
                    name: RouteName.dashboardTechnician,
                    component: HomeTechnician
                },
                {
                    path: "planning",
                    name: RouteName.dashboardPlanning,
                    component: HomePlanning
                },
            ]
        }
    ],
});


/*
{ path: '/login', component: LoginPage},
{ path: '/app', component: App },
{ path: '/app/client', component: HomeClient },
{ path: '/app/technician', component: HomeTechnician },
{ path: '/app/planning', component: HomePlanning },
{ path: '/app/admin', component: HomeAdmin },
{ path: '/:catchAll(.*)', redirect: '/' },
*/

export default router;