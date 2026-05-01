import { describe, it, expect } from 'vitest';
import { Sep38Client } from '../../src/sep38/index.js';
import { MOCK_ANCHOR_DOMAIN } from '../mocks/sep1.js';

const client = new Sep38Client({
  anchorQuoteServer: `https://${MOCK_ANCHOR_DOMAIN}/sep38`,
  authToken: 'mock.jwt.token',
});

describe('Sep38Client', () => {
  it('getPrices returns buy assets', async () => {
    const res = await client.getPrices({
      sell_asset: 'stellar:USDC:GA5...',
      sell_amount: '100',
    });
    expect(res.buy_assets).toHaveLength(1);
    expect(res.buy_assets[0]?.asset).toBe('iso4217:KES');
  });

  it('requestQuote returns a quote with price', async () => {
    const quote = await client.requestQuote({
      sell_asset: 'stellar:USDC:GA5...',
      buy_asset: 'iso4217:KES',
      sell_amount: '100',
      context: 'sep24',
    });
    expect(quote.id).toBe('quote_001');
    expect(quote.price).toBe('130.25');
  });

  it('getQuote retrieves a quote by id', async () => {
    const quote = await client.getQuote('quote_001');
    expect(quote.id).toBe('quote_001');
  });
});
