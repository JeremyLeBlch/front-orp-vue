<template>
  <div>
    <div class="p-card p-mb-3">
      <h1>Total des Tickets par Année</h1>
      <Chart type="bar" :data="chartDataYear" :options="chartOptions" />
    </div>
    <div class="p-card p-mb-3">
      <h1>Total des Tickets par Typologie</h1>
      <Chart type="polarArea" :data="chartDataTypology" :options="chartOptions" class="w-full md:w-30rem" />
    </div>
    <div class="p-card p-mb-3">
      <h1>Total des Tickets par Entreprise</h1>
      <Chart type="bar" :data="chartDataCompany" :options="chartOptions" class="w-full md:w-30rem" />
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
const chartOptions = ref({
  scales: {
    y: {
      beginAtZero: true,
    },
  },
});

const generateChartData = () => {
  if (kpiStore.kpis) {
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
          backgroundColor: [
            "rgba(75, 192, 192, 0.2)",
            "rgba(255, 99, 132, 0.2)",

          ],
          borderColor: [
            "rgb(75, 192, 192)",
            "rgb(255, 99, 132)",

          ],
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
