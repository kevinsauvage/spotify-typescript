import ScreenLoader from '@/components/ScreenLoader/ScreenLoader';

interface LayoutInterface {
  children: React.ReactNode;
}

const layout: React.FC<LayoutInterface> = ({ children }) => (
  <div>
    <ScreenLoader />
    {children}
  </div>
);

export default layout;
