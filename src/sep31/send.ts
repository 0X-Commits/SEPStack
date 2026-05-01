import { createHttpClient } from '../http/client.js';
import type { Sep31Config, Sep31SendParams, Sep31SendResponse } from './types.js';

export async function sep31Send(
  config: Sep31Config,
  params: Sep31SendParams,
): Promise<Sep31SendResponse> {
  const client = createHttpClient({
    baseUrl: config.directPaymentServer,
    authToken: config.authToken,
  });
  return client
    .post('transactions', { json: params })
    .json<Sep31SendResponse>();
}
