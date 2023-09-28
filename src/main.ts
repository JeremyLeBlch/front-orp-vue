// @ts-nocheck

import './assets/main.css'
import 'primeflex/primeflex.css';

import {createApp} from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import App from './App.vue'



import HomePage from "@/views/HomePage.vue";
import LoginPage from '@/views/LoginPage.vue';
import HomeClient from "@/views/HomeClient.vue";
import HomeTechnician from '@/views/HomeTechnician.vue';
import HomeAdmin from '@/views/HomeAdmin.vue';

import PrimeVue from 'primevue/config';
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Toast from "primevue/toast";
import ToastService from 'primevue/toastservice';

import 'primevue/resources/themes/md-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';


const routes = [
    {path: "/", component: HomePage},
    {path: '/login', component: LoginPage},
    { path: '/app', component: App },
    { path: '/app/client', component: HomeClient },
    { path: '/app/technician', component: HomeTechnician },
    { path: '/app/admin', component: HomeAdmin },
    { path: '/:catchAll(.*)', redirect: '/' },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

const app = createApp(App);

app.use(PrimeVue);
app.use(ToastService);
app.component('buttonPrimeVUe', Button);
app.component('inputTextePrimeVue', InputText);
app.component('toastPrimeVue', Toast);
app.use(router);
app.mount('#app')
