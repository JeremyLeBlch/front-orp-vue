import {createApp} from 'vue';
import {createPinia} from "pinia";
import App from '@/App.vue';
import router from "@/router";

import "./assets/theme.css";
import './assets/main.css';
import 'primeflex/primeflex.css';
import "primeicons/primeicons.css";
// import 'primevue/resources/themes/md-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import TieredMenu from 'primevue/tieredmenu';
import PrimeVue from 'primevue/config';
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Toast from "primevue/toast";
import ToastService from 'primevue/toastservice';
import Password from "primevue/password";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Textarea from "primevue/textarea";
import Rating from 'primevue/rating';
import TreeSelect from 'primevue/treeselect';
import Listbox from 'primevue/listbox';
import Dropdown from "primevue/dropdown";
import Card from "primevue/card";
import Tag from 'primevue/tag';
import Calendar from 'primevue/calendar';
import Divider from 'primevue/divider';
import Image from 'primevue/image';
import FileUpload from 'primevue/fileupload';
import ProgressSpinner from "primevue/progressspinner";
import Chart from 'primevue/chart';
import Dialog from 'primevue/dialog';

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
app.component('TieredMenu', TieredMenu);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("Textarea", Textarea);
app.component("Rating", Rating);
app.component("TreeSelect",TreeSelect);
app.component("Listbox", Listbox);
app.component("Dropdown", Dropdown);
app.component('Card', Card);
app.component('Tag', Tag);
app.component('Calendar', Calendar);
app.component("Divider", Divider);
app.component("Image", Image);
app.component("FileUpload", FileUpload);
app.component("ProgressSpinner", ProgressSpinner);
app.component('Chart', Chart);
app.component('Dialog', Dialog);


// start
app.mount('#app');
