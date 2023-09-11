import attributes from '@/components/_scopes/Recommendations/TrackAttributeForm/TrackAttributeForm.config';
import InputRange from '@/components/InputRange/InputRange';

import styles from './TunableAttribute.module.scss';

interface IProperties {
  attributeValues: { [key: string]: string };
  handleChangeAttribute: (name: string, value: number) => void;
}

const TunableAttribute: React.FC<IProperties> = ({ handleChangeAttribute, attributeValues }) => (
  <div className={styles.tunableAttributes}>
    <h2>Tunable Attributes</h2>
    <div className={styles.attributes}>
      {attributes.map((attribute) => (
        <div key={attribute.name} className={styles.row}>
          <InputRange
            min={attribute.min}
            max={attribute.max}
            onChange={handleChangeAttribute}
            name={attribute.name}
            step={attribute.step}
            label={attribute.label}
            value={
              attributeValues?.[attribute?.name]
                ? Number(attributeValues?.[attribute?.name])
                : attribute?.defaultValue
            }
          />
        </div>
      ))}
    </div>
  </div>
);

export default TunableAttribute;
