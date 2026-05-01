import { createHttpClient } from '../http/client.js';
import type { Sep6InfoResponse } from './types.js';

export async function getSep6Info(
  transferServer: string,
  authToken?: string,
): Promise<Sep6InfoResponse> {
  const client = createHttpClient({ baseUrl: transferServer, authToken });
  return client.get('info').json<Sep6InfoResponse>();
}
