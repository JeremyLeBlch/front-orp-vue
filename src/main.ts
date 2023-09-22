import './assets/main.css'
import 'primeflex/primeflex.css';

import {createApp} from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import App from './App.vue'

import HomePage from "@/views/HomePage.vue";
import LoginPage from '@/views/LoginPage.vue';

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
]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

const app = createApp(App);

app.use(PrimeVue);
app.use(ToastService);
app.component('buttonPrimeVUe', Button);
app.component('inputTextePrimeVue', InputText);
app.component('toastPrimeVue', Toast);
app.use(router);
app.mount('#app')
