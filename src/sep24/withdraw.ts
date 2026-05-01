import { createHttpClient } from '../http/client.js';
import type { Sep24WithdrawParams, Sep24InteractiveResponse } from './types.js';

export async function sep24Withdraw(
  transferServerUrl: string,
  params: Sep24WithdrawParams,
  authToken: string,
): Promise<Sep24InteractiveResponse> {
  const client = createHttpClient({ baseUrl: transferServerUrl, authToken });
  return client
    .post('transactions/withdraw/interactive', { json: params })
    .json<Sep24InteractiveResponse>();
}
