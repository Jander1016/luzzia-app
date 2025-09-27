import { useMemo } from 'react';
import { envConfig } from '../config/env';

export function useConfig() {
  return useMemo(() => envConfig, []);
}

export function useAppConfig() {
  const config = useConfig();
  
  return useMemo(() => ({
    title: config.appTitle,
    description: config.appDescription,
    apiUrl: config.apiUrl,
    isDev: config.isDevelopment,
  }), [config]);
}