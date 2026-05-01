import { createHttpClient } from '../http/client.js';
import type { Sep10Challenge } from './types.js';

/**
 * Fetch a SEP-10 challenge transaction from the anchor's web auth endpoint.
 * @param webAuthEndpoint - Full URL to the web auth endpoint
 * @param account - Stellar public key of the authenticating account
 * @param homeDomain - The home domain to include in the challenge request
 */
export async function fetchChallenge(
  webAuthEndpoint: string,
  account: string,
  homeDomain: string,
): Promise<Sep10Challenge> {
  const client = createHttpClient({ baseUrl: webAuthEndpoint });
  return client
    .get('', { searchParams: { account, home_domain: homeDomain } })
    .json<Sep10Challenge>();
}

/**
 * Validate a SEP-10 challenge transaction.
 * Checks:
 * 1. The transaction is signed by the anchor's signing key
 * 2. The manage_data operation contains the correct home domain
 * 3. The transaction is not expired
 *
 * TODO: implement full validation per SEP-10 spec §4.2
 */
export function validateChallenge(
  _challenge: Sep10Challenge,
  _anchorSigningKey: string,
): void {
  // TODO: parse XDR, verify anchor signature, check expiry, check home_domain
  throw new Error('Not implemented');
}
