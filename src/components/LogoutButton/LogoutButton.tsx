'use client';

import { logoutServerAction } from '@/serverActions/auth';

import Button from '../Button/Button';

const LogoutButton: React.FC = () => (
  <Button type="button" onClick={() => logoutServerAction()}>
    Logout
  </Button>
);

export default LogoutButton;
