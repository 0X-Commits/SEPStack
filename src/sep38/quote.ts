import { createHttpClient } from '../http/client.js';
import type { Sep38Config, Sep38QuoteParams, Sep38Quote } from './types.js';

export async function requestQuote(
  config: Sep38Config,
  params: Sep38QuoteParams,
): Promise<Sep38Quote> {
  const client = createHttpClient({
    baseUrl: config.anchorQuoteServer,
    authToken: config.authToken,
  });
  return client.post('quote', { json: params }).json<Sep38Quote>();
}

export async function getQuote(
  config: Sep38Config,
  quoteId: string,
): Promise<Sep38Quote> {
  const client = createHttpClient({
    baseUrl: config.anchorQuoteServer,
    authToken: config.authToken,
  });
  return client.get(`quote/${quoteId}`).json<Sep38Quote>();
}
