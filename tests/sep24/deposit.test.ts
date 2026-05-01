import { describe, it, expect } from 'vitest';
import { Sep24Client } from '../../src/sep24/index.js';
import { MOCK_ANCHOR_DOMAIN } from '../mocks/sep1.js';

const client = new Sep24Client({
  anchorDomain: MOCK_ANCHOR_DOMAIN,
  authToken: 'mock.jwt.token',
  network: 'testnet',
});

describe('Sep24Client', () => {
  it('deposit returns interactive URL and id', async () => {
    const res = await client.deposit({ asset_code: 'USDC', account: 'GABC...' });
    expect(res.type).toBe('interactive_customer_info_needed');
    expect(res.url).toContain('deposit');
    expect(res.id).toBe('txn_001');
  });

  it('withdraw returns interactive URL and id', async () => {
    const res = await client.withdraw({ asset_code: 'USDC', account: 'GABC...' });
    expect(res.type).toBe('interactive_customer_info_needed');
    expect(res.id).toBe('txn_002');
  });

  it('getTransaction returns transaction by id', async () => {
    const tx = await client.getTransaction('txn_001');
    expect(tx.id).toBe('txn_001');
    expect(tx.status).toBe('completed');
  });
});
