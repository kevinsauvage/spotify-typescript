'use client';

import { Bar } from 'react-chartjs-2';

import styles from './Chart.module.scss';

import { Chart, ChartData, registerables } from 'chart.js';

Chart.register(...registerables);

interface IChartProperties {
  chart: ChartData<'bar'>;
}

const ChartComponent: React.FunctionComponent<IChartProperties> = ({ chart }) => (
  <div className={styles.chart}>
    <Bar
      data={chart}
      options={{
        plugins: {
          title: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      }}
    />
  </div>
);

export default ChartComponent;
