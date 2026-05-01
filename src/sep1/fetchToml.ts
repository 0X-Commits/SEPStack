import ky from 'ky';
import { parseToml } from './parseToml.js';
import type { StellarToml } from './types.js';

/**
 * Fetch and parse stellar.toml from a domain.
 * Follows the SEP-1 discovery path: https://{domain}/.well-known/stellar.toml
 */
export async function fetchToml(domain: string): Promise<StellarToml> {
  const url = `https://${domain}/.well-known/stellar.toml`;
  const text = await ky.get(url).text();
  return parseToml(text);
}
