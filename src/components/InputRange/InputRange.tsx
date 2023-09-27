'use client';

import { ChangeEvent, useEffect, useState } from 'react';

import { getMinuteFromMilliseconds } from '@/utils/date';

import styles from './InputRange.module.scss';

interface SliderProperties {
  min: number;
  max: number;
  name: string;
  step: number;
  value?: number;
  label: string;
  onChange: (name: string, value: number) => void;
}

const InputRange: React.FC<SliderProperties> = ({
  min,
  max,
  onChange,
  name,
  step,
  value,
  label,
}) => {
  const [sliderValue, setSliderValue] = useState(value || min);

  useEffect(() => {
    setSliderValue(value || min);
  }, [value, min]);

  const handleSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setSliderValue(newValue);
    onChange?.(name, newValue);
  };

  return (
    <div className={styles.container}>
      <p className={styles.label}>
        {label}: {label === 'Duration (min)' ? getMinuteFromMilliseconds(value || 0) || 0 : value}
      </p>
      <input
        id={name}
        type="range"
        min={min}
        max={max}
        value={sliderValue || 0}
        step={step}
        onChange={handleSliderChange}
      />
    </div>
  );
};

export default InputRange;
