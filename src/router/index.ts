import {createRouter, createWebHistory} from 'vue-router';
import PublicLayout from '@/views/public/PublicLayout.vue';
import HomePage from '@/views/public/HomePage.vue';
import LoginPage from '@/views/public/LoginPage.vue';
import DashboardLayout from '@/views/dashboard/DashboardLayout.vue';
import DashboardHome from '@/views/dashboard/DashboardHome.vue';
import DashboardPlanning from "@/views/dashboard/DashboardPlanning.vue";
import DashboardTicket from "@/views/dashboard/DashboardTicket.vue";
import DashboardUser from "@/views/dashboard/DashboardUser.vue";

export enum RouteName {
    home = "home",
    login = "login",

    dashboard = "dashboard",
    dashboardPlanning = "dashboardPlanning",
    allTickets = "allTickets",

    kpi = "kpi",
    manageUser = "manageUser",
    manageParc = "manageParc",
    newTicket = "newTicket",
    customerHistory = "customerHistory",
    customerParc = "customerParc",
    customerReview = "customerReview",
    messaging = "messaging",
    planning = "planning",
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
                    path: "planning",
                    name: RouteName.dashboardPlanning,
                    component: DashboardPlanning,
                },
                {
                    path: "tickets",
                    name: RouteName.allTickets,
                    component: DashboardTicket
                },
                {
                    path: "manageUser",
                    name: RouteName.manageUser,
                    component: DashboardUser
                },
            ]
        }
    ],
});

export default router;