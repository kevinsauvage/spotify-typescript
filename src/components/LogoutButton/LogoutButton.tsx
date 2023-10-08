'use client';

import Button from '../Button/Button';

interface IProperties {
  onClick: () => void;
}

const LogoutButton: React.FC<IProperties> = ({ onClick }) => (
  <Button type="button" onClick={() => onClick()}>
    Logout
  </Button>
);

export default LogoutButton;
