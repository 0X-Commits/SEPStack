import { describe, it, expect } from 'vitest';
import { fetchToml, parseToml } from '../../src/sep1/index.js';
import { MOCK_ANCHOR_DOMAIN, MOCK_TOML } from '../mocks/sep1.js';

describe('sep1 / parseToml', () => {
  it('parses a valid stellar.toml string', () => {
    const toml = parseToml(MOCK_TOML);
    expect(toml.AUTH_SERVER).toBe(`https://${MOCK_ANCHOR_DOMAIN}/auth`);
    expect(toml.TRANSFER_SERVER_SEP0024).toBe(`https://${MOCK_ANCHOR_DOMAIN}/sep24`);
  });
});

describe('sep1 / fetchToml', () => {
  it('fetches and parses stellar.toml from a domain', async () => {
    const toml = await fetchToml(MOCK_ANCHOR_DOMAIN);
    expect(toml.AUTH_SERVER).toBe(`https://${MOCK_ANCHOR_DOMAIN}/auth`);
    expect(toml.SIGNING_KEY).toBeDefined();
  });
});
