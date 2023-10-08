'use client';
import { useEffect } from 'react';

import ScreenLoader from '../ScreenLoader/ScreenLoader';

interface ICallbackCodeHandlerProperties {
  login: (code: string) => Promise<void>;
  code: string;
}

const CallbackCodeHandler: React.FC<ICallbackCodeHandlerProperties> = ({ code, login }) => {
  useEffect(() => {
    (async () => {
      if (!code) return;
      await login(code);
    })();
  }, [code, login]);
  return <ScreenLoader />;
};

export default CallbackCodeHandler;
