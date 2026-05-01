import { createHttpClient } from '../http/client.js';
import type { Sep24Transaction } from './types.js';

export async function getSep24Transaction(
  transferServerUrl: string,
  id: string,
  authToken: string,
): Promise<Sep24Transaction> {
  const client = createHttpClient({ baseUrl: transferServerUrl, authToken });
  const res = await client
    .get('transaction', { searchParams: { id } })
    .json<{ transaction: Sep24Transaction }>();
  return res.transaction;
}

export async function getSep24Transactions(
  transferServerUrl: string,
  params: Record<string, string>,
  authToken: string,
): Promise<Sep24Transaction[]> {
  const client = createHttpClient({ baseUrl: transferServerUrl, authToken });
  const res = await client
    .get('transactions', { searchParams: params })
    .json<{ transactions: Sep24Transaction[] }>();
  return res.transactions;
}
