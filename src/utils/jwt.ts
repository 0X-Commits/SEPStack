import { decodeJwt } from 'jose';

/** Decode a JWT without verifying the signature (client-side inspection only). */
export function decodeToken(token: string): Record<string, unknown> {
  return decodeJwt(token) as Record<string, unknown>;
}

/** Return true if the token's `exp` claim is in the future. */
export function isTokenValid(token: string): boolean {
  try {
    const { exp } = decodeToken(token);
    if (typeof exp !== 'number') return false;
    return Date.now() / 1000 < exp;
  } catch {
    return false;
  }
}
