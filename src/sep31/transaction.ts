import { createHttpClient } from '../http/client.js';
import type { Sep31Config, Sep31Transaction } from './types.js';

export async function getSep31Transaction(
  config: Sep31Config,
  id: string,
): Promise<Sep31Transaction> {
  const client = createHttpClient({
    baseUrl: config.directPaymentServer,
    authToken: config.authToken,
  });
  const res = await client
    .get(`transactions/${id}`)
    .json<{ transaction: Sep31Transaction }>();
  return res.transaction;
}
