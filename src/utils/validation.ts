/** Validate a Stellar public key (G...). */
export function isValidPublicKey(key: string): boolean {
  return /^G[A-Z2-7]{55}$/.test(key);
}

/** Validate a Stellar secret key (S...). */
export function isValidSecretKey(key: string): boolean {
  return /^S[A-Z2-7]{55}$/.test(key);
}

/** Assert a value is a non-empty string, throw otherwise. */
export function requireString(value: unknown, name: string): string {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new TypeError(`${name} must be a non-empty string`);
  }
  return value;
}
