'use client';
import React from 'react';
import { Bar } from 'react-chartjs-2';

import styles from './Chart.module.scss';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

// Define type alias for audio features
type AudioFeatures = {
  acousticness?: number;
  danceability?: number;
  energy?: number;
  valence?: number;
  instrumentalness?: number;
  liveness?: number;
  speechiness?: number;
};

interface IChartProperties {
  audioFeatures: AudioFeatures;
}

const ChartComponent: React.FunctionComponent<IChartProperties> = ({ audioFeatures }) => {
  // Define colors for the dataset
  const backgroundColors = [
    'rgba(255, 99, 132, 0.6)', // Red
    'rgba(54, 162, 235, 0.6)', // Blue
    'rgba(255, 206, 86, 0.6)', // Yellow
    'rgba(75, 192, 192, 0.6)', // Teal
    'rgba(153, 102, 255, 0.6)', // Purple
    'rgba(255, 159, 64, 0.6)', // Orange
    'rgba(0, 128, 0, 0.6)', // Green
  ];

  // Define custom labels for the x-axis
  const customLabels = [
    'Acousticness',
    'Danceability',
    'Energy',
    'Valence',
    'Instrumentalness',
    'Liveness',
    'Speechiness',
  ];

  // Prepare the data for the chart
  const data = {
    datasets: [
      {
        backgroundColor: backgroundColors,
        data: [
          audioFeatures?.acousticness ?? 0,
          audioFeatures?.danceability ?? 0,
          audioFeatures?.energy ?? 0,
          audioFeatures?.valence ?? 0,
          audioFeatures?.instrumentalness ?? 0,
          audioFeatures?.liveness ?? 0,
          audioFeatures?.speechiness ?? 0,
        ],
        label: '',
      },
    ],
    labels: customLabels,
  };

  return (
    <div className={styles.chart}>
      <Bar
        data={data}
        options={{
          interaction: {
            intersect: false,
            mode: 'index',
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const value = context.parsed.y;
                  return value.toFixed(2); // Display values with 2 decimal places
                },
              },
              enabled: true,
            },
          },
          responsive: true,
          scales: {
            x: {
              beginAtZero: true,
              ticks: {
                callback: (value, index) => customLabels[index], // Use customLabels for x-axis labels
              },
              title: {
                display: false,
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: false,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default ChartComponent;
