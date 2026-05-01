import { http, HttpResponse } from 'msw';
import { MOCK_ANCHOR_DOMAIN } from './sep1.js';

const AUTH_URL = `https://${MOCK_ANCHOR_DOMAIN}/auth`;

/** Minimal stub XDR — tests should replace with a real signed envelope when needed. */
const STUB_CHALLENGE_XDR = 'AAAAAQAAAAC...stub...';

export const sep10Handlers = [
  http.get(AUTH_URL, () =>
    HttpResponse.json({
      transaction: STUB_CHALLENGE_XDR,
      network_passphrase: 'Test SDF Network ; September 2015',
    }),
  ),

  http.post(AUTH_URL, () =>
    HttpResponse.json({ token: 'mock.jwt.token' }),
  ),
];
