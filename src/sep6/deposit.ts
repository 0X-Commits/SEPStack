import { createHttpClient } from '../http/client.js';
import type { Sep6DepositParams, Sep6DepositResponse } from './types.js';

export async function sep6Deposit(
  transferServer: string,
  params: Sep6DepositParams,
  authToken?: string,
): Promise<Sep6DepositResponse> {
  const client = createHttpClient({ baseUrl: transferServer, authToken });
  return client
    .get('deposit', { searchParams: params as Record<string, string> })
    .json<Sep6DepositResponse>();
}
