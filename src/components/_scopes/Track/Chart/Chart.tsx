'use client';

import { Bar } from 'react-chartjs-2';

import { AudioFeaturesInterface } from '@/types';

import styles from './Chart.module.scss';

import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface IChartProperties {
  audioFeatures: AudioFeaturesInterface;
}

const ChartComponent: React.FunctionComponent<IChartProperties> = ({ audioFeatures }) => {
  const data = {
    datasets: [
      {
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
        data: [
          audioFeatures.acousticness || 0,
          audioFeatures.danceability || 0,
          audioFeatures.energy || 0,
          audioFeatures.valence || 0,
          audioFeatures.instrumentalness || 0,
          audioFeatures.liveness || 0,
          audioFeatures.speechiness || 0,
        ],
        label: 'Audio Features',
      },
    ],
    labels: [
      'Acousticness',
      'Danceability',
      'Energy',
      'Valence',
      'Instrumentalness',
      'Liveness',
      'Speechiness',
    ],
  };
  return (
    <div className={styles.chart}>
      <Bar
        data={data}
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
};

export default ChartComponent;
