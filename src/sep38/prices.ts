import { createHttpClient } from '../http/client.js';
import type { Sep38Config, Sep38PricesParams, Sep38PricesResponse } from './types.js';

export async function getPrices(
  config: Sep38Config,
  params: Sep38PricesParams,
): Promise<Sep38PricesResponse> {
  const client = createHttpClient({
    baseUrl: config.anchorQuoteServer,
    authToken: config.authToken,
  });
  return client
    .get('prices', { searchParams: params as Record<string, string> })
    .json<Sep38PricesResponse>();
}
