<template>
  <div>
    <div class="grid gap-2 justify-content-center">
      <div class="p-card col-12 md:col-6 lg:col-3 justify-content-center">
          <h1>Total des Tickets par Année</h1>
          <Chart type="bar" :data="chartDataYear" :options="chartOptions" class="chart" />
      </div>
      <div class="p-card col-12 md:col-6 lg:col-3 justify-content-center">
          <h1>Total des Tickets par Typologie</h1>
          <Chart type="bar" :data="chartDataTypology" :options="chartOptions" class="chart" />
      </div>
      <div class="p-card col-12 md:col-6 lg:col-3 justify-content-center">
          <h1>Total des Tickets par Mois</h1>
          <Chart type="bar" :data="chartDataMonth" :options="chartOptionsYear" class="chart" />
      </div>
      <div class="p-card col-12 md:col-6 lg:col-2 justify-content-center">
          <h1>Total des Tickets par Type de Machine</h1>
          <Chart type="bar" :data="chartDataTypeMachine" :options="chartOptions" class="chart" />
      </div>
      <div class="p-card col-12 md:col-6 lg:col-6 justify-content-center">
        <h1>Total des Tickets par Entreprise</h1>
        <Chart type="bar" :data="chartDataCompany" :options="chartOptions" class="chart" />
      </div>
      <div class="p-card col-12 md:col-6 lg:col-5 justify-content-center">
        <h1>Total des Tickets par Semaine</h1>
        <Chart type="bar" :data="chartDataWeek" :options="chartOptions" class="chart" />
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useKpiStore } from "@/stores/kpi-store";

const kpiStore = useKpiStore();
const chartDataYear = ref(null);
const chartDataTypology = ref(null);
const chartDataCompany = ref(null);
const chartDataMonth = ref(null);
const chartDataWeek = ref(null);
const chartDataTypeMachine = ref(null);
const chartOptions = ref({
  scales: {
    y: {
      beginAtZero: true,
    },
  },
});
const chartOptionsYear = ref({
  scales: {
    y: {
      beginAtZero: true,
    },
    x: {
      ticks: {
        callback: (value) => {
          // Remplacez les chiffres par les noms des mois
          const months = [
            "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet",
            "Août", "Septembre", "Octobre", "Novembre", "Décembre"
          ];
          return months[parseInt(value)];
        },
      },
    },
  },
});

const generateChartData = () => {
  if (kpiStore.kpis) {
    console.log(kpiStore.kpis);
    // Calcul du total des tickets par année
    const totalTicketsByYear = kpiStore.kpis.reduce((acc, kpi) => {
      const year = kpi.year.toString();
      acc[year] = (acc[year] || 0) + Number(kpi.ticket_count);
      return acc;
    }, {});

    chartDataYear.value = {
      labels: Object.keys(totalTicketsByYear),
      datasets: [
        {
          label: "Total des tickets par année",
          data: Object.values(totalTicketsByYear),
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgb(75, 192, 192)",
          borderWidth: 1,
        },
      ],
    };

    // Calcul du total des tickets par typologie
    const totalTicketsByTypology = kpiStore.kpis.reduce((acc, kpi) => {
      const typology = kpi.typology;
      acc[typology] = (acc[typology] || 0) + Number(kpi.ticket_count);
      return acc;
    }, {});

    chartDataTypology.value = {
      labels: Object.keys(totalTicketsByTypology),
      datasets: [
        {
          label: "Total des tickets par typologie",
          data: Object.values(totalTicketsByTypology),
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgb(75, 192, 192)",
          borderWidth: 1,
        },
      ],
    };

    // Calcul du total des tickets par entreprise
    const totalTicketsByCompany = kpiStore.kpis.reduce((acc, kpi) => {
      const company = kpi.company_name;
      acc[company] = (acc[company] || 0) + Number(kpi.ticket_count);
      return acc;
    }, {});

    chartDataCompany.value = {
      labels: Object.keys(totalTicketsByCompany),
      datasets: [
        {
          label: "Total des tickets par entreprise",
          data: Object.values(totalTicketsByCompany),
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgb(75, 192, 192)",
          borderWidth: 1,
        },
      ],
    };

    // Calcul du total des tickets par mois
    const totalTicketsByMonth = kpiStore.kpis.reduce((acc, kpi) => {
      const month = kpi.month.toString();
      acc[month] = (acc[month] || 0) + Number(kpi.ticket_count);
      return acc;
    }, {});

    chartDataMonth.value = {
      labels: Object.keys(totalTicketsByMonth),
      datasets: [
        {
          label: "Total des tickets par mois",
          data: Object.values(totalTicketsByMonth),
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgb(75, 192, 192)",
          borderWidth: 1,
        },
      ],
    };
    // Calcul du total des tickets par semaine
    const totalTicketsByWeek = kpiStore.kpis.reduce((acc, kpi) => {
      const week = kpi.week.toString();
      acc[week] = (acc[week] || 0) + Number(kpi.ticket_count);
      return acc;
    }, {});

    chartDataWeek.value = {
      labels: Object.keys(totalTicketsByWeek),
      datasets: [
        {
          label: "Total des tickets par semaine",
          data: Object.values(totalTicketsByWeek),
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgb(75, 192, 192)",
          borderWidth: 1,
        },
      ],
    };

    // Calcul du total des tickets par type de machine
    const totalTicketsByTypeMachine = kpiStore.kpis.reduce((acc, kpi) => {
      const typeMachine = kpi.engine_name;
      acc[typeMachine] = (acc[typeMachine] || 0) + Number(kpi.ticket_count);
      return acc;
    }, {});

    chartDataTypeMachine.value = {
      labels: Object.keys(totalTicketsByTypeMachine),
      datasets: [
        {
          label: "Total des tickets par type de machine",
          data: Object.values(totalTicketsByTypeMachine),
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgb(75, 192, 192)",
          borderWidth: 1,
        },
      ],
    };
  }
};

watch(kpiStore.kpis, () => {
  generateChartData();
});

onMounted(async () => {
  await kpiStore.getKpis();
  generateChartData();
});
</script>

