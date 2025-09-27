interface EnvConfig {
  apiUrl: string;
  appTitle: string;
  appDescription: string;
  isDevelopment: boolean;
}

const requiredEnvVars = ['VITE_API_URL'] as const;

requiredEnvVars.forEach((varName) => {
  if (!import.meta.env[varName]) {
    console.warn(`⚠️  Variable de entorno faltante: ${varName}`);
  }
});

export const envConfig: EnvConfig = {
  apiUrl: import.meta.env.VITE_API_URL || 'https://luzzia-backend-production.up.railway.app/api/v1',
  appTitle: import.meta.env.VITE_APP_TITLE || 'Luzzia ⚡',
  appDescription: import.meta.env.VITE_APP_DESCRIPTION || 'Precios de la luz en tiempo real',
  isDevelopment: import.meta.env.DEV || false,
};

Object.freeze(envConfig);