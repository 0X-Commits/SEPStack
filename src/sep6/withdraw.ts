import { createHttpClient } from '../http/client.js';
import type { Sep6WithdrawParams, Sep6WithdrawResponse } from './types.js';

export async function sep6Withdraw(
  transferServer: string,
  params: Sep6WithdrawParams,
  authToken?: string,
): Promise<Sep6WithdrawResponse> {
  const client = createHttpClient({ baseUrl: transferServer, authToken });
  return client
    .get('withdraw', { searchParams: params as Record<string, string> })
    .json<Sep6WithdrawResponse>();
}
