import * as TOML from '@iarna/toml';
import type { StellarToml } from './types.js';

/** Parse a stellar.toml string into a typed StellarToml object. */
export function parseToml(raw: string): StellarToml {
  return TOML.parse(raw) as unknown as StellarToml;
}
