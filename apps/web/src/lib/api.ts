import { SonaApiClient } from '@sona/api-client';
import { getSession } from './session';

export const api = new SonaApiClient(
  import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api/v1',
  () => getSession()?.accessToken,
);
