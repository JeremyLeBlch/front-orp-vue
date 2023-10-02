import {createApp} from 'vue';
import {createPinia} from "pinia";
import App from '@/App.vue';
import router from "@/router";

import "./assets/theme.css";
import './assets/main.css';
import 'primeflex/primeflex.css';
import TieredMenu from 'primevue/tieredmenu';
// import "primeicons/primeicons.css";
// import 'primevue/resources/themes/md-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';

import PrimeVue from 'primevue/config';
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Toast from "primevue/toast";
import ToastService from 'primevue/toastservice';
import Password from "primevue/password";

const app = createApp(App);
app.use(createPinia());
app.use(router);

// prime imports
app.use(PrimeVue);
app.use(ToastService);
app.component('Button', Button);
app.component('InputText', InputText);
app.component('Toast', Toast);
app.component('Password', Password);

// start
app.mount('#app');
