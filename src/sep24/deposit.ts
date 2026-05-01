import { createHttpClient } from '../http/client.js';
import type { Sep24DepositParams, Sep24InteractiveResponse } from './types.js';

export async function sep24Deposit(
  transferServerUrl: string,
  params: Sep24DepositParams,
  authToken: string,
): Promise<Sep24InteractiveResponse> {
  const client = createHttpClient({ baseUrl: transferServerUrl, authToken });
  return client
    .post('transactions/deposit/interactive', { json: params })
    .json<Sep24InteractiveResponse>();
}
