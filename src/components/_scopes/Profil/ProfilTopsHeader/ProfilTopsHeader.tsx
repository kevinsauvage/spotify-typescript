import LinkButton from '@/components/LinkButton/LinkButton';

import styles from './ProfilTopsHeader.module.scss';

interface ProfilTopsHeaderPropertiesInterface {
  title: string;
  href: string;
}

const ProfilTopsHeader: React.FC<ProfilTopsHeaderPropertiesInterface> = ({ title, href }) => (
  <header className={styles.header}>
    <p className={styles.title}>{title}</p>
    <LinkButton href={href}>View More</LinkButton>
  </header>
);

export default ProfilTopsHeader;
