import Image from 'next/image';
import Link from 'next/link';

import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';

import styles from './ProfilBanner.module.scss';

interface ProfilBannerProperties {
  bannerData: {
    href: string;
    image: string;
    title: string;
  }[];
}

const ProfilBanner = ({ bannerData }: ProfilBannerProperties) => (
  <PageBannerWrapper>
    <div className={styles.banner}>
      {bannerData.map((banner) => (
        <Link className={styles.bannerItem} key={banner.href} href={banner.href}>
          <Image
            src={banner.image}
            alt={banner.title}
            width={100}
            height={100}
            className={styles.bannerItemImage}
          />
          <div className={styles.bannerItemTitle}>{banner.title}</div>
        </Link>
      ))}
    </div>
  </PageBannerWrapper>
);

export default ProfilBanner;
