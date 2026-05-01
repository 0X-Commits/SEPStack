import { describe, it, expect } from 'vitest';
import { fetchChallenge } from '../../src/sep10/challenge.js';
import { MOCK_ANCHOR_DOMAIN } from '../mocks/sep1.js';

const AUTH_URL = `https://${MOCK_ANCHOR_DOMAIN}/auth`;

describe('sep10 / fetchChallenge', () => {
  it('returns a challenge with transaction and network_passphrase', async () => {
    const challenge = await fetchChallenge(AUTH_URL, 'GABC...', MOCK_ANCHOR_DOMAIN);
    expect(challenge.transaction).toBeDefined();
    expect(challenge.network_passphrase).toBe('Test SDF Network ; September 2015');
  });
});
